"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { shapeSignature } = require("../scripts/check-difficulty");

test("difficulty signatures keep otherwise identical passage sets separate", () => {
  const base = {
    subskill: "transitions",
    stimulus: null,
    stem: "Which choice is best for underlined portion 3?",
    choices: ["NO CHANGE", "First", "Still", "Thus"],
  };
  const first = shapeSignature({ ...base, passageId: "act-english-p001" });
  const second = shapeSignature({ ...base, passageId: "act-english-p002" });

  assert.notEqual(first, second);
  assert.match(first, /^act-english-p001\|/);
});
