#!/usr/bin/env node
"use strict";

const { createRandom, generateSection, hashString } = require("./lib/generation");
const { loadBank } = require("./lib/content");

const GENERATOR = "sat-math-generator-v1";

// Composed from two coprime banks (25 x 23 = 575 unique names) so every
// sequence 1..575 gets a distinct scene, keeping generated items non-duplicate
// as the per-section target grows.
const placeFirsts = [
  "Alder", "Brookside", "Cedar", "Dunham", "Elmwood", "Fairview", "Glen",
  "Harbor", "Ivy", "Juniper", "Kingston", "Lakeside", "Meadow", "Northgate",
  "Oak", "Pinecrest", "Quarry", "Riverside", "Summit", "Timber",
  "Union", "Valley", "Westfield", "York", "Zephyr",
];

const placeSeconds = [
  "Center", "Commons", "District", "Exchange", "Gardens", "Heights", "Junction",
  "Landing", "Market", "Mills", "Orchard", "Plaza", "Quarter", "Reserve",
  "Springs", "Station", "Terrace", "Village", "Wharf", "Yards", "Crossing",
  "Grove", "Hollow",
];

function composePlace(sequence) {
  return `${placeFirsts[sequence % placeFirsts.length]} ${placeSeconds[sequence % placeSeconds.length]}`;
}

const items = [
  "notebooks", "museum tickets", "seed packets", "bus passes", "ceramic tiles",
  "trail markers", "water bottles", "art prints", "tool kits", "music folders",
  "garden plots", "recycling bins", "lamp posts", "fabric rolls", "storage boxes",
  "field guides", "kayak rentals", "photo frames", "event badges", "meal vouchers",
  "bike helmets", "survey forms", "paint cans", "stage lights", "library cards",
];

const reviewPurposes = [
  "annual budget check", "spring inventory", "capacity study", "delivery audit",
  "weekend staffing plan", "storage redesign", "cost comparison", "usage forecast",
  "accessibility review", "safety inspection", "summer schedule", "grant proposal",
  "equipment survey", "volunteer plan", "maintenance estimate", "event forecast",
  "resource-allocation meeting",
];

function context(sequence) {
  return {
    place: composePlace(sequence),
    item: items[(sequence * 7 + Math.floor(sequence / items.length)) % items.length],
  };
}

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 1000) / 1000);
}

// ---------------------------------------------------------------------------
// Notation helpers. Every rendered minus sign is U+2212 so stems and choices
// print the same glyph; the numeric answer key stays ASCII because core.js
// strips U+2212 before comparing a typed response.
// ---------------------------------------------------------------------------

const MINUS = "−";

function label(value) {
  return typeof value === "string" ? value : formatNumber(value);
}

function toDisplay(text) {
  return /^-?[\d.]+$/.test(text) ? text.replace("-", MINUS) : text;
}

function num(value) {
  return formatNumber(value).replace("-", MINUS);
}

// "3x + 5", "−x", "2x − 7"
function lin(a, b, variable = "x") {
  const head = a === 1 ? variable : a === -1 ? `${MINUS}${variable}` : `${num(a)}${variable}`;
  if (b === 0) return head;
  return `${head} ${b < 0 ? MINUS : "+"} ${Math.abs(b)}`;
}

function signed(value) {
  return value < 0 ? `${MINUS} ${Math.abs(value)}` : `+ ${value}`;
}

function point(x, y) {
  return `(${num(x)}, ${num(y)})`;
}

function gcd(a, b) {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right) {
    const next = left % right;
    left = right;
    right = next;
  }
  return left || 1;
}

function frac(numerator, denominator) {
  const divisor = gcd(numerator, denominator);
  let top = numerator / divisor;
  let bottom = denominator / divisor;
  if (bottom < 0) {
    top = -top;
    bottom = -bottom;
  }
  return bottom === 1 ? num(top) : `${num(top)}/${bottom}`;
}

function tools(random) {
  const int = (low, high) => low + Math.floor(random() * (high - low + 1));
  return {
    random,
    int,
    pick: (list) => list[Math.floor(random() * list.length)],
    sign: () => (random() < 0.5 ? -1 : 1),
    nonzero: (low, high) => {
      let value = 0;
      while (value === 0) value = int(low, high);
      return value;
    },
  };
}

// ---------------------------------------------------------------------------
// Question assembly
// ---------------------------------------------------------------------------

function distractor(value, reason) {
  return { text: String(value), reason };
}

function mathQuestion(contextValue, data) {
  const correctText = label(data.correct);
  const seen = new Set([correctText]);
  const distractors = (data.wrong || [])
    .map(([value, reason]) => distractor(label(value), reason))
    .filter((item) => {
      if (seen.has(item.text) || item.text === "NaN") return false;
      seen.add(item.text);
      return true;
    });
  let offset = 1;
  while (distractors.length < 3) {
    const value = formatNumber(Number(data.correct) + offset);
    offset += 1;
    if (seen.has(value)) continue;
    seen.add(value);
    distractors.push(distractor(value, "This value does not satisfy the final equation or condition."));
  }
  const alreadyContextual = data.bare || data.stem.includes(contextValue.scene.place);
  // "Union" begins with a vowel letter but a consonant (y) sound, so it takes
  // "a"; keep "an" for genuine vowel-sound starts.
  const consonantSound = /^(uni|use|used|euro|one)/i.test(contextValue.scene.place);
  const article = !consonantSound && /^[aeiou]/i.test(contextValue.scene.place) ? "an" : "a";
  const purpose = reviewPurposes[contextValue.sequence % reviewPurposes.length];
  const stem = alreadyContextual
    ? data.stem
    : `During ${article} ${contextValue.scene.place} ${purpose} involving ` +
      `${contextValue.scene.item}, ${data.stem.charAt(0).toLowerCase()}${data.stem.slice(1)}`;
  return {
    responseType: contextValue.responseType,
    stimulus: data.stimulus || null,
    stem,
    correct: toDisplay(correctText),
    correctAnswer: correctText,
    distractors: distractors.slice(0, 3).map((item) => ({
      text: toDisplay(item.text),
      reason: item.reason,
    })),
    hint: data.hint || "Translate the given information into an equation before calculating.",
    explanation: data.explanation,
    solutionSteps: data.steps,
    strategy: data.strategy || "Write the governing relationship, solve cleanly, and check the result against the question.",
    trap: data.trap || "Do not stop at an intermediate value or answer a related quantity that was not requested.",
    estimatedSeconds: data.seconds || 75,
    principles: data.principles,
    format: data.format || "standalone",
    tags: data.tags || [],
    verification: data.verification || null,
  };
}

// A quotient answer is checked as the solution of denominator·x = numerator.
// "linear-equation" names the recomputation the validator performs; it is not a
// claim that the item is about probability, which is how the old bank labelled
// every ratio it produced.
function quotient(numerator, denominator) {
  return { kind: "linear-equation", inputs: [denominator, 0, numerator], expected: numerator / denominator };
}

function linearCheck(a, b, c) {
  return { kind: "linear-equation", inputs: [a, b, c], expected: (c - b) / a };
}

// ---------------------------------------------------------------------------
// Shape library. Each subskill maps to Easy/Medium/Hard lists of structurally
// different question shapes; a shape returns question data plus the family name
// recorded on the item so downstream duplicate detection can key off it.
// ---------------------------------------------------------------------------

const SHAPES = {};
const SHAPE_PHRASINGS = {};

function registerShapePhrasings(subskill, focus) {
  const frames = [
    (stem) => `${stem} Work from the ${focus} relationship shown.`,
    (stem) => `Use the defining ${focus} relationship to answer this question: ${stem}`,
    (stem) => `Track each quantity in this ${focus} problem before computing: ${stem}`,
    (stem) => `Choose the governing ${focus} rule, then solve the following: ${stem}`,
    (stem) => `Translate this ${focus} setup into its mathematical condition: ${stem}`,
    (stem) => `Reason from the structure of the ${focus} model here: ${stem}`,
    (stem) => `Check the requested quantity after completing this ${focus} analysis: ${stem}`,
    (stem) => `Keep the ${focus} constraint in view throughout this problem: ${stem}`,
  ];
  SHAPE_PHRASINGS[subskill] = (stem, variant) => frames[variant % frames.length](stem);
}

function completeWrongPool(correct, wrong) {
  const completed = [];
  const seen = new Set([label(correct)]);
  wrong.forEach(([value, reason]) => {
    const text = label(value);
    if (completed.length >= 6 || seen.has(text) || ["NaN", "Infinity", "-Infinity"].includes(text)) return;
    seen.add(text);
    completed.push([value, reason]);
  });
  if (typeof correct === "number") {
    [1, -1, 2, -2, 3, -3, 4, -4].forEach((offset) => {
      const candidate = correct + offset;
      const text = label(candidate);
      if (completed.length >= 5 || seen.has(text)) return;
      seen.add(text);
      completed.push([
        candidate,
        "This nearby value does not satisfy the original equation or condition.",
      ]);
    });
  } else {
    ["Cannot be determined", "None of these", "All real numbers"].forEach((candidate) => {
      if (completed.length >= 5 || seen.has(candidate)) return;
      seen.add(candidate);
      completed.push([
        candidate,
        "This conclusion does not follow from the stated mathematical conditions.",
      ]);
    });
  }
  return completed;
}

function normalizeShapeSpec(spec, subskill, sequence, variant) {
  const phrasing = SHAPE_PHRASINGS[subskill];
  const stem = phrasing ? phrasing(spec.stem, variant, sequence) : spec.stem;
  return {
    ...spec,
    stem,
    answer: spec.correct,
    wrong: completeWrongPool(spec.correct, spec.wrong || []),
    why: spec.explanation,
    hint: spec.hint || "Identify the governing relationship before substituting values.",
  };
}

function adaptShape(subskill, shape) {
  return (first, second, third) => {
    if (typeof first === "number") {
      const sequence = first;
      const variant = second;
      const random = createRandom(`sat-math-shape|${subskill}|${sequence}`);
      const spec = shape(tools(random), context(sequence), sequence);
      return normalizeShapeSpec(spec, subskill, sequence, variant);
    }
    const sequence = Number.isInteger(third) ? third : 0;
    const variant = hashString(`${subskill}|${sequence}`) % 8;
    return normalizeShapeSpec(shape(first, second, sequence), subskill, sequence, variant);
  };
}

function defineShapes(group) {
  Object.entries(group).forEach(([subskill, tiers]) => {
    SHAPES[subskill] = Object.fromEntries(
      Object.entries(tiers).map(([tier, shapes]) => [
        tier,
        shapes.map((shape) => adaptShape(subskill, shape)),
      ]),
    );
  });
}

// Cells whose answers are words rather than numbers; forced to multiple choice
// because a student-produced response cannot express them.
const TEXT_ANSWER = new Set();

/* ------------------------------- Algebra -------------------------------- */

registerShapePhrasings("solve", "linear-equation");
registerShapePhrasings("interpret constants", "linear-model constant");
registerShapePhrasings("no or infinite solutions", "solution-count condition");
registerShapePhrasings("slope", "rate-of-change");
registerShapePhrasings("intercepts", "axis-intercept");
registerShapePhrasings("function notation", "function-value");
registerShapePhrasings("graph interpretation", "linear-graph");
registerShapePhrasings("equation modeling", "linear-model equation");
registerShapePhrasings("solve systems", "simultaneous-equation");
registerShapePhrasings("interpret intersection", "system-intersection");
registerShapePhrasings("solve inequalities", "inequality boundary");
registerShapePhrasings("systems of inequalities", "feasible-region");

defineShapes({
  "solve": {
    Easy: [
      (t) => {
        const a = t.int(2, 9);
        const x = t.int(2, 12);
        const j = t.int(1, 6);
        const b = a * j;
        const c = a * x + b;
        return {
          family: "one-step-isolate",
          stem: `If ${lin(a, b)} = ${c}, what is the value of x?`,
          correct: x,
          wrong: [
            [a * x, "This subtracts the constant but never divides by the coefficient of x."],
            [x + j, "This divides every term by the coefficient but leaves the constant in place."],
            [x + 2 * j, "This adds the constant to both sides instead of subtracting it."],
            [x - j, "This subtracts the constant a second time after dividing."],
          ],
          explanation: `Subtract ${b} from both sides to get ${a}x = ${a * x}, then divide by ${a}: x = ${x}.`,
          steps: [`Subtract ${b} from both sides.`, `Divide both sides by ${a}.`, `Check that ${a}(${x}) + ${b} = ${c}.`],
          principles: ["Undo addition before undoing multiplication."],
          verification: linearCheck(a, b, c),
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(2, 9);
        const c = t.int(3, 14);
        const x = a * (c + b);
        return {
          family: "divided-variable",
          stem: `The equation x/${a} ${MINUS} ${b} = ${c} is true for exactly one value of x. What is that value?`,
          correct: x,
          wrong: [
            [c + b, "This solves the equation as if x were not divided by the denominator."],
            [a * c, "This multiplies only the right side by the denominator."],
            [a * c - b, "This multiplies before moving the constant, so the constant is never scaled."],
            [a * (c - b), "This subtracts the constant instead of adding it back."],
          ],
          explanation: `Add ${b}: x/${a} = ${c + b}. Multiply by ${a}: x = ${x}.`,
          steps: [`Add ${b} to both sides.`, `Multiply both sides by ${a}.`, `Verify ${x}/${a} ${MINUS} ${b} = ${c}.`],
          principles: ["Clear a denominator by multiplying both sides by it."],
          verification: { kind: "product", inputs: [a, c + b], expected: x },
        };
      },
    ],
    Medium: [
      (t) => {
        const x = t.int(2, 9);
        const g = t.int(2, 4);
        const c = t.int(2, 6);
        const a = c + g;
        const h = t.int(1, 5);
        const b = g * h;
        const d = g * x + b;
        return {
          family: "variables-both-sides",
          stem: `If ${lin(a, b)} = ${lin(c, d)}, what is the value of x?`,
          correct: x,
          wrong: [
            [g * x, "This collects the x-terms but forgets to divide by their combined coefficient."],
            [x + 2 * h, "This adds the constants instead of subtracting the smaller one."],
            [-x, "This moves the x-terms to the wrong side and keeps the sign of the constant."],
            [x - 2 * h, "This subtracts the constant from the wrong side before dividing."],
          ],
          explanation: `Subtract ${lin(c, b)} from both sides: ${g}x = ${g * x}, so x = ${x}.`,
          steps: [`Subtract ${c}x from both sides.`, `Subtract ${b} from both sides.`, `Divide by ${g}.`],
          principles: ["Collect variable terms on one side and constants on the other."],
          verification: linearCheck(g, b, d),
        };
      },
      (t) => {
        const x = t.int(2, 10);
        const a = t.int(2, 6);
        const b = t.int(1, 8);
        const c = t.int(2, 15);
        const k = t.int(2, 4);
        const shift = t.int(3, 9);
        const d = a * (x + b) - c;
        return {
          family: "solve-then-transform",
          stem: `If ${a}(x + ${b}) ${MINUS} ${c} = ${num(d)}, what is the value of ${lin(k, shift)}?`,
          correct: k * x + shift,
          wrong: [
            [x, "This stops at x instead of evaluating the expression the question asks for."],
            [k * x, "This omits the constant term of the requested expression."],
            [x + shift, "This adds the constant without multiplying x by its coefficient."],
            [k * (x + shift), "This multiplies the constant by the coefficient as well."],
          ],
          explanation: `Solving gives x = ${x}, so ${lin(k, shift)} = ${k}(${x}) + ${shift} = ${k * x + shift}.`,
          steps: [`Add ${c} to both sides and divide by ${a}.`, `Subtract ${b} to get x = ${x}.`, `Substitute into ${lin(k, shift)}.`],
          principles: ["Answer the quantity that is requested, not the intermediate variable."],
          trap: "The value of x is a trap answer; the question asks for an expression in x.",
          verification: { kind: "sum", inputs: [k * x, shift], expected: k * x + shift },
        };
      },
    ],
    Hard: [
      (t) => {
        const a = t.int(2, 6);
        const k = t.int(3, 16);
        const c = a * k;
        const b = t.int(5, 15);
        const f = t.nonzero(-3, 3);
        const d = a * b + a * f;
        return {
          family: "unknown-constant-no-solution",
          stem: `The equation ${a}(kx + ${b}) = ${lin(c, d)} has no solution, where k is a constant. What is the value of k?`,
          correct: k,
          wrong: [
            [c, "This reads the coefficient of x on the right side as k without dividing by the factor outside the parentheses."],
            [b, "This is the constant inside the parentheses, not the coefficient that must be matched."],
            [b + f, "This matches the constant terms, which is the condition for infinitely many solutions rather than none."],
            [a, "This is the factor distributed on the left, not the value of k."],
          ],
          explanation: `Distributing gives ${a}kx + ${a * b} = ${c}x + ${d}. A linear equation has no solution only when the x-coefficients match and the constants do not, so ${a}k = ${c} and k = ${k}; the constants ${a * b} and ${d} differ, so no solution exists.`,
          steps: ["Distribute on the left side.", "Set the coefficients of x equal, since matching slopes are required for no solution.", `Solve ${a}k = ${c} and confirm the constant terms disagree.`],
          principles: ["ax + b = cx + d has no solution exactly when a = c and b ≠ d."],
          trap: "Matching the constant terms instead produces infinitely many solutions, not zero.",
          verification: quotient(c, a),
        };
      },
      (t) => {
        const a = t.int(2, 7);
        const b = t.int(2, 9);
        const e = t.int(3, 14);
        const c = a * e;
        return {
          family: "unknown-constant-infinite",
          stem: `The equation ${lin(a * b, 0)} + c = ${a}(${lin(b, e)}) has infinitely many solutions, where c is a constant. What is the value of c?`,
          correct: c,
          wrong: [
            [e, "This copies the constant inside the parentheses without distributing the factor."],
            [a + e, "This adds the outside factor to the inside constant instead of multiplying."],
            [a * b, "This is the coefficient of x, which already matches on both sides."],
            [a * e + a, "This distributes one extra factor to the constant term."],
          ],
          explanation: `The right side is ${lin(a * b, c)}. The x-coefficients already agree, so the equation is an identity exactly when the constants agree: c = ${a} · ${e} = ${c}.`,
          steps: ["Distribute the factor on the right side.", "Observe that the x-terms are already identical.", "Set the constant terms equal and solve for c."],
          principles: ["An identity requires both the coefficients and the constants to match."],
          trap: "Only the constant is unknown here; the x-coefficients are already equal, so no coefficient condition remains.",
          verification: { kind: "product", inputs: [a, e], expected: c },
        };
      },
      (t) => {
        const a = t.int(2, 7);
        const b = t.int(2, 9);
        const c = t.int(3, 20);
        const m = a;
        const n = c - a * b;
        return {
          family: "identity-coefficient-sum",
          stem: `The equation ${a}(x ${MINUS} ${b}) + ${c} = mx + n is true for every value of x, where m and n are constants. What is the value of m + n?`,
          correct: m + n,
          wrong: [
            [m, "This is m alone; the constant term n is still required."],
            [n, "This is n alone; the coefficient m is still required."],
            [a + c, "This ignores the distributed product and adds the two numbers shown."],
            [a * b + c, "This adds the distributed product instead of subtracting it."],
          ],
          explanation: `Distributing gives ${lin(a, -(a * b))} + ${c} = ${lin(a, n)}, so m = ${m} and n = ${n}; m + n = ${m + n}.`,
          steps: ["Distribute on the left side.", "Combine the constant terms.", "Match coefficients with mx + n and add m and n."],
          principles: ["Two linear expressions are equal for all x only when matching coefficients are equal."],
          verification: { kind: "sum", inputs: [m, n], expected: m + n },
        };
      },
    ],
  },

  "interpret constants": {
    Easy: [
      (t, scene) => {
        const rate = t.int(4, 15);
        const fixed = t.int(20, 95);
        return {
          family: "fixed-fee",
          stem: `The cost C, in dollars, of renting ${scene.item} for h hours is C = ${lin(rate, fixed, "h")}. What is the fixed fee, in dollars, that is charged no matter how long the rental lasts?`,
          correct: fixed,
          wrong: [
            [rate, "This is the hourly rate, the part of the cost that does depend on h."],
            [rate + fixed, "This is the cost of a one-hour rental, not the fee charged at h = 0."],
            [fixed - rate, "This subtracts the hourly rate from the fee for no stated reason."],
            [fixed + rate * 2, "This is the cost of a two-hour rental."],
          ],
          explanation: `Setting h = 0 removes the ${rate}h term, leaving C = ${fixed}.`,
          steps: ["Identify the term that does not contain h.", "Substitute h = 0.", `Read the fixed fee, $${fixed}.`],
          principles: ["In y = mx + b, b is the value of y when x is 0."],
        };
      },
      (t, scene) => {
        const rate = t.int(6, 18);
        const start = t.int(120, 480);
        const weeks = t.int(3, 9);
        return {
          family: "decreasing-rate-meaning",
          stem: `The number of ${scene.item} left in a storeroom after w weeks is N = ${start} ${MINUS} ${rate}w. By how many does the supply drop each week?`,
          correct: rate,
          wrong: [
            [start, "This is the starting supply, not the weekly change."],
            [start - rate, "This is the supply after one week."],
            [start / rate, "This is the number of weeks until the supply reaches zero."],
            [rate * weeks, "This is the drop over several weeks rather than one week."],
          ],
          explanation: `The coefficient of w is ${MINUS}${rate}, so the supply falls by ${rate} each week.`,
          steps: ["Locate the coefficient of w.", "Interpret its sign as a decrease.", "Report the size of the weekly change."],
          principles: ["The coefficient of the input variable is the rate of change per unit."],
        };
      },
    ],
    Medium: [
      (t, scene) => {
        const rate = t.int(5, 14);
        const fixed = t.int(25, 90);
        const hours = t.int(4, 9);
        const drop = t.int(2, 4);
        const total = (rate - drop) * hours + 2 * fixed;
        return {
          family: "revised-model-value",
          stem: `Renting ${scene.item} costs C = ${lin(rate, fixed, "h")} dollars for h hours. Under a new contract the fixed fee doubles and the hourly rate falls by ${drop} dollars. What is the cost, in dollars, of a ${hours}-hour rental under the new contract?`,
          correct: total,
          wrong: [
            [rate * hours + fixed, "This uses the original contract instead of the revised one."],
            [(rate - drop) * hours + fixed, "This lowers the hourly rate but leaves the fixed fee unchanged."],
            [rate * hours + 2 * fixed, "This doubles the fee but keeps the original hourly rate."],
            [2 * ((rate - drop) * hours + fixed), "This doubles the entire cost rather than only the fixed fee."],
          ],
          explanation: `The new model is C = ${lin(rate - drop, 2 * fixed, "h")}, so C = ${rate - drop}(${hours}) + ${2 * fixed} = ${total}.`,
          steps: ["Adjust each constant separately.", "Write the revised model.", `Evaluate it at h = ${hours}.`],
          principles: ["Changing a fixed fee moves the intercept; changing a rate moves the slope."],
          verification: { kind: "sum", inputs: [(rate - drop) * hours, 2 * fixed], expected: total },
        };
      },
      (t) => {
        const rate = t.int(8, 25);
        const zero = t.int(12, 30);
        const start = rate * zero;
        return {
          family: "intercept-meaning-time",
          stem: `A tank holds V = ${start} ${MINUS} ${rate}t liters of water t minutes after a valve opens. After how many minutes is the tank empty?`,
          correct: zero,
          wrong: [
            [start, "This is the starting volume in liters, not a time."],
            [rate, "This is the number of liters lost each minute."],
            [start - rate, "This is the volume remaining after one minute."],
            [zero * 2, "This doubles the emptying time for no stated reason."],
          ],
          explanation: `Set V = 0: ${rate}t = ${start}, so t = ${zero} minutes.`,
          steps: ["Set the volume equal to zero.", "Solve the resulting linear equation.", "Interpret the solution as a time in minutes."],
          principles: ["The x-intercept of a linear model is where the modelled quantity reaches zero."],
          verification: quotient(start, rate),
        };
      },
    ],
    Hard: [
      (t, scene) => {
        const rate = t.int(9, 24);
        const fixed = t.int(20, 80);
        const h1 = t.int(3, 6);
        const h2 = h1 + t.int(3, 7);
        const c1 = rate * h1 + fixed;
        const c2 = rate * h2 + fixed;
        return {
          family: "recover-fee-from-two-costs",
          stem: `A vendor charges a one-time setup fee plus a constant amount per hour to deliver ${scene.item}. A ${h1}-hour job costs $${c1} and a ${h2}-hour job costs $${c2}. What is the setup fee, in dollars?`,
          correct: fixed,
          wrong: [
            [rate, "This is the hourly charge, found from the two points but not the fee."],
            [c1 - rate, "This subtracts one hour of labor instead of all " + h1 + " hours."],
            [c1 / h1, "This treats the whole first bill as hourly charges."],
            [c2 - rate * h1, "This subtracts the first job's labor from the second job's total."],
          ],
          explanation: `The hourly rate is (${c2} ${MINUS} ${c1})/(${h2} ${MINUS} ${h1}) = ${rate}. Then the fee is ${c1} ${MINUS} ${rate}(${h1}) = ${fixed}.`,
          steps: ["Find the rate of change from the two cost-hour pairs.", "Substitute one pair into C = rh + f.", "Solve for the fee f."],
          principles: ["Two points determine a linear model; the intercept is the fixed component."],
          trap: "The rate of change is only the first step here; the question asks for the intercept.",
          verification: linearCheck(1, rate * h1, c1),
        };
      },
      (t) => {
        const rate = t.int(3, 9);
        const fixed = t.int(15, 60);
        const target = t.int(4, 12);
        const budget = rate * target + fixed;
        const raise = t.int(2, 5);
        const newTarget = Math.floor((budget - fixed) / (rate + raise));
        return {
          family: "intercept-shift-capacity",
          stem: `A club's spending is modeled by C = ${lin(rate, fixed, "n")} dollars for n project kits. The club has exactly $${budget} and can currently afford ${target} kits. If the per-kit price rises by $${raise} while the fixed cost is unchanged, what is the greatest number of kits the club can afford?`,
          correct: newTarget,
          wrong: [
            [target, "This ignores the price increase."],
            [target - raise, "This subtracts the price increase from the number of kits."],
            [Math.floor(budget / (rate + raise)), "This spends the fixed cost on kits as well."],
            [newTarget + 1, "This rounds up, which pushes the total past the available money."],
          ],
          explanation: `With the new price, ${rate + raise}n + ${fixed} ≤ ${budget} gives n ≤ ${formatNumber(Math.round(((budget - fixed) / (rate + raise)) * 1000) / 1000)}, so at most ${newTarget} kits.`,
          steps: ["Write the revised cost model.", "Set it less than or equal to the budget.", "Round the solution down to a whole number of kits."],
          principles: ["A budget constraint is an inequality; whole-item answers round toward the feasible side."],
          trap: "Rounding a budget constraint up produces a total the club cannot pay.",
        };
      },
    ],
  },

  "no or infinite solutions": {
    Easy: [
      (t) => {
        const k = t.int(2, 7);
        const n = t.int(2, 12);
        const off = t.nonzero(-6, 6);
        return {
          family: "count-solutions-distribute",
          stem: `How many solutions does ${k}(x + ${n}) = ${lin(k, k * n + off)} have?`,
          correct: "No solutions",
          wrong: [
            ["Infinitely many solutions", "The constants differ after distributing, so the equation is a contradiction rather than an identity."],
            ["Exactly one solution", "The x-terms cancel, so no single value of x can be isolated."],
            ["Exactly two solutions", "A linear equation can never have exactly two solutions."],
          ],
          explanation: `Distributing gives ${lin(k, k * n)} = ${lin(k, k * n + off)}. Subtracting ${k}x leaves ${k * n} = ${k * n + off}, which is false.`,
          steps: ["Distribute on the left.", "Subtract the matching x-terms.", "Judge the numerical statement that remains."],
          principles: ["A false numerical statement means the equation has no solution."],
        };
      },
      (t) => {
        const k = t.int(2, 7);
        const n = t.int(2, 12);
        return {
          family: "count-solutions-identity",
          stem: `How many solutions does ${k}(x + ${n}) = ${lin(k, k * n)} have?`,
          correct: "Infinitely many solutions",
          wrong: [
            ["No solutions", "The two sides are identical after distributing, so nothing is contradicted."],
            ["Exactly one solution", "Both sides simplify to the same expression, so every x works, not just one."],
            ["Exactly two solutions", "A linear equation is never satisfied by exactly two values."],
          ],
          explanation: `Distributing gives ${lin(k, k * n)} on both sides, a statement true for every x.`,
          steps: ["Distribute on the left.", "Compare both sides term by term.", "Recognize the identity."],
          principles: ["An identity is satisfied by every real number."],
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 5);
        const c = t.int(2, 5);
        const g = t.int(1, 6);
        const d = c * g;
        const identity = t.random() < 0.5;
        const e = identity ? a * g : a * g + t.nonzero(1, 3);
        const same = a * c;
        return {
          family: "count-solutions-both-sides",
          stem: `How many solutions does ${a}(${lin(c, d)}) = ${c}(${lin(a, e)}) have?`,
          correct: identity ? "Infinitely many solutions" : "No solutions",
          wrong: [
            [identity ? "No solutions" : "Infinitely many solutions", "This reverses the test: equal constants give an identity, unequal constants give a contradiction."],
            ["Exactly one solution", `Both sides distribute to ${same}x plus a constant, so the variable cancels and no unique solution can be isolated.`],
            ["Exactly two solutions", "The equation is linear, so two solutions are impossible."],
          ],
          explanation: `Both sides distribute to ${same}x plus a constant: ${lin(same, a * d)} and ${lin(same, c * e)}. Because the constants ${a * d} and ${c * e} ${identity ? "agree" : "differ"}, the equation has ${identity ? "infinitely many solutions" : "no solution"}.`,
          steps: ["Distribute on both sides.", "Confirm the x-coefficients match.", "Compare the constant terms."],
          principles: ["When the x-terms cancel, the constants decide between none and infinitely many."],
        };
      },
      (t) => {
        const a = t.int(3, 8);
        const b = t.int(2, 9);
        const x = t.int(2, 11);
        const c = a * x + b;
        return {
          family: "count-solutions-unique",
          stem: `How many solutions does ${lin(a, b)} = ${lin(a - 1, c - x)} have?`,
          correct: "Exactly one solution",
          wrong: [
            ["No solutions", "The x-coefficients differ, so the variable does not cancel."],
            ["Infinitely many solutions", "The two sides are not the same expression, so they agree at only one point."],
            ["Exactly two solutions", "A linear equation cannot have exactly two solutions."],
          ],
          explanation: `The x-coefficients ${a} and ${a - 1} are different, so subtracting leaves x = ${c - x - b}, a single value.`,
          steps: ["Compare the coefficients of x on each side.", "Note that unequal coefficients leave a solvable equation.", "Conclude that exactly one solution exists."],
          principles: ["Unequal x-coefficients guarantee exactly one solution."],
        };
      },
    ],
    Hard: [
      (t) => {
        const a = t.int(3, 9);
        const b = t.int(2, 12);
        const p = t.int(2, 6);
        const c = p * a;
        const d = p * b;
        return {
          family: "constant-for-infinite",
          stem: `The equation ${p}(${lin(a, b)}) = ${lin(c, 0)} + k is true for every value of x, where k is a constant. What is the value of k?`,
          correct: d,
          wrong: [
            [b, "This copies the constant before the factor of " + p + " is distributed."],
            [p + b, "This adds the outside factor instead of multiplying by it."],
            [c, "This is the coefficient of x, not the constant term."],
            [d + p, "This distributes the factor once too often."],
          ],
          explanation: `Distributing gives ${lin(c, d)} = ${lin(c, 0)} + k, so k = ${d}.`,
          steps: ["Distribute the outside factor.", "Match the x-terms, which already agree.", "Match the constant terms to find k."],
          principles: ["An identity requires equal coefficients and equal constants."],
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const k = t.int(3, 15);
        const c = a * k;
        const b = t.int(3, 14);
        const off = t.nonzero(-4, 4);
        const d = a * b + off * a;
        return {
          family: "constant-for-no-solution",
          stem: `For what value of the constant k does ${a}(kx ${MINUS} ${b}) = ${lin(c, d)} have no solution?`,
          correct: k,
          wrong: [
            [c, "This uses the right-hand coefficient of x directly, skipping the division by " + a + "."],
            [b, "This is the constant inside the parentheses, not the coefficient to be matched."],
            [-k, "This changes the sign, which does not make the x-terms cancel."],
            [a * c, "This multiplies by the outside factor instead of dividing by it."],
          ],
          explanation: `Distributing gives ${a}kx ${MINUS} ${a * b} = ${lin(c, d)}. The x-terms cancel only when ${a}k = ${c}, that is k = ${k}; the constants ${MINUS}${a * b} and ${num(d)} differ, so the equation has no solution.`,
          steps: ["Distribute the factor on the left.", "Set the x-coefficients equal.", "Verify the constants disagree so the result is a contradiction."],
          principles: ["No solution requires equal x-coefficients and unequal constants."],
          trap: "If the constants had also matched, the same k would give infinitely many solutions instead.",
          verification: quotient(c, a),
        };
      },
      (t) => {
        const a = t.int(2, 5);
        const d = t.int(2, 6);
        const e = d * t.int(2, 7);
        const target = a * e;
        return {
          family: "fraction-identity-constant",
          stem: `The equation (${lin(a * d, target)})/${d} = ${lin(a, 0)} + c is true for every value of x, where c is a constant. What is the value of c?`,
          correct: target / d,
          wrong: [
            [target, "This forgets to divide the constant term by the denominator."],
            [a * d, "This is the numerator's x-coefficient, not the constant."],
            [d, "This is the denominator itself."],
            [target + d, "This adds the denominator rather than dividing by it."],
          ],
          explanation: `Dividing each term by ${d} gives ${lin(a, 0)} + ${formatNumber(target / d)}, so c = ${formatNumber(target / d)}.`,
          steps: ["Divide every term of the numerator by the denominator.", "Compare with ax + c.", "Read the constant term."],
          principles: ["Dividing a sum by a number divides every term by that number."],
          verification: quotient(target, d),
        };
      },
    ],
  },
});

[
  "no or infinite solutions|Easy",
  "no or infinite solutions|Medium",
].forEach((cell) => TEXT_ANSWER.add(cell));

defineShapes({
  "slope": {
    Easy: [
      (t) => {
        const slope = t.int(2, 7) * t.sign();
        const x1 = t.int(-6, 4);
        const y1 = t.int(-8, 9);
        const run = t.int(2, 6);
        const x2 = x1 + run;
        const y2 = y1 + slope * run;
        return {
          family: "slope-two-points",
          stem: `In the xy-plane, a line passes through ${point(x1, y1)} and ${point(x2, y2)}. What is the slope of this line?`,
          correct: slope,
          wrong: [
            [(x2 - x1) / (y2 - y1), "This divides the run by the rise, inverting the slope."],
            [y2 - y1, "This reports the change in y without dividing by the change in x."],
            [-slope, "This subtracts the coordinates in opposite orders in the numerator and denominator."],
            [(y2 + y1) / (x2 + x1), "This adds the coordinates instead of subtracting them."],
          ],
          explanation: `Slope = (${num(y2)} ${MINUS} (${num(y1)}))/(${num(x2)} ${MINUS} (${num(x1)})) = ${num(slope * run)}/${run} = ${num(slope)}.`,
          steps: ["Subtract the y-coordinates in a fixed order.", "Subtract the x-coordinates in the same order.", "Divide the rise by the run."],
          principles: ["Slope = (y₂ − y₁)/(x₂ − x₁)."],
          verification: quotient(slope * run, run),
        };
      },
      (t) => {
        const a = t.int(2, 8);
        const c = t.int(6, 40);
        return {
          family: "slope-standard-form-easy",
          stem: `What is the slope of the line ${lin(a, 0)} + y = ${c}?`,
          correct: -a,
          wrong: [
            [a, "This drops the sign that appears when the x-term moves to the other side."],
            [c, "This is the y-intercept, not the slope."],
            [c - a, "This subtracts the coefficients instead of isolating y."],
            [-c, "This negates the constant rather than the coefficient of x."],
          ],
          explanation: `Solving for y gives y = ${lin(-a, c)}, so the slope is ${num(-a)}.`,
          steps: [`Subtract ${a}x from both sides.`, "Read the coefficient of x.", "Keep the negative sign."],
          principles: ["Rewrite in y = mx + b form to read the slope."],
        };
      },
    ],
    Medium: [
      (t) => {
        const b = t.pick([2, 4, 5, 8, 10]);
        const a = t.int(2, 15);
        const c = t.int(20, 180);
        const slope = -a / b;
        return {
          family: "slope-parallel-standard-form",
          stem: `Line k is parallel to the line ${lin(a, 0)} + ${lin(b, 0, "y")} = ${c} in the xy-plane. What is the slope of line k?`,
          correct: slope,
          wrong: [
            [a / b, "This forgets that moving the x-term across the equals sign changes its sign."],
            [-b / a, "This inverts the ratio of the coefficients."],
            [b / a, "This inverts the ratio and drops the sign."],
            [1 / (a / b), "This uses the slope of a perpendicular line instead of a parallel one."],
          ],
          explanation: `Solve for y: y = ${MINUS}(${a}/${b})x + ${formatNumber(c / b)}. Parallel lines share a slope, so line k has slope ${num(slope)}.`,
          steps: ["Rewrite the given line in slope-intercept form.", "Read its slope.", "Use the same slope, since parallel lines have equal slopes."],
          principles: ["For Ax + By = C the slope is −A/B."],
          verification: quotient(-a, b),
        };
      },
      (t) => {
        const run = t.int(3, 9);
        const rise = -t.int(2, 12);
        const x1 = t.int(-9, 3);
        const y1 = t.int(2, 18);
        return {
          family: "slope-two-points-negative",
          stem: `A line in the xy-plane contains ${point(x1, y1)} and ${point(x1 + run, y1 + rise)}. What is the slope of the line?`,
          correct: rise / run,
          wrong: [
            [-rise / run, "This ignores that the y-value decreases from the first point to the second."],
            [run / rise, "This divides the run by the rise."],
            [rise, "This reports only the change in y."],
            [(y1 + rise + y1) / (2 * x1 + run), "This averages the coordinates instead of taking differences."],
          ],
          explanation: `Slope = ${num(rise)}/${run} = ${num(rise / run)}.`,
          steps: ["Compute the change in y, keeping its sign.", "Compute the change in x.", "Divide and simplify."],
          principles: ["A line falling from left to right has a negative slope."],
          verification: quotient(rise, run),
        };
      },
    ],
    Hard: [
      (t) => {
        const p = t.int(2, 5);
        const q = t.int(3, 8);
        const s = t.int(2, 6);
        const x1 = t.int(-8, 6);
        const y1 = t.int(-9, 9);
        const y2 = y1 + p * s;
        const answer = x1 + q * s;
        return {
          family: "slope-missing-coordinate",
          stem: `In the xy-plane, line ℓ has slope ${p}/${q} and passes through ${point(x1, y1)}. If the point (t, ${num(y2)}) also lies on line ℓ, what is the value of t?`,
          correct: answer,
          wrong: [
            [x1 + p * s, "This treats the slope as 1, adding the change in y directly to the x-coordinate."],
            [x1 - q * s, "This moves left instead of right along the line."],
            [q * s, "This finds the change in x but never adds it to the starting x-coordinate."],
            [y1 + q * s, "This adds the change in x to the y-coordinate instead of the x-coordinate."],
          ],
          explanation: `The rise is ${num(y2)} ${MINUS} (${num(y1)}) = ${p * s}. Since ${p}/${q} = ${p * s}/${q * s}, the run is ${q * s}, so t = ${num(x1)} + ${q * s} = ${num(answer)}.`,
          steps: ["Find the change in y between the two points.", "Scale the slope so its numerator equals that change.", "Add the matching run to the known x-coordinate."],
          principles: ["Equivalent slope ratios scale the rise and run by the same factor."],
          trap: "The change in y is not the change in x unless the slope is 1.",
          verification: { kind: "sum", inputs: [x1, q * s], expected: answer },
        };
      },
      (t) => {
        const p = t.pick([2, 4, 5]);
        const q = t.int(3, 9);
        const x1 = t.int(-7, 5);
        const y1 = t.int(-9, 8);
        const x2 = x1 + q;
        const y2 = y1 + p;
        return {
          family: "slope-perpendicular",
          stem: `Line n is perpendicular to the line that passes through ${point(x1, y1)} and ${point(x2, y2)}. What is the slope of line n?`,
          correct: -q / p,
          wrong: [
            [p / q, "This is the slope of the original line, not of a perpendicular line."],
            [-p / q, "This negates the original slope but does not take its reciprocal."],
            [q / p, "This takes the reciprocal but omits the required sign change."],
            [-p * q, "This multiplies the rise and run instead of inverting their ratio."],
          ],
          explanation: `The given line has slope ${p}/${q}. Perpendicular slopes multiply to ${MINUS}1, so line n has slope ${MINUS}${q}/${p} = ${num(-q / p)}.`,
          steps: ["Find the slope of the given line from its two points.", "Take the negative reciprocal.", "Simplify."],
          principles: ["Perpendicular lines have slopes whose product is −1."],
          trap: "A negative reciprocal changes both the sign and the orientation of the fraction.",
          verification: quotient(-q, p),
        };
      },
      (t) => {
        const a = t.pick([2, 4, 5, 8]);
        const b = t.int(3, 20);
        return {
          family: "slope-from-intercepts",
          stem: `A line in the xy-plane has x-intercept (${a}, 0) and y-intercept (0, ${b}). What is the slope of the line?`,
          correct: -b / a,
          wrong: [
            [b / a, "This ignores that the line falls as x increases from 0 to the x-intercept."],
            [-a / b, "This inverts the rise and the run."],
            [a / b, "This inverts the ratio and drops the sign."],
            [b - a, "This subtracts the intercepts instead of forming their ratio."],
          ],
          explanation: `Slope = (0 ${MINUS} ${b})/(${a} ${MINUS} 0) = ${MINUS}${b}/${a} = ${num(-b / a)}.`,
          steps: ["Write the intercepts as ordered pairs.", "Apply the slope formula to those two points.", "Simplify the signed fraction."],
          principles: ["An x-intercept has y = 0 and a y-intercept has x = 0."],
          verification: quotient(-b, a),
        };
      },
    ],
  },

  "intercepts": {
    Easy: [
      (t) => {
        const m = t.int(2, 9) * t.sign();
        const b = t.int(12, 95) * t.sign();
        return {
          family: "y-intercept-read",
          stem: `What is the y-coordinate of the y-intercept of the graph of y = ${lin(m, b)}?`,
          correct: b,
          wrong: [
            [m, "This is the slope, the coefficient of x."],
            [-b / m, "This is the x-intercept, found by setting y equal to 0."],
            [m + b, "This is the value of y at x = 1, not at x = 0."],
            [-b, "This changes the sign of the constant term."],
          ],
          explanation: `Substituting x = 0 gives y = ${num(b)}.`,
          steps: ["Set x = 0.", "Evaluate the expression.", "Report the resulting y-value."],
          principles: ["The y-intercept of y = mx + b is b."],
        };
      },
      (t) => {
        const m = t.int(2, 8);
        const r = t.int(2, 14);
        return {
          family: "x-intercept-read",
          stem: `At what value of x does the graph of y = ${lin(m, -m * r)} cross the x-axis?`,
          correct: r,
          wrong: [
            [-m * r, "This is the y-intercept, not the x-intercept."],
            [m * r, "This drops the negative sign carried by the constant term."],
            [-r, "This divides by the coefficient but keeps the wrong sign."],
            [m, "This is the slope."],
          ],
          explanation: `Set y = 0: ${m}x = ${m * r}, so x = ${r}.`,
          steps: ["Set y equal to 0.", "Solve the resulting linear equation.", "Report the x-value."],
          principles: ["A graph crosses the x-axis where y = 0."],
          verification: linearCheck(m, -m * r, 0),
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 9);
        const b = t.int(2, 9);
        const k = t.int(3, 12);
        const c = a * b * k;
        return {
          family: "x-intercept-standard-form",
          stem: `The graph of ${lin(a, 0)} + ${lin(b, 0, "y")} = ${c} is a line in the xy-plane. What is the x-coordinate of its x-intercept?`,
          correct: c / a,
          wrong: [
            [c / b, "This is the y-intercept, found by setting x rather than y equal to 0."],
            [c, "This ignores the coefficient of x."],
            [c - a, "This subtracts the coefficient instead of dividing by it."],
            [a / c, "This inverts the division."],
          ],
          explanation: `Set y = 0: ${a}x = ${c}, so x = ${c / a}.`,
          steps: ["Substitute y = 0.", "Divide by the coefficient of x.", "Report the x-coordinate."],
          principles: ["The x-intercept of Ax + By = C is C/A."],
          verification: quotient(c, a),
        };
      },
      (t) => {
        const m = t.int(2, 9) * t.sign();
        const p = t.int(2, 12);
        const b = t.int(-40, 40);
        const q = m * p + b;
        return {
          family: "y-intercept-from-point",
          stem: `A line in the xy-plane has slope ${num(m)} and passes through ${point(p, q)}. What is the y-coordinate of its y-intercept?`,
          correct: b,
          wrong: [
            [q, "This is the y-coordinate of the given point, which is not on the y-axis."],
            [q + m * p, "This adds the slope times the run instead of subtracting it."],
            [m * p, "This is only the change in y from the intercept to the given point."],
            [q - m, "This subtracts one slope step instead of " + p + " of them."],
          ],
          explanation: `Substitute into y = mx + b: ${num(q)} = ${num(m)}(${p}) + b, so b = ${num(q)} ${MINUS} (${num(m * p)}) = ${num(b)}.`,
          steps: ["Write y = mx + b with the known slope.", "Substitute the given point.", "Solve for b."],
          principles: ["A slope and one point determine a line's intercept."],
          verification: linearCheck(1, m * p, q),
        };
      },
    ],
    Hard: [
      (t) => {
        const a = t.int(2, 9);
        const yi = t.int(2, 12);
        const k = t.int(2, 9);
        const c = k * yi;
        return {
          family: "unknown-coefficient-from-intercept",
          stem: `In the xy-plane, the graph of ${lin(a, 0)} + ky = ${c} has y-intercept (0, ${yi}), where k is a nonzero constant. What is the value of k?`,
          correct: k,
          wrong: [
            [c / a, "This is the x-coordinate of the x-intercept, not the coefficient k."],
            [yi, "This repeats the y-intercept instead of dividing the constant by it."],
            [c - yi, "This subtracts the intercept from the constant instead of dividing."],
            [a, "This is the coefficient of x."],
          ],
          explanation: `At the y-intercept x = 0, so k(${yi}) = ${c} and k = ${k}.`,
          steps: ["Substitute x = 0, since the y-intercept lies on the y-axis.", `Solve k(${yi}) = ${c}.`, "Report k."],
          principles: ["Substituting a known point into an equation determines an unknown coefficient."],
          trap: "The x-term vanishes at the y-intercept; its coefficient never enters the calculation.",
          verification: quotient(c, yi),
        };
      },
      (t) => {
        const g = t.int(2, 9) * t.sign();
        const r = t.int(2, 12);
        const d = t.int(2, 8);
        const x1 = r + d;
        const y1 = g * d;
        return {
          family: "y-intercept-from-point-and-x-intercept",
          stem: `A line in the xy-plane passes through ${point(x1, y1)} and crosses the x-axis at (${r}, 0). What is the y-coordinate of its y-intercept?`,
          correct: -r * g,
          wrong: [
            [r * g, "This uses the correct magnitude but the wrong sign for travelling back to x = 0."],
            [y1, "This is the y-coordinate of the given point, not of the y-intercept."],
            [g, "This is the slope of the line."],
            [-y1, "This negates the given point's y-coordinate instead of extending the line to the y-axis."],
          ],
          explanation: `The slope is (${num(y1)} ${MINUS} 0)/(${x1} ${MINUS} ${r}) = ${num(g)}. Moving ${r} units left from (${r}, 0) changes y by ${MINUS}${r}(${num(g)}), so the y-intercept is ${num(-r * g)}.`,
          steps: ["Use the two points to find the slope.", "Apply y = m(x − r) using the x-intercept.", "Evaluate at x = 0."],
          principles: ["Any two points determine a line, and the y-intercept is its value at x = 0."],
          verification: { kind: "product", inputs: [-r, g], expected: -r * g },
        };
      },
      (t) => {
        const m = t.int(2, 7);
        const u = t.int(2, 12) * t.sign();
        const b = m * u;
        const sum = u * (m - 1);
        return {
          family: "intercept-sum",
          stem: `In the xy-plane, the graph of y = ${lin(m, 0)} + b has slope ${m}, and the sum of its x-intercept and its y-intercept is ${num(sum)}. What is the value of b?`,
          correct: b,
          wrong: [
            [sum, "This treats the reported sum as the y-intercept itself."],
            [-u, "This is the x-intercept, not the y-intercept."],
            [u, "This is the negative of the x-intercept."],
            [sum + m, "This adds the slope to the sum rather than solving the intercept equation."],
          ],
          explanation: `The x-intercept is ${MINUS}b/${m}, so ${MINUS}b/${m} + b = ${num(sum)}. Then b(${m} ${MINUS} 1)/${m} = ${num(sum)} and b = ${num(b)}.`,
          steps: ["Express the x-intercept in terms of b.", "Add the two intercepts and set the total equal to the given sum.", "Solve the resulting linear equation for b."],
          principles: ["An intercept condition becomes a linear equation in the unknown constant."],
          trap: "The x-intercept is −b/m, not b/m; the sign controls the whole calculation.",
          verification: { kind: "product", inputs: [m, u], expected: b },
        };
      },
    ],
  },

  "function notation": {
    Easy: [
      (t) => {
        const a = t.int(2, 9);
        const b = t.int(-15, 15);
        const input = t.int(2, 12);
        return {
          family: "evaluate-linear",
          stem: `The function f is defined by f(x) = ${lin(a, b)}. What is the value of f(${input})?`,
          correct: a * input + b,
          wrong: [
            [a + input + b, "This adds the coefficient to the input instead of multiplying."],
            [a * (input + b), "This adds the constant before multiplying, changing the order of operations."],
            [a * input, "This omits the constant term."],
            [a * input - b, "This subtracts the constant instead of adding it."],
          ],
          explanation: `f(${input}) = ${a}(${input}) ${signed(b)} = ${num(a * input + b)}.`,
          steps: [`Replace every x with ${input}.`, "Multiply before adding.", "Simplify."],
          principles: ["f(a) means the value of the rule at input a."],
          verification: { kind: "sum", inputs: [a * input, b], expected: a * input + b },
        };
      },
      (t) => {
        const a = t.int(2, 8);
        const b = t.int(3, 20);
        const input = -t.int(2, 9);
        return {
          family: "evaluate-negative-input",
          stem: `If g(x) = ${lin(a, -b)}, what is the value of g(${num(input)})?`,
          correct: a * input - b,
          wrong: [
            [a * Math.abs(input) - b, "This drops the negative sign on the input."],
            [a * input + b, "This adds the constant instead of subtracting it."],
            [-(a * Math.abs(input) + b), "This distributes the negative sign onto the constant as well."],
            [a * input, "This omits the constant term."],
          ],
          explanation: `g(${num(input)}) = ${a}(${num(input)}) ${MINUS} ${b} = ${num(a * input)} ${MINUS} ${b} = ${num(a * input - b)}.`,
          steps: ["Substitute the negative input, keeping its sign.", "Multiply.", "Subtract the constant."],
          principles: ["A negative input keeps its sign through multiplication."],
          verification: { kind: "sum", inputs: [a * input, -b], expected: a * input - b },
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 9);
        const b = t.int(-18, 18);
        const x = t.int(2, 14);
        const value = a * x + b;
        return {
          family: "solve-function-equation",
          stem: `The function f is defined by f(x) = ${lin(a, b)}. If f(x) = ${num(value)}, what is the value of x?`,
          correct: x,
          wrong: [
            [value, "This reports the output rather than the input that produces it."],
            [value - b, "This subtracts the constant but never divides by the coefficient."],
            [value / a, "This divides first and leaves the constant untouched."],
            [(value + b) / a, "This adds the constant instead of subtracting it before dividing."],
          ],
          explanation: `Solve ${lin(a, b)} = ${num(value)}: ${a}x = ${num(value - b)}, so x = ${x}.`,
          steps: ["Set the rule equal to the given output.", "Undo the constant term.", "Divide by the coefficient of x."],
          principles: ["Solving f(x) = k reverses the function's rule."],
          verification: linearCheck(a, b, value),
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(-9, 9);
        const c = t.int(2, 5);
        const d = t.int(-9, 9);
        const input = t.int(2, 7);
        const inner = c * input + d;
        return {
          family: "composition-numeric",
          stem: `The functions f and g are defined by f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}. What is the value of f(g(${input}))?`,
          correct: a * inner + b,
          wrong: [
            [c * (a * input + b) + d, "This evaluates the composition in the wrong order, computing g(f(" + input + "))."],
            [inner, "This stops after evaluating the inner function."],
            [a * input + b, "This applies only the outer function to the original input."],
            [(a * input + b) * (c * input + d), "This multiplies the two outputs instead of composing the functions."],
          ],
          explanation: `g(${input}) = ${num(inner)}, then f(${num(inner)}) = ${a}(${num(inner)}) ${signed(b)} = ${num(a * inner + b)}.`,
          steps: ["Evaluate the inner function first.", "Use that output as the input to the outer function.", "Simplify."],
          principles: ["f(g(x)) applies g first, then f."],
          trap: "Composition is not commutative; g(f(x)) generally differs from f(g(x)).",
          verification: { kind: "sum", inputs: [a * inner, b], expected: a * inner + b },
        };
      },
    ],
    Hard: [
      (t) => {
        const m = t.int(2, 9) * t.sign();
        const n = t.int(-20, 20);
        const p = t.int(1, 5);
        const q = p + t.int(2, 6);
        const target = t.int(8, 16);
        return {
          family: "linear-function-from-two-values",
          stem: `The function f is linear. If f(${p}) = ${num(m * p + n)} and f(${q}) = ${num(m * q + n)}, what is the value of f(${target})?`,
          correct: m * target + n,
          wrong: [
            [m * (target - q) + m * q + n - n, "This finds the change in f but forgets to add f at the reference input."],
            [n, "This is the value of f at 0, not at " + target + "."],
            [m * target, "This omits the constant term of the linear rule."],
            [m * p + n + (target - p), "This adds one unit of output per unit of input instead of the actual rate."],
          ],
          explanation: `The rate of change is (${num(m * q + n)} ${MINUS} (${num(m * p + n)}))/(${q} ${MINUS} ${p}) = ${num(m)}, so f(x) = ${lin(m, n)} and f(${target}) = ${num(m * target + n)}.`,
          steps: ["Find the constant rate of change from the two given values.", "Use one point to recover the constant term.", `Evaluate the rule at ${target}.`],
          principles: ["A linear function is determined by any two of its values."],
          trap: "The rate of change alone does not give f(" + target + "); the constant term still matters.",
          verification: { kind: "sum", inputs: [m * target, n], expected: m * target + n },
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(-12, 12);
        const input = t.int(2, 6);
        const inner = a * input + b;
        const k = t.int(-30, 40);
        const value = inner * inner + k;
        return {
          family: "composition-unknown-constant",
          stem: `The functions f and g are defined by f(x) = ${lin(a, b)} and g(x) = x² + k, where k is a constant. If g(f(${input})) = ${num(value)}, what is the value of k?`,
          correct: k,
          wrong: [
            [value - inner, "This subtracts f(" + input + ") instead of its square."],
            [value, "This treats the given output as k, ignoring the squared term."],
            [inner * inner, "This is the squared inner value, not the constant that is added to it."],
            [value - a * input, "This subtracts only the first term of f(" + input + ")."],
          ],
          explanation: `f(${input}) = ${num(inner)}, so g(${num(inner)}) = ${num(inner)}² + k = ${inner * inner} + k = ${num(value)} and k = ${num(k)}.`,
          steps: ["Evaluate the inner linear function.", "Substitute that value into the quadratic rule.", "Solve the resulting linear equation for k."],
          principles: ["Composition substitutes one function's output into the other's rule."],
          trap: "The inner output must be squared before k is isolated.",
          verification: linearCheck(1, inner * inner, value),
        };
      },
      (t) => {
        const m = t.int(2, 7);
        const n = t.int(-12, 12);
        const shift = t.int(2, 8);
        const lift = t.int(2, 15);
        const input = t.int(3, 12);
        const answer = m * (input - shift) + n + lift;
        return {
          family: "transformed-function-value",
          stem: `The function f is defined by f(x) = ${lin(m, n)}, and the function h is defined by h(x) = f(x ${MINUS} ${shift}) + ${lift}. What is the value of h(${input})?`,
          correct: answer,
          wrong: [
            [m * (input + shift) + n + lift, "This shifts the input in the wrong direction."],
            [m * (input - shift) + n - lift, "This subtracts the vertical shift instead of adding it."],
            [m * input + n + lift, "This applies the vertical shift but ignores the horizontal one."],
            [m * (input - shift) + n, "This applies the horizontal shift but ignores the vertical one."],
          ],
          explanation: `h(${input}) = f(${input} ${MINUS} ${shift}) + ${lift} = f(${input - shift}) + ${lift} = ${num(m * (input - shift) + n)} + ${lift} = ${num(answer)}.`,
          steps: ["Reduce the input by the horizontal shift.", "Evaluate f at that input.", "Add the vertical shift."],
          principles: ["f(x − h) + k shifts the graph h units right and k units up."],
          trap: "Inside the function, subtracting shifts the graph right, which reduces the input before evaluation.",
          verification: { kind: "sum", inputs: [m * (input - shift) + n, lift], expected: answer },
        };
      },
    ],
  },

  "graph interpretation": {
    Easy: [
      (t, scene) => {
        const rate = t.int(3, 24);
        const hours = t.int(2, 6);
        return {
          family: "read-rate-from-graph",
          stem: `On a graph of distance versus time for a delivery of ${scene.item}, the distance rises ${rate * hours} miles as the time increases from 0 to ${hours} hours. What is the constant speed, in miles per hour?`,
          correct: rate,
          wrong: [
            [rate * hours, "This is the total distance rather than the distance per hour."],
            [hours / (rate * hours), "This computes hours per mile, the reciprocal of the requested rate."],
            [rate * hours - hours, "This subtracts the time from the distance instead of dividing."],
            [rate + hours, "A rate requires division, not addition."],
          ],
          explanation: `Speed = ${rate * hours} miles ÷ ${hours} hours = ${rate} miles per hour.`,
          steps: ["Identify the vertical change.", "Identify the horizontal change.", "Divide, and attach the units."],
          principles: ["The slope of a distance-time graph is speed."],
          verification: quotient(rate * hours, hours),
        };
      },
      (t) => {
        const b = t.int(40, 260);
        const m = t.int(3, 18);
        const x = t.int(2, 9);
        return {
          family: "read-value-from-line",
          stem: `A line in the xy-plane passes through (0, ${b}) and rises ${m} units for every 1 unit increase in x. What is the value of y when x = ${x}?`,
          correct: m * x + b,
          wrong: [
            [b + m, "This adds a single step instead of " + x + " steps."],
            [m * x, "This omits the starting value at x = 0."],
            [b * x + m, "This multiplies the starting value by x instead of the rate."],
            [b - m * x, "This treats the line as falling rather than rising."],
          ],
          explanation: `y = ${lin(m, b)}, so y = ${m}(${x}) + ${b} = ${m * x + b}.`,
          steps: ["Write the equation from the intercept and rate.", `Substitute x = ${x}.`, "Simplify."],
          principles: ["A constant rate of change gives y = mx + b."],
          verification: { kind: "sum", inputs: [m * x, b], expected: m * x + b },
        };
      },
    ],
    Medium: [
      (t) => {
        const rate = t.int(4, 25);
        const zeroAt = t.int(6, 20);
        const start = rate * zeroAt;
        const x = t.int(2, zeroAt - 1);
        return {
          family: "value-on-falling-line",
          stem: `A line in the xy-plane passes through (0, ${start}) and (${zeroAt}, 0). What is the value of y when x = ${x}?`,
          correct: start - rate * x,
          wrong: [
            [start - x, "This subtracts the input instead of the input times the rate."],
            [rate * x, "This is the amount of decrease, not the remaining value."],
            [start + rate * x, "This treats the line as rising."],
            [start - rate, "This subtracts a single step regardless of x."],
          ],
          explanation: `The slope is (0 ${MINUS} ${start})/(${zeroAt} ${MINUS} 0) = ${MINUS}${rate}, so y = ${start} ${MINUS} ${rate}x and y = ${start - rate * x} at x = ${x}.`,
          steps: ["Find the slope from the two intercepts.", "Write the equation of the line.", `Evaluate at x = ${x}.`],
          principles: ["Two intercepts determine a line's slope and equation."],
          verification: { kind: "sum", inputs: [start, -rate * x], expected: start - rate * x },
        };
      },
      (t, scene) => {
        const rate = t.int(6, 30);
        const base = t.int(20, 140);
        const w1 = t.int(2, 5);
        const w2 = w1 + t.int(3, 8);
        const w3 = w2 + t.int(2, 7);
        return {
          family: "extend-linear-trend",
          stem: `A graph of weekly attendance at ${scene.place} is linear. Attendance is ${rate * w1 + base} in week ${w1} and ${rate * w2 + base} in week ${w2}. What attendance does the graph predict for week ${w3}?`,
          correct: rate * w3 + base,
          wrong: [
            [rate * w2 + base + rate, "This adds one week of growth instead of " + (w3 - w2) + "."],
            [rate * w3, "This omits the value the trend starts from at week 0."],
            [rate * w2 + base + (w3 - w2), "This adds one person per week rather than the actual weekly rate."],
            [2 * (rate * w2 + base) - (rate * w1 + base), "This doubles the later value instead of continuing the constant rate."],
          ],
          explanation: `The weekly rate is (${rate * w2 + base} ${MINUS} ${rate * w1 + base})/(${w2} ${MINUS} ${w1}) = ${rate}, so week ${w3} gives ${rate * w2 + base} + ${rate}(${w3 - w2}) = ${rate * w3 + base}.`,
          steps: ["Find the rate of change between the two known weeks.", "Multiply the rate by the number of additional weeks.", "Add to the later known value."],
          principles: ["A linear graph extends by repeatedly adding its constant rate."],
          verification: { kind: "sum", inputs: [rate * w2 + base, rate * (w3 - w2)], expected: rate * w3 + base },
        };
      },
    ],
    Hard: [
      (t) => {
        const rate = t.int(5, 30);
        const zeroAt = t.int(8, 24);
        const start = rate * zeroAt;
        const steps = t.int(2, zeroAt - 2);
        const value = start - rate * steps;
        return {
          family: "solve-for-input-on-line",
          stem: `A line in the xy-plane passes through (0, ${start}) and (${zeroAt}, 0). For what value of x does the line reach y = ${value}?`,
          correct: steps,
          wrong: [
            [value, "This reports the y-value instead of the x-value that produces it."],
            [start - value, "This is the total drop in y, not the number of x-units needed to produce it."],
            [zeroAt - steps, "This measures the remaining distance to the x-intercept instead of the distance from 0."],
            [Math.round((value / rate) * 1000) / 1000, "This divides the target value by the rate without accounting for the starting height."],
          ],
          explanation: `The line is y = ${start} ${MINUS} ${rate}x. Setting ${start} ${MINUS} ${rate}x = ${value} gives ${rate}x = ${start - value}, so x = ${steps}.`,
          steps: ["Write the equation from the two intercepts.", "Set y equal to the target value.", "Solve the linear equation for x."],
          principles: ["Reading a graph backwards means solving for the input."],
          trap: "The requested value is an input; the drop in y is only an intermediate quantity.",
          verification: quotient(start - value, rate),
        };
      },
      (t, scene) => {
        const startA = t.int(120, 400);
        const rateA = t.int(3, 12);
        const gap = t.int(4, 14);
        const rateB = rateA + t.int(2, 9);
        const startB = startA - gap * (rateB - rateA) - t.int(1, rateB - rateA);
        const crossing = (startA - startB) / (rateB - rateA);
        return {
          family: "least-week-one-line-exceeds",
          stem: `At ${scene.place}, membership A is modeled by y = ${lin(rateA, startA, "w")} and membership B by y = ${lin(rateB, startB, "w")}, where w is the number of weeks. What is the least integer value of w for which membership B exceeds membership A?`,
          correct: Math.floor(crossing) + 1,
          wrong: [
            [Math.floor(crossing), "This is the last week in which B has not yet passed A."],
            [startA - startB, "This is the initial gap, not the number of weeks needed to close it."],
            [rateB - rateA, "This is the weekly gain in the gap, not the number of weeks."],
            [Math.floor(crossing) + 2, "This overshoots by one week past the first week in which B is ahead."],
          ],
          explanation: `B exceeds A when ${lin(rateB, startB, "w")} > ${lin(rateA, startA, "w")}, that is ${rateB - rateA}w > ${startA - startB}, so w > ${formatNumber(Math.round(crossing * 1000) / 1000)}. The least integer is ${Math.floor(crossing) + 1}.`,
          steps: ["Set up the strict inequality between the two models.", "Collect the w-terms and the constants.", "Divide, then take the least integer strictly greater than the boundary."],
          principles: ["The first integer past a strict boundary is the next whole number above it."],
          trap: "A strict inequality excludes the crossing week itself.",
        };
      },
      (t, scene) => {
        const first = t.int(3, 9);
        const cut = t.int(10, 30);
        const second = t.int(1, first - 1);
        const total = cut + t.int(5, 40);
        const answer = first * cut + second * (total - cut);
        return {
          family: "piecewise-rate-total",
          stem: `A graph of the cost of printing ${scene.item} is made of two line segments: the cost rises $${first} per copy for the first ${cut} copies and $${second} per copy after that. What is the total cost, in dollars, of ${total} copies?`,
          correct: answer,
          wrong: [
            [first * total, "This charges the higher rate for every copy."],
            [second * total, "This charges the lower rate for every copy."],
            [first * cut + second * total, "This applies the lower rate to all " + total + " copies instead of only the copies past " + cut + "."],
            [(first + second) * total / 2, "This averages the two rates, which weights them equally even though the segments have different lengths."],
          ],
          explanation: `The first ${cut} copies cost ${first} · ${cut} = $${first * cut}. The remaining ${total - cut} copies cost ${second} · ${total - cut} = $${second * (total - cut)}. The total is $${answer}.`,
          steps: ["Split the order at the point where the rate changes.", "Charge each segment at its own rate.", "Add the two amounts."],
          principles: ["A piecewise-linear graph must be evaluated segment by segment."],
          trap: "The second rate applies only to the copies beyond the breakpoint.",
          verification: { kind: "sum", inputs: [first * cut, second * (total - cut)], expected: answer },
        };
      },
    ],
  },

  "equation modeling": {
    Easy: [
      (t, scene) => {
        const rate = t.int(4, 18);
        const start = t.int(20, 180);
        const weeks = t.int(3, 9);
        return {
          family: "evaluate-growth-model",
          stem: `${scene.place} starts with ${start} ${scene.item} and adds ${rate} more each week, so the total after w weeks is y = ${lin(rate, start, "w")}. How many are there after ${weeks} weeks?`,
          correct: rate * weeks + start,
          wrong: [
            [rate * weeks, "This counts only the additions and drops the starting supply."],
            [rate + start + weeks, "This adds the number of weeks instead of multiplying by the weekly rate."],
            [start * weeks + rate, "This multiplies the starting amount by the weeks."],
            [start - rate * weeks, "This treats the weekly change as a loss."],
          ],
          explanation: `y = ${rate}(${weeks}) + ${start} = ${rate * weeks + start}.`,
          steps: [`Substitute w = ${weeks}.`, "Multiply the weekly rate by the number of weeks.", "Add the starting amount."],
          principles: ["A linear model adds rate × time to an initial value."],
          verification: { kind: "sum", inputs: [rate * weeks, start], expected: rate * weeks + start },
        };
      },
      (t, scene) => {
        const price = t.int(3, 24);
        const fee = t.int(5, 60);
        const count = t.int(4, 20);
        return {
          family: "total-cost-fee-plus-unit",
          stem: `An order of ${scene.item} costs $${price} per item plus a flat $${fee} shipping charge. What is the total cost, in dollars, of ${count} items?`,
          correct: price * count + fee,
          wrong: [
            [price * count, "This omits the shipping charge."],
            [(price + fee) * count, "This charges the flat shipping fee once per item."],
            [price + fee * count, "This multiplies the shipping charge by the number of items instead of the price."],
            [price * count - fee, "This subtracts the shipping charge instead of adding it."],
          ],
          explanation: `Total = ${price}(${count}) + ${fee} = ${price * count + fee}.`,
          steps: ["Multiply the unit price by the count.", "Add the one-time charge.", "Report the total."],
          principles: ["A flat fee is added once, not once per unit."],
          verification: { kind: "sum", inputs: [price * count, fee], expected: price * count + fee },
        };
      },
    ],
    Medium: [
      (t, scene) => {
        const rate = t.int(5, 22);
        const start = t.int(15, 120);
        const weeks = t.int(4, 16);
        const target = rate * weeks + start;
        return {
          family: "solve-model-for-time",
          stem: `${scene.place} has ${start} ${scene.item} and receives ${rate} more each week. After how many weeks will there be exactly ${target}?`,
          correct: weeks,
          wrong: [
            [target - start, "This is the number of items still needed, not the number of weeks."],
            [Math.round((target / rate) * 1000) / 1000, "This divides the target by the weekly rate without removing the starting supply."],
            [target - rate, "This subtracts the weekly rate from the target."],
            [weeks + 1, "This adds an extra week beyond the exact solution."],
          ],
          explanation: `Solve ${lin(rate, start, "w")} = ${target}: ${rate}w = ${target - start}, so w = ${weeks}.`,
          steps: ["Set the model equal to the target.", "Subtract the starting amount.", "Divide by the weekly rate."],
          principles: ["Solving a model for its input answers a 'how long' question."],
          verification: linearCheck(rate, start, target),
        };
      },
      (t, scene) => {
        const monthly = t.int(12, 60);
        const join = t.int(20, 150);
        const months = 12;
        const total = monthly * months + join;
        return {
          family: "recover-rate-from-total",
          stem: `A ${scene.place} membership charges a one-time $${join} joining fee plus the same amount each month. A member who paid for ${months} months paid $${total} in total. What is the monthly charge, in dollars?`,
          correct: monthly,
          wrong: [
            [Math.round((total / months) * 1000) / 1000, "This divides the whole total by 12, charging part of the joining fee to every month."],
            [total - join, "This is the total paid in monthly charges, not the charge for one month."],
            [monthly + join, "This adds the joining fee to a single month."],
            [Math.round(((total - join) / (months + 1)) * 1000) / 1000, "This divides by 13, counting the joining fee as an extra month."],
          ],
          explanation: `Subtract the joining fee: ${total} ${MINUS} ${join} = ${total - join}. Divide by ${months}: $${monthly} per month.`,
          steps: ["Remove the one-time fee from the total.", "Divide the remainder by the number of months.", "Report the monthly charge."],
          principles: ["Separate one-time charges from recurring charges before dividing."],
          verification: quotient(total - join, months),
        };
      },
    ],
    Hard: [
      (t, scene) => {
        const cheap = t.int(4, 11);
        const dear = cheap + t.int(3, 10);
        const many = t.int(20, 70);
        const few = t.int(15, 60);
        const count = many + few;
        const money = cheap * many + dear * few;
        return {
          family: "two-variable-purchase-system",
          stem: `${scene.place} sold ${count} tickets, some at $${cheap} each and the rest at $${dear} each, collecting $${money} in all. How many tickets were sold at $${dear}?`,
          correct: few,
          wrong: [
            [many, "This is the number of tickets sold at the lower price."],
            [count - 2 * few, "This subtracts the higher-priced tickets twice."],
            [Math.round((money / dear) * 1000) / 1000, "This assumes every ticket was sold at the higher price."],
            [Math.round((money / count) * 1000) / 1000, "This is the average price per ticket, not a count of tickets."],
          ],
          explanation: `With x + y = ${count} and ${cheap}x + ${dear}y = ${money}, substitution gives ${cheap}(${count} ${MINUS} y) + ${dear}y = ${money}, so ${dear - cheap}y = ${money - cheap * count} and y = ${few}.`,
          steps: ["Name the two ticket counts and write the count equation.", "Write the money equation.", "Substitute and solve for the requested count."],
          principles: ["A two-quantity purchase gives one count equation and one value equation."],
          trap: "Both counts satisfy the system; only the higher-priced count answers the question.",
          verification: quotient(money - cheap * count, dear - cheap),
        };
      },
      (t) => {
        const p = t.int(3, 12);
        const q = t.int(2, 11);
        const minutes = t.int(6, 40);
        const pages = (p + q) * minutes;
        return {
          family: "combined-rate-time",
          stem: `One printer prints ${p} pages per minute and a second prints ${q} pages per minute. Working at the same time, how many minutes do the two printers need to print ${pages} pages?`,
          correct: minutes,
          wrong: [
            [Math.round((pages / p) * 1000) / 1000, "This uses only the first printer's rate."],
            [Math.round((pages / q) * 1000) / 1000, "This uses only the second printer's rate."],
            [Math.round((pages / (p * q)) * 1000) / 1000, "This multiplies the two rates instead of adding them."],
            [p + q, "This is the combined pages per minute, not the number of minutes."],
          ],
          explanation: `Together the printers produce ${p} + ${q} = ${p + q} pages per minute, so ${pages} ÷ ${p + q} = ${minutes} minutes.`,
          steps: ["Add the two rates, since the printers work simultaneously.", "Divide the total pages by the combined rate.", "Report the time in minutes."],
          principles: ["Rates for simultaneous work add; times do not."],
          trap: "Adding the separate times, or multiplying the rates, both misstate simultaneous work.",
          verification: quotient(pages, p + q),
        };
      },
      (t, scene) => {
        const small = t.int(6, 14);
        const large = small + t.int(4, 12);
        const boxes = t.int(5, 14);
        const largeCount = t.int(1, boxes - 1);
        const total = small * (boxes - largeCount) + large * largeCount;
        return {
          family: "integer-container-system",
          stem: `Every crate of ${scene.item} holds either ${small} or ${large} items. ${boxes} crates hold ${total} items in all. How many of the crates hold ${large} items?`,
          correct: largeCount,
          wrong: [
            [boxes - largeCount, "This is the number of smaller crates."],
            [Math.round(((total - small * boxes) / large) * 1000) / 1000, "This divides the surplus by the larger capacity instead of by the difference in capacities."],
            [Math.round((total / large) * 1000) / 1000, "This assumes every crate is a large one."],
            [total - small * boxes, "This is the surplus over all-small crates, not a count of crates."],
          ],
          explanation: `If all ${boxes} crates held ${small}, they would hold ${small * boxes}. The surplus ${total} ${MINUS} ${small * boxes} = ${total - small * boxes} is made up ${large - small} items at a time, so ${largeCount} crates are large.`,
          steps: ["Assume every crate is the smaller size and compute that total.", "Divide the surplus by the difference in capacities.", "Report the number of larger crates."],
          principles: ["A two-size counting problem reduces to one equation in the surplus."],
          trap: "Dividing the surplus by the larger capacity, rather than by the difference, overcounts.",
          verification: quotient(total - small * boxes, large - small),
        };
      },
    ],
  },

  "solve systems": {
    Easy: [
      (t) => {
        const x = t.int(2, 14);
        const y = t.int(2, 14);
        return {
          family: "sum-and-difference",
          stem: `If x + y = ${x + y} and x ${MINUS} y = ${num(x - y)}, what is the value of x?`,
          correct: x,
          wrong: [
            [y, "This is the value of y."],
            [2 * x, "This adds the equations but never divides by 2."],
            [2 * y, "This subtracts the equations, which isolates y rather than x."],
            [x + y, "This is the sum given in the first equation."],
          ],
          explanation: `Adding the equations gives 2x = ${2 * x}, so x = ${x}.`,
          steps: ["Add the two equations so y cancels.", "Divide by 2.", "Check both equations."],
          principles: ["Add equations when a variable has opposite coefficients."],
          verification: quotient(2 * x, 2),
        };
      },
      (t) => {
        const a = t.int(2, 7);
        const b = t.int(-12, 12);
        const x = t.int(2, 12);
        const y = a * x + b;
        return {
          family: "substitution-known-y",
          stem: `In the system y = ${lin(a, b)} and y = ${num(y)}, what is the value of x?`,
          correct: x,
          wrong: [
            [y, "This is the value of y, which was already given."],
            [y - b, "This removes the constant but never divides by the coefficient."],
            [Math.round((y / a) * 1000) / 1000, "This divides before removing the constant term."],
            [a * y + b, "This substitutes the y-value into the rule instead of solving for x."],
          ],
          explanation: `Substituting gives ${lin(a, b)} = ${num(y)}, so ${a}x = ${num(y - b)} and x = ${x}.`,
          steps: ["Set the two expressions for y equal.", "Isolate the x-term.", "Divide by the coefficient of x."],
          principles: ["Substitution replaces one variable with an equal expression."],
          verification: linearCheck(a, b, y),
        };
      },
    ],
    Medium: [
      (t) => {
        const x = t.int(2, 9);
        const y = t.int(2, 9);
        const a = t.int(2, 6);
        const b = t.int(2, 6);
        const c = t.int(2, 6);
        return {
          family: "elimination-two-coefficients",
          stem: `If ${lin(a, 0)} + ${lin(b, 0, "y")} = ${a * x + b * y} and ${lin(c, 0)} ${MINUS} ${lin(b, 0, "y")} = ${num(c * x - b * y)}, what is the value of x?`,
          correct: x,
          wrong: [
            [y, "This is the value of y."],
            [a * x + b * y, "This is the total from the first equation, not the value of x."],
            [x + y, "This is the sum of the two unknowns."],
            [(a * x + b * y + c * x - b * y), "This adds the equations but never divides by the combined coefficient."],
          ],
          explanation: `Adding the equations eliminates y: ${a + c}x = ${a * x + c * x}, so x = ${x}.`,
          steps: ["Add the equations so the y-terms cancel.", "Divide by the combined coefficient of x.", "Substitute back to check."],
          principles: ["Opposite coefficients let one variable be eliminated by addition."],
          verification: quotient((a + c) * x, a + c),
        };
      },
      (t) => {
        const x = t.int(2, 11);
        const y = t.int(2, 11);
        const a = t.int(2, 5);
        const b = a + t.int(1, 3);
        const first = a * x + b * y;
        const second = b * x + a * y;
        return {
          family: "symmetric-system-sum",
          stem: `If ${lin(a, 0)} + ${lin(b, 0, "y")} = ${first} and ${lin(b, 0)} + ${lin(a, 0, "y")} = ${second}, what is the value of x + y?`,
          correct: x + y,
          wrong: [
            [first + second, "This adds the equations but never divides by the combined coefficient."],
            [x, "This is x alone, not the requested sum."],
            [Math.round(((first - second) / (a - b)) * 1000) / 1000, "This subtracts the equations, which gives x − y rather than x + y."],
            [Math.round(((first + second) / 2) * 1000) / 1000, "This divides by 2 instead of by the sum of the coefficients."],
          ],
          explanation: `Adding gives ${a + b}(x + y) = ${first + second}, so x + y = ${formatNumber((first + second) / (a + b))}.`,
          steps: ["Add the two equations.", "Factor the common sum x + y.", "Divide by the combined coefficient."],
          principles: ["A symmetric system can be solved for x + y without finding x and y separately."],
          trap: "Finding x and y individually wastes time; the sum falls out of a single addition.",
          verification: quotient(first + second, a + b),
        };
      },
    ],
    Hard: [
      (t) => {
        const a = t.int(2, 9);
        const b = t.int(2, 9);
        const scale = t.int(2, 5);
        const c = scale * a;
        const d = scale * b;
        const e = t.int(3, 30);
        const f = scale * e + t.nonzero(-6, 6);
        return {
          family: "system-no-solution-coefficient",
          stem: `The system ${lin(a, 0)} + ${lin(b, 0, "y")} = ${e} and kx + ${lin(d, 0, "y")} = ${num(f)} has no solution, where k is a constant. What is the value of k?`,
          correct: c,
          wrong: [
            [a, "This copies the first equation's x-coefficient without scaling by the same factor as the y-coefficients."],
            [scale, "This is the scale factor between the equations, not the coefficient itself."],
            [d, "This is the y-coefficient of the second equation."],
            [Math.round((d / a) * 1000) / 1000, "This divides the y-coefficient by the x-coefficient instead of scaling consistently."],
          ],
          explanation: `Two linear equations have no solution when the coefficients are proportional but the constants are not. Since ${d}/${b} = ${scale}, we need k = ${scale} · ${a} = ${c}; the constants ${num(f)} and ${scale} · ${e} = ${scale * e} differ, so the system is inconsistent.`,
          steps: ["Compare the y-coefficients to find the scale factor between the equations.", "Apply the same factor to the x-coefficient.", "Confirm the constant terms do not match."],
          principles: ["Parallel lines have proportional coefficients and non-proportional constants."],
          trap: "If the constants had scaled too, the same k would give infinitely many solutions.",
          verification: { kind: "product", inputs: [scale, a], expected: c },
        };
      },
      (t) => {
        const a = t.int(2, 8);
        const b = t.int(2, 8);
        const e = t.int(3, 24);
        const scale = t.int(2, 6);
        return {
          family: "system-infinite-constant",
          stem: `The system ${lin(a, 0)} + ${lin(b, 0, "y")} = ${e} and ${lin(scale * a, 0)} + ${lin(scale * b, 0, "y")} = c has infinitely many solutions, where c is a constant. What is the value of c?`,
          correct: scale * e,
          wrong: [
            [e, "This copies the first constant without applying the scale factor."],
            [scale, "This is the factor relating the equations, not the constant."],
            [e + scale, "This adds the factor instead of multiplying by it."],
            [scale * e + scale, "This scales the constant and then adds the factor again."],
          ],
          explanation: `The second equation is ${scale} times the first in its x- and y-terms, so the two describe the same line only when c = ${scale} · ${e} = ${scale * e}.`,
          steps: ["Compare the coefficients to find the scale factor.", "Apply that factor to the constant term.", "Confirm the equations are identical multiples."],
          principles: ["Infinitely many solutions means one equation is a nonzero multiple of the other."],
          verification: { kind: "product", inputs: [scale, e], expected: scale * e },
        };
      },
      (t) => {
        const x = t.int(2, 14);
        const y = t.int(2, 14);
        const a = t.int(3, 9);
        const b = a - t.int(1, 2);
        const first = a * x + b * y;
        const second = b * x + a * y;
        return {
          family: "difference-of-equations",
          stem: `If ${lin(a, 0)} + ${lin(b, 0, "y")} = ${first} and ${lin(b, 0)} + ${lin(a, 0, "y")} = ${second}, what is the value of x ${MINUS} y?`,
          correct: (first - second) / (a - b),
          wrong: [
            [first - second, "This subtracts the equations but never divides by the difference of the coefficients."],
            [Math.round(((first + second) / (a + b)) * 1000) / 1000, "This adds the equations, which gives x + y instead of x − y."],
            [x, "This is x alone, not the requested difference."],
            [Math.round(((second - first) / (a - b)) * 1000) / 1000, "This subtracts in the reverse order, giving y − x."],
          ],
          explanation: `Subtracting the second equation from the first gives ${a - b}(x ${MINUS} y) = ${num(first - second)}, so x ${MINUS} y = ${num((first - second) / (a - b))}.`,
          steps: ["Subtract one equation from the other.", "Factor the common difference x − y.", "Divide by the difference of the coefficients."],
          principles: ["Combining equations can produce a requested expression directly."],
          trap: "Solving for x and y separately is slower and invites arithmetic slips; the difference falls out in one step.",
          verification: quotient(first - second, a - b),
        };
      },
    ],
  },

  "interpret intersection": {
    Easy: [
      (t, scene) => {
        const day = t.int(3, 12);
        const value = t.int(40, 260);
        return {
          family: "meaning-of-intersection",
          stem: `Two models for daily attendance at ${scene.place} are graphed on the same axes, where x is the number of days since opening and y is attendance. The graphs intersect at (${day}, ${value}). What does this point represent?`,
          correct: `On day ${day}, both models predict an attendance of ${value}.`,
          wrong: [
            [`Attendance reaches its maximum of ${value} on day ${day}.`, "An intersection is where two models agree, not where either one peaks."],
            [`Attendance grows by ${value} each day after day ${day}.`, "The coordinates give one attendance value, not a rate of change."],
            [`The first model predicts ${day} and the second predicts ${value}.`, "Both coordinates belong to both models at the point where the graphs meet."],
          ],
          explanation: `A point on both graphs satisfies both models, so at x = ${day} the two predictions are equal, and their common value is y = ${value}.`,
          steps: ["Recall that a point of intersection lies on both graphs.", "Read the x-coordinate as the shared input.", "Read the y-coordinate as the shared output."],
          principles: ["An intersection is the input-output pair the two models share."],
        };
      },
      (t) => {
        const m = t.int(2, 9);
        const b = t.int(5, 60);
        const k = t.int(3, 10);
        const level = m * k + b;
        return {
          family: "intersection-with-horizontal",
          stem: `The graphs of y = ${lin(m, b)} and y = ${level} intersect at one point in the xy-plane. What is the x-coordinate of that point?`,
          correct: k,
          wrong: [
            [level, "This is the y-coordinate of the intersection."],
            [level - b, "This removes the constant but never divides by the slope."],
            [Math.round((level / m) * 1000) / 1000, "This divides before subtracting the constant."],
            [m + b, "This adds the slope and intercept, which is the value of y at x = 1."],
          ],
          explanation: `Set ${lin(m, b)} = ${level}: ${m}x = ${level - b}, so x = ${k}.`,
          steps: ["Set the two expressions for y equal.", "Solve the resulting linear equation.", "Report the x-coordinate."],
          principles: ["A horizontal line meets a slanted line where the outputs are equal."],
          verification: linearCheck(m, b, level),
        };
      },
    ],
    Medium: [
      (t, scene) => {
        const feeA = t.int(20, 90);
        const rateA = t.int(3, 9);
        const rateB = rateA + t.int(2, 8);
        const hours = t.int(3, 14);
        const feeB = feeA + (rateA - rateB) * hours;
        return {
          family: "equal-cost-hours",
          stem: `Renting equipment at ${scene.place} costs $${feeA} plus $${rateA} per hour under plan A and $${feeB} plus $${rateB} per hour under plan B. After how many hours do the two plans cost the same?`,
          correct: hours,
          wrong: [
            [feeA - feeB, "This is the difference in the flat fees, not a number of hours."],
            [rateB - rateA, "This is the difference in hourly rates, not a number of hours."],
            [feeA + rateA * hours, "This is the shared cost in dollars, not the time."],
            [hours + 1, "This is one hour past the point where the costs are equal."],
          ],
          explanation: `Set ${lin(rateA, feeA, "h")} = ${lin(rateB, feeB, "h")}: ${feeA - feeB} = ${rateB - rateA}h, so h = ${hours}.`,
          steps: ["Write a cost expression for each plan.", "Set the expressions equal.", "Solve for the number of hours."],
          principles: ["Two linear costs are equal at the intersection of their graphs."],
          verification: quotient(feeA - feeB, rateB - rateA),
        };
      },
      (t, scene) => {
        const feeA = t.int(30, 120);
        const rateA = t.int(4, 12);
        const rateB = rateA + t.int(3, 9);
        const hours = t.int(3, 12);
        const feeB = feeA + (rateA - rateB) * hours;
        const shared = feeA + rateA * hours;
        return {
          family: "equal-cost-amount",
          stem: `At ${scene.place}, plan A costs $${feeA} plus $${rateA} per hour and plan B costs $${feeB} plus $${rateB} per hour. What is the cost, in dollars, at the number of hours where the two plans cost the same?`,
          correct: shared,
          wrong: [
            [hours, "This is the number of hours at which the plans agree, not the cost."],
            [feeA + feeB, "This adds the two flat fees."],
            [feeA + rateB * hours, "This mixes plan A's fee with plan B's hourly rate."],
            [shared * 2, "This adds the two plans' costs together instead of reporting the shared cost."],
          ],
          explanation: `The plans agree after ${hours} hours; plan A then costs ${feeA} + ${rateA}(${hours}) = $${shared}, and plan B costs the same.`,
          steps: ["Find the hour count where the two costs are equal.", "Substitute that value into either cost expression.", "Report the shared dollar amount."],
          principles: ["The y-coordinate of an intersection is the common output value."],
          trap: "The question asks for the y-coordinate of the intersection, not the x-coordinate.",
          verification: { kind: "sum", inputs: [feeA, rateA * hours], expected: shared },
        };
      },
    ],
    Hard: [
      (t, scene) => {
        const feeA = t.int(40, 140);
        const rateA = t.int(3, 8);
        const rateB = rateA + t.int(2, 7);
        const cross = t.int(4, 15);
        const feeB = feeA + (rateA - rateB) * cross;
        return {
          family: "least-hour-plan-cheaper",
          stem: `At ${scene.place}, plan A costs $${feeA} plus $${rateA} per hour and plan B costs $${feeB} plus $${rateB} per hour. What is the least whole number of hours for which plan A costs less than plan B?`,
          correct: cross + 1,
          wrong: [
            [cross, "At this many hours the two plans cost exactly the same, so plan A is not yet cheaper."],
            [feeA - feeB, "This is the difference in flat fees, not a number of hours."],
            [rateB - rateA, "This is the difference in hourly rates."],
            [cross + 2, "This overshoots the first hour at which plan A is cheaper."],
          ],
          explanation: `Plan A costs less when ${lin(rateA, feeA, "h")} < ${lin(rateB, feeB, "h")}, that is ${feeA - feeB} < ${rateB - rateA}h, so h > ${cross}. The least whole number is ${cross + 1}.`,
          steps: ["Write a strict inequality between the two costs.", "Solve for h.", "Take the least whole number strictly greater than the boundary."],
          principles: ["A strict inequality excludes the break-even point itself."],
          trap: "The break-even hour is where the costs are equal, not where plan A is cheaper.",
        };
      },
      (t, scene) => {
        const perWeekA = t.int(2, 9);
        const startB = t.int(20, 120);
        const startA = startB + t.int(20, 100);
        const perDayB = t.int(2, 4);
        const perWeekB = 7 * perDayB;
        const gap = startA - startB;
        const diff = perWeekB - perWeekA;
        const weeks = Math.ceil(gap / diff);
        return {
          family: "unit-mismatch-intersection",
          stem: `${scene.place} has ${startA} ${scene.item} and gains ${perWeekA} more each week. A second site has ${startB} and gains ${perDayB} each day. Assuming steady rates, what is the least whole number of weeks after which the second site has at least as many as the first?`,
          correct: weeks,
          wrong: [
            [Math.ceil(gap / perDayB), "This treats a daily rate as though it were already a weekly rate."],
            [gap, "This is the initial difference in supply, not a number of weeks."],
            [diff, "This is the weekly gain in the gap, not the number of weeks."],
            [weeks * 7, "This reports the answer in days rather than weeks."],
          ],
          explanation: `The second site gains ${perDayB} · 7 = ${perWeekB} per week, so it closes the gap of ${gap} at ${diff} per week. Since ${gap}/${diff} = ${formatNumber(Math.round((gap / diff) * 1000) / 1000)}, the least whole number of weeks is ${weeks}.`,
          steps: ["Convert the daily rate to a weekly rate.", "Write the inequality comparing the two supplies.", "Divide and round up to a whole number of weeks."],
          principles: ["Rates must share a time unit before they can be compared."],
          trap: "Comparing 'per day' with 'per week' directly reverses which site is growing faster.",
        };
      },
    ],
  },

  "solve inequalities": {
    Easy: [
      (t) => {
        const a = t.int(2, 8);
        const boundary = t.int(3, 18);
        const j = t.int(1, 7);
        const b = a * j;
        const c = a * boundary + b;
        return {
          family: "least-integer-strict",
          stem: `If ${lin(a, b)} > ${c}, what is the least integer value of x that satisfies the inequality?`,
          correct: boundary + 1,
          wrong: [
            [boundary, "The inequality is strict, so the boundary value itself is not a solution."],
            [c - b, "This subtracts the constant but never divides by the coefficient."],
            [boundary + j, "This divides only part of the expression by the coefficient."],
            [boundary - 1, "This chooses a value on the wrong side of the boundary."],
          ],
          explanation: `Subtract ${b} and divide by ${a}: x > ${boundary}. The least integer greater than ${boundary} is ${boundary + 1}.`,
          steps: ["Isolate the x-term.", "Divide by the positive coefficient.", "Choose the least integer strictly greater than the boundary."],
          principles: ["Dividing by a positive number preserves the direction of an inequality."],
        };
      },
      (t) => {
        const a = t.int(2, 9);
        const boundary = t.int(3, 16);
        const c = a * boundary;
        return {
          family: "greatest-integer-strict",
          stem: `If ${lin(a, 0)} < ${c}, what is the greatest integer value of x that satisfies the inequality?`,
          correct: boundary - 1,
          wrong: [
            [boundary, "The inequality is strict, so x cannot equal the boundary."],
            [c, "This is the right-hand constant, not a solution for x."],
            [boundary + 1, "This is greater than the boundary and does not satisfy the inequality."],
            [c - a, "This subtracts the coefficient instead of dividing by it."],
          ],
          explanation: `Divide by ${a}: x < ${boundary}. The greatest integer less than ${boundary} is ${boundary - 1}.`,
          steps: ["Divide both sides by the positive coefficient.", "Note the strict inequality.", "Choose the greatest integer below the boundary."],
          principles: ["A strict inequality excludes its boundary value."],
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 7);
        const boundary = -t.int(2, 12);
        const b = t.int(3, 20);
        const c = -a * boundary + b;
        return {
          family: "negative-coefficient-flip",
          stem: `If ${MINUS}${lin(a, -b)} ≥ ${c}, what is the greatest integer value of x that satisfies the inequality?`,
          correct: boundary,
          wrong: [
            [-boundary, "This drops the sign that appears when both sides are divided by a negative number."],
            [boundary - 1, "This is a solution but not the greatest one."],
            [c - b, "This subtracts the constant without dividing by the coefficient."],
            [boundary + 1, "This keeps the inequality pointing the same way after dividing by a negative number."],
          ],
          explanation: `Rewrite as ${MINUS}${a}x + ${b} ≥ ${c}, so ${MINUS}${a}x ≥ ${num(c - b)}. Dividing by ${MINUS}${a} reverses the inequality: x ≤ ${num(boundary)}. The greatest integer is ${num(boundary)}.`,
          steps: ["Move the constant to the right side.", "Divide by the negative coefficient and reverse the inequality sign.", "Choose the greatest integer allowed."],
          principles: ["Dividing an inequality by a negative number reverses its direction."],
          trap: "Forgetting to reverse the sign produces the wrong half of the number line.",
        };
      },
      (t, scene) => {
        const rate = t.int(4, 18);
        const done = t.int(10, 90);
        const goal = done + rate * t.int(3, 14) + t.int(1, rate - 1);
        const hours = Math.ceil((goal - done) / rate);
        return {
          family: "least-hours-to-reach-goal",
          stem: `A crew has assembled ${done} ${scene.item} and assembles ${rate} more each hour. What is the least whole number of additional hours needed for the total to reach at least ${goal}?`,
          correct: hours,
          wrong: [
            [hours - 1, "This rounds the required time down, which leaves the crew short of the goal."],
            [goal - done, "This is the number of items still needed, not a number of hours."],
            [Math.ceil(goal / rate), "This ignores the work already completed."],
            [hours + 1, "This adds an unnecessary extra hour."],
          ],
          explanation: `Solve ${done} + ${rate}h ≥ ${goal}: h ≥ ${formatNumber(Math.round(((goal - done) / rate) * 1000) / 1000)}, so at least ${hours} hours are needed.`,
          steps: ["Write the inequality for the running total.", "Solve for the number of hours.", "Round up, since a partial hour does not finish the work."],
          principles: ["A 'reach at least' constraint rounds up to the next whole unit."],
          trap: "Rounding down leaves the total below the goal.",
        };
      },
    ],
    Hard: [
      (t) => {
        const a = t.int(3, 8);
        const b = t.int(2, 12);
        const boundary = t.int(5, 30);
        const c = a - 1;
        const kValue = c * boundary - a * b;
        return {
          family: "constant-from-solution-set",
          stem: `The solution set of ${a}(x ${MINUS} ${b}) ≤ x + k is x ≤ ${boundary}, where k is a constant. What is the value of k?`,
          correct: kValue,
          wrong: [
            [boundary, "This copies the boundary of the solution set without undoing the algebra."],
            [a * b, "This is the distributed product, only one part of the constant."],
            [boundary - a * b, "This forgets that the x-terms combine into " + c + "x before dividing."],
            [c * boundary + a * b, "This adds the distributed product instead of subtracting it."],
          ],
          explanation: `Distributing gives ${lin(a, 0)} ${MINUS} ${a * b} ≤ x + k, so ${c}x ≤ ${a * b} + k and x ≤ (${a * b} + k)/${c}. Setting (${a * b} + k)/${c} = ${boundary} gives k = ${num(kValue)}.`,
          steps: ["Distribute and collect the x-terms on one side.", "Divide by the coefficient of x to expose the boundary.", "Set that boundary equal to the given one and solve for k."],
          principles: ["The endpoint of a solution set is a linear equation in the unknown constant."],
          trap: "The x-term on the right must be combined with the left before dividing.",
          verification: linearCheck(1, a * b, c * boundary),
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(5, 40);
        const bound = t.int(4, 20);
        const c = b + a * bound;
        const mult = t.int(2, 6);
        const add = t.int(1, 20);
        const answer = mult * (-bound) + add;
        return {
          family: "greatest-value-of-expression",
          stem: `If ${b} ${MINUS} ${lin(a, 0)} ≥ ${c}, what is the greatest possible value of ${lin(mult, add)}?`,
          correct: answer,
          wrong: [
            [mult * bound + add, "This uses the positive boundary, ignoring the sign produced when dividing by a negative coefficient."],
            [-bound, "This is the greatest value of x, not of the requested expression."],
            [mult * (-bound), "This omits the constant term of the expression."],
            [mult * (-bound) - add, "This subtracts the constant instead of adding it."],
          ],
          explanation: `From ${b} ${MINUS} ${a}x ≥ ${c} we get ${MINUS}${a}x ≥ ${a * bound}, so x ≤ ${MINUS}${bound}. Then ${lin(mult, add)} ≤ ${mult}(${MINUS}${bound}) + ${add} = ${num(answer)}.`,
          steps: ["Solve the inequality for x, reversing the sign when dividing by a negative number.", "Multiply the bound by the coefficient in the requested expression.", "Add the constant term."],
          principles: ["Multiplying an inequality by a positive number preserves its direction."],
          trap: "The bound on x must be transformed by the same expression the question asks about.",
          verification: { kind: "sum", inputs: [mult * (-bound), add], expected: answer },
        };
      },
      (t) => {
        const low = t.int(-12, 4);
        const a = t.int(2, 6);
        const b = t.int(1, 15);
        const span = t.int(3, 12);
        const high = low + span;
        return {
          family: "compound-inequality-range",
          stem: `If ${num(a * low + b)} < ${lin(a, b)} < ${num(a * high + b)}, how many integer values of x satisfy the inequality?`,
          correct: span - 1,
          wrong: [
            [span + 1, "This counts both excluded endpoints."],
            [span, "This counts one of the strict endpoints as a solution."],
            [span - 2, "This drops an interior integer."],
            [a * span, "This counts in units of the coefficient rather than in integers of x."],
          ],
          explanation: `Subtract ${b} throughout and divide by ${a}: ${num(low)} < x < ${num(high)}. The integers strictly between are ${num(low + 1)} through ${num(high - 1)}, a total of ${span - 1}.`,
          steps: ["Subtract the constant from all three parts.", "Divide all three parts by the coefficient.", "Count the integers strictly inside the interval."],
          principles: ["Operations on a compound inequality apply to every part."],
          trap: "Both endpoints are strict here, so neither counts.",
        };
      },
    ],
  },

  "systems of inequalities": {
    Easy: [
      (t) => {
        const lower = t.int(-8, 9);
        const span = t.int(3, 11);
        const upper = lower + span;
        return {
          family: "count-integers-interval",
          stem: `An integer x satisfies both x > ${num(lower)} and x ≤ ${num(upper)}. How many values of x are possible?`,
          correct: span,
          wrong: [
            [span + 1, "This counts the strict lower boundary as a solution."],
            [span - 1, "This drops the upper boundary, which the inequality allows."],
            [upper, "This counts from zero rather than from the lower boundary."],
            [span + 2, "This counts both boundaries even though only one is included."],
          ],
          explanation: `The solutions are the integers ${num(lower + 1)} through ${num(upper)}, which is ${span} values.`,
          steps: ["Exclude the strict lower boundary.", "Include the upper boundary.", "Count the integers in the resulting list."],
          principles: ["A strict inequality excludes its boundary; ≤ includes it."],
        };
      },
      (t) => {
        const a = t.int(1, 4);
        const b = t.int(1, 4);
        const x = t.int(2, 6);
        const y = x + t.int(1, 5);
        const cap = a * x + b * y + t.int(1, 6);
        return {
          family: "which-point-satisfies",
          stem: `Which ordered pair (x, y) satisfies both ${lin(a, 0)} + ${lin(b, 0, "y")} ≤ ${cap} and y > x?`,
          correct: `(${x}, ${y})`,
          wrong: [
            [`(${y}, ${x})`, "This pair reverses the coordinates, so the condition y > x fails."],
            [`(${x + cap}, ${y + cap})`, "This pair is far too large and violates the first inequality."],
            [`(${x}, ${x})`, "Here y equals x, so the strict inequality y > x is not satisfied."],
          ],
          explanation: `Test each pair in both inequalities; only the correct pair keeps the weighted sum at or below ${cap} while making y strictly greater than x.`,
          steps: ["Substitute each pair into the first inequality.", "Substitute the surviving pairs into the second inequality.", "Keep the pair that satisfies both."],
          principles: ["A solution to a system of inequalities must satisfy every inequality at once."],
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(3, 9);
        const yMax = t.int(3, 14);
        const cap = b * yMax + t.int(0, a - 1);
        return {
          family: "greatest-y-under-constraint",
          stem: `In the system x ≥ 0, y ≥ 0, and ${lin(a, 0)} + ${lin(b, 0, "y")} ≤ ${cap}, what is the greatest possible integer value of y?`,
          correct: yMax,
          wrong: [
            [yMax + 1, "This exceeds the constraint once x is set to its smallest allowed value of 0."],
            [Math.floor(cap / a), "This uses the coefficient of x instead of the coefficient of y."],
            [cap, "This ignores the coefficient of y entirely."],
            [Math.floor(cap / (a + b)), "This divides by the sum of the coefficients rather than by the coefficient of y."],
          ],
          explanation: `y is largest when x = 0, so ${b}y ≤ ${cap} and y ≤ ${formatNumber(Math.round((cap / b) * 1000) / 1000)}. The greatest integer is ${yMax}.`,
          steps: ["Note that reducing x leaves more room for y.", "Set x = 0 and solve for y.", "Round down to the greatest integer."],
          principles: ["An optimum of a linear objective on a feasible region occurs at a corner."],
        };
      },
      (t) => {
        const lower = t.int(1, 9);
        const span = t.int(4, 12);
        const upper = lower + span;
        const a = t.int(2, 5);
        return {
          family: "count-integers-two-constraints",
          stem: `How many integer values of x satisfy both ${lin(a, 0)} ≥ ${a * lower} and x < ${upper}?`,
          correct: span,
          wrong: [
            [span + 1, "This counts the strict upper boundary as a solution."],
            [span - 1, "This drops the lower boundary, which the inequality allows."],
            [a * span, "This counts in units of the coefficient rather than in integer values of x."],
            [upper, "This counts every integer from 1 rather than from the lower boundary."],
          ],
          explanation: `The first inequality gives x ≥ ${lower} and the second gives x < ${upper}, so x runs from ${lower} to ${upper - 1}: ${span} values.`,
          steps: ["Divide the first inequality by its coefficient.", "Combine the two bounds into one interval.", "Count the integers in that interval."],
          principles: ["The solution of a system of inequalities is the overlap of the individual solutions."],
        };
      },
    ],
    Hard: [
      (t, scene) => {
        const p = t.int(20, 45);
        const q = p + t.int(20, 60);
        const total = t.int(8, 20);
        const minY = t.int(2, Math.max(2, total - 2));
        const money = p * total + (q - p) * minY - t.int(1, q - p - 1);
        const answer = Math.ceil((money - p * total) / (q - p));
        return {
          family: "least-count-under-two-constraints",
          stem: `${scene.place} orders x standard kits at $${p} each and y deluxe kits at $${q} each. The order has at most ${total} kits in all and must cost at least $${money}. What is the least possible value of y?`,
          correct: answer,
          wrong: [
            [answer - 1, "This value leaves the order below the required minimum cost."],
            [Math.ceil(money / q), "This assumes every kit is a deluxe kit, ignoring the limit on the total number."],
            [total - answer, "This is the largest possible number of standard kits."],
            [answer + 1, "This is more deluxe kits than the constraints require."],
          ],
          explanation: `With x + y ≤ ${total}, cost is at most ${p}(${total} ${MINUS} y) + ${q}y = ${p * total} + ${q - p}y. Requiring ${p * total} + ${q - p}y ≥ ${money} gives y ≥ ${formatNumber(Math.round(((money - p * total) / (q - p)) * 1000) / 1000)}, so the least whole number is ${answer}.`,
          steps: ["Use the count constraint to write the cost in terms of y alone.", "Impose the minimum-cost constraint.", "Solve for y and round up to a whole kit."],
          principles: ["Substituting one constraint into another reduces a system to a single inequality."],
          trap: "Ignoring the cap on total kits makes the cheaper kits look unlimited and understates y.",
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(2, 6);
        const s = t.int(1, 8);
        const c = t.int(-10, 15);
        const d = c + (a + b) * s;
        const yMax = a * s + c;
        return {
          family: "greatest-y-two-upper-bounds",
          stem: `In the xy-plane, a point (x, y) satisfies both y ≤ ${lin(a, c)} and y ≤ ${lin(-b, d)}. What is the greatest possible value of y?`,
          correct: yMax,
          wrong: [
            [c, "This is the y-value of the first line at x = 0, but the second constraint is not yet binding there."],
            [d, "This is the y-value of the second line at x = 0, which violates the first constraint."],
            [s, "This is the x-coordinate where the two bounds meet, not the y-value."],
            [yMax + s, "This adds the crossing x-value to the y-value."],
          ],
          explanation: `Both bounds hold at once, so y is largest where the two lines meet: ${lin(a, c)} = ${lin(-b, d)} gives x = ${s}, and then y = ${a}(${s}) ${signed(c)} = ${num(yMax)}.`,
          steps: ["Recognize that y is capped by the smaller of the two expressions.", "Find where the two caps are equal.", "Evaluate either expression at that point."],
          principles: ["The maximum of a quantity bounded by two lines occurs where the bounds cross."],
          trap: "Maximizing one bound alone ignores the other constraint and lands outside the region.",
          verification: { kind: "sum", inputs: [a * s, c], expected: yMax },
        };
      },
      (t, scene) => {
        const total = t.int(12, 30);
        const a = t.int(2, 6);
        const b = a + t.int(3, 8);
        const need = b * total - (b - a) * t.int(2, total - 2);
        const xMax = Math.floor((b * total - need) / (b - a));
        return {
          family: "greatest-count-under-two-constraints",
          stem: `A shipment from ${scene.place} contains x light crates weighing ${a} kilograms each and y heavy crates weighing ${b} kilograms each. There are at most ${total} crates and the shipment weighs at least ${need} kilograms. What is the greatest possible value of x?`,
          correct: xMax,
          wrong: [
            [xMax + 1, "This many light crates leaves the shipment below the required weight."],
            [total - xMax, "This is the matching number of heavy crates."],
            [Math.floor(need / a), "This assumes every crate is light and ignores the cap on the number of crates."],
            [total, "This uses every allowed crate as a light crate, which is far too light."],
          ],
          explanation: `With x + y ≤ ${total}, the weight is at most ${a}x + ${b}(${total} ${MINUS} x) = ${b * total} ${MINUS} ${b - a}x. Requiring ${b * total} ${MINUS} ${b - a}x ≥ ${need} gives x ≤ ${formatNumber(Math.round(((b * total - need) / (b - a)) * 1000) / 1000)}, so x is at most ${xMax}.`,
          steps: ["Use the crate-count constraint to express the weight in terms of x.", "Impose the minimum-weight requirement.", "Solve and round down to a whole crate."],
          principles: ["Maximizing one variable pushes the other constraint to its boundary."],
          trap: "Rounding up here breaks the weight requirement.",
        };
      },
    ],
  },
});

[
  "interpret intersection|Easy",
  "systems of inequalities|Easy",
].forEach((cell) => TEXT_ANSWER.add(cell));

/* ---------------------------- Advanced Math ----------------------------- */

registerShapePhrasings("factoring", "factored-polynomial");
registerShapePhrasings("exponent rules", "exponent-law");
registerShapePhrasings("rational expressions", "rational-expression");
registerShapePhrasings("quadratic equations", "quadratic-root");
registerShapePhrasings("radical equations", "radical-equation");
registerShapePhrasings("absolute value", "absolute-value distance");
registerShapePhrasings("linear-quadratic systems", "line-parabola system");

defineShapes({
  "factoring": {
    Easy: [
      (t) => {
        const r = t.int(2, 12);
        const s = r + t.int(1, 9);
        return {
          family: "factor-positive-roots",
          stem: `What is the greater solution of x² ${MINUS} ${r + s}x + ${r * s} = 0?`,
          correct: s,
          wrong: [
            [r, "This is the smaller of the two solutions."],
            [r + s, "This is the sum of the solutions, which is the coefficient of x with its sign changed."],
            [r * s, "This is the product of the solutions, which is the constant term."],
            [s - r, "This is the difference of the solutions."],
          ],
          explanation: `x² ${MINUS} ${r + s}x + ${r * s} = (x ${MINUS} ${r})(x ${MINUS} ${s}), so the solutions are ${r} and ${s}; the greater is ${s}.`,
          steps: ["Find two numbers with the given sum and product.", "Write the factored form.", "Set each factor to zero and choose the greater root."],
          principles: ["x² − (r + s)x + rs factors as (x − r)(x − s)."],
        };
      },
      (t) => {
        const r = t.int(2, 11);
        const s = r + t.int(1, 8);
        return {
          family: "factor-negative-roots",
          stem: `What is the lesser solution of x² + ${r + s}x + ${r * s} = 0?`,
          correct: -s,
          wrong: [
            [-r, "This is the greater of the two negative solutions."],
            [s, "This drops the negative sign that both solutions carry."],
            [r, "This is the positive version of the greater solution."],
            [-(r + s), "This is the sum of the solutions, not a solution."],
          ],
          explanation: `x² + ${r + s}x + ${r * s} = (x + ${r})(x + ${s}), so the solutions are ${MINUS}${r} and ${MINUS}${s}; the lesser is ${MINUS}${s}.`,
          steps: ["Factor the trinomial.", "Set each factor equal to zero.", "Compare the two negative roots."],
          principles: ["A positive constant with a positive middle term gives two negative roots."],
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 5);
        const p = t.int(1, 9);
        const q = t.int(2, 11);
        return {
          family: "factor-leading-coefficient",
          stem: `What is the positive solution of (${lin(a, -p)})(x + ${q}) = 0?`,
          correct: p / a,
          wrong: [
            [-q, "This is the negative solution, which comes from the second factor."],
            [p, "This forgets to divide by the coefficient of x in the first factor."],
            [q, "This drops the sign of the second factor's root."],
            [-p / a, "This changes the sign of the correct root."],
          ],
          explanation: `Setting ${lin(a, -p)} = 0 gives x = ${formatNumber(p / a)}; setting x + ${q} = 0 gives x = ${MINUS}${q}. The positive solution is ${num(p / a)}.`,
          steps: ["Set each factor equal to zero.", "Solve each linear equation.", "Select the positive root."],
          principles: ["A product is zero exactly when one of its factors is zero."],
          verification: quotient(p, a),
        };
      },
      (t) => {
        const p = t.int(2, 12);
        const sign = t.sign();
        return {
          family: "perfect-square-trinomial",
          stem: `If x² + kx + ${p * p} = (x ${sign > 0 ? "+" : MINUS} ${p})² for all values of x, what is the value of k?`,
          correct: sign * 2 * p,
          wrong: [
            [-sign * 2 * p, "This uses the wrong sign for the middle term of the expansion."],
            [sign * p, "This omits the factor of 2 that appears in the middle term."],
            [p * p, "This is the constant term, not the coefficient of x."],
            [sign * p * p * 2, "This doubles the constant term instead of the root."],
          ],
          explanation: `(x ${sign > 0 ? "+" : MINUS} ${p})² = x² ${sign > 0 ? "+" : MINUS} ${2 * p}x + ${p * p}, so k = ${num(sign * 2 * p)}.`,
          steps: ["Expand the squared binomial.", "Match the middle terms.", "Read the coefficient k."],
          principles: ["(x + p)² = x² + 2px + p²."],
        };
      },
    ],
    Hard: [
      (t) => {
        const known = t.int(2, 9);
        const other = -t.int(2, 12);
        const constant = known * other;
        const k = -(known + other);
        return {
          family: "other-root-from-product",
          stem: `One solution of x² + kx ${MINUS} ${Math.abs(constant)} = 0 is x = ${known}, where k is a constant. What is the other solution?`,
          correct: other,
          wrong: [
            [known, "This repeats the solution that was given."],
            [-known, "This changes the sign of the given solution rather than using the product of the roots."],
            [Math.abs(constant) / known, "This divides the constant by the known root but ignores the negative sign of the constant term."],
            [constant, "This is the product of the roots, not the second root."],
          ],
          explanation: `For x² + kx + c the product of the roots is c. Here c = ${num(constant)}, so the other root is ${num(constant)}/${known} = ${num(other)}.`,
          steps: ["Recall that the product of the roots of x² + kx + c equals c.", "Divide the constant term by the known root.", "Report the second root."],
          principles: ["For x² + bx + c, the roots multiply to c and add to −b."],
          trap: "The constant term is negative here, so the two roots must have opposite signs.",
          verification: quotient(constant, known),
        };
      },
      (t) => {
        const a = t.int(2, 5);
        const sum2 = t.int(2, 14);
        const k = -a * sum2;
        const c = -t.int(2, 12) * a;
        return {
          family: "coefficient-from-root-sum",
          stem: `The solutions of ${lin(a, 0)}² + kx ${MINUS} ${Math.abs(c)} = 0 have a sum of ${sum2}, where k is a constant. What is the value of k?`,
          correct: k,
          wrong: [
            [-sum2, "This uses the sum of the roots directly and forgets the leading coefficient."],
            [a * sum2, "This omits the negative sign in the relationship between the sum of the roots and the middle coefficient."],
            [sum2, "This is the sum of the roots itself, not the coefficient."],
            [-sum2 / a, "This divides by the leading coefficient instead of multiplying by it."],
          ],
          explanation: `For ax² + kx + c the sum of the roots is ${MINUS}k/a. Setting ${MINUS}k/${a} = ${sum2} gives k = ${num(k)}.`,
          steps: ["Write the sum of the roots as −k/a.", "Set that expression equal to the given sum.", "Solve for k."],
          principles: ["For ax² + bx + c, the roots sum to −b/a."],
          trap: "The leading coefficient divides the sum; ignoring it scales the answer by a factor of a.",
          verification: { kind: "product", inputs: [-a, sum2], expected: k },
        };
      },
      (t) => {
        const gap = 2 * t.int(1, 6);
        const smaller = t.int(2, 12);
        const larger = smaller + gap;
        const sum = smaller + larger;
        return {
          family: "constant-from-root-difference",
          stem: `The solutions of x² ${MINUS} ${sum}x + c = 0 differ by ${gap}, where c is a constant. What is the value of c?`,
          correct: smaller * larger,
          wrong: [
            [sum, "This is the sum of the roots, which is already given by the middle coefficient."],
            [gap, "This is the difference of the roots, not their product."],
            [sum * gap, "This multiplies the sum by the difference instead of finding the two roots."],
            [smaller + larger + gap, "This combines the sum and difference additively."],
          ],
          explanation: `The roots add to ${sum} and differ by ${gap}, so they are ${smaller} and ${larger}. Their product is c = ${smaller * larger}.`,
          steps: ["Use the middle coefficient to get the sum of the roots.", "Solve the sum-and-difference system for the two roots.", "Multiply them to get the constant term."],
          principles: ["Sum and difference determine two numbers uniquely."],
          trap: "The constant term is the product of the roots, not their difference.",
          verification: { kind: "product", inputs: [smaller, larger], expected: smaller * larger },
        };
      },
    ],
  },

  "exponent rules": {
    Easy: [
      (t) => {
        const p = t.int(2, 12);
        const q = t.int(3, 14);
        return {
          family: "product-of-powers",
          stem: `If x^${p} · x^${q} = x^k for all positive values of x, what is the value of k?`,
          correct: p + q,
          wrong: [
            [p * q, "This multiplies the exponents, which is the rule for a power of a power."],
            [Math.abs(p - q), "This subtracts the exponents, which is the rule for division."],
            [p + q + 1, "This adds an extra factor of x that does not appear."],
            [Math.max(p, q), "This keeps only the larger exponent."],
          ],
          explanation: `Multiplying like bases adds exponents: k = ${p} + ${q} = ${p + q}.`,
          steps: ["Confirm that the bases match.", "Apply the product rule.", "Add the exponents."],
          principles: ["xᵃ · xᵇ = xᵃ⁺ᵇ."],
          verification: { kind: "sum", inputs: [p, q], expected: p + q },
        };
      },
      (t) => {
        const p = t.int(2, 9);
        const q = t.int(2, 8);
        return {
          family: "power-of-power",
          stem: `If (x^${p})^${q} = x^k for all positive values of x, what is the value of k?`,
          correct: p * q,
          wrong: [
            [p + q, "This adds the exponents, which is the rule for multiplying like bases."],
            [p ** q, "This raises one exponent to the other instead of multiplying them."],
            [Math.abs(p - q), "This subtracts the exponents."],
            [p * q + 1, "This introduces an extra factor of x."],
          ],
          explanation: `A power raised to a power multiplies exponents: k = ${p} · ${q} = ${p * q}.`,
          steps: ["Identify the outer and inner exponents.", "Apply the power rule.", "Multiply."],
          principles: ["(xᵃ)ᵇ = xᵃᵇ."],
          verification: { kind: "product", inputs: [p, q], expected: p * q },
        };
      },
    ],
    Medium: [
      (t) => {
        const q = t.int(3, 14);
        const p = t.int(2, 12);
        return {
          family: "quotient-of-powers",
          stem: `If x^${p}/x^${q} = x^k for all positive values of x, what is the value of k?`,
          correct: p - q,
          wrong: [
            [q - p, "This subtracts in the wrong order."],
            [p + q, "This adds the exponents, which applies to a product rather than a quotient."],
            [p * q, "This multiplies the exponents."],
            [Math.abs(p - q), "This drops the sign, which matters when the denominator has the larger exponent."],
          ],
          explanation: `Dividing like bases subtracts exponents: k = ${p} ${MINUS} ${q} = ${num(p - q)}.`,
          steps: ["Confirm the bases match.", "Subtract the denominator's exponent from the numerator's.", "Keep the sign of the result."],
          principles: ["xᵃ/xᵇ = xᵃ⁻ᵇ."],
        };
      },
      (t) => {
        const a = t.int(2, 5);
        const p = t.int(2, 5);
        const q = t.int(2, 4);
        return {
          family: "coefficient-under-power",
          stem: `The expression (${a}x^${p})^${q} is equivalent to cx^d for all positive values of x, where c and d are constants. What is the value of c?`,
          correct: a ** q,
          wrong: [
            [a * q, "This multiplies the coefficient by the exponent instead of raising it to that power."],
            [a, "This leaves the coefficient untouched, as though the exponent applied only to x."],
            [p * q, "This is the exponent d, not the coefficient c."],
            [a ** p, "This raises the coefficient to the inner exponent rather than the outer one."],
          ],
          explanation: `(${a}x^${p})^${q} = ${a}^${q} · x^${p * q} = ${a ** q}x^${p * q}, so c = ${a ** q}.`,
          steps: ["Apply the outer exponent to every factor.", "Raise the coefficient to that power.", "Read the coefficient."],
          principles: ["(ab)ⁿ = aⁿbⁿ."],
        };
      },
    ],
    Hard: [
      (t) => {
        const base = t.pick([2, 3, 5]);
        const inner = t.int(2, 3);
        const outer = inner + t.int(1, 2);
        const shift = t.int(1, 9);
        const x = (outer * shift) / (outer - inner);
        return {
          family: "common-base-equation",
          stem: `If ${base ** inner}^(x + ${shift}) = ${base ** outer}^x, what is the value of x?`,
          correct: x,
          wrong: [
            [shift, "This ignores the different bases and matches only the shift."],
            [outer * shift, "This multiplies by the larger exponent but never divides by the difference of the exponents."],
            [Math.round((shift / (outer - inner)) * 1000) / 1000, "This divides by the difference of the exponents but omits the factor from the larger base."],
            [inner * shift, "This uses the smaller base's exponent in place of the larger one."],
          ],
          explanation: `Write both sides with base ${base}: ${base}^(${inner}(x + ${shift})) = ${base}^(${outer}x), so ${inner}x + ${inner * shift} = ${outer}x and x = ${formatNumber(x)}.`,
          steps: ["Rewrite both sides as powers of the same base.", "Set the exponents equal.", "Solve the resulting linear equation."],
          principles: ["If bᵐ = bⁿ with b > 1, then m = n."],
          trap: "The bases must be made equal before the exponents can be compared.",
          verification: quotient(outer * shift, outer - inner),
        };
      },
      (t) => {
        const a = t.int(2, 4);
        const p = t.int(2, 4);
        const q = t.int(2, 3);
        const c = t.int(2, 6);
        const r = t.int(1, 3);
        const s = t.int(1, 2);
        const coefficient = (a ** q) / c;
        const degree = p * q - r;
        return {
          family: "simplify-quotient-power",
          stem: `For x > 0, the expression (${a}x^${p})^${q}/(${c}x^${r}) is equivalent to kx^n, where k and n are constants. What is the value of n?${s === 0 ? "" : ""}`,
          correct: degree,
          wrong: [
            [p * q + r, "This adds the denominator's exponent instead of subtracting it."],
            [p + q - r, "This adds the two exponents in the numerator instead of multiplying them."],
            [p * q, "This ignores the denominator entirely."],
            [Math.round(coefficient * 1000) / 1000, "This is the coefficient k, not the exponent n."],
          ],
          explanation: `The numerator is ${a ** q}x^${p * q}. Dividing by ${c}x^${r} subtracts exponents, so n = ${p * q} ${MINUS} ${r} = ${degree}.`,
          steps: ["Apply the outer exponent to the numerator.", "Subtract the denominator's exponent from the numerator's.", "Report the resulting exponent."],
          principles: ["(axᵖ)^q/(cxʳ) = (a^q/c)x^(pq−r)."],
          trap: "The outer exponent multiplies the inner exponent before any subtraction happens.",
        };
      },
      (t) => {
        const base = t.pick([2, 3, 4, 5]);
        const power = t.int(2, 4);
        const root = t.pick([2, 3]);
        const value = base ** (power * root);
        return {
          family: "rational-exponent-value",
          stem: `If x^${root} = ${value} and x > 0, what is the value of x^(${root}/2 + 1)?`,
          correct: base ** (power * root / 2) * base ** power,
          wrong: [
            [value, "This reports x raised to the given power rather than to the requested one."],
            [base ** power, "This is x itself, not the requested power of x."],
            [value * root, "This multiplies by the root index instead of adjusting the exponent."],
            [base ** (power * root / 2), "This omits the additional factor of x from the '+ 1' in the exponent."],
          ],
          explanation: `Since x^${root} = ${value} = ${base}^${power * root}, x = ${base}^${power} = ${base ** power}. Then x^(${root}/2 + 1) = ${base}^(${power} · ${root / 2 + 1}) = ${base ** (power * root / 2) * base ** power}.`,
          steps: ["Write the given value as a power of a small base.", "Solve for x.", "Raise x to the requested exponent."],
          principles: ["Rewriting both sides with a common base turns an exponential equation into a linear one."],
          trap: "The exponent asked for is not the exponent given; x must be found first.",
        };
      },
    ],
  },

  "rational expressions": {
    Easy: [
      (t) => {
        const a = t.int(2, 12);
        return {
          family: "difference-of-squares-cancel",
          stem: `For x ≠ ${a}, the expression (x² ${MINUS} ${a * a})/(x ${MINUS} ${a}) is equivalent to x + k. What is the value of k?`,
          correct: a,
          wrong: [
            [-a, "This uses the factor that cancels rather than the one that remains."],
            [a * a, "This is the constant in the numerator, not the remaining factor."],
            [2 * a, "This doubles the remaining constant."],
            [0, "The numerator does not factor to leave x alone."],
          ],
          explanation: `x² ${MINUS} ${a * a} = (x ${MINUS} ${a})(x + ${a}); cancelling x ${MINUS} ${a} leaves x + ${a}, so k = ${a}.`,
          steps: ["Recognize the difference of squares.", "Factor the numerator.", "Cancel the shared factor."],
          principles: ["a² − b² = (a − b)(a + b)."],
        };
      },
      (t) => {
        const c = t.int(2, 9);
        const b = t.int(2, 20);
        return {
          family: "divide-out-common-factor",
          stem: `The expression (${lin(c, c * b)})/${c} is equivalent to x + k for all values of x. What is the value of k?`,
          correct: b,
          wrong: [
            [c * b, "This forgets to divide the constant term by the common factor."],
            [c, "This is the common factor itself."],
            [c + b, "This adds the common factor to the result instead of dividing it out."],
            [Math.round((b / c) * 1000) / 1000, "This divides the constant by the factor a second time."],
          ],
          explanation: `Every term of ${lin(c, c * b)} has a factor of ${c}, so the quotient is x + ${b} and k = ${b}.`,
          steps: ["Factor the common number out of the numerator.", "Cancel it with the denominator.", "Read the constant term."],
          principles: ["Dividing a sum by a number divides every term by it."],
          verification: quotient(c * b, c),
        };
      },
    ],
    Medium: [
      (t) => {
        const p = t.int(2, 11);
        const q = t.int(2, 13);
        return {
          family: "factor-trinomial-cancel",
          stem: `For x ≠ ${MINUS}${p}, the expression (x² + ${p + q}x + ${p * q})/(x + ${p}) is equivalent to x + k. What is the value of k?`,
          correct: q,
          wrong: [
            [p, "This is the factor that cancels with the denominator."],
            [p + q, "This is the middle coefficient, not one of the factors."],
            [p * q, "This is the constant term of the numerator."],
            [q - p, "This subtracts the cancelled factor from the remaining one."],
          ],
          explanation: `The numerator factors as (x + ${p})(x + ${q}); cancelling x + ${p} leaves x + ${q}, so k = ${q}.`,
          steps: ["Factor the quadratic numerator.", "Identify the factor matching the denominator.", "Report the remaining constant."],
          principles: ["Factor before cancelling; only whole factors cancel."],
        };
      },
      (t) => {
        const m = t.int(2, 6);
        const a = t.int(2, 12);
        return {
          family: "cancel-with-coefficient",
          stem: `For x ≠ ${a}, the expression (${m}x² ${MINUS} ${m * a * a})/(x ${MINUS} ${a}) is equivalent to ${lin(m, 0)} + k. What is the value of k?`,
          correct: m * a,
          wrong: [
            [a, "This omits the factor of " + m + " that was never divided out."],
            [m, "This is the leading coefficient, not the constant term."],
            [m * a * a, "This is the constant in the numerator before factoring."],
            [-m * a, "This uses the factor that cancels rather than the one that remains."],
          ],
          explanation: `Factor ${m} out first: ${m}(x² ${MINUS} ${a * a}) = ${m}(x ${MINUS} ${a})(x + ${a}). Cancelling gives ${m}(x + ${a}) = ${lin(m, m * a)}, so k = ${m * a}.`,
          steps: ["Factor the common coefficient from the numerator.", "Factor the difference of squares.", "Cancel and distribute."],
          principles: ["Factor completely before cancelling."],
          verification: { kind: "product", inputs: [m, a], expected: m * a },
        };
      },
    ],
    Hard: [
      (t) => {
        const b = t.int(2, 9);
        const r = b + t.int(1, 10);
        const m = t.int(2, 7);
        const p = m - b - r;
        const q = b * r - m * b;
        return {
          family: "extraneous-rational-solution",
          stem: `What is the solution to (x² ${signed(p)}x ${signed(q)})/(x ${MINUS} ${b}) = ${m}?`,
          correct: r,
          wrong: [
            [b, "This value makes the denominator zero, so it must be rejected even though it satisfies the equation obtained after multiplying."],
            [m, "This is the value of the right-hand side, not a solution."],
            [b + r, "This is the sum of the two roots of the cleared quadratic."],
            [b * r, "This is the product of the two roots of the cleared quadratic."],
          ],
          explanation: `Multiplying by x ${MINUS} ${b} gives x² ${signed(p)}x ${signed(q)} = ${m}x ${MINUS} ${m * b}, that is (x ${MINUS} ${b})(x ${MINUS} ${r}) = 0. The value x = ${b} makes the original denominator zero, so the only solution is x = ${r}.`,
          steps: ["Multiply both sides by the denominator.", "Collect terms and factor the quadratic.", "Reject any root that makes the original denominator zero."],
          principles: ["Clearing a denominator can introduce a root the original equation does not allow."],
          trap: "Both roots satisfy the cleared equation; only one satisfies the original.",
        };
      },
      (t) => {
        const b = t.int(2, 9);
        const a = b + t.int(1, 8);
        const x = (a * b) / (a - b);
        return {
          family: "solve-reciprocal-equation",
          stem: `If 1/${a} + 1/x = 1/${b} and x ≠ 0, what is the value of x?`,
          correct: x,
          wrong: [
            [a - b, "This subtracts the two numbers instead of combining their reciprocals."],
            [a + b, "This adds the two numbers, which is not how reciprocals combine."],
            [Math.round(((a * b) / (a + b)) * 1000) / 1000, "This adds the denominators instead of subtracting them."],
            [b - a, "This subtracts in the wrong order, giving a negative value."],
          ],
          explanation: `1/x = 1/${b} ${MINUS} 1/${a} = (${a} ${MINUS} ${b})/(${a * b}) = ${a - b}/${a * b}, so x = ${formatNumber(x)}.`,
          steps: ["Isolate 1/x.", "Combine the two fractions over a common denominator.", "Take the reciprocal of both sides."],
          principles: ["Isolate the reciprocal before inverting; 1/a + 1/b is not 1/(a + b)."],
          trap: "Inverting term by term instead of combining first gives the wrong denominator.",
          verification: quotient(a * b, a - b),
        };
      },
      (t) => {
        const c = t.int(2, 12);
        const a = t.int(3, 20);
        const coefficient = t.int(2, 5);
        const k = a + coefficient * c;
        return {
          family: "decompose-rational-expression",
          stem: `For x ≠ ${c}, the expression (${lin(coefficient, a)})/(x ${MINUS} ${c}) can be written as ${coefficient} + k/(x ${MINUS} ${c}), where k is a constant. What is the value of k?`,
          correct: k,
          wrong: [
            [a, "This keeps the numerator's constant without adding the part produced by rewriting the x-term."],
            [a - coefficient * c, "This subtracts the product instead of adding it."],
            [coefficient * c, "This is only the part contributed by rewriting the x-term."],
            [coefficient + a, "This adds the coefficient rather than the coefficient times " + c + "."],
          ],
          explanation: `${lin(coefficient, a)} = ${coefficient}(x ${MINUS} ${c}) + ${coefficient * c} + ${a}, so the expression equals ${coefficient} + ${k}/(x ${MINUS} ${c}) and k = ${k}.`,
          steps: ["Write the numerator as a multiple of the denominator plus a remainder.", "Split the fraction into two parts.", "Read the remainder."],
          principles: ["Polynomial division rewrites an improper rational expression as a quotient plus a remainder."],
          trap: "The remainder is not the original constant term; rewriting the x-term changes it.",
          verification: { kind: "sum", inputs: [a, coefficient * c], expected: k },
        };
      },
    ],
  },

  "quadratic equations": {
    Easy: [
      (t) => {
        const root = t.int(3, 20);
        return {
          family: "square-root-positive",
          stem: `What is the positive solution to x² = ${root * root}?`,
          correct: root,
          wrong: [
            [-root, "This is the negative solution, and the question asks for the positive one."],
            [root * root, "This is x², not x."],
            [2 * root, "Taking a square root is not the same as halving the exponent's value."],
            [root * root / 2, "This halves the number instead of taking its square root."],
          ],
          explanation: `x = ±√${root * root} = ±${root}; the positive solution is ${root}.`,
          steps: ["Take the square root of both sides.", "Keep both signs.", "Select the positive value."],
          principles: ["If x² = a², then x = ±a."],
        };
      },
      (t) => {
        const h = t.int(2, 14);
        const d = t.int(2, 12);
        return {
          family: "square-of-binomial-root",
          stem: `What is the greater solution to (x ${MINUS} ${h})² = ${d * d}?`,
          correct: h + d,
          wrong: [
            [h - d, "This is the lesser solution."],
            [d, "This is the square root of the right side, before undoing the shift."],
            [h, "This is the shift alone; it makes the left side 0, not " + d * d + "."],
            [h + d * d, "This adds the right side instead of its square root."],
          ],
          explanation: `Taking square roots gives x ${MINUS} ${h} = ±${d}, so x = ${h + d} or ${h - d}; the greater is ${h + d}.`,
          steps: ["Take the square root of both sides, keeping both signs.", "Solve each linear equation.", "Choose the greater root."],
          principles: ["(x − h)² = d² gives x = h ± d."],
          verification: { kind: "sum", inputs: [h, d], expected: h + d },
        };
      },
    ],
    Medium: [
      (t) => {
        const r = t.int(2, 10);
        const s = -t.int(2, 12);
        return {
          family: "factorable-negative-root",
          stem: `What is the lesser solution to x² ${signed(-(r + s))}x ${signed(r * s)} = 0?`,
          correct: Math.min(r, s),
          wrong: [
            [Math.max(r, s), "This is the greater solution."],
            [r + s, "This is the sum of the solutions."],
            [r * s, "This is the product of the solutions."],
            [-Math.min(r, s), "This changes the sign of the correct solution."],
          ],
          explanation: `The trinomial factors as (x ${MINUS} ${r})(x ${signed(-s)}) = 0, so the solutions are ${r} and ${num(s)}; the lesser is ${num(Math.min(r, s))}.`,
          steps: ["Find two numbers whose product is the constant term and whose sum is the opposite of the middle coefficient.", "Factor and set each factor to zero.", "Compare the two roots."],
          principles: ["A negative constant term means the roots have opposite signs."],
        };
      },
      (t) => {
        const a = t.int(2, 4);
        const p = t.int(1, 7);
        const q = t.int(2, 9);
        return {
          family: "quadratic-formula-rational",
          stem: `What is the greater solution to ${lin(a, 0)}² ${signed(-(a * q + p))}x + ${p * q} = 0?`,
          correct: Math.max(q, p / a),
          wrong: [
            [Math.min(q, p / a), "This is the lesser solution."],
            [(a * q + p) / a, "This is the sum of the two solutions."],
            [p * q, "This is the constant term, not a root."],
            [p / a + q, "This adds the two roots instead of choosing the greater one."],
          ],
          explanation: `The quadratic factors as (${lin(a, -p)})(x ${MINUS} ${q}) = 0, so the solutions are ${formatNumber(p / a)} and ${q}; the greater is ${formatNumber(Math.max(q, p / a))}.`,
          steps: ["Factor the quadratic, allowing for the leading coefficient.", "Set each factor equal to zero.", "Compare the two roots."],
          principles: ["A leading coefficient produces a fractional root."],
        };
      },
    ],
    Hard: [
      (t) => {
        const half = t.int(2, 12);
        const c = half * half;
        return {
          family: "discriminant-one-solution",
          stem: `The equation x² + kx + ${c} = 0 has exactly one real solution, and k is positive. What is the value of k?`,
          correct: 2 * half,
          wrong: [
            [half, "This is the repeated root, not the coefficient k."],
            [c, "This is the constant term."],
            [4 * c, "This is the quantity 4ac from the discriminant, not k."],
            [half * half / 2, "This halves the constant term instead of using the discriminant condition."],
          ],
          explanation: `Exactly one real solution means the discriminant is 0: k² ${MINUS} 4(1)(${c}) = 0, so k² = ${4 * c} and the positive value is k = ${2 * half}.`,
          steps: ["Set the discriminant b² − 4ac equal to zero.", "Solve for k².", "Take the positive square root."],
          principles: ["A quadratic has exactly one real solution when b² − 4ac = 0."],
          trap: "The repeated root and the coefficient k are different numbers; k is twice the root.",
          verification: { kind: "product", inputs: [2, half], expected: 2 * half },
        };
      },
      (t) => {
        const a = t.int(2, 6);
        const c = t.int(2, 12);
        return {
          family: "discriminant-b-squared",
          stem: `The equation ${lin(a, 0)}² + bx + ${c} = 0 has exactly one real solution, where b is a constant. What is the value of b²?`,
          correct: 4 * a * c,
          wrong: [
            [a * c, "This omits the factor of 4 in the discriminant."],
            [2 * a * c, "This uses 2ac instead of 4ac."],
            [Math.round(Math.sqrt(4 * a * c) * 1000) / 1000, "This is b, not b²."],
            [4 * a + c, "This adds the coefficients instead of multiplying them."],
          ],
          explanation: `One real solution requires b² ${MINUS} 4ac = 0, so b² = 4(${a})(${c}) = ${4 * a * c}.`,
          steps: ["Write the discriminant for the given coefficients.", "Set it equal to zero.", "Solve for b²."],
          principles: ["The discriminant of ax² + bx + c is b² − 4ac."],
          trap: "The question asks for b², so no square root is needed.",
          verification: { kind: "product", inputs: [4, a, c], expected: 4 * a * c },
        };
      },
      (t) => {
        const smaller = t.int(2, 12);
        const gap = 2 * t.int(1, 6);
        const larger = smaller + gap;
        const sum = smaller + larger;
        return {
          family: "roots-difference-constant",
          stem: `The two solutions of x² ${MINUS} ${sum}x + c = 0 differ by ${gap}, where c is a constant. What is the greater solution?`,
          correct: larger,
          wrong: [
            [smaller, "This is the lesser solution."],
            [sum, "This is the sum of the two solutions."],
            [gap, "This is the difference between the solutions."],
            [smaller * larger, "This is the value of c, the product of the solutions."],
          ],
          explanation: `The roots sum to ${sum} and differ by ${gap}, so they are ${smaller} and ${larger}; the greater is ${larger}.`,
          steps: ["Read the sum of the roots from the middle coefficient.", "Solve the sum-and-difference system.", "Report the greater root."],
          principles: ["For x² + bx + c the roots sum to −b."],
          verification: { kind: "linear-equation", inputs: [2, 0, sum + gap], expected: larger },
        };
      },
    ],
  },

  "radical equations": {
    Easy: [
      (t) => {
        const b = t.int(3, 14);
        const a = t.int(2, 20);
        return {
          family: "isolate-under-radical",
          stem: `If √(x + ${a}) = ${b}, what is the value of x?`,
          correct: b * b - a,
          wrong: [
            [b - a, "This subtracts before squaring."],
            [b * b + a, "This adds the constant instead of subtracting it after squaring."],
            [b, "This stops before undoing the square root."],
            [b * b, "This squares both sides but never removes the constant."],
          ],
          explanation: `Squaring gives x + ${a} = ${b * b}, so x = ${b * b - a}.`,
          steps: ["Square both sides.", "Subtract the constant inside the radical.", "Check that the radicand gives the stated root."],
          principles: ["Squaring undoes a principal square root."],
          verification: linearCheck(1, a, b * b),
        };
      },
      (t) => {
        const root = t.int(3, 15);
        const a = t.int(2, 12);
        return {
          family: "radical-plus-constant",
          stem: `If √x + ${a} = ${root + a}, what is the value of x?`,
          correct: root * root,
          wrong: [
            [root, "This is √x, not x."],
            [(root + a) * (root + a), "This squares the whole right side without first isolating the radical."],
            [root * root + a, "This adds the constant after squaring instead of subtracting it before."],
            [root + a, "This leaves the equation unsolved."],
          ],
          explanation: `Subtract ${a}: √x = ${root}. Square: x = ${root * root}.`,
          steps: ["Isolate the radical.", "Square both sides.", "Verify the solution in the original equation."],
          principles: ["Isolate a radical before squaring."],
          verification: { kind: "product", inputs: [root, root], expected: root * root },
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 7);
        const b = t.int(1, 15);
        const c = t.int(3, 12);
        const x = (c * c - b) / a;
        return {
          family: "linear-radicand",
          stem: `If √(${lin(a, b)}) = ${c}, what is the value of x?`,
          correct: x,
          wrong: [
            [c * c - b, "This squares and subtracts but never divides by the coefficient of x."],
            [Math.round(((c * c + b) / a) * 1000) / 1000, "This adds the constant instead of subtracting it."],
            [Math.round(((c - b) / a) * 1000) / 1000, "This subtracts before squaring."],
            [c * c, "This stops after squaring both sides."],
          ],
          explanation: `Squaring gives ${lin(a, b)} = ${c * c}, so ${a}x = ${c * c - b} and x = ${formatNumber(x)}.`,
          steps: ["Square both sides.", "Subtract the constant.", "Divide by the coefficient of x."],
          principles: ["Square, then solve the resulting linear equation."],
          verification: linearCheck(a, b, c * c),
        };
      },
      (t) => {
        const k = t.int(2, 6);
        const root = t.int(2, 12);
        const shift = t.int(1, 15);
        return {
          family: "coefficient-times-radical",
          stem: `If ${k}√(x ${MINUS} ${shift}) = ${k * root}, what is the value of x?`,
          correct: root * root + shift,
          wrong: [
            [root * root - shift, "This subtracts the shift instead of adding it back."],
            [k * k * root * root + shift, "This squares the coefficient into the radicand instead of dividing it out first."],
            [root + shift, "This omits the squaring step."],
            [root * root, "This forgets to undo the shift inside the radical."],
          ],
          explanation: `Divide by ${k}: √(x ${MINUS} ${shift}) = ${root}. Square: x ${MINUS} ${shift} = ${root * root}, so x = ${root * root + shift}.`,
          steps: ["Divide by the coefficient to isolate the radical.", "Square both sides.", "Add the shift."],
          principles: ["Isolate the radical completely before squaring."],
          verification: { kind: "sum", inputs: [root * root, shift], expected: root * root + shift },
        };
      },
    ],
    Hard: [
      (t) => {
        const valid = t.int(4, 14);
        const other = valid - (2 * t.int(1, 4) + 1);
        const b = (valid + other - 1) / 2;
        const a = b * b - valid * other;
        return {
          family: "radical-extraneous-linear",
          stem: `What is the solution to √(x ${signed(a)}) = ${lin(1, -b)}?`,
          correct: valid,
          wrong: [
            [other, "This root of the squared equation makes the right side negative, so a principal square root cannot equal it."],
            [b, "This is the constant subtracted on the right side, not a solution."],
            [valid + other, "This is the sum of the two roots of the squared equation."],
            [valid * other, "This is the product of the two roots of the squared equation."],
          ],
          explanation: `Squaring gives x ${signed(a)} = x² ${MINUS} ${2 * b}x + ${b * b}, that is (x ${MINUS} ${valid})(x ${MINUS} ${other}) = 0. Substituting x = ${num(other)} makes the right side negative, so the only solution is x = ${valid}.`,
          steps: ["Square both sides and collect terms.", "Factor the resulting quadratic.", "Test each root in the original equation and discard the one that fails."],
          principles: ["Squaring can create solutions the original equation does not have."],
          trap: "A principal square root is never negative, so any root making the right side negative must be rejected.",
        };
      },
      (t) => {
        const valid = t.int(2, 12);
        const other = -t.int(1, 9);
        const b = valid + other;
        const c = -valid * other;
        return {
          family: "radical-equals-x",
          stem: `What is the solution to √(${lin(b, c)}) = x?`,
          correct: valid,
          wrong: [
            [other, "This root of the squared equation is negative, and a principal square root cannot be negative."],
            [b, "This is the coefficient inside the radical, not a solution."],
            [c, "This is the constant inside the radical."],
            [valid + other, "This is the sum of the two roots of the squared equation."],
          ],
          explanation: `Squaring gives ${lin(b, c)} = x², that is x² ${signed(-b)}x ${signed(-c)} = 0, which factors as (x ${MINUS} ${valid})(x ${signed(-other)}) = 0. The root ${num(other)} is negative and cannot equal a principal square root, so x = ${valid}.`,
          steps: ["Square both sides.", "Write the quadratic in standard form and factor.", "Reject the negative root."],
          principles: ["√u = x requires x ≥ 0."],
          trap: "Both roots satisfy the squared equation, but only the nonnegative one satisfies the original.",
        };
      },
      (t) => {
        const base = t.int(2, 6);
        const shift = t.int(1, 20);
        const c = base;
        return {
          family: "rational-exponent-power",
          stem: `If (x ${MINUS} ${shift})^(1/2) = ${c} and x > ${shift}, what is the value of (x ${MINUS} ${shift})^(3/2)?`,
          correct: c ** 3,
          wrong: [
            [c * 3, "This multiplies by 3 instead of cubing."],
            [c * c, "This squares the value, matching an exponent of 1 rather than 3/2."],
            [c ** 3 + shift, "This adds the shift back, but the question asks about the shifted expression itself."],
            [c + shift, "This solves for x rather than evaluating the requested power."],
          ],
          explanation: `(x ${MINUS} ${shift})^(3/2) = ((x ${MINUS} ${shift})^(1/2))³ = ${c}³ = ${c ** 3}.`,
          steps: ["Recognize the 3/2 power as the cube of the 1/2 power.", "Substitute the known value.", "Cube it."],
          principles: ["u^(m/n) = (u^(1/n))^m."],
          trap: "Solving for x first is unnecessary and invites an arithmetic slip.",
          verification: { kind: "product", inputs: [c, c, c], expected: c ** 3 },
        };
      },
    ],
  },

  "absolute value": {
    Easy: [
      (t) => {
        const c = t.int(2, 15);
        const d = t.int(2, 12);
        return {
          family: "absolute-larger-solution",
          stem: `What is the greater solution of |x ${MINUS} ${c}| = ${d}?`,
          correct: c + d,
          wrong: [
            [c - d, "This is the lesser solution."],
            [d, "This is the distance from the center, not a value of x."],
            [c, "This is the center; it makes the expression 0, not " + d + "."],
            [c * d, "The center and the distance are added or subtracted, not multiplied."],
          ],
          explanation: `x is ${d} units from ${c}, so x = ${c + d} or ${c - d}; the greater is ${c + d}.`,
          steps: ["Read the equation as a distance statement.", "Write both cases.", "Choose the greater value."],
          principles: ["|x − c| = d means x = c ± d."],
          verification: { kind: "sum", inputs: [c, d], expected: c + d },
        };
      },
      (t) => {
        const c = t.int(2, 15);
        const d = t.int(2, 12);
        return {
          family: "absolute-smaller-solution",
          stem: `What is the lesser solution of |x + ${c}| = ${d}?`,
          correct: -c - d,
          wrong: [
            [-c + d, "This is the greater solution."],
            [c + d, "This drops the sign produced by the + " + c + " inside the absolute value."],
            [-d, "This is the negative of the distance, not a value of x."],
            [-c, "This is the center of the two solutions."],
          ],
          explanation: `x + ${c} = ±${d}, so x = ${num(-c + d)} or ${num(-c - d)}; the lesser is ${num(-c - d)}.`,
          steps: ["Split into the positive and negative cases.", "Solve each linear equation.", "Compare the two results."],
          principles: ["|u| = d gives u = d or u = −d."],
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 6);
        const b = t.int(2, 20);
        const d = a * t.int(1, 8);
        return {
          family: "absolute-sum-of-solutions",
          stem: `What is the sum of the solutions of |${lin(a, -b)}| = ${d}?`,
          correct: (2 * b) / a,
          wrong: [
            [Math.round(((b + d) / a) * 1000) / 1000, "This is the greater solution alone."],
            [Math.round(((b - d) / a) * 1000) / 1000, "This is the lesser solution alone."],
            [2 * b, "This omits the division by the coefficient of x."],
            [Math.round(((2 * d) / a) * 1000) / 1000, "This doubles the distance instead of the center."],
          ],
          explanation: `${lin(a, -b)} = ±${d} gives x = ${formatNumber((b + d) / a)} and x = ${formatNumber((b - d) / a)}; their sum is ${formatNumber((2 * b) / a)}.`,
          steps: ["Write both cases.", "Solve each for x.", "Add the two solutions."],
          principles: ["The solutions of |ax − b| = d are symmetric about b/a."],
          verification: quotient(2 * b, a),
        };
      },
      (t) => {
        const c = t.int(2, 20);
        const d = t.int(2, 12);
        return {
          family: "absolute-count-integers",
          stem: `How many integer values of x satisfy |x ${MINUS} ${c}| < ${d}?`,
          correct: 2 * d - 1,
          wrong: [
            [2 * d + 1, "This counts both excluded endpoints."],
            [2 * d, "This counts one of the two excluded endpoints."],
            [d, "This counts only one side of the center."],
            [d - 1, "This counts one side of the center and excludes the center itself."],
          ],
          explanation: `The inequality means ${c - d} < x < ${c + d}, so x runs over the integers ${c - d + 1} through ${c + d - 1}: ${2 * d - 1} values.`,
          steps: ["Rewrite the absolute value as a double inequality.", "List the endpoints.", "Count the integers strictly between them."],
          principles: ["|x − c| < d means c − d < x < c + d."],
        };
      },
    ],
    Hard: [
      (t) => {
        const a = t.int(2, 5);
        const b = a * t.int(1, 6);
        const d = a * t.int(2, 8);
        const high = (b + d) / a;
        const low = (b - d) / a;
        return {
          family: "absolute-product-of-solutions",
          stem: `What is the product of the solutions of |${lin(a, -b)}| = ${d}?`,
          correct: high * low,
          wrong: [
            [high, "This is the greater solution alone."],
            [low, "This is the lesser solution alone."],
            [high + low, "This is the sum of the solutions, not their product."],
            [-high * low, "This has the wrong sign for the product of one positive and one negative solution."],
          ],
          explanation: `${lin(a, -b)} = ${d} gives x = ${num(high)} and ${lin(a, -b)} = ${MINUS}${d} gives x = ${num(low)}. Their product is ${num(high * low)}.`,
          steps: ["Split the absolute value into its two cases.", "Solve each case.", "Multiply the two solutions."],
          principles: ["An absolute-value equation has two cases that must both be solved."],
          trap: "Only one case is visible if the negative case is skipped, and the product then cannot be formed.",
          verification: { kind: "product", inputs: [high, low], expected: high * low },
        };
      },
      (t) => {
        const c = t.int(3, 18);
        const d = t.int(2, 12);
        return {
          family: "absolute-quadratic-constant",
          stem: `The solutions of |x ${MINUS} ${c}| = ${d} are also the solutions of x² + px + q = 0, where p and q are constants. What is the value of q?`,
          correct: (c - d) * (c + d),
          wrong: [
            [-2 * c, "This is p, the coefficient of x, not the constant term."],
            [c * c + d * d, "This adds the squares instead of taking the difference."],
            [c * d, "This multiplies the center by the distance."],
            [d * d - c * c, "This subtracts in the wrong order."],
          ],
          explanation: `The solutions are ${c - d} and ${c + d}, so the quadratic is (x ${MINUS} ${c - d})(x ${MINUS} ${c + d}) = 0 and q is the product of the roots: ${(c - d) * (c + d)}.`,
          steps: ["Solve the absolute-value equation for both roots.", "Write the quadratic with those roots.", "Read the constant term as the product of the roots."],
          principles: ["For x² + px + q, the roots multiply to q."],
          trap: "The constant term is the product of the roots, so the two cases must be combined, not averaged.",
          verification: { kind: "product", inputs: [c - d, c + d], expected: (c - d) * (c + d) },
        };
      },
      (t) => {
        const c = t.int(2, 15);
        const d = t.int(3, 14);
        return {
          family: "absolute-inequality-boundary",
          stem: `What is the greatest integer value of x that does not satisfy |x ${MINUS} ${c}| ≥ ${d}?`,
          correct: c + d - 1,
          wrong: [
            [c + d, "This value does satisfy the inequality, since the distance is exactly " + d + "."],
            [c - d, "This is the lower boundary, which also satisfies the inequality."],
            [c - d + 1, "This is the least integer that fails the inequality, not the greatest."],
            [c, "This is the center, which fails the inequality but is not the greatest such integer."],
          ],
          explanation: `The inequality holds when x ≤ ${c - d} or x ≥ ${c + d}. The values that fail lie strictly between, so the greatest is ${c + d - 1}.`,
          steps: ["Write the two intervals where the inequality holds.", "Describe the complementary interval.", "Take the greatest integer in that interval."],
          principles: ["|x − c| ≥ d splits the number line into two rays."],
          trap: "The question asks for a value that fails the inequality, which reverses the usual endpoint reasoning.",
        };
      },
    ],
  },

  "linear-quadratic systems": {
    Easy: [
      (t) => {
        const a = t.int(2, 14);
        return {
          family: "parabola-line-through-origin",
          stem: `The graphs of y = x² and y = ${lin(a, 0)} intersect at x = 0 and at x = k. What is the value of k?`,
          correct: a,
          wrong: [
            [-a, "The factored equation x(x − " + a + ") = 0 has no negative root."],
            [a * a, "This squares the coefficient instead of solving for x."],
            [0, "Zero is the other intersection; k denotes the second one."],
            [Math.round((a / 2) * 1000) / 1000, "This halves the coefficient rather than solving the equation."],
          ],
          explanation: `Set x² = ${a}x: x(x ${MINUS} ${a}) = 0, so x = 0 or x = ${a}.`,
          steps: ["Set the two expressions equal.", "Move everything to one side and factor.", "Take the nonzero root."],
          principles: ["Intersections satisfy both equations."],
        };
      },
      (t) => {
        const r = t.int(2, 12);
        return {
          family: "parabola-horizontal-line",
          stem: `The graphs of y = x² and y = ${r * r} intersect at two points. What is the positive x-coordinate of an intersection?`,
          correct: r,
          wrong: [
            [-r, "This is the negative intersection, and the question asks for the positive one."],
            [r * r, "This is the y-coordinate of both intersections."],
            [2 * r, "This doubles the root instead of taking the square root."],
            [r * r / 2, "This halves the y-value instead of taking its square root."],
          ],
          explanation: `x² = ${r * r} gives x = ±${r}; the positive value is ${r}.`,
          steps: ["Set the expressions for y equal.", "Take square roots, keeping both signs.", "Select the positive value."],
          principles: ["A horizontal line meets y = x² at two symmetric points."],
        };
      },
    ],
    Medium: [
      (t) => {
        const r = t.int(2, 9);
        const s = -t.int(1, 8);
        const b = -(r + s);
        const c = r * s;
        return {
          family: "line-meets-parabola",
          stem: `The graphs of y = x² ${signed(b)}x and y = ${num(-c)} intersect at two points. What is the greater of the two x-coordinates?`,
          correct: Math.max(r, s),
          wrong: [
            [Math.min(r, s), "This is the lesser x-coordinate."],
            [-c, "This is the y-value of both intersections."],
            [r + s, "This is the sum of the two x-coordinates."],
            [r * s, "This is the product of the two x-coordinates."],
          ],
          explanation: `Set x² ${signed(b)}x = ${num(-c)}: x² ${signed(b)}x ${signed(c)} = 0, which factors as (x ${MINUS} ${r})(x ${signed(-s)}) = 0. The roots are ${r} and ${num(s)}.`,
          steps: ["Set the two expressions for y equal.", "Collect everything on one side.", "Factor and compare the roots."],
          principles: ["Substitution turns a linear-quadratic system into a single quadratic."],
        };
      },
      (t) => {
        const r = t.int(2, 8);
        const s = -t.int(2, 9);
        const m = r + s;
        const b = -r * s;
        return {
          family: "line-meets-shifted-parabola",
          stem: `The system y = x² ${MINUS} ${b} and y = ${lin(m, -b + b)} has two solutions. What is the greater x-coordinate of a solution?`,
          correct: Math.max(r, s),
          wrong: [
            [Math.min(r, s), "This is the lesser x-coordinate."],
            [m, "This is the sum of the two x-coordinates, read off the linear equation."],
            [b, "This is the constant term of the quadratic."],
            [r * s, "This is the product of the two x-coordinates."],
          ],
          explanation: `Set x² ${MINUS} ${b} = ${lin(m, 0)}: x² ${signed(-m)}x ${MINUS} ${b} = 0, which factors as (x ${MINUS} ${r})(x ${signed(-s)}) = 0.`,
          steps: ["Substitute the linear expression for y.", "Write the quadratic in standard form.", "Factor and choose the greater root."],
          principles: ["A line and a parabola meet where a single quadratic equals zero."],
        };
      },
    ],
    Hard: [
      (t) => {
        const b = 2 * t.int(1, 6);
        const m = t.int(1, 9);
        const half = (b - m) / 2;
        const k = half * half;
        return {
          family: "tangency-find-constant",
          stem: `The system y = x² + ${b}x + k and y = ${lin(m, 0)} has exactly one solution, where k is a constant. What is the value of k?`,
          correct: k,
          wrong: [
            [b - m, "This is the coefficient of x after substitution, not the constant that makes the discriminant zero."],
            [(b - m) / 2, "This is half of that coefficient; the constant is its square."],
            [b * m, "This multiplies the two coefficients."],
            [4 * k, "This omits the division by 4 in the discriminant condition."],
          ],
          explanation: `Substituting gives x² + ${b - m}x + k = 0. Exactly one solution requires ${b - m}² ${MINUS} 4k = 0, so k = ${(b - m) ** 2}/4 = ${k}.`,
          steps: ["Substitute the line into the parabola and collect terms.", "Set the discriminant of the resulting quadratic equal to zero.", "Solve for k."],
          principles: ["A line is tangent to a parabola when the combined quadratic has a zero discriminant."],
          trap: "One solution means a repeated root, which is a discriminant condition, not a substitution of x = 0.",
          verification: { kind: "product", inputs: [half, half], expected: k },
        };
      },
      (t) => {
        const c = t.int(2, 12);
        const m = 2 * c;
        return {
          family: "tangency-find-slope",
          stem: `The system y = x² + ${c * c} and y = mx has exactly one solution, and m is positive. What is the value of m?`,
          correct: m,
          wrong: [
            [c, "This is the repeated root, not the slope."],
            [c * c, "This is the constant term of the parabola."],
            [4 * c * c, "This is the quantity 4ac from the discriminant, not m."],
            [Math.round((m / 2) * 1000) / 1000, "This halves the slope, which is the x-coordinate of the tangency point."],
          ],
          explanation: `Substituting gives x² ${MINUS} mx + ${c * c} = 0. A single solution needs m² ${MINUS} 4(${c * c}) = 0, so m² = ${4 * c * c} and the positive value is ${m}.`,
          steps: ["Set the two expressions for y equal and rearrange.", "Set the discriminant equal to zero.", "Solve for the positive slope."],
          principles: ["Tangency corresponds to a zero discriminant."],
          verification: { kind: "product", inputs: [2, c], expected: m },
        };
      },
      (t) => {
        const h = t.int(2, 9);
        const k = t.int(-14, 12);
        const b = -2 * h;
        const c = h * h + k;
        return {
          family: "horizontal-tangent-value",
          stem: `The line y = c intersects the graph of y = x² ${signed(b)}x + ${num(c)} at exactly one point, where c is a constant. Instead, for the parabola y = x² ${signed(b)}x + ${num(c)}, what is the least value of y?`,
          correct: k,
          wrong: [
            [c, "This is the y-value at x = 0, not the minimum."],
            [h, "This is the x-coordinate of the vertex, not the minimum value of y."],
            [-k, "This changes the sign of the minimum value."],
            [b, "This is the coefficient of x."],
          ],
          explanation: `Completing the square gives y = (x ${MINUS} ${h})² ${signed(k)}, so the least value of y is ${num(k)}, attained at x = ${h}.`,
          steps: ["Complete the square on the quadratic.", "Read the vertex.", "Report the y-coordinate, since the parabola opens upward."],
          principles: ["A horizontal line meets a parabola once exactly at the vertex."],
          verification: { kind: "sum", inputs: [c, -h * h], expected: k },
        };
      },
    ],
  },

  "nonlinear systems": {
    Easy: [
      (t) => {
        const a = t.int(2, 11);
        return {
          family: "parabola-line-y-value",
          stem: `A point with a positive x-coordinate lies on both y = x² and y = ${lin(a, 0)}. What is its y-coordinate?`,
          correct: a * a,
          wrong: [
            [a, "This is the x-coordinate of the point."],
            [2 * a, "This doubles the x-coordinate instead of squaring it."],
            [0, "This is the y-coordinate of the other intersection, at the origin."],
            [a + a * a, "This adds the coordinates instead of reporting the y-value."],
          ],
          explanation: `x² = ${a}x gives x = ${a} for the positive intersection, and then y = ${a}² = ${a * a}.`,
          steps: ["Set the expressions for y equal.", "Solve for the positive x.", "Substitute back to find y."],
          principles: ["A solution of a system is an ordered pair satisfying both equations."],
          verification: { kind: "product", inputs: [a, a], expected: a * a },
        };
      },
      (t) => {
        const r = t.pick([5, 10, 13, 15, 17, 20, 25]);
        return {
          family: "circle-axis-intersection",
          stem: `The graph of x² + y² = ${r * r} intersects the positive x-axis at one point. What is the x-coordinate of that point?`,
          correct: r,
          wrong: [
            [r * r, "This is the right side of the equation, which equals the radius squared."],
            [-r, "This is the intersection with the negative x-axis."],
            [Math.round((r / 2) * 1000) / 1000, "This halves the radius, which would be correct only for a different circle."],
            [2 * r, "This is the diameter, not the x-coordinate."],
          ],
          explanation: `On the x-axis y = 0, so x² = ${r * r} and the positive solution is x = ${r}.`,
          steps: ["Substitute y = 0.", "Take the square root.", "Select the positive value."],
          principles: ["A circle centered at the origin has radius √(right side)."],
        };
      },
    ],
    Medium: [
      (t) => {
        const r = t.int(2, 9);
        const shift = t.int(1, 20);
        return {
          family: "shifted-parabola-value",
          stem: `A point with a positive x-coordinate lies on both y = x² ${MINUS} ${shift} and y = ${num(r * r - shift)}. What is its x-coordinate?`,
          correct: r,
          wrong: [
            [-r, "This is the negative solution, which the question excludes."],
            [r * r, "This is x², not x."],
            [r * r - shift, "This is the y-coordinate of the point."],
            [r * r + shift, "This adds the shift instead of undoing it."],
          ],
          explanation: `x² ${MINUS} ${shift} = ${num(r * r - shift)} gives x² = ${r * r}, so the positive solution is x = ${r}.`,
          steps: ["Set the two expressions for y equal.", "Add the shift to both sides.", "Take the positive square root."],
          principles: ["Substitution reduces a nonlinear system to one equation."],
        };
      },
      (t) => {
        const a = t.int(2, 9);
        const c = t.int(1, 15);
        return {
          family: "parabola-line-greater-y",
          stem: `The graphs of y = x² + ${c} and y = ${lin(a, c)} intersect at two points. What is the greater y-coordinate of an intersection?`,
          correct: a * a + c,
          wrong: [
            [c, "This is the y-coordinate at the other intersection, where x = 0."],
            [a, "This is the x-coordinate of one intersection, not a y-coordinate."],
            [a + c, "This adds the coefficient to the constant instead of squaring the x-coordinate."],
            [a * a, "This omits the constant term of the parabola."],
          ],
          explanation: `x² + ${c} = ${lin(a, c)} gives x² = ${a}x, so x = 0 or x = ${a}. The y-values are ${c} and ${a * a + c}; the greater is ${a * a + c}.`,
          steps: ["Set the expressions for y equal.", "Solve the quadratic for both x-values.", "Evaluate y at each and compare."],
          principles: ["Each solution of the system is an ordered pair; compare the outputs."],
          verification: { kind: "sum", inputs: [a * a, c], expected: a * a + c },
        };
      },
    ],
    Hard: [
      (t) => {
        const p = t.int(2, 9);
        const q = -t.int(1, 8);
        const b = -(p + q);
        const c = p * q;
        return {
          family: "sum-of-intersection-x-values",
          stem: `The graphs of y = x² ${signed(b)}x and y = ${num(-c)} intersect at two points. What is the sum of the x-coordinates of those points?`,
          correct: p + q,
          wrong: [
            [p * q, "This is the product of the x-coordinates."],
            [Math.max(p, q), "This is only the greater x-coordinate."],
            [Math.min(p, q), "This is only the lesser x-coordinate."],
            [-(p + q), "This is the middle coefficient of the quadratic, which is the opposite of the sum of its roots."],
          ],
          explanation: `The intersections satisfy x² ${signed(b)}x ${signed(c)} = 0, whose roots sum to ${MINUS}(${num(b)}) = ${num(p + q)}.`,
          steps: ["Set the two expressions equal and write the quadratic in standard form.", "Use the sum-of-roots relationship.", "Report the sum without solving for each root."],
          principles: ["For x² + bx + c, the roots sum to −b."],
          trap: "Solving for both roots is unnecessary; the sum comes straight from the coefficient.",
          verification: { kind: "sum", inputs: [p, q], expected: p + q },
        };
      },
      (t) => {
        const positive = t.int(1, 6);
        const negative = -(positive + t.int(1, 6));
        const total = positive + positive * positive;
        return {
          family: "greater-y-from-negative-x",
          stem: `The system y = x² and x + y = ${total} has two solutions. What is the greater of the two y-values?`,
          correct: negative * negative,
          wrong: [
            [positive * positive, "This is the y-value at the positive x-solution, which is the smaller of the two."],
            [positive, "This is one of the x-values, not a y-value."],
            [negative, "This is the negative x-value, not the y-value it produces."],
            [total, "This is the given sum, not a coordinate of a solution."],
          ],
          explanation: `Substituting gives x + x² = ${total}, that is (x ${MINUS} ${positive})(x ${signed(-negative)}) = 0, so x = ${positive} or x = ${negative}. The y-values are ${positive * positive} and ${negative * negative}; the greater is ${negative * negative}.`,
          steps: ["Substitute y = x² into the linear equation.", "Solve the quadratic for both x-values.", "Square each to compare the y-values."],
          principles: ["Squaring reverses the order of negative numbers, so the smaller x can give the larger y."],
          trap: "The larger x-value does not give the larger y-value when one solution is negative.",
          verification: { kind: "product", inputs: [negative, negative], expected: negative * negative },
        };
      },
      (t) => {
        const s = t.int(3, 14);
        const p = t.int(2, 20);
        const sumSquares = s * s - 2 * p;
        return {
          family: "symmetric-nonlinear-identity",
          stem: `For real numbers x and y, x² + y² = ${sumSquares} and xy = ${p}. What is the value of (x + y)²?`,
          correct: s * s,
          wrong: [
            [sumSquares, "This is x² + y², which is missing the cross term 2xy."],
            [sumSquares + p, "This adds xy once instead of twice."],
            [sumSquares - 2 * p, "This subtracts the cross term instead of adding it, giving (x − y)²."],
            [s, "This is x + y, not its square."],
          ],
          explanation: `(x + y)² = x² + 2xy + y² = ${sumSquares} + 2(${p}) = ${s * s}.`,
          steps: ["Expand (x + y)².", "Substitute the two given values.", "Add."],
          principles: ["(x + y)² = x² + y² + 2xy."],
          trap: "The cross term is 2xy, not xy.",
          verification: { kind: "sum", inputs: [sumSquares, 2 * p], expected: s * s },
        };
      },
    ],
  },

  "quadratic functions": {
    Easy: [
      (t) => {
        const h = t.int(2, 12);
        const k = t.int(-15, 18);
        return {
          family: "vertex-form-minimum",
          stem: `What is the minimum value of y for the graph of y = (x ${MINUS} ${h})² ${signed(k)}?`,
          correct: k,
          wrong: [
            [h, "This is the x-coordinate of the vertex, not the minimum value of y."],
            [-k, "This reverses the direction of the vertical shift."],
            [h + k, "This adds the vertex coordinates."],
            [h * h + k, "This evaluates the function at x = 0 rather than at the vertex."],
          ],
          explanation: `The squared term is never negative, so y is smallest when x = ${h}, giving y = ${num(k)}.`,
          steps: ["Recognize vertex form.", "Identify the vertex.", "Read the y-coordinate as the minimum."],
          principles: ["In y = (x − h)² + k the vertex is (h, k)."],
        };
      },
      (t) => {
        const h = t.int(-12, 12);
        const k = t.int(-12, 15);
        const a = t.int(2, 4);
        return {
          family: "vertex-form-x-coordinate",
          stem: `What is the x-coordinate of the vertex of the graph of y = ${a}(x ${signed(-h)})² ${signed(k)}?`,
          correct: h,
          wrong: [
            [-h, "This reads the sign inside the parentheses directly instead of reversing it."],
            [k, "This is the y-coordinate of the vertex."],
            [a, "This is the vertical stretch factor."],
            [a * h, "This multiplies the vertex coordinate by the stretch factor."],
          ],
          explanation: `The vertex occurs where the squared term is zero, at x = ${num(h)}.`,
          steps: ["Set the expression inside the parentheses equal to zero.", "Solve for x.", "Report the vertex's x-coordinate."],
          principles: ["y = a(x − h)² + k has vertex (h, k)."],
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(1, 4);
        const h = t.int(-8, 9);
        const b = -2 * a * h;
        const c = t.int(-12, 20);
        return {
          family: "axis-of-symmetry-standard-form",
          stem: `What is the x-coordinate of the vertex of the graph of y = ${lin(a, 0)}² ${signed(b)}x ${signed(c)}?`,
          correct: h,
          wrong: [
            [-h, "This omits the negative sign in the formula −b/(2a)."],
            [b, "This is the middle coefficient itself."],
            [Math.round((-b / a) * 1000) / 1000, "This divides by a instead of by 2a."],
            [c, "This is the constant term."],
          ],
          explanation: `The axis of symmetry is x = ${MINUS}b/(2a) = ${MINUS}(${num(b)})/(2 · ${a}) = ${num(h)}.`,
          steps: ["Identify a and b.", "Apply x = −b/(2a).", "Simplify."],
          principles: ["The vertex of y = ax² + bx + c lies at x = −b/(2a)."],
          verification: quotient(-b, 2 * a),
        };
      },
      (t) => {
        const a = t.int(1, 4);
        const h = t.int(2, 10);
        const k = t.int(-12, 15);
        const d = t.int(1, 6);
        return {
          family: "evaluate-vertex-form",
          stem: `The function f is defined by f(x) = ${a}(x ${MINUS} ${h})² ${signed(k)}. What is the value of f(${h + d})?`,
          correct: a * d * d + k,
          wrong: [
            [a * d + k, "This omits the squaring of the distance from the vertex."],
            [k, "This is the value at the vertex, not at x = " + (h + d) + "."],
            [a * (h + d) * (h + d) + k, "This squares the input instead of the distance from the vertex."],
            [a * d * d - k, "This subtracts the vertical shift instead of adding it."],
          ],
          explanation: `f(${h + d}) = ${a}(${h + d} ${MINUS} ${h})² ${signed(k)} = ${a}(${d})² ${signed(k)} = ${num(a * d * d + k)}.`,
          steps: ["Subtract the vertex's x-coordinate from the input.", "Square that difference and multiply by the leading coefficient.", "Add the vertical shift."],
          principles: ["Vertex form measures inputs as distances from the vertex."],
          verification: { kind: "sum", inputs: [a * d * d, k], expected: a * d * d + k },
        };
      },
    ],
    Hard: [
      (t) => {
        const h = t.int(2, 12);
        const minimum = t.int(-20, 10);
        const b = -2 * h;
        const c = h * h + minimum;
        return {
          family: "constant-from-minimum",
          stem: `The graph of y = x² ${signed(b)}x + c has a minimum value of ${num(minimum)}, where c is a constant. What is the value of c?`,
          correct: c,
          wrong: [
            [minimum, "This is the minimum value itself, not the constant term."],
            [h * h, "This is the amount completing the square removes, without the minimum added back."],
            [h * h - minimum, "This subtracts the minimum instead of adding it."],
            [b + minimum, "This adds the middle coefficient rather than the square of half of it."],
          ],
          explanation: `Completing the square gives y = (x ${MINUS} ${h})² + c ${MINUS} ${h * h}, so the minimum is c ${MINUS} ${h * h} = ${num(minimum)} and c = ${num(c)}.`,
          steps: ["Complete the square to expose the vertex.", "Set the vertex's y-coordinate equal to the given minimum.", "Solve for c."],
          principles: ["Completing the square converts standard form into vertex form."],
          trap: "The constant term is not the minimum; completing the square shifts it by (b/2)².",
          verification: { kind: "sum", inputs: [h * h, minimum], expected: c },
        };
      },
      (t) => {
        const r = t.int(2, 10);
        const s = -t.int(2, 12);
        const a = t.int(1, 3);
        const axis = (r + s) / 2;
        return {
          family: "axis-from-factored-form",
          stem: `The function f is defined by f(x) = ${a}(x ${MINUS} ${r})(x ${signed(-s)}). What is the x-coordinate of the vertex of the graph of f?`,
          correct: axis,
          wrong: [
            [r, "This is one of the zeros, not the midpoint between them."],
            [s, "This is the other zero."],
            [r + s, "This adds the zeros without halving."],
            [r * s, "This multiplies the zeros."],
          ],
          explanation: `The zeros are ${r} and ${num(s)}, and the vertex lies halfway between them: x = (${r} + (${num(s)}))/2 = ${num(axis)}.`,
          steps: ["Read the two zeros from the factored form.", "Average them.", "Report the axis of symmetry."],
          principles: ["A parabola is symmetric about the midpoint of its zeros."],
          verification: { kind: "mean", inputs: [r, s], expected: axis },
        };
      },
      (t) => {
        const smaller = t.int(2, 10);
        const gap = 2 * t.int(1, 5);
        const larger = smaller + gap;
        const k = -(smaller + larger);
        return {
          family: "coefficient-from-zero-spacing",
          stem: `The function f is defined by f(x) = x² + kx + ${smaller * larger}, and its two zeros differ by ${gap}. What is the value of k?`,
          correct: k,
          wrong: [
            [-k, "This gives the sum of the zeros rather than the coefficient, which is its opposite."],
            [gap, "This is the difference of the zeros."],
            [smaller, "This is the lesser zero."],
            [smaller * larger, "This is the constant term."],
          ],
          explanation: `The zeros multiply to ${smaller * larger} and differ by ${gap}, so they are ${smaller} and ${larger}. Their sum is ${smaller + larger}, and k is its opposite: ${num(k)}.`,
          steps: ["Use the constant term as the product of the zeros.", "Combine with the given difference to identify the zeros.", "Set k equal to the opposite of their sum."],
          principles: ["For x² + kx + c, the zeros multiply to c and sum to −k."],
          trap: "The coefficient k is the negative of the sum of the zeros.",
        };
      },
    ],
  },

  "exponential functions": {
    Easy: [
      (t) => {
        const start = t.int(2, 24);
        const periods = t.int(3, 6);
        return {
          family: "doubling-growth",
          stem: `A culture starts with ${start} cells and doubles every hour. How many cells are present after ${periods} hours?`,
          correct: start * 2 ** periods,
          wrong: [
            [start * 2 * periods, "This multiplies by 2 times the number of hours instead of by 2 raised to that power."],
            [start + 2 * periods, "This models constant addition rather than repeated doubling."],
            [2 ** periods, "This omits the starting number of cells."],
            [start * 2 ** (periods - 1), "This counts one doubling too few."],
          ],
          explanation: `${start} · 2^${periods} = ${start * 2 ** periods}.`,
          steps: ["Identify the initial amount.", "Raise the growth factor 2 to the number of hours.", "Multiply."],
          principles: ["Exponential growth multiplies by a constant factor each period."],
          verification: { kind: "product", inputs: [start, 2 ** periods], expected: start * 2 ** periods },
        };
      },
      (t) => {
        const periods = t.int(2, 5);
        const end = t.int(2, 20);
        const start = end * 2 ** periods;
        return {
          family: "halving-decay",
          stem: `A sample of ${start} grams loses half its mass every year. How many grams remain after ${periods} years?`,
          correct: end,
          wrong: [
            [start / 2, "This halves the mass only once."],
            [Math.round((start / (2 * periods)) * 1000) / 1000, "This divides by twice the number of years instead of by 2 raised to that power."],
            [start - 2 * periods, "This subtracts a fixed amount each year rather than halving."],
            [end / 2, "This halves one time too many."],
          ],
          explanation: `${start} · (1/2)^${periods} = ${start}/${2 ** periods} = ${end}.`,
          steps: ["Identify the decay factor of 1/2.", "Raise it to the number of years.", "Multiply by the initial mass."],
          principles: ["Exponential decay multiplies by a factor between 0 and 1 each period."],
          verification: quotient(start, 2 ** periods),
        };
      },
    ],
    Medium: [
      (t) => {
        const rate = t.pick([10, 20, 25, 50]);
        const factor = 1 + rate / 100;
        const years = t.int(2, 3);
        const base = t.pick([1000, 2000, 4000, 8000]);
        const value = base * factor ** years;
        return {
          family: "percent-growth-model",
          stem: `An investment of $${base} grows by ${rate}% each year. What is its value, in dollars, after ${years} years?`,
          correct: Math.round(value * 1000) / 1000,
          wrong: [
            [base * (1 + (rate * years) / 100), "This applies the percent increase once to a multiple of the number of years, ignoring compounding."],
            [base + rate * years, "This adds the percent as a dollar amount."],
            [Math.round(base * factor * 1000) / 1000, "This applies only one year of growth."],
            [Math.round(base * factor ** (years + 1) * 1000) / 1000, "This applies one year of growth too many."],
          ],
          explanation: `Each year multiplies the value by ${formatNumber(factor)}, so the value is ${base} · ${formatNumber(factor)}^${years} = ${formatNumber(value)}.`,
          steps: ["Convert the percent increase to a growth factor.", "Raise it to the number of years.", "Multiply by the initial value."],
          principles: ["A p% annual increase multiplies by (1 + p/100) each year."],
          trap: "Repeated percent growth compounds; multiplying the percent by the number of years understates it.",
        };
      },
      (t) => {
        const a = t.int(2, 12);
        const b = t.int(2, 5);
        const x = t.int(2, 4);
        return {
          family: "find-growth-factor",
          stem: `The function f is defined by f(x) = ${a}·b^x for some positive constant b. If f(1) = ${a * b}, what is the value of f(${x})?`,
          correct: a * b ** x,
          wrong: [
            [a * b * x, "This multiplies by b times x instead of by b raised to the x."],
            [a * b, "This is f(1), the value that was given."],
            [a + b * x, "This treats the model as linear."],
            [a * b ** (x - 1), "This uses one growth step too few."],
          ],
          explanation: `f(1) = ${a}b = ${a * b} gives b = ${b}, so f(${x}) = ${a} · ${b}^${x} = ${a * b ** x}.`,
          steps: ["Use the given value to solve for the growth factor.", "Substitute it into the model.", "Evaluate at the requested input."],
          principles: ["One data point determines b once the initial value is known."],
          verification: { kind: "product", inputs: [a, b ** x], expected: a * b ** x },
        };
      },
    ],
    Hard: [
      (t) => {
        const factor = t.pick([2, 3, 5]);
        const period = t.pick([3, 4, 6]);
        const span = period * t.int(2, 4);
        return {
          family: "growth-factor-unit-conversion",
          stem: `A population multiplies by ${factor} every ${period} months. By what factor does the population multiply over ${span} months?`,
          correct: factor ** (span / period),
          wrong: [
            [factor * (span / period), "This multiplies the factor by the number of periods instead of raising it to that power."],
            [factor ** span, "This treats each month as a full growth period."],
            [factor * span, "This multiplies the growth factor by the number of months."],
            [factor ** (span / period - 1), "This counts one growth period too few."],
          ],
          explanation: `${span} months contain ${span / period} periods of ${period} months, so the factor is ${factor}^${span / period} = ${factor ** (span / period)}.`,
          steps: ["Divide the total time by the length of one growth period.", "Raise the growth factor to that number of periods.", "Report the overall factor."],
          principles: ["Exponential growth compounds once per growth period, not once per unit of time."],
          trap: "The exponent counts growth periods, not months.",
        };
      },
      (t) => {
        const b = t.int(2, 5);
        const a = t.int(2, 9);
        const first = t.int(1, 3);
        const second = first + 2;
        return {
          family: "base-from-two-values",
          stem: `The function f is defined by f(x) = a·b^x, where a and b are positive constants. If f(${first}) = ${a * b ** first} and f(${second}) = ${a * b ** second}, what is the value of b?`,
          correct: b,
          wrong: [
            [b * b, "This is the ratio of the two given values, which equals b² because the inputs differ by 2."],
            [a, "This is the coefficient, not the growth factor."],
            [a * b, "This is f(1), not the growth factor."],
            [Math.round(((a * b ** second - a * b ** first) / 2) * 1000) / 1000, "This treats the change as constant, which describes a linear function."],
          ],
          explanation: `Dividing gives f(${second})/f(${first}) = b^${second - first} = ${b ** 2}, so b = ${b}.`,
          steps: ["Divide the two function values so the coefficient cancels.", "Recognize the quotient as b raised to the difference of the inputs.", "Take the appropriate root."],
          principles: ["The ratio of exponential values depends only on the difference of the inputs."],
          trap: "The ratio of the outputs is b², not b, because the inputs differ by 2.",
        };
      },
      (t) => {
        const rate = t.pick([20, 25, 50]);
        const factor = 1 + rate / 100;
        const overall = Math.round(factor * factor * 100 - 100);
        return {
          family: "annual-rate-from-two-year-growth",
          stem: `A quantity grows by the same percent each year and increases by a total of ${overall}% over two years. What is the annual percent increase?`,
          correct: rate,
          wrong: [
            [Math.round((overall / 2) * 1000) / 1000, "This halves the total percent, which ignores that growth compounds."],
            [overall, "This is the two-year increase, not the annual one."],
            [Math.round((overall / 4) * 1000) / 1000, "This divides the total by 4 instead of taking a square root of the growth factor."],
            [rate * 2, "This doubles the annual rate instead of reporting it."],
          ],
          explanation: `The two-year factor is ${formatNumber(1 + overall / 100)}, so the annual factor is √${formatNumber(1 + overall / 100)} = ${formatNumber(factor)}, an increase of ${rate}%.`,
          steps: ["Convert the two-year increase into a growth factor.", "Take the square root to get the annual factor.", "Convert back to a percent increase."],
          principles: ["Two years of growth multiply the annual factor by itself."],
          trap: "Percent increases compound; halving a two-year percent overstates or understates the annual rate.",
        };
      },
    ],
  },

  "polynomial functions": {
    Easy: [
      (t) => {
        const input = t.int(2, 7);
        return {
          family: "evaluate-cubic",
          stem: `If p(x) = x³ ${MINUS} x, what is the value of p(${input})?`,
          correct: input ** 3 - input,
          wrong: [
            [input ** 3, "This omits the −x term."],
            [input ** 2 - input, "This squares the input instead of cubing it."],
            [input ** 3 + input, "This adds the input instead of subtracting it."],
            [3 * input - input, "This multiplies by 3 instead of raising to the third power."],
          ],
          explanation: `p(${input}) = ${input ** 3} ${MINUS} ${input} = ${input ** 3 - input}.`,
          steps: ["Substitute the input for every x.", "Evaluate the power first.", "Subtract."],
          principles: ["Follow the order of operations when evaluating a polynomial."],
          verification: { kind: "sum", inputs: [input ** 3, -input], expected: input ** 3 - input },
        };
      },
      (t) => {
        const a = t.int(2, 9);
        const input = -t.int(2, 5);
        return {
          family: "evaluate-cubic-negative",
          stem: `If p(x) = x³ + ${a}x, what is the value of p(${num(input)})?`,
          correct: input ** 3 + a * input,
          wrong: [
            [Math.abs(input) ** 3 + a * Math.abs(input), "This drops the negative sign of the input."],
            [input ** 3 - a * input, "This subtracts the linear term instead of adding it."],
            [input ** 2 + a * input, "This squares the input rather than cubing it."],
            [input ** 3, "This omits the linear term."],
          ],
          explanation: `p(${num(input)}) = (${num(input)})³ + ${a}(${num(input)}) = ${num(input ** 3)} ${MINUS} ${Math.abs(a * input)} = ${num(input ** 3 + a * input)}.`,
          steps: ["Substitute the negative input.", "Cube it, keeping the sign.", "Add the linear term."],
          principles: ["An odd power preserves the sign of its input."],
          verification: { kind: "sum", inputs: [input ** 3, a * input], expected: input ** 3 + a * input },
        };
      },
    ],
    Medium: [
      (t) => {
        const a = t.int(2, 8);
        const b = t.int(2, 9);
        const c = t.int(2, 7);
        return {
          family: "value-at-zero-factored",
          stem: `If p(x) = (x ${MINUS} ${a})(x + ${b})(x ${MINUS} ${c}), what is the value of p(0)?`,
          correct: a * b * c,
          wrong: [
            [-a * b * c, "This misses one of the sign changes from the two negative factors."],
            [a + b + c, "This adds the constants instead of multiplying the factor values."],
            [a * b, "This omits the third factor."],
            [-a * b, "This omits the third factor and mishandles a sign."],
          ],
          explanation: `p(0) = (${MINUS}${a})(${b})(${MINUS}${c}) = ${a * b * c}, since the two negative factors give a positive product.`,
          steps: ["Substitute 0 into each factor.", "Multiply the three results.", "Track the signs carefully."],
          principles: ["A product of two negative numbers is positive."],
          verification: { kind: "product", inputs: [a, b, c], expected: a * b * c },
        };
      },
      (t) => {
        const root = t.int(2, 6);
        const k = root * root;
        return {
          family: "constant-from-known-zero",
          stem: `The polynomial p is defined by p(x) = x³ ${MINUS} kx, where k is a constant. If p(${root}) = 0 and k ≠ 0, what is the value of k?`,
          correct: k,
          wrong: [
            [root, "This is the zero itself, not the constant."],
            [root ** 3, "This is the cubed term alone, without dividing by the zero."],
            [root * 3, "This multiplies the zero by 3 instead of squaring it."],
            [root ** 3 - root, "This evaluates a different polynomial."],
          ],
          explanation: `p(${root}) = ${root ** 3} ${MINUS} ${root}k = 0, so k = ${root ** 3}/${root} = ${k}.`,
          steps: ["Substitute the known zero.", "Set the result equal to zero.", "Solve the linear equation for k."],
          principles: ["If p(r) = 0 then r is a zero of p."],
          verification: quotient(root ** 3, root),
        };
      },
    ],
    Hard: [
      (t) => {
        const root = t.int(2, 5);
        const b = t.int(2, 9);
        const c = t.int(2, 20);
        const k = -(root ** 3 - b * root - c) / (root * root);
        const kInt = Math.round(k);
        const cAdjusted = root ** 3 + kInt * root * root - b * root;
        return {
          family: "factor-theorem-coefficient",
          stem: `The polynomial p is defined by p(x) = x³ + kx² ${MINUS} ${b}x ${MINUS} ${cAdjusted}, where k is a constant. If x ${MINUS} ${root} is a factor of p, what is the value of k?`,
          correct: kInt,
          wrong: [
            [root, "This is the zero coming from the factor, not the unknown coefficient."],
            [b, "This is the coefficient of x."],
            [cAdjusted, "This is the constant term."],
            [-kInt, "This changes the sign of the correct coefficient."],
          ],
          explanation: `Since x ${MINUS} ${root} is a factor, p(${root}) = 0: ${root ** 3} + ${root * root}k ${MINUS} ${b * root} ${MINUS} ${cAdjusted} = 0, so k = ${num(kInt)}.`,
          steps: ["Apply the factor theorem: a factor x − r means p(r) = 0.", "Substitute r and collect the terms containing k.", "Solve the resulting linear equation."],
          principles: ["x − r is a factor of p exactly when p(r) = 0."],
          trap: "The factor gives a zero of the polynomial, which must be substituted before k can be found.",
          verification: quotient(cAdjusted + b * root - root ** 3, root * root),
        };
      },
      (t) => {
        const r = t.int(1, 6);
        const s = -t.int(1, 7);
        const u = t.int(2, 8);
        return {
          family: "constant-term-from-zeros",
          stem: `The polynomial p is defined by p(x) = x³ + ax² + bx + c and has zeros ${num(r)}, ${num(s)}, and ${num(u)}, where a, b, and c are constants. What is the value of c?`,
          correct: -r * s * u,
          wrong: [
            [r * s * u, "This is the product of the zeros; the constant term is its opposite for a monic cubic."],
            [r + s + u, "This is the sum of the zeros, which relates to a rather than c."],
            [-(r + s + u), "This is the coefficient a, not the constant term."],
            [r * s + s * u + r * u, "This is the coefficient b, the sum of pairwise products."],
          ],
          explanation: `p(x) = (x ${MINUS} ${num(r)})(x ${MINUS} (${num(s)}))(x ${MINUS} ${u}), so c = p(0) = (${MINUS}${r})(${num(-s)})(${MINUS}${u}) = ${num(-r * s * u)}.`,
          steps: ["Write the polynomial in factored form using its zeros.", "Evaluate at x = 0 to isolate the constant term.", "Track the three sign changes."],
          principles: ["For a monic cubic, the constant term is the negative of the product of the zeros."],
          trap: "Three factors contribute three sign changes, which flips the sign of the product.",
          verification: { kind: "product", inputs: [-r, s, u], expected: -r * s * u },
        };
      },
      (t) => {
        const r = t.int(1, 6);
        const s = r + t.int(1, 4);
        const u = s + t.int(1, 4);
        const shift = t.int(2, 9);
        return {
          family: "zero-sum-after-shift",
          stem: `The polynomial p has exactly three zeros: ${r}, ${s}, and ${u}. The polynomial q is defined by q(x) = p(x ${MINUS} ${shift}). What is the sum of the zeros of q?`,
          correct: r + s + u + 3 * shift,
          wrong: [
            [r + s + u, "This is the sum of the zeros of p, before the shift is applied."],
            [r + s + u - 3 * shift, "This shifts the zeros left instead of right."],
            [r + s + u + shift, "This adds the shift once instead of once per zero."],
            [shift * 3, "This counts only the shift and drops the original zeros."],
          ],
          explanation: `q(x) = 0 when p(x ${MINUS} ${shift}) = 0, that is when x ${MINUS} ${shift} is ${r}, ${s}, or ${u}. The zeros of q are ${r + shift}, ${s + shift}, and ${u + shift}, whose sum is ${r + s + u + 3 * shift}.`,
          steps: ["Set the shifted input equal to each zero of p.", "Solve for x to get each zero of q.", "Add the three shifted zeros."],
          principles: ["Replacing x by x − h translates every zero h units to the right."],
          trap: "Each of the three zeros moves, so the sum changes by three times the shift.",
          verification: { kind: "sum", inputs: [r, s, u, 3 * shift], expected: r + s + u + 3 * shift },
        };
      },
    ],
  },
});

// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------

const DIFFICULTY_TIERS = ["Easy", "Medium", "Hard"];
const TIER_SECONDS = { Easy: 45, Medium: 75, Hard: 120 };

// Mirrors answerPositionPlanner in lib/generation.js so the generator knows,
// before it commits to a shape, which slot the key will occupy. That is the
// only way to emit numeric choices in ascending order while the planner keeps
// key positions balanced within each difficulty tier.
let positionMirror = null;

function nextAnswerPosition(difficulty, seedKey) {
  if (!positionMirror) {
    const counts = {};
    DIFFICULTY_TIERS.forEach((tier) => {
      counts[tier] = [0, 0, 0, 0];
    });
    const rebuilding = process.argv.includes("--rebuild");
    loadBank("sat-math")
      .filter((question) => !rebuilding || question.provenance.generator !== GENERATOR)
      .filter((question) => question.responseType === "multiple-choice")
      .forEach((question) => {
        const tier = counts[question.difficulty] || counts.Medium;
        tier[question.correctAnswer] += 1;
      });
    positionMirror = counts;
  }
  const tier = positionMirror[difficulty] || positionMirror.Medium;
  const fewest = Math.min(...tier);
  const candidates = [0, 1, 2, 3].filter((index) => tier[index] === fewest);
  const choice = candidates[hashString(String(seedKey)) % candidates.length];
  tier[choice] += 1;
  return choice;
}

// Picks three distractors so that exactly `target` of them are smaller than the
// key. Combined with the mirrored position that renders the four choices in
// ascending numeric order, the way a real digital SAT item is printed.
function selectDistractors(correctText, wrong, target) {
  const seen = new Set([correctText]);
  const pool = [];
  wrong.forEach(([value, reason]) => {
    const text = label(value);
    if (seen.has(text) || text === "NaN" || text === "Infinity" || text === "-Infinity") return;
    seen.add(text);
    pool.push({ text, reason, value: Number(text) });
  });
  if (pool.length < 3) return null;
  const correctValue = Number(correctText);
  const numeric = Number.isFinite(correctValue) && pool.every((entry) => Number.isFinite(entry.value));
  if (!numeric || target === null) {
    // Word answers and student-produced responses have no ordering to honour.
    return { chosen: pool.slice(0, 3), ordered: true };
  }
  const below = pool.filter((entry) => entry.value < correctValue).sort((a, b) => a.value - b.value);
  const above = pool.filter((entry) => entry.value > correctValue).sort((a, b) => a.value - b.value);
  let low = Math.min(target, below.length);
  let high = 3 - low;
  if (high > above.length) {
    high = above.length;
    low = 3 - high;
  }
  if (low > below.length) return null;
  const chosen = below.slice(below.length - low).concat(above.slice(0, high));
  return { chosen, ordered: low === target };
}

function generate(parameters) {
  const { sequence, localIndex, task, random } = parameters;
  const scene = context(sequence);
  const tier = task.difficulty;
  const shapes = SHAPES[task.subskill] && SHAPES[task.subskill][tier];
  if (!shapes || shapes.length === 0) {
    throw new Error(`No SAT Math ${tier} shapes for ${task.skill}/${task.subskill}`);
  }
  const responseType = TEXT_ANSWER.has(`${task.subskill}|${tier}`)
    ? "multiple-choice"
    : (localIndex * 89) % 485 < 100 ? "numeric" : "multiple-choice";
  const seed = `sat-math-${sequence}`;
  const answerPosition = responseType === "multiple-choice"
    ? nextAnswerPosition(tier, seed)
    : null;
  const helpers = tools(random);

  let fallback = null;
  for (let pass = 0; pass < 3; pass += 1) {
    for (let offset = 0; offset < shapes.length; offset += 1) {
      const shape = shapes[(sequence + offset) % shapes.length];
      const data = shape(helpers, scene, sequence);
      const correctText = label(data.correct);
      const selection = selectDistractors(correctText, data.wrong, answerPosition);
      if (!selection) continue;
      const candidate = { data, selection };
      if (!fallback) fallback = candidate;
      if (selection.ordered || answerPosition === null) {
        return finish(candidate, { responseType, scene, sequence, tier });
      }
    }
  }
  if (!fallback) throw new Error(`Could not build ${task.subskill}/${tier} at ${sequence}`);
  return finish(fallback, { responseType, scene, sequence, tier });
}

function finish(candidate, { responseType, scene, sequence, tier }) {
  const { data, selection } = candidate;
  const tags = (data.tags || []).concat([
    `templateFamily:sat-math/${data.family}/${tier.toLowerCase()}`,
  ]);
  return mathQuestion({ responseType, scene, sequence }, {
    ...data,
    bare: true,
    tags,
    seconds: data.seconds || TIER_SECONDS[tier],
    wrong: selection.chosen.map((entry) => [entry.text, entry.reason]),
  });
}

if (require.main === module) {
  const completed = generateSection("sat-math", generate, {
    generatorName: GENERATOR,
    regenerateGenerated: process.argv.includes("--rebuild"),
    finalMultipleChoiceCount: 458,
  });
  console.log(
    `SAT Math: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
  );
}

module.exports = {
  SHAPES,
  context,
  formatNumber,
  generate,
  mathQuestion,
};
