#!/usr/bin/env node
"use strict";

// Exercises every math shape without writing a bank.
//
//   node scripts/check-shapes.js                 # both math sections
//   node scripts/check-shapes.js act-mathematics
//
// A shape is a closure that builds one question from a sequence number, so the
// only way to know it is sound is to run it across many sequences. This drives
// each shape over a spread of inputs and asserts the invariants the generator's
// own assembly step and the shipped validator both rely on: no ASCII hyphen
// standing in for a minus sign, four distinct choices, a key that is not
// duplicated by a distractor, and every distractor carrying a reason. Where a
// shape supplies a `verification` block, the recomputation is run here too, so
// an answer that disagrees with its own stated check fails before it reaches a
// bank.

// Imported rather than reimplemented: this is the rule that decides whether a
// rebuilt bank is accepted, so the harness has to apply exactly the validator's
// comparison, not a lookalike that could drift away from it.
const { jaccard, tokenSet } = require("./lib/content");

const SECTIONS = {
  "act-mathematics": () => require("./generate-act-mathematics").SHAPES,
  "sat-math": () => require("./generate-sat-math").SHAPES,
};

const TIERS = ["Easy", "Medium", "Hard"];
// The banks draw sequence numbers across the whole section, so a shape that
// only misbehaves at, say, sequence 187 has to fail here rather than during a
// rebuild. This sweeps past the largest per-section target in the catalog.
const SEQUENCES = 1200;

// How many times one shape may be reused inside a single bank, with margin: a
// 1050-item section spread over roughly 230 shapes averages under five.
const REUSES = 8;

// The validator's threshold. Two stems at or above this overlap are rejected as
// near duplicates, so a shape whose reuses cross it cannot fill a bank.
const NEAR_DUPLICATE = 0.9;

// Mirrors validateVerification in lib/content.js. Duplicated deliberately: this
// runs before any bank exists, and a shape whose stated check disagrees with its
// own answer should fail here rather than after 575 items have been written.
function recompute(verification) {
  const n = verification.inputs;
  switch (verification.kind) {
    case "sum": return n.reduce((sum, value) => sum + value, 0);
    case "product": return n.reduce((product, value) => product * value, 1);
    case "mean": return n.reduce((sum, value) => sum + value, 0) / n.length;
    case "linear-equation": return (n[2] - n[1]) / n[0];
    case "percent-of": return n[0] * n[1] / 100;
    case "percent-change": return (n[1] - n[0]) / n[0] * 100;
    case "distance": return Math.hypot(n[2] - n[0], n[3] - n[1]);
    case "midpoint-x": return (n[0] + n[1]) / 2;
    case "pythagorean": return Math.hypot(n[0], n[1]);
    case "probability": return n[0] / n[1];
    case "circle-area-coefficient": return n[0] ** 2;
    default: return null;
  }
}

const ASCII_MINUS_IN_NUMBER = /(^|[\s(\[{=,+·×/])-\d|[\w)]-[\d(]/;

function choiceText(raw) {
  if (typeof raw === "number") return String(raw).replace("-", "−");
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object" && typeof raw.text === "string") return raw.text;
  return String(raw);
}

function choiceValue(raw) {
  if (typeof raw === "number") return raw;
  if (raw && typeof raw === "object" && typeof raw.value === "number") return raw.value;
  const parsed = Number(String(raw).replace("−", "-"));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function checkShape(sectionKey, subskill, tier, shapeIndex, shape, problems) {
  const where = `${sectionKey} ${subskill}/${tier}#${shapeIndex}`;
  const families = new Set();
  const stems = new Set();
  for (let sequence = 0; sequence < SEQUENCES; sequence += 1) {
    for (let variant = 0; variant < 4; variant += 1) {
      let spec;
      try {
        spec = shape(sequence, variant);
      } catch (error) {
        problems.push(`${where} seq=${sequence} threw: ${error.message}`);
        return;
      }
      if (!spec || typeof spec !== "object") {
        problems.push(`${where} seq=${sequence} returned no spec`);
        return;
      }
      if (!spec.family) problems.push(`${where} seq=${sequence} has no family tag`);
      families.add(spec.family);
      if (typeof spec.stem !== "string" || !spec.stem.trim()) {
        problems.push(`${where} seq=${sequence} has an empty stem`);
        continue;
      }
      stems.add(spec.stem);
      if (ASCII_MINUS_IN_NUMBER.test(spec.stem)) {
        problems.push(`${where} seq=${sequence} stem uses an ASCII hyphen as a minus: ${spec.stem}`);
      }
      if (/\$\{/.test(spec.stem)) {
        problems.push(`${where} seq=${sequence} stem contains an unexpanded template: ${spec.stem}`);
      }

      const answerText = choiceText(spec.answer);
      const answerValue = choiceValue(spec.answer);
      if (!answerText || answerText === "NaN" || answerText === "undefined") {
        problems.push(`${where} seq=${sequence} answer is ${answerText}`);
      }
      if (answerText.includes("-")) {
        problems.push(`${where} seq=${sequence} answer uses an ASCII hyphen: ${answerText}`);
      }

      const seen = new Set([answerText]);
      let usable = 0;
      (spec.wrong || []).forEach(([raw, reason]) => {
        const text = choiceText(raw);
        const value = choiceValue(raw);
        if (text.includes("-")) {
          problems.push(`${where} seq=${sequence} distractor uses an ASCII hyphen: ${text}`);
        }
        if (/\$\{/.test(String(reason))) {
          problems.push(`${where} seq=${sequence} distractor reason has an unexpanded template`);
        }
        if (!reason || typeof reason !== "string" || reason.length < 12) {
          problems.push(`${where} seq=${sequence} distractor "${text}" has no usable reason`);
        }
        if (text === "NaN" || text === "undefined" || text === "Infinity") {
          problems.push(`${where} seq=${sequence} distractor evaluates to ${text}`);
          return;
        }
        if (seen.has(text)) return;
        if (Number.isFinite(value) && Number.isFinite(answerValue) && value === answerValue) {
          problems.push(`${where} seq=${sequence} distractor "${text}" equals the key numerically`);
          return;
        }
        seen.add(text);
        usable += 1;
      });
      if (usable < 3) {
        problems.push(`${where} seq=${sequence} yields only ${usable} usable distractors`);
      }

      ["why", "hint"].forEach((field) => {
        if (typeof spec[field] !== "string" || !spec[field].trim()) {
          problems.push(`${where} seq=${sequence} is missing ${field}`);
        } else if (/\$\{/.test(spec[field])) {
          problems.push(`${where} seq=${sequence} ${field} contains an unexpanded template`);
        }
      });
      if (!Array.isArray(spec.steps) || spec.steps.length < 2) {
        problems.push(`${where} seq=${sequence} needs at least two solution steps`);
      }
      if (!Array.isArray(spec.principles) || spec.principles.length < 1) {
        problems.push(`${where} seq=${sequence} needs at least one principle`);
      }

      if (spec.verification) {
        const computed = recompute(spec.verification);
        if (computed === null) {
          problems.push(`${where} seq=${sequence} uses unknown verification kind "${spec.verification.kind}"`);
        } else if (Math.abs(computed - spec.verification.expected) > 1e-9) {
          problems.push(
            `${where} seq=${sequence} verification recomputes to ${computed}, not ${spec.verification.expected}`,
          );
        } else if (
          Number.isFinite(answerValue) &&
          Math.abs(spec.verification.expected - answerValue) > 1e-6
        ) {
          problems.push(
            `${where} seq=${sequence} verification expects ${spec.verification.expected} but the key is ${answerValue}`,
          );
        }
      }
    }
  }
  if (families.size > 1) {
    problems.push(`${where} reports ${families.size} different family names: ${[...families].join(", ")}`);
  }
  // A shape reused across the bank that always emits the same sentence is a
  // duplicate in every way the audit measures.
  if (stems.size < 4) {
    problems.push(`${where} produces only ${stems.size} distinct stems across ${SEQUENCES} sequences`);
  }
  checkReuses(sectionKey, where, shape, problems);
}

// Changing the numbers is not enough to make a second use of a shape a second
// question. The validator compares stems word by word — and for the maths
// sections it keeps the numbers in that comparison — so reuses have to differ
// in their wording or their setting. This rebuilds a shape the way a bank would
// reuse it, at variants 0..7 over spread-out sequences, and applies the
// validator's own rule to every pair. A shape that fails here cannot fill a
// bank: the rebuild would be rejected, or the generator would starve looking
// for a stem it is allowed to emit.
function checkReuses(sectionKey, where, shape, problems) {
  [0, 311, 704].forEach((base) => {
    const uses = [];
    for (let use = 0; use < REUSES; use += 1) {
      const spec = shape(base + use * 53, use);
      uses.push({
        variant: use,
        tokens: tokenSet({
          section: sectionKey === "sat-math" ? "Math" : "Mathematics",
          stem: spec.stem,
          stimulus: spec.stimulus || null,
        }),
      });
    }
    for (let left = 0; left < uses.length; left += 1) {
      for (let right = left + 1; right < uses.length; right += 1) {
        const overlap = jaccard(uses[left].tokens, uses[right].tokens);
        if (overlap >= NEAR_DUPLICATE) {
          problems.push(
            `${where} reuses ${uses[left].variant} and ${uses[right].variant} overlap ` +
              `${Math.round(overlap * 100)}%, which the validator rejects as a near duplicate; ` +
              "rotate the wording or the setting on `variant`",
          );
          return;
        }
      }
    }
  });
}

function checkSection(sectionKey, problems) {
  const shapes = SECTIONS[sectionKey]();
  const covered = [];
  Object.entries(shapes).forEach(([subskill, tiers]) => {
    TIERS.forEach((tier) => {
      const list = tiers[tier];
      if (!Array.isArray(list) || list.length === 0) {
        problems.push(`${sectionKey} ${subskill} has no ${tier} shapes`);
        return;
      }
      if (list.length < 2) {
        problems.push(`${sectionKey} ${subskill}/${tier} has only one shape; a tier needs several`);
      }
      list.forEach((shape, index) => {
        checkShape(sectionKey, subskill, tier, index, shape, problems);
        covered.push(`${subskill}/${tier}#${index}`);
      });
    });
  });
  return covered.length;
}

function main() {
  const requested = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
  const sections = requested.length ? requested : Object.keys(SECTIONS);
  const problems = [];
  let shapes = 0;
  sections.forEach((sectionKey) => {
    if (!SECTIONS[sectionKey]) throw new Error(`Unknown section ${sectionKey}`);
    shapes += checkSection(sectionKey, problems);
  });

  const unique = [...new Set(problems)];
  unique.slice(0, 60).forEach((problem) => console.log(`  ${problem}`));
  if (unique.length > 60) console.log(`  ... and ${unique.length - 60} more`);
  console.log(
    `\n${shapes} shapes exercised over ${SEQUENCES} sequences: ` +
      `${unique.length ? `${unique.length} problems` : "clean"}.`,
  );
  if (unique.length) process.exit(1);
}

if (require.main === module) main();

module.exports = { checkShape, checkSection };
