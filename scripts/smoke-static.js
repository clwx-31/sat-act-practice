#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

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

console.log(
  `Static smoke passed: ${requiredIds.length} DOM references and ` +
  `${catalog.sections.length} generated banks are present.`,
);
