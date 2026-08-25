#!/usr/bin/env node
"use strict";

const { generateSection, hashString, rotate } = require("./lib/generation");
const { loadBank } = require("./lib/content");
const { pose } = require("./lib/phrasing");
const { COLLECTION, DECAY_SAMPLE, EXPONENTIAL_GROWTH, FINANCE, GROUND, HOURLY_SERVICE, MEMBERSHIP, PROJECTILE, RECIPE, scene, TRAVEL, VESSEL, WATERCRAFT } = require("./lib/scenes");
const { context } = require("./generate-sat-math");

const SECTION_KEY = "act-mathematics";
const GENERATOR_NAME = "act-mathematics-generator-v1";
const REBUILD = process.argv.includes("--rebuild");
const MINUS = "−";

// Enhanced ACT Mathematics ramps hard: 1-15 are one-step, 16-35 take two or
// three steps or a modelling translation, and 36-45 reach logarithms, the unit
// circle, complex numbers, matrices, sequences, conics, vectors, composition
// and inverses, counting models, and parameterised systems. Every subskill
// therefore carries several structurally different shapes per tier, and the
// tier the catalog assigns picks the shape family.
const TIER_SECONDS = { Easy: 40, Medium: 60, Hard: 100 };

const TIER_STRATEGY = {
  Easy: "Name the single relationship being tested, apply it once, and confirm the result answers the question that was asked.",
  Medium: "Plan the two or three steps before computing: find the intermediate quantity first, then convert it into what the question requests.",
  Hard: "Identify the governing structure — the law, identity, theorem, or counting model — and work symbolically as far as possible before substituting numbers.",
};

const TIER_TRAP = {
  Easy: "Reporting a number that appears in the setup instead of the quantity the question asks for.",
  Medium: "Stopping at the intermediate value produced by the first step.",
  Hard: "Reaching for a rule that is close to the right one — the wrong exponent or logarithm law, the wrong counting model, the wrong sign convention — and never testing the answer against the structure of the problem.",
};

/* ------------------------------------------------------------------ *
 * Formatting                                                          *
 * ------------------------------------------------------------------ */

function round3(value) {
  return Math.round(value * 1000) / 1000;
}

// Every negative number rendered anywhere in an item uses U+2212, in choices as
// well as in stems; the old bank mixed the typographic minus into stems and the
// ASCII hyphen into choices.
function num(value) {
  const rounded = Number.isInteger(value) ? value : round3(value);
  return String(rounded).replace("-", MINUS);
}

function neg(value) {
  return num(-Math.abs(value));
}

function val(text, value) {
  return { text, value };
}

function frac(numerator, denominator) {
  const sign = numerator * denominator < 0 ? MINUS : "";
  return val(
    `${sign}${Math.abs(numerator)}/${Math.abs(denominator)}`,
    numerator / denominator,
  );
}

function pi(coefficient) {
  return val(`${num(coefficient)}π`, coefficient);
}

function radical(coefficient, radicand) {
  const lead = coefficient === 1 ? "" : num(coefficient);
  return val(`${lead}√${radicand}`, coefficient * Math.sqrt(radicand));
}

function degrees(value) {
  return val(`${num(value)}°`, value);
}

function money(value) {
  const fixed = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return val(`$${fixed}`, value);
}

function point(x, y) {
  return val(`(${num(x)}, ${num(y)})`, Number.NaN);
}

// The validator recomputes verification.kind over verification.inputs, and its
// vocabulary is fixed elsewhere; "linear-equation" solves a·x + b = c, which is
// the honest way to express a quotient check without stretching "probability"
// to cover every division in the bank.
function quotientCheck(dividend, divisor, expected) {
  return { kind: "linear-equation", inputs: [divisor, 0, dividend], expected };
}

function toChoice(raw) {
  if (typeof raw === "number") return val(num(raw), raw);
  if (typeof raw === "string") return val(raw, Number.NaN);
  return raw;
}

/* ------------------------------------------------------------------ *
 * Parameter helpers                                                   *
 * ------------------------------------------------------------------ */

function span(sequence, low, count, step = 1) {
  return low + (sequence % count) * step;
}

function choose(sequence, options) {
  return options[sequence % options.length];
}

// Four ways to ask for the same unknown. Each carries a word the others lack,
// so two uses of one shape never read as the same sentence.
function ask(variant, symbol) {
  return choose(variant, [
    `what is the value of ${symbol}?`,
    `which number must ${symbol} equal?`,
    `${symbol} represents what quantity?`,
    `what does ${symbol} equal?`,
  ]);
}

function gcd(left, right) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a;
}

function lcm(left, right) {
  return (left * right) / gcd(left, right);
}

function factorial(value) {
  let product = 1;
  for (let index = 2; index <= value; index += 1) product *= index;
  return product;
}

function permutations(n, r) {
  let product = 1;
  for (let index = 0; index < r; index += 1) product *= n - index;
  return product;
}

function combinations(n, r) {
  return permutations(n, r) / factorial(r);
}

const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 16, 20]];

// Answers that are themselves exponents cannot be recomputed by any of the
// validator's arithmetic kinds directly. Dividing the argument down by the base
// and counting the divisions re-derives the exponent from the two given
// numbers, which is a genuine independent check rather than a restatement; the
// count is then expressed as a sum of ones, the same convention the bank
// already uses for "how many integers satisfy this" items.
function factorCountCheck(argument, base, expected) {
  const ones = [];
  let remaining = argument;
  while (remaining > 1 && ones.length < 64) {
    remaining /= base;
    ones.push(1);
  }
  if (Math.abs(remaining - 1) > 1e-9) return null;
  return { kind: "sum", inputs: ones, expected };
}

/* ------------------------------------------------------------------ *
 * Answer placement                                                    *
 * ------------------------------------------------------------------ */

// lib/generation.js balances the key's position inside each difficulty tier and
// then splices the key into the distractor list at that position. Real ACT
// numeric choice sets run in ascending order, so the generator has to know the
// position before it can pick a distractor set whose sorted order puts the key
// there. This mirrors that planner exactly — same counts, same tie-break — and
// the rebuild audit reports the share of items whose choices really do end up
// ascending, which is what catches any drift between the two copies.
function mirrorAnswerPlanner() {
  const counts = { Easy: [0, 0, 0, 0], Medium: [0, 0, 0, 0], Hard: [0, 0, 0, 0] };
  loadBank(SECTION_KEY)
    .filter((question) => !REBUILD || question.provenance.generator !== GENERATOR_NAME)
    .filter((question) => question.responseType === "multiple-choice")
    .forEach((question) => {
      const tier = counts[question.difficulty] || counts.Medium;
      tier[question.correctAnswer] += 1;
    });
  return function nextPosition(difficulty, seedKey) {
    const tier = counts[difficulty] || counts.Medium;
    const fewest = Math.min(...tier);
    const candidates = [0, 1, 2, 3].filter((index) => tier[index] === fewest);
    const choice = candidates[hashString(String(seedKey)) % candidates.length];
    tier[choice] += 1;
    return choice;
  };
}

/* ------------------------------------------------------------------ *
 * Assembly                                                            *
 * ------------------------------------------------------------------ */

const ASCII_MINUS_IN_NUMBER = /(^|[\s(\[{=,+·×/])-\d|[\w)]-[\d(]/;

function guardStem(spec) {
  if (ASCII_MINUS_IN_NUMBER.test(spec.stem)) {
    throw new Error(`${spec.family}: stem uses an ASCII hyphen as a minus sign`);
  }
}

function assemble(spec, tier, index) {
  guardStem(spec);
  const answer = toChoice(spec.answer);
  const seen = new Set([answer.text]);
  const pool = [];
  spec.wrong.forEach(([raw, reason]) => {
    const choice = toChoice(raw);
    if (choice.text.includes("-")) {
      throw new Error(`${spec.family}: choice "${choice.text}" uses an ASCII hyphen`);
    }
    if (seen.has(choice.text)) return;
    if (Number.isFinite(choice.value) && choice.value === answer.value) return;
    seen.add(choice.text);
    pool.push({ text: choice.text, value: choice.value, reason });
  });
  if (pool.length < 3) {
    throw new Error(`${spec.family}: only ${pool.length} usable distractors`);
  }

  const numeric = Number.isFinite(answer.value) && pool.every((item) => Number.isFinite(item.value));
  let chosen = pool.slice(0, 3);
  let ordered = true;
  if (numeric) {
    const below = pool.filter((item) => item.value < answer.value);
    const above = pool.filter((item) => item.value > answer.value);
    if (below.length >= index && above.length >= 3 - index) {
      chosen = below.slice(0, index).concat(above.slice(0, 3 - index));
    } else {
      ordered = false;
      chosen = pool.slice(0, 3);
    }
    chosen = chosen.slice().sort((left, right) => left.value - right.value);
  }

  return {
    ordered,
    question: {
      responseType: "multiple-choice",
      stimulus: spec.stimulus || null,
      stem: spec.stem,
      correct: answer.text,
      correctAnswer: answer.text,
      distractors: chosen.map((item) => ({ text: item.text, reason: item.reason })),
      hint: spec.hint,
      explanation: spec.why,
      solutionSteps: spec.steps,
      strategy: spec.strategy || TIER_STRATEGY[tier],
      trap: spec.trap || TIER_TRAP[tier],
      estimatedSeconds: TIER_SECONDS[tier],
      principles: spec.principles,
      format: "standalone",
      tags: [`templateFamily:act-math/${spec.family}/${tier.toLowerCase()}`],
      verification: spec.verification || null,
    },
  };
}

const SUBSCRIPTS = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

function sub(value) {
  return String(value).split("").map((digit) => SUBSCRIPTS[Number(digit)]).join("");
}

function ordinal(value) {
  const tens = value % 100;
  if (tens >= 11 && tens <= 13) return `${value}th`;
  return `${value}${["th", "st", "nd", "rd"][value % 10] || "th"}`;
}

function cplx(real, imaginary) {
  const sign = imaginary < 0 ? `${MINUS} ` : "+ ";
  const size = Math.abs(imaginary) === 1 ? "" : String(Math.abs(imaginary));
  return `${num(real)} ${sign}${size}i`;
}

const UNITS = [
  { from: "feet", to: "inches", factor: 12 },
  { from: "yards", to: "feet", factor: 3 },
  { from: "hours", to: "minutes", factor: 60 },
  { from: "meters", to: "centimeters", factor: 100 },
  { from: "kilograms", to: "grams", factor: 1000 },
  { from: "pounds", to: "ounces", factor: 16 },
  { from: "gallons", to: "quarts", factor: 4 },
  { from: "weeks", to: "days", factor: 7 },
];

const SHAPES = {};

SHAPES["number properties"] = {
  Easy: [
    (s, variant) => {
      const shared = 6 + 2 * (s % 5);
      const cofactor = 3 + (s % 3);
      const smaller = shared * cofactor;
      const larger = shared * (cofactor + 1);
      return {
        family: "gcf-of-two-multiples",
        stem: pose(variant, "quantityOf", {
          description: `the greatest common factor of ${smaller} and ${larger}`,
        }),
        answer: shared,
        wrong: [
          [1, "This treats the two numbers as relatively prime, but both are even and share a much larger factor."],
          [2, `2 divides ${smaller} and ${larger}, but it is not the greatest factor that does.`],
          [cofactor, `${cofactor} is the cofactor left when ${smaller} is divided by the shared factor, not the shared factor itself.`],
          [2 * shared, `Doubling the shared factor overshoots: ${2 * shared} does not divide ${larger}.`],
          [smaller, "The smaller number divides itself but does not divide the larger number."],
          [shared * cofactor * (cofactor + 1), "This is the least common multiple, which is the smallest shared multiple rather than the largest shared factor."],
        ],
        why: `${smaller} = ${shared}·${cofactor} and ${larger} = ${shared}·${cofactor + 1}. Consecutive integers ${cofactor} and ${cofactor + 1} share no factor above 1, so the greatest common factor is ${shared}.`,
        steps: ["Factor each number into the shared factor times a cofactor.", "Check whether the cofactors share anything.", "Report the shared factor."],
        principles: ["The greatest common factor is the largest integer that divides both values."],
        hint: "Divide both numbers by the largest factor you can see, then check whether the results still share one.",
      };
    },
    (s, variant) => {
      const divisor = 4 + (s % 6);
      const quotient = 25 + ((s * 3) % 9);
      const remainder = 1 + ((s * 5) % (divisor - 1));
      const total = divisor * quotient + remainder;
      return {
        family: "remainder-of-division",
        stem: pose(variant, "quantityOf", {
          description: `the remainder when ${total} is divided by ${divisor}`,
        }),
        answer: remainder,
        wrong: [
          [0, `${divisor} does not divide ${total} evenly, so the remainder is not 0.`],
          [divisor - remainder, `${divisor - remainder} is how much more is needed to reach the next multiple of ${divisor}, not what is left over.`],
          [divisor, "A remainder is always less than the divisor."],
          [quotient, `${quotient} is the whole-number quotient, not the remainder.`],
          [quotient + remainder, "This adds the quotient to the remainder instead of reporting only what is left over."],
        ],
        why: `${divisor}·${quotient} = ${divisor * quotient}, and ${total} − ${divisor * quotient} = ${remainder}, which is less than ${divisor}.`,
        steps: [`Find the largest multiple of ${divisor} that is at most ${total}.`, "Subtract that multiple.", "Check that the result is smaller than the divisor."],
        principles: ["Dividing a by d gives a = dq + r with 0 ≤ r < d."],
        hint: "Subtract the largest multiple of the divisor you can without going below zero.",
        verification: { kind: "sum", inputs: [total, -divisor * quotient], expected: remainder },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const pairs = [[9, 12], [10, 15], [12, 18], [8, 12], [6, 9], [14, 21], [15, 20]];
      const [first, second] = pairs[s % pairs.length];
      const together = lcm(first, second);
      const place = context(s).place;
      return {
        family: "lcm-repeating-cycles",
        stem: `At the ${place} transit stop, one shuttle leaves every ${first} minutes and another leaves every ${second} minutes. Both leave at 9:00 a.m. How many minutes later do they next leave at the same time?`,
        answer: together,
        wrong: [
          [gcd(first, second), "This is the greatest common factor of the two cycles; a shared departure needs a common multiple instead."],
          [first + second, "Adding the two cycle lengths does not produce a time that is a whole number of both cycles."],
          [Math.max(first, second), "The longer cycle alone is not a multiple of the shorter one."],
          [first * second, `${first * second} is a common multiple, but it is not the least one.`],
          [2 * together, `${2 * together} is the second shared departure, not the next one.`],
        ],
        why: `The shuttles coincide at common multiples of ${first} and ${second}. The least common multiple is ${together}, so they next leave together ${together} minutes later.`,
        steps: ["List or compute multiples of each cycle length.", "Find the smallest value in both lists.", "Report that many minutes after 9:00."],
        principles: ["Events with cycles m and n coincide at multiples of lcm(m, n)."],
        hint: "You need the smallest number that both cycle lengths divide evenly.",
        verification: { kind: "product", inputs: [first, together / first], expected: together },
      };
    },
    (s, variant) => {
      const middle = 2 * (17 + (s % 12));
      const total = 3 * middle;
      return {
        family: "consecutive-even-integers",
        stem: `The sum of three consecutive even integers is ${total}. What is the largest of the three integers?`,
        answer: middle + 2,
        wrong: [
          [middle - 2, "This is the smallest of the three integers."],
          [middle, "This is the middle integer, which equals the sum divided by 3."],
          [middle + 1, "This treats the integers as consecutive rather than consecutive even, stepping up by 1 instead of 2."],
          [total / 2, "Halving the total works only for two numbers, not three."],
          [total, "This is the sum of all three integers, not the largest one."],
        ],
        why: `Call the middle integer m. Then (m − 2) + m + (m + 2) = 3m = ${total}, so m = ${middle} and the largest integer is ${middle + 2}.`,
        steps: ["Name the middle integer m so the outer terms are m − 2 and m + 2.", "Solve 3m = the given sum.", "Add 2 to reach the largest term."],
        principles: ["Centring consecutive terms on the middle value makes the outer terms cancel."],
        hint: "Let the middle integer carry the variable; the other two then cancel in the sum.",
        verification: { kind: "sum", inputs: [total / 3, 2], expected: middle + 2 },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const first = 4 + (s % 7);
      const step = 3 + (s % 5);
      const count = 12 + 2 * (s % 7);
      const last = first + (count - 1) * step;
      const total = (count * (first + last)) / 2;
      const terms = [];
      for (let index = 0; index < count; index += 1) terms.push(first + index * step);
      return {
        family: "arithmetic-series-sum",
        stem: choose(variant, [
          `Given an arithmetic sequence whose first term is ${first} and whose common difference is ${step}, what is the sum of its first ${count} terms?`,
          `Suppose an arithmetic sequence begins with ${first} and increases by ${step} per term. Find the total of the first ${count} terms.`,
          `Assume a₁ = ${first} and the common difference is ${step}. Calculate the sum through a${sub(count)}.`,
          `Determine the sum of the first ${count} terms of the arithmetic sequence that starts at ${first} with common difference ${step}.`,
          `Which value equals the sum of ${count} terms in an arithmetic sequence beginning at ${first} and advancing by ${step}?`,
          `When an arithmetic sequence has first term ${first} and common difference ${step}, what do its first ${count} terms total?`,
          `Let an arithmetic sequence start with ${first} and add ${step} for each successive term. Find S${sub(count)}.`,
          `Take ${first} as the first term of an arithmetic sequence with common difference ${step}. Compute the sum of the first ${count} terms.`,
        ]),
        answer: total,
        wrong: [
          [(first + last) / 2, "This is the average term; the sum still has to be multiplied by the number of terms."],
          [last, `${last} is the ${ordinal(count)} term, not the sum of the terms.`],
          [count * first, "This treats every term as the first term instead of letting the terms grow."],
          [count * last, "This treats every term as the last term; the correct factor is the average of the first and last terms."],
          [count * (first + last), "This omits the division by 2 in n(a₁ + aₙ)/2, giving twice the sum."],
        ],
        why: `The ${ordinal(count)} term is ${first} + ${count - 1}·${step} = ${last}. The sum is ${count}(${first} + ${last})/2 = ${total}.`,
        steps: [`Find the last term: a₍${count}₎ = ${first} + (${count} − 1)(${step}).`, "Average the first and last terms.", "Multiply that average by the number of terms."],
        principles: ["An arithmetic series sums to n(a₁ + aₙ)/2, the number of terms times the average term."],
        hint: "Pair the first term with the last, the second with the second-to-last: every pair has the same total.",
        trap: "Multiplying the number of terms by the last term instead of by the average of the first and last.",
        verification: { kind: "sum", inputs: terms, expected: total },
      };
    },
    (s, variant) => {
      const step = 2 + (s % 6);
      const firstIndex = 3 + ((s + variant) % 5);
      const secondIndex = firstIndex + 6 + (variant % 3);
      const targetIndex = 18 + ((s + 2 * variant) % 9);
      const base = 3 + (s % 9);
      const firstTerm = base + (firstIndex - 1) * step;
      const secondTerm = base + (secondIndex - 1) * step;
      const answer = base + (targetIndex - 1) * step;
      return {
        family: "arithmetic-term-from-two-terms",
        stem: `In an arithmetic sequence, the ${ordinal(firstIndex)} term is ${firstTerm} and the ${ordinal(secondIndex)} term is ${secondTerm}. What is the ${ordinal(targetIndex)} term?`,
        answer,
        wrong: [
          [secondTerm, `${secondTerm} is the ${ordinal(secondIndex)} term that was given, not the ${ordinal(targetIndex)} term.`],
          [answer - step, `This counts ${targetIndex - secondIndex - 1} steps past the ${ordinal(secondIndex)} term instead of ${targetIndex - secondIndex}.`],
          [firstTerm + (targetIndex - secondIndex) * step, `This adds the right number of steps to the wrong starting term, the ${ordinal(firstIndex)} rather than the ${ordinal(secondIndex)}.`],
          [answer + step, `This counts one extra common difference, using ${targetIndex - secondIndex + 1} steps past the ${ordinal(secondIndex)} term.`],
          [secondTerm + (targetIndex - secondIndex) * (secondTerm - firstTerm), "This uses the total change between the two given terms as the common difference instead of dividing it by the number of steps between them."],
        ],
        why: `From the ${ordinal(firstIndex)} to the ${ordinal(secondIndex)} term is ${secondIndex - firstIndex} steps, so the common difference is (${secondTerm} − ${firstTerm})/${secondIndex - firstIndex} = ${step}. Then the ${ordinal(targetIndex)} term is ${secondTerm} + ${targetIndex - secondIndex}(${step}) = ${answer}.`,
        steps: ["Count the number of common differences between the two given terms.", "Divide the change in value by that count to get the common difference.", "Step forward from a known term to the requested one."],
        principles: ["aₙ = aₘ + (n − m)d for any two indices of an arithmetic sequence."],
        hint: "The difference between the two given terms covers several common differences, not one.",
        trap: "Treating the difference between the two given terms as a single common difference.",
        verification: { kind: "sum", inputs: [secondTerm, (targetIndex - secondIndex) * step], expected: answer },
      };
    },
  ],
};

SHAPES["complex numbers"] = {
  Easy: [
    (s, variant) => {
      const coefficient = 2 + (s % 5);
      const constant = 7 + (s % 9);
      return {
        family: "simplify-i-squared",
        stem: choose(variant, [
          `Given that i² = ${MINUS}1, what is the value of ${coefficient}i² + ${constant}?`,
          `For i = √(${MINUS}1), which real number equals ${coefficient}i² + ${constant}?`,
          `If i is the imaginary unit, the expression ${coefficient}i² + ${constant} simplifies to what?`,
          `The expression ${coefficient}i² + ${constant} has which real value?`,
        ]),
        answer: constant - coefficient,
        wrong: [
          [coefficient - constant, "This subtracts in the wrong order; the constant term is the one that stays positive."],
          [-(constant + coefficient), "This makes both terms negative, but only the i² term changes sign."],
          [constant, "This drops the i² term instead of replacing i² with −1."],
          [constant + coefficient, "This treats i² as +1."],
          [coefficient * constant, "The two terms are added after i² is replaced, not multiplied."],
        ],
        why: `${coefficient}i² + ${constant} = ${coefficient}(${MINUS}1) + ${constant} = ${MINUS}${coefficient} + ${constant} = ${constant - coefficient}.`,
        steps: ["Replace i² with −1.", "Multiply the coefficient by −1.", "Combine the two real terms."],
        principles: ["i² = −1, so any even power of i is real."],
        hint: "Substitute −1 for i² before you combine anything.",
        verification: { kind: "sum", inputs: [constant, -coefficient], expected: constant - coefficient },
      };
    },
    (s, variant) => {
      // a > c and d > b keep both components of the difference non-zero. When
      // b equalled d the key printed as "9 + 0i" and two distractors collapsed
      // onto it, leaving the item with fewer than three usable wrong answers.
      const c = 1 + (s % 4);
      const a = c + 4 + (s % 5);
      const b = 2 + (s % 6);
      const d = b + 1 + (s % 5);
      return {
        family: "complex-difference",
        stem: pose(variant, "value", {
          expression: `(${a} + ${b}i) ${MINUS} (${c} + ${d}i)`,
        }),
        answer: cplx(a - c, b - d),
        wrong: [
          [cplx(a + c, b + d), "This adds the two complex numbers instead of subtracting the second one."],
          [cplx(a - c, d - b), "This subtracts the imaginary parts in the wrong order."],
          [cplx(a - c, b + d), "This distributes the subtraction to the real part only; it applies to both parts."],
          [cplx(c - a, d - b), "This subtracts in the wrong direction, taking the first number from the second."],
          [cplx(a - c - d, b), "This subtracts the imaginary coefficient from the real part; the two parts never mix."],
        ],
        why: `Subtract real parts and imaginary parts separately: (${a} − ${c}) + (${b} − ${d})i = ${cplx(a - c, b - d)}.`,
        steps: ["Distribute the subtraction across both parts of the second number.", "Combine the real parts.", "Combine the imaginary parts."],
        principles: ["Complex numbers add and subtract componentwise."],
        hint: "Treat i like a variable: the real parts combine with each other, the i terms with each other.",
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const a = 2 + (s % 5);
      const b = 3 + (s % 4);
      const c = 1 + (s % 6);
      const d = 2 + (s % 7);
      return {
        family: "complex-product",
        stem: pose(variant, "value", {
          expression: `(${a} + ${b}i)(${c} + ${d}i)`,
        }),
        answer: cplx(a * c - b * d, a * d + b * c),
        wrong: [
          [cplx(a * c + b * d, a * d + b * c), "This treats i² as +1 instead of −1, so the last term keeps its sign."],
          [cplx(a * c, b * d), "This multiplies the real parts and the imaginary parts separately, skipping the two cross terms."],
          [cplx(a + c, b + d), "This adds the two numbers instead of multiplying them."],
          [cplx(a * c - b * d, a * c + b * d), "This forms the imaginary part from the wrong pair of products; the cross terms are ad and bc."],
        ],
        why: `FOIL: ${a * c} + ${a * d}i + ${b * c}i + ${b * d}i². Since i² = −1, the last term becomes ${MINUS}${b * d}, giving ${cplx(a * c - b * d, a * d + b * c)}.`,
        steps: ["Multiply the two binomials term by term.", "Replace i² with −1 in the final product.", "Collect the real terms and the i terms."],
        principles: ["(a + bi)(c + di) = (ac − bd) + (ad + bc)i."],
        hint: "Multiply as binomials first; only afterwards replace i² with −1.",
      };
    },
    (s, variant) => {
      const a = 5 + (s % 6);
      const b = 2 + (s % 3);
      return {
        family: "complex-square-real-part",
        stem: pose(variant, "equivalentForm", {
          expression: `(${a} + ${b}i)²`,
          form: "x + yi",
          target: "x",
        }),
        answer: a * a - b * b,
        wrong: [
          [b * b - a * a, "This reverses the subtraction; the square of the real part comes first."],
          [a * b, "This is one cross product, not the real part."],
          [2 * a * b, `${2 * a * b} is y, the coefficient of i, not x.`],
          [a * a + b * b, "This treats i² as +1, so the squared imaginary term is added instead of subtracted."],
          [(a + b) * (a + b), "This squares the sum of the parts, which ignores the imaginary unit entirely."],
        ],
        why: `(${a} + ${b}i)² = ${a * a} + ${2 * a * b}i + ${b * b}i² = (${a * a} − ${b * b}) + ${2 * a * b}i, so x = ${a * a - b * b}.`,
        steps: ["Expand the square as a binomial.", "Replace i² with −1.", "Read off the real part."],
        principles: ["(a + bi)² = (a² − b²) + 2abi."],
        hint: "The i² term lands in the real part after you substitute −1.",
        verification: { kind: "sum", inputs: [a * a, -(b * b)], expected: a * a - b * b },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const exponent = 103 + ((s * 7) % 97);
      const remainder = exponent % 4;
      const powers = ["1", "i", `${MINUS}1`, `${MINUS}i`];
      const wrong = [0, 1, 2, 3]
        .filter((value) => value !== remainder)
        .map((value) => [
          powers[value],
          `${powers[value]} is i^${value === 0 ? 4 : value}. Dividing ${exponent} by 4 leaves remainder ${remainder}, not ${value}.`,
        ]);
      return {
        family: "powers-of-i",
        stem: `For i = √(${MINUS}1), what is the value of i^${exponent}?`,
        answer: powers[remainder],
        wrong,
        why: `Powers of i cycle with period 4: i¹ = i, i² = ${MINUS}1, i³ = ${MINUS}i, i⁴ = 1. Since ${exponent} = 4(${Math.floor(exponent / 4)}) + ${remainder}, i^${exponent} = i^${remainder} = ${powers[remainder]}.`,
        steps: ["Recall the four-step cycle of powers of i.", `Divide ${exponent} by 4 and keep the remainder.`, "Read the cycle entry for that remainder."],
        principles: ["i^n depends only on n mod 4."],
        hint: "Only the remainder of the exponent after division by 4 matters.",
        trap: "Dividing the exponent by 4 and using the quotient rather than the remainder.",
      };
    },
    (s, variant) => {
      const [legA, legB, hypotenuse] = TRIPLES[(s + variant) % TRIPLES.length];
      return {
        family: "complex-plane-modulus",
        stem: pose(variant, "quantityOf", {
          description: `the modulus |${legA} ${MINUS} ${legB}i|`,
        }),
        answer: hypotenuse,
        wrong: [
          [Math.abs(legA - legB), "This subtracts the coordinates; distance from the origin uses the Pythagorean relationship."],
          [legA, "This uses only the real part, which is one leg of the right triangle."],
          [legB, "This uses only the imaginary coefficient, which is the other leg."],
          [legA + legB, "This adds the legs instead of adding their squares and taking the square root."],
          [legA * legA + legB * legB, "This stops at a² + b² without taking the square root."],
        ],
        why: `The point is (${legA}, ${MINUS}${legB}), so the distance is √(${legA}² + ${legB}²) = √${legA * legA + legB * legB} = ${hypotenuse}.`,
        steps: ["Read the real part as x and the imaginary coefficient as y.", "Apply the distance formula from the origin.", "Simplify the square root."],
        principles: ["|a + bi| = √(a² + b²), the distance from the origin in the complex plane."],
        hint: "Plot the number as a point: the modulus is the hypotenuse of a right triangle.",
        trap: "Treating |a + bi| as a + b, which would be true only if one part were zero.",
        verification: { kind: "distance", inputs: [0, 0, legA, legB], expected: hypotenuse },
      };
    },
  ],
};

SHAPES.exponents = {
  Easy: [
    (s, variant) => {
      const first = 2 + (s % 5);
      const second = 3 + (s % 6);
      return {
        family: "product-of-like-bases",
        stem: choose(variant, [
          `If x^${first} · x^${second} = x^k for all positive x, what is the value of k?`,
          `The product x^${first} · x^${second} equals x^k. Which number must k equal?`,
          `For every x > 0, x^${first} · x^${second} can be written as x^k. Then k represents what quantity?`,
          `Writing x^${first} · x^${second} as one power gives x^k, where k equals which number?`,
        ]),
        answer: first + second,
        wrong: [
          [Math.abs(first - second), "Subtracting exponents applies when like bases are divided, not multiplied."],
          [Math.max(first, second), "This keeps only the larger exponent; both factors contribute."],
          [first + second - 1, "No factor of x is lost in the product."],
          [first * second, "Exponents are multiplied only when a power is raised to a power."],
          [first + second + 1, "No extra factor of x appears in the product."],
        ],
        why: `Multiplying like bases adds exponents: k = ${first} + ${second} = ${first + second}.`,
        steps: ["Check that both factors have the same base.", "Add the exponents.", "Write the single power."],
        principles: ["x^m · x^n = x^(m+n)."],
        hint: "Count how many factors of x appear in total.",
        verification: { kind: "sum", inputs: [first, second], expected: first + second },
      };
    },
    (s, variant) => {
      const inner = 2 + (s % 6);
      const outer = 3 + (s % 4);
      return {
        family: "power-of-a-power",
        stem: choose(variant, [
          `If (x^${inner})^${outer} = x^k for all positive x, what is the value of k?`,
          `The expression (x^${inner})^${outer} equals x^k. Which number must k equal?`,
          `Raising x^${inner} to the power ${outer} gives x^k, where k represents what quantity?`,
          `For every positive x, (x^${inner})^${outer} is one power x^k. What does k equal?`,
        ]),
        answer: inner * outer,
        wrong: [
          [Math.abs(inner - outer), "Subtraction of exponents belongs to division of like bases."],
          [inner + outer, "Adding exponents applies to a product of like bases, not to a power raised to a power."],
          [inner * outer - inner, "This drops one of the copies of the inner power."],
          [inner ** outer, "This raises the exponent to a power instead of multiplying the two exponents."],
          [inner * outer + outer, "This counts one extra copy of the inner power."],
        ],
        why: `(x^${inner})^${outer} means ${outer} copies of x^${inner}, so k = ${inner}·${outer} = ${inner * outer}.`,
        steps: ["Write the outer power as repeated multiplication.", "Add the inner exponent that many times.", "Recognise the result as a product."],
        principles: ["(x^m)^n = x^(mn)."],
        hint: "Repeated multiplication of equal exponents is the same as multiplying them.",
        verification: { kind: "product", inputs: [inner, outer], expected: inner * outer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const root = 2 + ((s + variant) % 4);
      const base = root ** 3;
      const power = choose(s + variant, [2, 4]);
      const answer = root ** power;
      return {
        family: "fractional-exponent-value",
        stem: choose(variant, [
          `What is the value of ${base}^(${power}/3)?`,
          `Evaluated as a single number, ${base}^(${power}/3) equals what?`,
          `Which number does the expression ${base}^(${power}/3) represent?`,
          `${base}^(${power}/3) simplifies to which integer?`,
        ]),
        answer,
        wrong: [
          [root, "This takes the cube root but never raises it to the numerator's power."],
          [(base * power) / 3, "This multiplies the base by the fraction instead of using it as an exponent."],
          [base / 3, "The denominator of a fractional exponent is a root, not a divisor."],
          [base ** power, `This ignores the cube root and raises ${base} to the ${power} power.`],
          [base * power, "This multiplies rather than exponentiates."],
        ],
        why: `${base}^(${power}/3) = (∛${base})^${power} = ${root}^${power} = ${answer}.`,
        steps: [`Take the cube root of ${base}, which is ${root}.`, `Raise that result to the power ${power}.`, "Confirm the order of the two operations does not change the value."],
        principles: ["a^(m/n) = (ⁿ√a)^m."],
        hint: "The denominator of the exponent is the root; the numerator is the power.",
        verification: { kind: "product", inputs: Array(power).fill(root), expected: answer },
      };
    },
    (s, variant) => {
      const divisorCoefficient = 2 + (s % 4);
      const ratio = 2 + (s % 5);
      const dividendCoefficient = divisorCoefficient * ratio;
      const highPower = 5 + (s % 4);
      const lowPower = 2 + (s % 3);
      const gap = highPower - lowPower;
      const answer = ratio * 10 ** gap;
      return {
        family: "scientific-notation-quotient",
        stem: choose(variant, [
          `What is the value of (${dividendCoefficient} × 10^${highPower}) ÷ (${divisorCoefficient} × 10^${lowPower})?`,
          `Written as an ordinary number, (${dividendCoefficient} × 10^${highPower}) ÷ (${divisorCoefficient} × 10^${lowPower}) equals what?`,
          `Dividing ${dividendCoefficient} × 10^${highPower} by ${divisorCoefficient} × 10^${lowPower} gives which number?`,
          `Which number equals the quotient (${dividendCoefficient} × 10^${highPower})/(${divisorCoefficient} × 10^${lowPower})?`,
        ]),
        answer,
        wrong: [
          [ratio, "This divides the coefficients but drops the powers of ten."],
          [round3(ratio / 10 ** gap), "This subtracts the exponents in the wrong order, giving a negative power of ten."],
          [round3(dividendCoefficient / divisorCoefficient) * 10 ** lowPower, "This keeps the smaller exponent instead of subtracting."],
          [ratio * 10 ** highPower, "This keeps the larger exponent instead of subtracting the smaller one from it."],
          [dividendCoefficient * divisorCoefficient * 10 ** (highPower + lowPower), "This multiplies the two numbers instead of dividing them."],
        ],
        why: `Divide the coefficients: ${dividendCoefficient}/${divisorCoefficient} = ${ratio}. Subtract the exponents: 10^(${highPower} − ${lowPower}) = 10^${gap}. The value is ${ratio} × 10^${gap} = ${answer}.`,
        steps: ["Divide the coefficients.", "Subtract the exponent of the divisor from the exponent of the dividend.", "Write the product as an ordinary number."],
        principles: ["(a × 10^m)/(b × 10^n) = (a/b) × 10^(m−n)."],
        hint: "Treat the coefficients and the powers of ten as two separate divisions.",
        verification: { kind: "product", inputs: [ratio, 10 ** gap], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const base = choose(s + variant, [2, 3, 5, 7, 10]);
      const logX = 3 + (s % 5);
      const logY = 1 + (s % 4);
      const answer = 2 * logX - logY;
      return {
        family: "logarithm-laws",
        stem: choose(variant, [
          `If log${sub(base)} x = ${logX} and log${sub(base)} y = ${logY}, what is the value of log${sub(base)}(x²/y)?`,
          `Suppose log${sub(base)} x = ${logX} and log${sub(base)} y = ${logY}. Which number equals log${sub(base)}(x²/y)?`,
          `Given log${sub(base)} x = ${logX} and log${sub(base)} y = ${logY}, the expression log${sub(base)}(x²/y) represents what quantity?`,
        ]),
        answer,
        wrong: [
          [logX / logY, "This divides the logarithms; a quotient inside a logarithm becomes a difference of logarithms, not a quotient."],
          [logX - logY, "This omits the coefficient 2 that the exponent on x contributes."],
          [2 * (logX - logY), "This distributes the exponent over both x and y; only x is squared."],
          [2 * logX + logY, "This adds the logarithm of y; dividing inside the logarithm subtracts it."],
          [logX * logX - logY, "This squares the logarithm of x instead of doubling it."],
        ],
        why: `log${sub(base)}(x²/y) = 2 log${sub(base)} x − log${sub(base)} y = 2(${logX}) − ${logY} = ${answer}.`,
        steps: ["Split the quotient into a difference of logarithms.", "Bring the exponent on x down as a coefficient.", "Substitute the given values."],
        principles: ["log(ab) = log a + log b, log(a/b) = log a − log b, and log(a^n) = n log a."],
        hint: "Exponents inside a logarithm become coefficients; division becomes subtraction.",
        trap: "Turning log(x²) into (log x)², which is a different quantity.",
        verification: { kind: "sum", inputs: [logX, logX, -logY], expected: answer },
      };
    },
    (s, variant) => {
      const shiftA = 1 + (s % 4);
      const shiftB = 1 + (s % 3);
      const root = choose(s + variant, [2, 3, 5]);
      const square = root * root;
      const cube = root ** 3;
      const answer = 2 * shiftA + 3 * shiftB;
      return {
        family: "exponential-equation-common-base",
        stem: choose(variant, [
          `If ${square}^(x + ${shiftA}) = ${cube}^(x ${MINUS} ${shiftB}), what is the value of x?`,
          `Which number satisfies ${square}^(x + ${shiftA}) = ${cube}^(x ${MINUS} ${shiftB})?`,
          `Solve for x: ${square}^(x + ${shiftA}) = ${cube}^(x ${MINUS} ${shiftB}). Then x equals what?`,
        ]),
        answer,
        wrong: [
          [shiftA + shiftB, "This sets the exponents equal without first writing both sides as powers of the same base."],
          [shiftA + 2 * shiftB, "This divides by 4 rather than by the difference of the base exponents 3 and 2."],
          [3 * shiftA + 2 * shiftB, "This attaches each base exponent to the wrong side of the equation."],
          [square * shiftA + cube * shiftB, `This uses the bases ${square} and ${cube} as coefficients instead of their exponents 2 and 3 on base ${root}.`],
          [6 * shiftA * shiftB, "This multiplies the two exponents instead of solving the resulting linear equation."],
        ],
        why: `Write both sides in base ${root}: ${root}^(2x + ${2 * shiftA}) = ${root}^(3x ${MINUS} ${3 * shiftB}). Equal bases give 2x + ${2 * shiftA} = 3x − ${3 * shiftB}, so x = ${answer}.`,
        steps: [`Rewrite ${square} as ${root}² and ${cube} as ${root}³.`, "Multiply each exponent through.", "Set the exponents equal and solve the linear equation."],
        principles: ["If b^m = b^n with b > 0 and b ≠ 1, then m = n."],
        hint: `Both ${square} and ${cube} are powers of ${root}; rewrite before comparing exponents.`,
        trap: "Equating the exponents while the bases are still different.",
        verification: { kind: "sum", inputs: [2 * shiftA, 3 * shiftB], expected: answer },
      };
    },
  ],
};

SHAPES["unit conversion"] = {
  Easy: [
    (s, variant) => {
      const unit = UNITS[(s + variant) % UNITS.length];
      const amount = 3 + (s % 9);
      const answer = amount * unit.factor;
      return {
        family: "single-step-conversion-up",
        stem: pose(variant, "quantityOf", {
          description: `the number of ${unit.to} equivalent to ${amount} ${unit.from}`,
        }),
        answer,
        wrong: [
          [round3(amount / unit.factor), "This divides by the conversion factor, which converts in the opposite direction."],
          [unit.factor, `${unit.factor} is the number of ${unit.to} in one ${unit.from.replace(/s$/, "")}, not in ${amount} of them.`],
          [amount + unit.factor, "Conversion multiplies by the factor; it does not add it."],
          [(amount + 1) * unit.factor, "This converts one unit too many."],
          [answer + amount, "This adds the original measurement back after converting."],
        ],
        why: `${amount} ${unit.from} × ${unit.factor} ${unit.to} per ${unit.from.replace(/s$/, "")} = ${answer} ${unit.to}.`,
        steps: [`Write the conversion factor ${unit.factor} ${unit.to} per ${unit.from.replace(/s$/, "")}.`, "Multiply so the original unit cancels.", `Report the result in ${unit.to}.`],
        principles: ["Multiplying by a conversion factor equal to 1 changes units without changing the quantity."],
        hint: "Going to a smaller unit means the number gets larger.",
        verification: { kind: "product", inputs: [amount, unit.factor], expected: answer },
      };
    },
    (s, variant) => {
      const unit = UNITS[(s * 3 + 1 + variant) % UNITS.length];
      const answer = 4 + (s % 7);
      const amount = answer * unit.factor;
      return {
        family: "single-step-conversion-down",
        stem: pose(variant, "quantityOf", {
          description: `the number of ${unit.from} equivalent to ${amount} ${unit.to}`,
        }),
        answer,
        wrong: [
          [round3(amount / (unit.factor * 2)), "This divides by twice the conversion factor."],
          [amount - unit.factor, "Conversion divides by the factor; it does not subtract it."],
          [unit.factor, `${unit.factor} is the conversion factor itself, not the converted measurement.`],
          [amount, "This repeats the original measurement without converting."],
          [amount * unit.factor, "This multiplies when moving to the larger unit; that direction requires division."],
        ],
        why: `${amount} ${unit.to} ÷ ${unit.factor} ${unit.to} per ${unit.from.replace(/s$/, "")} = ${answer} ${unit.from}.`,
        steps: [`Note that 1 ${unit.from.replace(/s$/, "")} = ${unit.factor} ${unit.to}.`, "Divide so the smaller unit cancels.", "Check that the answer is smaller than the original count."],
        principles: ["Converting to a larger unit divides by the conversion factor."],
        hint: "Going to a larger unit means the number gets smaller.",
        verification: quotientCheck(amount, unit.factor, answer),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const speeds = [36, 54, 72, 90, 18, 108];
      const speed = speeds[(s + variant) % speeds.length];
      const trip = scene(variant, TRAVEL);
      const answer = speed / 3.6;
      return {
        family: "speed-unit-conversion",
        stem: `On a ${trip.route}, a ${trip.mover} travels at ${speed} kilometres per hour. What is that speed in metres per second?`,
        answer,
        wrong: [
          [round3(speed / 3600), "This converts hours to seconds but never converts kilometres to metres."],
          [round3(speed / 60), "This divides by 60 once; an hour is 3,600 seconds, not 60."],
          [round3(speed * 3.6), "This multiplies by 3.6, which converts metres per second into kilometres per hour."],
          [round3((speed * 1000) / 60), "This converts kilometres to metres but treats an hour as 60 seconds."],
          [speed * 1000, "This converts to metres per hour and stops."],
        ],
        why: `${speed} km/h × 1,000 m per km ÷ 3,600 s per h = ${speed * 1000}/3600 = ${answer} m/s.`,
        steps: ["Convert kilometres to metres by multiplying by 1,000.", "Convert hours to seconds by dividing by 3,600.", "Simplify the combined factor 1000/3600 = 1/3.6."],
        principles: ["Chained conversions multiply the individual factors."],
        hint: "Two conversions are needed, one on top and one on the bottom of the rate.",
        verification: quotientCheck(speed * 1000, 3600, answer),
      };
    },
    (s, variant) => {
      const cupsPerBatch = choose(s, [2, 3, 5, 6]);
      const batches = choose(s * 2 + 1 + variant, [8, 12, 16, 20]);
      const recipe = scene(variant, RECIPE);
      const liquid = recipe.ingredient;
      const answer = (cupsPerBatch * batches) / 4;
      return {
        family: "recipe-scaling-conversion",
        stem: `A ${recipe.dish} recipe uses ${cupsPerBatch} cups of ${liquid} per batch, and 1 quart equals 4 cups. How many quarts of ${liquid} are needed for ${batches} batches?`,
        answer,
        wrong: [
          [round3(cupsPerBatch / 4), "This converts one batch and forgets the remaining batches."],
          [round3(batches / 4), "This divides the number of batches by 4 instead of the number of cups."],
          [cupsPerBatch * batches, "This is the number of cups, not quarts."],
          [cupsPerBatch * batches * 4, "This multiplies by 4; there are 4 cups in a quart, so cups are divided."],
          [round3(batches / cupsPerBatch), "This divides the batches by the cups per batch, which is not a conversion."],
        ],
        why: `${cupsPerBatch} × ${batches} = ${cupsPerBatch * batches} cups, and ${cupsPerBatch * batches} ÷ 4 = ${answer} quarts.`,
        steps: ["Multiply cups per batch by the number of batches.", "Divide the total cups by 4 cups per quart.", "Check that quarts is the smaller number."],
        principles: ["Scale first, then convert; the two operations are independent."],
        hint: "Find the total in cups before converting anything.",
        verification: quotientCheck(cupsPerBatch * batches, 4, answer),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const rooms = [[12, 18], [9, 20], [15, 24], [21, 12], [18, 27], [24, 15]];
      const [length, width] = rooms[(s + variant) % rooms.length];
      const ground = scene(variant, GROUND);
      const price = 20 + 5 * (s % 5);
      const area = length * width;
      const answer = (area / 9) * price;
      return {
        family: "square-unit-conversion-cost",
        stem: `A ${ground.region} measures ${length} feet by ${width} feet. ${ground.cover[0].toUpperCase()}${ground.cover.slice(1)} costs $${price} per square yard. What is the cost, in dollars, to cover it?`,
        answer,
        wrong: [
          [price, "This is the price of a single square yard."],
          [area / 9, "This is the number of square yards, not the cost."],
          [area, "This is the floor area in square feet."],
          [round3((area / 3) * price), "This divides by 3 rather than 9; 1 square yard is 3 feet by 3 feet, so it holds 9 square feet."],
          [area * price, "This prices every square foot at the per-square-yard rate."],
        ],
        why: `The floor is ${area} square feet. Since 1 square yard = 9 square feet, that is ${area / 9} square yards, costing ${area / 9} × $${price} = $${answer}.`,
        steps: ["Find the area in square feet.", "Divide by 9 to convert to square yards.", "Multiply by the price per square yard."],
        principles: ["Converting an area squares the linear conversion factor: 3 ft = 1 yd gives 9 ft² = 1 yd²."],
        hint: "The linear factor 3 becomes 9 for areas.",
        trap: "Dividing an area by the linear conversion factor instead of its square.",
        verification: { kind: "product", inputs: [area / 9, price], expected: answer },
      };
    },
    (s, variant) => {
      const volume = 40 * (2 + (s % 5));
      const rate = choose(s + variant, [10, 12, 15, 20, 25, 30]);
      const vessel = scene(variant, VESSEL);
      const gallons = volume * 7.5;
      const answer = gallons / rate;
      return {
        family: "chained-rate-conversion",
        stem: `A ${vessel.vessel} holds ${volume} cubic feet of ${vessel.fluid}, 1 cubic foot holds 7.5 gallons, and a ${vessel.filler} delivers ${rate} gallons per minute. How many minutes does filling it take?`,
        answer,
        wrong: [
          [round3(volume / (7.5 * rate)), "This divides by the 7.5 gallons per cubic foot instead of multiplying by it."],
          [round3(volume / rate), "This ignores the conversion from cubic feet to gallons."],
          [round3(rate * 7.5), `This multiplies the ${vessel.filler} rate by the conversion factor and never uses the ${vessel.vessel} size.`],
          [gallons, "This is the capacity in gallons, not the time to fill it."],
          [round3(volume * 7.5 * rate), "This multiplies by the pump rate; time is capacity divided by rate."],
        ],
        why: `The ${vessel.vessel} holds ${volume} × 7.5 = ${gallons} gallons. At ${rate} gallons per minute it fills in ${gallons}/${rate} = ${answer} minutes.`,
        steps: ["Convert cubic feet to gallons.", "Divide the gallons by the pump rate.", "Check the units: gallons ÷ gallons per minute leaves minutes."],
        principles: ["Time = quantity ÷ rate, after both are expressed in matching units."],
        hint: "Convert to a common unit before dividing by the rate.",
        trap: "Dividing by a conversion factor that should multiply, which is caught by checking units.",
        verification: quotientCheck(gallons, rate, answer),
      };
    },
  ],
};

SHAPES["dimensional reasoning"] = {
  Easy: [
    (s, variant) => {
      const speed = 12 + (s % 9);
      const hours = 3 + (s % 5);
      const trip = scene(variant, TRAVEL);
      const answer = speed * hours;
      return {
        family: "distance-from-rate-and-time",
        stem: `A ${trip.mover} travels along the ${trip.route} at a constant ${speed} kilometres per hour for ${hours} hours. How many kilometres are covered?`,
        answer,
        wrong: [
          [round3(hours / speed), "This inverts the rate, giving hours per kilometre."],
          [round3(speed / hours), "This divides the rate by the time; multiplying is what cancels hours."],
          [speed + hours, "Rate and time have different units and cannot be added."],
          [answer + speed, "This counts one extra hour of travel."],
          [speed * hours * 2, "This doubles the distance, as though the cyclist rode the route out and back."],
        ],
        why: `${speed} km/h × ${hours} h = ${answer} km; the hours cancel and kilometres remain.`,
        steps: ["Write the rate with its units.", "Multiply by the elapsed time.", "Confirm the surviving unit is kilometres."],
        principles: ["Distance = rate × time."],
        hint: "Multiply so that the hours in the rate cancel the hours of travel.",
        verification: { kind: "product", inputs: [speed, hours], expected: answer },
      };
    },
    (s, variant) => {
      const rate = 14 + (s % 11);
      const hours = 4 + (s % 4);
      const trip = scene(variant, TRAVEL);
      const distance = rate * hours;
      return {
        family: "rate-from-distance-and-time",
        stem: `A ${trip.mover} covers ${distance} miles along the ${trip.route} in ${hours} hours. What is the average speed, in miles per hour?`,
        answer: rate,
        wrong: [
          [round3(hours / distance), "This inverts the rate, giving hours per mile."],
          [round3(distance / (hours + 1)), "This uses one hour too many in the denominator."],
          [hours, "This reports the elapsed time rather than the speed."],
          [distance - hours, "Speed is a quotient of distance and time, not a difference."],
          [distance, "This is the total distance, not the distance per hour."],
        ],
        why: `${distance} miles ÷ ${hours} hours = ${rate} miles per hour.`,
        steps: ["Identify total distance and total time.", "Divide distance by time.", "Attach the unit miles per hour."],
        principles: ["Average speed = total distance ÷ total time."],
        hint: "The unit you want, miles per hour, tells you what to divide by what.",
        verification: quotientCheck(distance, hours, rate),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const pairs = [[30, 60], [20, 30], [40, 60], [12, 24], [10, 15], [45, 90]];
      const [slow, fast] = pairs[(s + variant) % pairs.length];
      const trip = scene(variant, TRAVEL);
      const leg = lcm(slow, fast);
      const answer = (2 * slow * fast) / (slow + fast);
      return {
        family: "average-speed-two-legs",
        stem: `A ${trip.mover} covers ${leg} miles along the ${trip.route} at ${slow} miles per hour and then returns over the same route at ${fast} miles per hour. What is the average speed for the whole trip, in miles per hour?`,
        answer,
        wrong: [
          [slow, "This is the speed of the slower leg only."],
          [round3((slow + fast) / 2), "Averaging the two speeds would be right only if equal time, not equal distance, were spent at each speed."],
          [fast, "This is the speed of the faster leg only."],
          [slow + fast, "Adding speeds does not produce an average."],
          [round3((2 * leg) / (leg / slow)), "This divides the whole distance by the time of one leg."],
        ],
        why: `The trip takes ${leg}/${slow} + ${leg}/${fast} = ${leg / slow + leg / fast} hours for ${2 * leg} miles, so the average speed is ${2 * leg}/${leg / slow + leg / fast} = ${answer} mph.`,
        steps: ["Find the time for each leg separately.", "Add the times and the distances.", "Divide total distance by total time."],
        principles: ["Average speed is total distance over total time, never the mean of the speeds."],
        hint: "More time is spent on the slow leg, so the average sits below the midpoint.",
        verification: quotientCheck(2 * leg, leg / slow + leg / fast, answer),
      };
    },
    (s, variant) => {
      const efficiency = choose(s + variant, [24, 28, 30, 32, 36]);
      const price = choose(s * 3 + 1 + variant, [3, 3.5, 4, 4.5]);
      const mover = choose(variant, ["car", "pickup", "camper van", "hatchback"]);
      const miles = efficiency * (10 + (s % 6));
      const gallons = miles / efficiency;
      const answer = round3(gallons * price);
      return {
        family: "fuel-cost-unit-chain",
        stem: `A ${mover} averages ${efficiency} miles per gallon, and fuel costs $${price.toFixed(2)} per gallon. What is the fuel cost, in dollars, for a ${miles}-mile trip?`,
        answer,
        wrong: [
          [round3(price * efficiency / 10), "This mixes the two rates without ever using the trip distance."],
          [gallons, "This is the number of gallons used, not the cost."],
          [round3(miles / (efficiency * price)), "This divides by the price; cost per gallon multiplies the gallons used."],
          [round3(miles * price), "This prices every mile at the per-gallon rate."],
          [round3(miles * price / 10), "This scales the cost by an arbitrary factor of ten."],
        ],
        why: `${miles} miles ÷ ${efficiency} mpg = ${gallons} gallons, and ${gallons} × $${price.toFixed(2)} = $${answer}.`,
        steps: ["Divide the distance by the fuel efficiency to get gallons.", "Multiply the gallons by the price per gallon.", "Check that miles cancel and dollars remain."],
        principles: ["Chain rates so that unwanted units cancel."],
        hint: "Miles ÷ (miles per gallon) leaves gallons, which then meet dollars per gallon.",
        verification: { kind: "product", inputs: [gallons, price], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const [north, east, resultant] = TRIPLES[(s * 3 + variant) % TRIPLES.length];
      const trip = scene(variant, WATERCRAFT);
      return {
        family: "vector-resultant-speed",
        stem: `In a ${trip.water}, a ${trip.craft} is driven due north at ${north} kilometres per hour while a current carries it due east at ${east} kilometres per hour. What is the resulting speed, in kilometres per hour?`,
        answer: resultant,
        wrong: [
          [Math.abs(north - east), "This subtracts the components, which would apply only if they pointed along the same line in opposite directions."],
          [north, "This uses the northward contribution alone and ignores the current."],
          [Math.round(((north + east) / 2) * 100) / 100, "This averages the two components rather than combining them as perpendicular legs."],
          [north + east, "Adding perpendicular components overstates the resultant; only parallel components add directly."],
          [north * north + east * east, "This stops at the sum of the squares without taking the square root."],
        ],
        why: `The two velocities are perpendicular, so the resultant is √(${north}² + ${east}²) = √${north * north + east * east} = ${resultant} km/h.`,
        steps: ["Recognise that north and east components are perpendicular.", "Apply the Pythagorean theorem to the two components.", "Take the positive square root."],
        principles: ["Perpendicular vector components combine as √(a² + b²)."],
        hint: "Draw the two velocities as legs of a right triangle.",
        trap: "Adding perpendicular speeds directly, which is valid only for vectors along the same line.",
        verification: { kind: "pythagorean", inputs: [north, east], expected: resultant },
      };
    },
    (s, variant) => {
      const [totalX, totalY, magnitude] = TRIPLES[(s * 5 + 2 + variant) % TRIPLES.length];
      const ux = 1 + ((s + variant) % 4);
      const uy = 2 + (s % 3);
      const vx = totalX - ux;
      const vy = totalY - uy;
      return {
        family: "vector-sum-magnitude",
        stem: pose(variant, "quantityOf", {
          description: `the magnitude of ⟨${num(ux)}, ${num(uy)}⟩ + ⟨${num(vx)}, ${num(vy)}⟩`,
        }),
        answer: magnitude,
        wrong: [
          [Math.abs(totalX - totalY), "This subtracts the two components of the sum instead of using the Pythagorean length."],
          [Math.max(totalX, totalY), "This reports the longer component rather than the length of the vector."],
          [round3((totalX + totalY) / 2), "This averages the components; magnitude is not an average."],
          [totalX + totalY, "This adds the components of the resultant; magnitude adds their squares."],
          [totalX * totalX + totalY * totalY, "This is the square of the magnitude."],
        ],
        why: `u + v = ⟨${totalX}, ${totalY}⟩, so its magnitude is √(${totalX}² + ${totalY}²) = ${magnitude}.`,
        steps: ["Add the vectors componentwise.", "Apply the Pythagorean theorem to the resulting components.", "Simplify the square root."],
        principles: ["Vectors add componentwise, and |⟨a, b⟩| = √(a² + b²)."],
        hint: "Add first, then measure the length of the single resulting vector.",
        trap: "Finding the magnitudes of u and v separately and adding them, which is generally larger than |u + v|.",
        verification: { kind: "pythagorean", inputs: [totalX, totalY], expected: magnitude },
      };
    },
  ],
};

SHAPES["linear equations"] = {
  Easy: [
    (s, variant) => {
      const coefficient = 3 + (s % 7);
      const root = 4 + (s % 9);
      const constant = 5 + (s % 11);
      const total = coefficient * root + constant;
      return {
        family: "solve-two-step-linear",
        stem: pose(variant, "givenFind", {
          given: `${coefficient}x + ${constant} = ${total}`,
          target: "x",
        }),
        answer: root,
        wrong: [
          [round3(total / coefficient) - constant, "This divides before removing the constant term."],
          [round3(total / coefficient), "This divides by the coefficient without first subtracting the constant."],
          [round3(root / 2), "This halves the solution rather than dividing by the coefficient shown."],
          [total - constant, "This subtracts the constant but never divides by the coefficient."],
          [round3((total + constant) / coefficient), "This adds the constant instead of subtracting it."],
        ],
        why: `Subtract ${constant} from both sides to get ${coefficient}x = ${total - constant}, then divide by ${coefficient}: x = ${root}.`,
        steps: ["Subtract the constant from both sides.", "Divide both sides by the coefficient.", "Substitute the result back to check."],
        principles: ["Undo addition before undoing multiplication."],
        hint: "Peel off the constant first, then the coefficient.",
        verification: { kind: "linear-equation", inputs: [coefficient, constant, total], expected: root },
      };
    },
    (s, variant) => {
      const divisor = 3 + (s % 5);
      const root = divisor * (3 + (s % 8));
      const constant = 4 + (s % 9);
      const total = root / divisor + constant;
      return {
        family: "solve-linear-with-division",
        stem: pose(variant, "givenFind", {
          given: `x/${divisor} + ${constant} = ${total}`,
          target: "x",
        }),
        answer: root,
        wrong: [
          [round3((total - constant) / divisor), `This divides by ${divisor} again instead of multiplying to undo the division.`],
          [total - constant, `This stops at x/${divisor} and never multiplies by ${divisor}.`],
          [total, "This ignores both operations applied to x."],
          [total * divisor, "This multiplies before subtracting the constant."],
          [(total + constant) * divisor, "This adds the constant instead of subtracting it."],
        ],
        why: `Subtract ${constant}: x/${divisor} = ${total - constant}. Multiply both sides by ${divisor}: x = ${root}.`,
        steps: ["Subtract the constant from both sides.", `Multiply both sides by ${divisor}.`, "Check by substituting the result."],
        principles: ["Multiplication undoes division, and it comes after the constant is cleared."],
        hint: "The last operation done to x is the first one you undo.",
        verification: { kind: "product", inputs: [total - constant, divisor], expected: root },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const outer = 2 + (s % 5);
      const inside = 3 + (s % 7);
      const other = outer + 1 + (s % 3);
      const root = 2 + (s % 8);
      const rightConstant = outer * (root + inside) - other * root;
      // rightConstant is routinely negative, and writing it as "9x + -6" would
      // put an ASCII hyphen where a minus sign belongs.
      const rightSide = rightConstant < 0
        ? `${other}x ${MINUS} ${Math.abs(rightConstant)}`
        : `${other}x + ${rightConstant}`;
      return {
        family: "linear-variable-both-sides",
        stem: pose(variant, "givenFind", {
          given: `${outer}(x + ${inside}) = ${rightSide}`,
          target: "x",
        }),
        answer: root,
        wrong: [
          [round3((outer * inside - rightConstant) / (other - outer)) - 1, "This solves correctly and then subtracts an extra 1."],
          [outer * inside, "This is the distributed constant on the left, not the solution."],
          [round3((outer * inside + rightConstant) / (other + outer)), "This adds the variable terms instead of subtracting one from the other."],
          [round3(rightConstant / (other - outer)), `This forgets the ${outer}·${inside} produced by distributing.`],
          [rightConstant - outer * inside, "This subtracts the constants but never divides by the difference of the coefficients."],
        ],
        why: `Distribute: ${outer}x + ${outer * inside} = ${rightSide}. Collect x terms: ${outer * inside - rightConstant} = ${other - outer}x, so x = ${root}.`,
        steps: ["Distribute on the left side.", "Move all variable terms to one side and constants to the other.", "Divide by the resulting coefficient."],
        principles: ["Distribute first, then gather like terms on opposite sides."],
        hint: "Distribute before you try to move anything across the equals sign.",
        verification: { kind: "linear-equation", inputs: [other - outer, rightConstant, outer * inside], expected: root },
      };
    },
    (s, variant) => {
      const monthly = 15 + 5 * (s % 6);
      const joining = 40 + 10 * (s % 7);
      const months = 4 + (s % 8);
      const total = joining + monthly * months;
      const membership = scene(variant, MEMBERSHIP);
      return {
        family: "linear-model-solve-for-input",
        stem: `A ${membership.service} charges a one-time fee of $${joining} plus $${monthly} per month. A ${membership.member} has paid $${total} in total. For how many months has the membership lasted?`,
        answer: months,
        wrong: [
          [round3(total / (monthly + joining)), "This divides the total by the sum of the two fees, which mixes a one-time charge with a monthly rate."],
          [round3(total / monthly), "This never removes the one-time joining fee."],
          [round3((total - joining) / joining), "This divides by the joining fee instead of the monthly rate."],
          [total - joining, "This is the amount spent on monthly charges, not the number of months."],
          [round3((total + joining) / monthly), "This adds the joining fee instead of subtracting it."],
        ],
        why: `Monthly charges total $${total} − $${joining} = $${monthly * months}. Dividing by $${monthly} per month gives ${months} months.`,
        steps: ["Subtract the one-time fee from the total paid.", "Divide the remainder by the monthly rate.", "Check that the count is a whole number of months."],
        principles: ["A model of the form total = fixed + rate · time is solved by clearing the fixed part first."],
        hint: "The joining fee is paid once, so remove it before dividing.",
        verification: { kind: "linear-equation", inputs: [monthly, joining, total], expected: months },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const answer = 2 + (s % 6);
      const ratio = 2 + (s % 3);
      const secondX = ratio * answer;
      const firstY = 3 + (s % 5);
      const secondY = ratio * firstY;
      const firstC = 7 + (s % 9);
      const secondC = ratio * firstC + 1 + variant;
      return {
        family: "system-parameter-no-solution",
        stem: pose(variant, "parameterFor", {
          condition: `the system kx + ${firstY}y = ${firstC} and ${secondX}x + ${secondY}y = ${secondC} has no solution`,
          parameter: "k",
        }),
        answer,
        wrong: [
          [ratio, `${ratio} is the factor relating the two equations, not the coefficient of x in the first one.`],
          [round3(firstY / ratio), "This scales the y-coefficient the wrong way."],
          [firstY, `${firstY} is the y-coefficient of the first equation.`],
          [secondX, `${secondX} is the x-coefficient of the second equation; k must be that value divided by the scale factor ${ratio}.`],
          [secondY, `${secondY} is the y-coefficient of the second equation.`],
          [firstC, `${firstC} is the first equation's constant term, which decides whether the lines are parallel or identical — not the value of k.`],
          [secondC, `${secondC} is the second equation's constant term, not a coefficient.`],
        ],
        why: `No solution means the lines are parallel, so the coefficients are proportional while the constants are not: ${secondX}/k = ${secondY}/${firstY} = ${ratio}. Hence k = ${secondX}/${ratio} = ${answer}, and the constants ${firstC} and ${secondC} break the proportion, so the lines never meet.`,
        steps: ["Set the ratios of the x-coefficients and the y-coefficients equal.", "Solve that proportion for k.", "Confirm the constant terms do not follow the same ratio, which would instead give infinitely many solutions."],
        principles: ["Two linear equations are parallel when a₁/a₂ = b₁/b₂ ≠ c₁/c₂."],
        hint: "Parallel lines have proportional coefficients but constants that break the pattern.",
        trap: "Finding the k that makes the equations proportional in every term, which gives infinitely many solutions rather than none.",
        verification: quotientCheck(secondX, ratio, answer),
      };
    },
    (s, variant) => {
      const inside = 2 + (s % 6);
      const subtracted = 2 + (s % 4);
      const rightCoefficient = 3 + (s % 5);
      const answer = subtracted + rightCoefficient;
      const constant = 9 + (s % 12);
      return {
        family: "parameter-for-no-solution",
        stem: pose(variant, "parameterFor", {
          condition: `k(x + ${inside}) ${MINUS} ${subtracted}x = ${rightCoefficient}x + ${constant} has no solution`,
          parameter: "k",
        }),
        answer,
        wrong: [
          [rightCoefficient - subtracted, "This subtracts the coefficients instead of adding them; the x terms must cancel completely."],
          [inside, `${inside} is the constant inside the parentheses, which affects the constant term rather than the x coefficient.`],
          [rightCoefficient, "This cancels only the right-hand x term and leaves the −" + subtracted + "x term uncancelled."],
          [subtracted * rightCoefficient, "This multiplies the two coefficients; the x terms cancel when the coefficients are equal, which is an additive condition."],
          [answer + inside, "This adds the interior constant to the coefficient condition."],
        ],
        why: `Expanding gives kx + ${inside}k − ${subtracted}x = ${rightCoefficient}x + ${constant}, so (k − ${subtracted} − ${rightCoefficient})x = ${constant} − ${inside}k. The equation has no solution when the x terms vanish but the constants differ, which happens at k = ${subtracted} + ${rightCoefficient} = ${answer}.`,
        steps: ["Distribute and collect all x terms on one side.", "Set the coefficient of x equal to zero.", "Check that the remaining constant statement is false, which is what makes the equation unsolvable."],
        principles: ["A linear equation has no solution when the variable cancels and leaves a false numerical statement."],
        hint: "The variable has to disappear; then the leftover numbers must disagree.",
        trap: "Choosing the k that also makes the constants match, which produces infinitely many solutions instead of none.",
        verification: { kind: "sum", inputs: [subtracted, rightCoefficient], expected: answer },
      };
    },
  ],
};

SHAPES.inequalities = {
  Easy: [
    (s, variant) => {
      const boundary = 4 + (s % 9);
      const coefficient = 2 + (s % 4);
      return {
        family: "least-integer-strict-inequality",
        stem: pose(variant, "extremeInteger", {
          condition: `${coefficient}x > ${coefficient * boundary}`,
          symbol: "x",
          extreme: "least",
        }),
        answer: boundary + 1,
        wrong: [
          [boundary - 1, "This is below the boundary, so it fails the inequality."],
          [boundary, "A strict inequality excludes the boundary value itself."],
          [coefficient * boundary, "This is the right-hand side of the inequality, not a value of x."],
          [coefficient * boundary + 1, "This adds 1 to the right-hand side without first dividing by the coefficient."],
          [coefficient * (boundary + 1), "This multiplies the answer by the coefficient a second time."],
        ],
        why: `Divide both sides by ${coefficient}: x > ${boundary}. The least integer greater than ${boundary} is ${boundary + 1}.`,
        steps: ["Divide by the positive coefficient, keeping the inequality direction.", "Read the boundary value.", "Step up to the next integer because the inequality is strict."],
        principles: ["Dividing by a positive number preserves the direction of an inequality."],
        hint: "Solve as if it were an equation, then decide whether the boundary itself counts.",
        // Recomputes the key itself, not the boundary: (cb + c)/c = b + 1.
        verification: { kind: "linear-equation", inputs: [coefficient, -coefficient, coefficient * boundary], expected: boundary + 1 },
      };
    },
    (s, variant) => {
      const coefficient = 3 + (s % 5);
      const boundary = 5 + (s % 8);
      const constant = 2 + (s % 6);
      const rightSide = coefficient * boundary + constant;
      return {
        family: "greatest-integer-inequality",
        stem: pose(variant, "extremeInteger", {
          condition: `${coefficient}x + ${constant} ≤ ${rightSide}`,
          symbol: "x",
          extreme: "greatest",
        }),
        answer: boundary,
        wrong: [
          [boundary - 1, "The inequality allows equality, so the boundary value itself is permitted."],
          [round3(rightSide / coefficient), "This divides before subtracting the constant."],
          [boundary + 1, "This value makes the left side exceed the limit."],
          [rightSide - constant, "This subtracts the constant but never divides by the coefficient."],
          [rightSide, "This is the limit on the whole expression, not on x."],
        ],
        why: `Subtract ${constant}: ${coefficient}x ≤ ${rightSide - constant}. Divide by ${coefficient}: x ≤ ${boundary}, so the greatest integer is ${boundary}.`,
        steps: ["Subtract the constant from both sides.", "Divide by the positive coefficient.", "Because equality is allowed, keep the boundary value."],
        principles: ["A non-strict inequality includes its boundary."],
        hint: "The ≤ sign means the boundary value is allowed.",
        verification: { kind: "linear-equation", inputs: [coefficient, constant, rightSide], expected: boundary },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const coefficient = 2 + (s % 3);
      const shift = 1 + (s % 6);
      const lowBound = -(3 + (s % 5));
      const highBound = 6 + (s % 9);
      const lowX = (lowBound - shift) / coefficient;
      const highX = (highBound - shift) / coefficient;
      const count = Math.floor(highX) - Math.ceil(lowX) + (Number.isInteger(lowX) ? 0 : 1) - (Number.isInteger(lowX) ? 1 : 0) + (Number.isInteger(lowX) ? 1 : 0);
      const integers = [];
      for (let value = Math.ceil(lowX); value <= Math.floor(highX); value += 1) {
        if (value > lowX && value <= highX) integers.push(value);
      }
      return {
        family: "compound-inequality-integer-count",
        stem: pose(variant, "countIntegers", {
          condition: `${MINUS}${Math.abs(lowBound)} < ${coefficient}x + ${shift} ≤ ${highBound}`,
          symbol: "x",
        }),
        answer: integers.length,
        wrong: [
          [integers.length - 1, "This drops one endpoint that the ≤ sign actually allows."],
          [Math.max(1, integers.length - 2), "This excludes both boundary values, but only the strict end is excluded."],
          [integers.length + 1, "This counts the value at the strict lower end, which the < sign excludes."],
          [highBound - Math.abs(lowBound) * -1, "This counts integers between the outer bounds without undoing the coefficient and the shift."],
          [highBound, "This is an endpoint of the middle expression, not a count of solutions."],
        ],
        why: `Subtract ${shift} throughout: ${MINUS}${Math.abs(lowBound + shift)} < ${coefficient}x ≤ ${highBound - shift}. Divide by ${coefficient}: ${num(lowX)} < x ≤ ${num(highX)}. The integers in that range are ${integers.join(", ")}, so there are ${integers.length}.`,
        steps: ["Subtract the constant from all three parts.", "Divide all three parts by the positive coefficient.", "List the integers, respecting which endpoint is included."],
        principles: ["Operations on a compound inequality apply to every part at once."],
        hint: "Work on all three parts together, then list the integers rather than guessing the count.",
        verification: { kind: "sum", inputs: integers.map(() => 1), expected: integers.length },
      };
    },
    (s, variant) => {
      const crateWeight = 30 + 5 * (s % 8);
      const driver = 140 + 10 * (s % 6);
      const capacity = 1000 + 100 * (s % 9);
      const answer = Math.floor((capacity - driver) / crateWeight);
      const vehicle = choose(variant, ["van", "trailer", "cargo lift", "flatbed"]);
      return {
        family: "capacity-inequality-model",
        stem: `A ${vehicle} can carry at most ${capacity} pounds. The operator weighs ${driver} pounds, and each crate weighs ${crateWeight} pounds. What is the greatest number of crates the ${vehicle} can carry with the operator aboard?`,
        answer,
        wrong: [
          [answer - 1, "This is one crate short of the limit; the load still fits."],
          [Math.floor(capacity / (crateWeight + driver)), "This adds the operator's weight to every crate instead of counting it once."],
          [answer + 1, "This crate pushes the total past the weight limit."],
          [Math.floor(capacity / crateWeight), "This ignores the operator's weight entirely."],
          [capacity - driver, "This is the pounds available for crates, not the number of crates."],
        ],
        why: `Crates may weigh at most ${capacity} − ${driver} = ${capacity - driver} pounds, and ${capacity - driver}/${crateWeight} = ${round3((capacity - driver) / crateWeight)}, so at most ${answer} whole crates fit.`,
        steps: ["Subtract the operator's weight from the capacity.", "Divide the remaining pounds by the weight of one crate.", "Round down, since a partial crate cannot be loaded."],
        principles: ["Model a limit with ≤, then round a count down to a whole number."],
        hint: "The operator's weight is counted once, not once per crate.",
        // Re-derives the floor rather than the raw quotient: subtracting the
        // remainder first makes the division exact, so this recomputes the key.
        verification: {
          kind: "linear-equation",
          inputs: [crateWeight, (capacity - driver) % crateWeight, capacity - driver],
          expected: answer,
        },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const coefficient = 2 + (s % 3);
      const centre = 5 + (s % 9);
      const radius = coefficient * (3 + (s % 5));
      const low = (centre - radius) / coefficient;
      const high = (centre + radius) / coefficient;
      const integers = [];
      for (let value = Math.ceil(low); value <= Math.floor(high); value += 1) integers.push(value);
      return {
        family: "absolute-value-inequality-count",
        stem: pose(variant, "countIntegers", {
          condition: `|${coefficient}x ${MINUS} ${centre}| ≤ ${radius}`,
          symbol: "x",
        }),
        answer: integers.length,
        wrong: [
          [Math.floor(high) + 1, "This counts only the non-negative part of the interval, ignoring solutions below zero."],
          [integers.length - 1, "This drops one endpoint, but the ≤ sign includes both ends where they are integers."],
          [integers.length + 1, "This counts one value outside the interval."],
          [2 * radius + 1, `This counts the integers in a window of width 2·${radius} without dividing by the coefficient ${coefficient}.`],
          [2 * radius, "This uses the width of the interval for the expression inside the bars rather than for x."],
        ],
        why: `The inequality means ${MINUS}${radius} ≤ ${coefficient}x − ${centre} ≤ ${radius}, so ${centre - radius} ≤ ${coefficient}x ≤ ${centre + radius} and ${num(low)} ≤ x ≤ ${num(high)}. The integers in that range are ${integers.join(", ")} — ${integers.length} of them.`,
        steps: ["Rewrite the absolute-value inequality as a double inequality.", "Solve the compound inequality for x.", "Count the integers between the endpoints, including any endpoint that is itself an integer."],
        principles: ["|A| ≤ b means −b ≤ A ≤ b for b ≥ 0."],
        hint: "An absolute value bounded above becomes two bounds at once.",
        trap: "Solving only the positive case and forgetting the branch below the centre.",
        verification: { kind: "sum", inputs: integers.map(() => 1), expected: integers.length },
      };
    },
    (s, variant) => {
      const smaller = 3 + (s % 5);
      const larger = smaller + 4 + (s % 6);
      const sum = smaller + larger;
      const product = smaller * larger;
      const integers = [];
      for (let value = smaller + 1; value < larger; value += 1) integers.push(value);
      return {
        family: "quadratic-inequality-sign-analysis",
        stem: choose(variant, [
          `How many integers x satisfy x² ${MINUS} ${sum}x + ${product} < 0?`,
          `The inequality x² ${MINUS} ${sum}x + ${product} < 0 is true for how many integer values of x?`,
          `Count the integer solutions of x² ${MINUS} ${sum}x + ${product} < 0.`,
        ]),
        answer: integers.length,
        wrong: [
          [integers.length - 2, "This drops both integers adjacent to the roots, which do satisfy the strict inequality."],
          [integers.length + 1, "This counts one of the roots, where the expression equals zero rather than being negative."],
          [integers.length + 2, "This counts both roots, but at a root the expression is 0, not negative."],
          [larger, `${larger} is the larger root, not a count of solutions.`],
          [product, "This is the constant term of the quadratic."],
        ],
        why: `Factor: (x − ${smaller})(x − ${larger}) < 0. A product of two factors is negative exactly between the roots, so ${smaller} < x < ${larger}. The integers strictly between are ${integers.join(", ")} — ${integers.length} values.`,
        steps: ["Factor the quadratic to find its roots.", "Test the sign of the product on each side of the roots.", "Count the integers in the interval where the product is negative, excluding the roots."],
        principles: ["A quadratic with positive leading coefficient is negative only strictly between its real roots."],
        hint: "A product of two numbers is negative only when the factors have opposite signs.",
        trap: "Including the roots, where the expression equals zero and so fails a strict inequality.",
        verification: { kind: "sum", inputs: integers.map(() => 1), expected: integers.length },
      };
    },
  ],
};

SHAPES.systems = {
  Easy: [
    (s, variant) => {
      // y is named "the smaller number" in one of the stems, so x must exceed
      // it; deriving x from a positive gap also keeps the printed difference
      // positive instead of rendering "x − y = -3".
      const y = 3 + (s % 6);
      const x = y + 2 + (s % 5);
      return {
        family: "system-sum-and-difference",
        stem: pose(variant, "givenFind", {
          given: `x + y = ${x + y} and x ${MINUS} y = ${x - y}`,
          target: "y",
        }),
        answer: y,
        wrong: [
          [round3(y / 2), "This divides by 2 one extra time."],
          [2 * y, "Subtracting the equations gives 2y; the last step divides by 2."],
          [x, "This is x, the other unknown."],
          [x + y, "This is the given sum, not either unknown."],
          [x - y, "This is the given difference."],
        ],
        why: `Subtracting the second equation from the first eliminates x: 2y = ${2 * y}, so y = ${y}.`,
        steps: ["Subtract one equation from the other to remove x.", "Solve the resulting one-variable equation.", "Check the value in both original equations."],
        principles: ["Adding or subtracting equations can eliminate a variable."],
        hint: "The x terms cancel if you subtract the equations.",
        verification: quotientCheck(2 * y, 2, y),
      };
    },
    (s, variant) => {
      const multiplier = 2 + (s % 5);
      const x = 3 + (s % 7);
      const y = multiplier * x;
      return {
        family: "system-substitution-one-step",
        stem: pose(variant, "givenFind", {
          given: `y = ${multiplier}x and x + y = ${x + y}`,
          target: "x",
        }),
        answer: x,
        wrong: [
          [round3(x / multiplier), "This divides by the multiplier one more time than the substitution requires."],
          [round3((x + y) / (multiplier + 2)), `This uses ${multiplier + 2} coefficients of x after substituting instead of ${multiplier + 1}.`],
          [y, "This is y, not x."],
          [round3((x + y) / multiplier), "This divides the total by the multiplier alone, ignoring the single x."],
          [x + y, "This is the given total."],
        ],
        why: `Substituting y = ${multiplier}x into x + y = ${x + y} gives ${multiplier + 1}x = ${x + y}, so x = ${x}.`,
        steps: ["Replace y in the second equation with its expression in x.", "Combine like terms.", "Divide to find x."],
        principles: ["Substitution replaces one variable so a single-variable equation remains."],
        hint: "After substituting, count how many x terms you have.",
        verification: quotientCheck(x + y, multiplier + 1, x),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const x = 2 + (s % 7);
      const y = 3 + (s % 5);
      const firstX = 3 + (s % 4);
      const secondX = firstX + 2 + (s % 3);
      const yCoefficient = 2 + (s % 4);
      const firstTotal = firstX * x + yCoefficient * y;
      const secondTotal = secondX * x - yCoefficient * y;
      return {
        family: "system-elimination-with-coefficients",
        stem: pose(variant, "givenFind", {
          given: `${firstX}x + ${yCoefficient}y = ${firstTotal} and ${secondX}x ${MINUS} ${yCoefficient}y = ${num(secondTotal)}`,
          target: "x",
        }),
        answer: x,
        wrong: [
          [round3(firstTotal / firstX), "This solves the first equation as if y were zero."],
          [y, "This is y, the other unknown."],
          [round3((firstTotal + secondTotal) / (firstX + secondX)) + 1, "This adds the equations correctly but then shifts the result by 1."],
          [firstTotal + secondTotal, "This is the combined right-hand side before dividing by the combined x coefficient."],
          [firstX + secondX, "This is the sum of the x coefficients, not the value of x."],
        ],
        why: `Adding the equations cancels y: ${firstX + secondX}x = ${firstTotal + secondTotal}, so x = ${x}.`,
        steps: ["Notice the y terms are opposites.", "Add the two equations to eliminate y.", "Divide by the combined x coefficient."],
        principles: ["Opposite coefficients allow elimination by addition."],
        hint: "Look at the y terms before deciding whether to add or subtract.",
        verification: quotientCheck(firstTotal + secondTotal, firstX + secondX, x),
      };
    },
    (s, variant) => {
      const adultPrice = 8 + (s % 7);
      const childPrice = 3 + (s % 4);
      const adults = 20 + (s % 30);
      // Held strictly above the adult count: where the two coincided the
      // "that is the child count" distractor and the equal-numbers quotient
      // both landed on the key.
      const children = adults + 5 + (s % 17);
      const total = adults + children;
      const revenue = adultPrice * adults + childPrice * children;
      const venue = choose(variant, ["planetarium", "ferry", "aquarium", "heritage railway"]);
      return {
        family: "system-word-problem-two-prices",
        stem: `A ${venue} sold ${total} tickets and collected $${revenue}. Adult tickets cost $${adultPrice} and child tickets cost $${childPrice}. How many adult tickets were sold?`,
        answer: adults,
        wrong: [
          [children, "This is the number of child tickets."],
          [round3(revenue / (adultPrice + childPrice)), "This divides the revenue by the combined price of one of each ticket, which assumes equal numbers of both."],
          [round3(revenue / adultPrice), "This prices every ticket sold as an adult ticket."],
          [total, "This is the total number of tickets, not the adult count."],
          [revenue - total * childPrice, "This is the extra revenue above an all-child sale, in dollars, before dividing by the price difference."],
          [round3((revenue - total * childPrice) / adultPrice), "This divides the extra revenue by the adult price rather than by the gap between the two prices."],
        ],
        why: `If a is the number of adult tickets, a + c = ${total} and ${adultPrice}a + ${childPrice}c = ${revenue}. Substituting c = ${total} − a gives ${adultPrice - childPrice}a = ${revenue - childPrice * total}, so a = ${adults}.`,
        steps: ["Write one equation for the ticket count and one for the money.", "Substitute to eliminate the child-ticket count.", "Solve for the adult count and check both equations."],
        principles: ["Two unknowns need two independent equations: one counting items, one counting value."],
        hint: "Assume every ticket were a child ticket, then see how much extra money the adults explain.",
        // Recomputes the adult count itself: (revenue − childPrice·total) over
        // the price difference.
        verification: {
          kind: "linear-equation",
          inputs: [adultPrice - childPrice, childPrice * total, revenue],
          expected: adults,
        },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      // b is built as a multiple of d so that k = bc/d is an integer; a
      // repeating decimal here would make the printed key disagree with the
      // exact value its own verification recomputes.
      const d = 2 + (s % 4);
      const b = d * (1 + (s % 3));
      const c = 3 + (s % 7);
      const answer = (b * c) / d;
      return {
        family: "matrix-determinant-parameter",
        stem: pose(variant, "parameterFor", {
          condition: `the matrix [[k, ${b}], [${c}, ${d}]] is singular`,
          parameter: "k",
        }),
        answer,
        wrong: [
          [round3(d / (b * c)), "This inverts the relationship, dividing the corner entry by the off-diagonal product."],
          [round3(b * c - d), "This subtracts the entries rather than setting the two diagonal products equal."],
          [b + c - d, "This adds and subtracts entries; the determinant is built from products."],
          [b * c, `${b * c} is the off-diagonal product ${b}·${c}; k must still be divided by ${d}.`],
          [b * c * d, "This multiplies all three known entries instead of solving kd = bc."],
        ],
        why: `A 2 × 2 matrix is singular when its determinant is 0: k·${d} − ${b}·${c} = 0, so k = ${b * c}/${d} = ${answer}.`,
        steps: ["Write the determinant as the product of the main diagonal minus the product of the other diagonal.", "Set that expression equal to zero.", "Solve for k."],
        principles: ["det [[a, b], [c, d]] = ad − bc, and a matrix is invertible exactly when that determinant is nonzero."],
        hint: "The determinant is a difference of two products; set it to zero.",
        trap: "Adding the diagonal entries instead of multiplying them.",
        verification: quotientCheck(b * c, d, answer),
      };
    },
    (s, variant) => {
      // Staggered offsets: stepping every entry off the same s made whole
      // rows of the two matrices coincide, and four of the five distractors
      // then evaluated to the same number.
      const a = 2 + (s % 5);
      const b = 1 + ((s + 1) % 6);
      const c = 3 + ((s + 2) % 4);
      const d = 2 + ((s + 3) % 7);
      const e = 1 + ((s + 4) % 4);
      const f = 2 + ((s + 5) % 5);
      const g = 3 + ((s + 6) % 6);
      const h = 1 + ((s + 7) % 3);
      const answer = a * f + b * h;
      return {
        family: "matrix-product-entry",
        stem: pose(variant, "quantityOf", {
          description: `the row 1, column 2 entry of [[${a}, ${b}], [${c}, ${d}]] [[${e}, ${f}], [${g}, ${h}]]`,
        }),
        answer,
        wrong: [
          [b * f, "This multiplies the two entries that already sit in row 1, column 2, which is entrywise multiplication rather than matrix multiplication."],
          [a * e + b * g, "This is the row 1, column 1 entry, using the first column of B."],
          [a * f + c * h, "This mixes row 1 of A with column 1 of A; the second factor must come from row 2 of B."],
          [c * f + d * h, "This is the row 2, column 2 entry, using row 2 of A."],
          [a * f * b * h, "This multiplies the two products instead of adding them."],
          [a * f + b * g, "This pairs row 1 of A with column 2 of B for the first product and column 1 for the second; both factors must come from the same column."],
          [a * f, "This uses only the first of the two products the dot product requires."],
        ],
        why: `The row 1, column 2 entry pairs row 1 of A with column 2 of B: (${a})(${f}) + (${b})(${h}) = ${a * f} + ${b * h} = ${answer}.`,
        steps: ["Take row 1 of A and column 2 of B.", "Multiply corresponding entries.", "Add the products."],
        principles: ["The (i, j) entry of AB is the dot product of row i of A with column j of B."],
        hint: "Row from the left matrix, column from the right matrix.",
        trap: "Multiplying matrices entry by entry, which is not how matrix multiplication works.",
        verification: { kind: "sum", inputs: [a * f, b * h], expected: answer },
      };
    },
  ],
};

SHAPES.factoring = {
  Easy: [
    (s, variant) => {
      const smaller = 2 + (s % 6);
      const larger = smaller + 2 + (s % 4);
      return {
        family: "zeros-of-monic-quadratic",
        stem: choose(variant, [
          `What is the larger solution of x² ${MINUS} ${smaller + larger}x + ${smaller * larger} = 0?`,
          `The equation x² ${MINUS} ${smaller + larger}x + ${smaller * larger} = 0 has two solutions. Which is the greater one?`,
          `Solve x² ${MINUS} ${smaller + larger}x + ${smaller * larger} = 0 and report the larger root.`,
          `For x² ${MINUS} ${smaller + larger}x + ${smaller * larger} = 0, the bigger value of x equals what?`,
        ]),
        answer: larger,
        wrong: [
          [-larger, "This has the wrong sign; the factored form is (x − r)(x − s), so both roots are positive here."],
          [smaller, "This is the smaller of the two solutions."],
          [smaller + larger, "This is the sum of the solutions, which appears as the middle coefficient."],
          [smaller * larger, "This is the product of the solutions, which appears as the constant term."],
        ],
        why: `The quadratic factors as (x − ${smaller})(x − ${larger}), so the solutions are ${smaller} and ${larger}; the larger is ${larger}.`,
        steps: ["Find two numbers whose product is the constant term and whose sum is the opposite of the middle coefficient.", "Write the factored form.", "Set each factor equal to zero."],
        principles: ["x² − (r + s)x + rs = (x − r)(x − s)."],
        hint: "Look for two numbers that multiply to the constant and add to the middle coefficient.",
        verification: { kind: "sum", inputs: [smaller + larger, -smaller], expected: larger },
      };
    },
    (s, variant) => {
      const root = 4 + (s % 9);
      return {
        family: "difference-of-squares-factor",
        stem: pose(variant, "equivalentForm", {
          expression: `x² ${MINUS} ${root * root}`,
          form: `(x + ${root})(x ${MINUS} k)`,
          target: "k",
        }),
        answer: root,
        wrong: [
          [round3(root / 2), "This halves the square root of the constant term."],
          [round3(Math.sqrt(root)), "This takes the square root twice."],
          [2 * root, "This doubles the square root; the difference of squares uses the same number in both factors."],
          [root * root, `${root * root} is the constant term itself, not its square root.`],
          [root * root - root, "This subtracts the root from the constant, which is not part of the pattern."],
        ],
        why: `x² − ${root * root} is a difference of squares: x² − ${root}² = (x + ${root})(x − ${root}), so k = ${root}.`,
        steps: ["Recognise the constant term as a perfect square.", "Apply a² − b² = (a + b)(a − b).", "Match the second factor to read k."],
        principles: ["a² − b² = (a − b)(a + b)."],
        hint: "Both factors use the same number, once added and once subtracted.",
        // Recovers k from the constant term: (root²)/root = root.
        verification: { kind: "linear-equation", inputs: [root, 0, root * root], expected: root },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const lead = 2 + (s % 2);
      const wholeRoot = 2 + (s % 6);
      const numerator = 1 + (s % 3);
      const middle = -(lead * wholeRoot + numerator);
      const constant = numerator * wholeRoot;
      return {
        family: "quadratic-with-leading-coefficient",
        stem: pose(variant, "extremeSolution", {
          equation: `${lead}x² ${MINUS} ${Math.abs(middle)}x + ${constant} = 0`,
          extreme: "greater",
        }),
        answer: wholeRoot,
        wrong: [
          [round3(numerator / lead), `This is the other root, ${numerator}/${lead}, which is the smaller one.`],
          [round3(constant / lead), "This divides the constant term by the leading coefficient, which is not a root."],
          [Math.abs(middle), "This is the size of the middle coefficient, not a solution."],
          [constant, "This is the constant term; only for a monic quadratic does the constant equal the product of the roots."],
          [Math.abs(middle) + constant, "Adding coefficients does not produce a root."],
        ],
        why: `The quadratic factors as (${lead}x − ${numerator})(x − ${wholeRoot}) = 0, giving x = ${round3(numerator / lead)} or x = ${wholeRoot}; the greater root is ${wholeRoot}.`,
        steps: ["Look for factors of the leading coefficient and the constant that produce the middle term.", "Write the two binomial factors.", "Set each factor to zero and compare the roots."],
        principles: ["With a leading coefficient, the factors distribute that coefficient across the roots."],
        hint: "The leading coefficient has to be split between the two factors.",
        // The constant term is numerator·wholeRoot, so dividing it by the
        // numerator recovers the integer root the question asks for.
        verification: { kind: "linear-equation", inputs: [numerator, 0, constant], expected: wholeRoot },
      };
    },
    (s, variant) => {
      const known = 2 + (s % 5);
      const other = known + 3 + (s % 7);
      const sum = known + other;
      return {
        family: "other-root-from-sum",
        stem: choose(variant, [
          `One solution of x² ${MINUS} ${sum}x + ${known * other} = 0 is ${known}. What is the other solution?`,
          `Given that ${known} solves x² ${MINUS} ${sum}x + ${known * other} = 0, the second solution equals what?`,
          `The quadratic x² ${MINUS} ${sum}x + ${known * other} = 0 has ${known} as one root. Which number is its other root?`,
        ]),
        answer: other,
        wrong: [
          [round3((known * other) / sum), "This divides the constant term by the middle coefficient, which mixes the sum and the product of the roots."],
          [sum - 2 * known, "This subtracts the known root twice."],
          [known, "This repeats the root that was given."],
          [sum, `${sum} is the sum of the two roots, not the second root by itself.`],
          [known * other, "This is the product of the roots, which is the constant term."],
        ],
        why: `For x² − bx + c, the roots add to b. Since ${known} + r = ${sum}, the other root is r = ${other}, and it checks against the product ${known}·${other} = ${known * other}.`,
        steps: ["Recall that the roots sum to the opposite of the middle coefficient.", "Subtract the known root from that sum.", "Verify with the product of the roots."],
        principles: ["For x² + bx + c, the roots sum to −b and multiply to c."],
        hint: "The middle coefficient carries the sum of the roots; the constant carries their product.",
        verification: { kind: "sum", inputs: [sum, -known], expected: other },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const divisorRoot = 2 + (s % 4);
      const k = 2 + (s % 6);
      const linear = 3 + (s % 5);
      const constant = 1 + (s % 7);
      const remainder = divisorRoot ** 3 + k * divisorRoot ** 2 - linear * divisorRoot + constant;
      return {
        family: "remainder-theorem-parameter",
        stem: pose(variant, "parameterFor", {
          condition: `p(x) = x³ + kx² ${MINUS} ${linear}x + ${constant} leaves remainder ${remainder} when divided by (x ${MINUS} ${divisorRoot})`,
          parameter: "k",
        }),
        answer: k,
        wrong: [
          [round3(remainder / (divisorRoot ** 2)) - divisorRoot, "This divides the whole remainder by the square of the root without first removing the other terms."],
          [round3((remainder - constant) / (divisorRoot ** 2)), `This omits the x³ and ${MINUS}${linear}x contributions to p(${divisorRoot}).`],
          [remainder - divisorRoot ** 3, "This subtracts only the cubic term and never divides by the square of the root."],
          [remainder, "This is the remainder itself, not the coefficient that produces it."],
          [remainder + divisorRoot, "This adds the root to the remainder, which does not isolate k."],
        ],
        why: `By the remainder theorem, p(${divisorRoot}) = ${remainder}. Substituting: ${divisorRoot ** 3} + ${divisorRoot ** 2}k − ${linear * divisorRoot} + ${constant} = ${remainder}, so ${divisorRoot ** 2}k = ${remainder - divisorRoot ** 3 + linear * divisorRoot - constant} and k = ${k}.`,
        steps: ["Apply the remainder theorem: dividing by (x − a) leaves p(a).", "Substitute the root and set the expression equal to the given remainder.", "Solve the resulting linear equation for k."],
        principles: ["The remainder of p(x) ÷ (x − a) equals p(a)."],
        hint: "You never have to carry out the long division; evaluate at the root instead.",
        trap: "Substituting the negative of the root, which belongs to a divisor of the form (x + a).",
        verification: quotientCheck(remainder - divisorRoot ** 3 + linear * divisorRoot - constant, divisorRoot ** 2, k),
      };
    },
    (s, variant) => {
      const group = 2 + (s % 6);
      const square = 2 + (s % 4);
      const greatest = Math.max(group, square);
      return {
        family: "cubic-factor-by-grouping",
        stem: pose(variant, "extremeSolution", {
          equation: `x³ ${MINUS} ${group}x² ${MINUS} ${square * square}x + ${group * square * square} = 0`,
          extreme: "greatest",
        }),
        answer: greatest,
        wrong: [
          [-square, `${MINUS}${square} is the smallest of the three roots, not the greatest.`],
          [Math.min(group, square), "This is the smaller of the two positive roots."],
          [group * square, "This multiplies two of the roots together."],
          [group + square, "This adds two of the roots."],
          [group * square * square, "This is the constant term of the cubic."],
        ],
        why: `Group the terms: x²(x − ${group}) − ${square * square}(x − ${group}) = (x − ${group})(x² − ${square * square}) = (x − ${group})(x − ${square})(x + ${square}). The roots are ${group}, ${square}, and ${MINUS}${square}, so the greatest is ${greatest}.`,
        steps: ["Group the first two terms and the last two terms.", "Factor each pair and extract the common binomial.", "Factor the remaining difference of squares and compare the three roots."],
        principles: ["Grouping turns a four-term cubic into a product of a binomial and a quadratic."],
        hint: "Pair the terms and look for the same binomial factor in both pairs.",
        trap: "Stopping after the grouping step and missing the two roots hidden in the difference of squares.",
      };
    },
  ],
};

SHAPES["rational expressions"] = {
  Easy: [
    (s, variant) => {
      const constant = 3 + (s % 8);
      return {
        family: "simplify-difference-of-squares-quotient",
        stem: pose(variant, "equivalentForm", {
          expression: `(x² ${MINUS} ${constant * constant})/(x ${MINUS} ${constant}), for x ≠ ${constant},`,
          form: "x + k",
          target: "k",
        }),
        answer: constant,
        wrong: [
          [-constant, "This keeps the sign of the cancelled factor rather than the sign of the remaining one."],
          [round3(constant / 2), "This halves the constant, which the factorisation never does."],
          [2 * constant, "The difference of squares does not double the constant."],
          [constant * constant, "This is the constant inside the numerator, before factoring."],
          [constant * constant - constant, "This subtracts the constant from the square instead of factoring."],
        ],
        why: `x² − ${constant * constant} = (x − ${constant})(x + ${constant}). Cancelling the common factor leaves x + ${constant}, so k = ${constant}.`,
        steps: ["Factor the numerator as a difference of squares.", "Cancel the factor shared with the denominator.", "Read the constant that remains."],
        principles: ["a² − b² = (a − b)(a + b)."],
        hint: "The denominator is one of the two factors of the numerator.",
        // Recovers k from the numerator's constant term rather than restating it.
        verification: { kind: "linear-equation", inputs: [constant, 0, constant * constant], expected: constant },
      };
    },
    (s, variant) => {
      const excluded = 3 + (s % 9);
      const numeratorConstant = 2 + (s % 7);
      return {
        family: "undefined-value-of-rational-expression",
        stem: pose(variant, "quantityOf", {
          description: `the value of x at which (x + ${numeratorConstant})/(x ${MINUS} ${excluded}) is undefined`,
        }),
        answer: excluded,
        wrong: [
          [-excluded, "This solves x + " + excluded + " = 0 instead of x − " + excluded + " = 0."],
          [-numeratorConstant, "This is the value that makes the numerator zero, which gives the expression the value 0 rather than making it undefined."],
          [0, "At x = 0 the denominator is not zero, so the expression is defined."],
          [numeratorConstant, "This is the constant in the numerator, not the value that zeroes the denominator."],
          [excluded + numeratorConstant, "This adds the two constants rather than solving the denominator equation."],
        ],
        why: `A fraction is undefined only where its denominator is zero: x − ${excluded} = 0 gives x = ${excluded}.`,
        steps: ["Set the denominator equal to zero.", "Solve for x.", "Confirm the numerator is not also being asked about."],
        principles: ["A rational expression is undefined exactly where its denominator is zero."],
        hint: "Only the denominator can make an expression undefined.",
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const other = 4 + (s % 8);
      const combined = 2 + (s % 3);
      const answer = round3(1 / (1 / combined - 1 / other));
      const usable = Number.isInteger(answer) ? answer : round3(answer);
      return {
        family: "reciprocal-equation",
        stem: pose(variant, "givenFind", {
          given: `1/x + 1/${other} = 1/${combined}`,
          target: "x",
        }),
        answer: usable,
        wrong: [
          [round3(combined - other), "This subtracts the denominators as if the reciprocals could be dropped."],
          [round3(1 / (1 / combined + 1 / other)), "This adds the reciprocals instead of subtracting to isolate 1/x."],
          [round3(other - combined), "This subtracts the denominators directly, which ignores that the equation involves reciprocals."],
          [round3(other * combined), "This multiplies the denominators without dividing by their difference."],
          [round3(other + combined), "This adds the denominators, which would only be valid if the equation involved x itself rather than 1/x."],
        ],
        why: `1/x = 1/${combined} − 1/${other} = ${round3(1 / combined - 1 / other)}, so x = ${usable}.`,
        steps: ["Isolate 1/x on one side.", "Subtract the fractions using a common denominator.", "Take the reciprocal of the result to find x."],
        principles: ["Reciprocals must be combined before inverting; 1/a + 1/b is not 1/(a + b)."],
        hint: "Solve for 1/x first, then flip.",
      };
    },
    (s, variant) => {
      const first = 2 + (s % 5);
      const second = first + 1 + (s % 4);
      return {
        family: "simplify-trinomial-quotient",
        stem: pose(variant, "equivalentForm", {
          expression: `(x² + ${first + second}x + ${first * second})/(x + ${first}), for x ≠ ${MINUS}${first},`,
          form: "x + k",
          target: "k",
        }),
        answer: second,
        wrong: [
          [-second, "This flips the sign; both factors of the numerator have plus signs here."],
          [first, `${first} matches the denominator's constant, which is the factor that cancels.`],
          [first + second, "This is the middle coefficient of the numerator, which is the sum of the two constants."],
          [first * second, "This is the constant term of the numerator, which is their product."],
          [first * second - first, "This subtracts rather than factoring the numerator."],
        ],
        why: `x² + ${first + second}x + ${first * second} = (x + ${first})(x + ${second}). Cancelling x + ${first} leaves x + ${second}, so k = ${second}.`,
        steps: ["Factor the numerator into two binomials.", "Cancel the binomial that matches the denominator.", "Read the remaining constant."],
        principles: ["Factor before cancelling; only whole factors may be cancelled."],
        hint: "Find two numbers that add to the middle coefficient and multiply to the constant.",
        verification: { kind: "sum", inputs: [first + second, -first], expected: second },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const upper = 3 + (s % 6);
      const lower = 2 + (s % 5);
      const integers = [];
      for (let value = -lower + 1; value < upper; value += 1) integers.push(value);
      return {
        family: "rational-inequality-sign-chart",
        stem: pose(variant, "countIntegers", {
          condition: `(x ${MINUS} ${upper})/(x + ${lower}) < 0`,
          symbol: "x",
        }),
        answer: integers.length,
        wrong: [
          [integers.length - 1, "This drops one interior integer; every integer strictly between the two critical values works."],
          [integers.length + 1, `This counts x = ${upper} or x = ${MINUS}${lower}, where the quotient is 0 or undefined rather than negative.`],
          [integers.length + 2, "This counts both critical values, but one makes the quotient zero and the other makes it undefined."],
          [upper + lower, "This is the distance between the critical values, which counts one more integer than the open interval contains."],
          [upper * lower, "This multiplies the critical values instead of counting integers between them."],
        ],
        why: `The quotient changes sign at x = ${upper} and x = ${MINUS}${lower}. Testing the three regions shows it is negative only for ${MINUS}${lower} < x < ${upper}. The integers there are ${integers.join(", ")} — ${integers.length} values.`,
        steps: ["Find where the numerator and denominator are zero.", "Split the number line at those points and test the sign of the quotient in each region.", "Count the integers in the negative region, excluding both critical values."],
        principles: ["A quotient is negative exactly where numerator and denominator have opposite signs."],
        hint: "Mark both critical values on a number line and test one point in each region.",
        trap: "Multiplying both sides by the denominator, which flips the inequality whenever the denominator is negative.",
        verification: { kind: "sum", inputs: integers.map(() => 1), expected: integers.length },
      };
    },
    (s, variant) => {
      const x = 2 + (s % 5);
      const y = x + 2 + (s % 6);
      // Reported as an exact reduced fraction. A three-decimal rounding of a
      // repeating quotient can never equal the value its own verification
      // recomputes, and the shipped validator compares the two to 1e-9.
      const answer = frac(y - x, y + x);
      return {
        family: "complex-fraction-simplification",
        stem: pose(variant, "givenFind", {
          given: `x = ${x} and y = ${y}`,
          target: `(1/x ${MINUS} 1/y)/(1/x + 1/y)`,
        }),
        answer,
        wrong: [
          [frac(x - y, x + y), "This reverses the numerator; clearing the fractions gives y − x on top, not x − y."],
          [frac(y - x, y * x), "This keeps the product xy in the denominator instead of cancelling it against the denominator's own xy."],
          [y - x, "This simplifies only the numerator and drops the denominator."],
          [frac(y + x, y - x), "This inverts the whole expression."],
          [frac(y, x), "This divides the values rather than simplifying the compound fraction."],
        ],
        why: `Multiply numerator and denominator by xy: (y − x)/(y + x) = (${y} − ${x})/(${y} + ${x}) = ${answer.text}.`,
        steps: ["Multiply the top and bottom of the compound fraction by xy.", "Simplify to (y − x)/(y + x).", "Substitute the given values and reduce."],
        principles: ["Clearing inner denominators with a common factor turns a compound fraction into a simple one."],
        hint: "Multiply through by xy before substituting anything.",
        trap: "Simplifying 1/x − 1/y to 1/(x − y).",
        verification: quotientCheck(y - x, y + x, answer.value),
      };
    },
  ],
};

SHAPES["exponents"] = {
  Easy: [
    (s, variant) => {
      const a = 2 + (s % 3);
      const b = 3 + ((s + 1) % 3);
      const c = 2 + (s % 4);
      const n = a * b + c;
      return {
        family: "power-of-a-power-times-power",
        stem: pose(variant, "givenFind", {
          given: `(x^${a})^${b} · x^${c} = x^n for every positive x`,
          target: "n",
        }),
        answer: n,
        wrong: [
          [a + b, "This adds only the two exponents inside the parentheses and ignores the second factor."],
          [a + b + c, "This adds all three exponents; a power raised to a power multiplies them."],
          [a * b, "This handles the parentheses correctly but drops the x^" + c + " factor."],
          [a * b * c, "This multiplies every exponent; multiplying like bases adds the exponents."],
          [a * (b + c), "This applies the outer exponent to the separate factor as well."],
          [(a + b) * c, "This adds the inner exponents and then multiplies by the outer one."],
        ],
        why: `(x^${a})^${b} = x^${a * b} because a power of a power multiplies exponents. Multiplying by x^${c} adds exponents: ${a * b} + ${c} = ${n}.`,
        steps: [
          `Apply the power-of-a-power rule: (x^${a})^${b} = x^${a * b}.`,
          `Multiply like bases by adding exponents: ${a * b} + ${c}.`,
          `Report the single exponent n = ${n}.`,
        ],
        principles: ["(xᵃ)ᵇ = x^(ab) and xᵐ · xⁿ = x^(m+n)."],
        hint: "Simplify the parentheses first, then combine the two factors.",
        verification: { kind: "sum", inputs: [a * b, c], expected: n },
      };
    },
    (s, variant) => {
      const base = 2 + (s % 2);
      const p = 4 + (s % 4);
      const q = 1 + (s % 3);
      const answer = base ** (p - q);
      return {
        family: "quotient-of-like-bases-value",
        stem: pose(variant, "value", { expression: `${base}^${p}/${base}^${q}` }),
        answer,
        wrong: [
          [base ** (p + q), "This adds the exponents; dividing like bases subtracts them."],
          [base ** p - base ** q, "This subtracts the two powers instead of subtracting the exponents."],
          [p - q, "This reports the exponent rather than the value of the power."],
          [base ** (p * q), "This multiplies the exponents."],
          [base ** (p - q) * base, "This subtracts one too few from the exponent."],
          [base ** (p - q - 1), "This subtracts one too many from the exponent."],
        ],
        why: `${base}^${p}/${base}^${q} = ${base}^(${p} − ${q}) = ${base}^${p - q} = ${answer}.`,
        steps: [
          "Recognise that both powers share a base.",
          `Subtract exponents: ${p} − ${q} = ${p - q}.`,
          `Evaluate ${base}^${p - q} = ${answer}.`,
        ],
        principles: ["xᵐ/xⁿ = x^(m−n) for x ≠ 0."],
        hint: "Subtract the exponents before evaluating anything.",
        verification: { kind: "product", inputs: Array.from({ length: p - q }, () => base), expected: answer },
      };
    },
    (s, variant) => {
      const coefficient = 2 + (s % 4);
      const p = 2 + (s % 3);
      const q = 2 + ((s + 1) % 2);
      const answer = coefficient ** q;
      return {
        family: "coefficient-raised-to-outer-power",
        stem: pose(variant, "equivalentForm", {
          expression: `(${coefficient}x^${p})^${q}, for x > 0,`,
          form: "cx^d with c and d constant",
          target: "c",
        }),
        answer,
        wrong: [
          [coefficient, "The outer exponent applies to the coefficient too, not only to the variable."],
          [coefficient * q, "This multiplies the coefficient by the exponent instead of raising it to that power."],
          [p * q, "This is the exponent d, not the coefficient c."],
          [coefficient ** q + p * q, "This adds the exponent d to the coefficient."],
          [coefficient ** (q + 1), "This raises the coefficient to one power too many."],
          [coefficient + q, "This adds the outer exponent to the coefficient."],
        ],
        why: `(${coefficient}x^${p})^${q} = ${coefficient}^${q} · x^(${p}·${q}) = ${answer}x^${p * q}, so c = ${answer}.`,
        steps: [
          "Distribute the outer exponent to both the coefficient and the power of x.",
          `Compute ${coefficient}^${q} = ${answer}.`,
          "Read off the coefficient, not the exponent.",
        ],
        principles: ["(ax^p)^q = a^q · x^(pq)."],
        hint: "The outer exponent lands on every factor inside the parentheses.",
        verification: { kind: "product", inputs: Array.from({ length: q }, () => coefficient), expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const base = 2 + (s % 3);
      const root = choose(s, [2, 3, 4]);
      const power = 2 + (s % 3);
      const radicand = base ** root;
      const answer = base ** power;
      return {
        family: "fractional-exponent-evaluation",
        stem: pose(variant, "value", { expression: `${radicand}^(${power}/${root})` }),
        answer,
        wrong: [
          [radicand * power / root, "This multiplies by the fraction instead of using it as an exponent."],
          [base, `This extracts the ${root}th root but never raises the result to the power ${power}.`],
          [base ** (power + root), "This adds the numerator and denominator of the exponent."],
          [base ** (power - 1), "This takes one factor too few after extracting the root."],
          [base ** (power + 1), "This takes one factor too many after extracting the root."],
          [radicand ** power, "This ignores the denominator of the fractional exponent."],
        ],
        why: `${radicand} = ${base}^${root}, so ${radicand}^(${power}/${root}) = ${base}^(${root} · ${power}/${root}) = ${base}^${power} = ${answer}.`,
        steps: [
          `Write ${radicand} as a power of ${base}: ${radicand} = ${base}^${root}.`,
          "Multiply the exponents, cancelling the denominator.",
          `Evaluate ${base}^${power} = ${answer}.`,
        ],
        principles: ["a^(m/n) is the nth root of a, raised to the mth power."],
        hint: `Rewrite ${radicand} as a power of a small base first.`,
        trap: "Treating the fractional exponent as multiplication by a fraction.",
        verification: { kind: "product", inputs: Array.from({ length: power }, () => base), expected: answer },
      };
    },
    (s, variant) => {
      const top = 2 + (s % 3);
      const bottom = top + 1 + (s % 2);
      const power = 2;
      const answer = frac(bottom ** power, top ** power);
      return {
        family: "negative-exponent-on-a-fraction",
        stem: pose(variant, "value", { expression: `(${top}/${bottom})^${MINUS}${power}` }),
        answer,
        wrong: [
          [frac(top ** power, bottom ** power), "This squares the fraction but never inverts it; the negative exponent reciprocates."],
          [frac(bottom, top), "This inverts the fraction but ignores the exponent 2."],
          [frac(top, bottom), "This leaves the expression unchanged."],
          [frac(-(bottom ** power), top ** power), "A negative exponent produces a reciprocal, not a negative value."],
          [frac(bottom * power, top * power), "This multiplies numerator and denominator by 2 instead of squaring them."],
          [frac(bottom ** (power + 1), top ** (power + 1)), "This raises the inverted fraction to the third power."],
        ],
        why: `A negative exponent inverts the base: (${top}/${bottom})^${MINUS}${power} = (${bottom}/${top})^${power} = ${bottom ** power}/${top ** power}.`,
        steps: [
          "Rewrite the negative exponent as the reciprocal raised to the positive exponent.",
          `Square ${bottom}/${top}.`,
          `Simplify to ${answer.text}.`,
        ],
        principles: ["(a/b)^(−n) = (b/a)^n."],
        hint: "Flip the fraction first, then apply the positive exponent.",
        trap: "Making the answer negative because the exponent is negative.",
      };
    },
    (s, variant) => {
      const a = 2 + (s % 3);
      const p = 3 + (s % 4);
      const q = 1 + (s % 3);
      const c = 2 + ((s + 1) % 3);
      const r = 1 + (s % 2);
      const degree = p * q - r;
      return {
        family: "combined-exponent-rules-degree",
        stem: pose(variant, "equivalentForm", {
          expression: `(${a}x^${p})^${q}/(${c}x^${r}) for x > 0`,
          form: "kx^n",
          target: "n",
        }),
        answer: degree,
        wrong: [
          [p * q + r, "This adds the denominator's exponent; division subtracts it."],
          [p + q - r, "This adds the exponents inside and outside the parentheses instead of multiplying them."],
          [p * q, "This never divides by x^" + r + "."],
          [p * q * r, "This multiplies by the denominator's exponent rather than subtracting it."],
          [p * q - r - 1, "This subtracts one extra from the exponent."],
          [(p - r) * q, "This subtracts the denominator's exponent before distributing the outer power."],
        ],
        why: `The numerator is ${a ** q}x^${p * q}. Dividing by ${c}x^${r} subtracts exponents, so n = ${p * q} ${MINUS} ${r} = ${degree}.`,
        steps: [
          `Raise the numerator to the power ${q}: (${a}x^${p})^${q} = ${a ** q}x^${p * q}.`,
          `Subtract the denominator's exponent: ${p * q} − ${r}.`,
          `The exponent n is ${degree}.`,
        ],
        principles: ["(ax^p)^q/(cx^r) = (a^q/c)·x^(pq−r)."],
        hint: "Distribute the outer exponent before dividing.",
        trap: "Reporting the coefficient k when the question asks for the exponent n.",
        verification: { kind: "sum", inputs: [p * q, -r], expected: degree },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const base = 2 + (s % 2);
      const inner = 2 + (s % 2);
      const outer = inner + 1;
      const shift = 1 + (s % 4);
      const x = (outer * shift + inner * shift) / (outer - inner);
      const answer = round3(x);
      return {
        family: "same-base-exponential-equation",
        stem: pose(variant, "givenFind", {
          given: `${base ** inner}^(x + ${shift}) = ${base ** outer}^(x ${MINUS} ${shift})`,
          target: "x",
        }),
        answer,
        wrong: [
          [round3(shift), "This solves as if the two bases were already equal, dropping the exponent conversion."],
          [round3(-x), "This reverses the sign when isolating x."],
          [0, "Substituting 0 leaves the two sides with different exponents."],
          [round3((outer * shift - inner * shift) / (outer - inner)), "This subtracts the two shift terms instead of adding them after distributing."],
          [round3(x + shift), "This stops before subtracting the shift that was added to both sides."],
          [round3(x * 2), "This doubles the solution, as if the coefficient of x were 1 instead of the difference of the exponents."],
        ],
        why: `Write both sides with base ${base}: ${base}^(${inner}(x + ${shift})) = ${base}^(${outer}(x − ${shift})). Equal bases force equal exponents, so ${inner}x + ${inner * shift} = ${outer}x − ${outer * shift}, giving x = ${answer}.`,
        steps: [
          `Rewrite ${base ** inner} and ${base ** outer} as powers of ${base}.`,
          "Set the exponents equal because the bases match.",
          "Solve the resulting linear equation.",
        ],
        principles: ["If b^m = b^n and b > 0, b ≠ 1, then m = n."],
        hint: `Both ${base ** inner} and ${base ** outer} are powers of ${base}.`,
        trap: "Cancelling the bases without distributing the inner exponents across the parentheses.",
        verification: { kind: "linear-equation", inputs: [inner - outer, inner * shift + outer * shift, 0], expected: answer },
      };
    },
    (s, variant) => {
      const base = 2 + (s % 3);
      const known = 3 + (s % 5);
      const multiple = 2 + (s % 3);
      const extra = 1 + (s % 3);
      const answer = known ** multiple * base ** extra;
      return {
        family: "substituted-power-expression",
        stem: pose(variant, "givenFind", {
          given: `${base}^a = ${known}`,
          target: `${base}^(${multiple}a + ${extra})`,
        }),
        answer,
        wrong: [
          [known * multiple + base ** extra, "This multiplies rather than raises: b^(ma) is (b^a)^m, not m·b^a."],
          [known ** multiple, `This drops the factor ${base}^${extra} contributed by the constant term.`],
          [known ** multiple + base ** extra, "The constant term contributes a factor, not an added term."],
          [known ** (multiple + extra), `This treats the constant ${extra} as part of the exponent multiplier.`],
          [known * base ** extra, "This uses b^a once instead of raising it to the power " + multiple + "."],
          [known ** multiple * base * extra, `This multiplies by ${base}·${extra} instead of ${base}^${extra}.`],
        ],
        why: `${base}^(${multiple}a + ${extra}) = (${base}^a)^${multiple} · ${base}^${extra} = ${known}^${multiple} · ${base ** extra} = ${answer}.`,
        steps: [
          "Split the exponent into a sum, which becomes a product of powers.",
          `Replace ${base}^a with ${known} and raise it to the power ${multiple}.`,
          `Multiply by ${base}^${extra} = ${base ** extra}.`,
        ],
        principles: ["b^(m·a + c) = (b^a)^m · b^c."],
        hint: "Break the exponent apart into a product before substituting.",
        trap: "Treating the added constant in the exponent as an added term in the value.",
        verification: { kind: "product", inputs: [known ** multiple, base ** extra], expected: answer },
      };
    },
    (s, variant) => {
      const root = 2 + (s % 3);
      const m = 1 + (s % 3);
      const outer = 2 + ((s + 1) % 3);
      const outerExponent = outer * root;
      const answer = m * outer;
      return {
        family: "negative-fractional-exponent-simplification",
        stem: pose(variant, "equivalentForm", {
          expression: `(x^(${MINUS}${m}/${root}))^(${MINUS}${outerExponent}) for x > 0`,
          form: "x^n",
          target: "n",
        }),
        answer,
        wrong: [
          [-answer, "Two negative exponents multiply to a positive exponent, not a negative one."],
          [round3(-m / root - outerExponent), "This adds the two exponents instead of multiplying them."],
          [outer, `This cancels the ${root} correctly but drops the factor ${m} from the numerator.`],
          [outerExponent, "This ignores the fractional exponent entirely."],
          [round3(m * outer / root), `This divides by ${root} a second time after it has already cancelled.`],
          [answer + outer, "This multiplies by one extra copy of the outer factor."],
        ],
        why: `Multiply the exponents: (${MINUS}${m}/${root}) · (${MINUS}${outerExponent}) = (${m} · ${outerExponent})/${root} = ${m * outerExponent}/${root} = ${answer}. Both factors are negative, so n is positive.`,
        steps: [
          "Apply the power-of-a-power rule and multiply the two exponents.",
          "Two negatives make the product positive.",
          `Simplify ${m * outerExponent}/${root} to ${answer}.`,
        ],
        principles: ["(x^m)^n = x^(mn), and the product of two negatives is positive."],
        hint: "Multiply the exponents and track both minus signs.",
        trap: "Adding the exponents, or keeping a negative sign after multiplying two negatives.",
        verification: { kind: "linear-equation", inputs: [root, 0, m * outerExponent], expected: answer },
      };
    },
  ],
};

SHAPES["notation"] = {
  Easy: [
    (s, variant) => {
      const a = 2 + (s % 6);
      const b = 3 + (s % 8);
      const input = 2 + (s % 7);
      const answer = a * input + b;
      return {
        family: "evaluate-linear-function",
        stem: pose(variant, "givenFind", {
          given: `f(x) = ${a}x + ${b}`,
          target: `f(${input})`,
        }),
        answer,
        wrong: [
          [a + b + input, "This adds all three numbers instead of multiplying the coefficient by the input."],
          [a * input, `This multiplies ${a} by ${input} but never adds the constant ${b}.`],
          [a + b * input, `This multiplies the constant by the input; the coefficient ${a} is what multiplies x.`],
          [a * b + input, "This multiplies the two constants and adds the input."],
          [a * input - b, "This subtracts the constant instead of adding it."],
          [(a + b) * input, "This adds the coefficient and constant before multiplying."],
        ],
        why: `Substitute ${input} for x: f(${input}) = ${a}(${input}) + ${b} = ${a * input} + ${b} = ${answer}.`,
        steps: [
          `Replace every x in the rule with ${input}.`,
          `Multiply: ${a} · ${input} = ${a * input}.`,
          `Add the constant: ${a * input} + ${b} = ${answer}.`,
        ],
        principles: ["f(k) means substitute k wherever x appears in the rule."],
        hint: "f(3) does not mean f times 3; it means substitute 3 for x.",
        verification: { kind: "sum", inputs: [a * input, b], expected: answer },
      };
    },
    (s, variant) => {
      const a = 2 + (s % 4);
      const b = 1 + (s % 9);
      const input = 2 + (s % 5);
      const answer = a * input * input + b;
      return {
        family: "evaluate-quadratic-function",
        stem: pose(variant, "givenFind", {
          given: `g(x) = ${a}x² + ${b}`,
          target: `g(${input})`,
        }),
        answer,
        wrong: [
          [a * input * 2 + b, "This doubles the input instead of squaring it."],
          [(a * input) ** 2 + b, "This squares the product of the coefficient and the input; only x is squared."],
          [a * input * input, `This squares and multiplies correctly but drops the constant ${b}.`],
          [(a + b) * input * input, "This adds the constant before squaring rather than after."],
          [a + input * input + b, "This adds the coefficient rather than multiplying by it."],
          [a * (input + b) ** 2, "This adds the constant inside the square."],
        ],
        why: `g(${input}) = ${a}(${input})² + ${b} = ${a}(${input * input}) + ${b} = ${a * input * input} + ${b} = ${answer}.`,
        steps: [
          `Square the input first: ${input}² = ${input * input}.`,
          `Multiply by the coefficient: ${a} · ${input * input} = ${a * input * input}.`,
          `Add the constant to get ${answer}.`,
        ],
        principles: ["In ax², the exponent applies to x alone, before the coefficient multiplies."],
        hint: "Square before you multiply; the coefficient is not inside the square.",
        verification: { kind: "sum", inputs: [a * input * input, b], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const a = 2 + (s % 4);
      const b = 1 + (s % 6);
      const c = 2 + (s % 3);
      const d = 3 + (s % 7);
      const input = 1 + (s % 5);
      const inner = c * input + d;
      const answer = a * inner + b;
      return {
        family: "composition-at-a-point",
        stem: pose(variant, "givenFind", {
          given: `f(x) = ${a}x + ${b} and g(x) = ${c}x + ${d}`,
          target: `f(g(${input}))`,
        }),
        answer,
        wrong: [
          [c * (a * input + b) + d, "This computes g(f(x)); the inner function is applied first, and here that is g."],
          [inner, `This stops at g(${input}) = ${inner} without applying f.`],
          [a * input + b, `This evaluates f(${input}) and never uses g.`],
          [(a * input + b) * (c * input + d), "This multiplies the two outputs; composition substitutes one into the other."],
          [a * inner, "This applies f's coefficient but drops f's constant term."],
          [a * c * input + b + d, "This multiplies the coefficients and adds the constants, which skips the constant d being scaled by a."],
        ],
        why: `Work inside out: g(${input}) = ${c}(${input}) + ${d} = ${inner}. Then f(${inner}) = ${a}(${inner}) + ${b} = ${answer}.`,
        steps: [
          `Evaluate the inner function: g(${input}) = ${inner}.`,
          `Substitute that output into f.`,
          `Compute f(${inner}) = ${answer}.`,
        ],
        principles: ["f(g(x)) applies g first, then feeds its output into f."],
        hint: "Composition works from the inside out.",
        trap: "Reversing the order and computing g(f(x)) instead.",
        verification: { kind: "sum", inputs: [a * inner, b], expected: answer },
      };
    },
    (s, variant) => {
      const a = 2 + (s % 5);
      const b = 2 + (s % 9);
      const answer = 2 + (s % 8);
      const output = a * answer + b;
      return {
        family: "solve-for-the-input",
        stem: pose(variant, "givenFind", {
          given: `f(x) = ${a}x + ${b} and f(k) = ${output}`,
          target: "k",
        }),
        answer,
        wrong: [
          [output, "This is the output value, not the input that produced it."],
          [round3(output / a), `This divides by ${a} without first removing the constant ${b}.`],
          [output - b, `This subtracts the constant but never divides by ${a}.`],
          [round3((output + b) / a), "This adds the constant instead of subtracting it."],
          [a * output + b, "This applies the rule to the output instead of undoing it."],
          [output + b, "This adds the constant rather than removing it."],
        ],
        why: `Set ${a}k + ${b} = ${output}. Subtracting ${b} gives ${a}k = ${output - b}, so k = ${answer}.`,
        steps: [
          "Write the equation f(k) = " + output + " using the rule.",
          "Subtract the constant from both sides.",
          `Divide by ${a} to isolate k.`,
        ],
        principles: ["Finding an input from an output means solving the rule backwards."],
        hint: "You are given the output; undo the rule step by step.",
        trap: "Reporting the output because it appears in the question.",
        verification: { kind: "linear-equation", inputs: [a, b, output], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const a = 2 + (s % 5);
      const b = 1 + (s % 9);
      const target = a * (2 + (s % 7)) + b;
      const answer = (target - b) / a;
      return {
        family: "inverse-function-value",
        stem: pose(variant, "givenFind", {
          given: `f(x) = ${a}x + ${b}`,
          target: `f⁻¹(${target})`,
        }),
        answer,
        wrong: [
          [a * target + b, `This applies f to ${target} instead of undoing it.`],
          [round3(1 / (a * target + b)), "This treats f⁻¹ as a reciprocal; the exponent notation means the inverse function."],
          [round3(target / a), `This divides by ${a} without first subtracting ${b}.`],
          [target - b, `This subtracts ${b} but never divides by ${a}.`],
          [round3((target + b) / a), "This adds the constant instead of subtracting it."],
          [target, "This is the input to the inverse, not its output."],
        ],
        why: `f⁻¹(${target}) is the x with f(x) = ${target}. Solving ${a}x + ${b} = ${target} gives ${a}x = ${target - b}, so x = ${answer}.`,
        steps: [
          "Recognise that f⁻¹(c) asks which input f sends to c.",
          `Solve ${a}x + ${b} = ${target}.`,
          "The solution is the value of the inverse.",
        ],
        principles: ["f⁻¹(c) = k exactly when f(k) = c."],
        hint: "Do not compute a reciprocal — undo the function.",
        trap: "Reading f⁻¹ as 1/f, which is a different function entirely.",
        verification: { kind: "linear-equation", inputs: [a, b, target], expected: answer },
      };
    },
    (s, variant) => {
      const a = 2 + (s % 4);
      const x = 1 + (s % 6);
      const h = 1 + (s % 3);
      const answer = a * (2 * x + h);
      return {
        family: "difference-quotient",
        stem: pose(variant, "givenFind", {
          given: `f(x) = ${a}x²`,
          target: `(f(${x} + ${h}) ${MINUS} f(${x}))/${h}`,
        }),
        answer,
        wrong: [
          [a * (2 * x + h) * h, "This never divides by the change in x."],
          [a * 2 * x, "This drops the h term; the average rate over an interval is not the rate at the left endpoint."],
          [a * h, "This uses only the change in x, ignoring the starting value."],
          [round3(a * ((x + h) ** 2 - x ** 2) / h) + h, "This computes the quotient correctly and then adds h a second time."],
          [a * (x + h) ** 2, `This is f(${x} + ${h}) alone, with nothing subtracted or divided.`],
          [a * (x + h) ** 2 - a * x * x, "This is the numerator before dividing by the change in x."],
        ],
        why: `f(${x + h}) = ${a}(${(x + h) ** 2}) = ${a * (x + h) ** 2} and f(${x}) = ${a * x * x}. The difference is ${a * (x + h) ** 2 - a * x * x}, and dividing by ${h} gives ${answer}.`,
        steps: [
          `Evaluate f at ${x + h} and at ${x}.`,
          "Subtract the two outputs.",
          `Divide by the change in x, which is ${h}.`,
        ],
        principles: ["The difference quotient measures average rate of change over an interval, not at a point."],
        hint: "Compute both outputs first, then subtract and divide.",
        trap: "Forgetting the division by h, which leaves a change rather than a rate.",
        verification: {
          kind: "linear-equation",
          inputs: [h, 0, a * (x + h) ** 2 - a * x * x],
          expected: answer,
        },
      };
    },
    (s, variant) => {
      const a = 2 + (s % 4);
      const b = 1 + (s % 5);
      const d = 2 + (s % 6);
      // The two compositions have the same x-coefficient (ac either way), so
      // they differ by a constant. Asking for that constant is the honest
      // question: it is exactly what makes composition non-commutative.
      const c = a + 1 + (s % 3);
      return {
        family: "composition-order-comparison",
        stem: pose(variant, "givenFind", {
          given: `f(x) = ${a}x + ${b} and g(x) = ${c}x + ${d}`,
          target: `f(g(0)) ${MINUS} g(f(0))`,
        }),
        answer: a * d + b - (c * b + d),
        wrong: [
          [c * b + d - (a * d + b), "This reverses the subtraction, giving g(f(0)) − f(g(0))."],
          [0, "The two compositions agree only when a·d + b = c·b + d, which fails here."],
          [a * d + b, `This is f(g(0)) = ${a * d + b} alone.`],
          [c * b + d, `This is g(f(0)) = ${c * b + d} alone.`],
          [a * d - c * b, "This subtracts the products but drops both constant terms."],
          [b - d, "This subtracts only the constants and ignores the scaled terms."],
        ],
        why: `g(0) = ${d}, so f(g(0)) = ${a}(${d}) + ${b} = ${a * d + b}. f(0) = ${b}, so g(f(0)) = ${c}(${b}) + ${d} = ${c * b + d}. The difference is ${a * d + b - (c * b + d)}.`,
        steps: [
          "Evaluate each inner function at 0.",
          "Apply the outer function to each result.",
          "Subtract in the order the question states.",
        ],
        principles: ["Composition is not commutative: f(g(x)) and g(f(x)) generally differ."],
        hint: "Evaluate both compositions separately before subtracting.",
        trap: "Assuming the two compositions are equal and answering 0.",
        verification: {
          kind: "sum",
          inputs: [a * d, b, -(c * b), -d],
          expected: a * d + b - (c * b + d),
        },
      };
    },
  ],
};

SHAPES["domain and range"] = {
  Easy: [
    (s, variant) => {
      const excluded = 2 + (s % 9);
      const numeratorConstant = 1 + (s % 7);
      return {
        family: "domain-exclusion-rational",
        stem: pose(variant, "quantityOf", {
          description: `the real value excluded from the domain of f(x) = (x + ${numeratorConstant})/(x ${MINUS} ${excluded})`,
        }),
        answer: excluded,
        wrong: [
          [-excluded, "This flips the sign; the denominator vanishes where x equals the subtracted number."],
          [-numeratorConstant, "This is where the numerator is zero, which makes the value 0 rather than undefined."],
          [numeratorConstant, "This is the numerator's constant with the wrong sign, and it does not zero the denominator."],
          [0, "Substituting 0 gives a defined value because the denominator is not 0 there."],
          [excluded + numeratorConstant, "This combines the two constants; only the denominator controls the domain."],
          [excluded * numeratorConstant, "This multiplies the constants rather than solving the denominator for zero."],
        ],
        why: `A quotient is undefined only where its denominator is 0. Solving x − ${excluded} = 0 gives x = ${excluded}.`,
        steps: [
          "Set the denominator equal to zero.",
          "Solve for x.",
          "That single value is excluded from the domain.",
        ],
        principles: ["A rational function's domain excludes exactly the zeros of its denominator."],
        hint: "Only the denominator can make a fraction undefined.",
        verification: { kind: "linear-equation", inputs: [1, -excluded, 0], expected: excluded },
      };
    },
    (s, variant) => {
      const shift = 2 + (s % 10);
      return {
        family: "domain-of-square-root",
        stem: pose(variant, "quantityOf", {
          description: `the least real value in the domain of f(x) = √(x ${MINUS} ${shift})`,
        }),
        answer: shift,
        wrong: [
          [-shift, "This flips the sign; the radicand is non-negative when x is at least the subtracted value."],
          [0, "At x = 0 the radicand is negative, so the square root is not a real number."],
          [shift + 1, "This excludes the endpoint, but the radicand may equal 0 and the root is then defined."],
          [shift * shift, "This squares the shift; the radicand is linear, not squared."],
          [round3(shift / 2), "This halves the shift, which does not make the radicand non-negative."],
          [shift - 1, "At this value the radicand is negative."],
        ],
        why: `A real square root needs a non-negative radicand: x − ${shift} ≥ 0, so x ≥ ${shift}. The least such value is ${shift}.`,
        steps: [
          "Require the expression under the radical to be at least 0.",
          "Solve the resulting inequality.",
          "The boundary value is included because the root of 0 is defined.",
        ],
        principles: ["√u is real exactly when u ≥ 0."],
        hint: "Set the radicand at least equal to zero and solve.",
        verification: { kind: "linear-equation", inputs: [1, -shift, 0], expected: shift },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const a = 1 + (s % 3);
      const vertexX = 1 + (s % 6);
      const minimum = 2 + (s % 9);
      return {
        family: "range-of-upward-parabola",
        stem: pose(variant, "quantityOf", {
          description: `the range of f(x) = ${a}(x ${MINUS} ${vertexX})² + ${minimum}`,
        }),
        answer: `f(x) ≥ ${minimum}`,
        wrong: [
          [`f(x) ≥ ${vertexX}`, `${vertexX} is the x-coordinate of the vertex; the range is built from the y-coordinate.`],
          [`f(x) ≤ ${minimum}`, `The coefficient ${a} is positive, so the parabola opens upward and ${minimum} is a minimum, not a maximum.`],
          [`f(x) ≥ ${minimum + vertexX}`, "This adds the two constants; only the constant outside the square shifts the outputs."],
          [`f(x) ≥ 0`, "A squared term is non-negative, but the whole function is shifted up by the constant."],
          ["all real numbers", "A parabola never takes values below its vertex."],
          [`f(x) ≥ ${a * minimum}`, `This multiplies the vertical shift by ${a}; the coefficient applies to the squared term only.`],
        ],
        why: `(x − ${vertexX})² is never negative, so its least value is 0 at x = ${vertexX}. Then f(x) is least at ${a}(0) + ${minimum} = ${minimum}, and it grows without bound, giving f(x) ≥ ${minimum}.`,
        steps: [
          "Note that a squared term has minimum value 0.",
          `Find where that happens: x = ${vertexX}.`,
          "Substitute to get the minimum output, then describe everything above it.",
        ],
        principles: ["In vertex form a(x − h)² + k with a > 0, the range is y ≥ k."],
        hint: "The range depends on k, the constant outside the square.",
        trap: "Reporting the vertex's x-coordinate instead of its y-coordinate.",
      };
    },
    (s, variant) => {
      const constant = 12 + 2 * (s % 8);
      const coefficient = 2 + (s % 3);
      const answer = constant / coefficient;
      return {
        family: "domain-of-decreasing-radicand",
        stem: pose(variant, "quantityOf", {
          description: `the greatest real value in the domain of f(x) = √(${constant} ${MINUS} ${coefficient}x)`,
        }),
        answer,
        wrong: [
          [constant, `This ignores the coefficient ${coefficient} multiplying x.`],
          [-answer, "This flips the sign; the radicand is non-negative for x below the boundary, not above its negative."],
          [round3(coefficient / constant), "This inverts the division."],
          [constant - coefficient, "This subtracts the coefficient instead of dividing by it."],
          [constant * coefficient, "This multiplies instead of dividing."],
          [answer + 1, "At this value the radicand is already negative."],
        ],
        why: `Require ${constant} − ${coefficient}x ≥ 0, so ${coefficient}x ≤ ${constant} and x ≤ ${answer}. The greatest allowed value is ${answer}.`,
        steps: [
          "Set the radicand greater than or equal to zero.",
          "Solve for x, dividing by the positive coefficient.",
          "The boundary is included because the root of 0 is defined.",
        ],
        principles: ["A radicand that decreases in x gives an upper bound on the domain."],
        hint: "Solve the inequality radicand ≥ 0 rather than guessing from the constant.",
        trap: "Reading the constant term as the boundary and ignoring the coefficient of x.",
        verification: { kind: "linear-equation", inputs: [coefficient, 0, constant], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const shift = 2 + (s % 7);
      const asymptote = 1 + (s % 6);
      return {
        family: "range-of-shifted-exponential",
        stem: pose(variant, "quantityOf", {
          description: `the range of f(x) = ${shift}^x + ${asymptote}`,
        }),
        answer: `f(x) > ${asymptote}`,
        wrong: [
          [`f(x) ≥ ${asymptote}`, `${shift}^x is strictly positive and never reaches 0, so the value ${asymptote} itself is never attained.`],
          [`f(x) > ${shift}`, `${shift} is the base of the exponential, not the horizontal asymptote.`],
          [`f(x) > 0`, "This is the range before the graph is shifted up."],
          ["all real numbers", "An exponential function never produces values at or below its horizontal asymptote."],
          [`f(x) > ${asymptote + shift}`, "This adds the base to the asymptote; only the added constant sets the asymptote."],
          [`f(x) < ${asymptote}`, "The exponential term is positive, so outputs lie above the asymptote, not below."],
        ],
        why: `${shift}^x is positive for every real x but never equals 0. Adding ${asymptote} shifts every output up, so f(x) is always greater than ${asymptote} and never equal to it.`,
        steps: [
          "Identify the range of the bare exponential: strictly positive.",
          "Apply the vertical shift to that whole set.",
          "Decide whether the boundary is attained; here it is not.",
        ],
        principles: ["b^x > 0 for all real x, so b^x + k has the horizontal asymptote y = k and never reaches it."],
        hint: "Ask whether the exponential term can ever be exactly zero.",
        trap: "Including the asymptote by writing ≥ instead of >.",
      };
    },
    (s, variant) => {
      const inner = 2 + (s % 8);
      const outer = 1 + (s % 5);
      const answer = inner + outer * outer;
      return {
        family: "domain-of-a-composition",
        stem: pose(variant, "quantityOf", {
          description: `the value of x for which 1/(√(x ${MINUS} ${inner}) ${MINUS} ${outer}) is undefined`,
        }),
        answer,
        wrong: [
          [inner, "The square root is defined here and equals 0, so the reciprocal exists unless the subtracted constant is also 0."],
          [inner + outer, `This adds ${outer} rather than ${outer}², forgetting that the radical must be squared away.`],
          [outer * outer, `This squares ${outer} but never shifts by ${inner}.`],
          [inner - outer * outer, "This subtracts the square instead of adding it, which can fall outside the radical's domain."],
          [inner * outer, "This multiplies the two constants rather than solving the radical equation."],
          [answer + outer, "This overshoots; substituting it makes the radical exceed the subtracted constant."],
        ],
        why: `1/g(x) is undefined where g(x) = 0, that is where √(x − ${inner}) = ${outer}. Squaring gives x − ${inner} = ${outer * outer}, so x = ${answer}.`,
        steps: [
          "Set the denominator equal to zero.",
          "Isolate the radical and square both sides.",
          "Solve for x and confirm it lies in the radical's own domain.",
        ],
        principles: ["A composed domain must satisfy every restriction in the chain: the radicand and the denominator both."],
        hint: "The reciprocal fails where the square root equals the subtracted constant, not where the radical is zero.",
        trap: "Stopping at the radical's domain and never checking where the denominator vanishes.",
        verification: { kind: "sum", inputs: [inner, outer * outer], expected: answer },
      };
    },
  ],
};

SHAPES["transformations"] = {
  Easy: [
    (s, variant) => {
      const shift = 2 + (s % 8);
      const pointX = 1 + (s % 5);
      const pointY = 3 + (s % 7);
      const answer = pointY + shift;
      return {
        family: "vertical-shift-of-a-point",
        stem: pose(variant, "givenFind", {
          given: `f(${pointX}) = ${pointY}`,
          target: `f(${pointX}) + ${shift}`,
        }),
        answer,
        wrong: [
          [pointY - shift, "Adding a constant outside the function shifts the graph up, not down."],
          [pointX + shift, "This shifts the x-coordinate; the constant is added to the output."],
          [pointY * shift, "This multiplies the output rather than adding to it."],
          [pointY, "This leaves the point unchanged, but the graph has been shifted."],
          [pointX + pointY, "This adds the coordinates to each other."],
          [answer + shift, "This applies the shift twice."],
        ],
        why: `Adding ${shift} outside the function raises every output by ${shift}: f(${pointX}) + ${shift} = ${pointY} + ${shift} = ${answer}.`,
        steps: [
          "Recognise that the constant is added after f acts, so it changes outputs.",
          `Add ${shift} to the known output ${pointY}.`,
          "The x-coordinate is unchanged.",
        ],
        principles: ["y = f(x) + k shifts the graph vertically by k and leaves x-coordinates alone."],
        hint: "A constant outside the function moves the graph up or down.",
        verification: { kind: "sum", inputs: [pointY, shift], expected: answer },
      };
    },
    (s, variant) => {
      const pointX = 2 + (s % 6);
      const pointY = 1 + (s % 8);
      const factor = 2 + (s % 3);
      const answer = factor * pointY;
      return {
        family: "vertical-stretch-of-a-point",
        stem: pose(variant, "givenFind", {
          given: `f(${pointX}) = ${pointY}`,
          target: `${factor}f(${pointX})`,
        }),
        answer,
        wrong: [
          [pointY + factor, "This adds the factor instead of multiplying by it."],
          [factor * pointX, "This scales the x-coordinate; the factor multiplies the output."],
          [round3(pointY / factor), "This compresses instead of stretching."],
          [pointY, "A stretch by a factor greater than 1 changes the output."],
          [factor * pointX * pointY, "This multiplies both coordinates together."],
          [answer + factor, "This stretches and then adds the factor a second time."],
        ],
        why: `Multiplying the function by ${factor} multiplies every output by ${factor}: ${factor} · ${pointY} = ${answer}.`,
        steps: [
          "Identify that the factor is applied after f, so it scales outputs.",
          `Multiply the known output by ${factor}.`,
          "The x-coordinate is unchanged.",
        ],
        principles: ["y = af(x) stretches the graph vertically by the factor a."],
        hint: "A coefficient in front of f scales the y-values.",
        verification: { kind: "product", inputs: [factor, pointY], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const shift = 2 + (s % 7);
      const pointX = 3 + (s % 6);
      const pointY = 2 + (s % 8);
      const answer = pointX + shift;
      return {
        family: "horizontal-shift-of-a-point",
        stem: pose(variant, "parameterFor", {
          condition: `f(k ${MINUS} ${shift}) = ${pointY}, given f(${pointX}) = ${pointY}`,
          parameter: "k",
        }),
        answer,
        wrong: [
          [pointX - shift, "Subtracting inside the function shifts the graph right, not left."],
          [pointY + shift, "This shifts the y-coordinate; the change is inside the function, so it affects x."],
          [pointX, "The graph has moved, so the x-coordinate changes."],
          [pointY - shift, "This subtracts from the wrong coordinate and in the wrong direction."],
          [pointX * shift, "This scales the coordinate rather than translating it."],
          [answer + shift, "This shifts twice."],
        ],
        why: `f(k − ${shift}) reproduces the original output when k − ${shift} = ${pointX}, so k = ${pointX} + ${shift} = ${answer}. Subtracting inside the function moves the graph right.`,
        steps: [
          "Set the transformed input equal to the original input.",
          `Solve k − ${shift} = ${pointX}.`,
          "Note that the y-coordinate is unchanged.",
        ],
        principles: ["y = f(x − h) translates the graph h units right, the opposite of the sign inside."],
        hint: "Set the inside of the function equal to the original x-value.",
        trap: "Shifting left because the sign inside is negative.",
        verification: { kind: "sum", inputs: [pointX, shift], expected: answer },
      };
    },
    (s, variant) => {
      const pointX = 2 + (s % 7);
      const pointY = 3 + (s % 6);
      return {
        family: "reflection-across-an-axis",
        stem: pose(variant, "quantityOf", {
          description: `the image of (${pointX}, ${pointY}) under the transformation y = ${MINUS}f(x)`,
        }),
        answer: point(pointX, -pointY),
        wrong: [
          [point(-pointX, pointY), "This reflects across the y-axis, which is the graph of f(−x), not −f(x)."],
          [point(-pointX, -pointY), "This reflects across both axes; the negation applies only to the output."],
          [point(pointY, pointX), "This swaps the coordinates, which describes an inverse rather than a reflection."],
          [point(pointX, pointY), "A reflection changes the point unless the y-value is 0."],
          [point(pointY, -pointX), "This swaps and negates, mixing an inverse with a reflection."],
        ],
        why: `Negating the whole function negates every output: the point (${pointX}, ${pointY}) becomes (${pointX}, ${MINUS}${pointY}). The x-coordinate is untouched.`,
        steps: [
          "Decide whether the negation is inside or outside the function.",
          "Outside means outputs change sign, so the y-coordinate is negated.",
          "Leave the x-coordinate alone.",
        ],
        principles: ["y = −f(x) reflects across the x-axis; y = f(−x) reflects across the y-axis."],
        hint: "The minus sign is outside f, so it acts on y.",
        trap: "Confusing −f(x) with f(−x).",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const shift = 1 + (s % 5);
      const factor = 2 + (s % 3);
      const raise = 1 + (s % 6);
      const pointX = 2 + (s % 5);
      const pointY = 2 + (s % 7);
      const newX = pointX + shift;
      const newY = factor * pointY + raise;
      return {
        family: "combined-transformation-of-a-point",
        stem: pose(variant, "quantityOf", {
          description: `the image of (${pointX}, ${pointY}) under y = ${factor}f(x ${MINUS} ${shift}) + ${raise}`,
        }),
        answer: point(newX, newY),
        wrong: [
          [point(pointX - shift, newY), "The horizontal shift moves the graph right, so the x-coordinate increases."],
          [point(newX, factor * (pointY + raise)), "The vertical shift is applied after the stretch, not before it."],
          [point(newX, pointY + raise), `This applies the shift but never multiplies the output by ${factor}.`],
          [point(newX, factor * pointY), `This stretches but never adds ${raise}.`],
          [point(factor * pointX + shift, newY), "The stretch factor applies to outputs, not to the x-coordinate."],
          [point(pointX, newY), "The horizontal shift does change the x-coordinate."],
        ],
        why: `The input shift moves x from ${pointX} to ${pointX} + ${shift} = ${newX}. The output is stretched then raised: ${factor}(${pointY}) + ${raise} = ${newY}. The image is (${newX}, ${num(newY)}).`,
        steps: [
          `Solve x − ${shift} = ${pointX} to find the new x-coordinate.`,
          `Multiply the old output by ${factor}.`,
          `Add ${raise} last, because it is applied outside the stretch.`,
        ],
        principles: ["In y = af(x − h) + k the order matters: stretch first, then shift vertically."],
        hint: "Handle the inside of the function and the outside separately.",
        trap: "Adding the vertical shift before applying the stretch.",
      };
    },
    (s, variant) => {
      const a = 2 + (s % 5);
      const b = 1 + (s % 7);
      const input = 1 + (s % 6);
      const answer = a * input * input + b;
      return {
        family: "even-function-symmetry",
        stem: choose(variant, [
          `The function f(x) = ${a}x² + ${b} satisfies f(${MINUS}${input}) = k. ${ask(variant, "k")}`,
          `For f(x) = ${a}x² + ${b}, what is the value of f(${MINUS}${input})?`,
          `Given f(x) = ${a}x² + ${b}, evaluate f(${MINUS}${input}).`,
          `If f(x) = ${a}x² + ${b}, which number equals f(${MINUS}${input})?`,
        ]),
        answer,
        wrong: [
          [-(a * input * input) + b, "Squaring a negative number gives a positive result, so the squared term does not change sign."],
          [-answer, "The whole output does not change sign; only x did, and x is squared."],
          [a * input * input - b, `The constant ${b} is added regardless of the sign of x.`],
          [-a * input + b, "This treats the function as linear in x rather than squaring."],
          [a * input + b, "This drops the square."],
          [answer + b, "This adds the constant twice."],
        ],
        why: `(${MINUS}${input})² = ${input * input}, so f(${MINUS}${input}) = ${a}(${input * input}) + ${b} = ${answer}. The function is even, so f(${MINUS}${input}) = f(${input}).`,
        steps: [
          "Square the negative input, which produces a positive value.",
          "Multiply by the coefficient.",
          "Add the constant term.",
        ],
        principles: ["A function built only from even powers satisfies f(−x) = f(x)."],
        hint: "Square the input before doing anything with its sign.",
        trap: "Carrying the minus sign through the square.",
        verification: { kind: "sum", inputs: [a * input * input, b], expected: answer },
      };
    },
  ],
};

SHAPES["linear"] = {
  Easy: [
    (s, variant) => {
      const x1 = 1 + (s % 5);
      const y1 = 2 + (s % 7);
      const run = 2 + (s % 4);
      const slope = 2 + (s % 5);
      const x2 = x1 + run;
      const y2 = y1 + slope * run;
      return {
        family: "slope-from-two-points",
        stem: pose(variant, "quantityOf", {
          description: `the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2})`,
        }),
        answer: slope,
        wrong: [
          [round3(run / (slope * run)), "This inverts the ratio, dividing the run by the rise."],
          [slope * run, "This is the total rise, not the rise per unit of run."],
          [run, "This is the horizontal change alone."],
          [y2 - y1 + run, "This adds the two changes instead of dividing one by the other."],
          [round3((y2 + y1) / (x2 + x1)), "This adds the coordinates rather than subtracting them."],
          [slope + run, "This adds the run to the slope."],
        ],
        why: `Slope is rise over run: (${y2} − ${y1})/(${x2} − ${x1}) = ${y2 - y1}/${run} = ${slope}.`,
        steps: [
          "Subtract the y-coordinates to get the rise.",
          "Subtract the x-coordinates in the same order to get the run.",
          "Divide the rise by the run.",
        ],
        principles: ["Slope = (y₂ − y₁)/(x₂ − x₁), with both differences taken in the same order."],
        hint: "Keep the same point first in both subtractions.",
        verification: quotientCheck(y2 - y1, x2 - x1, slope),
      };
    },
    (s, variant) => {
      const slope = 2 + (s % 6);
      const intercept = 3 + (s % 9);
      const input = 2 + (s % 5);
      const answer = slope * input + intercept;
      const service = scene(variant, HOURLY_SERVICE);
      return {
        family: "linear-model-evaluate",
        stem: `A ${service} charges a flat ${intercept} plus ${slope} per hour. What is the total charge for a ${input}-hour session?`,
        answer,
        wrong: [
          [slope * input, "This charges the hourly rate but omits the flat fee."],
          [intercept * input, "This multiplies the flat fee by the hours; the flat fee is charged once."],
          [slope + intercept, "This charges one hour regardless of the session length."],
          [(slope + intercept) * input, "This treats the flat fee as an hourly charge."],
          [slope * input - intercept, "This subtracts the flat fee instead of adding it."],
          [answer + intercept, "This charges the flat fee twice."],
        ],
        why: `The total is the flat fee plus the hourly rate times the hours: ${intercept} + ${slope}(${input}) = ${intercept} + ${slope * input} = ${answer}.`,
        steps: [
          "Identify the one-time charge and the per-hour charge.",
          `Multiply the rate by the ${input} hours.`,
          "Add the flat fee once.",
        ],
        principles: ["A linear model y = mx + b charges b once and m for each unit."],
        hint: "The flat fee does not depend on the number of hours.",
        verification: { kind: "sum", inputs: [slope * input, intercept], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const slope = 2 + (s % 5);
      const x1 = 1 + (s % 6);
      const y1 = 4 + (s % 8);
      const intercept = y1 - slope * x1;
      return {
        family: "line-through-point-with-slope",
        stem: pose(variant, "parameterFor", {
          condition: `y = ${slope}x + b passes through (${x1}, ${y1})`,
          parameter: "b",
        }),
        answer: intercept,
        wrong: [
          [y1 + slope * x1, "This adds the product instead of subtracting it when solving for b."],
          [y1, "This is the y-coordinate of the given point, not the value where x = 0."],
          [slope * x1, "This is the amount the line rises from the intercept to the point."],
          [y1 - x1, "This subtracts the x-coordinate rather than the slope times the x-coordinate."],
          [round3(y1 / slope), "This divides by the slope instead of subtracting the rise."],
          [intercept - slope, "This backs up one extra step of slope."],
        ],
        why: `Substitute into y = ${slope}x + b: ${y1} = ${slope}(${x1}) + b, so b = ${y1} − ${slope * x1} = ${intercept}.`,
        steps: [
          "Write the slope-intercept form with the known slope.",
          "Substitute the coordinates of the given point.",
          "Solve for b.",
        ],
        principles: ["A point on a line must satisfy the line's equation."],
        hint: "Substitute the point and solve for the only unknown left.",
        trap: "Reporting the point's y-coordinate as the intercept.",
        verification: { kind: "sum", inputs: [y1, -(slope * x1)], expected: intercept },
      };
    },
    (s, variant) => {
      const startA = 60 + 10 * (s % 6);
      const rateA = 4 + (s % 4);
      const rateB = rateA + 2 + (s % 3);
      const weeks = 3 + (s % 7);
      const startB = startA + (rateA - rateB) * weeks;
      const collection = scene(variant, COLLECTION);
      return {
        family: "two-linear-models-equal",
        stem: `A ${collection.owner} tracks two collections containing ${startA} and ${startB} ${collection.plural}. The first gains ${rateA} ${collection.plural} per week and the second gains ${rateB} per week. After how many weeks do the collections hold equal numbers?`,
        answer: weeks,
        wrong: [
          [startA - startB, "This is the initial gap in sprouts, not a number of weeks."],
          [rateB - rateA, "This is the weekly gain in the difference, not the time needed."],
          [round3((startA + startB) / (rateA + rateB)), "This adds the two models instead of setting them equal."],
          [weeks + 1, "After this many weeks the second tray has already passed the first."],
          [round3(startA / rateA), "This asks how long the first tray alone takes to double its count from zero."],
          [startA + startB, "This adds the starting counts, which answers no question here."],
        ],
        why: `Set ${startA} + ${rateA}w = ${startB} + ${rateB}w. The difference ${startA - startB} closes at ${rateB - rateA} per week, so w = ${startA - startB}/${rateB - rateA} = ${weeks}.`,
        steps: [
          "Write a linear expression for each tray.",
          "Set the two expressions equal.",
          "Solve for the number of weeks and check both counts agree.",
        ],
        principles: ["Two linear models meet when the initial gap is closed by the difference in rates."],
        hint: "The tray that starts behind must gain faster; divide the gap by the difference in rates.",
        trap: "Dividing by one rate instead of by the difference of the rates.",
        verification: quotientCheck(startA - startB, rateB - rateA, weeks),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const base = 20 + 5 * (s % 6);
      const included = 2 + (s % 4);
      const extraRate = 3 + (s % 5);
      const hours = included + 2 + (s % 6);
      const answer = base + extraRate * (hours - included);
      const service = scene(variant, HOURLY_SERVICE);
      return {
        family: "piecewise-linear-model",
        stem: `A ${service} charges ${base} for the first ${included} hours and ${extraRate} for each additional hour. What is the charge for ${hours} hours?`,
        answer,
        wrong: [
          [base + extraRate * hours, `This charges the extra rate for all ${hours} hours instead of only the hours beyond ${included}.`],
          [extraRate * hours, "This ignores the base charge entirely."],
          [base * hours, "This multiplies the base charge by the hours; the base covers a block of time."],
          [base + extraRate, "This adds only one extra hour beyond the included block."],
          [round3((base + extraRate * (hours - included)) / hours), "This is the average cost per hour, not the total charge."],
          [base + extraRate * (hours - included) + base, "This charges the base fee twice."],
        ],
        why: `The first ${included} hours cost ${base}. The remaining ${hours - included} hours cost ${extraRate} each, adding ${extraRate * (hours - included)}. The total is ${answer}.`,
        steps: [
          "Split the time into the included block and the overage.",
          `Compute the overage: ${hours} − ${included} = ${hours - included} hours.`,
          "Multiply the overage by the extra rate and add the base charge.",
        ],
        principles: ["A piecewise rate applies different prices to different intervals; only the overage is billed at the second rate."],
        hint: `Do not charge the hourly rate for the ${included} hours already covered by the base fee.`,
        trap: `Applying the extra rate to all ${hours} hours.`,
        verification: { kind: "sum", inputs: [base, extraRate * (hours - included)], expected: answer },
      };
    },
    (s, variant) => {
      const slope = 2 + (s % 5);
      const intercept = 3 + (s % 7);
      const shiftUp = 2 + (s % 6);
      const answer = intercept + shiftUp;
      return {
        family: "parallel-line-through-point",
        stem: pose(variant, "quantityOf", {
          description: `the y-intercept of the line through (0, ${answer}) parallel to y = ${slope}x + ${intercept}`,
        }),
        answer,
        wrong: [
          [intercept, "This is the intercept of the original line; parallel lines share a slope, not an intercept."],
          [slope, "This is the shared slope, not an intercept."],
          [answer + slope, "This adds the slope to the intercept."],
          [answer - shiftUp, "This returns to the original line's intercept."],
          [slope * answer, "This multiplies the intercept by the slope."],
          [answer + intercept, "This adds the two intercepts together."],
        ],
        why: `A point (0, k) on a line is its y-intercept by definition, so m has y-intercept ${answer}. Being parallel fixes m's slope at ${slope} but says nothing about where it crosses the axis.`,
        steps: [
          "Recall that parallel lines have equal slopes and generally different intercepts.",
          "Recognise that a point with x = 0 is the y-intercept.",
          "Read the intercept directly from that point.",
        ],
        principles: ["Parallel lines share a slope; the y-intercept is the output at x = 0."],
        hint: "The given point already has x = 0.",
        trap: "Assuming parallel lines must share the intercept of the line they are parallel to.",
        verification: { kind: "sum", inputs: [intercept, shiftUp], expected: answer },
      };
    },
  ],
};

SHAPES["quadratic"] = {
  Easy: [
    (s, variant) => {
      const a = 1 + (s % 3);
      const h = 1 + (s % 6);
      const k = 2 + (s % 8);
      return {
        family: "vertex-from-vertex-form",
        stem: pose(variant, "quantityOf", {
          description: `the minimum value of f(x) = ${a}(x ${MINUS} ${h})² + ${k}`,
        }),
        answer: k,
        wrong: [
          [h, "This is the x-coordinate of the vertex, not the minimum output."],
          [h + k, "This adds the two vertex coordinates."],
          [a * k, "The coefficient multiplies the squared term, not the constant outside it."],
          [0, "A squared term has minimum 0, but the constant is still added."],
          [k - h, "This subtracts the x-coordinate from the minimum value."],
          [a * h * h + k, `This evaluates f at x = 0 rather than at the vertex x = ${h}.`],
        ],
        why: `(x − ${h})² is never negative and equals 0 at x = ${h}. There f(x) = ${a}(0) + ${k} = ${k}, the minimum.`,
        steps: [
          "Recognise vertex form a(x − h)² + k.",
          "The squared term is smallest, namely 0, at x = h.",
          "The minimum output is therefore k.",
        ],
        principles: ["In vertex form the vertex is (h, k), and k is the extreme value."],
        hint: "Ask what the squared term can be at its smallest.",
        trap: "Reporting h, the location of the minimum, instead of k, the minimum itself.",
      };
    },
    (s, variant) => {
      const r1 = 1 + (s % 5);
      const r2 = r1 + 1 + (s % 6);
      const sum = r1 + r2;
      return {
        family: "roots-from-factored-quadratic",
        stem: pose(variant, "quantityOf", {
          description: `the sum of the solutions of (x ${MINUS} ${r1})(x ${MINUS} ${r2}) = 0`,
        }),
        answer: sum,
        wrong: [
          [r1 * r2, "This is the product of the roots, which is the constant term."],
          [r2 - r1, "This is the difference between the roots."],
          [-sum, "The roots are positive because each factor is x minus a positive number."],
          [r1, "This is one root, not the sum."],
          [r2, "This is the other root alone."],
          [sum + r1 * r2, "This adds the sum and the product."],
        ],
        why: `A product is zero when a factor is zero, so x = ${r1} or x = ${r2}. Their sum is ${r1} + ${r2} = ${sum}.`,
        steps: [
          "Set each factor equal to zero.",
          "Read off the two roots.",
          "Add them.",
        ],
        principles: ["The zero-product property turns a factored equation into separate linear equations."],
        hint: "Each factor gives one root; the sign flips from the factor to the root.",
        verification: { kind: "sum", inputs: [r1, r2], expected: sum },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const speed = 16 + 8 * (s % 5);
      const start = 4 + (s % 7);
      // h(t) = −16t² + speed·t + start; peak at t = speed/32.
      const peakTime = speed / 32;
      const answer = -16 * peakTime * peakTime + speed * peakTime + start;
      const projectile = scene(variant, PROJECTILE);
      return {
        family: "projectile-maximum-height",
        stem: `A ${projectile.object} is ${projectile.verb} upward from a height of ${start} feet with an initial speed of ${speed} feet per second, so its height after t seconds is h(t) = ${MINUS}16t² + ${speed}t + ${start}. What is its maximum height, in feet?`,
        answer,
        wrong: [
          [start, "This is the release height, not the peak."],
          [speed + start, "This adds the initial speed to the height; speed is not a height."],
          [round3(peakTime), "This is the time the peak occurs, in seconds, not the height."],
          [speed, "This is the initial speed."],
          [round3(answer - start), "This is the rise above the release point, not the height above the ground."],
          [round3(-16 * peakTime * peakTime + speed * peakTime), "This drops the release height."],
        ],
        why: `The peak occurs at t = −b/(2a) = ${speed}/32 = ${num(peakTime)} seconds. Substituting gives h = ${MINUS}16(${num(peakTime * peakTime)}) + ${speed}(${num(peakTime)}) + ${start} = ${num(answer)} feet.`,
        steps: [
          "Find the vertex time with t = −b/(2a).",
          "Substitute that time back into the height function.",
          "Report the height, not the time.",
        ],
        principles: ["A downward parabola reaches its maximum at t = −b/(2a)."],
        hint: "Find when the peak happens first, then evaluate the height there.",
        trap: "Answering with the time of the peak rather than the height at the peak.",
        verification: { kind: "sum", inputs: [speed * peakTime / 2, start], expected: answer },
      };
    },
    (s, variant) => {
      const r1 = 2 + (s % 5);
      const r2 = r1 + 1 + (s % 4);
      const b = -(r1 + r2);
      const c = r1 * r2;
      return {
        family: "solve-quadratic-by-factoring",
        stem: pose(variant, "extremeSolution", {
          equation: `x² ${MINUS} ${Math.abs(b)}x + ${c} = 0`,
          extreme: "greater",
        }),
        answer: r2,
        wrong: [
          [r1, "This is the smaller of the two roots."],
          [c, "This is the constant term, which equals the product of the roots."],
          [Math.abs(b), "This is the size of the middle coefficient, which equals the sum of the roots."],
          [-r2, "The roots are positive: their sum is positive and their product is positive."],
          [round3(c / r2), "This recomputes the smaller root from the product."],
          [Math.abs(b) + c, "Adding coefficients does not produce a root."],
        ],
        why: `Look for two numbers multiplying to ${c} and adding to ${Math.abs(b)}: they are ${r1} and ${r2}. So (x − ${r1})(x − ${r2}) = 0 and the greater root is ${r2}.`,
        steps: [
          "Find two numbers with the given product and sum.",
          "Write the factored form and set each factor to zero.",
          "Compare the two roots and report the larger.",
        ],
        principles: ["For x² + bx + c, the roots sum to −b and multiply to c."],
        hint: "Start from the constant term and list its factor pairs.",
        trap: "Reporting the smaller root, or the coefficients themselves.",
        verification: { kind: "linear-equation", inputs: [r1, 0, c], expected: r2 },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const a = 1 + (s % 3);
      const root = 2 + (s % 6);
      // ax² + bx + c has one real solution when b² = 4ac; choose b = 2·a·root
      // so that c = a·root².
      const b = 2 * a * root;
      const answer = a * root * root;
      return {
        family: "discriminant-single-solution",
        stem: choose(variant, [
          `For which value of c does ${a}x² + ${b}x + c = 0 have exactly one real solution?`,
          `The equation ${a}x² + ${b}x + c = 0 has a single real root for which value of c?`,
          `If ${a}x² + ${b}x + c = 0 is to have exactly one real solution, ${ask(variant, "c")}`,
          `Which value of c makes ${a}x² + ${b}x + c = 0 have a repeated real root?`,
        ]),
        answer,
        wrong: [
          [b * b, "This is b² alone; the discriminant condition is b² = 4ac, so c must be divided by 4a."],
          [round3(b * b / a), "This divides by a but not by 4."],
          [round3(b / (2 * a)), "This is the repeated root itself, not the constant term."],
          [4 * a * answer, "This multiplies by 4a instead of dividing by it."],
          [round3(b / 2), "This halves the middle coefficient rather than using the discriminant."],
          [answer + a, "This adds the leading coefficient to the correct value."],
        ],
        why: `One real solution means the discriminant is 0: b² − 4ac = 0, so ${b}² = 4(${a})c, giving c = ${b * b}/${4 * a} = ${answer}.`,
        steps: [
          "Write the discriminant b² − 4ac.",
          "Set it equal to zero for a repeated root.",
          "Solve for c.",
        ],
        principles: ["b² − 4ac > 0 gives two real roots, = 0 gives one, < 0 gives none."],
        hint: "A repeated root is the boundary case between two roots and none.",
        trap: "Setting the discriminant positive or negative rather than exactly zero.",
        verification: { kind: "linear-equation", inputs: [4 * a, 0, b * b], expected: answer },
      };
    },
    (s, variant) => {
      const lead = 2 + (s % 3);
      const r1 = 1 + (s % 4);
      const r2 = r1 + 1 + (s % 5);
      const b = -lead * (r1 + r2);
      const c = lead * r1 * r2;
      const answer = r1 + r2;
      return {
        family: "sum-of-roots-from-coefficients",
        stem: choose(variant, [
          `What is the sum of the solutions of ${lead}x² ${MINUS} ${Math.abs(b)}x + ${c} = 0?`,
          `The two roots of ${lead}x² ${MINUS} ${Math.abs(b)}x + ${c} = 0 add to which value?`,
          `Without solving, find the sum of the roots of ${lead}x² ${MINUS} ${Math.abs(b)}x + ${c} = 0.`,
          `For ${lead}x² ${MINUS} ${Math.abs(b)}x + ${c} = 0, the sum of the two solutions equals what?`,
        ]),
        answer,
        wrong: [
          [Math.abs(b), `This is ${MINUS}b, which equals the sum only when the leading coefficient is 1.`],
          [round3(c / lead), "This is the product of the roots, not their sum."],
          [c, "This is the constant term."],
          [-answer, `The middle coefficient is negative, so ${MINUS}b/a is positive.`],
          [round3(Math.abs(b) / c), "This divides the middle coefficient by the constant term."],
          [r1 * r2, "This is the product of the roots before dividing by the leading coefficient."],
        ],
        why: `For ax² + bx + c the roots sum to −b/a. Here that is ${Math.abs(b)}/${lead} = ${answer}.`,
        steps: [
          "Identify a, b, and c.",
          "Apply the relationship sum = −b/a.",
          "Simplify, remembering to divide by the leading coefficient.",
        ],
        principles: ["Roots of ax² + bx + c sum to −b/a and multiply to c/a."],
        hint: "You do not need to factor; use the coefficient relationships.",
        trap: "Forgetting to divide by the leading coefficient when it is not 1.",
        verification: quotientCheck(Math.abs(b), lead, answer),
      };
    },
  ],
};

SHAPES["exponential"] = {
  Easy: [
    (s, variant) => {
      const start = 3 + (s % 8);
      const factor = 2 + (s % 3);
      const periods = 2 + (s % 4);
      const answer = start * factor ** periods;
      const growth = scene(variant, EXPONENTIAL_GROWTH);
      return {
        family: "exponential-growth-after-n-periods",
        stem: `A ${growth.subject} starts with ${start} ${growth.unit} and multiplies by ${factor} each ${growth.period}. What is the quantity after ${periods} such periods?`,
        answer,
        wrong: [
          [start * factor * periods, "This multiplies once and then scales by the number of hours; repeated growth uses an exponent."],
          [start + factor * periods, "This adds a fixed amount each hour, which is linear rather than exponential growth."],
          [start * periods ** factor, "This swaps the base and the exponent."],
          [factor ** periods, `This leaves out the starting quantity ${start}.`],
          [start * factor ** (periods + 1), "This applies one growth period too many."],
          [start * factor ** (periods - 1), "This applies one growth period too few."],
        ],
        why: `Multiplying by ${factor} each hour for ${periods} hours multiplies by ${factor}^${periods} = ${factor ** periods} overall: ${start} · ${factor ** periods} = ${answer}.`,
        steps: [
          "Recognise repeated multiplication as an exponent.",
          `Compute ${factor}^${periods} = ${factor ** periods}.`,
          "Multiply by the starting quantity.",
        ],
        principles: ["Exponential growth is A = A₀ · rⁿ, where n counts the growth periods."],
        hint: "Repeated multiplication is a power, not a product with the number of periods.",
        verification: { kind: "product", inputs: [start, factor ** periods], expected: answer },
      };
    },
    (s, variant) => {
      const start = 400 + 100 * (s % 6);
      const halvings = 2 + (s % 4);
      const answer = start / 2 ** halvings;
      const halfLife = 3 + (s % 5);
      const sample = scene(variant, DECAY_SAMPLE);
      return {
        family: "half-life-decay",
        stem: `A ${sample} of ${start} milligrams decays with a half-life of ${halfLife} years. How many milligrams remain after ${halfLife * halvings} years?`,
        answer,
        wrong: [
          [round3(start / (2 * halvings)), "This divides by twice the number of half-lives instead of halving repeatedly."],
          [round3(start - start / 2 ** halvings), "This is the amount that decayed away, not the amount remaining."],
          [round3(start / 2), "This applies only one half-life."],
          [round3(start / halvings), "This divides by the number of half-lives."],
          [round3(start / 2 ** (halvings + 1)), "This applies one half-life too many."],
          [round3(start * 2 ** halvings), "This doubles instead of halving."],
        ],
        why: `${halfLife * halvings} years is ${halvings} half-lives, so the sample is halved ${halvings} times: ${start}/2^${halvings} = ${start}/${2 ** halvings} = ${answer} milligrams.`,
        steps: [
          "Divide the elapsed time by the half-life to count the halvings.",
          "Halve the starting amount that many times.",
          "Report the amount remaining, not the amount lost.",
        ],
        principles: ["After n half-lives, the remaining fraction is (1/2)ⁿ."],
        hint: "Count how many half-lives fit into the elapsed time first.",
        trap: "Reporting the amount that decayed instead of the amount left.",
        verification: quotientCheck(start, 2 ** halvings, answer),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const principal = 1000 + 500 * (s % 5);
      const rate = 4 + (s % 5);
      const years = 2 + (s % 3);
      // Balances are money, so they round to cents and print with a dollar
      // sign; round3 would have shown a third decimal place the stem promised
      // would not be there.
      const cents = (value) => money(Math.round(value * 100) / 100);
      const exact = principal * (1 + rate / 100) ** years;
      const answer = cents(exact);
      const finance = scene(variant, FINANCE);
      return {
        family: "compound-interest-balance",
        stem: `A ${finance.account} holds ${principal} and earns ${rate}% interest compounded annually. To the nearest cent, what is the balance after ${years} years?`,
        answer,
        wrong: [
          [cents(principal * (1 + rate * years / 100)), "This applies simple interest, which never earns interest on interest."],
          [cents(principal * rate * years / 100), "This is the interest earned under simple interest, not the balance."],
          [cents(principal * (1 + rate / 100)), "This compounds for a single year."],
          [cents(principal * (1 + rate / 100) ** (years + 1)), "This compounds for one year too many."],
          [cents(principal * rate / 100), "This is one year's interest alone."],
          [cents(principal + rate * years), "This adds the percentage as if it were dollars."],
        ],
        why: `Each year multiplies the balance by 1 + ${rate}/100 = ${1 + rate / 100}. After ${years} years the balance is ${principal} · ${round3((1 + rate / 100) ** years)} = ${answer.text}.`,
        steps: [
          "Convert the percentage to a growth factor.",
          `Raise that factor to the power ${years}.`,
          "Multiply by the principal.",
        ],
        principles: ["Compound interest is A = P(1 + r)ⁿ; simple interest is A = P(1 + rn)."],
        hint: "Compounding multiplies by the same factor each year.",
        trap: "Using simple interest, which understates the balance.",
      };
    },
    (s, variant) => {
      const start = 2 + (s % 5);
      const factor = 2 + (s % 3);
      const target = start * factor ** (2 + (s % 4));
      const answer = Math.round(Math.log(target / start) / Math.log(factor));
      const growth = scene(variant, EXPONENTIAL_GROWTH);
      return {
        family: "solve-for-number-of-periods",
        stem: `A ${growth.subject} starts with ${start} ${growth.unit} and multiplies by ${factor} each ${growth.period}. After how many such periods does it reach ${target} ${growth.unit}?`,
        answer,
        wrong: [
          [round3(target / start), "This divides the totals; repeated multiplication needs an exponent, not a quotient."],
          [round3(target / (start * factor)), "This divides by one growth factor and stops."],
          [answer + 1, "One decade earlier the population has already reached the target."],
          [answer - 1, "At this point the population is still below the target."],
          [target - start, "This is the increase in thousands, not a number of decades."],
          [factor * answer, "This multiplies the answer by the growth factor."],
        ],
        why: `Solve ${start} · ${factor}^n = ${target}, so ${factor}^n = ${target / start}. Since ${factor}^${answer} = ${factor ** answer}, n = ${answer} decades.`,
        steps: [
          "Divide the target by the starting value to isolate the power.",
          "Ask what exponent produces that quotient.",
          "Report the exponent, which counts the decades.",
        ],
        principles: ["Solving A₀rⁿ = A for n means finding the exponent that reproduces the ratio A/A₀."],
        hint: "Divide first, then ask what power of the growth factor you are looking at.",
        trap: "Reporting the ratio of the populations rather than the exponent.",
        verification: factorCountCheck(target / start, factor, answer),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const base = 2 + (s % 3);
      const inner = 2 + (s % 4);
      const argument = base ** inner;
      return {
        family: "evaluate-a-logarithm",
        stem: choose(variant, [
          `What is the value of log${sub(base)}(${argument})?`,
          `Evaluate log${sub(base)}(${argument}).`,
          `The logarithm log${sub(base)}(${argument}) equals which number?`,
          `Which value is log${sub(base)}(${argument})?`,
        ]),
        answer: inner,
        wrong: [
          [argument, "This is the argument of the logarithm, not the exponent it represents."],
          [inner + 1, `This is one power too many: ${base}^${inner + 1} = ${base ** (inner + 1)}, not ${argument}.`],
          [inner - 1, `This is one power too few: ${base}^${inner - 1} = ${base ** (inner - 1)}, not ${argument}.`],
          [base ** (inner + 1), "This is the next power of the base, not an exponent at all."],
          [base * argument, "This multiplies the base by the argument; a logarithm returns an exponent."],
        ],
        why: `log${sub(base)}(${argument}) asks for the exponent n with ${base}^n = ${argument}. Since ${base}^${inner} = ${argument}, the value is ${inner}.`,
        steps: [
          "Rewrite the logarithm as an exponential equation.",
          `Ask what power of ${base} gives ${argument}.`,
          "That exponent is the value of the logarithm.",
        ],
        principles: ["log_b(x) = n means bⁿ = x."],
        hint: "A logarithm is an exponent.",
        trap: "Reporting the argument or the base instead of the exponent.",
        verification: factorCountCheck(argument, base, inner),
      };
    },
    (s, variant) => {
      const base = 2 + (s % 3);
      const first = 1 + (s % 4);
      const second = first + 1 + (s % 3);
      const answer = first + second;
      return {
        family: "logarithm-product-rule",
        stem: choose(variant, [
          `If log${sub(base)}(x) = ${first} and log${sub(base)}(y) = ${second}, what is log${sub(base)}(xy)?`,
          `Given log${sub(base)}(x) = ${first} and log${sub(base)}(y) = ${second}, evaluate log${sub(base)}(xy).`,
          `For log${sub(base)}(x) = ${first} and log${sub(base)}(y) = ${second}, the value of log${sub(base)}(xy) is what?`,
          `Suppose log${sub(base)}(x) = ${first} and log${sub(base)}(y) = ${second}. Which number equals log${sub(base)}(xy)?`,
        ]),
        answer,
        wrong: [
          [first * second, "The logarithm of a product adds the logarithms; it does not multiply them."],
          [second - first, "Subtracting logarithms corresponds to a quotient, not a product."],
          [base ** answer, "This is the product xy itself, not its logarithm."],
          [round3(second / first), "Dividing the logarithms corresponds to no logarithm rule."],
          [base * answer, "This multiplies the correct exponent by the base."],
          [answer + base, "This adds the base to the correct sum."],
        ],
        why: `log_b(xy) = log_b(x) + log_b(y) = ${first} + ${second} = ${answer}. Multiplying the arguments adds the exponents.`,
        steps: [
          "Recall that a product inside a logarithm becomes a sum outside it.",
          "Add the two given logarithms.",
          "Report the sum.",
        ],
        principles: ["log_b(xy) = log_b x + log_b y, because exponents add when powers multiply."],
        hint: "The rule mirrors the exponent rule bᵐ · bⁿ = b^(m+n).",
        trap: "Multiplying the two logarithms.",
        verification: { kind: "sum", inputs: [first, second], expected: answer },
      };
    },
  ],
};

SHAPES["angles"] = {
  Easy: [
    (s, variant) => {
      const known = 25 + 5 * (s % 11);
      const answer = 180 - known;
      return {
        family: "supplementary-angle",
        stem: pose(variant, "quantityOf", {
          description: `the measure of an angle supplementary to ${known}°`,
        }),
        answer: degrees(answer),
        wrong: [
          [degrees(90 - known < 0 ? known + 90 : 90 - known), "This treats the angles as complementary, summing to 90° rather than 180°."],
          [degrees(known), "This repeats the given angle; two equal angles sum to 180° only when each is 90°."],
          [degrees(360 - known), "This uses a full rotation instead of a straight angle."],
          [degrees(180 + known), "This adds the angle to a straight angle instead of subtracting it."],
          [degrees(answer - 10), "This is ten degrees short of the supplement."],
        ],
        why: `Supplementary angles sum to 180°, so the second angle is 180° − ${known}° = ${answer}°.`,
        steps: [
          "Recognise that angles forming a straight line are supplementary.",
          "Subtract the known angle from 180°.",
          "Check that the two measures add back to 180°.",
        ],
        principles: ["Angles on a straight line sum to 180°."],
        hint: "A straight angle measures 180°, not 90°.",
        verification: { kind: "sum", inputs: [180, -known], expected: answer },
      };
    },
    (s, variant) => {
      const known = 30 + 5 * (s % 10);
      const answer = 180 - known;
      return {
        family: "parallel-lines-cointerior",
        stem: pose(variant, "quantityOf", {
          description: `the same-side interior angle paired with ${known}° when a transversal crosses parallel lines`,
        }),
        answer: degrees(answer),
        wrong: [
          [degrees(known), "This describes alternate interior or corresponding angles, which are equal; same-side interior angles are supplementary."],
          [degrees(90 - known < 0 ? known - 90 : 90 - known), "This uses complementary angles, which do not arise from a transversal."],
          [degrees(360 - known), "This uses a full rotation rather than the straight angle along the transversal."],
          [degrees(answer / 2), "This halves the supplement."],
          [degrees(2 * known), "This doubles the given angle."],
        ],
        why: `Same-side interior angles formed by a transversal across parallel lines are supplementary, so the other angle is 180° − ${known}° = ${answer}°.`,
        steps: [
          "Identify the angle pair as same-side interior.",
          "Recall that this pair is supplementary, not congruent.",
          "Subtract from 180°.",
        ],
        principles: ["Across parallel lines, alternate and corresponding angles are equal; same-side interior angles are supplementary."],
        hint: "Not every angle pair at a transversal is congruent.",
        trap: "Assuming every pair formed by a transversal is equal.",
        verification: { kind: "sum", inputs: [180, -known], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      // Only side counts dividing 360 give a whole-number interior angle. A
      // heptagon would print 128.571°, which no printed test asks about and
      // which no exact recomputation can confirm.
      const sides = choose(s, [5, 6, 8, 9, 10, 12]);
      const answer = ((sides - 2) * 180) / sides;
      return {
        family: "regular-polygon-interior-angle",
        stem: pose(variant, "quantityOf", {
          description: `the measure of each interior angle of a regular ${sides}-gon`,
        }),
        answer: degrees(round3(answer)),
        wrong: [
          [degrees(round3(360 / sides)), "This is the exterior angle; the interior angle is its supplement."],
          [degrees(round3((sides - 2) * 180)), "This is the total of all interior angles, not one of them."],
          [degrees(round3(180 / sides)), "This divides a straight angle by the number of sides."],
          [degrees(round3(sides * 180)), "This multiplies without subtracting 2 from the side count."],
          [degrees(round3(answer - 10)), "This falls ten degrees short of the correct measure."],
        ],
        why: `The interior angles of an n-gon total (n − 2)·180° = ${(sides - 2) * 180}°. Dividing among ${sides} equal angles gives ${round3(answer)}° each.`,
        steps: [
          "Compute the total interior angle sum with (n − 2)·180°.",
          `Divide by the ${sides} congruent angles.`,
          "Check the answer is under 180°, as every interior angle of a convex polygon must be.",
        ],
        principles: ["The interior angles of an n-gon sum to (n − 2)·180°."],
        hint: "Find the total first, then share it among the angles.",
        trap: "Reporting the total sum, or the exterior angle 360°/n.",
        verification: quotientCheck((sides - 2) * 180, sides, answer),
      };
    },
    (s, variant) => {
      const apex = 30 + 4 * (s % 12);
      const answer = (180 - apex) / 2;
      return {
        family: "isosceles-base-angles",
        stem: pose(variant, "quantityOf", {
          description: `each base angle of an isosceles triangle whose vertex angle is ${apex}°`,
        }),
        answer: degrees(round3(answer)),
        wrong: [
          [degrees(round3(180 - apex)), "This is the combined measure of both base angles, not one of them."],
          [degrees(apex), "This repeats the vertex angle; it is congruent to neither base angle unless the triangle is equilateral."],
          [degrees(round3((360 - apex) / 2)), "This uses 360° instead of the 180° in a triangle."],
          [degrees(round3(90 - apex / 2)), "This treats the base angles as complementary to half the vertex angle."],
          [degrees(round3(answer + 5)), "This overshoots, and the three angles would then exceed 180°."],
        ],
        why: `The angles of a triangle sum to 180°, so the two congruent base angles share 180° − ${apex}° = ${180 - apex}°. Each is ${round3(answer)}°.`,
        steps: [
          "Subtract the vertex angle from 180°.",
          "Divide the remainder between the two congruent base angles.",
          "Confirm all three angles sum to 180°.",
        ],
        principles: ["The angles opposite the congruent sides of an isosceles triangle are congruent."],
        hint: "Two of the three angles are equal; share what is left after the vertex angle.",
        trap: "Reporting the total of both base angles instead of one.",
        verification: quotientCheck(180 - apex, 2, answer),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const sides = choose(s, [5, 6, 8, 9, 10, 12, 15, 18]);
      const answer = 360 / sides;
      return {
        family: "exterior-angle-of-regular-polygon",
        stem: choose(variant, [
          `A regular polygon has interior angles measuring ${round3(((sides - 2) * 180) / sides)}°. How many sides does it have?`,
          `Each interior angle of a regular polygon is ${round3(((sides - 2) * 180) / sides)}°. What is the number of sides?`,
          `A regular polygon whose interior angles each measure ${round3(((sides - 2) * 180) / sides)}° has how many sides?`,
          `If a regular polygon's interior angle is ${round3(((sides - 2) * 180) / sides)}°, the polygon has how many sides?`,
        ]),
        answer: sides,
        wrong: [
          [round3(answer), "This is the exterior angle in degrees, not the number of sides."],
          [sides - 2, "This is n − 2 from the angle-sum formula, not n itself."],
          [sides + 2, "This adds 2 instead of recovering n from 360 divided by the exterior angle."],
          [round3(((sides - 2) * 180) / sides), "This repeats the given interior angle."],
          [2 * sides, "This doubles the side count."],
          [round3(180 / answer), "This divides a straight angle by the exterior angle instead of a full rotation."],
        ],
        why: `The exterior angle is 180° − ${round3(((sides - 2) * 180) / sides)}° = ${round3(answer)}°. Exterior angles of any polygon total 360°, so n = 360/${round3(answer)} = ${sides}.`,
        steps: [
          "Subtract the interior angle from 180° to get the exterior angle.",
          "Divide 360° by the exterior angle.",
          "That quotient is the number of sides.",
        ],
        principles: ["The exterior angles of any convex polygon sum to 360°, so a regular one has n = 360°/exterior."],
        hint: "Going through the exterior angle is far quicker than solving the interior-angle formula for n.",
        trap: "Reporting the exterior angle rather than the side count.",
        verification: quotientCheck(360, answer, sides),
      };
    },
    (s, variant) => {
      const first = 20 + 5 * (s % 8);
      const second = 30 + 5 * (s % 7);
      const answer = first + second;
      return {
        family: "exterior-angle-theorem",
        stem: pose(variant, "quantityOf", {
          description: `the exterior angle of a triangle whose remote interior angles are ${first}° and ${second}°`,
        }),
        answer: degrees(answer),
        wrong: [
          [degrees(180 - answer), "This is the third interior angle, not the exterior angle beside it."],
          [degrees(180 - first), "This supplements only the first given angle."],
          [degrees(360 - answer), "This uses a full rotation instead of the exterior angle theorem."],
          [degrees(round3(answer / 2)), "This halves the sum of the remote interior angles."],
          [degrees(Math.abs(second - first)), "This subtracts the two remote angles instead of adding them."],
        ],
        why: `An exterior angle equals the sum of the two remote interior angles: ${first}° + ${second}° = ${answer}°. Equivalently, the third interior angle is ${180 - answer}° and its supplement is ${answer}°.`,
        steps: [
          "Recall the exterior angle theorem.",
          "Add the two remote interior angles.",
          "Check by finding the third angle and taking its supplement.",
        ],
        principles: ["An exterior angle of a triangle equals the sum of the two non-adjacent interior angles."],
        hint: "You do not need the third angle, though it gives a useful check.",
        trap: "Answering with the third interior angle instead of its exterior partner.",
        verification: { kind: "sum", inputs: [first, second], expected: answer },
      };
    },
  ],
};

SHAPES["triangles"] = {
  Easy: [
    (s, variant) => {
      const first = 30 + 5 * (s % 9);
      const second = 40 + 5 * (s % 8);
      const answer = 180 - first - second;
      return {
        family: "third-angle-of-triangle",
        stem: pose(variant, "quantityOf", {
          description: `the third angle of a triangle whose other angles are ${first}° and ${second}°`,
        }),
        answer: degrees(answer),
        wrong: [
          [degrees(first + second), "This is the sum of the two given angles, not what remains of 180°."],
          [degrees(360 - first - second), "This uses 360° instead of the 180° in a triangle."],
          [degrees(90 - first - second < 0 ? first + second - 90 : 90 - first - second), "This assumes the triangle is right and uses 90°."],
          [degrees(Math.abs(second - first)), "This subtracts the two given angles from each other."],
          [degrees(answer + 10), "This overshoots; the three angles would then exceed 180°."],
        ],
        why: `The angles of a triangle sum to 180°, so the third is 180° − ${first}° − ${second}° = ${answer}°.`,
        steps: [
          "Add the two known angles.",
          "Subtract that total from 180°.",
          "Check that all three angles sum to 180°.",
        ],
        principles: ["The interior angles of any triangle sum to 180°."],
        hint: "Subtract from 180°, not 360°.",
        verification: { kind: "sum", inputs: [180, -first, -second], expected: answer },
      };
    },
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      return {
        family: "pythagorean-hypotenuse",
        stem: pose(variant, "quantityOf", {
          description: `the hypotenuse of a right triangle with legs ${a} and ${b}`,
        }),
        answer: c,
        wrong: [
          [a + b, "This adds the legs; the Pythagorean theorem adds their squares."],
          [a * a + b * b, "This stops at a² + b² without taking the square root."],
          [Math.abs(b - a), "This subtracts the legs."],
          [round3(Math.sqrt(Math.abs(b * b - a * a))), "This subtracts the squares, which finds a missing leg rather than the hypotenuse."],
          [c + 1, "This exceeds the hypotenuse; the squares would not balance."],
          [c - 1, "This falls short of the hypotenuse."],
        ],
        why: `${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, and √${c * c} = ${c}.`,
        steps: [
          "Square both legs.",
          "Add the squares.",
          "Take the square root to get the hypotenuse.",
        ],
        principles: ["a² + b² = c², with c the side opposite the right angle."],
        hint: "The hypotenuse is longer than either leg but shorter than their sum.",
        verification: { kind: "pythagorean", inputs: [a, b], expected: c },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const scale = 2 + (s % 4);
      const small = 3 + (s % 6);
      const smallOther = 4 + (s % 5);
      const large = small * scale;
      const answer = smallOther * scale;
      return {
        family: "similar-triangle-missing-side",
        stem: pose(variant, "quantityOf", {
          description: `the side corresponding to ${smallOther} when similar triangles pair ${small} with ${large}`,
        }),
        answer,
        wrong: [
          [smallOther + (large - small), "This adds the difference between corresponding sides; similarity scales by a ratio, not a constant."],
          [smallOther, "This leaves the side unscaled."],
          [round3(smallOther / scale), "This divides by the scale factor, shrinking instead of enlarging."],
          [large, "This repeats the given corresponding side."],
          [small * smallOther, "This multiplies the two sides of the small triangle."],
          [answer + scale, "This scales correctly and then adds the scale factor again."],
        ],
        why: `The scale factor is ${large}/${small} = ${scale}. Multiplying the other side by it gives ${smallOther} · ${scale} = ${answer}.`,
        steps: [
          "Find the scale factor from the pair of corresponding sides you know.",
          "Multiply the other known side by that factor.",
          "Check that the ratios of corresponding sides agree.",
        ],
        principles: ["Similar figures have proportional corresponding sides."],
        hint: "Similarity multiplies lengths by a constant ratio; it does not add a constant.",
        trap: "Adding the difference between corresponding sides rather than scaling.",
        verification: { kind: "product", inputs: [smallOther, scale], expected: answer },
      };
    },
    (s, variant) => {
      const base = 6 + 2 * (s % 8);
      const height = 5 + (s % 9);
      const answer = (base * height) / 2;
      return {
        family: "triangle-area-from-base-and-height",
        stem: pose(variant, "quantityOf", {
          description: `the area of a triangle with base ${base} and corresponding height ${height}`,
        }),
        answer,
        wrong: [
          [base * height, "This is the area of a rectangle with those dimensions; a triangle is half of it."],
          [base + height, "This adds the dimensions instead of multiplying them."],
          [round3((base + height) / 2), "This averages the dimensions."],
          [round3(base * height / 4), "This halves twice."],
          [2 * base * height, "This doubles the rectangle's area."],
          [answer + base, "This adds the base to the area."],
        ],
        why: `Area = ½·base·height = ½ · ${base} · ${height} = ${answer}.`,
        steps: [
          "Multiply the base by the height.",
          "Halve the product.",
          "Confirm the height is measured perpendicular to the chosen base.",
        ],
        principles: ["A triangle's area is half the area of the rectangle sharing its base and height."],
        hint: "Do not forget the factor of one half.",
        verification: quotientCheck(base * height, 2, answer),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const known = 4 + (s % 7);
      const other = known + 3 + (s % 6);
      const low = other - known;
      const high = other + known;
      const answer = high - low - 1;
      return {
        family: "triangle-inequality-count",
        stem: pose(variant, "quantityOf", {
          description: `the number of integer third-side lengths possible with triangle sides ${known} and ${other}`,
        }),
        answer,
        wrong: [
          [answer + 1, "This counts one of the endpoints, where the three sides would lie flat instead of forming a triangle."],
          [answer + 2, "This counts both endpoints, neither of which gives a genuine triangle."],
          [high, "This is the strict upper bound, not a count of the values below it."],
          [low, "This is the strict lower bound."],
          [known + other, "This adds the two sides, which is the upper bound rather than a count."],
          [round3(answer / 2), "This halves the count."],
        ],
        why: `The third side x must satisfy ${other} − ${known} < x < ${other} + ${known}, that is ${low} < x < ${high}. The integers strictly between are ${low + 1} through ${high - 1}, which is ${answer} values.`,
        steps: [
          "Apply the triangle inequality to get a strict upper and lower bound.",
          "List the integers strictly between the bounds.",
          "Exclude both endpoints, where the triangle degenerates into a segment.",
        ],
        principles: ["The third side of a triangle lies strictly between the difference and the sum of the other two."],
        hint: "Both bounds are strict; a side equal to the sum gives a flat figure, not a triangle.",
        trap: "Including the endpoints and overcounting by one or two.",
        verification: { kind: "sum", inputs: [high, -low, -1], expected: answer },
      };
    },
    (s, variant) => {
      const leg = 3 + (s % 8);
      const answer = round3(leg * Math.sqrt(2));
      return {
        family: "isosceles-right-triangle-hypotenuse",
        stem: pose(variant, "quantityOf", {
          description: `the hypotenuse of an isosceles right triangle with leg length ${leg}`,
        }),
        answer: radical(leg, 2),
        wrong: [
          [2 * leg, "This doubles the leg; the hypotenuse of an isosceles right triangle is the leg times √2, which is less than double."],
          [radical(leg, 3), "The ratio √3 belongs to a 30°–60°–90° triangle, not a 45°–45°–90° one."],
          [leg * leg * 2, "This stops at the sum of the squared legs without taking the root."],
          [round3(leg / Math.sqrt(2)), "This divides by √2 instead of multiplying."],
          [leg, "The hypotenuse is longer than either leg."],
        ],
        why: `By the Pythagorean theorem the hypotenuse is √(${leg}² + ${leg}²) = √(2·${leg * leg}) = ${leg}√2 ≈ ${answer}.`,
        steps: [
          "Apply a² + b² = c² with both legs equal.",
          "Factor the 2 out of the radical.",
          "Report the exact value leg·√2.",
        ],
        principles: ["A 45°–45°–90° triangle has sides in the ratio 1 : 1 : √2."],
        hint: "The two special right triangles have ratios 1 : 1 : √2 and 1 : √3 : 2.",
        trap: "Using the 30°–60°–90° ratio, or doubling the leg.",
      };
    },
  ],
};

SHAPES["circles"] = {
  Easy: [
    (s, variant) => {
      const radius = 3 + (s % 10);
      return {
        family: "circle-area-in-terms-of-pi",
        stem: pose(variant, "quantityOf", {
          description: `the area in terms of π of a circle with radius ${radius}`,
        }),
        answer: pi(radius * radius),
        wrong: [
          [pi(2 * radius), "This is the circumference, which uses 2πr rather than πr²."],
          [pi(radius), "This multiplies π by the radius once instead of by its square."],
          [pi(4 * radius * radius), "This uses the diameter in place of the radius inside the square."],
          [pi(radius * radius * radius), "This cubes the radius, which measures volume rather than area."],
          [pi(radius + radius), "This adds the radius to itself instead of squaring it."],
        ],
        why: `Area = πr² = π(${radius})² = ${radius * radius}π.`,
        steps: [
          "Square the radius.",
          "Multiply by π.",
          "Keep π in the answer rather than approximating.",
        ],
        principles: ["A circle of radius r has area πr² and circumference 2πr."],
        hint: "Square the radius before multiplying by π.",
        trap: "Confusing the area formula with the circumference formula.",
        verification: { kind: "circle-area-coefficient", inputs: [radius], expected: radius * radius },
      };
    },
    (s, variant) => {
      const radius = 2 + (s % 11);
      return {
        family: "circumference-from-radius",
        stem: pose(variant, "quantityOf", {
          description: `the circumference in terms of π of a circle with radius ${radius}`,
        }),
        answer: pi(2 * radius),
        wrong: [
          [pi(radius * radius), "This is the area, πr², not the circumference."],
          [pi(radius), "This uses r rather than 2r."],
          [pi(4 * radius), "This doubles the diameter."],
          [pi(radius / 2), "This halves the radius instead of doubling it."],
          [pi(2 * radius * radius), "This mixes the two formulas."],
        ],
        why: `Circumference = 2πr = 2π(${radius}) = ${2 * radius}π.`,
        steps: [
          "Double the radius to get the diameter.",
          "Multiply by π.",
          "Leave the answer in terms of π.",
        ],
        principles: ["Circumference is π times the diameter, or 2πr."],
        hint: "Circumference is linear in the radius; area is quadratic.",
        verification: { kind: "product", inputs: [2, radius], expected: 2 * radius },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const radius = 4 + (s % 8);
      const degreesArc = 30 * (1 + (s % 6));
      const answer = round3((degreesArc / 360) * 2 * radius);
      return {
        family: "arc-length-fraction-of-circumference",
        stem: pose(variant, "quantityOf", {
          description: `the arc length in terms of π for a ${degreesArc}° central angle in a circle of radius ${radius}`,
        }),
        answer: pi(answer),
        wrong: [
          [pi(round3((degreesArc / 360) * radius * radius)), "This computes the sector's area rather than its arc length."],
          [pi(2 * radius), "This is the whole circumference, ignoring the fraction of the circle."],
          [pi(round3(degreesArc / 360)), "This is the fraction of the circle alone, without multiplying by the circumference."],
          [pi(round3((degreesArc / 180) * radius)), "This uses 180° as a full rotation."],
          [pi(round3(answer / 2)), "This halves the arc length."],
        ],
        why: `The arc is ${degreesArc}/360 of the circle. The circumference is ${2 * radius}π, so the arc is (${degreesArc}/360)(${2 * radius}π) = ${answer}π.`,
        steps: [
          "Write the central angle as a fraction of 360°.",
          "Compute the full circumference 2πr.",
          "Multiply the fraction by the circumference.",
        ],
        principles: ["Arc length is the same fraction of the circumference as the central angle is of 360°."],
        hint: "An arc is a piece of the circumference, so start from 2πr.",
        trap: "Using the area formula, which gives a sector rather than an arc.",
      };
    },
    (s, variant) => {
      const radius = 3 + (s % 9);
      const degreesArc = 30 * (1 + (s % 6));
      const answer = round3((degreesArc / 360) * radius * radius);
      return {
        family: "sector-area-fraction-of-circle",
        stem: pose(variant, "quantityOf", {
          description: `the area in terms of π of a ${degreesArc}° sector in a circle of radius ${radius}`,
        }),
        answer: pi(answer),
        wrong: [
          [pi(round3((degreesArc / 360) * 2 * radius)), "This is the arc length, not the sector's area."],
          [pi(radius * radius), "This is the whole circle's area, ignoring the fraction."],
          [pi(round3(degreesArc / 360)), "This is the fraction of the circle alone."],
          [pi(round3((degreesArc / 180) * radius * radius)), "This treats 180° as a full rotation."],
          [pi(round3(answer * 2)), "This doubles the sector's area."],
        ],
        why: `The sector is ${degreesArc}/360 of the circle. The circle's area is ${radius * radius}π, so the sector is (${degreesArc}/360)(${radius * radius}π) = ${answer}π.`,
        steps: [
          "Express the central angle as a fraction of 360°.",
          "Compute the whole circle's area πr².",
          "Multiply the fraction by that area.",
        ],
        principles: ["A sector's area is the same fraction of πr² as its angle is of 360°."],
        hint: "Start from the area of the whole circle, not its circumference.",
        trap: "Computing the arc length instead of the sector area.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const centerX = 1 + (s % 7);
      const centerY = 2 + (s % 6);
      // Stepped off a different modulus than centerY: sharing s % 6 made the
      // radius equal the centre's y-coordinate for every sequence, so the
      // "that is the centre" distractor collapsed onto the key.
      // Held clear of the centre coordinates and their sum as well: at
      // sequences where the radius collided with any of them the "that is the
      // centre" distractors folded onto the key and the item lost its choices.
      const radius = 15 + ((s + 2) % 5);
      const constant = radius * radius - centerX * centerX - centerY * centerY;
      const rightSide = radius * radius;
      return {
        family: "circle-equation-completing-the-square",
        stem: choose(variant, [
          `The equation x² + y² ${MINUS} ${2 * centerX}x ${MINUS} ${2 * centerY}y = ${num(constant)} describes a circle. What is its radius?`,
          `A circle has equation x² + y² ${MINUS} ${2 * centerX}x ${MINUS} ${2 * centerY}y = ${num(constant)}. What is the radius?`,
          `Find the radius of the circle x² + y² ${MINUS} ${2 * centerX}x ${MINUS} ${2 * centerY}y = ${num(constant)}.`,
          `The circle given by x² + y² ${MINUS} ${2 * centerX}x ${MINUS} ${2 * centerY}y = ${num(constant)} has which radius?`,
        ]),
        answer: radius,
        wrong: [
          [rightSide, "This is r², the value after completing the square, not r itself."],
          [round3(Math.sqrt(Math.abs(constant))), "This takes the root of the constant on the right before completing the square."],
          [centerX, "This is the x-coordinate of the centre."],
          [centerY, "This is the y-coordinate of the centre."],
          [2 * radius, "This is the diameter."],
          [centerX + centerY, "This adds the centre's coordinates."],
        ],
        why: `Completing the square gives (x − ${centerX})² + (y − ${centerY})² = ${constant} + ${centerX * centerX} + ${centerY * centerY} = ${rightSide}. So r² = ${rightSide} and r = ${radius}.`,
        steps: [
          "Group the x terms and the y terms.",
          "Complete the square in each variable, adding the same amounts to the right side.",
          "Read r² from the right side and take its square root.",
        ],
        principles: ["(x − h)² + (y − k)² = r² has centre (h, k) and radius r."],
        hint: "Half of each linear coefficient, squared, is what you add to both sides.",
        trap: "Reporting r² instead of r.",
        // Recovers r from r², rather than restating the square.
        verification: { kind: "linear-equation", inputs: [radius, 0, rightSide], expected: radius },
      };
    },
    (s, variant) => {
      const inscribed = 20 + 5 * (s % 10);
      const answer = 2 * inscribed;
      return {
        family: "inscribed-angle-theorem",
        stem: pose(variant, "quantityOf", {
          description: `the central angle subtending the same arc as an inscribed angle of ${inscribed}°`,
        }),
        answer: degrees(answer),
        wrong: [
          [degrees(inscribed), "The inscribed angle is half the central angle, so the two are not equal."],
          [degrees(round3(inscribed / 2)), "This halves again; the inscribed angle is already the half."],
          [degrees(180 - inscribed), "This supplements the inscribed angle instead of doubling it."],
          [degrees(360 - answer), "This is the rest of the circle, the arc not intercepted."],
          [degrees(90 - inscribed < 0 ? inscribed - 90 : 90 - inscribed), "This uses a complementary relationship that does not apply."],
        ],
        why: `An inscribed angle is half the central angle on the same arc, so the central angle is 2 · ${inscribed}° = ${answer}°.`,
        steps: [
          "Identify which angle has its vertex at the centre and which on the circle.",
          "The inscribed angle is half the central angle.",
          "Double the inscribed angle.",
        ],
        principles: ["An inscribed angle equals half the central angle subtending the same arc."],
        hint: "The vertex on the circle gives the smaller angle.",
        trap: "Halving instead of doubling.",
        verification: { kind: "product", inputs: [2, inscribed], expected: answer },
      };
    },
  ],
};

SHAPES["coordinate geometry"] = {
  Easy: [
    (s, variant) => {
      const x1 = 1 + (s % 6);
      const y1 = 2 + (s % 7);
      const x2 = x1 + 2 * (1 + (s % 4));
      const y2 = y1 + 2 * (1 + (s % 3));
      const answer = (x1 + x2) / 2;
      return {
        family: "midpoint-x-coordinate",
        stem: pose(variant, "quantityOf", {
          description: `the x-coordinate of the midpoint between (${x1}, ${y1}) and (${x2}, ${y2})`,
        }),
        answer,
        wrong: [
          [x2 - x1, "This is the horizontal distance, not the midpoint."],
          [x1 + x2, "This adds the coordinates without halving."],
          [round3((y1 + y2) / 2), "This averages the y-coordinates instead of the x-coordinates."],
          [x1, "This is the first endpoint's x-coordinate."],
          [x2, "This is the second endpoint's x-coordinate."],
          [round3((x2 - x1) / 2), "This halves the horizontal distance rather than averaging the positions."],
        ],
        why: `The midpoint's x-coordinate is the average of the endpoints': (${x1} + ${x2})/2 = ${answer}.`,
        steps: [
          "Add the two x-coordinates.",
          "Divide by 2.",
          "Do the same separately for the y-coordinates if the full midpoint is needed.",
        ],
        principles: ["The midpoint of a segment averages the endpoints coordinatewise."],
        hint: "A midpoint is an average, not a difference.",
        verification: { kind: "midpoint-x", inputs: [x1, x2], expected: answer },
      };
    },
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      const x1 = 1 + (s % 5);
      const y1 = 2 + (s % 4);
      const x2 = x1 + a;
      const y2 = y1 + b;
      return {
        family: "distance-between-two-points",
        stem: pose(variant, "quantityOf", {
          description: `the distance between (${x1}, ${y1}) and (${x2}, ${y2})`,
        }),
        answer: c,
        wrong: [
          [a + b, "This adds the horizontal and vertical changes; the distance is the hypotenuse of that right triangle."],
          [a * a + b * b, "This stops before taking the square root."],
          [Math.abs(b - a), "This subtracts the two changes."],
          [round3((a + b) / 2), "This averages the two changes."],
          [c + 1, "This exceeds the true distance."],
          [c - 1, "This falls short of the true distance."],
        ],
        why: `The horizontal change is ${a} and the vertical change is ${b}, so the distance is √(${a}² + ${b}²) = √${c * c} = ${c}.`,
        steps: [
          "Subtract the x-coordinates and the y-coordinates.",
          "Square both differences and add them.",
          "Take the square root.",
        ],
        principles: ["The distance formula is the Pythagorean theorem applied to coordinate differences."],
        hint: "Draw the right triangle whose legs are the coordinate changes.",
        verification: { kind: "distance", inputs: [x1, y1, x2, y2], expected: c },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const numerator = 1 + (s % 5);
      const denominator = numerator + 1 + (s % 4);
      return {
        family: "perpendicular-slope",
        stem: pose(variant, "quantityOf", {
          description: `the slope perpendicular to ${numerator}/${denominator}`,
        }),
        answer: frac(-denominator, numerator),
        wrong: [
          [frac(denominator, numerator), "This is the reciprocal but omits the sign change."],
          [frac(-numerator, denominator), "This changes the sign but does not take the reciprocal."],
          [frac(numerator, denominator), "This repeats the original slope; parallel lines share a slope, perpendicular ones do not."],
          [frac(numerator, -denominator), "This negates the denominator, which gives the same value as negating the numerator, and still omits the reciprocal."],
          [frac(-1, numerator * denominator), "This inverts the product rather than the fraction itself."],
        ],
        why: `Perpendicular slopes are opposite reciprocals: the negative reciprocal of ${numerator}/${denominator} is ${MINUS}${denominator}/${numerator}. Their product is ${MINUS}1.`,
        steps: [
          "Invert the fraction.",
          "Change its sign.",
          "Check that the product of the two slopes is −1.",
        ],
        principles: ["Two non-vertical lines are perpendicular exactly when their slopes multiply to −1."],
        hint: "Both steps are needed: flip and negate.",
        trap: "Flipping without negating, or negating without flipping.",
      };
    },
    (s, variant) => {
      const slope = 2 + (s % 5);
      const intercept = 3 + (s % 8);
      const answer = round3(-intercept / slope);
      return {
        family: "x-intercept-of-a-line",
        stem: pose(variant, "quantityOf", {
          description: `the x-intercept of y = ${slope}x + ${intercept}`,
        }),
        answer: frac(-intercept, slope),
        wrong: [
          [frac(intercept, slope), "This drops the minus sign that comes from moving the constant across the equals sign."],
          [intercept, "This is the y-intercept, where x = 0, not where y = 0."],
          [slope, "This is the slope."],
          [frac(-slope, intercept), "This inverts the fraction."],
          [-intercept, "This negates the constant but never divides by the slope."],
        ],
        why: `Set y = 0: 0 = ${slope}x + ${intercept}, so ${slope}x = ${MINUS}${intercept} and x = ${MINUS}${intercept}/${slope}.`,
        steps: [
          "Substitute y = 0, since every point on the x-axis has y = 0.",
          "Solve the resulting linear equation for x.",
          "Simplify the fraction.",
        ],
        principles: ["The x-intercept is the solution of f(x) = 0."],
        hint: "Set y to zero, not x.",
        trap: "Reporting the y-intercept, which is the constant term.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const centerX = 1 + (s % 6);
      const centerY = 2 + (s % 5);
      const a = 2 + (s % 4);
      const b = a + 1 + (s % 3);
      return {
        family: "ellipse-major-axis",
        stem: pose(variant, "quantityOf", {
          description: `the major axis length of the ellipse (x ${MINUS} ${centerX})²/${a * a} + (y ${MINUS} ${centerY})²/${b * b} = 1`,
        }),
        answer: 2 * b,
        wrong: [
          [b, "This is the semi-major axis; the full axis is twice as long."],
          [2 * a, "This doubles the smaller denominator's root, giving the minor axis."],
          [a, "This is the semi-minor axis."],
          [b * b, "This is the denominator itself, not its square root doubled."],
          [2 * (a + b), "This adds both semi-axes before doubling."],
          [a + b, "This adds the two semi-axes."],
        ],
        why: `The larger denominator is ${b * b}, so the semi-major axis is √${b * b} = ${b} and the major axis is 2 · ${b} = ${2 * b}.`,
        steps: [
          "Identify the larger of the two denominators.",
          "Take its square root to get the semi-major axis.",
          "Double it for the full major axis.",
        ],
        principles: ["In (x − h)²/a² + (y − k)²/b² = 1, each axis has length twice the square root of its denominator."],
        hint: "The denominators are squares of the semi-axes, not the axes themselves.",
        trap: "Reporting the semi-axis, or the denominator without taking a root.",
        verification: { kind: "product", inputs: [2, b], expected: 2 * b },
      };
    },
    (s, variant) => {
      const x1 = 1 + (s % 5);
      const y1 = 1 + (s % 6);
      const x2 = x1 + 2 + (s % 4);
      const y2 = y1 + 2 + (s % 5);
      const answer = 2 * x2 - x1;
      return {
        family: "endpoint-from-midpoint",
        stem: pose(variant, "quantityOf", {
          description: `the missing endpoint's x-coordinate when (${x2}, ${y2}) is the midpoint between (${x1}, ${y1}) and (p, q)`,
        }),
        answer,
        wrong: [
          [round3((x1 + x2) / 2), "This averages the endpoint and the midpoint, which finds a quarter point rather than the far endpoint."],
          [x2 - x1, "This is the horizontal step from the endpoint to the midpoint, not the far endpoint's coordinate."],
          [x2, "This repeats the midpoint's x-coordinate."],
          [x1, "This repeats the known endpoint."],
          [x1 + x2, "This adds the two coordinates without doubling the midpoint."],
          [2 * x1 - x2, "This reverses the roles, extending backwards from the midpoint through the known endpoint."],
        ],
        why: `The midpoint satisfies (${x1} + p)/2 = ${x2}, so ${x1} + p = ${2 * x2} and p = ${2 * x2} − ${x1} = ${answer}.`,
        steps: [
          "Write the midpoint formula for the x-coordinates.",
          "Multiply both sides by 2.",
          "Subtract the known endpoint's coordinate.",
        ],
        principles: ["The midpoint is the average, so the far endpoint is twice the midpoint minus the near endpoint."],
        hint: "Double the midpoint before subtracting.",
        trap: "Averaging again instead of undoing the average.",
        verification: { kind: "sum", inputs: [2 * x2, -x1], expected: answer },
      };
    },
  ],
};

SHAPES["area"] = {
  Easy: [
    (s, variant) => {
      const width = 4 + (s % 9);
      const height = 5 + (s % 8);
      const answer = width * height;
      return {
        family: "rectangle-area",
        stem: pose(variant, "quantityOf", {
          description: `the area of a rectangle with side lengths ${width} and ${height}`,
        }),
        answer,
        wrong: [
          [2 * (width + height), "This is the perimeter, the distance around, not the area."],
          [width + height, "This adds the dimensions instead of multiplying them."],
          [round3(answer / 2), "This halves the product, which would give the area of a triangle with the same base and height."],
          [2 * answer, "This doubles the area."],
          [width * width, "This squares one dimension instead of using both."],
        ],
        why: `Area = length × width = ${width} × ${height} = ${answer}.`,
        steps: ["Identify the two perpendicular dimensions.", "Multiply them.", "Report the result in square units."],
        principles: ["A rectangle's area is the product of its two dimensions."],
        hint: "Area multiplies; perimeter adds.",
        verification: { kind: "product", inputs: [width, height], expected: answer },
      };
    },
    (s, variant) => {
      const first = 5 + (s % 7);
      const second = 8 + (s % 9);
      const height = 4 + (s % 6);
      const answer = ((first + second) / 2) * height;
      return {
        family: "trapezoid-area",
        stem: pose(variant, "quantityOf", {
          description: `the area of a trapezoid with bases ${first} and ${second} and height ${height}`,
        }),
        answer,
        wrong: [
          [(first + second) * height, "This omits the factor of one half; the trapezoid's area uses the average of the bases."],
          [first * second, "This multiplies the two bases, which is not a trapezoid formula."],
          [round3((first + second) / 2), "This is the average of the bases, before multiplying by the height."],
          [first * height, "This uses only one base, giving a parallelogram's area."],
          [round3(answer / 2), "This halves the area a second time."],
        ],
        why: `Area = ½(b₁ + b₂)h = ½(${first} + ${second})(${height}) = ${(first + second) / 2} · ${height} = ${answer}.`,
        steps: ["Average the two parallel sides.", "Multiply the average by the height.", "Confirm the height is perpendicular to both bases."],
        principles: ["A trapezoid's area is the average of its parallel sides times the height between them."],
        hint: "Average the bases first; the formula is a rectangle built on that average.",
        verification: { kind: "product", inputs: [(first + second) / 2, height], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const side = 8 + 2 * (s % 7);
      const radius = side / 2;
      const answer = round3(side * side - Math.PI * radius * radius);
      return {
        family: "shaded-region-circle-in-square",
        stem: pose(variant, "quantityOf", {
          description: `to the nearest hundredth, the area inside a square of side ${side} but outside its inscribed circle`,
        }),
        answer: round3(Math.round(answer * 100) / 100),
        wrong: [
          [round3(Math.round((Math.PI * radius * radius) * 100) / 100), "This is the circle's area, the part that was removed rather than what remains."],
          [side * side, "This is the whole square, with nothing subtracted."],
          [round3(Math.round((side * side - Math.PI * side * side) * 100) / 100), "This uses the side as the radius; the inscribed circle's radius is half the side."],
          [round3(Math.round((side * side - 2 * Math.PI * radius) * 100) / 100), "This subtracts the circumference, a length, from an area."],
          [round3(Math.round((side * side / 2) * 100) / 100), "This halves the square rather than removing a circle."],
        ],
        why: `The inscribed circle has radius ${radius}, so its area is π(${radius})² ≈ ${round3(Math.PI * radius * radius)}. Subtracting from the square's ${side * side} leaves about ${round3(Math.round(answer * 100) / 100)}.`,
        steps: [
          "Find the circle's radius: half the square's side.",
          "Compute both areas.",
          "Subtract the circle's area from the square's.",
        ],
        principles: ["A region between two shapes is the difference of their areas."],
        hint: "An inscribed circle's diameter equals the square's side.",
        trap: "Using the side length as the radius, which doubles the circle.",
      };
    },
    (s, variant) => {
      const scale = 2 + (s % 3);
      const baseArea = 6 + 3 * (s % 8);
      const answer = baseArea * scale * scale;
      return {
        family: "area-under-similarity-scaling",
        stem: pose(variant, "quantityOf", {
          description: `the new area when a figure of area ${baseArea} has every length multiplied by ${scale}`,
        }),
        answer,
        wrong: [
          [baseArea * scale, "This scales the area by the length ratio; area scales by the square of that ratio."],
          [baseArea + scale, "This adds the scale factor to the area."],
          [round3(baseArea / (scale * scale)), "This shrinks instead of enlarging."],
          [baseArea * scale * scale * scale, "This cubes the ratio, which is how volume scales, not area."],
          [baseArea, "The figure has been enlarged, so its area changes."],
        ],
        why: `Areas of similar figures scale by the square of the length ratio: ${baseArea} · ${scale}² = ${baseArea} · ${scale * scale} = ${answer}.`,
        steps: [
          "Identify the ratio of corresponding lengths.",
          "Square that ratio to get the area ratio.",
          "Multiply the original area by it.",
        ],
        principles: ["Lengths scale by k, areas by k², volumes by k³."],
        hint: "Area is two-dimensional, so the ratio is squared.",
        trap: "Scaling area by the length ratio itself.",
        verification: { kind: "product", inputs: [baseArea, scale * scale], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const side = 6 + 2 * (s % 6);
      const answer = round3((side * side * Math.sqrt(3)) / 4);
      return {
        family: "equilateral-triangle-area",
        stem: choose(variant, [
          `What is the area of an equilateral triangle with side length ${side}, in simplest radical form?`,
          `An equilateral triangle has sides of ${side}. What is its exact area?`,
          `Express the area of an equilateral triangle of side ${side} in radical form.`,
          `Find the exact area of an equilateral triangle whose side measures ${side}.`,
        ]),
        answer: radical((side * side) / 4, 3),
        wrong: [
          [radical((side * side) / 2, 3), "This halves rather than quarters; the height is (√3/2)s and the area takes another half."],
          [round3((side * side) / 2), "This omits the √3 that comes from the 30°–60°–90° height."],
          [radical(side * side, 3), "This drops the divisor 4 entirely."],
          [side * side, "This is the area of a square on the same side."],
          [radical(side / 4, 3), "This uses the side rather than its square."],
        ],
        why: `The height of an equilateral triangle is (√3/2)·${side}. The area is ½ · ${side} · (√3/2)·${side} = (${side}²√3)/4 = ${(side * side) / 4}√3 ≈ ${answer}.`,
        steps: [
          "Drop an altitude, splitting the triangle into two 30°–60°–90° triangles.",
          "The altitude is (√3/2) times the side.",
          "Apply ½·base·height and simplify.",
        ],
        principles: ["An equilateral triangle of side s has area (s²√3)/4."],
        hint: "The altitude is not half the side; it comes from the 30°–60°–90° ratio.",
        trap: "Treating the altitude as half the side, which drops the √3.",
      };
    },
    (s, variant) => {
      const outer = 8 + 2 * (s % 6);
      const inner = outer - 2 * (1 + (s % 3));
      const answer = outer * outer - inner * inner;
      return {
        family: "area-of-a-border",
        stem: `A square photograph of side ${inner} is centred on a square mat of side ${outer}. What is the area of the mat that remains visible around the photograph?`,
        answer,
        wrong: [
          [outer * outer, "This is the whole mat, without removing the photograph."],
          [inner * inner, "This is the photograph itself, not the visible border."],
          [(outer - inner) ** 2, "This squares the difference of the sides; the border is not a square of that width."],
          [4 * (outer - inner), "This is roughly a perimeter measurement, not an area."],
          [outer - inner, "This is the total difference in side length, a length rather than an area."],
        ],
        why: `The visible region is the difference of the two square areas: ${outer}² − ${inner}² = ${outer * outer} − ${inner * inner} = ${answer}.`,
        steps: [
          "Compute the area of the outer square.",
          "Compute the area of the inner square.",
          "Subtract to find the border.",
        ],
        principles: ["The area of a frame is the difference of the outer and inner areas, not the square of the difference of sides."],
        hint: "Subtract areas, not side lengths.",
        trap: "Squaring the difference of the sides, which ignores the corners.",
        verification: { kind: "sum", inputs: [outer * outer, -(inner * inner)], expected: answer },
      };
    },
  ],
};

SHAPES["surface area"] = {
  Easy: [
    (s, variant) => {
      const edge = 3 + (s % 9);
      const answer = 6 * edge * edge;
      return {
        family: "cube-surface-area",
        stem: choose(variant, [
          `What is the surface area of a cube with edge length ${edge}?`,
          `A cube has edges measuring ${edge}. What is its total surface area?`,
          `Find the surface area of a cube whose edge is ${edge}.`,
          `A cube of edge ${edge} has how much surface area?`,
        ]),
        answer,
        wrong: [
          [edge ** 3, "This is the volume, not the surface area."],
          [edge * edge, "This is the area of a single face; a cube has six."],
          [4 * edge * edge, "This counts four faces instead of six."],
          [12 * edge, "This is the total edge length, not an area."],
          [6 * edge, "This multiplies by six but never squares the edge."],
        ],
        why: `A cube has 6 congruent square faces, each of area ${edge}² = ${edge * edge}. The total is 6 · ${edge * edge} = ${answer}.`,
        steps: ["Find the area of one face.", "Count the faces: a cube has six.", "Multiply."],
        principles: ["A cube of edge e has surface area 6e² and volume e³."],
        hint: "Six faces, each a square.",
        trap: "Computing the volume instead.",
        verification: { kind: "product", inputs: [6, edge * edge], expected: answer },
      };
    },
    (s, variant) => {
      const length = 3 + (s % 6);
      const width = 4 + (s % 5);
      const height = 2 + (s % 7);
      const answer = 2 * (length * width + length * height + width * height);
      return {
        family: "rectangular-prism-surface-area",
        stem: choose(variant, [
          `A rectangular box measures ${length} by ${width} by ${height}. What is its surface area?`,
          `What is the total surface area of a rectangular prism with dimensions ${length}, ${width}, and ${height}?`,
          `A crate is ${length} by ${width} by ${height}. How much material covers its outside?`,
          `Find the surface area of a ${length} by ${width} by ${height} rectangular prism.`,
        ]),
        answer,
        wrong: [
          [length * width * height, "This is the volume."],
          [round3(answer / 2), "This counts each pair of faces only once."],
          [length * width + length * height + width * height, "This adds one of each face rather than both."],
          [2 * (length + width + height), "This doubles the sum of the edges, which is not an area."],
          [4 * (length + width + height), "This is closer to a total edge length than a surface area."],
        ],
        why: `Opposite faces are congruent, so the area is 2(lw + lh + wh) = 2(${length * width} + ${length * height} + ${width * height}) = ${answer}.`,
        steps: [
          "Compute the area of each of the three distinct faces.",
          "Add them.",
          "Double the total, since each face has an opposite twin.",
        ],
        principles: ["A rectangular prism has three pairs of congruent faces."],
        hint: "Three distinct faces, each appearing twice.",
        verification: { kind: "product", inputs: [2, length * width + length * height + width * height], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const radius = 2 + (s % 7);
      const height = 3 + (s % 8);
      const answer = 2 * radius * height + 2 * radius * radius;
      return {
        family: "cylinder-surface-area",
        stem: choose(variant, [
          `A closed cylinder has radius ${radius} and height ${height}. What is its surface area, in terms of π?`,
          `What is the total surface area of a cylinder of radius ${radius} and height ${height}, including both ends?`,
          `A sealed can has radius ${radius} and height ${height}. Express its surface area in terms of π.`,
          `Find the surface area of a closed cylinder with radius ${radius} and height ${height}.`,
        ]),
        answer: pi(answer),
        wrong: [
          [pi(2 * radius * height), "This is the curved side alone, without the two circular ends."],
          [pi(radius * radius * height), "This is the volume, not the surface area."],
          [pi(2 * radius * height + radius * radius), "This includes only one circular end."],
          [pi(2 * radius * radius), "This is the two ends alone, without the curved side."],
          [pi(2 * radius + 2 * height), "This adds lengths rather than areas."],
        ],
        why: `The curved surface is 2πrh = ${2 * radius * height}π and the two circles are 2πr² = ${2 * radius * radius}π. The total is ${answer}π.`,
        steps: [
          "Unroll the side into a rectangle of width 2πr and height h.",
          "Add the two circular ends, each πr².",
          "Combine into 2πrh + 2πr².",
        ],
        principles: ["A closed cylinder's surface area is 2πrh + 2πr²."],
        hint: "The side unrolls into a rectangle whose width is the circumference.",
        trap: "Forgetting the two ends, or including only one.",
        verification: { kind: "sum", inputs: [2 * radius * height, 2 * radius * radius], expected: answer },
      };
    },
    (s, variant) => {
      const radius = 2 + (s % 8);
      const answer = 4 * radius * radius;
      return {
        family: "sphere-surface-area",
        stem: choose(variant, [
          `What is the surface area of a sphere of radius ${radius}, in terms of π?`,
          `A sphere has radius ${radius}. Express its surface area in terms of π.`,
          `Find the surface area of a sphere whose radius is ${radius}.`,
          `The surface area of a sphere of radius ${radius} equals what?`,
        ]),
        answer: pi(answer),
        wrong: [
          [pi(round3((4 * radius ** 3) / 3)), "This is the volume formula, (4/3)πr³, not the surface area."],
          [pi(radius * radius), "This is the area of a great circle, one quarter of the sphere's surface."],
          [pi(2 * radius * radius), "This is half the correct surface area."],
          [pi(4 * radius), "This never squares the radius."],
          [pi(radius ** 3), "This cubes the radius, which measures volume."],
        ],
        why: `Surface area = 4πr² = 4π(${radius})² = ${answer}π.`,
        steps: ["Square the radius.", "Multiply by 4π.", "Keep π in the answer."],
        principles: ["A sphere has surface area 4πr² and volume (4/3)πr³."],
        hint: "The surface area is exactly four times the area of a great circle.",
        trap: "Reaching for the volume formula, which cubes the radius.",
        verification: { kind: "product", inputs: [4, radius * radius], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const radius = 3 + (s % 5);
      const slant = radius + 2 + (s % 6);
      const answer = radius * slant + radius * radius;
      return {
        family: "cone-surface-area",
        stem: choose(variant, [
          `A cone has radius ${radius} and slant height ${slant}. What is its total surface area, in terms of π?`,
          `What is the surface area of a closed cone with radius ${radius} and slant height ${slant}?`,
          `A cone of radius ${radius} has slant height ${slant}. Express its full surface area in terms of π.`,
          `Find the total surface area of a cone whose radius is ${radius} and slant height is ${slant}.`,
        ]),
        answer: pi(answer),
        wrong: [
          [pi(radius * slant), "This is the lateral surface alone, without the circular base."],
          [pi(radius * radius), "This is the base alone."],
          [pi(2 * radius * slant + radius * radius), "This doubles the lateral surface; the cone's lateral area is πrl, not 2πrl."],
          [pi(round3((radius * radius * slant) / 3)), "This resembles a volume formula and uses the slant height rather than the vertical height."],
          [pi(radius + slant), "This adds lengths instead of computing areas."],
        ],
        why: `The lateral surface is πrl = ${radius * slant}π and the base is πr² = ${radius * radius}π, giving ${answer}π in total.`,
        steps: [
          "Compute the lateral surface πrl using the slant height.",
          "Add the circular base πr².",
          "Combine the two π terms.",
        ],
        principles: ["A cone's surface area is πrl + πr², with l the slant height, not the vertical height."],
        hint: "The lateral formula uses the slant height, and it has no factor of 2.",
        trap: "Using 2πrl by analogy with the cylinder.",
        verification: { kind: "sum", inputs: [radius * slant, radius * radius], expected: answer },
      };
    },
    (s, variant) => {
      const scale = 2 + (s % 3);
      const base = 12 + 6 * (s % 6);
      const answer = base * scale * scale;
      return {
        family: "surface-area-under-scaling",
        stem: choose(variant, [
          `A solid has surface area ${base}. Every length is multiplied by ${scale}. What is the new surface area?`,
          `Scaling a solid so each dimension grows by a factor of ${scale} changes its surface area from ${base} to what?`,
          `Two similar solids have lengths in the ratio 1 : ${scale}. The smaller has surface area ${base}. What is the larger's?`,
          `If each dimension of a solid with surface area ${base} is multiplied by ${scale}, the surface area becomes what?`,
        ]),
        answer,
        wrong: [
          [base * scale, "This scales by the length ratio; surface area scales by its square."],
          [base * scale ** 3, "This cubes the ratio, which is how volume scales."],
          [round3(base / (scale * scale)), "This shrinks rather than enlarging."],
          [base + scale * scale, "This adds the squared ratio instead of multiplying by it."],
          [base, "The solid has changed size, so its surface area changes."],
        ],
        why: `Surface area is two-dimensional, so it scales by ${scale}² = ${scale * scale}: ${base} · ${scale * scale} = ${answer}.`,
        steps: [
          "Note that surface area is measured in square units.",
          "Square the length ratio.",
          "Multiply the original surface area by that square.",
        ],
        principles: ["Under a scale factor k, lengths scale by k, areas by k², volumes by k³."],
        hint: "Match the exponent to the dimension of the quantity.",
        trap: "Cubing the ratio, which belongs to volume.",
        verification: { kind: "product", inputs: [base, scale * scale], expected: answer },
      };
    },
  ],
};

SHAPES["volume"] = {
  Easy: [
    (s, variant) => {
      const length = 3 + (s % 7);
      const width = 4 + (s % 6);
      const height = 2 + (s % 8);
      const answer = length * width * height;
      return {
        family: "rectangular-prism-volume",
        stem: choose(variant, [
          `What is the volume of a rectangular box measuring ${length} by ${width} by ${height}?`,
          `A rectangular prism has dimensions ${length}, ${width}, and ${height}. What is its volume?`,
          `A container is ${length} by ${width} by ${height}. How much does it hold?`,
          `Find the volume of a ${length} by ${width} by ${height} rectangular prism.`,
        ]),
        answer,
        wrong: [
          [2 * (length * width + length * height + width * height), "This is the surface area, not the volume."],
          [length + width + height, "This adds the dimensions instead of multiplying them."],
          [length * width, "This is the area of the base, before multiplying by the height."],
          [4 * (length + width + height), "This totals the edges."],
          [round3(answer / 3), "This divides by 3, which belongs to pyramid and cone formulas."],
        ],
        why: `Volume = length × width × height = ${length} × ${width} × ${height} = ${answer}.`,
        steps: ["Find the area of the base.", "Multiply by the height.", "Report in cubic units."],
        principles: ["A prism's volume is the base area times the height."],
        hint: "Volume multiplies all three dimensions.",
        verification: { kind: "product", inputs: [length, width, height], expected: answer },
      };
    },
    (s, variant) => {
      const radius = 2 + (s % 6);
      const height = 3 + (s % 9);
      const answer = radius * radius * height;
      return {
        family: "cylinder-volume",
        stem: choose(variant, [
          `What is the volume of a cylinder with radius ${radius} and height ${height}, in terms of π?`,
          `A cylinder has radius ${radius} and height ${height}. Express its volume in terms of π.`,
          `Find the volume of a cylindrical tank of radius ${radius} and height ${height}.`,
          `A cylinder of radius ${radius} and height ${height} has what volume?`,
        ]),
        answer: pi(answer),
        wrong: [
          [pi(2 * radius * height + 2 * radius * radius), "This is the surface area, not the volume."],
          [pi(2 * radius * height), "This is the curved surface area."],
          [pi(radius * height), "This never squares the radius."],
          [pi(round3(answer / 3)), "This divides by 3, which applies to a cone rather than a cylinder."],
          [pi(radius * radius), "This is the base area, before multiplying by the height."],
        ],
        why: `Volume = πr²h = π(${radius})²(${height}) = ${answer}π.`,
        steps: ["Compute the circular base area πr².", "Multiply by the height.", "Leave π in the answer."],
        principles: ["A cylinder's volume is its base area times its height."],
        hint: "Square the radius, then multiply by the height.",
        verification: { kind: "product", inputs: [radius * radius, height], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const radius = 3 + (s % 6);
      const height = 3 * (1 + (s % 5));
      const answer = (radius * radius * height) / 3;
      return {
        family: "cone-volume",
        stem: choose(variant, [
          `What is the volume of a cone with radius ${radius} and height ${height}, in terms of π?`,
          `A cone has radius ${radius} and vertical height ${height}. Express its volume in terms of π.`,
          `Find the volume of a conical funnel of radius ${radius} and height ${height}.`,
          `A cone of radius ${radius} and height ${height} holds what volume?`,
        ]),
        answer: pi(answer),
        wrong: [
          [pi(radius * radius * height), "This is the volume of a cylinder with the same base and height; a cone is one third of it."],
          [pi(round3((radius * height) / 3)), "This never squares the radius."],
          [pi(round3(answer / 3)), "This divides by 3 twice."],
          [pi(round3((radius * radius * height) / 2)), "This halves rather than taking a third."],
          [pi(radius * radius), "This is the base area alone."],
        ],
        why: `Volume = ⅓πr²h = ⅓π(${radius * radius})(${height}) = ${answer}π.`,
        steps: ["Compute the base area πr².", "Multiply by the height.", "Take one third of the result."],
        principles: ["A cone occupies one third of the cylinder with the same base and height."],
        hint: "Cones and pyramids carry a factor of one third.",
        trap: "Omitting the one third and reporting the cylinder's volume.",
        verification: quotientCheck(radius * radius * height, 3, answer),
      };
    },
    (s, variant) => {
      const length = 4 + (s % 6);
      const width = 3 + (s % 5);
      const depth = 2 + (s % 4);
      const rise = 1 + (s % 3);
      const answer = length * width * rise;
      return {
        family: "displacement-volume",
        stem: `A rectangular tank with a ${length} by ${width} base holds water ${depth} units deep. A stone is lowered in and the water rises by ${rise} units without overflowing. What is the volume of the stone?`,
        answer,
        wrong: [
          [length * width * depth, "This is the original volume of water, not the displaced amount."],
          [length * width * (depth + rise), "This is the total volume after the stone is added, including the water."],
          [length * width, "This is the base area, before multiplying by the rise."],
          [rise, "This is the rise in level, a length rather than a volume."],
          [length * width * depth + rise, "This adds the rise to a volume instead of multiplying it by the base."],
        ],
        why: `The stone displaces exactly the water that accounts for the rise: ${length} × ${width} × ${rise} = ${answer} cubic units.`,
        steps: [
          "Recognise that a submerged object displaces its own volume.",
          "Multiply the base area by the rise in water level.",
          "Ignore the original depth, which does not change the displaced amount.",
        ],
        principles: ["A fully submerged object displaces a volume of water equal to its own."],
        hint: "Only the change in level matters, not the starting depth.",
        trap: "Using the total depth rather than the rise.",
        verification: { kind: "product", inputs: [length * width, rise], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const radius = 3 * (1 + (s % 4));
      const answer = (4 * radius ** 3) / 3;
      return {
        family: "sphere-volume",
        stem: choose(variant, [
          `What is the volume of a sphere of radius ${radius}, in terms of π?`,
          `A sphere has radius ${radius}. Express its volume in terms of π.`,
          `Find the volume of a spherical tank of radius ${radius}.`,
          `The volume of a sphere whose radius is ${radius} equals what?`,
        ]),
        answer: pi(answer),
        wrong: [
          [pi(4 * radius * radius), "This is the surface area, 4πr², not the volume."],
          [pi(radius ** 3), "This omits the factor 4/3."],
          [pi(round3((4 * radius * radius) / 3)), "This squares the radius where the volume formula cubes it."],
          [pi(round3((radius ** 3) / 3)), "This includes the third but drops the factor of 4."],
          [pi(4 * radius ** 3), "This omits the division by 3."],
        ],
        why: `Volume = (4/3)πr³ = (4/3)π(${radius ** 3}) = ${answer}π.`,
        steps: ["Cube the radius.", "Multiply by 4.", "Divide by 3."],
        principles: ["A sphere of radius r has volume (4/3)πr³ and surface area 4πr²."],
        hint: "Volume cubes the radius; surface area squares it.",
        trap: "Confusing the two sphere formulas.",
        verification: quotientCheck(4 * radius ** 3, 3, answer),
      };
    },
    (s, variant) => {
      const scale = 2 + (s % 3);
      const base = 12 + 6 * (s % 5);
      const answer = base * scale ** 3;
      return {
        family: "volume-under-scaling",
        stem: choose(variant, [
          `A solid of volume ${base} is enlarged so that every length is multiplied by ${scale}. What is the new volume?`,
          `Two similar solids have lengths in the ratio 1 : ${scale}. If the smaller has volume ${base}, what is the larger's volume?`,
          `Scaling every dimension of a solid with volume ${base} by ${scale} produces what volume?`,
          `If each length of a solid with volume ${base} grows by a factor of ${scale}, the volume becomes what?`,
        ]),
        answer,
        wrong: [
          [base * scale, "This scales by the length ratio; volume scales by its cube."],
          [base * scale * scale, "This squares the ratio, which is how area scales."],
          [round3(base / (scale ** 3)), "This shrinks instead of enlarging."],
          [base + scale ** 3, "This adds the cubed ratio rather than multiplying by it."],
          [base, "The solid has changed size, so its volume changes."],
        ],
        why: `Volume is three-dimensional, so it scales by ${scale}³ = ${scale ** 3}: ${base} · ${scale ** 3} = ${answer}.`,
        steps: [
          "Note that volume is measured in cubic units.",
          "Cube the length ratio.",
          "Multiply the original volume by that cube.",
        ],
        principles: ["Under a scale factor k, volumes scale by k³."],
        hint: "The exponent matches the number of dimensions.",
        trap: "Squaring the ratio, which belongs to surface area.",
        verification: { kind: "product", inputs: [base, scale ** 3], expected: answer },
      };
    },
  ],
};

SHAPES["right-triangle trigonometry"] = {
  Easy: [
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      return {
        family: "sine-ratio-from-sides",
        stem: choose(variant, [
          `In a right triangle, the side opposite angle A measures ${a} and the hypotenuse measures ${c}. What is sin A?`,
          `A right triangle has hypotenuse ${c} and a side of ${a} opposite angle A. What is the value of sin A?`,
          `If the leg opposite angle A is ${a} and the hypotenuse is ${c}, sin A equals what?`,
          `What is sin A in a right triangle whose hypotenuse is ${c} and whose side opposite A is ${a}?`,
        ]),
        answer: frac(a, c),
        wrong: [
          [frac(b, c), "This is cos A, the adjacent side over the hypotenuse."],
          [frac(a, b), "This is tan A, the opposite side over the adjacent side."],
          [frac(c, a), "This inverts the ratio; sine is opposite over hypotenuse, not the reverse."],
          [frac(b, a), "This is the reciprocal of the tangent."],
          [frac(c, b), "This inverts the cosine."],
        ],
        why: `Sine is opposite over hypotenuse: sin A = ${a}/${c}.`,
        steps: [
          "Identify the side opposite the angle.",
          "Identify the hypotenuse, opposite the right angle.",
          "Form the ratio opposite/hypotenuse.",
        ],
        principles: ["SOH: sine = opposite / hypotenuse."],
        hint: "The hypotenuse always goes in the denominator for sine and cosine.",
        verification: { kind: "probability", inputs: [a, c], expected: a / c },
      };
    },
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      return {
        family: "tangent-ratio-from-sides",
        stem: choose(variant, [
          `In a right triangle, the leg opposite angle B measures ${b} and the leg adjacent to B measures ${a}. What is tan B?`,
          `A right triangle has legs ${a} and ${b}, with ${b} opposite angle B. What is the value of tan B?`,
          `If the side opposite angle B is ${b} and the adjacent side is ${a}, tan B equals what?`,
          `What is tan B when the opposite leg measures ${b} and the adjacent leg measures ${a}?`,
        ]),
        answer: frac(b, a),
        wrong: [
          [frac(a, b), "This inverts the ratio, giving the tangent of the other acute angle."],
          [frac(b, c), "This is sin B, which uses the hypotenuse rather than the adjacent leg."],
          [frac(a, c), "This is cos B."],
          [frac(c, b), "This inverts the sine."],
          [frac(c, a), "This inverts the cosine."],
        ],
        why: `Tangent is opposite over adjacent: tan B = ${b}/${a}. The hypotenuse ${c} plays no part.`,
        steps: [
          "Identify the leg opposite the angle.",
          "Identify the leg adjacent to it, excluding the hypotenuse.",
          "Form the ratio opposite/adjacent.",
        ],
        principles: ["TOA: tangent = opposite / adjacent, with no hypotenuse involved."],
        hint: "Tangent never uses the hypotenuse.",
        trap: "Slipping the hypotenuse into a tangent ratio.",
        verification: { kind: "probability", inputs: [b, a], expected: b / a },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const angle = choose(s, [30, 45, 60]);
      const hypotenuse = 2 * (3 + (s % 6));
      const exact = {
        30: { value: hypotenuse / 2, text: num(hypotenuse / 2) },
        45: { value: (hypotenuse * Math.sqrt(2)) / 2, text: radical(hypotenuse / 2, 2).text },
        60: { value: (hypotenuse * Math.sqrt(3)) / 2, text: radical(hypotenuse / 2, 3).text },
      }[angle];
      return {
        family: "special-angle-opposite-side",
        stem: choose(variant, [
          `A right triangle has a hypotenuse of ${hypotenuse} and an acute angle of ${angle}°. What is the length of the side opposite that angle?`,
          `In a right triangle with hypotenuse ${hypotenuse}, one acute angle measures ${angle}°. How long is the opposite leg?`,
          `The hypotenuse of a right triangle is ${hypotenuse} and one angle is ${angle}°. Find the side opposite the ${angle}° angle.`,
          `What is the leg opposite a ${angle}° angle in a right triangle whose hypotenuse is ${hypotenuse}?`,
        ]),
        answer: val(exact.text, exact.value),
        wrong: [
          [hypotenuse, "This is the hypotenuse itself; a leg is always shorter."],
          [val(radical(hypotenuse / 2, angle === 60 ? 2 : 3).text, (hypotenuse / 2) * Math.sqrt(angle === 60 ? 2 : 3)), "This uses the wrong special-triangle ratio for this angle."],
          [round3(hypotenuse / 3), "This divides by 3, which is not one of the special-triangle ratios."],
          [2 * hypotenuse, "This doubles the hypotenuse; the opposite leg is shorter than the hypotenuse."],
          [round3(hypotenuse / 4), "This quarters the hypotenuse, which no right-triangle ratio produces."],
        ],
        why: `The opposite side is hypotenuse · sin ${angle}° = ${hypotenuse} · ${angle === 30 ? "½" : angle === 45 ? "√2/2" : "√3/2"} = ${exact.text}.`,
        steps: [
          "Choose the ratio linking the opposite side to the hypotenuse, which is sine.",
          `Use the exact value of sin ${angle}°.`,
          "Multiply by the hypotenuse.",
        ],
        principles: ["sin 30° = ½, sin 45° = √2/2, sin 60° = √3/2."],
        hint: "Sine relates the opposite side to the hypotenuse.",
        trap: "Swapping the 30° and 60° ratios.",
      };
    },
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      const answer = round3((Math.atan(b / a) * 180) / Math.PI);
      return {
        family: "angle-from-tangent",
        stem: `A ramp rises ${b} units over a horizontal run of ${a} units. To the nearest tenth of a degree, what angle does the ramp make with the horizontal?`,
        answer: degrees(round3(Math.round(answer * 10) / 10)),
        wrong: [
          [degrees(round3(Math.round(((Math.atan(a / b) * 180) / Math.PI) * 10) / 10)), "This inverts the ratio, finding the angle at the top of the ramp instead of at the ground."],
          [degrees(round3(Math.round(((Math.asin(b / a > 1 ? a / b : b / a) * 180) / Math.PI) * 10) / 10)), "This uses sine, which needs the hypotenuse rather than the horizontal run."],
          [degrees(round3(b / a)), "This is the slope itself, not an angle in degrees."],
          [degrees(90), "A ramp with a finite run is not vertical."],
          [degrees(45), "The rise and run are unequal, so the angle is not 45°."],
        ],
        why: `The rise is opposite the angle and the run is adjacent, so tan θ = ${b}/${a}. Then θ = arctan(${round3(b / a)}) ≈ ${round3(Math.round(answer * 10) / 10)}°.`,
        steps: [
          "Identify rise as opposite and run as adjacent.",
          "Use tangent, which relates exactly those two sides.",
          "Apply the inverse tangent and convert to degrees.",
        ],
        principles: ["An inverse trigonometric function recovers an angle from a ratio of sides."],
        hint: "Rise over run is a tangent, not a sine.",
        trap: "Reporting the slope instead of the angle.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const distance = 20 + 10 * (s % 8);
      // 45° is excluded deliberately: tan 45° = 1 collapses "forgot the eye
      // height", "inverted the tangent", and "ignored the angle" onto the same
      // number, leaving too few distinct distractors.
      const angle = choose(s, [30, 60]);
      const eye = 5 + (s % 3);
      const factor = { 30: 1 / Math.sqrt(3), 60: Math.sqrt(3) }[angle];
      const answer = round3(distance * factor + eye);
      return {
        family: "angle-of-elevation-with-eye-height",
        stem: `An observer whose eyes are ${eye} feet above the ground stands ${distance} feet from the base of a tower. The angle of elevation to the top of the tower is ${angle}°. To the nearest tenth of a foot, how tall is the tower?`,
        answer: round3(Math.round(answer * 10) / 10),
        wrong: [
          [round3(Math.round(distance * factor * 10) / 10), `This finds the height above eye level but never adds the observer's ${eye} feet.`],
          [round3(Math.round((distance / factor + eye) * 10) / 10), "This inverts the tangent, using adjacent over opposite."],
          [round3(Math.round((distance + eye) * 10) / 10), "This adds the distance to the eye height without using the angle at all."],
          [round3(Math.round((distance * factor - eye) * 10) / 10), "This subtracts the eye height instead of adding it."],
          [distance, "This is the horizontal distance, not a height."],
        ],
        why: `The height above eye level is ${distance}·tan ${angle}° ≈ ${round3(distance * factor)} feet. Adding the observer's eye height of ${eye} feet gives about ${round3(Math.round(answer * 10) / 10)} feet.`,
        steps: [
          "Draw the right triangle from the observer's eye to the top of the tower.",
          "Use tangent with the horizontal distance as the adjacent side.",
          "Add the eye height, because the triangle starts above the ground.",
        ],
        principles: ["An angle of elevation is measured from the observer's eye, so the eye height must be added back."],
        hint: "The triangle's base sits at eye level, not at ground level.",
        trap: "Forgetting to add the observer's height, which understates the tower.",
      };
    },
    (s, variant) => {
      const a = 5 + (s % 6);
      const b = a + 2 + (s % 5);
      const angle = choose(s, [30, 60, 90, 120]);
      const cosine = { 30: Math.sqrt(3) / 2, 60: 0.5, 90: 0, 120: -0.5 }[angle];
      const answer = round3(Math.sqrt(a * a + b * b - 2 * a * b * cosine));
      return {
        family: "law-of-cosines-third-side",
        stem: `A triangle has sides of ${a} and ${b} with an included angle of ${angle}°. To the nearest hundredth, what is the length of the third side?`,
        answer: round3(Math.round(answer * 100) / 100),
        wrong: [
          [round3(Math.round(Math.sqrt(a * a + b * b) * 100) / 100), "This applies the Pythagorean theorem, which is the law of cosines only when the included angle is 90°."],
          [round3(Math.round(Math.sqrt(a * a + b * b + 2 * a * b * cosine) * 100) / 100), "This adds the correction term instead of subtracting it."],
          [round3(Math.round((a + b) * 100) / 100), "This adds the two sides, which is the degenerate upper bound rather than a length."],
          [round3(Math.round(Math.abs(b - a) * 100) / 100), "This subtracts the sides, giving the strict lower bound."],
          [round3(Math.round((a * a + b * b - 2 * a * b * cosine) * 100) / 100), "This stops at c² without taking the square root."],
        ],
        why: `c² = ${a}² + ${b}² − 2(${a})(${b})cos ${angle}° = ${round3(a * a + b * b - 2 * a * b * cosine)}, so c ≈ ${round3(Math.round(answer * 100) / 100)}.`,
        steps: [
          "Write the law of cosines with the included angle.",
          "Substitute the exact cosine of the given angle.",
          "Evaluate and take the square root.",
        ],
        principles: ["c² = a² + b² − 2ab·cos C generalises the Pythagorean theorem to any included angle."],
        hint: "For an obtuse angle the cosine is negative, so the correction term increases the third side.",
        trap: "Using the Pythagorean theorem when the included angle is not a right angle.",
      };
    },
  ],
};

SHAPES["identities"] = {
  Easy: [
    (s, variant) => {
      const numerator = 3 + (s % 5);
      const denominator = numerator + 2 + (s % 4);
      return {
        family: "pythagorean-identity-basic",
        stem: choose(variant, [
          `If sin θ = ${numerator}/${denominator}, what is the value of sin²θ + cos²θ?`,
          `For any angle θ with sin θ = ${numerator}/${denominator}, the expression sin²θ + cos²θ equals what?`,
          `Given sin θ = ${numerator}/${denominator}, evaluate sin²θ + cos²θ.`,
          `What is sin²θ + cos²θ when sin θ = ${numerator}/${denominator}?`,
        ]),
        answer: 1,
        wrong: [
          [frac(numerator, denominator), "This repeats the given sine rather than applying the identity."],
          [0, "The identity gives 1, not 0; the two squares cannot cancel."],
          [frac(numerator * numerator, denominator * denominator), "This is sin²θ alone."],
          [2, "The identity totals exactly 1 for every angle."],
          [frac(denominator, numerator), "This inverts the given ratio rather than applying the identity."],
        ],
        why: `sin²θ + cos²θ = 1 holds for every angle θ, whatever the value of sin θ. The given ratio is a distraction.`,
        steps: [
          "Recognise the Pythagorean identity.",
          "Note that it holds for all θ, so no computation is needed.",
          "The value is 1.",
        ],
        principles: ["sin²θ + cos²θ = 1 for every angle."],
        hint: "The given value of sin θ is not needed.",
        trap: "Computing with the given ratio instead of recalling the identity.",
      };
    },
    (s, variant) => {
      const numerator = 3 + (s % 4);
      const denominator = numerator + 2 + (s % 5);
      return {
        family: "tangent-as-sine-over-cosine",
        stem: choose(variant, [
          `If sin θ = ${numerator}/${denominator} and cos θ = 1/${denominator}, what is tan θ?`,
          `Given sin θ = ${numerator}/${denominator} and cos θ = 1/${denominator}, evaluate tan θ.`,
          `For an angle with sin θ = ${numerator}/${denominator} and cos θ = 1/${denominator}, tan θ equals what?`,
          `What is tan θ when sin θ = ${numerator}/${denominator} and cos θ = 1/${denominator}?`,
        ]),
        answer: numerator,
        wrong: [
          [frac(1, numerator), "This is cot θ, the reciprocal of the tangent."],
          [frac(numerator, denominator * denominator), "This multiplies the two ratios instead of dividing them."],
          [frac(numerator + 1, denominator), "This adds the numerators rather than dividing the ratios."],
          [denominator, "This is the shared denominator, which cancels in the quotient."],
          [frac(numerator, denominator), "This repeats sin θ without dividing by cos θ."],
        ],
        why: `tan θ = sin θ/cos θ = (${numerator}/${denominator}) ÷ (1/${denominator}) = ${numerator}/${denominator} · ${denominator}/1 = ${numerator}.`,
        steps: [
          "Write tangent as sine divided by cosine.",
          "Divide by multiplying by the reciprocal.",
          "Cancel the common denominator.",
        ],
        principles: ["tan θ = sin θ / cos θ."],
        hint: "Dividing by 1/d is multiplying by d.",
        verification: quotientCheck(numerator / denominator, 1 / denominator, numerator),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      return {
        family: "cosine-from-sine-via-identity",
        stem: choose(variant, [
          `If sin θ = ${a}/${c} and θ is acute, what is cos θ?`,
          `An acute angle satisfies sin θ = ${a}/${c}. What is the value of cos θ?`,
          `Given that θ is acute and sin θ = ${a}/${c}, evaluate cos θ.`,
          `For an acute angle with sin θ = ${a}/${c}, cos θ equals what?`,
        ]),
        answer: frac(b, c),
        wrong: [
          [frac(a, c), "This repeats the sine."],
          [frac(-b, c), "The angle is acute, so its cosine is positive."],
          [frac(a, b), "This is tan θ."],
          [frac(c, b), "This inverts the cosine."],
          [frac(c - a, c), "This subtracts the numerators instead of using the identity."],
        ],
        why: `cos²θ = 1 − sin²θ = 1 − ${a * a}/${c * c} = ${c * c - a * a}/${c * c} = ${b * b}/${c * c}. Since θ is acute, cos θ = ${b}/${c}.`,
        steps: [
          "Apply sin²θ + cos²θ = 1.",
          "Subtract sin²θ from 1 and simplify.",
          "Take the positive square root, because the angle is acute.",
        ],
        principles: ["The Pythagorean identity determines cosine from sine up to sign; the quadrant fixes the sign."],
        hint: "Square, subtract from 1, then take the root.",
        trap: "Forgetting to square before subtracting, or choosing the negative root for an acute angle.",
        verification: { kind: "probability", inputs: [b, c], expected: b / c },
      };
    },
    (s, variant) => {
      const amplitude = 2 + (s % 6);
      const frequency = 2 + (s % 4);
      const answer = 360 / frequency;
      return {
        family: "period-of-a-sinusoid",
        stem: choose(variant, [
          `What is the period, in degrees, of y = ${amplitude} sin(${frequency}x)?`,
          `The function y = ${amplitude} sin(${frequency}x) repeats after how many degrees?`,
          `Find the period of y = ${amplitude} sin(${frequency}x), measured in degrees.`,
          `Over what interval in degrees does y = ${amplitude} sin(${frequency}x) complete one full cycle?`,
        ]),
        answer: degrees(answer),
        wrong: [
          [degrees(360), "This is the period of sin x; the coefficient inside compresses the graph."],
          [degrees(360 * frequency), "This multiplies by the frequency instead of dividing by it."],
          [degrees(amplitude), `${amplitude} is the amplitude, which stretches the graph vertically and does not affect the period.`],
          [degrees(round3(360 / amplitude)), "This divides by the amplitude rather than the coefficient of x."],
          [degrees(180), "A half period is not a full cycle for a sine function."],
        ],
        why: `For y = A sin(Bx) the period is 360°/B. Here B = ${frequency}, so the period is 360°/${frequency} = ${answer}°.`,
        steps: [
          "Identify the coefficient of x inside the sine.",
          "Divide 360° by that coefficient.",
          "Note that the amplitude does not affect the period.",
        ],
        principles: ["y = A sin(Bx) has amplitude |A| and period 360°/|B|."],
        hint: "Only the coefficient inside the function changes the period.",
        trap: "Using the amplitude, or multiplying instead of dividing.",
        verification: quotientCheck(360, frequency, answer),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const [a, b, c] = TRIPLES[s % TRIPLES.length];
      const answer = frac(2 * a * b, c * c);
      return {
        family: "double-angle-sine",
        stem: choose(variant, [
          `If sin θ = ${a}/${c} and cos θ = ${b}/${c}, what is sin 2θ?`,
          `Given sin θ = ${a}/${c} and cos θ = ${b}/${c}, evaluate sin 2θ.`,
          `For an angle with sin θ = ${a}/${c} and cos θ = ${b}/${c}, sin 2θ equals what?`,
          `What is sin 2θ when sin θ = ${a}/${c} and cos θ = ${b}/${c}?`,
        ]),
        answer,
        wrong: [
          [frac(2 * a, c), "This doubles the sine; sin 2θ is not 2 sin θ."],
          [frac(a * b, c * c), "This omits the factor of 2 in the double-angle formula."],
          [frac(b * b - a * a, c * c), "This is cos 2θ, not sin 2θ."],
          [frac(a + b, c), "This adds the two ratios."],
          [frac(a, c), "This repeats sin θ."],
        ],
        why: `sin 2θ = 2 sin θ cos θ = 2(${a}/${c})(${b}/${c}) = ${2 * a * b}/${c * c}.`,
        steps: [
          "Recall the double-angle identity for sine.",
          "Substitute the given sine and cosine.",
          "Multiply and simplify.",
        ],
        principles: ["sin 2θ = 2 sin θ cos θ; doubling an angle is not doubling its sine."],
        hint: "The identity needs both the sine and the cosine.",
        trap: "Writing sin 2θ as 2 sin θ.",
        verification: { kind: "probability", inputs: [2 * a * b, c * c], expected: (2 * a * b) / (c * c) },
      };
    },
    (s, variant) => {
      const solutions = choose(s, [
        { value: 30, other: 150 },
        { value: 45, other: 135 },
        { value: 60, other: 120 },
      ]);
      const sineText = { 30: "1/2", 45: "√2/2", 60: "√3/2" }[solutions.value];
      return {
        family: "solve-trig-equation-on-an-interval",
        stem: choose(variant, [
          `How many solutions does sin θ = ${sineText} have for 0° ≤ θ < 360°?`,
          `On the interval 0° ≤ θ < 360°, the equation sin θ = ${sineText} has how many solutions?`,
          `Find the number of angles θ with 0° ≤ θ < 360° satisfying sin θ = ${sineText}.`,
          `For 0° ≤ θ < 360°, how many values of θ satisfy sin θ = ${sineText}?`,
        ]),
        answer: 2,
        wrong: [
          [1, `Only ${solutions.value}° is found by the inverse sine, but ${solutions.other}° has the same sine.`],
          [4, "Sine takes each value strictly between −1 and 1 exactly twice per revolution, not four times."],
          [0, `The value ${sineText} lies between 0 and 1, so solutions exist.`],
          [3, "An odd count would require the value to be attained at a maximum or minimum, which happens only at sin θ = ±1."],
          [solutions.value, "This is one of the solutions in degrees, not the number of solutions."],
        ],
        why: `Sine is positive in the first and second quadrants, so θ = ${solutions.value}° and θ = 180° − ${solutions.value}° = ${solutions.other}° both work. That is 2 solutions in one revolution.`,
        steps: [
          "Find the reference angle with the inverse sine.",
          "Determine which quadrants give the required sign.",
          "Count one solution in each such quadrant.",
        ],
        principles: ["Within one revolution, sin θ = k has two solutions for −1 < k < 1, except at the extremes."],
        hint: "The calculator returns only one angle; the unit circle supplies the other.",
        trap: "Reporting only the angle the inverse sine gives.",
      };
    },
  ],
};

SHAPES["center and spread"] = {
  Easy: [
    (s, variant) => {
      const values = [3 + (s % 5), 6 + (s % 4), 9 + (s % 6), 12 + (s % 3), 15 + (s % 7)];
      const total = values.reduce((sum, value) => sum + value, 0);
      const answer = total / values.length;
      return {
        family: "mean-of-a-list",
        stem: choose(variant, [
          `What is the mean of ${values.join(", ")}?`,
          `Find the average of the five values ${values.join(", ")}.`,
          `The numbers ${values.join(", ")} have what mean?`,
          `Compute the arithmetic mean of ${values.join(", ")}.`,
        ]),
        answer: round3(answer),
        wrong: [
          [values.slice().sort((a, b) => a - b)[2], "This is the median, the middle value, not the mean."],
          [total, "This is the sum, before dividing by how many values there are."],
          [round3(total / (values.length - 1)), "This divides by one fewer than the number of values."],
          [Math.max(...values) - Math.min(...values), "This is the range, a measure of spread rather than centre."],
          [Math.max(...values), "This is the largest value."],
          [Math.min(...values), "This is the smallest value."],
        ],
        why: `The five values sum to ${total}, and ${total}/5 = ${round3(answer)}.`,
        steps: ["Add all the values.", "Count how many there are.", "Divide the sum by the count."],
        principles: ["The mean is the total divided by the number of values."],
        hint: "Divide by 5, the number of values, not by 4.",
        verification: { kind: "mean", inputs: values, expected: answer },
      };
    },
    (s, variant) => {
      const values = [4 + (s % 6), 7 + (s % 5), 11 + (s % 4), 14 + (s % 7), 19 + (s % 3)];
      const sorted = values.slice().sort((a, b) => a - b);
      const answer = sorted[2];
      return {
        family: "median-of-a-list",
        stem: choose(variant, [
          `What is the median of ${values.join(", ")}?`,
          `Find the median of the five values ${values.join(", ")}.`,
          `The numbers ${values.join(", ")} have what median?`,
          `Which value is the median of ${values.join(", ")}?`,
        ]),
        answer,
        wrong: [
          [round3(values.reduce((sum, value) => sum + value, 0) / values.length), "This is the mean, not the middle value."],
          [sorted[0], "This is the smallest value."],
          [sorted[4], "This is the largest value."],
          [sorted[4] - sorted[0], "This is the range."],
          [sorted[1], "This is the second-smallest value, not the middle one."],
          [sorted[3], "This is the fourth value in order, one place past the middle."],
        ],
        why: `Ordered, the values are ${sorted.join(", ")}. With five values the median is the third, which is ${answer}.`,
        steps: ["Sort the values from least to greatest.", "Find the middle position.", "Read the value there."],
        principles: ["The median is the middle value of an ordered list."],
        hint: "Sort first; the list as given is not in order.",
        trap: "Reading the middle of the unsorted list.",
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const count = 4 + (s % 4);
      const currentMean = 6 + (s % 7);
      const targetMean = currentMean + 1 + (s % 3);
      const currentTotal = count * currentMean;
      const answer = (count + 1) * targetMean - currentTotal;
      return {
        family: "value-needed-to-reach-a-target-mean",
        stem: `A student's ${count} quiz scores average ${currentMean}. What score on the next quiz would raise the average of all ${count + 1} quizzes to ${targetMean}?`,
        answer,
        wrong: [
          [targetMean, "This is the target average itself; one score must pull the whole set up, so it exceeds the target."],
          [targetMean + (targetMean - currentMean), "This adds only one gap; the new score must make up the gap for every existing quiz as well."],
          [currentTotal, "This is the current total of all scores."],
          [(count + 1) * targetMean, "This is the required total across all quizzes, not the single new score."],
          [targetMean - currentMean, "This is the change in the average, not a score."],
          [answer + count, "This overshoots the required score."],
        ],
        why: `The ${count + 1} quizzes must total ${count + 1} · ${targetMean} = ${(count + 1) * targetMean}. The existing ones total ${count} · ${currentMean} = ${currentTotal}, so the new score must be ${answer}.`,
        steps: [
          "Compute the current total from the count and the current mean.",
          "Compute the required total for the new count and target mean.",
          "Subtract to find the missing score.",
        ],
        principles: ["Work with totals, not averages: a mean question becomes a subtraction once both totals are known."],
        hint: "Convert both averages into totals before comparing.",
        trap: "Answering with the target average, which would leave the mean unchanged.",
        verification: { kind: "sum", inputs: [(count + 1) * targetMean, -currentTotal], expected: answer },
      };
    },
    (s, variant) => {
      const groupA = 10 + 2 * (s % 6);
      const meanA = 70 + (s % 8);
      const groupB = 15 + 3 * (s % 5);
      const meanB = meanA + 5 + (s % 6);
      const answer = round3((groupA * meanA + groupB * meanB) / (groupA + groupB));
      return {
        family: "weighted-mean-of-two-groups",
        stem: `One class of ${groupA} students averaged ${meanA} on a test, while another class of ${groupB} students averaged ${meanB}. To the nearest hundredth, what is the mean score of all ${groupA + groupB} students combined?`,
        answer: round3(Math.round(answer * 100) / 100),
        wrong: [
          [round3((meanA + meanB) / 2), "This averages the two class means, which is only valid when the classes are the same size."],
          [meanA, "This is the first class's average alone."],
          [meanB, "This is the second class's average alone."],
          [round3(groupA * meanA + groupB * meanB), "This is the combined total of all scores, not the mean."],
          [round3(meanB - meanA), "This is the gap between the two class averages."],
          [round3((groupA * meanA + groupB * meanB) / 2), "This divides the combined total by 2 rather than by the number of students."],
        ],
        why: `The combined total is ${groupA}·${meanA} + ${groupB}·${meanB} = ${groupA * meanA + groupB * meanB}, shared among ${groupA + groupB} students, giving about ${round3(Math.round(answer * 100) / 100)}.`,
        steps: [
          "Convert each class's mean into a total.",
          "Add the totals and add the counts.",
          "Divide the combined total by the combined count.",
        ],
        principles: ["A combined mean weights each group by its size; averaging the averages is wrong unless the groups are equal."],
        hint: "The larger class pulls the combined mean toward its own average.",
        trap: "Averaging the two averages.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const base = 5 + (s % 6);
      const spread = 2 + (s % 4);
      const tight = [base, base, base + 1, base + 1, base + 2];
      const wide = [base - spread, base, base + 1, base + 2, base + spread + 2];
      return {
        family: "compare-standard-deviations",
        stem: `Data set P is ${tight.join(", ")} and data set Q is ${wide.join(", ")}. Which statement correctly compares their standard deviations?`,
        answer: "Q has the larger standard deviation because its values are spread farther from the mean.",
        wrong: [
          ["P has the larger standard deviation because it contains repeated values.", "Repeated values pull a set together rather than spreading it out, which lowers the standard deviation."],
          ["The two sets have equal standard deviations because each contains five values.", "Standard deviation measures spread, not how many values a set contains."],
          ["The two sets have equal standard deviations because their medians agree.", "Two sets can share a centre and still differ completely in spread."],
          ["Q has the smaller standard deviation because it contains the smallest value.", "Containing an extreme value increases spread rather than reducing it."],
          ["Neither set has a standard deviation because the values repeat.", "Standard deviation is defined for any list of numbers, repeats included."],
        ],
        why: `Both sets are centred near ${base + 1}, but P's values all lie within 2 of each other while Q reaches from ${base - spread} to ${base + spread + 2}. Greater distance from the mean means a larger standard deviation.`,
        steps: [
          "Locate the centre of each set.",
          "Compare how far the values sit from that centre.",
          "The set whose values are farther from the mean has the larger standard deviation.",
        ],
        principles: ["Standard deviation measures typical distance from the mean, not the count or the centre."],
        hint: "Compare the ranges before computing anything.",
        trap: "Assuming equal-sized sets, or sets with the same centre, must have equal spread.",
      };
    },
    (s, variant) => {
      const values = [2 + (s % 4), 5 + (s % 5), 8 + (s % 3), 11 + (s % 6)];
      const addition = 20 + (s % 9);
      const oldMean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const newMean = (values.reduce((sum, value) => sum + value, 0) + addition) / (values.length + 1);
      const answer = round3(newMean - oldMean);
      return {
        family: "effect-of-an-outlier-on-the-mean",
        stem: `The values ${values.join(", ")} have a mean of ${round3(oldMean)}. A fifth value, ${addition}, is added to the set. By how much does the mean increase?`,
        answer: round3(Math.round(answer * 1000) / 1000),
        wrong: [
          [round3(addition - oldMean), "This is how far the new value sits above the old mean; the mean moves only a fifth of that distance."],
          [addition, "This is the new value itself, not the shift in the mean."],
          [round3(newMean), "This is the new mean, not the increase."],
          [round3(oldMean), "This is the original mean."],
          [round3(addition / values.length), "This divides the new value by the old count rather than measuring the shift."],
          [round3(answer * 2), "This doubles the actual increase."],
        ],
        why: `The new mean is (${values.reduce((sum, value) => sum + value, 0)} + ${addition})/5 = ${round3(newMean)}. The increase is ${round3(newMean)} − ${round3(oldMean)} = ${round3(Math.round(answer * 1000) / 1000)}.`,
        steps: [
          "Compute the original total and mean.",
          "Add the new value and divide by the new count.",
          "Subtract the old mean from the new one.",
        ],
        principles: ["Adding a value above the mean raises it, but only by the excess divided among all the values."],
        hint: "The mean moves far less than the distance of the new value from it.",
        trap: "Reporting the new mean, or the gap between the new value and the old mean.",
      };
    },
  ],
};

SHAPES["data displays"] = {
  Easy: [
    (s, variant) => {
      const categories = ["Monday", "Tuesday", "Wednesday", "Thursday"];
      const counts = [12 + (s % 7), 18 + (s % 5), 9 + (s % 6), 15 + (s % 4)];
      const maxIndex = counts.indexOf(Math.max(...counts));
      const answer = counts[maxIndex];
      return {
        family: "read-maximum-from-a-table",
        stimulus: {
          type: "table",
          content: `A library recorded the number of study rooms booked each day.\n\nday | rooms booked\n${categories.map((name, index) => `${name} | ${counts[index]}`).join("\n")}`,
        },
        stem: choose(variant, [
          "According to the table, how many rooms were booked on the busiest day?",
          "What is the greatest number of rooms booked on any single day shown?",
          "On the day with the most bookings, how many rooms were booked?",
          "The table's largest daily booking count is which number?",
        ]),
        answer,
        wrong: [
          [Math.min(...counts), "This is the smallest daily count, not the largest."],
          [counts.reduce((sum, value) => sum + value, 0), "This is the total across all four days."],
          [round3(counts.reduce((sum, value) => sum + value, 0) / counts.length), "This is the daily average."],
          [Math.max(...counts) - Math.min(...counts), "This is the range between the busiest and quietest days."],
          [maxIndex + 1, "This is the position of the busiest day in the table, not its count."],
        ],
        why: `The four counts are ${counts.join(", ")}. The largest is ${answer}, recorded on ${categories[maxIndex]}.`,
        steps: ["Read every value in the count column.", "Compare them.", "Report the largest count, not the day it fell on."],
        principles: ["A table question is answered by reading the requested cell, not by computing with the whole column."],
        hint: "The question asks for a count, not a day or a total.",
      };
    },
    (s, variant) => {
      const counts = [8 + (s % 5), 14 + (s % 6), 11 + (s % 4), 17 + (s % 7)];
      const total = counts.reduce((sum, value) => sum + value, 0);
      const answer = total;
      return {
        family: "total-from-a-table",
        stimulus: {
          type: "table",
          content: `A repair café logged the items brought in over four weeks.\n\nweek | items\n${counts.map((value, index) => `Week ${index + 1} | ${value}`).join("\n")}`,
        },
        stem: choose(variant, [
          "According to the table, how many items were brought in over the four weeks?",
          "What is the total number of items recorded in the table?",
          "Across all four weeks, how many items were brought in altogether?",
          "The table records how many items in total?",
        ]),
        answer,
        wrong: [
          [Math.max(...counts), "This is the busiest single week."],
          [round3(total / counts.length), "This is the weekly average, not the total."],
          [Math.min(...counts), "This is the quietest single week."],
          [Math.max(...counts) - Math.min(...counts), "This is the range across the weeks."],
          [total - Math.min(...counts), "This omits the smallest week from the total."],
        ],
        why: `Adding the four weekly counts gives ${counts.join(" + ")} = ${answer}.`,
        steps: ["Read each week's count.", "Add them all.", "Confirm every row has been included."],
        principles: ["A total requires every row, not just the extremes."],
        hint: "Add all four rows.",
        verification: { kind: "sum", inputs: counts, expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const q1 = 12 + (s % 5);
      const median = q1 + 4 + (s % 4);
      const q3 = median + 5 + (s % 3);
      const answer = q3 - q1;
      return {
        family: "interquartile-range-from-a-box-plot",
        stimulus: {
          type: "diagram",
          content: `A box plot of daily bicycle counts has these five-number summary values.\n\nstatistic | value\nminimum | ${q1 - 6}\nfirst quartile | ${q1}\nmedian | ${median}\nthird quartile | ${q3}\nmaximum | ${q3 + 8}`,
        },
        stem: choose(variant, [
          "What is the interquartile range of the data shown?",
          "According to the summary, what is the interquartile range?",
          "The interquartile range of this distribution equals what?",
          "Using the five-number summary, find the interquartile range.",
        ]),
        answer,
        wrong: [
          [q3 + 8 - (q1 - 6), "This is the full range, from minimum to maximum, not the middle 50%."],
          [median, "This is the median, a measure of centre rather than spread."],
          [q3 - median, "This is only the upper half of the interquartile range."],
          [median - q1, "This is only the lower half of the interquartile range."],
          [q3, "This is the third quartile alone."],
          [q1, "This is the first quartile alone."],
        ],
        why: `The interquartile range is Q₃ − Q₁ = ${q3} − ${q1} = ${answer}. It spans the middle half of the data and ignores the extremes.`,
        steps: [
          "Locate the first and third quartiles in the summary.",
          "Subtract the first quartile from the third.",
          "Ignore the minimum and maximum, which describe the full range.",
        ],
        principles: ["The interquartile range measures the spread of the middle 50% of the data."],
        hint: "The interquartile range never uses the minimum or the maximum.",
        trap: "Computing the full range instead.",
        verification: { kind: "sum", inputs: [q3, -q1], expected: answer },
      };
    },
    (s, variant) => {
      const rows = [
        { label: "1", frequency: 3 + (s % 3) },
        { label: "2", frequency: 5 + (s % 4) },
        { label: "3", frequency: 8 + (s % 5) },
        { label: "4", frequency: 2 + (s % 3) },
      ];
      const total = rows.reduce((sum, row) => sum + row.frequency, 0);
      const answer = round3(
        rows.reduce((sum, row) => sum + Number(row.label) * row.frequency, 0) / total,
      );
      return {
        family: "mean-from-a-frequency-table",
        stimulus: {
          type: "table",
          content: `A survey recorded how many pets each household keeps.\n\npets | households\n${rows.map((row) => `${row.label} | ${row.frequency}`).join("\n")}`,
        },
        stem: choose(variant, [
          "To the nearest hundredth, what is the mean number of pets per household?",
          "According to the table, what is the average number of pets per household, to the nearest hundredth?",
          "What is the mean of the pet counts, weighted by the number of households, to the nearest hundredth?",
          "Find the average number of pets per household to the nearest hundredth.",
        ]),
        answer: round3(Math.round(answer * 100) / 100),
        wrong: [
          [round3(Math.round((rows.reduce((sum, row) => sum + Number(row.label), 0) / rows.length) * 100) / 100), "This averages the pet counts 1 through 4 without weighting by how many households reported each."],
          [total, "This is the number of households surveyed."],
          [round3(Math.round((total / rows.length) * 100) / 100), "This averages the household counts rather than the pet counts."],
          [round3(rows.reduce((sum, row) => sum + Number(row.label) * row.frequency, 0)), "This is the total number of pets, before dividing by the households."],
          [3, "This is the most common pet count, the mode rather than the mean."],
        ],
        why: `The total number of pets is ${rows.map((row) => `${row.label}·${row.frequency}`).join(" + ")} = ${rows.reduce((sum, row) => sum + Number(row.label) * row.frequency, 0)}, spread over ${total} households, giving about ${round3(Math.round(answer * 100) / 100)}.`,
        steps: [
          "Multiply each value by its frequency.",
          "Add those products to get the overall total.",
          "Divide by the total frequency, not by the number of rows.",
        ],
        principles: ["In a frequency table each value counts as many times as its frequency says."],
        hint: "Four rows does not mean four data points.",
        trap: "Averaging the row labels and ignoring the frequencies.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      // Disjoint ranges for the four cells: where two of them coincided the
      // wrong-denominator and wrong-numerator distractors printed the same
      // fraction as the key.
      const bothYes = 12 + (s % 6);
      const yesNo = 4 + (s % 5);
      const noYes = 20 + (s % 4);
      const bothNo = 30 + (s % 7);
      const rowTotal = bothYes + yesNo;
      const answer = frac(bothYes, rowTotal);
      return {
        family: "conditional-proportion-from-two-way-table",
        stimulus: {
          type: "table",
          content: `Students were asked whether they cycle to school and whether they own a helmet.\n\n | owns a helmet | no helmet\ncycles | ${bothYes} | ${yesNo}\ndoes not cycle | ${noYes} | ${bothNo}`,
        },
        stem: choose(variant, [
          "Among the students who cycle to school, what fraction own a helmet?",
          "What proportion of the cycling students own a helmet?",
          "Of the students who cycle, what fraction also own a helmet?",
          "Restricted to students who cycle, what fraction own a helmet?",
        ]),
        answer,
        wrong: [
          [frac(bothYes, bothYes + yesNo + noYes + bothNo), "This divides by every student surveyed; the question restricts attention to those who cycle."],
          [frac(bothYes, bothYes + noYes), "This divides by all helmet owners, conditioning on the wrong variable."],
          [frac(yesNo, rowTotal), "This is the fraction of cyclists without a helmet."],
          [frac(rowTotal, bothYes + yesNo + noYes + bothNo), "This is the fraction of all students who cycle."],
          [frac(bothYes + noYes, bothYes + yesNo + noYes + bothNo), "This is the fraction of all students who own a helmet."],
        ],
        why: `${rowTotal} students cycle, of whom ${bothYes} own a helmet. The conditional fraction is ${bothYes}/${rowTotal}.`,
        steps: [
          "Identify the row the condition selects: students who cycle.",
          "Use that row's total as the denominator.",
          "Put the count meeting both conditions on top.",
        ],
        principles: ["A conditional proportion uses the conditioning group as its denominator, not the whole table."],
        hint: "The phrase \"among the students who cycle\" fixes the denominator.",
        trap: "Dividing by the grand total instead of the row total.",
        verification: { kind: "probability", inputs: [bothYes, rowTotal], expected: bothYes / rowTotal },
      };
    },
    (s, variant) => {
      const frequencies = [4 + (s % 3), 6 + (s % 4), 9 + (s % 5), 5 + (s % 3)];
      const values = [10, 20, 30, 40];
      const total = frequencies.reduce((sum, value) => sum + value, 0);
      const half = total / 2;
      let running = 0;
      let answer = values[0];
      for (let index = 0; index < values.length; index += 1) {
        running += frequencies[index];
        if (running >= half) {
          answer = values[index];
          break;
        }
      }
      return {
        family: "median-class-from-a-histogram",
        stimulus: {
          type: "diagram",
          content: `A histogram of commute times has these bar heights.\n\ncommute (minutes) | commuters\n${values.map((value, index) => `${value} | ${frequencies[index]}`).join("\n")}`,
        },
        stem: choose(variant, [
          "Which commute time is the median for this group of commuters?",
          "According to the histogram, the median commute time is which value?",
          "What is the median commute time recorded in the histogram?",
          "Reading the histogram, which commute time falls at the median?",
        ]),
        answer,
        wrong: [
          [values[frequencies.indexOf(Math.max(...frequencies))] === answer ? values[values.length - 1] : values[frequencies.indexOf(Math.max(...frequencies))], "This is the tallest bar, which gives the mode rather than the median."],
          [total, "This is the number of commuters, not a commute time."],
          [round3(values.reduce((sum, value) => sum + value, 0) / values.length), "This averages the four labels and ignores how many commuters each represents."],
          [Math.max(...frequencies), "This is a bar height, not a commute time."],
          [values[0], "The running total has not yet reached half the commuters at this bar."],
        ],
        why: `There are ${total} commuters, so the median sits at position ${round3(half)}. Accumulating the bars ${frequencies.join(", ")} reaches that position within the ${answer}-minute bar.`,
        steps: [
          "Add the bar heights to find the total number of data points.",
          "Halve that total to locate the median's position.",
          "Accumulate the bars left to right until the running total reaches that position.",
        ],
        principles: ["A histogram's median is found by cumulative frequency, not by the tallest bar."],
        hint: "The tallest bar gives the mode; the median needs a running total.",
        trap: "Reporting the tallest bar's value.",
      };
    },
  ],
};

SHAPES["regression"] = {
  Easy: [
    (s, variant) => {
      const slope = 2 + (s % 5);
      const intercept = 10 + (s % 8);
      const input = 3 + (s % 6);
      const answer = slope * input + intercept;
      return {
        family: "predict-from-line-of-best-fit",
        stem: `A line of best fit for a scatterplot is y = ${slope}x + ${intercept}. What value does it predict when x = ${input}?`,
        answer,
        wrong: [
          [slope * input, "This omits the intercept."],
          [intercept, "This is the prediction at x = 0."],
          [slope + intercept, "This uses x = 1 rather than the given value."],
          [(slope + intercept) * input, "This treats the intercept as part of the rate."],
          [slope * input - intercept, "This subtracts the intercept instead of adding it."],
          [answer + slope, "This advances one step too far along the line."],
        ],
        why: `Substituting x = ${input} gives y = ${slope}(${input}) + ${intercept} = ${answer}.`,
        steps: ["Substitute the given x-value.", "Multiply by the slope.", "Add the intercept."],
        principles: ["A regression line predicts by substitution, exactly like any linear function."],
        hint: "The intercept is added once, whatever x is.",
        verification: { kind: "sum", inputs: [slope * input, intercept], expected: answer },
      };
    },
    (s, variant) => {
      const slope = 3 + (s % 6);
      const intercept = 12 + (s % 9);
      return {
        family: "interpret-regression-slope",
        stem: `A line of best fit relating study hours x to test score y is y = ${slope}x + ${intercept}. Which statement best interprets the slope?`,
        answer: `Each additional hour of study is associated with an increase of about ${slope} points.`,
        wrong: [
          [`A student who does not study is predicted to score ${slope}.`, `That describes the intercept ${intercept}, not the slope.`],
          [`Each additional hour of study raises the score to ${slope} points.`, "The slope gives a change in score, not a final score."],
          [`Studying causes scores to rise by exactly ${slope} points.`, "A regression line describes association; observational data alone cannot establish causation or an exact effect."],
          [`Each additional point scored requires ${slope} more hours of study.`, "This reverses the roles of the variables."],
          [`The typical student studies ${slope} hours.`, "The slope is a rate of change, not a typical value of x."],
        ],
        why: `In y = mx + b the slope m is the predicted change in y for a one-unit increase in x. Here each extra hour is associated with about ${slope} more points; ${intercept} is the predicted score at zero hours.`,
        steps: [
          "Identify which quantity is x and which is y.",
          "Read the slope as a change in y per one-unit change in x.",
          "Phrase the relationship as association rather than proof of cause.",
        ],
        principles: ["A slope is a rate of change; a regression line shows association, not causation."],
        hint: "Slope answers \"per one more unit of x, how much does y change?\"",
        trap: "Interpreting the slope as a predicted score, or claiming causation.",
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const slope = 2 + (s % 4);
      const intercept = 8 + (s % 7);
      const input = 4 + (s % 5);
      const observed = slope * input + intercept + 3 + (s % 4);
      const predicted = slope * input + intercept;
      const answer = observed - predicted;
      return {
        family: "residual-from-a-regression-line",
        stem: `A line of best fit is y = ${slope}x + ${intercept}. An observed data point is (${input}, ${observed}). What is the residual at that point?`,
        answer,
        wrong: [
          [-answer, "The residual is observed minus predicted; this reverses the subtraction."],
          [predicted, "This is the predicted value, not the residual."],
          [observed, "This is the observed value."],
          [observed + predicted, "This adds the two values instead of subtracting."],
          [input, "This is the x-coordinate."],
          [answer + slope, "This overstates the gap by one slope step."],
        ],
        why: `The line predicts ${slope}(${input}) + ${intercept} = ${predicted}. The observed value is ${observed}, so the residual is ${observed} − ${predicted} = ${answer}.`,
        steps: [
          "Compute the predicted value at the given x.",
          "Subtract the predicted value from the observed value.",
          "A positive residual means the point lies above the line.",
        ],
        principles: ["Residual = observed − predicted; its sign says which side of the line the point falls on."],
        hint: "Subtract in the order observed minus predicted.",
        trap: "Reversing the subtraction and reporting the wrong sign.",
        verification: { kind: "sum", inputs: [observed, -predicted], expected: answer },
      };
    },
    (s, variant) => {
      const slope = 2 + (s % 5);
      const intercept = 30 + (s % 10);
      const maxObserved = 12 + (s % 6);
      const far = maxObserved + 30 + (s % 10);
      return {
        family: "extrapolation-caution",
        stem: `A regression line y = ${slope}x + ${intercept} was fitted to data with x-values ranging from 1 to ${maxObserved}. Why should a prediction at x = ${far} be treated with caution?`,
        answer: `x = ${far} lies far outside the range of the data used to fit the line, so the pattern may not continue there.`,
        wrong: [
          [`The slope ${slope} is too small to make predictions.`, "The size of the slope does not determine whether a prediction is trustworthy."],
          [`The line has a positive intercept, which makes all predictions invalid.`, "A positive intercept is ordinary and does not invalidate predictions."],
          [`Regression lines can only predict values of x, never values of y.`, "A regression line predicts y from x; that is its purpose."],
          [`The prediction is unreliable because ${far} is not a whole number of the observed values.`, "Predictions at non-observed x-values inside the data range are routine and reasonable."],
          [`A line of best fit is exact, so no caution is needed.`, "A line of best fit summarises a trend and carries error even inside the data range."],
        ],
        why: `A regression line summarises the relationship only over the x-values that were observed, here 1 to ${maxObserved}. At x = ${far} the model is extrapolating well beyond that evidence, and nothing in the data supports the trend continuing.`,
        steps: [
          "Compare the prediction's x-value with the range of the observed data.",
          "Note whether the prediction is inside that range or beyond it.",
          "Treat predictions far outside the range as unsupported.",
        ],
        principles: ["Extrapolation applies a model outside the data that justified it, so its accuracy is unknown."],
        hint: "Ask what range of x the data actually covered.",
        trap: "Judging a prediction by the size of the coefficients rather than by the data's range.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const shift = s % 4;
      const points = [
        [1 + shift, 4 + (s % 3)],
        [2 + shift, 7 + (s % 4)],
        [3 + shift, 9 + (s % 3)],
        [4 + shift, 13 + (s % 4)],
      ];
      const meanX = points.reduce((sum, [x]) => sum + x, 0) / points.length;
      const meanY = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
      const answer = round3(meanY);
      return {
        family: "regression-passes-through-the-means",
        stimulus: {
          type: "table",
          content: `Four observations were collected.\n\nx | y\n${points.map(([x, y]) => `${x} | ${y}`).join("\n")}`,
        },
        stem: choose(variant, [
          `The least-squares regression line for these data passes through the point (${round3(meanX)}, k). What is the value of k?`,
          `A least-squares line fitted to these four observations passes through (${round3(meanX)}, k). Which value is k?`,
          `For these data, the regression line contains the point (${round3(meanX)}, k). What does k equal?`,
          `The line of best fit for this table passes through (${round3(meanX)}, k). Find k.`,
        ]),
        answer,
        wrong: [
          [round3(meanX), "This is the mean of x, which is the first coordinate, not the second."],
          [points[points.length - 1][1], "This is the largest observed y-value."],
          [points[0][1], "This is the smallest observed y-value."],
          [round3(points.reduce((sum, [, y]) => sum + y, 0)), "This is the total of the y-values, before dividing by 4."],
          [round3(meanY - meanX), "This subtracts the two means."],
          [round3(meanY + 1), "This overshoots the mean of the y-values."],
        ],
        why: `Every least-squares line passes through (x̄, ȳ). Here ȳ = ${points.map(([, y]) => y).join(" + ")} over 4 = ${answer}, so k = ${answer}.`,
        steps: [
          "Recall that the regression line always passes through the point of means.",
          "Compute the mean of the y-values.",
          "That mean is the second coordinate.",
        ],
        principles: ["A least-squares line always passes through (x̄, ȳ), whatever the slope turns out to be."],
        hint: "You do not need the slope to answer this.",
        trap: "Computing the slope first, or reporting the mean of x.",
        verification: { kind: "mean", inputs: points.map(([, y]) => y), expected: meanY },
      };
    },
    (s, variant) => {
      const strong = 0.9 - 0.05 * (s % 3);
      const weak = 0.3 + 0.05 * (s % 4);
      return {
        family: "interpret-correlation-coefficient",
        stem: `Study A reports a correlation coefficient of ${round3(strong)} between two variables; Study B reports ${round3(weak)} between a different pair. Which conclusion is best supported?`,
        answer: "Study A's variables show a stronger linear association than Study B's.",
        wrong: [
          ["Study A's variables cause each other, while Study B's do not.", "A correlation coefficient measures association only; neither value establishes causation."],
          ["Study B found no relationship at all between its variables.", `A coefficient of ${round3(weak)} indicates a weak but non-zero linear association.`],
          ["Study A's variables must be related by a perfectly straight line.", "Only a coefficient of exactly 1 or −1 indicates a perfect linear relationship."],
          ["Study B's variables are negatively associated.", "Both coefficients are positive, so both associations run in the same direction."],
          ["The two studies measured the same variables with different accuracy.", "The studies examine different pairs of variables, so their coefficients are not competing measurements."],
        ],
        why: `A correlation coefficient nearer 1 in absolute value indicates a stronger linear association. ${round3(strong)} is closer to 1 than ${round3(weak)}, but neither value says anything about cause.`,
        steps: [
          "Compare the absolute values of the coefficients.",
          "The larger absolute value indicates the stronger linear association.",
          "Stop short of any causal claim.",
        ],
        principles: ["Correlation measures the strength and direction of a linear association, never causation."],
        hint: "Strength is about distance from zero; cause is not measured at all.",
        trap: "Reading a strong correlation as evidence of cause.",
      };
    },
  ],
};

SHAPES["counting"] = {
  Easy: [
    (s, variant) => {
      const first = 3 + (s % 5);
      const second = 4 + (s % 4);
      const third = 2 + (s % 3);
      const answer = first * second * third;
      return {
        family: "fundamental-counting-principle",
        stem: `A café offers ${first} breads, ${second} fillings, and ${third} spreads. How many different sandwiches can be made by choosing one of each?`,
        answer,
        wrong: [
          [first + second + third, "This adds the options; independent choices multiply."],
          [first * second, "This omits the spread choice."],
          [second * third, "This omits the bread choice."],
          [answer + first, "This adds an extra bread's worth of combinations."],
          [round3(answer / third), "This drops one of the three choices."],
        ],
        why: `Each of the ${first} breads pairs with each of the ${second} fillings and each of the ${third} spreads: ${first} × ${second} × ${third} = ${answer}.`,
        steps: ["Count the options at each independent stage.", "Multiply the counts.", "Check that the choices are genuinely independent."],
        principles: ["Independent successive choices multiply."],
        hint: "Multiply, do not add.",
        verification: { kind: "product", inputs: [first, second, third], expected: answer },
      };
    },
    (s, variant) => {
      const items = 4 + (s % 4);
      const answer = factorial(items);
      return {
        family: "arrangements-of-distinct-items",
        stem: choose(variant, [
          `In how many different orders can ${items} distinct books be arranged on a shelf?`,
          `How many arrangements are there of ${items} different books in a row?`,
          `${items} distinct posters are hung in a row. How many orderings are possible?`,
          `How many ways can ${items} distinct objects be placed in order?`,
        ]),
        answer,
        wrong: [
          [items * items, "This allows each position to repeat any item; the items are distinct and used once each."],
          [items, "This counts the items, not their arrangements."],
          [2 ** items, "This counts subsets rather than orderings."],
          [factorial(items - 1), "This arranges one fewer item."],
          [items * (items - 1), "This fills only the first two positions."],
        ],
        why: `The first position has ${items} choices, the next ${items - 1}, and so on: ${items}! = ${answer}.`,
        steps: [
          "Count the choices for the first position.",
          "Each later position has one fewer choice.",
          "Multiply all the way down to 1.",
        ],
        principles: ["n distinct items can be ordered in n! ways."],
        hint: "Each placement uses up one item.",
        verification: { kind: "product", inputs: Array.from({ length: items }, (unused, index) => index + 1), expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const n = 6 + (s % 4);
      const r = 2 + (s % 2);
      const answer = combinations(n, r);
      return {
        family: "combinations-choose-a-committee",
        stem: `A club has ${n} members. How many different committees of ${r} members can be formed?`,
        answer,
        wrong: [
          [permutations(n, r), "This counts ordered selections; a committee's members have no order, so each group is counted " + factorial(r) + " times."],
          [n * r, "This multiplies the two numbers rather than counting selections."],
          [factorial(n), "This orders all the members instead of choosing a subset."],
          [n - r, "This subtracts the committee size from the membership."],
          [combinations(n, r + 1), "This chooses one member too many."],
          [n, "This is the number of members."],
        ],
        why: `Order does not matter, so the count is C(${n}, ${r}) = ${permutations(n, r)}/${factorial(r)} = ${answer}.`,
        steps: [
          "Decide whether order matters; for a committee it does not.",
          `Count ordered selections: ${n} · ${n - 1}${r > 2 ? " · …" : ""} = ${permutations(n, r)}.`,
          `Divide by ${r}! to remove the orderings of the same group.`,
        ],
        principles: ["Combinations divide permutations by r! because order does not distinguish the selections."],
        hint: "A committee of A and B is the same as one of B and A.",
        trap: "Using permutations, which overcounts by a factor of r!.",
        verification: quotientCheck(permutations(n, r), factorial(r), answer),
      };
    },
    (s, variant) => {
      const n = 5 + (s % 4);
      const r = 3;
      const answer = permutations(n, r);
      return {
        family: "permutations-of-ranked-places",
        stem: `${n} runners finish a race with no ties. How many different orderings of first, second, and third place are possible?`,
        answer,
        wrong: [
          [combinations(n, r), "This ignores the ranking; first, second, and third are distinguishable positions."],
          [n * r, "This multiplies the counts rather than filling the places one at a time."],
          [factorial(n), "This orders every runner, not just the top three."],
          [n ** r, "This lets the same runner take more than one place."],
          [n, "This counts the runners."],
          [permutations(n, r + 1), "This fills a fourth place as well."],
        ],
        why: `First place has ${n} choices, second ${n - 1}, third ${n - 2}: ${n} · ${n - 1} · ${n - 2} = ${answer}.`,
        steps: [
          "Note that the three places are distinguishable, so order matters.",
          "Fill first place, then second, then third, each with one fewer runner available.",
          "Multiply the three counts.",
        ],
        principles: ["When order matters and repetition is barred, use permutations."],
        hint: "Finishing first is not the same as finishing third.",
        trap: "Treating the podium as an unordered group.",
        verification: { kind: "product", inputs: [n, n - 1, n - 2], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const total = 7 + (s % 3);
      const required = 2;
      const size = 4;
      const answer = combinations(total - required, size - required);
      return {
        family: "combinations-with-a-restriction",
        stem: choose(variant, [
          `From ${total} volunteers, a team of ${size} must be chosen, and ${required} particular volunteers must both be included. How many different teams are possible?`,
          `A team of ${size} is selected from ${total} volunteers, with ${required} named volunteers guaranteed places. How many teams can be formed?`,
          `${total} volunteers are available and a group of ${size} is needed. If ${required} specified volunteers must be on it, how many groups are possible?`,
          `How many teams of ${size} can be chosen from ${total} volunteers if ${required} particular people must be included?`,
        ]),
        answer,
        wrong: [
          [combinations(total, size), "This ignores the restriction and counts every possible team."],
          [combinations(total, size - required), `This removes ${required} from the team size but still chooses from all ${total} volunteers.`],
          [combinations(total - required, size), `This removes the ${required} required volunteers from the pool but does not reduce the number of seats left to fill.`],
          [permutations(total - required, size - required), "This orders the remaining selections, which a team does not distinguish."],
          [total - required, "This counts the remaining volunteers rather than the ways of choosing from them."],
          [combinations(total - required, size - required) + required, "This adds the required members to the count of teams."],
        ],
        why: `Seating the ${required} required volunteers uses ${required} of the ${size} places, leaving ${size - required} to fill from the other ${total - required} volunteers: C(${total - required}, ${size - required}) = ${answer}.`,
        steps: [
          "Place the required members first; they consume seats but offer no choice.",
          "Reduce both the pool and the number of seats by the number required.",
          "Count combinations of what remains.",
        ],
        principles: ["A forced inclusion reduces both the pool and the number of selections still to be made."],
        hint: "Reduce the pool and the team size by the same amount.",
        trap: "Reducing only one of the two numbers.",
      };
    },
    (s, variant) => {
      const letters = choose(s, ["LEVEL", "BANANA", "LETTER", "SUCCESS"]);
      const counts = {};
      letters.split("").forEach((letter) => {
        counts[letter] = (counts[letter] || 0) + 1;
      });
      const repeats = Object.values(counts);
      const answer = repeats.reduce(
        (total, count) => total / factorial(count),
        factorial(letters.length),
      );
      return {
        family: "arrangements-with-repeated-letters",
        stem: `How many distinguishable arrangements can be made of the letters in the word ${letters}?`,
        answer,
        wrong: [
          [factorial(letters.length), "This treats every letter as distinct; swapping two identical letters produces no new arrangement."],
          [round3(factorial(letters.length) / 2), "This divides by 2 regardless of how many letters actually repeat."],
          [letters.length, "This counts the letters."],
          [factorial(letters.length - 1), "This arranges one fewer letter."],
          [round3(answer / 2), "This divides by an extra factor of 2."],
          [letters.length ** 2, "This squares the length rather than counting arrangements."],
        ],
        why: `${letters} has ${letters.length} letters, so there are ${letters.length}! = ${factorial(letters.length)} orderings if all were distinct. Dividing by ${repeats.filter((count) => count > 1).map((count) => `${count}!`).join(" · ") || "1"} for the repeated letters gives ${answer}.`,
        steps: [
          "Count the letters and form the factorial of that count.",
          "Count how many times each letter repeats.",
          "Divide by the factorial of each repeat count.",
        ],
        principles: ["Identical items are interchangeable, so divide by the factorial of each repetition."],
        hint: "Rearranging two identical letters gives the same word.",
        trap: "Reporting n! and ignoring the repeats.",
      };
    },
  ],
};

SHAPES["compound probability"] = {
  Easy: [
    (s, variant) => {
      const favourable = 3 + (s % 5);
      const others = 5 + (s % 6);
      const total = favourable + others;
      return {
        family: "single-event-probability",
        stem: `A bag holds ${favourable} red marbles and ${others} blue marbles. If one marble is drawn at random, what is the probability that it is red?`,
        answer: frac(favourable, total),
        wrong: [
          [frac(favourable, others), "This compares red to blue rather than red to the whole bag."],
          [frac(others, total), "This is the probability of drawing a blue marble."],
          [frac(total, favourable), "This inverts the probability, giving a value greater than 1."],
          [frac(1, total), "This is the probability of one specific marble, not of any red one."],
          [frac(favourable, favourable), "This is 1, which would mean every marble is red."],
        ],
        why: `There are ${total} marbles in all, ${favourable} of them red, so the probability is ${favourable}/${total}.`,
        steps: ["Count the favourable outcomes.", "Count all equally likely outcomes.", "Divide."],
        principles: ["Probability is favourable outcomes over total outcomes."],
        hint: "The denominator counts every marble, not just the other colour.",
        verification: { kind: "probability", inputs: [favourable, total], expected: favourable / total },
      };
    },
    (s, variant) => {
      const sides = 6;
      const target = 2 + (s % 4);
      const answer = frac(sides - target + 1, sides);
      return {
        family: "probability-at-least-a-value",
        stem: `A fair six-sided die is rolled once. What is the probability that the result is at least ${target}?`,
        answer,
        wrong: [
          [frac(sides - target, sides), `This excludes ${target} itself; "at least" includes the value named.`],
          [frac(target, sides), `This counts the outcomes below ${target} instead of at or above it.`],
          [frac(1, sides), "This is the probability of one specific face."],
          [frac(target - 1, sides), `This counts the ${target - 1} outcomes strictly below ${target}.`],
          [frac(sides, sides - target + 1), "This inverts the probability."],
        ],
        why: `The outcomes at least ${target} are ${target} through ${sides}, which is ${sides - target + 1} of the ${sides} faces.`,
        steps: [
          "List the outcomes satisfying the condition.",
          "Remember that \"at least\" includes the boundary value.",
          "Divide by the six equally likely faces.",
        ],
        principles: ["\"At least k\" includes k itself; \"more than k\" does not."],
        hint: "Count the faces from the target up to 6, inclusive.",
        trap: "Excluding the boundary value.",
        verification: { kind: "probability", inputs: [sides - target + 1, sides], expected: (sides - target + 1) / sides },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const red = 3 + (s % 4);
      const blue = 4 + (s % 5);
      const total = red + blue;
      const answer = frac(red * (red - 1), total * (total - 1));
      return {
        family: "dependent-draws-without-replacement",
        stem: `A jar holds ${red} red and ${blue} blue tokens. Two tokens are drawn without replacement. What is the probability that both are red?`,
        answer,
        wrong: [
          [frac(red * red, total * total), "This treats the draws as independent; without replacement the second draw has one fewer token of each kind."],
          [frac(red, total), "This is the probability that only the first token is red."],
          [frac(red - 1, total - 1), "This is the probability of the second draw alone, given the first was red."],
          [frac(2 * red, total), "This doubles the count rather than multiplying two probabilities."],
          [frac(red * (red - 1), total * total), "This reduces the numerator for the second draw but not the denominator."],
        ],
        why: `The first token is red with probability ${red}/${total}. Given that, the second is red with probability ${red - 1}/${total - 1}. Multiplying gives ${red * (red - 1)}/${total * (total - 1)}.`,
        steps: [
          "Find the probability of the first draw.",
          "Update both counts for the second draw, since the first token is not replaced.",
          "Multiply the two probabilities.",
        ],
        principles: ["Without replacement the draws are dependent: both the favourable count and the total drop by one."],
        hint: "After a red is removed, one fewer red and one fewer token remain.",
        trap: "Squaring the first probability, which assumes replacement.",
        verification: { kind: "probability", inputs: [red * (red - 1), total * (total - 1)], expected: (red * (red - 1)) / (total * (total - 1)) },
      };
    },
    (s, variant) => {
      const firstNumerator = 1 + (s % 3);
      const firstDenominator = firstNumerator + 2 + (s % 3);
      const secondNumerator = 1 + (s % 2);
      const secondDenominator = secondNumerator + 3 + (s % 2);
      const answer = frac(firstNumerator * secondNumerator, firstDenominator * secondDenominator);
      return {
        family: "independent-events-both-occur",
        stem: `Two independent events have probabilities ${firstNumerator}/${firstDenominator} and ${secondNumerator}/${secondDenominator}. What is the probability that both occur?`,
        answer,
        wrong: [
          [frac(firstNumerator * secondDenominator + secondNumerator * firstDenominator, firstDenominator * secondDenominator), "This adds the probabilities, which answers \"at least one\" only when the events are mutually exclusive."],
          [frac(firstNumerator + secondNumerator, firstDenominator + secondDenominator), "This adds numerators and denominators separately, which is not how fractions combine."],
          [frac(firstNumerator, firstDenominator), "This is the probability of the first event alone."],
          [frac(secondNumerator, secondDenominator), "This is the probability of the second event alone."],
          [frac(firstDenominator * secondDenominator, firstNumerator * secondNumerator), "This inverts the product."],
        ],
        why: `For independent events the probability that both occur is the product: (${firstNumerator}/${firstDenominator})(${secondNumerator}/${secondDenominator}) = ${firstNumerator * secondNumerator}/${firstDenominator * secondDenominator}.`,
        steps: [
          "Confirm the events are independent, so neither changes the other's probability.",
          "Multiply the two probabilities.",
          "Check the result is smaller than either factor.",
        ],
        principles: ["P(A and B) = P(A)·P(B) for independent events."],
        hint: "Requiring both events makes the probability smaller, not larger.",
        trap: "Adding the probabilities, which describes \"either\" rather than \"both\".",
        verification: { kind: "probability", inputs: [firstNumerator * secondNumerator, firstDenominator * secondDenominator], expected: (firstNumerator * secondNumerator) / (firstDenominator * secondDenominator) },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const trials = 2 + (s % 3);
      const missNumerator = 2 + (s % 3);
      const missDenominator = missNumerator + 1 + (s % 3);
      const answer = frac(
        missDenominator ** trials - missNumerator ** trials,
        missDenominator ** trials,
      );
      return {
        family: "at-least-one-via-complement",
        stem: choose(variant, [
          `On each of ${trials} independent attempts, the probability of failure is ${missNumerator}/${missDenominator}. What is the probability of at least one success?`,
          `An attempt fails with probability ${missNumerator}/${missDenominator}. Over ${trials} independent attempts, what is the probability of succeeding at least once?`,
          `Each of ${trials} independent trials fails with probability ${missNumerator}/${missDenominator}. How likely is at least one success?`,
          `The chance of failure on a single attempt is ${missNumerator}/${missDenominator}. In ${trials} independent attempts, what is the probability that at least one succeeds?`,
        ]),
        answer,
        wrong: [
          [frac(missDenominator - missNumerator, missDenominator), "This is the probability of success on a single attempt, not across all " + trials + "."],
          [frac(missNumerator ** trials, missDenominator ** trials), "This is the probability of failing every time, the complement of what was asked."],
          [frac(trials * (missDenominator - missNumerator), missDenominator), "This multiplies a single success probability by the number of attempts, which can exceed 1."],
          [frac((missDenominator - missNumerator) ** trials, missDenominator ** trials), "This is the probability of succeeding on every attempt, not at least one."],
          [frac(missNumerator, missDenominator), "This is the failure probability on one attempt."],
        ],
        why: `Failing all ${trials} times has probability (${missNumerator}/${missDenominator})^${trials} = ${missNumerator ** trials}/${missDenominator ** trials}. At least one success is the complement: 1 − that, or ${missDenominator ** trials - missNumerator ** trials}/${missDenominator ** trials}.`,
        steps: [
          "Recognise \"at least one\" as the complement of \"none\".",
          "Compute the probability of failing every attempt by multiplying.",
          "Subtract from 1.",
        ],
        principles: ["P(at least one) = 1 − P(none), which avoids adding overlapping cases."],
        hint: "Counting the ways to get at least one success double-counts; count the single way to get none instead.",
        trap: "Multiplying a single-attempt probability by the number of attempts.",
        verification: {
          kind: "probability",
          inputs: [missDenominator ** trials - missNumerator ** trials, missDenominator ** trials],
          expected: (missDenominator ** trials - missNumerator ** trials) / missDenominator ** trials,
        },
      };
    },
    (s, variant) => {
      // All four cells are kept in disjoint ranges: when any two coincided the
      // "conditioned on the wrong variable" distractor collapsed onto the key,
      // and the marginal probability matched it in value.
      const bothYes = 6 + (s % 5);
      const yesNo = 4 + (s % 4);
      const noYes = 14 + (s % 3);
      const bothNo = 20 + (s % 6);
      const columnTotal = bothYes + noYes;
      const answer = frac(bothYes, columnTotal);
      return {
        family: "conditional-probability-reversed",
        stimulus: {
          type: "table",
          content: `A clinic recorded test results against whether the condition was present.\n\n | condition present | condition absent\npositive test | ${bothYes} | ${noYes}\nnegative test | ${yesNo} | ${bothNo}`,
        },
        stem: choose(variant, [
          "Given that a randomly chosen patient tested positive, what is the probability that the condition is present?",
          "A patient is selected at random from those who tested positive. What is the probability that the condition is present?",
          "Among patients with a positive test, what is the probability of the condition being present?",
          "If a randomly chosen patient has a positive test result, how likely is it that the condition is present?",
        ]),
        answer,
        wrong: [
          [frac(bothYes, bothYes + yesNo), "This conditions on having the condition, answering the reverse question: given the condition, how likely is a positive test?"],
          [frac(bothYes, bothYes + yesNo + noYes + bothNo), "This divides by every patient rather than only those who tested positive."],
          [frac(noYes, columnTotal), "This is the probability that the condition is absent given a positive test."],
          [frac(columnTotal, bothYes + yesNo + noYes + bothNo), "This is the probability of testing positive at all."],
          [frac(bothYes + yesNo, bothYes + yesNo + noYes + bothNo), "This is the prevalence of the condition, before any test result is known."],
        ],
        why: `${columnTotal} patients tested positive, and ${bothYes} of them have the condition, so the probability is ${bothYes}/${columnTotal}. This is not the same as the probability of a positive test given the condition.`,
        steps: [
          "Identify what is being conditioned on: a positive test.",
          "Restrict to that row and use its total as the denominator.",
          "Count the patients in that row who also have the condition.",
        ],
        principles: ["P(A|B) and P(B|A) are different quantities; the condition names the denominator."],
        hint: "The word \"given\" tells you which total goes underneath.",
        trap: "Swapping the conditioning and computing P(positive | condition) instead.",
        verification: { kind: "probability", inputs: [bothYes, columnTotal], expected: bothYes / columnTotal },
      };
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Integrating Essential Skills                                        *
 *                                                                     *
 * The ACT's own label for the 40-45% of the test that reuses pre-      *
 * algebra content under time pressure. Easy items apply one           *
 * relationship; Medium items chain two; Hard items either invert the  *
 * relationship (find the input from the result) or compose two        *
 * different relationships whose order matters.                        *
 * ------------------------------------------------------------------ */

SHAPES["rates"] = {
  Easy: [
    (s, variant) => {
      const rate = span(s, 12, 8, 3);
      const hours = span(s, 3, 5);
      const total = rate * hours;
      return {
        family: "unit-rate-from-a-total",
        stem: choose(variant, [
          `A press prints ${total} flyers in ${hours} hours at a constant rate. How many flyers does it print per hour?`,
          `A constant-speed press finishes ${total} flyers over ${hours} hours. What is its hourly output?`,
          `Over ${hours} hours a machine produces ${total} flyers at a steady rate. How many flyers per hour is that?`,
          `${total} flyers are printed in ${hours} hours at an unchanging rate. Find the number of flyers per hour.`,
        ]),
        answer: rate,
        wrong: [
          [total, "This is the whole job, not the amount finished in one hour."],
          [rate + hours, "This adds the two given numbers instead of dividing."],
          [total - hours, "This subtracts the time from the total; a rate is a quotient."],
          [rate * 2, "This is two hours' output rather than one hour's."],
          [round3(total / (hours + 1)), "This divides by one hour too many."],
        ],
        why: `A constant rate is the total divided by the time: ${total} ÷ ${hours} = ${rate} flyers per hour.`,
        steps: [
          "Identify the total produced and the time taken.",
          `Divide: ${total} ÷ ${hours}.`,
          "Check the units — flyers per hour, not flyers.",
        ],
        principles: ["A constant rate equals total amount divided by total time."],
        hint: "Per hour means divide by the number of hours.",
        verification: quotientCheck(total, hours, rate),
      };
    },
    (s, variant) => {
      const speed = span(s, 25, 8, 5);
      const hours = span(s, 2, 4);
      const distance = speed * hours;
      return {
        family: "average-speed-single-leg",
        stem: choose(variant, [
          `A van covers ${distance} miles in ${hours} hours. What is its average speed, in miles per hour?`,
          `A driver travels ${distance} miles over ${hours} hours. Find the average speed in miles per hour.`,
          `A bus needs ${hours} hours to travel ${distance} miles. What is its average speed, in miles per hour?`,
          `In ${hours} hours a truck goes ${distance} miles. What average speed, in miles per hour, is that?`,
        ]),
        answer: speed,
        wrong: [
          [distance, "This is the distance, not the speed."],
          [distance + hours, "This combines the numbers without dividing distance by time."],
          [speed + hours, "This adds the hours to the speed."],
          [round3(distance / (hours + 1)), "This uses one hour too many."],
          [speed * hours * 2, "This doubles the distance instead of finding a rate."],
        ],
        why: `Average speed is distance ÷ time: ${distance} ÷ ${hours} = ${speed} miles per hour.`,
        steps: [
          "Write the definition: average speed = distance ÷ time.",
          `Substitute: ${distance} ÷ ${hours}.`,
          "Report the quotient in miles per hour.",
        ],
        principles: ["Average speed is total distance divided by total time."],
        hint: "Divide the miles by the hours.",
        verification: quotientCheck(distance, hours, speed),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const first = span(s, 40, 5, 10);
      const second = first + span(s, 10, 4, 10);
      const t1 = span(s, 2, 3);
      const t2 = t1 + 1 + (s % 2);
      const distance = first * t1 + second * t2;
      const time = t1 + t2;
      const answer = round3(distance / time);
      return {
        family: "average-speed-two-legs",
        stem: `A driver travels for ${t1} hours at ${first} miles per hour and then for ${t2} hours at ${second} miles per hour. What is the average speed for the entire trip, in miles per hour?`,
        answer,
        wrong: [
          [round3((first + second) / 2), "This averages the two speeds, which is only correct when the two times are equal."],
          [distance, "This is the total distance rather than a speed."],
          [first + second, "This adds the two speeds."],
          [round3(distance / t2), "This divides the whole distance by only the second leg's time."],
          [round3(distance / t1), "This divides the whole distance by only the first leg's time."],
          [second, "This is the faster leg's speed, not the trip average."],
        ],
        why: `The legs cover ${first} · ${t1} = ${first * t1} and ${second} · ${t2} = ${second * t2} miles, so the trip is ${distance} miles in ${time} hours: ${distance} ÷ ${time} = ${num(answer)} miles per hour.`,
        steps: [
          "Find each leg's distance as speed × time.",
          `Add them: ${distance} miles in total.`,
          `Divide by the total time ${time}, not by 2.`,
        ],
        principles: [
          "Average speed weights each leg by its time, so it equals total distance over total time.",
        ],
        hint: "The trip spends longer at one of the speeds.",
        trap: "Averaging the two speeds as if the driver spent equal time at each.",
      };
    },
    (s, variant) => {
      const a = span(s, 4, 5, 2);
      const b = a + span(s, 2, 4, 2);
      const answer = round3((a * b) / (a + b));
      return {
        family: "combined-work-rate",
        stem: choose(variant, [
          `Pump A alone fills a tank in ${a} hours and pump B alone fills the same tank in ${b} hours. Working together at those rates, how many hours do they take to fill the tank?`,
          `One hose fills a pool in ${a} hours; a second fills it in ${b} hours. Running both at once, how many hours does filling the pool take?`,
          `Working alone, printer A finishes a run in ${a} hours and printer B finishes it in ${b} hours. Running together, how many hours does the run take?`,
          `Machine A completes a job in ${a} hours and machine B completes it in ${b} hours. How many hours does the job take with both machines running?`,
        ]),
        answer,
        wrong: [
          [a + b, "This adds the times; two workers together are faster than either alone."],
          [round3((a + b) / 2), "This averages the times, which would be right only if rates added like times."],
          [b - a, "This subtracts the times, which has no meaning here."],
          [b, "This is the slower machine's time alone."],
          [round3((a * b) / 2), "This multiplies the times and halves, ignoring the rate sum."],
        ],
        why: `Rates add: 1/${a} + 1/${b} = ${a + b}/${a * b} of the tank per hour, so the time is the reciprocal, ${a * b}/${a + b} = ${num(answer)} hours.`,
        steps: [
          "Convert each time to a rate: 1 job per a hours means 1/a of the job per hour.",
          `Add the rates: 1/${a} + 1/${b} = ${a + b}/${a * b}.`,
          "Invert the combined rate to get the combined time.",
        ],
        principles: ["Rates add; times do not."],
        hint: "Work with jobs per hour, then flip at the end.",
        trap: "Adding or averaging the two times instead of adding the rates.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const table = [
        [30, 20, 24],
        [60, 30, 40],
        [12, 24, 16],
        [40, 10, 16],
        [15, 10, 12],
        [45, 30, 36],
        [20, 80, 32],
        [36, 18, 24],
      ];
      const [out, back, answer] = choose(s, table);
      const distance = lcm(out, back);
      return {
        family: "round-trip-harmonic-average-speed",
        stem: `A cyclist rides ${distance} miles to a lake at ${out} miles per hour and returns along the same road at ${back} miles per hour. What is the average speed for the round trip, in miles per hour?`,
        answer,
        wrong: [
          [round3((out + back) / 2), "This averages the two speeds. Averaging speeds is only valid when equal time is spent at each, and here the slower leg takes longer."],
          [out + back, "This adds the speeds."],
          [Math.max(out, back), "This reports the faster leg's speed."],
          [Math.min(out, back), "This reports the slower leg's speed."],
          [round3((2 * distance) / (distance / out)), "This divides the round-trip distance by only the outbound time."],
          [round3(distance / (distance / out + distance / back)), "This uses one-way distance over round-trip time."],
        ],
        why: `The trip is ${2 * distance} miles. Outbound takes ${num(distance / out)} hours and the return takes ${num(distance / back)} hours, a total of ${num(distance / out + distance / back)} hours, so the average is ${2 * distance} ÷ ${num(distance / out + distance / back)} = ${answer} miles per hour. Equivalently 2 · ${out} · ${back} ÷ (${out} + ${back}).`,
        steps: [
          "Average speed is total distance over total time, never the mean of two speeds.",
          `Compute each leg's time: ${distance}/${out} and ${distance}/${back} hours.`,
          `Divide ${2 * distance} miles by the total time.`,
        ],
        principles: [
          "Equal distances at two speeds give the harmonic mean 2uv/(u+v), which is always below the arithmetic mean.",
        ],
        hint: "More of the trip's time is spent at the slower speed.",
        trap: "Taking the arithmetic mean of the two speeds.",
        verification: quotientCheck(2 * out * back, out + back, answer),
      };
    },
    (s, variant) => {
      const divisors = [2, 3, 4, 5, 6];
      const m = choose(s, divisors);
      const p = choose(s + 2, divisors);
      const a = span(s, 3, 5);
      const b = span(s, 4, 4);
      const hours = span(s, 2, 3);
      const minutes = hours * 60;
      const answer = (a * minutes) / m + (b * minutes) / p;
      return {
        family: "two-machine-rate-with-time-conversion",
        stem: `Machine A seals ${a} cartons every ${m} minutes and machine B seals ${b} cartons every ${p} minutes. If both run continuously for ${hours} hours, how many cartons do they seal in all?`,
        answer,
        wrong: [
          [round3((a * hours) / m + (b * hours) / p), "This uses hours where the rates are stated per minute; the running time has to be converted first."],
          [(a + b) * hours, "This adds the carton counts and multiplies by hours, ignoring the stated intervals."],
          [round3((a * minutes) / m), "This counts only machine A."],
          [round3((b * minutes) / p), "This counts only machine B."],
          [round3(((a + b) * minutes) / (m + p)), "This adds the counts and the intervals separately, which is not how rates combine."],
          [answer + a, "This adds one extra interval of machine A's output."],
        ],
        why: `${hours} hours is ${minutes} minutes. Machine A seals ${a}/${m} = ${num(a / m)} cartons per minute and machine B seals ${b}/${p} = ${num(b / p)}, so together they seal ${num(a / m + b / p)} per minute, and ${num(a / m + b / p)} · ${minutes} = ${answer} cartons.`,
        steps: [
          `Convert the running time to the rates' unit: ${hours} hours = ${minutes} minutes.`,
          "Turn each statement into cartons per minute.",
          "Add the two rates, then multiply by the total minutes.",
        ],
        principles: [
          "Rates only add once they share a unit; converting time before combining avoids mixing minutes with hours.",
        ],
        hint: "The rates are per minute but the time is in hours.",
        trap: "Combining a per-minute rate with a time measured in hours.",
      };
    },
  ],
};

SHAPES["proportions"] = {
  Easy: [
    (s, variant) => {
      const serves = span(s, 4, 4, 2);
      const cups = span(s, 2, 4);
      const factor = span(s, 2, 4);
      const target = serves * factor;
      const answer = cups * factor;
      return {
        family: "direct-proportion-scale-up",
        stem: choose(variant, [
          `A recipe that serves ${serves} people uses ${cups} cups of flour. How many cups of flour are needed to serve ${target} people, keeping the same proportions?`,
          `${cups} cups of flour serve ${serves} people. At the same ratio, how many cups serve ${target} people?`,
          `A batch for ${serves} people takes ${cups} cups of flour. Scaled to ${target} people, how many cups are required?`,
          `Flour is used at ${cups} cups per ${serves} servings. How many cups are needed for ${target} servings?`,
        ]),
        answer,
        wrong: [
          [cups + factor, "This adds the scale factor instead of multiplying by it."],
          [cups, "This is the original amount, unscaled."],
          [target, "This is the number of servings, not cups."],
          [cups * (factor + 1), "This scales by one factor too many."],
          [round3(cups / factor), "This divides by the scale factor; more servings need more flour."],
        ],
        why: `${target} ÷ ${serves} = ${factor}, so every ingredient is multiplied by ${factor}: ${cups} · ${factor} = ${answer} cups.`,
        steps: [
          `Find the scale factor: ${target} ÷ ${serves} = ${factor}.`,
          `Apply it to the flour: ${cups} · ${factor}.`,
          "Check that the answer is larger, since more people are being served.",
        ],
        principles: ["In a direct proportion, both quantities are multiplied by the same factor."],
        hint: "How many times bigger is the new serving count?",
        verification: { kind: "product", inputs: [cups, factor], expected: answer },
      };
    },
    (s, variant) => {
      const count = span(s, 3, 5);
      const price = span(s, 2, 5);
      const cost = count * price;
      const wanted = count + span(s, 2, 4);
      const answer = money(wanted * price);
      return {
        family: "unit-price-proportion",
        stem: `${count} identical notebooks cost ${cost}. At the same price per notebook, what is the cost of ${wanted} notebooks?`,
        answer,
        wrong: [
          [money(cost + (wanted - count)), "This adds the extra notebooks as dollars rather than pricing them."],
          [money(cost), "This is the cost of the smaller group, not the larger one."],
          [money(wanted), "This treats each notebook as costing one dollar."],
          [money(cost * wanted), "This multiplies the whole cost by the new count instead of the unit price."],
          [money(price), "This is the price of a single notebook."],
        ],
        why: `Each notebook costs ${cost} ÷ ${count} = ${price}, so ${wanted} notebooks cost ${wanted} · ${price} = ${wanted * price}.`,
        steps: [
          `Divide to get the unit price: ${cost} ÷ ${count} = ${price}.`,
          `Multiply by the new count: ${price} · ${wanted}.`,
          "Confirm the total grew in proportion to the count.",
        ],
        principles: ["A constant unit price makes cost directly proportional to quantity."],
        hint: "Find the price of one first.",
        verification: { kind: "product", inputs: [price, wanted], expected: wanted * price },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const red = span(s, 2, 4);
      const blue = red + 1 + (s % 3);
      const groups = span(s, 6, 5, 2);
      const total = (red + blue) * groups;
      const answer = red * groups;
      return {
        family: "part-to-whole-ratio",
        stem: `In a mosaic the ratio of red tiles to blue tiles is ${red} to ${blue}. The mosaic uses ${total} tiles in all. How many of them are red?`,
        answer,
        wrong: [
          [blue * groups, "This is the number of blue tiles."],
          [round3(total / (red + blue)), "This is the size of one share, not the red part."],
          [round3((total * red) / blue), "This uses the part-to-part ratio as if it were part-to-whole."],
          [round3(total / red), "This divides the total by the red term alone."],
          [red, "This is the ratio term, not a tile count."],
          [round3(total / 2), "This splits the tiles evenly, ignoring the ratio."],
        ],
        why: `The ratio makes ${red + blue} shares in all, so one share is ${total} ÷ ${red + blue} = ${groups} tiles, and red takes ${red} shares: ${red} · ${groups} = ${answer}.`,
        steps: [
          `Add the ratio terms to count the shares: ${red} + ${blue} = ${red + blue}.`,
          `Divide the total by the shares: ${total} ÷ ${red + blue} = ${groups}.`,
          `Multiply by the red term: ${red} · ${groups}.`,
        ],
        principles: [
          "A part-to-part ratio becomes a part-to-whole fraction only after the terms are summed.",
        ],
        hint: "How many equal shares does the ratio divide the tiles into?",
        trap: "Treating the ratio's first term as a fraction of the whole.",
        verification: { kind: "product", inputs: [red, groups], expected: answer },
      };
    },
    (s, variant) => {
      const cm = span(s, 2, 4);
      const meters = span(s, 3, 5);
      const wall = meters * span(s, 2, 5);
      const answer = round3((wall / meters) * cm);
      return {
        family: "scale-drawing-inverse-direction",
        stem: `On a scale drawing, ${cm} centimeters represents ${meters} meters. A wall is ${wall} meters long. How many centimeters long is that wall in the drawing?`,
        answer,
        wrong: [
          [round3((wall / cm) * meters), "This applies the scale upside down, converting drawing units into real ones."],
          [wall, "This copies the real length without applying the scale."],
          [round3(wall * cm), "This multiplies by the drawing length without dividing by the real length it stands for."],
          [round3(wall / cm), "This divides by the wrong term of the scale."],
          [cm, "This is the scale's drawing length, not the wall's."],
        ],
        why: `The scale is ${cm} cm per ${meters} m, so each meter is ${num(cm / meters)} cm on the drawing: ${wall} · ${num(cm / meters)} = ${num(answer)} centimeters.`,
        steps: [
          `Reduce the scale to centimeters per meter: ${cm} ÷ ${meters}.`,
          `Multiply by the real length ${wall} meters.`,
          "Check the direction — a drawing of a wall should be far smaller than the wall.",
        ],
        principles: ["A scale is a rate; using it backwards inverts the answer."],
        hint: "Set up centimeters over meters and keep the units aligned.",
        trap: "Running the scale in the wrong direction.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const x1 = span(s, 2, 4);
      const x2 = x1 * span(s, 2, 3);
      const y1 = span(s, 12, 5, 12) * x2 * x2;
      const answer = round3((y1 * x1 * x1) / (x2 * x2));
      return {
        family: "inverse-square-variation",
        stem: `The quantity y varies inversely as the square of x. When x = ${x1}, y = ${y1}. What is y when x = ${x2}?`,
        answer,
        wrong: [
          [round3((y1 * x1) / x2), "This varies inversely as x rather than as the square of x."],
          [round3((y1 * x2 * x2) / (x1 * x1)), "This varies directly as the square, so y grows when x grows."],
          [round3(y1 / (x2 * x2)), "This divides by the new x squared without restoring the constant from the first pair."],
          [y1, "This leaves y unchanged."],
          [round3(y1 / 2), "This halves y regardless of how x changed."],
        ],
        why: `Inverse square variation means y·x² is constant: ${y1} · ${x1}² = ${y1 * x1 * x1}. At x = ${x2}, y = ${y1 * x1 * x1} ÷ ${x2 * x2} = ${num(answer)}.`,
        steps: [
          "Write the relationship as y = k/x², so k = y·x².",
          `Find k from the given pair: ${y1} · ${x1 * x1} = ${y1 * x1 * x1}.`,
          `Divide k by ${x2}² to get the new y.`,
        ],
        principles: [
          "Inverse variation fixes the product; inverse square variation fixes y·x². Squaring before dividing is what separates this from ordinary inverse variation.",
        ],
        hint: "Find the constant that x and y must always produce together.",
        trap: "Scaling by the ratio of the x values instead of by its square.",
        verification: quotientCheck(y1 * x1 * x1, x2 * x2, answer),
      };
    },
    (s, variant) => {
      const table = [
        [2, 3, 4, 5],
        [3, 4, 2, 3],
        [5, 2, 3, 4],
        [4, 5, 3, 2],
        [2, 5, 4, 3],
        [3, 2, 5, 4],
        [4, 3, 2, 5],
        [5, 4, 3, 2],
      ];
      const [a, b, c, d] = choose(s, table);
      const managers = a * c;
      const engineers = b * c;
      const technicians = b * d;
      const scale = span(s, 2, 4);
      const total = technicians * scale;
      const answer = managers * scale;
      return {
        family: "chained-three-term-ratio",
        stem: `At a firm the ratio of managers to engineers is ${a} to ${b}, and the ratio of engineers to technicians is ${c} to ${d}. If the firm has ${total} technicians, how many managers does it have?`,
        answer,
        wrong: [
          [round3((total * a) / b), "This uses the manager-to-engineer ratio directly against the technician count, skipping the link through engineers."],
          [engineers * scale, "This is the number of engineers."],
          [round3((total * a) / d), "This pairs the first ratio's numerator with the second ratio's denominator without matching the shared term."],
          [round3((total * c) / d), "This converts technicians to engineers and stops there."],
          [total, "This repeats the technician count."],
          [round3((total * b) / a), "This inverts the manager-to-engineer ratio."],
        ],
        why: `The shared term is engineers. Scaling the first ratio by ${c} and the second by ${b} makes managers : engineers : technicians = ${managers} : ${engineers} : ${technicians}. With ${total} technicians the common multiplier is ${total} ÷ ${technicians} = ${scale}, so managers = ${managers} · ${scale} = ${answer}.`,
        steps: [
          "Identify the term the two ratios share — engineers.",
          `Rescale both ratios so the engineer term matches: ${managers} : ${engineers} : ${technicians}.`,
          `Divide the given technician count by ${technicians} and multiply the manager term by that multiplier.`,
        ],
        principles: [
          "Two ratios chain only after the shared quantity is written with the same number in both.",
        ],
        hint: "Make the engineer count agree in both ratios before combining them.",
        trap: "Applying one ratio to a quantity it does not directly relate.",
        verification: { kind: "product", inputs: [managers, scale], expected: answer },
      };
    },
  ],
};

SHAPES["percentages"] = {
  Easy: [
    (s, variant) => {
      const percent = span(s, 10, 8, 5);
      const base = span(s, 40, 6, 20);
      const answer = round3((base * percent) / 100);
      return {
        family: "percent-of-a-number",
        stem: choose(variant, [
          `What is ${percent}% of ${base}?`,
          `Find ${percent} percent of ${base}.`,
          `A survey covers ${base} households, and ${percent}% of them recycle. How many households recycle?`,
          `${percent}% of a ${base}-page manuscript has been edited. How many pages is that?`,
        ]),
        answer,
        wrong: [
          [percent, "This repeats the percent instead of applying it."],
          [base - percent, "This subtracts the percent as if it were a count."],
          [round3(base / percent), "This divides by the percent rather than multiplying by percent ÷ 100."],
          [round3((base * percent) / 10), "This moves the decimal one place too few."],
          [base, "This is the whole amount."],
        ],
        why: `${percent}% means ${percent}/100, so the answer is ${base} · ${percent}/100 = ${num(answer)}.`,
        steps: [
          `Rewrite the percent as a decimal: ${percent}% = ${num(percent / 100)}.`,
          `Multiply by the base: ${base} · ${num(percent / 100)}.`,
          "Sanity-check the size against the whole.",
        ],
        principles: ["A percent of a quantity is that quantity times the percent over 100."],
        hint: "Of means multiply.",
        verification: { kind: "percent-of", inputs: [base, percent], expected: answer },
      };
    },
    (s, variant) => {
      const before = span(s, 40, 6, 20);
      const after = before + (before * choose(s, [5, 10, 20, 25])) / 100;
      const answer = round3(((after - before) / before) * 100);
      return {
        family: "percent-increase",
        stem: `A club's membership grew from ${before} to ${after}. By what percent did it increase?`,
        answer,
        wrong: [
          [after - before, "This is the raw increase, not a percent."],
          [round3(((after - before) / after) * 100), "This divides the change by the new value; percent change always compares to the original."],
          [round3((after / before) * 100), "This gives the new value as a percent of the old, which is 100 more than the increase."],
          [before, "This is the starting membership."],
          [round3(((after - before) / before) * 10), "This is off by a factor of ten."],
        ],
        why: `The increase is ${after} − ${before} = ${after - before}, and ${after - before} ÷ ${before} = ${num((after - before) / before)}, so the growth is ${num(answer)}%.`,
        steps: [
          `Subtract to find the change: ${after} − ${before} = ${after - before}.`,
          `Divide by the original value ${before}.`,
          "Multiply by 100 to express it as a percent.",
        ],
        principles: ["Percent change divides the change by the original amount."],
        hint: "The denominator is where the change started.",
        verification: { kind: "percent-change", inputs: [before, after], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const price = span(s, 60, 6, 20);
      const first = span(s, 10, 4, 10);
      const second = span(s, 5, 4, 5);
      const answer = money(round3(price * (1 - first / 100) * (1 - second / 100)));
      const naive = money(round3(price * (1 - (first + second) / 100)));
      return {
        family: "successive-discounts",
        stem: `A coat priced at ${price} is marked down ${first}%, and the sale price is then reduced by a further ${second}%. What is the final price?`,
        answer,
        wrong: [
          [naive, `This subtracts ${first + second}% from the original price. The second discount applies to the already-reduced price, so the total reduction is smaller than the sum of the two percents.`],
          [money(round3(price * (1 - first / 100))), "This applies only the first markdown."],
          [money(round3(price * (1 - second / 100))), "This applies only the second markdown."],
          [money(round3(price * ((first + second) / 100))), "This computes the discount rather than the price left after it."],
          [money(price), "This is the original price."],
        ],
        why: `The first markdown leaves ${100 - first}% of ${price}, or ${num(round3((price * (100 - first)) / 100))}. The second leaves ${100 - second}% of that: ${num(round3((price * (100 - first) * (100 - second)) / 10000))}.`,
        steps: [
          `Multiply by ${num((100 - first) / 100)} for the first markdown.`,
          `Multiply that result by ${num((100 - second) / 100)} for the second.`,
          "Do not add the percents — the second one is taken from a smaller base.",
        ],
        principles: [
          "Successive percent changes multiply their factors; they do not add their percents.",
        ],
        hint: "Two markdowns act on different starting prices.",
        trap: "Adding the two discount percents.",
      };
    },
    (s, variant) => {
      const original = span(s, 200, 6, 100);
      const rate = span(s, 5, 4, 5);
      const now = round3((original * (100 + rate)) / 100);
      return {
        family: "reverse-percent-find-the-original",
        stem: `After a ${rate}% increase, a monthly rent is ${num(now)}. What was the rent before the increase?`,
        answer: money(original),
        wrong: [
          [money(round3((now * (100 - rate)) / 100)), `This takes ${rate}% off the new rent. Removing ${rate}% of the larger number does not undo adding ${rate}% of the smaller one.`],
          [money(round3(now - rate)), "This subtracts the percent as if it were dollars."],
          [money(round3((now * 100) / (100 - rate))), "This divides by the wrong factor, making the original larger than the new rent."],
          [money(now), "This is the rent after the increase."],
          [money(round3((now * rate) / 100)), "This is the size of the increase, not the original rent."],
        ],
        why: `The new rent is ${num(1 + rate / 100)} times the old one, so the old rent is ${num(now)} ÷ ${num(1 + rate / 100)} = ${original}. Checking: ${original} · ${num(1 + rate / 100)} = ${num(now)}.`,
        steps: [
          `Write the relationship: original · ${num(1 + rate / 100)} = ${num(now)}.`,
          `Divide both sides by ${num(1 + rate / 100)}.`,
          "Verify by re-applying the increase to your answer.",
        ],
        principles: [
          "Undoing a percent increase divides by the growth factor; it does not subtract the same percent.",
        ],
        hint: "The percent was taken from the number you are looking for.",
        trap: "Subtracting the same percent from the new value.",
        verification: quotientCheck(now * 100, 100 + rate, original),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const table = [
        [40, 10, 20],
        [60, 20, 40],
        [50, 30, 40],
        [80, 25, 50],
        [30, 10, 40],
        [90, 40, 60],
        [45, 20, 40],
        [70, 30, 50],
      ];
      const [volume, weak, target] = choose(s, table);
      const answer = round3((volume * (target - weak)) / (100 - target));
      return {
        family: "acid-mixture-add-pure-solute",
        stem: `A chemist has ${volume} liters of a solution that is ${weak}% acid. How many liters of pure acid must be added so that the resulting solution is ${target}% acid?`,
        answer,
        wrong: [
          [round3((volume * (target - weak)) / 100), "This takes the percent difference of the original volume, treating the added acid as if it did not also enlarge the total."],
          [target - weak, "This is the difference of the percents, not a volume."],
          [round3((volume * target) / 100), "This is the acid the final mixture contains, not the amount added."],
          [round3((volume * weak) / 100), "This is the acid already present."],
          [volume, "This repeats the starting volume."],
          [round3((volume * (target - weak)) / (100 - weak)), "This divides by the wrong complement; the added liquid is pure acid, so it is the target percent that limits the dilution."],
        ],
        why: `Start with ${num((volume * weak) / 100)} liters of acid in ${volume} liters. Adding x liters of pure acid gives ${num((volume * weak) / 100)} + x acid in ${volume} + x liters, and setting that equal to ${target}% gives x = ${volume}(${target} − ${weak}) ÷ (100 − ${target}) = ${num(answer)} liters.`,
        steps: [
          "Track the acid and the total separately; adding pure acid increases both.",
          `Write the equation (${num((volume * weak) / 100)} + x) ÷ (${volume} + x) = ${num(target / 100)}.`,
          "Clear the denominator and solve the resulting linear equation for x.",
        ],
        principles: [
          "In a mixture problem the added substance changes the numerator and the denominator, so the concentration equation is not a simple percent of the original volume.",
        ],
        hint: "The total volume does not stay at the starting number.",
        trap: "Holding the total volume fixed while the acid amount grows.",
      };
    },
    (s, variant) => {
      const up = span(s, 10, 5, 10);
      const down = span(s, 10, 4, 5);
      const answer = round3((100 + up) * (100 - down) / 100);
      return {
        family: "compounded-percent-change-net-effect",
        stem: `A retailer raises the price of an item by ${up}% and later reduces the new price by ${down}%. The final price is what percent of the original price?`,
        answer,
        wrong: [
          [100 + up - down, `This adds and subtracts the percents. The ${down}% reduction is taken from the raised price, not from the original, so the two percents apply to different bases.`],
          [100 + up, "This applies only the increase."],
          [100 - down, "This applies only the reduction."],
          [round3(answer - 100), "This is the net change, not the final price as a percent of the original."],
          [100, "This claims the two changes cancel exactly, which happens only if both percents are zero."],
          [up * down, "This multiplies the percents themselves."],
        ],
        why: `The increase multiplies by ${num(1 + up / 100)} and the reduction multiplies by ${num(1 - down / 100)}, so the final price is ${num(1 + up / 100)} · ${num(1 - down / 100)} = ${num(answer / 100)} times the original, or ${num(answer)}%.`,
        steps: [
          "Convert each change into a multiplying factor rather than an amount.",
          `Multiply the factors: ${num(1 + up / 100)} · ${num(1 - down / 100)}.`,
          "Express the product as a percent of the original.",
        ],
        principles: [
          "Percent changes compose multiplicatively, so a rise of p% followed by a fall of p% leaves less than the original.",
        ],
        hint: "The second percent is taken from a different number than the first.",
        trap: "Adding the two percents as though they shared a base.",
      };
    },
  ],
};

SHAPES["perimeter and area"] = {
  Easy: [
    (s, variant) => {
      const length = span(s, 7, 6, 2);
      const width = span(s, 3, 5, 2);
      const answer = 2 * (length + width);
      return {
        family: "rectangle-perimeter",
        stem: choose(variant, [
          `A rectangular patio measures ${length} feet by ${width} feet. What is its perimeter, in feet?`,
          `What is the perimeter, in feet, of a rectangle ${length} feet long and ${width} feet wide?`,
          `A rectangular sign is ${length} feet long and ${width} feet high. How many feet of trim go around its edge?`,
          `A ${length}-foot by ${width}-foot rectangular plot is fenced on all four sides. How many feet of fence are used?`,
        ]),
        answer,
        wrong: [
          [length * width, "This is the area, in square feet, not the distance around."],
          [length + width, "This adds one length and one width; the rectangle has two of each."],
          [2 * length + width, "This counts the width only once."],
          [length + 2 * width, "This counts the length only once."],
          [4 * length, "This treats the rectangle as a square with the longer side."],
        ],
        why: `Perimeter counts each side once: ${length} + ${width} + ${length} + ${width} = 2(${length} + ${width}) = ${answer} feet.`,
        steps: [
          "Add the length and the width.",
          "Double the sum, because the rectangle has two of each side.",
          "Keep the units linear, not square.",
        ],
        principles: ["A rectangle's perimeter is 2(length + width)."],
        hint: "Walk all the way around the edge.",
        verification: { kind: "sum", inputs: [length, width, length, width], expected: answer },
      };
    },
    (s, variant) => {
      const width = span(s, 4, 5, 2);
      const length = span(s, 9, 6, 3);
      const area = length * width;
      return {
        family: "rectangle-missing-side-from-area",
        stem: `A rectangular rug has an area of ${area} square feet and a width of ${width} feet. What is its length, in feet?`,
        answer: length,
        wrong: [
          [area - width, "This subtracts the width from the area; area is a product, so recovering a side needs division."],
          [round3(area / (width + 1)), "This divides by the wrong width."],
          [area, "This is the area, in square feet."],
          [width, "This repeats the width."],
          [round3(area / 2), "This halves the area rather than dividing by the width."],
        ],
        why: `Area is length · width, so length = ${area} ÷ ${width} = ${length} feet.`,
        steps: [
          "Write area = length × width.",
          `Divide the area by the known side: ${area} ÷ ${width}.`,
          "Check by multiplying back.",
        ],
        principles: ["Dividing an area by one dimension returns the other."],
        hint: "Undo the multiplication.",
        verification: quotientCheck(area, width, length),
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const outerW = span(s, 10, 5, 2);
      const outerH = span(s, 8, 5, 2);
      const cutW = span(s, 3, 4);
      const cutH = span(s, 2, 4);
      const answer = outerW * outerH - cutW * cutH;
      return {
        family: "composite-l-shaped-area",
        stem: `An L-shaped floor is formed by removing a ${cutW}-foot by ${cutH}-foot rectangular corner from a ${outerW}-foot by ${outerH}-foot rectangle. What is the area of the floor, in square feet?`,
        answer,
        wrong: [
          [outerW * outerH, "This is the full rectangle before the corner is removed."],
          [cutW * cutH, "This is the removed corner alone."],
          [outerW * outerH + cutW * cutH, "This adds the corner rather than removing it."],
          [round3((outerW - cutW) * (outerH - cutH)), "This shrinks both dimensions, which cuts away far more than one corner."],
          [2 * (outerW + outerH), "This is a perimeter, not an area."],
        ],
        why: `The whole rectangle is ${outerW} · ${outerH} = ${outerW * outerH} square feet and the removed corner is ${cutW} · ${cutH} = ${cutW * cutH}, so the floor is ${outerW * outerH} − ${cutW * cutH} = ${answer} square feet.`,
        steps: [
          "Find the area of the complete rectangle.",
          "Find the area of the piece taken away.",
          "Subtract; do not shorten both dimensions at once.",
        ],
        principles: [
          "A composite region's area is a sum or difference of simple regions, chosen so that no part is counted twice.",
        ],
        hint: "Complete the rectangle, then take the notch out.",
        trap: "Reducing both side lengths instead of subtracting one rectangle.",
      };
    },
    (s, variant) => {
      const length = span(s, 12, 6, 4);
      const width = span(s, 5, 5, 3);
      const perimeter = 2 * (length + width);
      const answer = length * width;
      return {
        family: "area-from-perimeter-and-one-side",
        stem: `A rectangular garden has a perimeter of ${perimeter} feet and a length of ${length} feet. What is its area, in square feet?`,
        answer,
        wrong: [
          [round3(length * (perimeter / 2)), "This uses half the perimeter as the width; half the perimeter is the length plus the width."],
          [round3(length * (perimeter - 2 * length)), "This forgets to halve after removing the two lengths."],
          [perimeter, "This is the perimeter, in feet."],
          [round3(length * (perimeter / 4)), "This treats the garden as a square."],
          [width, "This is the width alone."],
        ],
        why: `Half the perimeter is ${perimeter / 2} = length + width, so the width is ${perimeter / 2} − ${length} = ${width}, and the area is ${length} · ${width} = ${answer} square feet.`,
        steps: [
          `Halve the perimeter: ${perimeter} ÷ 2 = ${perimeter / 2}.`,
          `Subtract the length to get the width: ${perimeter / 2} − ${length} = ${width}.`,
          "Multiply the two dimensions.",
        ],
        principles: ["Half a rectangle's perimeter equals the sum of its two different sides."],
        hint: "Halving the perimeter gives one length plus one width.",
        trap: "Using half the perimeter as the missing side.",
        verification: { kind: "product", inputs: [length, width], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const radius = span(s, 3, 6);
      const square = 4 * radius * radius;
      const coefficient = radius * radius;
      return {
        family: "shaded-region-circle-in-square",
        stem: `A circle of radius ${radius} is inscribed in a square, touching all four sides. What is the area of the region inside the square but outside the circle?`,
        answer: val(`${square} ${MINUS} ${coefficient}π`, square - Math.PI * coefficient),
        wrong: [
          [val(`${coefficient}π`, Math.PI * coefficient), "This is the circle's area alone."],
          [val(`${square}`, square), "This is the square's area alone."],
          [val(`${square} ${MINUS} ${2 * radius}π`, square - Math.PI * 2 * radius), "This subtracts the circle's circumference rather than its area."],
          [val(`${radius * radius} ${MINUS} ${coefficient}π`, radius * radius - Math.PI * coefficient), "This uses the radius, not the diameter, as the square's side."],
          [val(`${square} + ${coefficient}π`, square + Math.PI * coefficient), "This adds the two areas instead of subtracting."],
          [val(`${4 * radius} ${MINUS} ${coefficient}π`, 4 * radius - Math.PI * coefficient), "This uses the square's perimeter in place of its area."],
        ],
        why: `An inscribed circle has diameter equal to the square's side, so the side is ${2 * radius} and the square's area is ${square}. The circle covers π · ${radius}² = ${coefficient}π, leaving ${square} ${MINUS} ${coefficient}π.`,
        steps: [
          `Translate "inscribed" into a length: the side equals the diameter, ${2 * radius}.`,
          `Square it for the square's area: ${square}.`,
          `Subtract the circle's area π·${radius}² = ${coefficient}π.`,
        ],
        principles: [
          "An inscribed circle's diameter equals the containing square's side, which is the step that converts the radius into the outer figure's dimension.",
        ],
        hint: "The side of the square is not the radius.",
        trap: "Using the radius as the side of the square.",
      };
    },
    (s, variant) => {
      const small = span(s, 2, 4);
      const large = small + 1 + (s % 3);
      const area = span(s, 3, 5) * small * small;
      const answer = round3((area * large * large) / (small * small));
      return {
        family: "similar-figure-area-ratio",
        stem: `Two similar hexagons have corresponding side lengths in the ratio ${small} to ${large}. The smaller hexagon has an area of ${area} square centimeters. What is the area of the larger hexagon, in square centimeters?`,
        answer,
        wrong: [
          [round3((area * large) / small), "This scales the area by the ratio of the sides. Areas scale by the square of that ratio, because both dimensions stretch."],
          [round3(area + (large - small)), "This adds the difference of the ratio terms to the area."],
          [round3((area * small * small) / (large * large)), "This scales down instead of up."],
          [area, "This repeats the smaller area."],
          [round3(area * large * large), "This multiplies by the larger term squared without dividing by the smaller."],
        ],
        why: `Corresponding lengths are in ratio ${small}:${large}, so corresponding areas are in ratio ${small * small}:${large * large}. Then the larger area is ${area} · ${large * large}/${small * small} = ${num(answer)} square centimeters.`,
        steps: [
          "Square the linear ratio to get the area ratio.",
          `Form the factor ${large * large}/${small * small}.`,
          "Multiply the known area by that factor.",
        ],
        principles: [
          "In similar figures, areas scale as the square of the scale factor and volumes as its cube.",
        ],
        hint: "Both dimensions of the figure stretch, not just one.",
        trap: "Scaling area by the linear ratio.",
        verification: quotientCheck(area * large * large, small * small, answer),
      };
    },
  ],
};

SHAPES["measurement conversion"] = {
  Easy: [
    (s, variant) => {
      const unit = choose(s, UNITS);
      const count = span(s, 3, 6);
      const answer = count * unit.factor;
      return {
        family: "single-step-unit-conversion",
        stem: `There are ${unit.factor} ${unit.to} in one ${unit.from.replace(/s$/, "")}. How many ${unit.to} are in ${count} ${unit.from}?`,
        answer,
        wrong: [
          [round3(count / unit.factor), "This divides when converting to a smaller unit; a smaller unit needs more of them."],
          [count + unit.factor, "This adds the conversion factor instead of multiplying by it."],
          [count, "This repeats the original measurement."],
          [unit.factor, "This is the conversion factor by itself."],
          [answer + unit.factor, "This converts one unit too many."],
        ],
        why: `Each ${unit.from.replace(/s$/, "")} is ${unit.factor} ${unit.to}, so ${count} · ${unit.factor} = ${answer} ${unit.to}.`,
        steps: [
          "Decide whether the new unit is smaller or larger.",
          `Smaller unit means more of them, so multiply: ${count} · ${unit.factor}.`,
          "Check that the number grew.",
        ],
        principles: ["Converting to a smaller unit multiplies; converting to a larger unit divides."],
        hint: "Which unit is smaller?",
        verification: { kind: "product", inputs: [count, unit.factor], expected: answer },
      };
    },
    (s, variant) => {
      const yards = span(s, 2, 6);
      const answer = yards * 36;
      return {
        family: "two-step-length-conversion",
        stem: `A rope is ${yards} yards long. Given that 1 yard is 3 feet and 1 foot is 12 inches, how many inches long is the rope?`,
        answer,
        wrong: [
          [yards * 12, "This converts yards to feet and stops, or converts as if a yard were 12 inches."],
          [yards * 3, "This converts to feet only."],
          [yards * 15, "This adds the two factors instead of multiplying them."],
          [round3(answer / 3), "This applies only one of the two conversions."],
          [yards, "This repeats the length in yards."],
        ],
        why: `${yards} yards is ${yards} · 3 = ${yards * 3} feet, and ${yards * 3} · 12 = ${answer} inches.`,
        steps: [
          "Convert yards to feet by multiplying by 3.",
          "Convert feet to inches by multiplying by 12.",
          "Equivalently, multiply by 36 in one step.",
        ],
        principles: ["Chained conversions multiply their factors."],
        hint: "Two conversions, one after the other.",
        verification: { kind: "product", inputs: [yards, 3, 12], expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const feetPerSecond = span(s, 22, 6, 22);
      const answer = round3((feetPerSecond * 3600) / 5280);
      return {
        family: "rate-unit-conversion-fps-to-mph",
        stem: `An object moves at ${feetPerSecond} feet per second. Given that 1 mile is 5280 feet, what is its speed in miles per hour?`,
        answer,
        wrong: [
          [round3((feetPerSecond * 60) / 5280), "This converts seconds to minutes rather than to hours."],
          [round3((feetPerSecond * 5280) / 3600), "This multiplies by the feet-per-mile factor instead of dividing by it."],
          [feetPerSecond, "This leaves the rate in feet per second."],
          [round3(feetPerSecond * 3600), "This converts the time unit but never the distance unit."],
          [round3(feetPerSecond / 5280), "This converts feet to miles but leaves the time in seconds."],
        ],
        why: `${feetPerSecond} ft/s · 3600 s/h = ${feetPerSecond * 3600} ft/h, and ${feetPerSecond * 3600} ÷ 5280 = ${num(answer)} miles per hour.`,
        steps: [
          "Convert the time unit: multiply by 3600 seconds per hour.",
          "Convert the distance unit: divide by 5280 feet per mile.",
          "Confirm both units in the rate have changed.",
        ],
        principles: [
          "A rate carries two units, and both have to be converted before the answer is in the requested form.",
        ],
        hint: "Handle the numerator and the denominator separately.",
        trap: "Converting only one of the two units in the rate.",
        verification: quotientCheck(feetPerSecond * 3600, 5280, answer),
      };
    },
    (s, variant) => {
      const quarts = span(s, 3, 6);
      const answer = quarts * 32;
      return {
        family: "capacity-conversion-chain",
        stem: `A recipe calls for ${quarts} quarts of stock. Given that 1 quart is 2 pints and 1 pint is 16 fluid ounces, how many fluid ounces of stock are needed?`,
        answer,
        wrong: [
          [quarts * 2, "This converts quarts to pints and stops."],
          [quarts * 16, "This skips the quart-to-pint step."],
          [quarts * 18, "This adds the two factors rather than multiplying them."],
          [round3(answer / 2), "This applies only one of the two conversions."],
          [quarts, "This repeats the quantity in quarts."],
        ],
        why: `${quarts} quarts is ${quarts * 2} pints, and ${quarts * 2} · 16 = ${answer} fluid ounces.`,
        steps: [
          "Multiply by 2 to reach pints.",
          "Multiply by 16 to reach fluid ounces.",
          "Or combine the factors and multiply by 32 once.",
        ],
        principles: ["Successive conversions compose into a single multiplier."],
        hint: "Take it one unit at a time.",
        verification: { kind: "product", inputs: [quarts, 2, 16], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const width = span(s, 9, 5, 3);
      const length = span(s, 12, 5, 3);
      const answer = round3((width * length) / 9);
      return {
        family: "square-unit-conversion",
        stem: `A room measures ${width} feet by ${length} feet. Carpet is sold by the square yard. How many square yards of carpet cover the room exactly?`,
        answer,
        wrong: [
          [round3((width * length) / 3), "This divides by 3, the linear conversion. A square yard is 3 feet by 3 feet, so it holds 9 square feet, not 3."],
          [width * length, "This is the area in square feet."],
          [round3((width / 3) * length), "This converts only one of the two dimensions to yards."],
          [round3((width * length) / 27), "This uses the cubic conversion, 27 cubic feet per cubic yard."],
          [round3((width + length) / 3), "This converts a perimeter-like sum rather than an area."],
        ],
        why: `The room is ${width * length} square feet. One square yard is 3 ft · 3 ft = 9 square feet, so ${width * length} ÷ 9 = ${num(answer)} square yards. Checking the other way: ${num(width / 3)} yd · ${num(length / 3)} yd = ${num(answer)}.`,
        steps: [
          "Find the area in square feet first.",
          "Recognize that the area conversion factor is the linear factor squared: 3² = 9.",
          `Divide by 9, or convert both dimensions to yards and multiply.`,
        ],
        principles: [
          "Area conversions square the linear factor and volume conversions cube it.",
        ],
        hint: "How many square feet fit inside one square yard?",
        trap: "Dividing an area by the linear conversion factor.",
        verification: quotientCheck(width * length, 9, answer),
      };
    },
    (s, variant) => {
      const table = [288, 144, 432, 576, 720, 864];
      const perSecond = choose(s, table);
      const answer = round3((perSecond * 60) / 1728);
      return {
        family: "cubic-rate-conversion",
        stem: `A nozzle delivers ${perSecond} cubic inches of water per second. Given that 1 foot is 12 inches, how many cubic feet per minute is that?`,
        answer,
        wrong: [
          [round3((perSecond * 60) / 12), "This divides by the linear factor. A cubic foot is 12 inches cubed, or 1728 cubic inches."],
          [round3((perSecond * 60) / 144), "This uses the square conversion, 144 square inches per square foot."],
          [round3(perSecond / 1728), "This converts the volume unit but leaves the rate per second."],
          [round3(perSecond * 60), "This converts the time unit only."],
          [perSecond, "This repeats the given rate."],
        ],
        why: `Per minute the nozzle delivers ${perSecond} · 60 = ${perSecond * 60} cubic inches. One cubic foot is 12³ = 1728 cubic inches, so ${perSecond * 60} ÷ 1728 = ${num(answer)} cubic feet per minute.`,
        steps: [
          "Scale the rate from seconds to minutes by multiplying by 60.",
          "Cube the linear factor to convert volume: 12³ = 1728.",
          "Divide the cubic inches per minute by 1728.",
        ],
        principles: [
          "Converting a rate means converting both its units, and a volume unit changes by the cube of the linear factor.",
        ],
        hint: "1728, not 12, is the number of cubic inches in a cubic foot.",
        trap: "Applying the linear or square factor to a volume.",
        verification: quotientCheck(perSecond * 60, 1728, answer),
      };
    },
  ],
};

SHAPES["averages"] = {
  Easy: [
    (s, variant) => {
      const base = span(s, 6, 6, 2);
      const values = [base, base + 4, base + 2, base + 8, base + 6];
      const answer = values.reduce((sum, value) => sum + value, 0) / values.length;
      return {
        family: "mean-of-a-list",
        stem: choose(variant, [
          `What is the average (arithmetic mean) of ${values.join(", ")}?`,
          `Find the mean of the five numbers ${values.join(", ")}.`,
          `A tally records ${values.join(", ")}. What is the average of these five values?`,
          `The five readings ${values.join(", ")} were taken. What is their arithmetic mean?`,
        ]),
        answer,
        wrong: [
          [values.reduce((sum, value) => sum + value, 0), "This is the sum; the mean also divides by how many values there are."],
          [values[2], "This is one of the listed values, not their mean."],
          [round3(values.reduce((sum, value) => sum + value, 0) / (values.length - 1)), "This divides by one value too few."],
          [round3(values.reduce((sum, value) => sum + value, 0) / (values.length + 1)), "This divides by one value too many."],
          [Math.max(...values), "This is the largest value."],
        ],
        why: `The five values add to ${values.reduce((sum, value) => sum + value, 0)}, and ${values.reduce((sum, value) => sum + value, 0)} ÷ 5 = ${num(answer)}.`,
        steps: ["Add all five values.", "Divide the sum by 5.", "Check the result lies between the smallest and largest."],
        principles: ["The arithmetic mean is the sum divided by the count."],
        hint: "Add first, then divide by how many there are.",
        verification: { kind: "mean", inputs: values, expected: answer },
      };
    },
    (s, variant) => {
      const scores = [span(s, 72, 6, 2), span(s, 80, 5, 3), span(s, 88, 4, 2), span(s, 91, 4, 2)];
      const total = scores.reduce((sum, value) => sum + value, 0);
      const answer = round3(total / scores.length);
      return {
        family: "mean-of-test-scores",
        stem: `A student's four test scores are ${scores.join(", ")}. What is the student's average score?`,
        answer,
        wrong: [
          [total, "This is the total of the scores, not their average."],
          [round3(total / 3), "This divides by three tests instead of four."],
          [Math.max(...scores), "This is the highest score."],
          [Math.min(...scores), "This is the lowest score."],
          [round3((Math.max(...scores) + Math.min(...scores)) / 2), "This averages only the extreme scores."],
        ],
        why: `The four scores add to ${total}, so the average is ${total} ÷ 4 = ${num(answer)}.`,
        steps: ["Add the four scores.", "Divide by 4.", "Confirm the average sits inside the range of scores."],
        principles: ["An average distributes the total equally across the count."],
        hint: "Every score counts once.",
        verification: { kind: "mean", inputs: scores, expected: answer },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const known = [span(s, 74, 5, 3), span(s, 81, 5, 2), span(s, 88, 4, 2)];
      const target = span(s, 84, 5, 2);
      const answer = 4 * target - known.reduce((sum, value) => sum + value, 0);
      return {
        family: "missing-score-for-target-mean",
        stem: `A student has scored ${known.join(", ")} on three tests. What score on a fourth test would make the average of all four tests exactly ${target}?`,
        answer,
        wrong: [
          [target, "This is the target average, which the fourth score only equals when the first three already average to it."],
          [round3(4 * target - known.reduce((sum, value) => sum + value, 0) - target), "This subtracts the target one extra time."],
          [round3(3 * target - known.reduce((sum, value) => sum + value, 0)), "This uses three tests in the total instead of four."],
          [known.reduce((sum, value) => sum + value, 0), "This is the total of the first three scores."],
          [round3(target - known.reduce((sum, value) => sum + value, 0) / 3), "This compares the target to the current average without accounting for the fourth test's weight."],
        ],
        why: `Four tests averaging ${target} need a total of 4 · ${target} = ${4 * target}. The first three total ${known.reduce((sum, value) => sum + value, 0)}, so the fourth must be ${4 * target} − ${known.reduce((sum, value) => sum + value, 0)} = ${answer}.`,
        steps: [
          `Turn the target average into a required total: 4 · ${target} = ${4 * target}.`,
          "Add the scores already earned.",
          "Subtract to find what is still needed.",
        ],
        principles: ["Work with totals, not averages, when a new value is being added."],
        hint: "What total do four tests need?",
        trap: "Answering with the target average itself.",
        verification: {
          kind: "linear-equation",
          inputs: [1, known.reduce((sum, value) => sum + value, 0), 4 * target],
          expected: answer,
        },
      };
    },
    (s, variant) => {
      const n1 = span(s, 10, 5, 2);
      const n2 = span(s, 15, 5, 3);
      const m1 = span(s, 70, 5, 2);
      const m2 = m1 + span(s, 6, 4, 3);
      const answer = round3((n1 * m1 + n2 * m2) / (n1 + n2));
      return {
        family: "weighted-average-of-two-groups",
        stem: `One class of ${n1} students averaged ${m1} on a test and another class of ${n2} students averaged ${m2}. What is the average score of all ${n1 + n2} students combined?`,
        answer,
        wrong: [
          [round3((m1 + m2) / 2), "This averages the two class averages, which is correct only when the classes are the same size."],
          [m2, "This is the larger class average."],
          [m1, "This is the smaller class average."],
          [round3((n1 * m1 + n2 * m2) / 2), "This divides the combined total by 2 rather than by the number of students."],
          [n1 * m1 + n2 * m2, "This is the combined point total, not an average."],
        ],
        why: `The two classes score ${n1 * m1} and ${n2 * m2} points, a total of ${n1 * m1 + n2 * m2} across ${n1 + n2} students: ${n1 * m1 + n2 * m2} ÷ ${n1 + n2} = ${num(answer)}.`,
        steps: [
          "Convert each average back into a total by multiplying by the group size.",
          "Add the totals and add the group sizes.",
          "Divide the combined total by the combined count.",
        ],
        principles: [
          "A combined average weights each group by its size, so it lies nearer the average of the larger group.",
        ],
        hint: "The larger class pulls the combined average toward itself.",
        trap: "Averaging the two averages.",
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const count = span(s, 5, 4);
      const mean = span(s, 20, 5, 4);
      const restMean = mean + 1 + (s % 2);
      const answer = count * mean - (count - 1) * restMean;
      return {
        family: "value-removed-changes-the-mean",
        stem: `The average of ${count} numbers is ${mean}. When one of the numbers is removed, the average of the remaining ${count - 1} numbers is ${restMean}. What was the number that was removed?`,
        answer,
        wrong: [
          [round3(count * restMean - (count - 1) * mean), "This pairs each average with the other's count, reversing the roles of the two totals."],
          [mean, "This is the original average, not the value removed."],
          [restMean, "This is the new average."],
          [round3(count * mean - count * restMean), `This keeps ${count} numbers in the second total, but only ${count - 1} remain after the removal.`],
          [count * mean, "This is the original sum of all the numbers."],
          [(count - 1) * restMean, "This is the sum of the numbers that stayed."],
        ],
        why: `The original total is ${count} · ${mean} = ${count * mean} and the remaining total is ${count - 1} · ${restMean} = ${(count - 1) * restMean}. The removed number is the difference, ${count * mean} − ${(count - 1) * restMean} = ${num(answer)}. Removing a number below the mean raises the average, which matches ${restMean} being larger than ${mean}.`,
        steps: [
          `Reconstruct the first total: ${count} · ${mean} = ${count * mean}.`,
          `Reconstruct the second total with one fewer value: ${count - 1} · ${restMean} = ${(count - 1) * restMean}.`,
          "Subtract the totals, not the averages.",
        ],
        principles: [
          "An average only combines with another after both are converted back into totals with their own counts.",
        ],
        hint: "Each average hides a different count.",
        trap: "Subtracting the two averages directly.",
        verification: {
          kind: "linear-equation",
          inputs: [1, (count - 1) * restMean, count * mean],
          expected: answer,
        },
      };
    },
    (s, variant) => {
      const taken = span(s, 4, 4);
      const current = span(s, 76, 5, 2);
      const extra = span(s, 2, 3);
      const target = current + span(s, 2, 4);
      const answer = round3(((taken + extra) * target - taken * current) / extra);
      return {
        family: "scores-needed-to-raise-a-mean",
        stem: `A student has taken ${taken} tests and has an average of ${current}. The student will take ${extra} more tests and wants an average of ${target} over all ${taken + extra} tests. What score, the same on each remaining test, is required?`,
        answer,
        wrong: [
          [target, "This is the desired overall average; because the existing scores sit below it, the remaining tests have to score higher to pull the mean up."],
          [round3(target + (target - current)), "This adds the gap once, which would work only if there were exactly as many new tests as old ones."],
          [round3(((taken + extra) * target - taken * current) / taken), "This divides by the tests already taken instead of the ones remaining."],
          [round3((taken + extra) * target - taken * current), "This is the total still needed across all remaining tests, not the score on each."],
          [current, "This is the current average."],
        ],
        why: `All ${taken + extra} tests must total ${taken + extra} · ${target} = ${(taken + extra) * target}. The ${taken} tests so far total ${taken * current}, leaving ${(taken + extra) * target - taken * current} points across ${extra} test${extra === 1 ? "" : "s"}: ${num(answer)} each.`,
        steps: [
          "Find the total the target average requires over every test.",
          "Subtract the points already earned.",
          `Divide the shortfall by the ${extra} remaining test${extra === 1 ? "" : "s"}.`,
        ],
        principles: [
          "Raising an average requires the new values to exceed the target by enough to offset every value already below it.",
        ],
        hint: "The remaining tests must beat the target, not match it.",
        trap: "Assuming each remaining test only has to score the target.",
      };
    },
  ],
};

SHAPES["financial contexts"] = {
  Easy: [
    (s, variant) => {
      const price = span(s, 20, 6, 10);
      const rate = choose(s, [5, 6, 8, 10]);
      const answer = money(round3(price * (1 + rate / 100)));
      return {
        family: "price-plus-sales-tax",
        stem: `A jacket costs ${price} before tax. With a sales tax of ${rate}%, what is the total cost?`,
        answer,
        wrong: [
          [money(round3((price * rate) / 100)), "This is the tax alone, not the total."],
          [money(price), "This is the price before tax."],
          [money(price + rate), "This adds the percent as dollars."],
          [money(round3(price * (1 - rate / 100))), "This subtracts the tax instead of adding it."],
          [money(round3(price * rate)), "This multiplies by the percent without dividing by 100."],
        ],
        why: `The tax is ${rate}% of ${price} = ${num(round3((price * rate) / 100))}, so the total is ${price} + ${num(round3((price * rate) / 100))} = ${num(round3(price * (1 + rate / 100)))}.`,
        steps: [
          `Compute the tax: ${rate}% of ${price}.`,
          "Add the tax to the price.",
          "Equivalently multiply the price by 1 plus the rate.",
        ],
        principles: ["Adding a percent multiplies by 1 plus that percent."],
        hint: "The total is more than the ticket price.",
        verification: { kind: "percent-of", inputs: [price, 100 + rate], expected: round3((price * (100 + rate)) / 100) },
      };
    },
    (s, variant) => {
      const price = span(s, 40, 6, 20);
      const rate = choose(s, [10, 15, 20, 25]);
      const answer = money(round3(price * (1 - rate / 100)));
      return {
        family: "sale-price-after-discount",
        stem: `A lamp regularly priced at ${price} is on sale for ${rate}% off. What is the sale price?`,
        answer,
        wrong: [
          [money(round3((price * rate) / 100)), "This is the amount saved, not the price paid."],
          [money(price), "This is the regular price."],
          [money(price - rate), "This subtracts the percent as dollars."],
          [money(round3(price * (1 + rate / 100))), "This adds the percent instead of removing it."],
          [money(round3(price / (1 - rate / 100))), "This divides by the discount factor, undoing a discount rather than applying one."],
        ],
        why: `Paying is what is left after the discount: ${100 - rate}% of ${price} = ${num(round3((price * (100 - rate)) / 100))}.`,
        steps: [
          `The customer pays ${100 - rate}% of the price.`,
          `Multiply: ${price} · ${num((100 - rate) / 100)}.`,
          "Check the result is below the regular price.",
        ],
        principles: ["A p% discount leaves (100 − p)% of the original price."],
        hint: "Compute what is paid, not what is saved.",
        verification: { kind: "percent-of", inputs: [price, 100 - rate], expected: round3((price * (100 - rate)) / 100) },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const principal = span(s, 400, 6, 200);
      const rate = choose(s, [3, 4, 5, 6]);
      const years = span(s, 2, 4);
      const interest = round3((principal * rate * years) / 100);
      return {
        family: "simple-interest",
        stem: `${principal} is deposited in an account paying ${rate}% simple annual interest. How much interest does the account earn in ${years} years?`,
        answer: money(interest),
        wrong: [
          [money(round3((principal * rate) / 100)), "This is one year's interest."],
          [money(round3(principal + interest)), "This is the balance, not the interest earned."],
          [money(round3(principal * rate * years)), "This never divides the percent by 100."],
          [money(round3((principal * years) / 100)), "This drops the interest rate."],
          [money(principal), "This is the original deposit."],
        ],
        why: `Simple interest is principal · rate · time: ${principal} · ${num(rate / 100)} · ${years} = ${num(interest)}.`,
        steps: [
          `Find one year's interest: ${rate}% of ${principal} = ${num((principal * rate) / 100)}.`,
          `Multiply by ${years} years, since simple interest does not compound.`,
          "Answer the question asked — interest, not balance.",
        ],
        principles: ["Simple interest earns the same amount each year, on the original principal only."],
        hint: "Each year earns the same interest.",
        trap: "Reporting the account balance instead of the interest.",
        verification: { kind: "product", inputs: [principal, rate / 100, years], expected: interest },
      };
    },
    (s, variant) => {
      const base = span(s, 300, 5, 100);
      const rate = choose(s, [4, 5, 8, 10]);
      const target = base + span(s, 200, 5, 100);
      const answer = round3(((target - base) * 100) / rate);
      return {
        family: "commission-to-reach-a-target",
        stem: `A salesperson earns ${base} per week plus a ${rate}% commission on sales. What must the week's sales total be for the weekly earnings to reach ${target}?`,
        answer: money(answer),
        wrong: [
          [money(target - base), "This is the commission that must be earned, not the sales that generate it."],
          [money(round3(target / (rate / 100))), "This ignores the base pay and converts the entire target into commission."],
          [money(round3(((target - base) * rate) / 100)), "This multiplies by the rate instead of dividing by it."],
          [money(target), "This is the earnings target, not the sales figure."],
          [money(base), "This is the base pay."],
        ],
        why: `Commission must supply ${target} − ${base} = ${target - base}. Since commission is ${rate}% of sales, sales = ${target - base} ÷ ${num(rate / 100)} = ${num(answer)}.`,
        steps: [
          "Subtract the base pay to find the commission required.",
          `Divide by the commission rate ${num(rate / 100)}, because the sales figure is the larger number.`,
          "Check by taking the commission of your answer and adding the base.",
        ],
        principles: [
          "Recovering the base of a percent divides by the rate; multiplying goes the wrong direction.",
        ],
        hint: "Sales are much larger than the commission they produce.",
        trap: "Multiplying by the commission rate instead of dividing.",
        verification: quotientCheck((target - base) * 100, rate, answer),
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const principal = span(s, 1000, 6, 500);
      const rate = choose(s, [5, 10, 20, 4]);
      const years = span(s, 2, 3);
      const compound = round3(principal * (1 + rate / 100) ** years);
      const simple = round3(principal * (1 + (rate * years) / 100));
      return {
        family: "compound-interest-balance",
        stem: `${principal} is invested at ${rate}% annual interest compounded once per year. What is the balance after ${years} years, to the nearest cent?`,
        answer: money(compound),
        wrong: [
          [money(simple), `This applies ${rate * years}% once, which is simple interest. Compounding pays interest on the interest already credited, so the balance is higher.`],
          [money(round3(compound - principal)), "This is the interest earned, not the balance."],
          [money(round3(principal * (1 + rate / 100))), "This compounds for one year only."],
          [money(principal), "This is the amount originally invested."],
          [money(round3(principal * (rate / 100) ** years)), "This raises the rate to a power instead of the growth factor."],
        ],
        why: `Each year multiplies the balance by ${num(1 + rate / 100)}, so after ${years} years the balance is ${principal} · ${num(1 + rate / 100)}^${years} = ${num(compound)}. Simple interest would give only ${num(simple)}.`,
        steps: [
          `Write the growth factor: 1 + ${rate}/100 = ${num(1 + rate / 100)}.`,
          `Raise it to the number of compounding periods: ${years}.`,
          "Multiply by the principal and round to cents.",
        ],
        principles: [
          "Compound growth is repeated multiplication by the same factor, so it always exceeds simple interest over more than one period.",
        ],
        hint: "The second year's interest is computed on a larger balance.",
        trap: "Multiplying the annual rate by the number of years.",
      };
    },
    (s, variant) => {
      const table = [
        [40, 12, 10, 15],
        [60, 8, 20, 12],
        [30, 15, 12, 20],
        [50, 10, 25, 15],
        [80, 6, 20, 12],
        [45, 20, 15, 25],
      ];
      const [feeA, rateA, feeB, rateB] = choose(s, table);
      const answer = round3((feeA - feeB) / (rateB - rateA));
      const totalAtCross = round3(feeA + rateA * answer);
      return {
        family: "two-plan-break-even",
        stem: `Plan A charges a ${feeA} membership fee plus ${rateA} per class. Plan B charges a ${feeB} fee plus ${rateB} per class. For how many classes do the two plans cost the same amount?`,
        answer,
        wrong: [
          [round3(feeA - feeB), "This is the difference of the fees; it still has to be spread across the difference in the per-class rates."],
          [round3(rateB - rateA), "This is the difference of the per-class rates."],
          [totalAtCross, "This is the cost at the break-even point, not the number of classes."],
          [round3((feeA + feeB) / (rateA + rateB)), "This adds the fees and the rates rather than comparing them."],
          [round3((feeA - feeB) / rateB), "This divides by one rate instead of by the gap between the rates."],
        ],
        why: `Setting ${feeA} + ${rateA}n = ${feeB} + ${rateB}n gives ${feeA - feeB} = (${rateB} − ${rateA})n, so n = ${feeA - feeB} ÷ ${rateB - rateA} = ${num(answer)} classes. Both plans then cost ${num(totalAtCross)}.`,
        steps: [
          "Write a cost expression for each plan in terms of the number of classes.",
          "Set the two expressions equal to each other.",
          "Collect the class terms on one side and divide by their coefficient.",
        ],
        principles: [
          "Two linear cost models meet where the difference in fixed cost is exactly repaid by the difference in per-unit cost.",
        ],
        hint: "The plan with the bigger fee has the smaller per-class charge.",
        trap: "Answering with the shared cost rather than the number of classes.",
        verification: quotientCheck(feeA - feeB, rateB - rateA, answer),
      };
    },
  ],
};

SHAPES["combined concepts"] = {
  Easy: [
    (s, variant) => {
      const percent = choose(s, [10, 20, 25, 40]);
      const perBox = choose(s, [6, 8, 10, 12]);
      const answer = span(s, 5, 6);
      const sold = perBox * answer;
      const total = (sold * 100) / percent;
      return {
        family: "percent-then-rate-two-step",
        stem: `A warehouse holds ${total} mugs, and ${percent}% of them are shipped out. The shipped mugs are packed ${perBox} to a box. How many boxes are used?`,
        answer,
        wrong: [
          [sold, "This is the number of mugs shipped, not the number of boxes."],
          [round3(total / perBox), "This packs every mug in the warehouse, not just the shipped ones."],
          [percent, "This repeats the percent."],
          [round3(sold * perBox), "This multiplies by the box size instead of dividing by it."],
          [total, "This is the whole inventory."],
        ],
        why: `${percent}% of ${total} is ${num(sold)} mugs, and ${num(sold)} ÷ ${perBox} = ${num(answer)} boxes.`,
        steps: [
          `Take the percent first: ${percent}% of ${total} = ${num(sold)}.`,
          `Divide by ${perBox} mugs per box.`,
          "Check that the final unit is boxes.",
        ],
        principles: ["Multi-step problems finish in the unit the question names."],
        hint: "Two steps: a percent, then a division.",
        verification: quotientCheck(sold, perBox, answer),
      };
    },
    (s, variant) => {
      const feet = span(s, 6, 6, 3);
      const costPerInch = span(s, 2, 4);
      const inches = feet * 12;
      const answer = money(inches * costPerInch);
      return {
        family: "convert-then-price",
        stem: `Ribbon costs ${costPerInch} per inch. How much does ${feet} feet of ribbon cost, given that 1 foot is 12 inches?`,
        answer,
        wrong: [
          [money(feet * costPerInch), "This prices the ribbon by the foot at the per-inch rate."],
          [money(inches), "This treats each inch as costing one dollar."],
          [money(round3((feet * costPerInch) / 12)), "This divides by 12 when converting feet to inches; there are more inches than feet."],
          [money(costPerInch), "This is the price of a single inch."],
          [money(inches + costPerInch), "This adds the rate to the length."],
        ],
        why: `${feet} feet is ${feet} · 12 = ${inches} inches, and ${inches} · ${costPerInch} = ${inches * costPerInch}.`,
        steps: [
          "Convert the length into the unit the price uses.",
          `Multiply the inches by the per-inch cost: ${inches} · ${costPerInch}.`,
          "Confirm the price matches the stated unit.",
        ],
        principles: ["A rate can only be applied once the quantity is in the rate's unit."],
        hint: "The price is per inch, but the length is in feet.",
        verification: { kind: "product", inputs: [inches, costPerInch], expected: inches * costPerInch },
      };
    },
  ],
  Medium: [
    (s, variant) => {
      const length = span(s, 12, 5, 4);
      const height = span(s, 8, 4, 2);
      const coverage = choose(s, [40, 50, 60, 80]);
      const area = length * height;
      const answer = Math.ceil(area / coverage);
      return {
        family: "area-then-coverage-rate",
        stem: `A wall is ${length} feet long and ${height} feet high. One can of paint covers ${coverage} square feet, and paint is sold only in whole cans. How many cans are needed to cover the wall?`,
        answer,
        wrong: [
          [area, "This is the wall's area in square feet, not a number of cans."],
          [Math.floor(area / coverage) === answer ? answer + 2 : Math.floor(area / coverage), "This rounds the number of cans down, leaving part of the wall unpainted."],
          [round3(area / coverage) === answer ? answer + 3 : round3(area / coverage), "This reports a fractional number of cans, but paint is sold in whole cans."],
          [coverage, "This is one can's coverage."],
          [round3((length + height) / coverage) === answer ? answer + 4 : Math.ceil((2 * (length + height)) / coverage), "This uses the wall's perimeter instead of its area."],
        ],
        why: `The wall is ${length} · ${height} = ${area} square feet. Each can covers ${coverage}, so ${area} ÷ ${coverage} = ${num(round3(area / coverage))} cans are needed, and buying whole cans means ${answer}.`,
        steps: [
          "Find the area to be covered.",
          "Divide by the coverage of one can.",
          "Round up, since a partial can still has to be bought.",
        ],
        principles: [
          "When a quantity must be bought whole, the division is followed by rounding up, not to the nearest.",
        ],
        hint: "A leftover fraction of a wall still needs a full can.",
        trap: "Rounding the number of cans down or leaving it fractional.",
      };
    },
    (s, variant) => {
      const parts1 = span(s, 2, 4);
      const parts2 = parts1 + 1 + (s % 3);
      const scale = span(s, 8, 5, 4);
      const total = (parts1 + parts2) * scale;
      const percent = choose(s, [25, 50, 20, 75]);
      const larger = parts2 * scale;
      const answer = round3((larger * percent) / 100);
      return {
        family: "ratio-then-percent",
        stem: `A collection of ${total} stamps is split between two albums in the ratio ${parts1} to ${parts2}. Of the stamps in the larger album, ${percent}% are foreign. How many foreign stamps are in the larger album?`,
        answer,
        wrong: [
          [larger, "This is the number of stamps in the larger album, before the percent is applied."],
          [round3((total * percent) / 100), `This takes ${percent}% of the whole collection instead of the larger album only.`],
          [round3((parts1 * scale * percent) / 100), "This applies the percent to the smaller album."],
          [total, "This is the size of the whole collection."],
          [percent, "This repeats the percent."],
        ],
        why: `The ratio makes ${parts1 + parts2} shares of ${scale} stamps, so the larger album holds ${parts2} · ${scale} = ${larger}. Then ${percent}% of ${larger} is ${num(answer)}.`,
        steps: [
          `Divide the collection into ${parts1 + parts2} shares of ${scale} stamps.`,
          `Multiply the larger term by the share size: ${parts2} · ${scale} = ${larger}.`,
          "Apply the percent to that album, not to the whole collection.",
        ],
        principles: ["Each step of a chain applies to the quantity produced by the previous step."],
        hint: "The percent belongs to one album only.",
        trap: "Applying the percent to the full collection.",
        verification: { kind: "percent-of", inputs: [larger, percent], expected: answer },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const table = [
        [6, 12, 4, 9, 8],
        [4, 10, 5, 12, 6],
        [8, 16, 6, 12, 12],
        [5, 15, 6, 20, 10],
        [10, 20, 8, 16, 16],
        [3, 9, 6, 12, 6],
      ];
      const [workers, miles, days, newMiles, newWorkers] = choose(s, table);
      const answer = round3((days * newMiles * workers) / (miles * newWorkers));
      return {
        family: "combined-direct-and-inverse-variation",
        stem: `A crew of ${workers} workers paves ${miles} miles of road in ${days} days. Working at the same rate per worker, how many days would ${newWorkers} workers need to pave ${newMiles} miles?`,
        answer,
        wrong: [
          [round3((days * newMiles) / miles), "This scales for the change in distance but ignores the change in crew size."],
          [round3((days * workers) / newWorkers), "This scales for the crew size but ignores the change in distance."],
          [round3((days * newMiles * newWorkers) / (miles * workers)), "This treats more workers as needing more days; extra workers cut the time."],
          [days, "This repeats the original number of days."],
          [round3(days + newMiles - miles), "This adjusts the days by the difference in miles rather than by their ratio."],
        ],
        why: `One worker paves ${num(miles / (workers * days))} miles per day. Then ${newWorkers} workers pave ${num((newWorkers * miles) / (workers * days))} miles per day, so ${newMiles} miles take ${newMiles} ÷ ${num((newWorkers * miles) / (workers * days))} = ${num(answer)} days. Equivalently, days scale directly with the miles (× ${num(newMiles / miles)}) and inversely with the crew (× ${num(workers / newWorkers)}).`,
        steps: [
          "Reduce the given data to a per-worker, per-day rate.",
          "Scale the rate up to the new crew size.",
          "Divide the new distance by that rate.",
        ],
        principles: [
          "Time varies directly with the amount of work and inversely with the number of workers, so both factors have to be applied and in opposite directions.",
        ],
        hint: "More workers means fewer days; more miles means more days.",
        trap: "Applying only one of the two changes, or applying both in the same direction.",
        verification: quotientCheck(days * newMiles * workers, miles * newWorkers, answer),
      };
    },
    (s, variant) => {
      const table = [
        [10, 20, 60, 30],
        [12, 30, 70, 50],
        [8, 25, 65, 45],
        [20, 10, 50, 40],
        [15, 40, 80, 60],
        [6, 30, 90, 50],
      ];
      const [volumeA, percentA, percentB, target] = choose(s, table);
      const answer = round3((volumeA * (target - percentA)) / (percentB - target));
      return {
        family: "two-solution-mixture-alligation",
        stem: `A ${volumeA}-liter solution is ${percentA}% salt. How many liters of a ${percentB}% salt solution must be mixed with it to produce a solution that is ${target}% salt?`,
        answer,
        wrong: [
          [round3((volumeA * (target - percentA)) / percentB), "This divides by the stronger solution's concentration rather than by how far it exceeds the target."],
          [volumeA, "This assumes equal volumes, which only reaches the target when the target is midway between the two concentrations."],
          [round3(target - percentA), "This is a difference of percents, not a volume."],
          [round3((volumeA * (percentB - target)) / (target - percentA)), "This inverts the ratio, adding less of the stronger solution than is needed."],
          [round3((volumeA * target) / 100), "This is a percent of the starting volume."],
        ],
        why: `Let x be the liters added. Salt balances as ${num(percentA / 100)}·${volumeA} + ${num(percentB / 100)}·x = ${num(target / 100)}·(${volumeA} + x). Solving gives x = ${volumeA}(${target} − ${percentA}) ÷ (${percentB} − ${target}) = ${num(answer)} liters. In alligation terms, the volumes are in inverse ratio to the distances from the target: ${target - percentA} against ${percentB - target}.`,
        steps: [
          "Write the total salt on each side of the mix as a percent of a volume.",
          "Set the salt before mixing equal to the salt after mixing.",
          "Solve the linear equation, keeping x in both the salt and the volume terms.",
        ],
        principles: [
          "In a mixture, the two volumes are inversely proportional to their distances from the target concentration.",
        ],
        hint: "The target lies between the two concentrations; the closer one contributes more volume.",
        trap: "Treating the mix as an unweighted average of the two concentrations.",
      };
    },
  ],
};

/* @@SHAPES@@ */

const nextAnswerPosition = mirrorAnswerPlanner();

// Each shape is reused a handful of times across the bank. Content validation
// rejects two stems whose word sets overlap by 90% or more, and one- or
// two-digit numbers are not counted as words, so a shape that only changes its
// numbers reads as a duplicate. Shapes therefore receive the number of times
// they have already been accepted and use it to rotate wording, which also
// stops the bank from shipping the same sentence five times over.
const shapeUses = new Map();

// Every stem the section has already emitted. A shape's parameters cycle, so
// two uses that land on congruent sequences would otherwise print the same
// sentence twice — that is where the previous rebuild's 63 exact duplicates
// came from. A stem that has been seen is not rejected outright; the variant
// is advanced first, which is what the wording rotations exist for, and only
// then does the search move on to the next shape.
const emittedStems = new Set();
const VARIANT_ATTEMPTS = 12;

function generate({ sequence, task }) {
  const tier = task.difficulty;
  const registry = SHAPES[task.subskill];
  if (!registry) {
    throw new Error(`No ACT Mathematics generator for ${task.skill}/${task.subskill}`);
  }
  const shapes = registry[tier];
  if (!shapes || shapes.length === 0) {
    throw new Error(`No ${tier} shapes for ${task.subskill}`);
  }
  const index = nextAnswerPosition(tier, `${SECTION_KEY}-${sequence}`);
  const offset = hashString(`${SECTION_KEY}-${sequence}-shape`) % shapes.length;
  let unordered = null;
  let duplicate = null;

  for (let step = 0; step < shapes.length; step += 1) {
    const position = (offset + step) % shapes.length;
    const key = `${task.subskill}|${tier}|${position}`;
    const base = shapeUses.get(key) || 0;
    for (let attempt = 0; attempt < VARIANT_ATTEMPTS; attempt += 1) {
      const variant = base + attempt;
      const spec = shapes[position](sequence, variant);
      const fresh = !emittedStems.has(spec.stem);
      const built = assemble(spec, tier, index);
      const candidate = { question: built.question, stem: spec.stem, key, variant };
      if (fresh && built.ordered) return accept(candidate);
      if (fresh && !unordered) unordered = candidate;
      if (!fresh && !duplicate) duplicate = candidate;
      if (!fresh) break;
    }
  }

  // A fresh stem whose choices could not be ordered around the planned answer
  // position beats a repeated one; ascending choices are cosmetic, a duplicate
  // question is not.
  const chosen = unordered || duplicate;
  if (!chosen) throw new Error(`No usable ${tier} shape for ${task.subskill}`);
  return accept(chosen);
}

function accept({ question, stem, key, variant }) {
  emittedStems.add(stem);
  shapeUses.set(key, variant + 1);
  return question;
}

if (require.main === module) {
  const completed = generateSection(SECTION_KEY, generate, {
    generatorName: GENERATOR_NAME,
    regenerateGenerated: REBUILD,
  });
  console.log(
    `ACT Mathematics: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
  );
}

module.exports = { SHAPES, generate };
