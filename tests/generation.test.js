"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { answerPositionPlanner } = require("../scripts/lib/generation");

test("answer positions stay balanced within tiers and across the bank", () => {
  const nextPosition = answerPositionPlanner([]);
  const tiers = { Easy: [], Medium: [], Hard: [] };
  const schedule = [
    ...Array(175).fill("Easy"),
    ...Array(250).fill("Medium"),
    ...Array(150).fill("Hard"),
  ];

  schedule.forEach((difficulty, index) => {
    tiers[difficulty].push(nextPosition(difficulty, `question-${index}`));
  });

  const counts = (positions) => [0, 1, 2, 3].map(
    (position) => positions.filter((value) => value === position).length,
  );
  Object.values(tiers).forEach((positions) => {
    const profile = counts(positions);
    assert.ok(Math.max(...profile) - Math.min(...profile) <= 1);
  });
  const overall = counts(Object.values(tiers).flat());
  assert.ok(Math.max(...overall) - Math.min(...overall) <= 1);
});
