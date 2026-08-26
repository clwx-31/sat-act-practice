"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  answerPositionProblems,
  tierPositionProfiles,
} = require("../scripts/check-answer-positions");

function questions(counts, difficulty = "Easy") {
  return counts.flatMap((count, correctAnswer) =>
    Array.from({ length: count }, (_, index) => ({
      id: `${difficulty}-${correctAnswer}-${index}`,
      difficulty,
      choices: ["A", "B", "C", "D"],
      correctAnswer,
    })),
  );
}

test("accepts a position at exactly thirty percent", () => {
  const bank = questions([3, 3, 2, 2]);
  assert.deepEqual(answerPositionProblems("sample", bank), []);
  assert.deepEqual(tierPositionProfiles(bank).get("Easy"), {
    counts: [3, 3, 2, 2],
    total: 10,
  });
});

test("rejects any position above thirty percent within a tier", () => {
  const bank = questions([4, 2, 2, 2], "Hard");
  assert.match(
    answerPositionProblems("sample", bank).join("\n"),
    /sample\/Hard: position 0 keys 4\/10 \(40\.0%\), above 30%/,
  );
});

test("checks tiers separately and skips non-four-choice items", () => {
  const bank = [
    ...questions([1, 1, 1, 1], "Easy"),
    ...questions([2, 2, 2, 2], "Medium"),
    { id: "essay", difficulty: "Hard", choices: null, correctAnswer: null },
  ];
  assert.deepEqual(answerPositionProblems("sample", bank), []);
  assert.equal(tierPositionProfiles(bank).has("Hard"), false);
});

test("ACT English balances rhetorical questions without rejecting fixed underlined choices", () => {
  const underlined = questions([8, 0, 0, 0]).map((question) => ({
    ...question,
    tags: ["underlined-edit"],
  }));
  const rhetorical = questions([1, 1, 1, 1]).map((question) => ({
    ...question,
    tags: ["rhetorical-question"],
  }));
  const bank = [...underlined, ...rhetorical];

  assert.deepEqual(answerPositionProblems("act-english", bank), []);
  assert.deepEqual(tierPositionProfiles(bank, "act-english").get("Easy"), {
    counts: [1, 1, 1, 1],
    total: 4,
  });
  assert.match(
    answerPositionProblems("sample", bank).join("\n"),
    /position 0 keys 9\/12/,
  );
});
