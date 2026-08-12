#!/usr/bin/env node
"use strict";

const { generateSection, hashString, rotate } = require("./lib/generation");
const { loadBank } = require("./lib/content");
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
        stem: choose(variant, [
          `What is the greatest common factor of ${smaller} and ${larger}?`,
          `Which number is the largest integer that divides both ${smaller} and ${larger} exactly?`,
          `${smaller} and ${larger} share a greatest common factor equal to what?`,
          `The greatest common divisor of ${smaller} and ${larger} is which value?`,
        ]),
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
    (s) => {
      const divisor = 4 + (s % 6);
      const quotient = 25 + ((s * 3) % 9);
      const remainder = 1 + ((s * 5) % (divisor - 1));
      const total = divisor * quotient + remainder;
      return {
        family: "remainder-of-division",
        stem: `What is the remainder when ${total} is divided by ${divisor}?`,
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
    (s) => {
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
    (s) => {
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
          `The first term of an arithmetic sequence is ${first}, and each term after the first is ${step} greater than the term before it. What is the sum of the first ${count} terms?`,
          `An arithmetic sequence begins at ${first} and grows by ${step} at every step. What is the total of its first ${count} terms?`,
          `In an arithmetic sequence, a₁ = ${first} and the common difference is ${step}. What is the sum of the first ${count} terms?`,
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
      const a = 5 + (s % 8);
      const b = 2 + (s % 6);
      const c = 1 + (s % 5);
      const d = 3 + (s % 7);
      return {
        family: "complex-difference",
        stem: choose(variant, [
          `What is (${a} + ${b}i) ${MINUS} (${c} + ${d}i)?`,
          `Which expression equals the difference (${a} + ${b}i) ${MINUS} (${c} + ${d}i)?`,
          `Written in a + bi form, (${a} + ${b}i) ${MINUS} (${c} + ${d}i) equals what?`,
          `Subtracting (${c} + ${d}i) from (${a} + ${b}i) leaves which complex number?`,
        ]),
        answer: cplx(a - c, b - d),
        wrong: [
          [cplx(a + c, b + d), "This adds the two complex numbers instead of subtracting the second one."],
          [cplx(a - c, d - b), "This subtracts the imaginary parts in the wrong order."],
          [cplx(a - c, b + d), "This distributes the subtraction to the real part only; it applies to both parts."],
          [cplx(a - d, b - c), "This pairs the real part with the imaginary coefficient of the other number."],
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
        stem: choose(variant, [
          `What is (${a} + ${b}i)(${c} + ${d}i)?`,
          `Which expression equals the product (${a} + ${b}i)(${c} + ${d}i)?`,
          `Written in a + bi form, (${a} + ${b}i)(${c} + ${d}i) equals what?`,
          `Multiplying (${a} + ${b}i) by (${c} + ${d}i) gives which complex number?`,
        ]),
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
        stem: choose(variant, [
          `If (${a} + ${b}i)² is written in the form x + yi, what is the value of x?`,
          `Squaring ${a} + ${b}i gives a complex number x + yi. Which number is x?`,
          `In the standard form of (${a} + ${b}i)², the real part equals what?`,
          `The expression (${a} + ${b}i)² has a real part of which value?`,
        ]),
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
    (s) => {
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
        stem: choose(variant, [
          `In the complex plane, what is the distance from the origin to the point that represents ${legA} ${MINUS} ${legB}i?`,
          `A point in the complex plane represents ${legA} ${MINUS} ${legB}i. How far is it from the origin?`,
          `What is the modulus |${legA} ${MINUS} ${legB}i|?`,
          `Plotted as a point, ${legA} ${MINUS} ${legB}i lies at which distance from 0?`,
        ]),
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
        stem: choose(variant, [
          `A measurement of ${amount} ${unit.from} is equivalent to how many ${unit.to}?`,
          `Convert ${amount} ${unit.from} into ${unit.to}.`,
          `How many ${unit.to} are in ${amount} ${unit.from}?`,
          `A quantity recorded as ${amount} ${unit.from} equals what number of ${unit.to}?`,
        ]),
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
        stem: choose(variant, [
          `Rewriting ${amount} ${unit.to} in the larger unit gives how many ${unit.from}?`,
          `${amount} ${unit.to} is the same as what number of ${unit.from}?`,
          `Express ${amount} ${unit.to} in ${unit.from}.`,
          `A reading of ${amount} ${unit.to} corresponds to which measurement in ${unit.from}?`,
        ]),
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
      const mover = choose(variant, ["train", "tram", "cargo drone", "ferry"]);
      const answer = speed / 3.6;
      return {
        family: "speed-unit-conversion",
        stem: `A ${mover} travels at ${speed} kilometres per hour. What is that speed in metres per second?`,
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
      const liquid = choose(variant, ["stock", "cider", "buttermilk", "tomato purée"]);
      const answer = (cupsPerBatch * batches) / 4;
      return {
        family: "recipe-scaling-conversion",
        stem: `A recipe uses ${cupsPerBatch} cups of ${liquid} per batch, and 1 quart equals 4 cups. How many quarts of ${liquid} are needed for ${batches} batches?`,
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
      const space = choose(variant, ["studio", "gallery", "rehearsal room", "reading room"]);
      const covering = choose(variant, ["carpet", "cork flooring", "vinyl tile", "woven matting"]);
      const price = 20 + 5 * (s % 5);
      const area = length * width;
      const answer = (area / 9) * price;
      return {
        family: "square-unit-conversion-cost",
        stem: `A ${space} measures ${length} feet by ${width} feet. ${covering[0].toUpperCase()}${covering.slice(1)} costs $${price} per square yard. What is the cost, in dollars, to cover the floor?`,
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
      const vessel = choose(variant, ["tank", "reservoir", "cistern", "holding pool"]);
      const gallons = volume * 7.5;
      const answer = gallons / rate;
      return {
        family: "chained-rate-conversion",
        stem: `A ${vessel} holds ${volume} cubic feet of water, 1 cubic foot holds 7.5 gallons, and a pump delivers ${rate} gallons per minute. How many minutes does the pump take to fill it?`,
        answer,
        wrong: [
          [round3(volume / (7.5 * rate)), "This divides by the 7.5 gallons per cubic foot instead of multiplying by it."],
          [round3(volume / rate), "This ignores the conversion from cubic feet to gallons."],
          [round3(rate * 7.5), "This multiplies the pump rate by the conversion factor and never uses the tank size."],
          [gallons, "This is the capacity in gallons, not the time to fill it."],
          [round3(volume * 7.5 * rate), "This multiplies by the pump rate; time is capacity divided by rate."],
        ],
        why: `The tank holds ${volume} × 7.5 = ${gallons} gallons. At ${rate} gallons per minute it fills in ${gallons}/${rate} = ${answer} minutes.`,
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
      const mover = choose(variant, ["cyclist", "kayaker", "hiker", "scooter rider"]);
      const answer = speed * hours;
      return {
        family: "distance-from-rate-and-time",
        stem: `A ${mover} moves at a constant ${speed} kilometres per hour for ${hours} hours. How many kilometres are covered?`,
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
      const mover = choose(variant, ["delivery van", "freight truck", "mail carrier", "shuttle bus"]);
      const distance = rate * hours;
      return {
        family: "rate-from-distance-and-time",
        stem: `A ${mover} covers ${distance} miles in ${hours} hours. What is the average speed, in miles per hour?`,
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
      const mover = choose(variant, ["driver", "courier", "bus", "van"]);
      const leg = lcm(slow, fast);
      const answer = (2 * slow * fast) / (slow + fast);
      return {
        family: "average-speed-two-legs",
        stem: `A ${mover} covers ${leg} miles at ${slow} miles per hour and then returns over the same ${leg} miles at ${fast} miles per hour. What is the average speed for the whole trip, in miles per hour?`,
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
      const craft = choose(variant, ["boat", "kayak", "ferry", "raft"]);
      return {
        family: "vector-resultant-speed",
        stem: `A ${craft} is driven due north at ${north} kilometres per hour while a current carries it due east at ${east} kilometres per hour. What is the resulting speed, in kilometres per hour?`,
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
        stem: choose(variant, [
          `Vectors u and v have components u = ⟨${num(ux)}, ${num(uy)}⟩ and v = ⟨${num(vx)}, ${num(vy)}⟩. What is the magnitude of u + v?`,
          `For u = ⟨${num(ux)}, ${num(uy)}⟩ and v = ⟨${num(vx)}, ${num(vy)}⟩, the length |u + v| equals what?`,
          `Adding the vectors ⟨${num(ux)}, ${num(uy)}⟩ and ⟨${num(vx)}, ${num(vy)}⟩ produces a vector of which magnitude?`,
        ]),
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
        stem: choose(variant, [
          `If ${coefficient}x + ${constant} = ${total}, ${ask(0, "x")}`,
          `Solve ${coefficient}x + ${constant} = ${total} for x. ${ask(1, "x").replace(/^w/, "W")}`,
          `The equation ${coefficient}x + ${constant} = ${total} has one solution. ${ask(2, "x").replace(/^x/, "X")}`,
          `For which number x is ${coefficient}x + ${constant} equal to ${total}?`,
        ]),
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
        stem: choose(variant, [
          `If x/${divisor} + ${constant} = ${total}, what is the value of x?`,
          `Solve the equation x/${divisor} + ${constant} = ${total}. Which number is x?`,
          `The equation x/${divisor} + ${constant} = ${total} is true for exactly one x. What does x equal?`,
          `For which x does x/${divisor} + ${constant} equal ${total}?`,
        ]),
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
      return {
        family: "linear-variable-both-sides",
        stem: choose(variant, [
          `If ${outer}(x + ${inside}) = ${other}x + ${rightConstant}, what is the value of x?`,
          `Solve ${outer}(x + ${inside}) = ${other}x + ${rightConstant}. Which number is x?`,
          `For which x is ${outer}(x + ${inside}) equal to ${other}x + ${rightConstant}?`,
          `The equation ${outer}(x + ${inside}) = ${other}x + ${rightConstant} has one solution. What does x equal?`,
        ]),
        answer: root,
        wrong: [
          [round3((outer * inside - rightConstant) / (other - outer)) - 1, "This solves correctly and then subtracts an extra 1."],
          [outer * inside, "This is the distributed constant on the left, not the solution."],
          [round3((outer * inside + rightConstant) / (other + outer)), "This adds the variable terms instead of subtracting one from the other."],
          [round3(rightConstant / (other - outer)), `This forgets the ${outer}·${inside} produced by distributing.`],
          [rightConstant - outer * inside, "This subtracts the constants but never divides by the difference of the coefficients."],
        ],
        why: `Distribute: ${outer}x + ${outer * inside} = ${other}x + ${rightConstant}. Collect x terms: ${outer * inside - rightConstant} = ${other - outer}x, so x = ${root}.`,
        steps: ["Distribute on the left side.", "Move all variable terms to one side and constants to the other.", "Divide by the resulting coefficient."],
        principles: ["Distribute first, then gather like terms on opposite sides."],
        hint: "Distribute before you try to move anything across the equals sign.",
        verification: { kind: "linear-equation", inputs: [other - outer, -(outer * inside), rightConstant - 2 * outer * inside + outer * inside], expected: root },
      };
    },
    (s, variant) => {
      const monthly = 15 + 5 * (s % 6);
      const joining = 40 + 10 * (s % 7);
      const months = 4 + (s % 8);
      const total = joining + monthly * months;
      const facility = choose(variant, ["climbing gym", "maker space", "rowing club", "art studio"]);
      return {
        family: "linear-model-solve-for-input",
        stem: `A ${facility} charges a one-time fee of $${joining} plus $${monthly} per month. A member has paid $${total} in total. For how many months has the member belonged?`,
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
        stem: `The system of equations kx + ${firstY}y = ${firstC} and ${secondX}x + ${secondY}y = ${secondC} has no solution. What is the value of k?`,
        answer,
        wrong: [
          [ratio, `${ratio} is the factor relating the two equations, not the coefficient of x in the first one.`],
          [round3(firstY / ratio), "This scales the y-coefficient the wrong way."],
          [firstY, `${firstY} is the y-coefficient of the first equation.`],
          [secondX, `${secondX} is the x-coefficient of the second equation; k must be that value divided by the scale factor ${ratio}.`],
          [secondY, `${secondY} is the y-coefficient of the second equation.`],
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
        stem: choose(variant, [
          `For what value of k does the equation k(x + ${inside}) ${MINUS} ${subtracted}x = ${rightCoefficient}x + ${constant} have no solution?`,
          `The equation k(x + ${inside}) ${MINUS} ${subtracted}x = ${rightCoefficient}x + ${constant} has no solution for exactly one value of k. Which value is it?`,
          `Which value of k makes k(x + ${inside}) ${MINUS} ${subtracted}x = ${rightCoefficient}x + ${constant} true for no value of x?`,
        ]),
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
        stem: choose(variant, [
          `What is the least integer x for which ${coefficient}x > ${coefficient * boundary}?`,
          `The inequality ${coefficient}x > ${coefficient * boundary} is satisfied by which smallest integer x?`,
          `Which is the smallest whole number x making ${coefficient}x greater than ${coefficient * boundary}?`,
          `For ${coefficient}x > ${coefficient * boundary}, the least integer solution equals what?`,
        ]),
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
        verification: quotientCheck(coefficient * boundary, coefficient, boundary),
      };
    },
    (s, variant) => {
      const coefficient = 3 + (s % 5);
      const boundary = 5 + (s % 8);
      const constant = 2 + (s % 6);
      const rightSide = coefficient * boundary + constant;
      return {
        family: "greatest-integer-inequality",
        stem: choose(variant, [
          `What is the greatest integer x satisfying ${coefficient}x + ${constant} ≤ ${rightSide}?`,
          `The largest integer x with ${coefficient}x + ${constant} ≤ ${rightSide} equals what?`,
          `Which is the biggest whole number x for which ${coefficient}x + ${constant} is at most ${rightSide}?`,
          `For ${coefficient}x + ${constant} ≤ ${rightSide}, the maximum integer value of x is which number?`,
        ]),
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
        stem: choose(variant, [
          `How many integers x satisfy ${MINUS}${Math.abs(lowBound)} < ${coefficient}x + ${shift} ≤ ${highBound}?`,
          `The compound inequality ${MINUS}${Math.abs(lowBound)} < ${coefficient}x + ${shift} ≤ ${highBound} is satisfied by how many integer values of x?`,
          `Count the integer solutions of ${MINUS}${Math.abs(lowBound)} < ${coefficient}x + ${shift} ≤ ${highBound}.`,
        ]),
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
        verification: quotientCheck(capacity - driver, crateWeight, (capacity - driver) / crateWeight),
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
        stem: choose(variant, [
          `How many integer values of x satisfy |${coefficient}x ${MINUS} ${centre}| ≤ ${radius}?`,
          `The inequality |${coefficient}x ${MINUS} ${centre}| ≤ ${radius} holds for how many integers x?`,
          `Count the integers x with |${coefficient}x ${MINUS} ${centre}| ≤ ${radius}.`,
        ]),
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
      const x = 4 + (s % 8);
      const y = 3 + (s % 6);
      return {
        family: "system-sum-and-difference",
        stem: choose(variant, [
          `If x + y = ${x + y} and x ${MINUS} y = ${x - y}, what is the value of y?`,
          `Two numbers have sum ${x + y} and difference ${x - y}. What is the smaller number, y?`,
          `Given x + y = ${x + y} together with x ${MINUS} y = ${x - y}, y equals which number?`,
          `Solve the system x + y = ${x + y}, x ${MINUS} y = ${x - y}. What does y equal?`,
        ]),
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
        stem: choose(variant, [
          `If y = ${multiplier}x and x + y = ${x + y}, what is the value of x?`,
          `Given that y is ${multiplier} times x and that x + y = ${x + y}, x equals which number?`,
          `The system y = ${multiplier}x, x + y = ${x + y} has one solution. What is x?`,
          `Solve for x: y = ${multiplier}x and x + y = ${x + y}.`,
        ]),
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
        stem: choose(variant, [
          `If ${firstX}x + ${yCoefficient}y = ${firstTotal} and ${secondX}x ${MINUS} ${yCoefficient}y = ${secondTotal}, what is the value of x?`,
          `Solve the system ${firstX}x + ${yCoefficient}y = ${firstTotal}, ${secondX}x ${MINUS} ${yCoefficient}y = ${secondTotal}. Which number is x?`,
          `For the system ${firstX}x + ${yCoefficient}y = ${firstTotal} and ${secondX}x ${MINUS} ${yCoefficient}y = ${secondTotal}, x equals what?`,
        ]),
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
      const children = 15 + (s % 25);
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
        ],
        why: `If a is the number of adult tickets, a + c = ${total} and ${adultPrice}a + ${childPrice}c = ${revenue}. Substituting c = ${total} − a gives ${adultPrice - childPrice}a = ${revenue - childPrice * total}, so a = ${adults}.`,
        steps: ["Write one equation for the ticket count and one for the money.", "Substitute to eliminate the child-ticket count.", "Solve for the adult count and check both equations."],
        principles: ["Two unknowns need two independent equations: one counting items, one counting value."],
        hint: "Assume every ticket were a child ticket, then see how much extra money the adults explain.",
        verification: { kind: "sum", inputs: [adultPrice * adults, childPrice * children], expected: revenue },
      };
    },
  ],
  Hard: [
    (s, variant) => {
      const b = 2 + (s % 6);
      const c = 3 + (s % 7);
      const d = 2 + (s % 4);
      const answer = round3((b * c) / d);
      return {
        family: "matrix-determinant-parameter",
        stem: choose(variant, [
          `The matrix [[k, ${b}], [${c}, ${d}]] has no inverse. What is the value of k?`,
          `For which value of k is the determinant of [[k, ${b}], [${c}, ${d}]] equal to 0?`,
          `A 2 × 2 matrix [[k, ${b}], [${c}, ${d}]] is singular. Which number is k?`,
        ]),
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
      const a = 2 + (s % 5);
      const b = 1 + (s % 6);
      const c = 3 + (s % 4);
      const d = 2 + (s % 7);
      const e = 1 + (s % 4);
      const f = 2 + (s % 5);
      const g = 3 + (s % 6);
      const h = 1 + (s % 3);
      const answer = a * f + b * h;
      return {
        family: "matrix-product-entry",
        stem: choose(variant, [
          `If A = [[${a}, ${b}], [${c}, ${d}]] and B = [[${e}, ${f}], [${g}, ${h}]], what is the entry in row 1, column 2 of the product AB?`,
          `For A = [[${a}, ${b}], [${c}, ${d}]] and B = [[${e}, ${f}], [${g}, ${h}]], the row 1, column 2 entry of AB equals what?`,
          `Matrices A = [[${a}, ${b}], [${c}, ${d}]] and B = [[${e}, ${f}], [${g}, ${h}]] are multiplied. Which number sits in row 1, column 2 of AB?`,
        ]),
        answer,
        wrong: [
          [b * f, "This multiplies the two entries that already sit in row 1, column 2, which is entrywise multiplication rather than matrix multiplication."],
          [a * e + b * g, "This is the row 1, column 1 entry, using the first column of B."],
          [a * f + c * h, "This mixes row 1 of A with column 1 of A; the second factor must come from row 2 of B."],
          [c * f + d * h, "This is the row 2, column 2 entry, using row 2 of A."],
          [a * f * b * h, "This multiplies the two products instead of adding them."],
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
        stem: choose(variant, [
          `The expression x² ${MINUS} ${root * root} factors as (x + ${root})(x ${MINUS} k). What is the value of k?`,
          `If x² ${MINUS} ${root * root} = (x + ${root})(x ${MINUS} k), which number must k equal?`,
          `Factoring x² ${MINUS} ${root * root} gives (x + ${root})(x ${MINUS} k), where k represents what quantity?`,
          `Write x² ${MINUS} ${root * root} as (x + ${root})(x ${MINUS} k). What does k equal?`,
        ]),
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
        verification: { kind: "circle-area-coefficient", inputs: [root], expected: root * root },
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
        stem: choose(variant, [
          `What is the greater solution of ${lead}x² ${MINUS} ${Math.abs(middle)}x + ${constant} = 0?`,
          `The equation ${lead}x² ${MINUS} ${Math.abs(middle)}x + ${constant} = 0 has two roots. Which is larger?`,
          `Solve ${lead}x² ${MINUS} ${Math.abs(middle)}x + ${constant} = 0 and give the bigger value of x.`,
        ]),
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
        verification: { kind: "product", inputs: [lead, wholeRoot * numerator], expected: lead * constant },
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
        stem: choose(variant, [
          `When p(x) = x³ + kx² ${MINUS} ${linear}x + ${constant} is divided by (x ${MINUS} ${divisorRoot}), the remainder is ${remainder}. What is the value of k?`,
          `The polynomial p(x) = x³ + kx² ${MINUS} ${linear}x + ${constant} leaves remainder ${remainder} upon division by (x ${MINUS} ${divisorRoot}). Which number is k?`,
          `Dividing p(x) = x³ + kx² ${MINUS} ${linear}x + ${constant} by (x ${MINUS} ${divisorRoot}) leaves a remainder of ${remainder}. What does k equal?`,
        ]),
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
        stem: choose(variant, [
          `What is the greatest solution of x³ ${MINUS} ${group}x² ${MINUS} ${square * square}x + ${group * square * square} = 0?`,
          `The equation x³ ${MINUS} ${group}x² ${MINUS} ${square * square}x + ${group * square * square} = 0 has three real solutions. Which is largest?`,
          `Solve x³ ${MINUS} ${group}x² ${MINUS} ${square * square}x + ${group * square * square} = 0 and report the greatest root.`,
        ]),
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
        stem: choose(variant, [
          `For x ≠ ${constant}, the expression (x² ${MINUS} ${constant * constant})/(x ${MINUS} ${constant}) equals x + k. What is the value of k?`,
          `If (x² ${MINUS} ${constant * constant})/(x ${MINUS} ${constant}) is simplified to x + k for x ≠ ${constant}, which number is k?`,
          `Simplifying (x² ${MINUS} ${constant * constant})/(x ${MINUS} ${constant}) gives x + k, where k represents what quantity?`,
          `For all x other than ${constant}, (x² ${MINUS} ${constant * constant})/(x ${MINUS} ${constant}) = x + k. What does k equal?`,
        ]),
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
        verification: { kind: "circle-area-coefficient", inputs: [constant], expected: constant * constant },
      };
    },
    (s, variant) => {
      const excluded = 3 + (s % 9);
      const numeratorConstant = 2 + (s % 7);
      return {
        family: "undefined-value-of-rational-expression",
        stem: choose(variant, [
          `For which value of x is (x + ${numeratorConstant})/(x ${MINUS} ${excluded}) undefined?`,
          `The expression (x + ${numeratorConstant})/(x ${MINUS} ${excluded}) fails to be defined at which value of x?`,
          `At what number x does (x + ${numeratorConstant})/(x ${MINUS} ${excluded}) have no value?`,
          `Which value of x must be excluded from the domain of (x + ${numeratorConstant})/(x ${MINUS} ${excluded})?`,
        ]),
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
        stem: choose(variant, [
          `If 1/x + 1/${other} = 1/${combined}, what is the value of x?`,
          `Solve 1/x + 1/${other} = 1/${combined} for x. Which number is x?`,
          `The equation 1/x + 1/${other} = 1/${combined} has one solution. What does x equal?`,
        ]),
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
        stem: choose(variant, [
          `For x ≠ ${MINUS}${first}, the expression (x² + ${first + second}x + ${first * second})/(x + ${first}) is equivalent to x + k. What is k?`,
          `Simplify (x² + ${first + second}x + ${first * second})/(x + ${first}) for x ≠ ${MINUS}${first}. The result is x + k, where k equals what?`,
          `If (x² + ${first + second}x + ${first * second})/(x + ${first}) = x + k, which number is k?`,
        ]),
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
        stem: choose(variant, [
          `How many integer values of x satisfy (x ${MINUS} ${upper})/(x + ${lower}) < 0?`,
          `The inequality (x ${MINUS} ${upper})/(x + ${lower}) < 0 holds for how many integers x?`,
          `Count the integers x for which (x ${MINUS} ${upper})/(x + ${lower}) is negative.`,
        ]),
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
      const answer = round3((y - x) / (y + x));
      return {
        family: "complex-fraction-simplification",
        stem: choose(variant, [
          `If x = ${x} and y = ${y}, what is the value of (1/x ${MINUS} 1/y)/(1/x + 1/y)?`,
          `Evaluate (1/x ${MINUS} 1/y)/(1/x + 1/y) when x = ${x} and y = ${y}.`,
          `For x = ${x} and y = ${y}, the complex fraction (1/x ${MINUS} 1/y)/(1/x + 1/y) equals what?`,
        ]),
        answer,
        wrong: [
          [round3((x - y) / (x + y)), "This reverses the numerator; clearing the fractions gives y − x on top, not x − y."],
          [round3((y - x) / (y * x)), "This keeps the product xy in the denominator instead of cancelling it against the denominator's own xy."],
          [round3(y - x), "This simplifies only the numerator and drops the denominator."],
          [round3((y + x) / (y - x)), "This inverts the whole expression."],
          [round3(y / x), "This divides the values rather than simplifying the compound fraction."],
        ],
        why: `Multiply numerator and denominator by xy: (y − x)/(y + x) = (${y} − ${x})/(${y} + ${x}) = ${answer}.`,
        steps: ["Multiply the top and bottom of the compound fraction by xy.", "Simplify to (y − x)/(y + x).", "Substitute the given values."],
        principles: ["Clearing inner denominators with a common factor turns a compound fraction into a simple one."],
        hint: "Multiply through by xy before substituting anything.",
        trap: "Simplifying 1/x − 1/y to 1/(x − y).",
        verification: quotientCheck(y - x, y + x, answer),
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
  let fallback = null;
  for (let step = 0; step < shapes.length; step += 1) {
    const position = (offset + step) % shapes.length;
    const key = `${task.subskill}|${tier}|${position}`;
    const variant = shapeUses.get(key) || 0;
    const built = assemble(shapes[position](sequence, variant), tier, index);
    if (built.ordered) {
      shapeUses.set(key, variant + 1);
      return built.question;
    }
    if (!fallback) fallback = { question: built.question, key, variant };
  }
  shapeUses.set(fallback.key, fallback.variant + 1);
  return fallback.question;
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
