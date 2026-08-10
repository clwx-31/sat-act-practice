"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const core = require("../core");
const booklet = require("../booklet");

function makeBank(sectionKey, count, offset) {
  const difficulties = ["Easy", "Medium", "Hard"];
  return Array.from({ length: count }, (unused, index) => ({
    id: `${sectionKey}-${String(index + offset).padStart(4, "0")}`,
    test: sectionKey.startsWith("sat") ? "SAT" : "ACT",
    sectionKey,
    section: sectionKey,
    domain: "Algebra",
    skill: "Linear equations",
    subskill: "solve",
    difficulty: difficulties[index % 3],
    responseType: "multiple-choice",
    stem: `Question ${index + offset}?`,
    choices: ["one", "two", "three", "four"],
    correctAnswer: index % 4,
    explanation: "Because.",
    solutionSteps: ["Step one."],
    distractorRationales: [0, 1, 2, 3]
      .filter((choice) => choice !== index % 4)
      .map((choice) => ({ index: choice, reason: "Wrong." })),
    trap: "A trap.",
    stimulus: null,
  }));
}

const bankBySection = {
  "sat-reading-writing": makeBank("sat-reading-writing", 200, 1),
  "sat-math": makeBank("sat-math", 200, 1),
};

const blueprint = core.blueprintById("sat-full");

test("full-length blueprints match the official section structure", () => {
  assert.equal(core.blueprintTotal(blueprint), 98);
  assert.equal(core.blueprintTotal(core.blueprintById("act-full")), 131);
  assert.equal(core.blueprintTotal(core.blueprintById("act-full-science")), 171);
});

test("buildTestForm never repeats a question across modules of one bank", () => {
  const form = core.buildTestForm(bankBySection, blueprint, "seed-a");
  const ids = form.flatMap((group) => group.questions.map((question) => question.id));
  assert.equal(ids.length, 98);
  assert.equal(new Set(ids).size, 98, "every drawn question must be distinct");
});

test("buildTestForm fills every section to its requested count", () => {
  const form = core.buildTestForm(bankBySection, blueprint, "seed-b");
  form.forEach((group) => {
    assert.equal(group.questions.length, group.entry.count, group.label);
  });
});

test("buildTestForm is deterministic for a seed and varies across seeds", () => {
  const first = core.buildTestForm(bankBySection, blueprint, "same");
  const second = core.buildTestForm(bankBySection, blueprint, "same");
  const other = core.buildTestForm(bankBySection, blueprint, "different");
  const ids = (form) => form.flatMap((g) => g.questions.map((q) => q.id)).join(",");
  assert.equal(ids(first), ids(second));
  assert.notEqual(ids(first), ids(other));
});

test("SAT keeps A-D labels and the ACT alternates F-J on even questions", () => {
  assert.deepEqual(core.answerLetters("SAT", 1), ["A", "B", "C", "D"]);
  assert.deepEqual(core.answerLetters("SAT", 2), ["A", "B", "C", "D"]);
  assert.deepEqual(core.answerLetters("ACT", 1), ["A", "B", "C", "D"]);
  assert.deepEqual(core.answerLetters("ACT", 2), ["F", "G", "H", "J"]);
  assert.deepEqual(core.answerLetters("ACT", 3), ["A", "B", "C", "D"]);
});

test("booklet numbering runs continuously and keys the right letter", () => {
  const form = core.buildTestForm(bankBySection, blueprint, "seed-c");
  const model = booklet.buildModel(form, blueprint, "seed-c");
  const items = model.sections.flatMap((section) => section.questions);
  assert.equal(model.total, 98);
  items.forEach((item, index) => {
    assert.equal(item.number, index + 1);
    assert.equal(item.correctLetter, item.letters[item.question.correctAnswer]);
  });
  assert.equal(model.minutes, 134);
});

test("form codes are stable per seed", () => {
  assert.equal(booklet.formCode("seed-c"), booklet.formCode("seed-c"));
  assert.notEqual(booklet.formCode("seed-c"), booklet.formCode("seed-d"));
});

test("one shared seed gives each blueprint its own form code", () => {
  const codes = core.ALL_BLUEPRINTS.map((candidate) => {
    const form = candidate.sections.map((entry) => ({
      entry,
      label: entry.label,
      minutes: entry.minutes,
      directions: entry.directions,
      questions: [],
    }));
    return booklet.buildModel(form, candidate, "shared").formCode;
  });
  assert.equal(new Set(codes).size, codes.length, `form codes collided: ${codes}`);
});

test("a shared seed rebuilds a byte-identical booklet", () => {
  const render = (seed) => {
    const form = core.buildTestForm(bankBySection, blueprint, seed);
    return booklet.renderBookletHtml(booklet.buildModel(form, blueprint, seed));
  };
  assert.equal(render("shared-link"), render("shared-link"));
  assert.notEqual(render("shared-link"), render("other-link"));
});

test("stimulus text splits into paragraphs, tables, and lists", () => {
  const blocks = booklet.parseBlocks(
    "Intro line.\n\nPeriod | Count\nFirst | 48\nThird | 62\n\n• alpha\n• beta",
  );
  assert.deepEqual(blocks.map((block) => block.type), ["text", "table", "list"]);
  assert.deepEqual(blocks[1].rows[0], ["Period", "Count"]);
  assert.deepEqual(blocks[2].items, ["alpha", "beta"]);
});

test("pipe tables render as real HTML tables", () => {
  const html = booklet.blocksToHtml("Thickness | Loss\n3 | 37\n6 | 34");
  assert.match(html, /<table class="data">/);
  assert.match(html, /<th>Thickness<\/th>/);
  assert.match(html, /<td>37<\/td>/);
});

test("LaTeX escaping emits no raw Unicode and protects specials", () => {
  const source = "50% of x² − 3 ≤ π, “quoted” — ends with √9 and 5 × 2 & more_stuff";
  const out = booklet.tex(source);
  assert.match(out, /\\%/);
  assert.match(out, /\\textsuperscript\{2\}/);
  assert.match(out, /\$-\$/);
  assert.match(out, /\$\\leq\$/);
  assert.match(out, /\$\\pi\$/);
  assert.match(out, /``quoted''/);
  assert.match(out, /---/);
  assert.match(out, /\$\\sqrt\{9\}\$/);
  assert.match(out, /\$\\times\$/);
  assert.match(out, /\\&/);
  assert.match(out, /\\_/);
  assert.ok(
    !/[^\x00-\x7F]/.test(out),
    `LaTeX output must stay ASCII, got: ${out}`,
  );
});

test("full blueprints fit the real catalog and the real banks", () => {
  const { loadCatalog, loadBank } = require("../scripts/lib/content");
  const known = new Set(loadCatalog().sections.map((section) => section.key));
  const scoreable = new Map();

  for (const blueprint of core.FULL_TEST_BLUEPRINTS) {
    assert.ok(blueprint.id && blueprint.label && blueprint.minutes > 0);
    const demand = new Map();
    for (const entry of blueprint.sections) {
      assert.ok(
        known.has(entry.sectionKey),
        `${blueprint.id} references unknown section ${entry.sectionKey}`,
      );
      assert.ok(entry.count > 0 && entry.minutes > 0 && entry.label && entry.directions);
      demand.set(entry.sectionKey, (demand.get(entry.sectionKey) || 0) + entry.count);
    }
    // Modules that share a bank draw without replacement, so the bank must
    // cover their combined demand, not just the largest single module.
    for (const [sectionKey, needed] of demand) {
      if (!scoreable.has(sectionKey)) {
        scoreable.set(
          sectionKey,
          loadBank(sectionKey).filter((question) => question.responseType !== "essay")
            .length,
        );
      }
      assert.ok(
        scoreable.get(sectionKey) >= needed,
        `${blueprint.id} needs ${needed} ${sectionKey} items but the bank has ` +
          `${scoreable.get(sectionKey)}`,
      );
    }
  }
});

test("rendered booklet and key cover every question", () => {
  const form = core.buildTestForm(bankBySection, blueprint, "seed-e");
  const model = booklet.buildModel(form, blueprint, "seed-e");
  const html = booklet.renderBookletHtml(model);
  const key = booklet.renderKeyHtml(model);
  assert.equal((html.match(/class="q"/g) || []).length, 98);
  assert.match(html, /Answer sheet/);
  assert.equal((key.match(/Correct answer:/g) || []).length, 98);
  const texOut = booklet.renderTex(model);
  assert.equal((texOut.match(/\\question\{/g) || []).length, 98);
  assert.ok(!/[^\x00-\x7F]/.test(texOut), "LaTeX source must stay ASCII");
});
