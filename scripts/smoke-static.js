#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = htmlIds.filter((id, index) => htmlIds.indexOf(id) !== index);
if (duplicateIds.length) {
  throw new Error(`Duplicate HTML IDs: ${[...new Set(duplicateIds)].join(", ")}`);
}

const requiredIds = [
  ...app.matchAll(/document\.getElementById\("([^"]+)"\)/g),
].map((match) => match[1]);
const missingIds = [...new Set(requiredIds)].filter((id) => !htmlIds.includes(id));
if (missingIds.length) {
  throw new Error(`app.js references missing HTML IDs: ${missingIds.join(", ")}`);
}

const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
const braceBalance = [...cssWithoutComments].reduce(
  (balance, character) =>
    character === "{" ? balance + 1 : character === "}" ? balance - 1 : balance,
  0,
);
if (braceBalance !== 0) throw new Error("styles.css has unbalanced braces.");
for (const selector of [".skip-link", ":focus-visible", "@media", ".hidden"]) {
  if (!css.includes(selector)) throw new Error(`styles.css is missing ${selector}.`);
}

for (const asset of [
  "styles.css",
  "core.js",
  "app.js",
  "content/generated/catalog.js",
]) {
  if (!html.includes(`"${asset}"`)) {
    throw new Error(`index.html does not load ${asset}`);
  }
  if (!fs.existsSync(path.join(root, asset))) {
    throw new Error(`Referenced asset is missing: ${asset}`);
  }
}

const context = vm.createContext({ window: {} });
const catalogPath = path.join(root, "content/generated/catalog.js");
vm.runInContext(fs.readFileSync(catalogPath, "utf8"), context, {
  filename: catalogPath,
});
const catalog = context.window.PRACTICE_CATALOG;
if (!catalog || !Array.isArray(catalog.sections) || catalog.sections.length !== 7) {
  throw new Error("Generated catalog did not register seven supported sections.");
}

for (const section of catalog.sections) {
  const bankPath = path.join(root, "content/generated", `${section.key}.js`);
  if (!fs.existsSync(bankPath)) {
    throw new Error(`Generated bank is missing: ${section.key}.js`);
  }
  vm.runInContext(fs.readFileSync(bankPath, "utf8"), context, { filename: bankPath });
  const bank = context.window.PRACTICE_BANKS[section.key];
  if (!Array.isArray(bank) || bank.length !== catalog.targetPerSection) {
    throw new Error(
      `${section.key} registered ${bank && bank.length} items; expected ${catalog.targetPerSection}.`,
    );
  }
}

// Mini tests draw straight from the generated banks, so every blueprint must
// name a real section and that section must hold enough scoreable items.
const corePath = path.join(root, "core.js");
const coreModule = { exports: {} };
vm.runInContext(
  `(function (module, exports) {\n${fs.readFileSync(corePath, "utf8")}\n})`,
  context,
  { filename: corePath },
)(coreModule, coreModule.exports);
const practiceCore = coreModule.exports;

if (!Array.isArray(practiceCore.MINI_TEST_BLUEPRINTS) ||
  practiceCore.MINI_TEST_BLUEPRINTS.length === 0) {
  throw new Error("core.js did not export any mini test blueprints.");
}
for (const blueprint of practiceCore.MINI_TEST_BLUEPRINTS) {
  const bankBySection = {};
  for (const entry of blueprint.sections) {
    const bank = context.window.PRACTICE_BANKS[entry.sectionKey];
    if (!Array.isArray(bank)) {
      throw new Error(
        `Mini test "${blueprint.id}" references unknown section ${entry.sectionKey}.`,
      );
    }
    const scoreable = bank.filter((item) => item.responseType !== "essay");
    if (scoreable.length < entry.count) {
      throw new Error(
        `Mini test "${blueprint.id}" needs ${entry.count} scoreable ` +
        `${entry.sectionKey} items but only ${scoreable.length} exist.`,
      );
    }
    bankBySection[entry.sectionKey] = bank;
  }
  const built = practiceCore.buildMiniTest(bankBySection, blueprint, "smoke");
  const expected = practiceCore.blueprintTotal(blueprint);
  if (built.length !== expected) {
    throw new Error(
      `Mini test "${blueprint.id}" built ${built.length} items; expected ${expected}.`,
    );
  }
  if (new Set(built.map((item) => item.id)).size !== built.length) {
    throw new Error(`Mini test "${blueprint.id}" repeated a question.`);
  }
}

const guidePath = path.join(root, "content/guides/answer-signs.js");
if (!fs.existsSync(guidePath)) {
  throw new Error("Answer-signs guide is missing: content/guides/answer-signs.js");
}
if (!html.includes('"content/guides/answer-signs.js"')) {
  throw new Error("index.html does not load the answer-signs guide.");
}
vm.runInContext(fs.readFileSync(guidePath, "utf8"), context, { filename: guidePath });
const signs = context.window.PRACTICE_ANSWER_SIGNS;
if (!signs || !Array.isArray(signs.groups) || signs.groups.length === 0) {
  throw new Error("Answer-signs guide did not register any groups.");
}
for (const group of signs.groups) {
  if (!group.id || !group.test || !group.category || !Array.isArray(group.tells) || !group.tells.length) {
    throw new Error(`Answer-signs group is malformed: ${group.id || "(missing id)"}`);
  }
}

console.log(
  `Static smoke passed: ${requiredIds.length} DOM references, ` +
  `${catalog.sections.length} generated banks, ` +
  `${practiceCore.MINI_TEST_BLUEPRINTS.length} mini test blueprints, and ` +
  `${signs.groups.length} answer-sign groups are present.`,
);
