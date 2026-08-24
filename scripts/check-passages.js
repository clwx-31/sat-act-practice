#!/usr/bin/env node
"use strict";

// Checks authored passages and their question sets before any bank is built.
//
//   node scripts/check-passages.js                # every authored section
//   node scripts/check-passages.js act-reading
//   node scripts/check-passages.js act-english
//
// Authored reading material fails in ways a schema check cannot see. The one
// that ruined the previous bank was length: the key was the long, hedged,
// carefully qualified option and the distractors were short absolutes, which
// made 97% of ACT Reading answerable without looking at the passage. So the
// first rule here is that the four choices must be within sight of each other
// in length, and the second is that every distractor must name the misreading
// it represents.

const { loadCatalog, PASSAGE_RULES } = require("./lib/content");

// The longest choice may not exceed the shortest by more than this factor.
// Real ACT choices vary; what they do not do is make the key reliably the
// longest one.
const LENGTH_RATIO = 1.5;

const TIERS = ["Easy", "Medium", "Hard"];

const SECTION_RULES = {
  "act-reading": {
    loadPassages: () => require("./data/act-reading").loadPassages(),
    maxFamilyUses: 1,
    checkQuestion: checkReadingQuestion,
  },
  "act-english": {
    loadPassages: () => require("./data/act-english").loadPassages(),
    domainTargets: {
      "Production of Writing": 175,
      "Knowledge of Language": 92,
      "Conventions of Standard English": 308,
    },
    maxFamilyUses: 2,
    checkQuestion: checkEnglishQuestion,
    checkPassage: checkEnglishMarkers,
    checkSection: checkEnglishKeepRate,
    reportKeepRate: true,
  },
};

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

function hasText(value) {
  return typeof value === "string" && Boolean(value.trim());
}

function hasOwn(object, field) {
  return Object.prototype.hasOwnProperty.call(object, field);
}

function checkRequiredText(question, fields, where, problems) {
  fields.forEach((field) => {
    if (!hasText(question[field])) problems.push(`${where}: ${field} is required`);
  });
}

function checkDistractors(question, expected, where, problems, reasonLabel) {
  if (!Array.isArray(question.wrong) || question.wrong.length !== expected) {
    problems.push(`${where}: needs exactly ${expected} distractors`);
  }

  const distractors = Array.isArray(question.wrong) ? question.wrong : [];
  distractors.forEach((entry, slot) => {
    const text = Array.isArray(entry) ? entry[0] : undefined;
    const reason = Array.isArray(entry) ? entry[1] : undefined;
    if (!hasText(text)) problems.push(`${where}: distractor ${slot + 1} is empty`);
    if (!hasText(reason) || reason.trim().length < 25) {
      problems.push(`${where}: distractor ${slot + 1} needs a reason naming the ${reasonLabel}`);
    }
  });
  return distractors;
}

function checkDistinctChoices(choices, where, problems) {
  if (choices.some((choice) => !hasText(choice))) return;
  const normalized = choices.map((choice) => choice.toLowerCase().trim());
  if (new Set(normalized).size !== choices.length) {
    problems.push(`${where}: two choices are the same`);
  }
}

function checkQuestionBase(passage, question, position, index, problems) {
  const where = `${passage.id} q${position + 1}`;

  if (!question || typeof question !== "object" || Array.isArray(question)) {
    problems.push(`${where}: question must be an object`);
    return false;
  }
  if (!index.has(question.subskill)) {
    problems.push(`${where}: subskill "${question.subskill}" is not in the catalog`);
  }
  if (!TIERS.includes(question.difficulty)) {
    problems.push(`${where}: difficulty must be Easy, Medium, or Hard`);
  }
  checkRequiredText(question, ["why", "hint", "family"], where, problems);
  if (!Array.isArray(question.steps) || question.steps.length < 2) {
    problems.push(`${where}: needs at least two solution steps`);
  }
  return true;
}

function checkReadingQuestion(passage, question, position, index, problems) {
  const where = `${passage.id} q${position + 1}`;
  if (!checkQuestionBase(passage, question, position, index, problems)) return;

  checkRequiredText(question, ["stem", "key"], where, problems);
  const distractors = checkDistractors(question, 3, where, problems, "misreading");

  const choices = [question.key, ...distractors.map((entry) => entry[0])];
  checkDistinctChoices(choices, where, problems);

  const lengths = choices.filter(hasText).map((text) => text.length);
  const ratio = lengths.length === 4 ? Math.max(...lengths) / Math.min(...lengths) : 0;
  if (lengths.length === 4 && ratio > LENGTH_RATIO) {
    const longest = lengths.indexOf(Math.max(...lengths));
    problems.push(
      `${where}: choices run ${Math.min(...lengths)}-${Math.max(...lengths)} characters ` +
        `(ratio ${ratio.toFixed(2)}, limit ${LENGTH_RATIO})` +
        (longest === 0 ? " and the key is the longest — this is the tell that made the old bank guessable" : ""),
    );
  }

  // An explanation that never points at the passage is not a reading
  // explanation. Requiring a quotation or a located reference is crude but it
  // catches the generic "the passage supports this" filler the old bank shipped.
  if (typeof question.why === "string" && !/["“”]|paragraph|passage|line|states|says|sentence/i.test(question.why)) {
    problems.push(`${where}: the explanation does not point at the passage`);
  }
}

function englishMarkers(content) {
  return Array.from(String(content).matchAll(/\{(\d+)(?:\s+([^{}]+))?\}/g), (match) => ({
    number: Number(match[1]),
    text: (match[2] || "").trim(),
  }));
}

function checkEnglishQuestion(passage, question, position, index, problems) {
  const where = `${passage.id} q${position + 1}`;
  if (!checkQuestionBase(passage, question, position, index, problems)) return;

  if (question.number !== position + 1) {
    problems.push(`${where}: number must be ${position + 1}`);
  }

  const underlined = hasOwn(question, "keep");
  if (underlined && typeof question.keep !== "boolean") {
    problems.push(`${where}: keep must be true or false`);
  }

  let expectedDistractors = 3;
  if (underlined) {
    if (question.keep === false) {
      expectedDistractors = 2;
      checkRequiredText(question, ["key"], where, problems);
      if (!hasText(question.noChange) || question.noChange.trim().length < 25) {
        problems.push(`${where}: NO CHANGE needs a reason of at least 25 characters`);
      }
    }
  } else {
    checkRequiredText(question, ["stem", "key"], where, problems);
  }

  const distractors = checkDistractors(question, expectedDistractors, where, problems, "error");
  const marker = englishMarkers(passage.content).find((entry) => entry.number === position + 1);
  const original = marker && marker.text;
  const choices = underlined
    ? [original, ...(question.keep === false ? [question.key] : []), ...distractors.map((entry) => entry[0])]
    : [question.key, ...distractors.map((entry) => entry[0])];
  if (choices.length === 4) checkDistinctChoices(choices, where, problems);
}

function checkEnglishMarkers(passage, questions, problems) {
  const where = passage && passage.id ? passage.id : "(passage with no id)";
  const markers = englishMarkers(passage.content);
  const expected = questions.map((_, position) => position + 1);
  const found = markers.map((marker) => marker.number);
  if (found.length !== expected.length || found.some((number, position) => number !== expected[position])) {
    problems.push(
      `${where}: question markers must appear once each in passage order as 1..${questions.length}` +
        ` (found ${found.length ? found.join(", ") : "none"})`,
    );
  }

  questions.forEach((question, position) => {
    if (!question || typeof question !== "object" || Array.isArray(question)) return;
    const number = position + 1;
    const matches = markers.filter((marker) => marker.number === number);
    const underlined = hasOwn(question, "keep");
    const correctKind = matches.filter((marker) => underlined ? marker.text : !marker.text);
    if (matches.length !== 1 || correctKind.length !== 1) {
      problems.push(
        `${where} q${number}: needs exactly one ${underlined ? `{${number} text}` : `{${number}}`} marker`,
      );
    }
  });
}

function checkEnglishKeepRate(passages, problems) {
  const underlined = passages
    .flatMap((passage) => Array.isArray(passage.questions) ? passage.questions : [])
    .filter((question) => question && typeof question.keep === "boolean");
  if (!underlined.length) return;
  const kept = underlined.filter((question) => question.keep).length;
  const rate = kept / underlined.length;
  if (rate < 0.2 || rate > 0.3) {
    problems.push(
      `act-english: NO CHANGE keep rate is ${(rate * 100).toFixed(1)}% ` +
        `(${kept}/${underlined.length}); expected 20%-30%`,
    );
  }
}

function checkPassage(sectionKey, passage, section, index, seenIds, problems) {
  const rules = PASSAGE_RULES[sectionKey];
  const sectionRules = SECTION_RULES[sectionKey];
  const where = passage && passage.id ? passage.id : "(passage with no id)";

  if (!passage || typeof passage !== "object" || Array.isArray(passage)) {
    problems.push(`${where}: passage must be an object`);
    return;
  }

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
    sectionRules.checkQuestion(passage, question, position, index, problems),
  );

  const familyCounts = new Map();
  questions.forEach((question) => {
    if (!question || !hasText(question.family)) return;
    familyCounts.set(question.family, (familyCounts.get(question.family) || 0) + 1);
  });
  const overused = Array.from(familyCounts).find(([, count]) => count > sectionRules.maxFamilyUses);
  if (overused) {
    problems.push(
      `${where}: uses question family "${overused[0]}" ${overused[1]} times ` +
        `(limit ${sectionRules.maxFamilyUses})`,
    );
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

  if (sectionRules.checkPassage) sectionRules.checkPassage(passage, questions, problems);
}

function checkPassages(sectionKey, passages, problems = []) {
  const sectionRules = SECTION_RULES[sectionKey];
  if (!sectionRules) throw new Error(`No passage checker registered for ${sectionKey}`);
  const catalog = loadCatalog();
  const section = catalog.sections.find((entry) => entry.key === sectionKey);
  if (!section) throw new Error(`Unknown section ${sectionKey}`);
  if (!PASSAGE_RULES[sectionKey]) throw new Error(`No passage structure registered for ${sectionKey}`);
  const index = subskillIndex(section);
  const seenIds = new Set();
  passages.forEach((passage) => checkPassage(sectionKey, passage, section, index, seenIds, problems));
  if (sectionRules.checkSection) sectionRules.checkSection(passages, problems);
  return problems;
}

function checkSection(sectionKey, problems = []) {
  const sectionRules = SECTION_RULES[sectionKey];
  if (!sectionRules) throw new Error(`No passage checker registered for ${sectionKey}`);
  const passages = sectionRules.loadPassages();
  checkPassages(sectionKey, passages, problems);
  return passages;
}

function main() {
  const requested = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
  const keys = requested.length ? requested : Object.keys(SECTION_RULES);
  const problems = [];
  const results = [];

  keys.forEach((key) => {
    const sectionProblems = [];
    const loaded = checkSection(key, sectionProblems);
    problems.push(...sectionProblems);
    const catalog = loadCatalog();
    const index = subskillIndex(catalog.sections.find((entry) => entry.key === key));
    const byTier = { Easy: 0, Medium: 0, Hard: 0 };
    const byDomain = {};
    let questions = 0;
    loaded.forEach((passage) => {
      (passage.questions || []).forEach((question) => {
        questions += 1;
        if (byTier[question.difficulty] !== undefined) byTier[question.difficulty] += 1;
        const entry = index.get(question.subskill);
        if (entry) byDomain[entry.domain] = (byDomain[entry.domain] || 0) + 1;
      });
    });
    results.push({
      key,
      passages: loaded.length,
      questions,
      byTier,
      byDomain,
      loaded,
      problemCount: sectionProblems.length,
    });
  });

  problems.slice(0, 60).forEach((problem) => console.log(`  ${problem}`));
  if (problems.length > 60) console.log(`  ... and ${problems.length - 60} more`);

  // Authoring 55 passages by hand drifts. The bank has to land on the
  // section's exact domain and difficulty targets, so every run reports how far
  // the material written so far is from the share it should hold by now — the
  // remaining passages are what has to absorb the gap.
  results.forEach(({ key, passages, questions, byTier, byDomain, loaded, problemCount }) => {
    console.log(
      `\n${passages} passages, ${questions} questions ` +
        `(${byTier.Easy} Easy / ${byTier.Medium} Medium / ${byTier.Hard} Hard): ` +
        `${problemCount ? `${problemCount} problems` : "clean"}.`,
    );

    const catalog = loadCatalog();
    const section = catalog.sections.find((entry) => entry.key === key);
    if (!section) return;
    const sectionRules = SECTION_RULES[key];
    const share = questions / catalog.targetPerSection;
    console.log(`\n   on pace for ${catalog.targetPerSection} ${key} questions (${(share * 100).toFixed(0)}% authored)`);
    console.log("   domain                                            now   due    gap");
    section.domains.forEach((domain) => {
      const now = byDomain[domain.name] || 0;
      const target = sectionRules.domainTargets
        ? sectionRules.domainTargets[domain.name]
        : domain.target;
      const due = Math.round(target * share);
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
    if (sectionRules.reportKeepRate) {
      const underlined = loaded
        .flatMap((passage) => Array.isArray(passage.questions) ? passage.questions : [])
        .filter((question) => question && typeof question.keep === "boolean");
      const kept = underlined.filter((question) => question.keep).length;
      const rate = underlined.length ? `${((kept / underlined.length) * 100).toFixed(1)}%` : "n/a";
      console.log(`   NO CHANGE keep rate: ${rate} (${kept}/${underlined.length} underlined)`);
    }
  });

  if (problems.length) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkPassage, checkPassages, checkSection, LENGTH_RATIO, SECTION_RULES };
