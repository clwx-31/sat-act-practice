#!/usr/bin/env node
"use strict";

const { loadBank, loadCatalog } = require("./lib/content");

const MAX_POSITION_SHARE = 0.30;
const POSITION_COUNT = 4;

function tierPositionProfiles(questions) {
  const profiles = new Map();
  questions.forEach((question) => {
    if (!Array.isArray(question.choices) || question.choices.length !== POSITION_COUNT) return;
    const difficulty = question.difficulty || "Unlabelled";
    if (!profiles.has(difficulty)) profiles.set(difficulty, { counts: [0, 0, 0, 0], total: 0 });
    const profile = profiles.get(difficulty);
    if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer >= POSITION_COUNT) {
      profile.invalid = (profile.invalid || []).concat(question.id);
      return;
    }
    profile.counts[question.correctAnswer] += 1;
    profile.total += 1;
  });
  return profiles;
}

function answerPositionProblems(sectionKey, questions, limit = MAX_POSITION_SHARE) {
  const problems = [];
  tierPositionProfiles(questions).forEach((profile, difficulty) => {
    if (profile.invalid) {
      problems.push(`${sectionKey}/${difficulty}: invalid correctAnswer on ${profile.invalid.join(", ")}`);
    }
    if (profile.total === 0) return;
    profile.counts.forEach((count, position) => {
      const share = count / profile.total;
      if (share > limit) {
        problems.push(
          `${sectionKey}/${difficulty}: position ${position} keys ${count}/${profile.total} ` +
            `(${(share * 100).toFixed(1)}%), above ${(limit * 100).toFixed(0)}%`,
        );
      }
    });
  });
  return problems;
}

function formatProfiles(sectionKey, questions) {
  return [...tierPositionProfiles(questions).entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .filter(([, profile]) => profile.total > 0)
    .map(([difficulty, profile]) => {
      const top = Math.max(...profile.counts) / profile.total * 100;
      return `${sectionKey}/${difficulty} [${profile.counts.join(", ")}] top ${top.toFixed(1)}%`;
    });
}

function main() {
  const catalog = loadCatalog();
  const requested = process.argv.slice(2);
  const sectionKeys = requested.length ? requested : catalog.sections.map((section) => section.key);
  const problems = [];
  sectionKeys.forEach((sectionKey) => {
    const bank = loadBank(sectionKey);
    formatProfiles(sectionKey, bank).forEach((line) => console.log(line));
    problems.push(...answerPositionProblems(sectionKey, bank));
  });
  if (problems.length) {
    problems.forEach((problem) => console.error(`  ${problem}`));
    process.exit(1);
  }
  console.log(`Answer positions stay at or below 30% within every difficulty tier (${sectionKeys.length} sections).`);
}

if (require.main === module) main();

module.exports = { MAX_POSITION_SHARE, answerPositionProblems, tierPositionProfiles };
