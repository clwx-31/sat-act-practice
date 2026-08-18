#!/usr/bin/env node
"use strict";

// Checks authored passages and their question sets before any bank is built.
//
//   node scripts/check-passages.js                # every authored section
//   node scripts/check-passages.js act-reading
//
// Authored reading material fails in ways a schema check cannot see. The one
// that ruined the previous bank was length: the key was the long, hedged,
// carefully qualified option and the distractors were short absolutes, which
// made 97% of ACT Reading answerable without looking at the passage. So the
// first rule here is that the four choices must be within sight of each other
// in length, and the second is that every distractor must name the misreading
// it represents.

const { loadCatalog, PASSAGE_RULES } = require("./lib/content");

const SOURCES = {
  "act-reading": () => require("./data/act-reading").loadPassages(),
};

// The longest choice may not exceed the shortest by more than this factor.
// Real ACT choices vary; what they do not do is make the key reliably the
// longest one.
const LENGTH_RATIO = 1.5;

const TIERS = ["Easy", "Medium", "Hard"];

function countWords(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).length;
}

function subskillIndex(section) {
  const index = new Map();
  section.domains.forEach((domain) => {
    Object.entries(domain.skills).forEach(([skill, subskills]) => {
      subskills.forEach((subskill) => index.set(subskill, { domain: domain.name, skill }));
    });
  });
  return index;
}

function checkQuestion(passage, question, position, index, problems) {
  const where = `${passage.id} q${position + 1}`;

  if (!index.has(question.subskill)) {
    problems.push(`${where}: subskill "${question.subskill}" is not in the catalog`);
  }
  if (!TIERS.includes(question.difficulty)) {
    problems.push(`${where}: difficulty must be Easy, Medium, or Hard`);
  }
  ["stem", "key", "why", "hint", "family"].forEach((field) => {
    if (typeof question[field] !== "string" || !question[field].trim()) {
      problems.push(`${where}: ${field} is required`);
    }
  });
  if (!Array.isArray(question.steps) || question.steps.length < 2) {
    problems.push(`${where}: needs at least two solution steps`);
  }
  if (!Array.isArray(question.wrong) || question.wrong.length !== 3) {
    problems.push(`${where}: needs exactly three distractors`);
    return;
  }

  const choices = [question.key, ...question.wrong.map(([text]) => text)];
  choices.forEach((text, slot) => {
    if (typeof text !== "string" || !text.trim()) {
      problems.push(`${where}: choice ${slot} is empty`);
    }
  });
  if (new Set(choices.map((text) => String(text).toLowerCase().trim())).size !== 4) {
    problems.push(`${where}: two choices are the same`);
  }

  const lengths = choices.map((text) => String(text).length);
  const ratio = Math.max(...lengths) / Math.min(...lengths);
  if (ratio > LENGTH_RATIO) {
    const longest = lengths.indexOf(Math.max(...lengths));
    problems.push(
      `${where}: choices run ${Math.min(...lengths)}-${Math.max(...lengths)} characters ` +
        `(ratio ${ratio.toFixed(2)}, limit ${LENGTH_RATIO})` +
        (longest === 0 ? " and the key is the longest — this is the tell that made the old bank guessable" : ""),
    );
  }

  question.wrong.forEach(([text, reason], slot) => {
    if (typeof reason !== "string" || reason.trim().length < 25) {
      problems.push(`${where}: distractor ${slot + 1} needs a reason naming the misreading`);
    }
  });

  // An explanation that never points at the passage is not a reading
  // explanation. Requiring a quotation or a located reference is crude but it
  // catches the generic "the passage supports this" filler the old bank shipped.
  if (typeof question.why === "string" && !/["“”]|paragraph|passage|line|states|says|sentence/i.test(question.why)) {
    problems.push(`${where}: the explanation does not point at the passage`);
  }
}

function checkPassage(sectionKey, passage, section, index, seenIds, problems) {
  const rules = PASSAGE_RULES[sectionKey];
  const where = passage && passage.id ? passage.id : "(passage with no id)";

  if (!new RegExp(`^${sectionKey}-p\\d{3}$`).test(passage.id || "")) {
    problems.push(`${where}: id must match ${sectionKey}-pNNN`);
  }
  if (seenIds.has(passage.id)) problems.push(`${where}: duplicate passage id`);
  seenIds.add(passage.id);

  if (!rules.types.includes(passage.type)) {
    problems.push(`${where}: type "${passage.type}" is not one of ${rules.types.join(", ")}`);
  }
  ["title", "content"].forEach((field) => {
    if (typeof passage[field] !== "string" || !passage[field].trim()) {
      problems.push(`${where}: ${field} is required`);
    }
  });

  const words = countWords(passage.content || "");
  if (words < rules.words[0] || words > rules.words[1]) {
    problems.push(`${where}: ${words} words, outside ${rules.words[0]}-${rules.words[1]}`);
  }

  const questions = Array.isArray(passage.questions) ? passage.questions : [];
  if (questions.length < rules.perSet[0] || questions.length > rules.perSet[1]) {
    problems.push(
      `${where}: ${questions.length} questions, outside ${rules.perSet[0]}-${rules.perSet[1]}`,
    );
  }
  questions.forEach((question, position) =>
    checkQuestion(passage, question, position, index, problems),
  );

  // A set that asks the same thing ten times is not a set. Two questions in one
  // passage may not share a family.
  const families = questions.map((question) => question.family);
  const repeated = families.filter((family, position) => families.indexOf(family) !== position);
  if (repeated.length) {
    problems.push(`${where}: repeats question family "${repeated[0]}" within one set`);
  }

  // Every set should reach all three reporting domains, or the passage is
  // testing one narrow thing at length.
  const domains = new Set(
    questions
      .map((question) => index.get(question.subskill))
      .filter(Boolean)
      .map((entry) => entry.domain),
  );
  if (domains.size < 3 && questions.length >= rules.perSet[0]) {
    problems.push(`${where}: covers only ${domains.size} of the three reporting domains`);
  }
}

function checkSection(sectionKey, problems) {
  const catalog = loadCatalog();
  const section = catalog.sections.find((entry) => entry.key === sectionKey);
  if (!section) throw new Error(`Unknown section ${sectionKey}`);
  const index = subskillIndex(section);
  const passages = SOURCES[sectionKey]();
  const seenIds = new Set();
  passages.forEach((passage) => checkPassage(sectionKey, passage, section, index, seenIds, problems));
  return passages;
}

function main() {
  const requested = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
  const keys = requested.length ? requested : Object.keys(SOURCES);
  const problems = [];
  let passages = 0;
  let questions = 0;
  const byTier = { Easy: 0, Medium: 0, Hard: 0 };
  const byDomain = {};

  keys.forEach((key) => {
    const loaded = checkSection(key, problems);
    passages += loaded.length;
    const catalog = loadCatalog();
    const index = subskillIndex(catalog.sections.find((entry) => entry.key === key));
    loaded.forEach((passage) => {
      (passage.questions || []).forEach((question) => {
        questions += 1;
        if (byTier[question.difficulty] !== undefined) byTier[question.difficulty] += 1;
        const entry = index.get(question.subskill);
        if (entry) byDomain[entry.domain] = (byDomain[entry.domain] || 0) + 1;
      });
    });
  });

  problems.slice(0, 60).forEach((problem) => console.log(`  ${problem}`));
  if (problems.length > 60) console.log(`  ... and ${problems.length - 60} more`);

  console.log(
    `\n${passages} passages, ${questions} questions ` +
      `(${byTier.Easy} Easy / ${byTier.Medium} Medium / ${byTier.Hard} Hard): ` +
      `${problems.length ? `${problems.length} problems` : "clean"}.`,
  );

  // Authoring 55 passages by hand drifts. The bank has to land on the
  // catalog's exact domain and difficulty targets, so every run reports how far
  // the material written so far is from the share it should hold by now — the
  // remaining passages are what has to absorb the gap.
  keys.forEach((key) => {
    const catalog = loadCatalog();
    const section = catalog.sections.find((entry) => entry.key === key);
    if (!section || questions === 0) return;
    const share = questions / catalog.targetPerSection;
    console.log(`\n   on pace for ${catalog.targetPerSection} ${key} questions (${(share * 100).toFixed(0)}% authored)`);
    console.log("   domain                                            now   due    gap");
    section.domains.forEach((domain) => {
      const now = byDomain[domain.name] || 0;
      const due = Math.round(domain.target * share);
      const gap = now - due;
      console.log(
        `   ${domain.name.padEnd(48)}${String(now).padStart(5)}${String(due).padStart(6)}` +
          `${(gap > 0 ? `+${gap}` : String(gap)).padStart(7)}`,
      );
    });
    console.log("   difficulty                                        now   due    gap");
    TIERS.forEach((tier) => {
      const now = byTier[tier];
      const due = Math.round(catalog.difficultyTargets[tier] * share);
      const gap = now - due;
      console.log(
        `   ${tier.padEnd(48)}${String(now).padStart(5)}${String(due).padStart(6)}` +
          `${(gap > 0 ? `+${gap}` : String(gap)).padStart(7)}`,
      );
    });
  });

  if (problems.length) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkSection, LENGTH_RATIO };
