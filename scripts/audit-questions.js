#!/usr/bin/env node
"use strict";

// Development-only quality audit for the question banks.
//
//   node scripts/audit-questions.js            # summary for every section
//   node scripts/audit-questions.js --json     # machine-readable
//   node scripts/audit-questions.js --strict   # exit non-zero on threshold breach
//
// Read-only. The shipped validator already rejects exact and structural
// duplicates, but its structural signature keeps numbers for math and keeps
// the scene preamble everywhere, so items that differ only in a town name or
// a coefficient pass it. This audit measures what that gate cannot see, plus
// the answer-position and choice-length biases that let a student score well
// without reading the question.

const { loadCatalog, loadBank, normalizeText } = require("./lib/content");

const THRESHOLDS = {
  exactDuplicateRate: 0,
  nearDuplicateRate: 0.02,
  maxTemplateFamilyShare: 0.1,
  maxPositionBiasByDifficulty: 0.4,
  maxLongestChoiceIsKey: 0.4,
  maxBlindScore: 0.4,
};

const SCENE_PREAMBLE =
  /^(during|at|in|as part of|while|for|after|before|on)\b[^,]{0,90},\s*/i;

/* ------------------------------------------------------------- signatures */

// Strips everything a generator varies cosmetically: the scene preamble, all
// numbers, and all proper nouns. What survives is the question's shape, so two
// items that differ only by town, object, or coefficient collide here.
function shapeSignature(question) {
  const stimulus = question.stimulus ? question.stimulus.content : "";
  // A passage-set item has no stimulus of its own, so its passage anchors the
  // signature. Without that, two sets both asking "the passage is best
  // described as" collide, and that stem is one the real ACT reuses on every
  // form; the question is which passage it is asked about.
  const anchor = question.passageId ? `${question.passageId} ` : "";
  // Trim first: items with no stimulus would otherwise start with a space and
  // the anchored preamble pattern would never match.
  let text = `${anchor}${stimulus} ${question.stem}`.trim();
  text = text.replace(SCENE_PREAMBLE, "");
  text = text.replace(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g, " ");
  text = text.replace(/\b\d+(?:\.\d+)?\b/g, "#");
  text = normalizeText(text).replace(/\s+/g, " ").trim();
  return `${question.sectionKey}|${question.subskill}|${text}`;
}

function exactSignature(question) {
  const stimulus = question.stimulus ? question.stimulus.content : "";
  const anchor = question.passageId ? `${question.passageId} ` : "";
  return normalizeText(`${anchor}${stimulus} ${question.stem}`);
}

function templateFamily(question) {
  const tagged = (question.tags || []).find((tag) => tag.startsWith("family:"));
  if (tagged) return tagged.slice(7);
  if (question.templateFamily) return question.templateFamily;
  // Fall back to the shape signature so a bank that predates the field is
  // still measurable, just less precisely.
  return shapeSignature(question);
}

/* ---------------------------------------------------------------- measures */

function rate(count, total) {
  return total ? count / total : 0;
}

function countDuplicates(bank, signer) {
  const seen = new Map();
  let duplicates = 0;
  const worst = new Map();
  bank.forEach((question) => {
    const key = signer(question);
    if (seen.has(key)) {
      duplicates += 1;
      worst.set(key, (worst.get(key) || 1) + 1);
    } else {
      seen.set(key, question.id);
    }
  });
  return { duplicates, distinct: seen.size, worst };
}

// Answer-position bias measured inside each difficulty tier. A bank can be
// perfectly balanced overall and still key almost every Hard item to one
// letter, which is the exploitable case.
function positionBias(bank) {
  const tiers = {};
  bank
    .filter((question) => question.responseType === "multiple-choice")
    .forEach((question) => {
      const tier = (tiers[question.difficulty] = tiers[question.difficulty] || [0, 0, 0, 0]);
      tier[question.correctAnswer] += 1;
    });
  let blindHits = 0;
  let scored = 0;
  const detail = {};
  Object.entries(tiers).forEach(([tier, counts]) => {
    const total = counts.reduce((sum, value) => sum + value, 0);
    const top = Math.max(...counts);
    detail[tier] = { counts, share: rate(top, total) };
    blindHits += top;
    scored += total;
  });
  return { detail, guessScore: rate(blindHits, scored) };
}

function longestChoiceIsKey(bank) {
  const choiceItems = bank.filter((question) => Array.isArray(question.choices));
  let hits = 0;
  choiceItems.forEach((question) => {
    const lengths = question.choices.map((choice) => choice.length);
    const longest = Math.max(...lengths);
    if (
      lengths.filter((length) => length === longest).length === 1 &&
      lengths[question.correctAnswer] === longest
    ) {
      hits += 1;
    }
  });
  return rate(hits, choiceItems.length);
}

// Simulates a student who never reads: on a choice set they have seen before
// they recall the answer, otherwise they take the longest option.
function blindScore(bank) {
  const choiceItems = bank.filter((question) => Array.isArray(question.choices));
  const memory = new Map();
  let correct = 0;
  choiceItems.forEach((question) => {
    const key = question.choices.slice().sort().join("||");
    const answer = question.choices[question.correctAnswer];
    if (memory.has(key)) {
      if (memory.get(key) === answer) correct += 1;
    } else {
      const lengths = question.choices.map((choice) => choice.length);
      const longest = Math.max(...lengths);
      const longestCount = lengths.filter((length) => length === longest).length;
      if (lengths[question.correctAnswer] === longest) correct += 1 / longestCount;
    }
    memory.set(key, answer);
  });
  return rate(correct, choiceItems.length);
}

function distribution(bank, property) {
  const counts = {};
  bank.forEach((question) => {
    const key = question[property];
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

function auditSection(sectionKey) {
  const bank = loadBank(sectionKey);
  if (!bank.length) return null;

  const exact = countDuplicates(bank, exactSignature);
  const near = countDuplicates(bank, shapeSignature);
  const families = countDuplicates(bank, templateFamily);
  const largestFamily = Math.max(1, ...[...families.worst.values()]);
  const bias = positionBias(bank);

  const failures = [];
  const exactRate = rate(exact.duplicates, bank.length);
  const nearRate = rate(near.duplicates, bank.length);
  const familyShare = rate(largestFamily, bank.length);
  const longest = longestChoiceIsKey(bank);
  const blind = blindScore(bank);
  const worstTier = Math.max(
    0,
    ...Object.values(bias.detail).map((entry) => entry.share),
  );

  if (exactRate > THRESHOLDS.exactDuplicateRate) failures.push("exact duplicates");
  if (nearRate > THRESHOLDS.nearDuplicateRate) failures.push("near-duplicate rate");
  if (familyShare > THRESHOLDS.maxTemplateFamilyShare) failures.push("template family dominates");
  if (worstTier > THRESHOLDS.maxPositionBiasByDifficulty) failures.push("answer-position bias");
  if (longest > THRESHOLDS.maxLongestChoiceIsKey) failures.push("longest choice is the key");
  if (blind > THRESHOLDS.maxBlindScore) failures.push("answerable without reading");

  return {
    sectionKey,
    total: bank.length,
    exactDuplicates: exact.duplicates,
    exactDuplicateRate: exactRate,
    nearDuplicates: near.duplicates,
    nearDuplicateRate: nearRate,
    distinctShapes: near.distinct,
    templateFamilies: families.distinct,
    largestFamily,
    largestFamilyShare: familyShare,
    positionByDifficulty: bias.detail,
    positionGuessScore: bias.guessScore,
    longestChoiceIsKey: longest,
    blindScore: blind,
    byDomain: distribution(bank, "domain"),
    bySkill: distribution(bank, "skill"),
    byDifficulty: distribution(bank, "difficulty"),
    failures,
  };
}

function percent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function main() {
  const json = process.argv.includes("--json");
  const strict = process.argv.includes("--strict");
  const catalog = loadCatalog();
  const reports = catalog.sections
    .map((section) => auditSection(section.key))
    .filter(Boolean);

  if (json) {
    console.log(JSON.stringify({ thresholds: THRESHOLDS, reports }, null, 2));
  } else {
    reports.forEach((report) => {
      console.log(`\n== ${report.sectionKey}  (${report.total} items)`);
      console.log(
        `   exact duplicates     ${String(report.exactDuplicates).padStart(4)}  ` +
          `${percent(report.exactDuplicateRate)}`,
      );
      console.log(
        `   near duplicates      ${String(report.nearDuplicates).padStart(4)}  ` +
          `${percent(report.nearDuplicateRate)}   ` +
          `(${report.distinctShapes} distinct question shapes)`,
      );
      console.log(
        `   largest family       ${String(report.largestFamily).padStart(4)}  ` +
          `${percent(report.largestFamilyShare)}   ` +
          `(${report.templateFamilies} families)`,
      );
      console.log(`   longest choice = key      ${percent(report.longestChoiceIsKey)}`);
      console.log(`   answerable without reading ${percent(report.blindScore)}`);
      console.log(`   answer position by difficulty:`);
      Object.entries(report.positionByDifficulty).forEach(([tier, entry]) => {
        console.log(
          `     ${tier.padEnd(7)} [${entry.counts.join(", ")}]  top ${percent(entry.share)}`,
        );
      });
      console.log(
        `   difficulty mix       ${JSON.stringify(report.byDifficulty)}`,
      );
      console.log(
        report.failures.length
          ? `   FAIL: ${report.failures.join(", ")}`
          : "   PASS",
      );
    });

    const failing = reports.filter((report) => report.failures.length);
    console.log(
      `\n${reports.length - failing.length}/${reports.length} sections pass ` +
        `the audit thresholds.`,
    );
  }

  if (strict && reports.some((report) => report.failures.length)) process.exit(1);
}

if (require.main === module) main();

module.exports = {
  auditSection,
  blindScore,
  longestChoiceIsKey,
  positionBias,
  shapeSignature,
  templateFamily,
  THRESHOLDS,
};
