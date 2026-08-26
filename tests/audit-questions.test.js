"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { blindScore, shapeSignature } = require("../scripts/audit-questions");

function question(choices, correctAnswer) {
  return { choices, correctAnswer };
}

test("blind score treats four equal-length choices as chance", () => {
  assert.equal(blindScore([question(["12", "15", "18", "21"], 2)]), 0.25);
});

test("blind score splits credit across tied longest choices", () => {
  assert.equal(blindScore([question(["a", "long", "also", "b"], 2)]), 0.5);
});

test("blind score gives full credit only for a unique longest key", () => {
  assert.equal(blindScore([question(["a", "longest", "bb", "ccc"], 1)]), 1);
  assert.equal(blindScore([question(["a", "longest", "bb", "ccc"], 3)]), 0);
});

test("shape signatures preserve passage IDs outside number normalization", () => {
  const base = {
    sectionKey: "act-english",
    subskill: "commas",
    stimulus: null,
    stem: "Which choice is best for underlined portion 7?",
  };
  const first = shapeSignature({ ...base, passageId: "act-english-p001" });
  const second = shapeSignature({ ...base, passageId: "act-english-p002" });

  assert.notEqual(first, second);
  assert.match(first, /act-english-p001/);
});
