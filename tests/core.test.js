"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../core");

const questions = [
  {
    id: "q1",
    sectionKey: "sat-math",
    domain: "Algebra",
    skill: "Linear equations",
    subskill: "solve",
    difficulty: "Easy",
    responseType: "multiple-choice",
    correctAnswer: 2,
    stem: "Solve a linear equation.",
    stimulus: null,
  },
  {
    id: "q2",
    sectionKey: "sat-math",
    domain: "Algebra",
    skill: "Linear equations",
    subskill: "model",
    difficulty: "Medium",
    responseType: "numeric",
    correctAnswer: "4.5",
    stem: "Find the modeled value.",
    stimulus: null,
  },
  {
    id: "q3",
    sectionKey: "sat-reading-writing",
    domain: "Craft and Structure",
    skill: "Words in Context",
    subskill: "meaning",
    difficulty: "Hard",
    responseType: "multiple-choice",
    correctAnswer: 0,
    stem: "Choose the contextual meaning.",
    stimulus: { content: "A brief invented passage." },
  },
];

test("filterQuestions combines taxonomy, difficulty, and search filters", () => {
  assert.deepEqual(
    core.filterQuestions(questions, {
      domains: ["Algebra"],
      difficulties: ["Medium"],
      query: "modeled",
    }).map((question) => question.id),
    ["q2"],
  );
});

test("scoreResponse handles choices, numeric tolerance, and essays", () => {
  assert.equal(core.scoreResponse(questions[0], 2), true);
  assert.equal(core.scoreResponse(questions[0], 1), false);
  assert.equal(core.scoreResponse(questions[1], "4.5004"), true);
  assert.equal(core.scoreResponse({ responseType: "essay" }, "draft"), null);
});

test("buildSession is deterministic and respects count", () => {
  const first = core.buildSession(questions, 2, "seed");
  const second = core.buildSession(questions, 2, "seed");
  assert.deepEqual(first.map((question) => question.id), second.map((question) => question.id));
  assert.equal(first.length, 2);
});

test("summarizeProgress calculates accuracy and weak skills", () => {
  const attempts = [
    { questionId: "q1", correct: false },
    { questionId: "q1", correct: true },
    { questionId: "q2", correct: false },
  ];
  const summary = core.summarizeProgress(attempts, questions);
  assert.equal(summary.attempted, 3);
  assert.equal(summary.correct, 1);
  assert.equal(summary.uniqueCompleted, 2);
  assert.equal(
    summary.bySkill["sat-math|Linear equations"].accuracy,
    1 / 3,
  );
});

test("recommendation prioritizes a due missed question", () => {
  const recommendation = core.recommendQuestion(
    questions,
    [{ questionId: "q2", correct: false, reviewAt: 10 }],
    { now: 20, recentIds: [] },
  );
  assert.equal(recommendation.question.id, "q2");
  assert.equal(recommendation.kind, "review");
});

test("recommendation avoids recent questions when possible", () => {
  const recommendation = core.recommendQuestion(questions, [], {
    recentIds: ["q1"],
  });
  assert.notEqual(recommendation.question.id, "q1");
});
