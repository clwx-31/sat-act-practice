#!/usr/bin/env node
"use strict";

// ACT English is assembled, not generated. The passages and their question
// sets are authored in scripts/data/act-english/; this script converts them to
// canonical bank records and keeps each set linked to its shared passage.
//
//   node scripts/generate-act-english.js
//
// Run `node scripts/check-passages.js act-english` first. It checks the marker
// contract, domain and tier totals, distractors, and the NO CHANGE keep rate
// that this assembler assumes are already correct.

const path = require("node:path");
const {
  bankPath,
  loadCatalog,
  passagePath,
  writeJsonAtomic,
} = require("./lib/content");
const { arrangeChoices, hashString } = require("./lib/generation");
const { loadPassages } = require("./data/act-english");

const SECTION_KEY = "act-english";
const GENERATOR = "act-english-authored-v1";
const CREATED = "2026-08-25";

// Strategy belongs to the skill being tested. The explanation, steps, hint,
// and trap remain authored per item because those must address the particular
// sentence and distractors the student sees.
const STRATEGIES = {
  purpose: "State what the passage or paragraph is trying to accomplish, then choose the option that serves that purpose without narrowing or exaggerating it.",
  relevance: "Name the paragraph's focus before judging the proposed detail; keep only information that directly develops that focus.",
  support: "Identify the claim that needs support, then choose the concrete detail that most directly proves it rather than merely sharing its topic.",
  organization: "Label the job of each sentence or paragraph, then place the material where that job creates the clearest logical progression.",
  introductions: "Choose an opening that establishes the passage's specific subject and direction without becoming broader or narrower than what follows.",
  conclusions: "Choose the ending that synthesizes the passage's established point without adding a new subject, claim, or recommendation.",
  transitions: "Describe the exact relationship between the ideas first—contrast, cause, example, sequence, or addition—then select the transition that names it.",
  precision: "Use the surrounding sentence to identify the exact meaning, degree, and tone required before comparing the wording of the choices.",
  conciseness: "Remove words that repeat an idea already expressed, then confirm that the shortest remaining choice preserves every necessary meaning.",
  "style and tone": "Identify the passage's audience, purpose, and level of formality, then reject choices that shift voice or sound conspicuously out of place.",
  consistency: "Find the passage's controlling tense, point of view, terminology, or tone and choose the option that maintains it without an unexplained shift.",
  "clause relationships": "Classify each clause as independent or dependent before choosing punctuation or a connector; the clause structure determines which joins are grammatical.",
  modifiers: "Locate the word a descriptive phrase is meant to modify and place that word next to the phrase so the sentence cannot attach it elsewhere.",
  parallelism: "Identify the grammatical pattern established by the coordinated items, then make every item follow that same pattern.",
  "subject-verb agreement": "Find the head noun of the subject, ignore nouns inside interrupting phrases, and match the verb to that head noun in number.",
  pronouns: "Identify the pronoun's exact antecedent, then match it in number and person while keeping the reference unambiguous.",
  "verb forms": "Map the sequence of events and use the tense or verb form that expresses that timing consistently with the surrounding sentence.",
  comparisons: "Name the two things being compared and make sure the choice places logically comparable items in parallel grammatical forms.",
  commas: "Identify the sentence structure before listening for a pause; use commas only where the clause, phrase, or series requires them.",
  "semicolons and colons": "Check whether the words before the mark form a complete clause, then use a semicolon to join clauses or a colon to introduce what follows.",
  apostrophes: "Decide whether the noun is possessive, plural, or a contraction, then place the apostrophe according to that function.",
  "dashes and parentheses": "Decide whether the inserted material is nonessential and choose a matched pair of marks whose emphasis fits the sentence.",
};

function subskillIndex(section) {
  const index = new Map();
  section.domains.forEach((domain) => {
    Object.entries(domain.skills).forEach(([skill, subskills]) => {
      subskills.forEach((subskill) => index.set(subskill, { domain: domain.name, skill }));
    });
  });
  return index;
}

function countWords(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).length;
}

function positionPlanner() {
  const counts = { Easy: [0, 0, 0, 0], Medium: [0, 0, 0, 0], Hard: [0, 0, 0, 0] };
  const overall = [0, 0, 0, 0];
  return function nextPosition(difficulty, seed) {
    const tier = counts[difficulty] || counts.Medium;
    const fewestInTier = Math.min(...tier);
    const inTier = [0, 1, 2, 3].filter((index) => tier[index] === fewestInTier);
    const fewestOverall = Math.min(...inTier.map((index) => overall[index]));
    const candidates = inTier.filter((index) => overall[index] === fewestOverall);
    const choice = candidates[hashString(String(seed)) % candidates.length];
    tier[choice] += 1;
    overall[choice] += 1;
    return choice;
  };
}

function strategyFor(question) {
  const strategy = STRATEGIES[question.subskill];
  if (!strategy) throw new Error(`No strategy defined for subskill "${question.subskill}"`);
  return strategy;
}

function isUnderlined(question) {
  return Object.prototype.hasOwnProperty.call(question, "keep");
}

// NO CHANGE must remain choice A. A corrected underlined item hashes its three
// replacement choices into B-D; unlike rhetorical items, these positions are
// not selected by the balance planner.
function arrangeUnderlined(question, seed) {
  if (question.keep) {
    return arrangeChoices(
      "NO CHANGE",
      question.wrong.map(([text, reason]) => ({ text, reason })),
      0,
    );
  }

  const correctIndex = 1 + (hashString(String(seed)) % 3);
  return arrangeChoices(
    question.key,
    [
      { text: "NO CHANGE", reason: question.noChange },
      ...question.wrong.map(([text, reason]) => ({ text, reason })),
    ],
    correctIndex,
  );
}

function arrangeRhetorical(question, position) {
  return arrangeChoices(
    question.key,
    question.wrong.map(([text, reason]) => ({ text, reason })),
    position,
  );
}

function buildRecord({ passage, question, sequence, section, index, rhetoricalPosition }) {
  const id = `${SECTION_KEY}-${String(sequence).padStart(4, "0")}`;
  const entry = index.get(question.subskill);
  if (!entry) throw new Error(`${id}: subskill "${question.subskill}" is not in the catalog`);
  const underlined = isUnderlined(question);
  const arranged = underlined
    ? arrangeUnderlined(question, id)
    : arrangeRhetorical(question, rhetoricalPosition);

  return {
    id,
    test: section.test,
    section: section.section,
    sectionKey: SECTION_KEY,
    domain: entry.domain,
    skill: entry.skill,
    subskill: question.subskill,
    difficulty: question.difficulty,
    responseType: "multiple-choice",
    stimulus: null,
    passageId: passage.id,
    stem: underlined
      ? `Which choice is best for underlined portion ${question.number}?`
      : question.stem,
    ...arranged,
    hint: question.hint,
    explanation: question.why,
    solutionSteps: question.steps,
    strategy: strategyFor(question),
    trap: question.trap,
    estimatedSeconds:
      question.difficulty === "Easy" ? 35 : question.difficulty === "Medium" ? 50 : 65,
    principles: [
      "Read the full sentence and its surrounding context before choosing an edit.",
    ],
    calculatorPolicy: section.calculatorPolicy,
    format: underlined ? "passage-editing" : "passage-rhetoric",
    tags: [
      "passage-set",
      passage.type,
      underlined ? "underlined-edit" : "rhetorical-question",
      `family:${question.family}`,
    ],
    provenance: { type: "original", generator: GENERATOR, seed: id, created: CREATED },
    contentVersion: loadCatalog().contentVersion,
    reviewStatus: "automated-verified",
    verification: null,
  };
}

function main() {
  const catalog = loadCatalog();
  const section = catalog.sections.find((item) => item.key === SECTION_KEY);
  if (!section) throw new Error(`Unknown section ${SECTION_KEY}`);
  const index = subskillIndex(section);
  const passages = loadPassages();
  const authoredCount = passages.reduce((total, passage) => total + passage.questions.length, 0);

  // Count before writing either canonical file so an incomplete authored set
  // cannot replace the currently shipped bank.
  if (authoredCount !== catalog.targetPerSection) {
    throw new Error(
      `Authored sets produce ${authoredCount} questions; the catalog target is ${catalog.targetPerSection}`,
    );
  }

  const nextRhetoricalPosition = positionPlanner();
  const questions = [];
  passages.forEach((passage) => {
    passage.questions.forEach((question) => {
      const sequence = questions.length + 1;
      const id = `${SECTION_KEY}-${String(sequence).padStart(4, "0")}`;
      questions.push(
        buildRecord({
          passage,
          question,
          sequence,
          section,
          index,
          rhetoricalPosition: isUnderlined(question)
            ? null
            : nextRhetoricalPosition(question.difficulty, id),
        }),
      );
    });
  });

  const passageRecords = passages.map((passage) => ({
    id: passage.id,
    sectionKey: SECTION_KEY,
    type: passage.type,
    title: passage.title,
    intro: "",
    content: passage.content,
    wordCount: countWords(passage.content),
    provenance: { type: "original", generator: GENERATOR, seed: passage.id, created: CREATED },
  }));

  writeJsonAtomic(passagePath(SECTION_KEY), passageRecords);
  writeJsonAtomic(bankPath(SECTION_KEY), questions);

  const tiers = questions.reduce((counts, question) => {
    counts[question.difficulty] = (counts[question.difficulty] || 0) + 1;
    return counts;
  }, {});
  const positions = questions.reduce((counts, question) => {
    counts[question.correctAnswer] += 1;
    return counts;
  }, [0, 0, 0, 0]);
  console.log(
    `ACT English: ${passageRecords.length} passages, ${questions.length} questions ` +
      `(${tiers.Easy} Easy / ${tiers.Medium} Medium / ${tiers.Hard} Hard), ` +
      `answer positions [${positions.join(", ")}] written to ` +
      `${path.relative(process.cwd(), bankPath(SECTION_KEY))}.`,
  );
}

if (require.main === module) main();

module.exports = {
  STRATEGIES,
  arrangeUnderlined,
  buildRecord,
  isUnderlined,
  positionPlanner,
};
