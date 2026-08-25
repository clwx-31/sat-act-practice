#!/usr/bin/env node
"use strict";

const { bankPath, loadBank, writeJsonAtomic } = require("./lib/content");
const { hashString } = require("./lib/generation");

const POSITIONS = 4;

function positionCounts(questions) {
  const counts = {};
  questions.forEach((question) => {
    if (!Array.isArray(question.choices) || question.choices.length !== POSITIONS) return;
    const tier = question.difficulty || "Unlabelled";
    if (!counts[tier]) counts[tier] = [0, 0, 0, 0];
    counts[tier][question.correctAnswer] += 1;
  });
  return counts;
}

function targetPositions(sectionKey, difficulty, questions) {
  const extraOffset = hashString(`${sectionKey}|${difficulty}|extras`) % POSITIONS;
  const targets = [];
  for (let index = 0; index < questions.length; index += 1) {
    targets.push((index + extraOffset) % POSITIONS);
  }
  return targets;
}

function verifyRationaleMap(before, choices, rationales, id) {
  const after = new Map();
  rationales.forEach((rationale) => {
    const text = choices[rationale.index];
    if (typeof text !== "string") {
      throw new Error(`${id}: rationale points outside the choices array`);
    }
    after.set(text, rationale.reason);
  });
  if (before.size !== after.size) {
    throw new Error(`${id}: rationale count changed during permutation`);
  }
  before.forEach((reason, text) => {
    if (after.get(text) !== reason) {
      throw new Error(`${id}: rationale detached from choice "${text}"`);
    }
  });
}

function moveKey(question, target) {
  const choices = question.choices.slice();
  const key = choices[question.correctAnswer];
  if (typeof key !== "string") {
    throw new Error(`${question.id}: correctAnswer does not point to a choice`);
  }
  if (new Set(choices).size !== choices.length) {
    throw new Error(`${question.id}: choices must be distinct before rebalancing`);
  }

  const rationales = question.distractorRationales.map((rationale) => ({ ...rationale }));
  const rationaleByText = new Map();
  rationales.forEach((rationale) => {
    const text = choices[rationale.index];
    if (typeof text !== "string" || rationale.index === question.correctAnswer) {
      throw new Error(`${question.id}: invalid distractor rationale index ${rationale.index}`);
    }
    rationaleByText.set(text, rationale.reason);
  });

  const reordered = choices.filter((_, index) => index !== question.correctAnswer);
  reordered.splice(target, 0, key);
  const remapped = rationales
    .map((rationale) => ({
      ...rationale,
      index: reordered.indexOf(choices[rationale.index]),
    }))
    .sort((left, right) => left.index - right.index);
  verifyRationaleMap(rationaleByText, reordered, remapped, question.id);

  return {
    ...question,
    choices: reordered,
    correctAnswer: target,
    distractorRationales: remapped,
  };
}

function rebalanceQuestions(sectionKey, questions) {
  const eligible = new Map();
  questions.forEach((question, index) => {
    if (!Array.isArray(question.choices) || question.choices.length !== POSITIONS) return;
    if (!Array.isArray(question.distractorRationales)) return;
    const tier = question.difficulty || "Unlabelled";
    if (!eligible.has(tier)) eligible.set(tier, []);
    eligible.get(tier).push({ index, question });
  });

  const balanced = questions.slice();
  eligible.forEach((items, difficulty) => {
    items.sort((left, right) => {
      const leftHash = hashString(`${sectionKey}|${difficulty}|${left.question.id}`);
      const rightHash = hashString(`${sectionKey}|${difficulty}|${right.question.id}`);
      return leftHash - rightHash || left.question.id.localeCompare(right.question.id);
    });
    const targets = targetPositions(sectionKey, difficulty, items);
    items.forEach(({ index, question }, itemIndex) => {
      balanced[index] = moveKey(question, targets[itemIndex]);
    });
  });
  return balanced;
}

function formatCounts(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([tier, values]) => `${tier} [${values.join(", ")}]`)
    .join("; ");
}

function main() {
  const sectionKey = process.argv[2];
  if (!sectionKey) throw new Error("Usage: node scripts/rebalance-answers.js <section-key>");
  if (sectionKey === "act-reading") {
    throw new Error("act-reading is already balanced and must not be changed");
  }
  if (sectionKey === "act-writing") {
    console.log("act-writing: skipped (no multiple-choice items)");
    return;
  }

  const before = loadBank(sectionKey);
  const after = rebalanceQuestions(sectionKey, before);
  writeJsonAtomic(bankPath(sectionKey), after);
  console.log(`${sectionKey}: ${formatCounts(positionCounts(before))} -> ${formatCounts(positionCounts(after))}`);
}

if (require.main === module) main();

module.exports = { moveKey, positionCounts, rebalanceQuestions, targetPositions };
