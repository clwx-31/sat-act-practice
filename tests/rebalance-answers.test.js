"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { positionCounts, rebalanceQuestions } = require("../scripts/rebalance-answers");

function question(index, difficulty, choices = ["alpha", "bravo", "charlie", "delta"]) {
  const correctAnswer = index % choices.length;
  return {
    id: `item-${difficulty}-${index}`,
    difficulty,
    choices,
    correctAnswer,
    distractorRationales: choices
      .map((choice, choiceIndex) => ({ choice, choiceIndex }))
      .filter(({ choiceIndex }) => choiceIndex !== correctAnswer)
      .map(({ choice, choiceIndex }) => ({ index: choiceIndex, reason: `Reason for ${choice}` })),
    untouched: `metadata-${index}`,
  };
}

function rationaleMap(item) {
  return Object.fromEntries(
    item.distractorRationales.map((rationale) => [item.choices[rationale.index], rationale.reason]),
  );
}

test("rebalances each difficulty tier and keeps rationales attached by choice text", () => {
  const input = [
    ...Array.from({ length: 11 }, (_, index) => question(index, "Easy")),
    ...Array.from({ length: 10 }, (_, index) => question(index, "Medium")),
    ...Array.from({ length: 9 }, (_, index) => question(index, "Hard")),
  ];
  const before = new Map(input.map((item) => [item.id, {
    key: item.choices[item.correctAnswer],
    rationales: rationaleMap(item),
  }]));
  const output = rebalanceQuestions("act-test", input);

  Object.values(positionCounts(output)).forEach((counts) => {
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 1);
  });
  output.forEach((item) => {
    assert.equal(item.choices[item.correctAnswer], before.get(item.id).key);
    assert.deepEqual(rationaleMap(item), before.get(item.id).rationales);
    assert.equal(item.untouched, `metadata-${item.id.split("-").at(-1)}`);
  });
});

test("is deterministic and idempotent", () => {
  const input = Array.from({ length: 17 }, (_, index) => question(index, "Easy"));
  const first = rebalanceQuestions("act-test", input);
  assert.deepEqual(rebalanceQuestions("act-test", input), first);
  assert.deepEqual(rebalanceQuestions("act-test", first), first);
});

test("leaves items without exactly four choices unchanged", () => {
  const essay = question(0, "Easy", []);
  essay.choices = null;
  essay.correctAnswer = null;
  essay.distractorRationales = null;
  const fiveChoice = question(1, "Easy", ["a", "b", "c", "d", "e"]);
  const output = rebalanceQuestions("act-test", [essay, fiveChoice]);
  assert.strictEqual(output[0], essay);
  assert.strictEqual(output[1], fiveChoice);
});
