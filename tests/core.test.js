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

/* -------------------------------------------------------------- mini tests */

const catalog = require("../content/catalog.json");

function syntheticBank(sectionKey, section, count) {
  const difficulties = ["Easy", "Medium", "Hard"];
  return Array.from({ length: count }, (unused, index) => ({
    id: `${sectionKey}-${index}`,
    test: sectionKey.startsWith("sat") ? "SAT" : "ACT",
    section,
    sectionKey,
    domain: `Domain ${index % 3}`,
    skill: `Skill ${index % 5}`,
    difficulty: difficulties[index % 3],
    responseType: "multiple-choice",
    choices: ["a", "b", "c", "d"],
    correctAnswer: index % 4,
  }));
}

function banksFor(blueprint) {
  return Object.fromEntries(
    blueprint.sections.map((entry) => [
      entry.sectionKey,
      syntheticBank(entry.sectionKey, entry.sectionKey, 120),
    ]),
  );
}

test("every mini test blueprint references real catalog sections", () => {
  const known = new Set(catalog.sections.map((section) => section.key));
  for (const blueprint of core.MINI_TEST_BLUEPRINTS) {
    assert.ok(blueprint.id && blueprint.label && blueprint.minutes > 0);
    for (const entry of blueprint.sections) {
      assert.ok(
        known.has(entry.sectionKey),
        `${blueprint.id} references unknown section ${entry.sectionKey}`,
      );
      assert.ok(entry.count > 0);
    }
  }
});

test("every mini test blueprint totals twenty questions", () => {
  for (const blueprint of core.MINI_TEST_BLUEPRINTS) {
    assert.equal(
      core.blueprintTotal(blueprint),
      20,
      `${blueprint.id} does not total 20 questions`,
    );
  }
});

test("mini test difficulty mix sums to one", () => {
  const total = core.MINI_TEST_DIFFICULTY_MIX.reduce(
    (sum, entry) => sum + entry.weight,
    0,
  );
  assert.ok(Math.abs(total - 1) < 1e-9);
});

test("allocateByWeight distributes remainders without losing items", () => {
  assert.deepEqual(core.allocateByWeight(20, [0.3, 0.45, 0.25]), [6, 9, 5]);
  assert.equal(core.allocateByWeight(7, [0.3, 0.45, 0.25]).reduce((a, b) => a + b), 7);
  assert.equal(core.allocateByWeight(1, [0.3, 0.45, 0.25]).reduce((a, b) => a + b), 1);
});

test("buildMiniTest honors each blueprint's per-section counts and order", () => {
  for (const blueprint of core.MINI_TEST_BLUEPRINTS) {
    const built = core.buildMiniTest(banksFor(blueprint), blueprint, "seed-1");
    assert.equal(built.length, core.blueprintTotal(blueprint));

    const counts = {};
    built.forEach((question) => {
      counts[question.sectionKey] = (counts[question.sectionKey] || 0) + 1;
    });
    blueprint.sections.forEach((entry) => {
      assert.equal(counts[entry.sectionKey], entry.count);
    });

    // Sections stay grouped in blueprint order.
    const order = built.map((question) => question.sectionKey);
    const expected = blueprint.sections.flatMap((entry) =>
      Array.from({ length: entry.count }, () => entry.sectionKey),
    );
    assert.deepEqual(order, expected);

    const ids = new Set(built.map((question) => question.id));
    assert.equal(ids.size, built.length, "mini test repeated a question");
  }
});

test("buildMiniTest is deterministic for a given seed", () => {
  const blueprint = core.blueprintById("sat");
  const banks = banksFor(blueprint);
  const first = core.buildMiniTest(banks, blueprint, "same-seed");
  const second = core.buildMiniTest(banks, blueprint, "same-seed");
  const third = core.buildMiniTest(banks, blueprint, "other-seed");
  assert.deepEqual(first.map((q) => q.id), second.map((q) => q.id));
  assert.notDeepEqual(first.map((q) => q.id), third.map((q) => q.id));
});

test("buildMiniTest excludes essay prompts", () => {
  const blueprint = {
    id: "essay-check",
    sections: [{ sectionKey: "act-writing", count: 3 }],
  };
  const bank = syntheticBank("act-writing", "Writing", 10)
    .map((question) => ({ ...question, responseType: "essay" }))
    .concat(syntheticBank("act-writing-mc", "Writing", 4)
      .map((question) => ({ ...question, sectionKey: "act-writing" })));
  const built = core.buildMiniTest({ "act-writing": bank }, blueprint, "seed");
  assert.equal(built.length, 3);
  assert.ok(built.every((question) => question.responseType !== "essay"));
});

test("buildMiniTest backfills when a difficulty tier is short", () => {
  const blueprint = { id: "thin", sections: [{ sectionKey: "thin", count: 6 }] };
  const bank = syntheticBank("thin", "Thin", 8)
    .map((question) => ({ ...question, difficulty: "Medium" }));
  const built = core.buildMiniTest({ thin: bank }, blueprint, "seed");
  assert.equal(built.length, 6);
  assert.equal(new Set(built.map((q) => q.id)).size, 6);
});

test("summarizeMiniTest reports accuracy by section and domain", () => {
  const items = [
    { id: "a", sectionKey: "s1", test: "SAT", section: "Math", domain: "Algebra",
      responseType: "multiple-choice", choices: ["w", "x"], correctAnswer: 0 },
    { id: "b", sectionKey: "s1", test: "SAT", section: "Math", domain: "Algebra",
      responseType: "multiple-choice", choices: ["w", "x"], correctAnswer: 1 },
    { id: "c", sectionKey: "s2", test: "SAT", section: "Reading", domain: "Ideas",
      responseType: "multiple-choice", choices: ["w", "x"], correctAnswer: 0 },
  ];
  const responses = new Map([["a", 0], ["b", 0]]);
  const summary = core.summarizeMiniTest(items, responses);

  assert.equal(summary.total, 3);
  assert.equal(summary.answered, 2);
  assert.equal(summary.unanswered, 1);
  assert.equal(summary.correct, 1);
  assert.equal(summary.accuracy, 1 / 3);

  const math = summary.bySection.find((row) => row.sectionKey === "s1");
  assert.equal(math.total, 2);
  assert.equal(math.correct, 1);
  assert.equal(math.accuracy, 0.5);

  // Weakest domain sorts first.
  assert.equal(summary.byDomain[0].accuracy, 0);
  assert.equal(summary.byDomain[0].domain, "Ideas");
});

test("summarizeMiniTest counts a blank answer as incorrect, not skipped", () => {
  const items = [
    { id: "a", sectionKey: "s1", test: "ACT", section: "Math", domain: "Algebra",
      responseType: "numeric", correctAnswer: "5" },
  ];
  const summary = core.summarizeMiniTest(items, new Map([["a", ""]]));
  assert.equal(summary.unanswered, 1);
  assert.equal(summary.correct, 0);
  assert.equal(summary.accuracy, 0);
  assert.equal(summary.items[0].answered, false);
});
