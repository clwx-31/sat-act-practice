"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { checkPassages } = require("../scripts/check-passages");

const SUBSKILLS = ["purpose", "precision", "clause relationships"];
const LONG_REASON = "This identifies the specific error represented by the alternative.";

function distractors(number, count) {
  return Array.from({ length: count }, (_, index) => [
    `alternative ${number}-${index + 1} with deliberately extended wording`,
    LONG_REASON,
  ]);
}

function englishQuestion(number) {
  const common = {
    number,
    subskill: SUBSKILLS[(number - 1) % SUBSKILLS.length],
    family: `family-${Math.floor((number - 1) / 2)}`,
    difficulty: "Medium",
    why: "The sentence supplies the context needed to choose the precise form.",
    steps: ["Read the sentence in context.", "Apply the relevant editing rule."],
    hint: "Check how the marked wording functions in its sentence.",
    trap: "Do not choose an option solely because it sounds formal.",
  };

  if (number <= 8) {
    const keep = number === 1 || number === 5;
    return {
      ...common,
      keep,
      ...(keep ? {} : {
        key: `corrected wording ${number}`,
        noChange: "The original wording creates a specific and identifiable error.",
      }),
      wrong: distractors(number, keep ? 3 : 2),
    };
  }

  return {
    ...common,
    stem: `Which placement best serves the passage at point ${number}?`,
    key: `best response ${number}`,
    wrong: distractors(number, 3),
  };
}

function validEnglishPassage() {
  const questions = Array.from({ length: 12 }, (_, index) => englishQuestion(index + 1));
  const markers = questions.map((question) =>
    question.keep === undefined ? `{${question.number}}` : `{${question.number} x}`,
  );
  const filler = Array.from({ length: 260 }, (_, index) => `word${index + 1}`);
  return {
    id: "act-english-p001",
    type: "personal-essay",
    title: "A Small Revision",
    content: [...markers, ...filler].join(" "),
    questions,
  };
}

test("ACT English passage contract accepts a valid set without a choice-length rule", () => {
  assert.deepEqual(checkPassages("act-english", [validEnglishPassage()]), []);
});

test("ACT English requires ordered question numbers and matching marker kinds", () => {
  const passage = validEnglishPassage();
  passage.questions[2].number = 9;
  passage.content = passage.content.replace("{1 x}", "{2 x}").replace("{9}", "{9 changed}");

  const errors = checkPassages("act-english", [passage]).join("\n");
  assert.match(errors, /q3: number must be 3/);
  assert.match(errors, /question markers must appear once each in passage order/);
  assert.match(errors, /q1: needs exactly one \{1 text\} marker/);
  assert.match(errors, /q9: needs exactly one \{9\} marker/);
});

test("ACT English enforces each question kind and distractor rationale", () => {
  const passage = validEnglishPassage();
  passage.questions[0].wrong.pop();
  passage.questions[1].wrong.push(["extra alternative", LONG_REASON]);
  passage.questions[1].noChange = "too short";
  passage.questions[8].wrong[0][1] = "brief";

  const errors = checkPassages("act-english", [passage]).join("\n");
  assert.match(errors, /q1: needs exactly 3 distractors/);
  assert.match(errors, /q2: needs exactly 2 distractors/);
  assert.match(errors, /q2: NO CHANGE needs a reason of at least 25 characters/);
  assert.match(errors, /q9: distractor 1 needs a reason naming the error/);
});

test("ACT English enforces domain coverage, family reuse, and bank-wide keep rate", () => {
  const passage = validEnglishPassage();
  passage.questions.forEach((question) => {
    question.subskill = "precision";
  });
  passage.questions[2].family = passage.questions[0].family;
  passage.questions[4].keep = false;
  passage.questions[4].key = "corrected wording 5";
  passage.questions[4].noChange = LONG_REASON;
  passage.questions[4].wrong = distractors(5, 2);

  const errors = checkPassages("act-english", [passage]).join("\n");
  assert.match(errors, /uses question family "family-0" 3 times \(limit 2\)/);
  assert.match(errors, /covers only 1 of the three reporting domains/);
  assert.match(errors, /NO CHANGE keep rate is 12\.5% \(1\/8\); expected 20%-30%/);
});
