"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { loadPassages } = require("../scripts/data/act-english");
const {
  STRATEGIES,
  arrangeUnderlined,
} = require("../scripts/generate-act-english");

test("every authored ACT English subskill has a shared strategy", () => {
  const subskills = new Set(
    loadPassages().flatMap((passage) => passage.questions.map((question) => question.subskill)),
  );
  assert.deepEqual(
    [...subskills].filter((subskill) => !STRATEGIES[subskill]),
    [],
  );
});

test("underlined choices keep NO CHANGE in position A", () => {
  const kept = arrangeUnderlined({
    keep: true,
    wrong: [["B", "reason B"], ["C", "reason C"], ["D", "reason D"]],
  }, "kept");
  assert.equal(kept.choices[0], "NO CHANGE");
  assert.equal(kept.correctAnswer, 0);

  const corrected = arrangeUnderlined({
    keep: false,
    key: "correct",
    noChange: "reason A",
    wrong: [["wrong one", "reason one"], ["wrong two", "reason two"]],
  }, "corrected");
  assert.equal(corrected.choices[0], "NO CHANGE");
  assert.notEqual(corrected.correctAnswer, 0);
  assert.equal(corrected.choices[corrected.correctAnswer], "correct");
});
