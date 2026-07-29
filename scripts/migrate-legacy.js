#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const vm = require("node:vm");
const {
  ROOT,
  bankPath,
  loadCatalog,
  writeJsonAtomic,
} = require("./lib/content");

const source = fs.readFileSync(`${ROOT}/questions.js`, "utf8");
const context = {};
vm.runInNewContext(`${source}\nglobalThis.LEGACY_QUESTIONS = QUESTIONS;`, context);

const catalog = loadCatalog();
const sections = new Map(
  catalog.sections.map((section) => [
    `${section.test}|${section.shortLabel.replace(" (optional)", "")}`,
    section,
  ]),
);

function classification(question) {
  const key = `${question.test}|${question.section}`;
  const section = sections.get(key);
  if (!section) throw new Error(`No catalog section for ${key}`);

  const topic = question.topic;
  const mappings = {
    "SAT|Math|Algebra": ["Algebra", "Linear equations in one variable", "solve"],
    "SAT|Math|Linear Equations": ["Algebra", "Linear equations in two variables", "equation modeling"],
    "SAT|Math|Percentages": ["Problem-Solving and Data Analysis", "Percentages", "percent applications"],
    "SAT|Math|Ratios & Proportions": ["Problem-Solving and Data Analysis", "Ratios, rates, and units", "proportions"],
    "SAT|Math|Systems of Equations": ["Algebra", "Systems of two linear equations", "solve systems"],
    "SAT|Math|Slope": ["Algebra", "Linear functions", "slope"],
    "SAT|Math|Quadratics": ["Advanced Math", "Nonlinear equations", "quadratic equations"],
    "SAT|Math|Exponents": ["Advanced Math", "Equivalent expressions", "exponent rules"],
    "SAT|Math|Statistics": ["Problem-Solving and Data Analysis", "One-variable data", "mean and median"],
    "SAT|Math|Probability": ["Problem-Solving and Data Analysis", "Probability", "basic probability"],
    "SAT|Math|Geometry": question.question.includes("circle")
      ? ["Geometry and Trigonometry", "Circles", "circle measures"]
      : ["Geometry and Trigonometry", "Right triangles and trigonometry", "Pythagorean theorem"],
    "SAT|Math|Functions": ["Advanced Math", "Nonlinear functions", "quadratic functions"],
    "SAT|Math|Inequalities": ["Algebra", "Linear inequalities", "solve inequalities"],
    "SAT|Reading & Writing|Central Ideas": ["Information and Ideas", "Central Ideas and Details", "main idea"],
    "SAT|Reading & Writing|Words in Context": ["Craft and Structure", "Words in Context", "meaning in context"],
    "SAT|Reading & Writing|Textual Evidence": ["Information and Ideas", "Command of Evidence", "textual evidence"],
    "SAT|Reading & Writing|Inferences": ["Information and Ideas", "Inferences", "logical inference"],
    "SAT|Reading & Writing|Transitions": ["Expression of Ideas", "Transitions", "logical transition"],
    "SAT|Reading & Writing|Sentence Boundaries": ["Standard English Conventions", "Boundaries", "sentence boundaries"],
    "SAT|Reading & Writing|Verb Agreement": ["Standard English Conventions", "Form, Structure, and Sense", "subject-verb agreement"],
    "SAT|Reading & Writing|Rhetorical Synthesis": ["Expression of Ideas", "Rhetorical Synthesis", "rhetorical goal"],
    "SAT|Reading & Writing|Punctuation": ["Standard English Conventions", "Boundaries", "within-sentence punctuation"],
    "SAT|Reading & Writing|Data Interpretation": ["Information and Ideas", "Command of Evidence", "quantitative evidence"],
    "ACT|English|Sentence Structure": ["Conventions of Standard English", "Sentence Structure and Formation", "clause relationships"],
    "ACT|English|Conciseness": ["Knowledge of Language", "Effective Language Use", "conciseness"],
    "ACT|English|Pronoun Agreement": ["Conventions of Standard English", "Usage", "pronouns"],
    "ACT|English|Organization": ["Production of Writing", "Organization, Unity, and Cohesion", "introductions"],
    "ACT|English|Transitions": ["Production of Writing", "Organization, Unity, and Cohesion", "transitions"],
    "ACT|Math|Algebra": ["Algebra", "Expressions and equations", "linear equations"],
    "ACT|Math|Geometry": ["Geometry", "Measurement", "area"],
    "ACT|Math|Functions": ["Functions", "Function concepts", "domain and range"],
    "ACT|Math|Coordinate Geometry": ["Geometry", "Plane geometry", "coordinate geometry"],
    "ACT|Math|Probability": ["Statistics and Probability", "Probability", "compound probability"],
    "ACT|Reading|Main Idea": ["Key Ideas and Details", "Central Ideas, Themes, and Summaries", "main idea"],
    "ACT|Reading|Detail": ["Key Ideas and Details", "Supporting Details", "locate detail"],
    "ACT|Reading|Vocabulary in Context": ["Craft and Structure", "Word Meaning and Word Choice", "meaning in context"],
    "ACT|Reading|Inference": ["Key Ideas and Details", "Inferences and Conclusions", "logical inference"],
    "ACT|Reading|Author's Purpose": ["Craft and Structure", "Purpose and Point of View", "author's purpose"],
    "ACT|Science|Data Interpretation": ["Interpretation of Data", "Read data displays", "tables"],
    "ACT|Science|Experimental Design": ["Scientific Investigation", "Experimental design", "controls"],
    "ACT|Science|Trends": ["Interpretation of Data", "Analyze data", "trends"],
    "ACT|Science|Hypotheses": ["Scientific Investigation", "Experimental design", "variables"],
    "ACT|Science|Conflicting Viewpoints": ["Evaluation of Models, Inferences, and Experimental Results", "Compare viewpoints", "evidence preference"],
  };

  const mapped = mappings[`${key}|${topic}`];
  if (!mapped) throw new Error(`No taxonomy mapping for ${key}|${topic}`);
  return { section, domain: mapped[0], skill: mapped[1], subskill: mapped[2] };
}

function principleFor(question, classed) {
  if (question.test === "SAT" && question.section === "Math") {
    return `Apply ${classed.skill.toLowerCase()} rules and verify the result in the original conditions.`;
  }
  if (question.test === "ACT" && question.section === "Math") {
    return `Use ${classed.skill.toLowerCase()} accurately and keep intermediate work organized.`;
  }
  if (classed.domain.includes("Standard English") ||
      classed.domain === "Conventions of Standard English") {
    return `Apply the Standard English convention for ${classed.subskill}.`;
  }
  if (question.section === "Science") {
    return "Use only the experiment description and supplied data; outside scientific recall is secondary.";
  }
  return "Choose the option that is fully supported by the supplied text and the exact task.";
}

function hintFor(question, classed) {
  if (question.section.includes("Math")) {
    return `Identify the ${classed.subskill} relationship, then work one operation at a time.`;
  }
  if (classed.domain.includes("Standard English") ||
      classed.domain === "Conventions of Standard English") {
    return `Read the whole sentence and check ${classed.subskill} before comparing choices.`;
  }
  if (question.section === "Science") {
    return "Locate the variable or comparison named in the question before evaluating the options.";
  }
  return "Restate the question in your own words, then eliminate choices that add unsupported claims.";
}

function strategyFor(question, classed) {
  if (question.section.includes("Math")) {
    return `Translate the stem into the relevant ${classed.skill.toLowerCase()} relationship, solve, and substitute back when possible.`;
  }
  if (question.section === "English" || classed.domain.includes("Standard English")) {
    return "Decide the governing grammar or rhetoric rule before looking closely at the answer choices.";
  }
  if (question.section === "Science") {
    return "Go directly to the named data or experimental feature; compare choices only after identifying the evidence.";
  }
  return "Answer from the text first, then select the choice that matches without exaggerating or narrowing the evidence.";
}

function trapFor(question) {
  if (question.section.includes("Math")) {
    return "A tempting option may reflect one correct intermediate step rather than the requested final value.";
  }
  if (question.section === "English" || question.section.includes("Writing")) {
    return "A choice can sound natural while violating the specific grammar or rhetorical relationship being tested.";
  }
  if (question.section === "Science") {
    return "Do not replace the supplied evidence with an assumption based on outside knowledge.";
  }
  return "Avoid choices that are merely plausible; the correct answer must be directly supported by the text.";
}

function rationaleFor(question, index, classed) {
  const choice = question.choices[index];
  if (question.section.includes("Math")) {
    return `${choice} does not satisfy the full ${classed.subskill} calculation described in the solution; it reflects an arithmetic, setup, or intermediate-step error.`;
  }
  if (question.section === "English" || classed.domain.includes("Standard English")) {
    return `“${choice}” does not satisfy the ${classed.subskill} requirement in this sentence or rhetorical context.`;
  }
  if (question.section === "Science") {
    return `The supplied experiment or data do not support “${choice}”; the relevant comparison leads to the stated correct answer.`;
  }
  return `The passage does not fully support “${choice}”; it either adds a claim, misses the requested relationship, or conflicts with a stated detail.`;
}

const counters = {};
const banks = Object.fromEntries(catalog.sections.map((section) => [section.key, []]));

context.LEGACY_QUESTIONS.forEach((question, legacyIndex) => {
  const classed = classification(question);
  counters[classed.section.key] = (counters[classed.section.key] || 0) + 1;
  const number = String(counters[classed.section.key]).padStart(4, "0");
  const correctChoice = question.choices[question.answer];
  const principle = principleFor(question, classed);
  const migrated = {
    id: `${classed.section.key}-${number}`,
    test: classed.section.test,
    section: classed.section.section,
    sectionKey: classed.section.key,
    domain: classed.domain,
    skill: classed.skill,
    subskill: classed.subskill,
    difficulty: question.difficulty,
    responseType: "multiple-choice",
    stimulus: null,
    stem: question.question,
    choices: question.choices,
    correctAnswer: question.answer,
    hint: hintFor(question, classed),
    explanation: question.explanation,
    solutionSteps: [
      `Identify that the question tests ${classed.subskill} within ${classed.skill}.`,
      question.explanation,
      `Confirm that ${correctChoice} answers the exact question asked.`,
    ],
    distractorRationales: question.choices
      .map((choice, index) => ({ index, reason: rationaleFor(question, index, classed) }))
      .filter((item) => item.index !== question.answer),
    strategy: strategyFor(question, classed),
    trap: trapFor(question),
    estimatedSeconds: question.difficulty === "Easy" ? 45 : question.difficulty === "Medium" ? 75 : 105,
    principles: [principle],
    calculatorPolicy: classed.section.calculatorPolicy,
    format: question.question.includes("\n\n") ? "passage" : "standalone",
    tags: ["legacy-audited"],
    provenance: {
      type: "original",
      generator: "legacy-migration",
      seed: `legacy-${String(legacyIndex + 1).padStart(3, "0")}`,
      created: "2026-07-29",
    },
    contentVersion: catalog.contentVersion,
    reviewStatus: "pending-editorial",
    verification: null,
  };
  banks[classed.section.key].push(migrated);
});

Object.entries(banks).forEach(([sectionKey, questions]) => {
  writeJsonAtomic(bankPath(sectionKey), questions);
});

console.log(`Migrated ${context.LEGACY_QUESTIONS.length} legacy questions.`);
Object.entries(banks).forEach(([sectionKey, questions]) => {
  console.log(`${sectionKey}: ${questions.length}`);
});
