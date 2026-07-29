"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  coverageErrors,
  duplicateErrors,
  loadCatalog,
  normalizeText,
  validateQuestion,
} = require("../scripts/lib/content");

const catalog = loadCatalog();
const satMath = catalog.sections.find((section) => section.key === "sat-math");

function validQuestion(overrides = {}) {
  return {
    id: "sat-math-0001",
    test: "SAT",
    section: "Math",
    sectionKey: "sat-math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    subskill: "solve",
    difficulty: "Easy",
    responseType: "multiple-choice",
    stimulus: null,
    stem: "If 2x + 3 = 11, what is x?",
    choices: ["2", "3", "4", "7"],
    correctAnswer: 2,
    hint: "Undo addition before multiplication.",
    explanation: "Subtract 3 and divide by 2 to obtain x = 4.",
    solutionSteps: ["Subtract 3 from both sides.", "Divide both sides by 2."],
    distractorRationales: [
      { index: 0, reason: "This divides before isolating the variable term." },
      { index: 1, reason: "This subtracts incorrectly." },
      { index: 3, reason: "This stops before dividing by the coefficient." },
    ],
    strategy: "Use inverse operations in reverse order.",
    trap: "Do not divide only one term by 2.",
    estimatedSeconds: 45,
    principles: ["Perform the same operation on both sides of an equation."],
    calculatorPolicy: "allowed",
    format: "standalone",
    tags: [],
    provenance: {
      type: "original",
      generator: "test-fixture",
      seed: "fixture-1",
      created: "2026-07-29",
    },
    contentVersion: catalog.contentVersion,
    reviewStatus: "automated-verified",
    verification: null,
    ...overrides,
  };
}

test("catalog targets total 500 in every section", () => {
  catalog.sections.forEach((section) => {
    const total = section.domains.reduce((sum, domain) => sum + domain.target, 0);
    assert.equal(total, catalog.targetPerSection, section.key);
  });
});

test("difficulty targets total 500", () => {
  const total = Object.values(catalog.difficultyTargets).reduce(
    (sum, count) => sum + count,
    0,
  );
  assert.equal(total, catalog.targetPerSection);
});

test("valid multiple-choice record passes schema validation", () => {
  assert.deepEqual(validateQuestion(validQuestion(), satMath, catalog), []);
});

test("validator rejects an answer key without matching distractor coverage", () => {
  const question = validQuestion({
    correctAnswer: 1,
  });
  assert.match(
    validateQuestion(question, satMath, catalog).join("\n"),
    /distractor rationales/,
  );
});

test("validator rejects mismatched catalog taxonomy", () => {
  const question = validQuestion({
    domain: "Geometry and Trigonometry",
    skill: "Linear equations in one variable",
  });
  assert.match(validateQuestion(question, satMath, catalog).join("\n"), /unknown skill/);
});

test("normalization handles punctuation, case, and spacing", () => {
  assert.equal(normalizeText("  Solve: X + 2! "), "solve x 2");
});

test("duplicate detector finds exact and structural variants", () => {
  const first = validQuestion();
  const second = validQuestion({
    id: "sat-math-0002",
    stem: "If 2x + 3 = 19, what is x?",
  });
  const errors = duplicateErrors([first, second]).join("\n");
  assert.match(errors, /Structural duplicate/);
});

test("coverage permits incomplete banks until complete mode is requested", () => {
  assert.deepEqual(coverageErrors([validQuestion()], catalog, false), []);
  assert.ok(coverageErrors([validQuestion()], catalog, true).length > 0);
});
