#!/usr/bin/env node
"use strict";

// Checks that Easy, Medium, and Hard describe the questions carrying them.
//
//   node scripts/check-difficulty.js              # every section
//   node scripts/check-difficulty.js act-reading
//   node scripts/check-difficulty.js --json
//
// The criteria are in docs/DIFFICULTY_CALIBRATION.md. This measures the four
// consequences that can be checked mechanically:
//
//   1. A question shape must not appear under two different labels. The same
//      shape called Medium in one item and Hard in another means the label
//      describes the rotation that assigned it, not the question.
//   2. Tiers must not invert. Reasoning steps, expected time, and the number of
//      distractor rationales are all proxies for work; none may fall as
//      difficulty rises.
//   3. Tiers must actually separate. If Easy and Hard have the same medians on
//      every measure, the calibration is nominal.
//   4. Hard must not be more guessable than Easy. A student who ignores the
//      question and picks the longest choice should not score better on Hard.

const { loadCatalog, loadBank, normalizeText } = require("./lib/content");

const TIERS = ["Easy", "Medium", "Hard"];

// Mirrors the audit's shape signature: strip the numbers and the proper nouns
// and what is left is the question being asked.
function shapeSignature(question) {
  const stimulus = question.stimulus ? question.stimulus.content : "";
  // A passage-set item shares its passage with nine others by design, so the
  // passage itself cannot be part of the shape. What distinguishes two such
  // items is the stem together with the choices, which is where a reading
  // question actually lives: "the author’s purpose in the final paragraph is
  // to" is a stem the real ACT reuses on every form, and asking it of two
  // different passages produces two questions that may honestly differ in
  // difficulty.
  const context = question.passageId
    ? (Array.isArray(question.choices) ? question.choices.join(" ") : "")
    : stimulus;
  let text = `${context} ${question.stem}`.trim();
  text = text.replace(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g, " ");
  text = text.replace(/\b\d+(?:\.\d+)?\b/g, "#");
  return `${question.subskill}|${normalizeText(text).replace(/\s+/g, " ").trim()}`;
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = values.slice().sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// The blind student: never reads the stem, always picks the longest choice.
function longestChoiceIsKey(question) {
  if (!Array.isArray(question.choices) || question.choices.length === 0) return null;
  const lengths = question.choices.map((choice) => String(choice).length);
  const longest = Math.max(...lengths);
  if (lengths.filter((length) => length === longest).length > 1) return false;
  return lengths.indexOf(longest) === question.correctAnswer;
}

function tierProfile(items) {
  const guessable = items.map(longestChoiceIsKey).filter((value) => value !== null);
  return {
    count: items.length,
    steps: median(items.map((q) => (q.solutionSteps || []).length)),
    seconds: median(items.map((q) => q.estimatedSeconds || 0)),
    distractors: median(items.map((q) => (q.distractorRationales || []).length)),
    guessRate: guessable.length ? guessable.filter(Boolean).length / guessable.length : 0,
  };
}

function checkSection(sectionKey) {
  const bank = loadBank(sectionKey);
  const problems = [];
  // An essay section legitimately gives every prompt the same 40 minutes and
  // the same planning outline, so the work proxies cannot separate its tiers.
  // Its labels still have to name distinct shapes.
  const essayOnly = bank.length > 0 && bank.every((question) => question.responseType === "essay");
  const profiles = {};
  TIERS.forEach((tier) => {
    profiles[tier] = tierProfile(bank.filter((question) => question.difficulty === tier));
  });

  // 1. One shape, one label.
  const labelsByShape = new Map();
  bank.forEach((question) => {
    const shape = shapeSignature(question);
    if (!labelsByShape.has(shape)) labelsByShape.set(shape, new Map());
    const labels = labelsByShape.get(shape);
    if (!labels.has(question.difficulty)) labels.set(question.difficulty, []);
    labels.get(question.difficulty).push(question.id);
  });
  const straddling = [...labelsByShape.entries()].filter(([, labels]) => labels.size > 1);
  if (straddling.length) {
    const share = straddling.reduce(
      (total, [, labels]) => total + [...labels.values()].reduce((n, ids) => n + ids.length, 0),
      0,
    );
    problems.push(
      `${straddling.length} question shapes carry more than one difficulty label ` +
        `(${share} items, ${(share / bank.length * 100).toFixed(1)}%); ` +
        `e.g. ${[...straddling[0][1].values()].map((ids) => ids[0]).join(" and ")}`,
    );
  }

  // 2. No inversion, 3. real separation.
  if (!essayOnly) {
    ["steps", "seconds", "distractors"].forEach((measure) => {
      const [easy, medium, hard] = TIERS.map((tier) => profiles[tier][measure]);
      if (medium < easy || hard < medium) {
        problems.push(`${measure} falls as difficulty rises: ${easy} / ${medium} / ${hard}`);
      }
    });
    if (profiles.Easy.seconds === profiles.Hard.seconds && profiles.Easy.steps === profiles.Hard.steps) {
      problems.push(
        `Easy and Hard are indistinguishable on every measured proxy ` +
          `(${profiles.Easy.steps} steps, ${profiles.Easy.seconds}s each)`,
      );
    }
  }

  // 4. Hard must not be the easiest tier to guess.
  if (profiles.Hard.guessRate > profiles.Easy.guessRate && profiles.Hard.guessRate > 0.4) {
    problems.push(
      `Hard items are more guessable than Easy ones without reading: ` +
        `${(profiles.Hard.guessRate * 100).toFixed(0)}% vs ${(profiles.Easy.guessRate * 100).toFixed(0)}%`,
    );
  }
  // A tier where the answer is visible from the shape of the choices cannot
  // carry a difficulty label at all, whichever way the tiers happen to order.
  TIERS.forEach((tier) => {
    if (profiles[tier].guessRate > 0.5) {
      problems.push(
        `${tier} is ${(profiles[tier].guessRate * 100).toFixed(0)}% answerable by picking the ` +
          "longest choice, so its label describes nothing",
      );
    }
  });

  return { profiles, problems };
}

function main() {
  const asJson = process.argv.includes("--json");
  const requested = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
  const catalog = loadCatalog();
  const keys = requested.length ? requested : catalog.sections.map((section) => section.key);

  const results = {};
  let failed = 0;
  keys.forEach((key) => {
    results[key] = checkSection(key);
    if (results[key].problems.length) failed += 1;
  });

  if (asJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    keys.forEach((key) => {
      const { profiles, problems } = results[key];
      console.log(`\n== ${key}`);
      TIERS.forEach((tier) => {
        const p = profiles[tier];
        console.log(
          `   ${tier.padEnd(7)} n=${String(p.count).padStart(4)}  ` +
            `steps ${p.steps}  seconds ${p.seconds}  distractors ${p.distractors}  ` +
            `longest-is-key ${(p.guessRate * 100).toFixed(0)}%`,
        );
      });
      if (problems.length) problems.forEach((problem) => console.log(`   FAIL: ${problem}`));
      else console.log("   PASS");
    });
    console.log(`\n${keys.length - failed}/${keys.length} sections have meaningful difficulty labels.`);
  }

  if (failed && process.argv.includes("--strict")) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkSection, shapeSignature };
