#!/usr/bin/env node
"use strict";

const { generateSection } = require("./lib/generation");

const places = [
  "Alder", "Brookside", "Cedar", "Dunham", "Elmwood", "Fairview", "Glen Park",
  "Harbor", "Ivy", "Juniper", "Kingston", "Lakeside", "Meadow", "Northgate",
  "Oak Hill", "Pinecrest", "Quarry", "Riverside", "Summit", "Timber",
  "Union", "Valley", "Westfield", "York", "Zephyr",
];

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
    place: places[sequence % places.length],
    item: items[(sequence * 7 + Math.floor(sequence / items.length)) % items.length],
  };
}

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 1000) / 1000);
}

function distractor(value, reason) {
  return { text: String(value), reason };
}

function mathQuestion(contextValue, data) {
  const correct = formatNumber(data.correct);
  const seen = new Set([correct]);
  const distractors = data.wrong
    .map(([value, reason]) => distractor(formatNumber(value), reason))
    .filter((item) => {
      if (seen.has(item.text)) return false;
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
  const alreadyContextual = data.stem.includes(contextValue.scene.place);
  const article = /^[aeiou]/i.test(contextValue.scene.place) ? "an" : "a";
  const purpose = reviewPurposes[contextValue.sequence % reviewPurposes.length];
  const stem = alreadyContextual
    ? data.stem
    : `During ${article} ${contextValue.scene.place} ${purpose} involving ` +
      `${contextValue.scene.item}, ${data.stem.charAt(0).toLowerCase()}${data.stem.slice(1)}`;
  return {
    responseType: contextValue.responseType,
    stimulus: data.stimulus || null,
    stem,
    correct,
    correctAnswer: correct,
    distractors: distractors.slice(0, 3),
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

function generate(parameters) {
  const { sequence, localIndex, task } = parameters;
  const scene = context(sequence);
  const responseType = (localIndex * 89) % 485 < 100 ? "numeric" : "multiple-choice";
  const ctx = { responseType, scene, sequence };
  const n = 2 + (sequence % 8);
  const m = 3 + ((sequence * 3) % 9);

  switch (task.subskill) {
    case "solve": {
      const x = n + 2;
      const a = 2 + (sequence % 5);
      const b = m;
      const c = a * x + b;
      return mathQuestion(ctx, {
        stem: `At ${scene.place} Center, a supply equation is ${a}x + ${b} = ${c}. What is the value of x?`,
        correct: x,
        wrong: [[c - b, "This subtracts but does not divide by the coefficient."], [(c + b) / a, "This adds the constant instead of subtracting it."], [c / a, "This divides before accounting for the constant term."]],
        explanation: `Subtract ${b} to get ${a}x = ${c - b}, then divide by ${a}; x = ${x}.`,
        steps: [`Subtract ${b} from both sides.`, `Divide both sides by ${a}.`, `Substitute ${x} to verify the original equation.`],
        principles: ["Use inverse operations and perform the same operation on both sides."],
        verification: { kind: "linear-equation", inputs: [a, b, c], expected: x },
      });
    }
    case "interpret constants": {
      const rate = 4 + (sequence % 7);
      const fixed = 10 + (sequence % 13);
      return mathQuestion(ctx, {
        stem: `The total cost C, in dollars, to rent ${scene.item} is C = ${rate}h + ${fixed}, where h is the number of hours. What does ${fixed} represent? Enter the dollar amount of the fixed fee.`,
        correct: fixed,
        wrong: [[rate, "This is the hourly rate."], [rate + fixed, "This combines the hourly and fixed amounts without a value of h."], [rate * fixed, "The model does not multiply the two constants."]],
        explanation: `The constant term is the cost when h = 0, so the fixed fee is $${fixed}.`,
        steps: ["Identify the term that does not contain h.", "Set h = 0 to interpret the initial value.", `The resulting cost is $${fixed}.`],
        principles: ["In y = mx + b, b is the initial value and m is the rate of change."],
      });
    }
    case "no or infinite solutions": {
      const infinite = sequence % 2 === 0;
      const k = 2 + (sequence % 5);
      const left = `${k}(x + ${n})`;
      const right = infinite ? `${k}x + ${k * n}` : `${k}x + ${k * n + 1}`;
      return mathQuestion(ctx, {
        stem: `How many solutions does the equation ${left} = ${right} have? Enter 0 for no solutions and −1 for infinitely many solutions.`,
        correct: infinite ? -1 : 0,
        wrong: [[infinite ? 0 : -1, "This reverses the meaning of the simplified identity or contradiction."], [1, "The variable terms cancel, so there is not exactly one solution."], [k, "The coefficient is not the number of solutions."]],
        explanation: infinite
          ? `Distributing gives ${k}x + ${k * n} on both sides, an identity true for every x.`
          : `Distributing gives ${k}x + ${k * n} = ${k}x + ${k * n + 1}, a contradiction.`,
        steps: ["Distribute on the left.", "Subtract the matching variable terms.", infinite ? "Recognize the true identity and conclude infinitely many solutions." : "Recognize the false numerical statement and conclude no solutions."],
        principles: ["An identity has infinitely many solutions; a contradiction has none."],
      });
    }
    case "slope": {
      const slope = 2 + (sequence % 5);
      const x1 = sequence % 4;
      const y1 = 3 + (sequence % 6);
      const x2 = x1 + n;
      const y2 = y1 + slope * n;
      return mathQuestion(ctx, {
        stem: `A line modeling visitors to ${scene.place} passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its slope?`,
        correct: slope,
        wrong: [[1 / slope, "This reverses rise and run."], [y2 - y1, "This uses only the rise."], [x2 - x1, "This uses only the run."]],
        explanation: `Slope = (${y2} − ${y1})/(${x2} − ${x1}) = ${slope * n}/${n} = ${slope}.`,
        steps: ["Compute the change in y.", "Compute the change in x.", "Divide rise by run."],
        principles: ["Slope = (y₂ − y₁)/(x₂ − x₁)."],
      });
    }
    case "intercepts": {
      const slope = 2 + sequence % 4;
      const intercept = 5 + sequence % 9;
      return mathQuestion(ctx, {
        stem: `For the linear model y = ${slope}x + ${intercept}, what is the y-intercept?`,
        correct: intercept,
        wrong: [[slope, "This is the slope."], [-intercept / slope, "This is the x-intercept."], [slope + intercept, "The coefficients are not added to find an intercept."]],
        explanation: `At the y-intercept, x = 0, so y = ${intercept}.`,
        steps: ["Set x equal to 0.", `Evaluate y = ${slope}(0) + ${intercept}.`, `Identify the intercept value ${intercept}.`],
        principles: ["The y-intercept is the output when x = 0."],
      });
    }
    case "function notation": {
      const a = 2 + sequence % 4;
      const b = 1 + sequence % 7;
      const input = 2 + sequence % 5;
      const output = a * input + b;
      return mathQuestion(ctx, {
        stem: `If f(x) = ${a}x + ${b}, what is f(${input})?`,
        correct: output,
        wrong: [[a + input + b, "This adds instead of multiplying the coefficient and input."], [a * (input + b), "This incorrectly puts the constant inside the multiplication."], [output - b, "This omits the constant term."]],
        explanation: `Substitute ${input}: f(${input}) = ${a}(${input}) + ${b} = ${output}.`,
        steps: [`Replace x with ${input}.`, "Multiply before adding.", `Report the output ${output}.`],
        principles: ["Function notation f(a) means evaluate the rule at input a."],
      });
    }
    case "graph interpretation": {
      const slope = 3 + sequence % 4;
      return mathQuestion(ctx, {
        stem: `A graph of distance versus time for deliveries of ${scene.item} rises ${slope * 2} miles while time increases 2 hours. What is the rate, in miles per hour?`,
        correct: slope,
        wrong: [[slope * 2, "This uses total distance rather than distance per hour."], [2 / (slope * 2), "This computes hours per mile."], [slope + 2, "Rate requires division, not addition."]],
        explanation: `Rate is change in distance divided by change in time: ${slope * 2}/2 = ${slope}.`,
        steps: ["Identify the vertical change.", "Identify the horizontal change.", "Divide distance by time and include units."],
        principles: ["A graph's slope represents change in output per unit change in input."],
      });
    }
    case "equation modeling": {
      const rate = 5 + sequence % 6;
      const start = 12 + sequence % 9;
      return mathQuestion(ctx, {
        stem: `${scene.place} has ${start} ${scene.item} and adds ${rate} each week. In the model y = ${rate}w + ${start}, what is y after 4 weeks?`,
        correct: rate * 4 + start,
        wrong: [[rate + start + 4, "This adds the weeks instead of multiplying by the weekly rate."], [rate * 4, "This omits the starting amount."], [start * 4 + rate, "This multiplies the initial value rather than the rate."]],
        explanation: `Substitute w = 4: y = ${rate}(4) + ${start} = ${rate * 4 + start}.`,
        steps: ["Identify 4 as the input w.", "Multiply the weekly rate by 4.", "Add the initial amount."],
        principles: ["A linear model combines initial value and rate × time."],
      });
    }
    case "solve systems": {
      const x = 2 + sequence % 6;
      const y = 3 + sequence % 7;
      const sum = x + y;
      const difference = x - y;
      return mathQuestion(ctx, {
        stem: `If x + y = ${sum} and x − y = ${difference}, what is x?`,
        correct: x,
        wrong: [[y, "This is the value of y."], [sum + difference, "This adds equations but does not divide by 2."], [sum - difference, "This corresponds to twice y, not x."]],
        explanation: `Add the equations: 2x = ${sum + difference}, so x = ${x}.`,
        steps: ["Add the equations to eliminate y.", `Solve 2x = ${sum + difference}.`, "Substitute back to check both equations."],
        principles: ["Add equations when opposite coefficients eliminate a variable."],
      });
    }
    case "interpret intersection": {
      const day = 3 + sequence % 5;
      return mathQuestion(ctx, {
        stem: `Two attendance models intersect at (${day}, ${20 + sequence % 15}). What does the x-coordinate of the intersection represent? Enter the number of days when the models predict equal attendance.`,
        correct: day,
        wrong: [[20 + sequence % 15, "This is the common attendance, the y-coordinate."], [day + 1, "This shifts the intersection without justification."], [(20 + sequence % 15) - day, "The coordinates should not be subtracted."]],
        explanation: `At an intersection, both models have the same output. The x-coordinate ${day} is the day of equality.`,
        steps: ["Recall that an intersection satisfies both models.", "Identify time as the x-axis quantity.", `Read the x-coordinate ${day}.`],
        principles: ["The intersection of two graphs represents a shared input-output pair."],
      });
    }
    case "solve inequalities": {
      const boundary = 4 + sequence % 8;
      const a = 2 + sequence % 4;
      const b = 3 + sequence % 6;
      const c = a * boundary + b;
      return mathQuestion(ctx, {
        stem: `If ${a}x + ${b} > ${c}, what is the least integer value of x?`,
        correct: boundary + 1,
        wrong: [[boundary, "The inequality is strict, so the boundary itself is excluded."], [c - b, "This omits division by the coefficient."], [(c + b) / a, "This adds instead of subtracting the constant."]],
        explanation: `Subtract ${b} and divide by ${a}: x > ${boundary}. The least integer greater than ${boundary} is ${boundary + 1}.`,
        steps: ["Isolate the variable term.", "Divide by the positive coefficient.", "Account for the strict inequality when selecting an integer."],
        principles: ["A strict inequality excludes its boundary."],
      });
    }
    case "systems of inequalities": {
      const lower = 2 + sequence % 5;
      const upper = lower + 4;
      return mathQuestion(ctx, {
        stem: `An integer x satisfies x > ${lower} and x ≤ ${upper}. How many integer values are possible?`,
        correct: upper - lower,
        wrong: [[upper - lower + 1, "This incorrectly includes the lower boundary."], [upper, "This counts from zero rather than within the interval."], [lower, "This is a boundary, not a count."]],
        explanation: `The integers are ${lower + 1} through ${upper}, a total of ${upper - lower}.`,
        steps: ["Exclude the strict lower boundary.", "Include the upper boundary.", "Count the listed integers."],
        principles: ["Graph each inequality and use the overlap."],
      });
    }
    case "factoring": {
      const r = 2 + sequence % 6;
      const s = 3 + (sequence * 2) % 7;
      return mathQuestion(ctx, {
        stem: `For x² − ${r + s}x + ${r * s} = 0, what is the larger solution?`,
        correct: Math.max(r, s),
        wrong: [[Math.min(r, s), "This is the smaller solution."], [r + s, "This is the sum of the roots, not a root."], [r * s, "This is the product of the roots."]],
        explanation: `Factor as (x − ${r})(x − ${s}) = 0. The solutions are ${r} and ${s}; the larger is ${Math.max(r, s)}.`,
        steps: ["Find two numbers with the required sum and product.", "Write the binomial factors.", "Set each factor to zero and select the larger root."],
        principles: ["For x² − (r+s)x + rs, the roots are r and s."],
      });
    }
    case "exponent rules": {
      const p = 2 + sequence % 5;
      const q = 3 + sequence % 6;
      return mathQuestion(ctx, {
        stem: `In the product x^${p} · x^${q} = x^k, what is k?`,
        correct: p + q,
        wrong: [[p * q, "Exponents are added, not multiplied, for like bases."], [Math.abs(p - q), "Subtraction applies to division of like bases."], [p + q + 1, "No additional exponent is introduced."]],
        explanation: `When multiplying like bases, add exponents: k = ${p} + ${q} = ${p + q}.`,
        steps: ["Confirm that the bases are the same.", "Apply the product rule.", "Add the exponents."],
        principles: ["x^a · x^b = x^(a+b)."],
      });
    }
    case "rational expressions": {
      const a = 2 + sequence % 7;
      return mathQuestion(ctx, {
        stem: `For x ≠ ${a}, (x² − ${a * a})/(x − ${a}) is equivalent to x + k. What is k?`,
        correct: a,
        wrong: [[-a, "This uses the other factor with the wrong sign."], [a * a, "This is the constant in the difference of squares, not k."], [2 * a, "The factorization does not double the constant."]],
        explanation: `x² − ${a * a} = (x − ${a})(x + ${a}); cancel x − ${a}, so k = ${a}.`,
        steps: ["Recognize a difference of squares.", "Factor the numerator.", "Cancel the common factor under the stated restriction."],
        principles: ["a² − b² = (a − b)(a + b)."],
      });
    }
    case "quadratic equations": {
      const root = 2 + sequence % 7;
      return mathQuestion(ctx, {
        stem: `What is the positive solution to x² = ${root * root}?`,
        correct: root,
        wrong: [[-root, "This is the negative solution, not the requested positive one."], [root * root, "This is x², not x."], [2 * root, "Taking a square root does not double the value."]],
        explanation: `x = ±√${root * root} = ±${root}; the positive solution is ${root}.`,
        steps: ["Take square roots of both sides.", "Include both signs.", "Select the positive solution requested."],
        principles: ["If x² = a², then x = ±a."],
      });
    }
    case "radical equations": {
      const x = 4 + sequence % 9;
      const shift = 2 + sequence % 5;
      const result = Math.sqrt(x + shift);
      const squared = Math.ceil(result);
      const targetX = squared * squared - shift;
      return mathQuestion(ctx, {
        stem: `If √(x + ${shift}) = ${squared}, what is x?`,
        correct: targetX,
        wrong: [[squared - shift, "This subtracts before squaring."], [squared * squared + shift, "This adds the shift instead of subtracting it."], [squared, "This stops before undoing the square root."]],
        explanation: `Square both sides: x + ${shift} = ${squared * squared}. Subtract ${shift}: x = ${targetX}.`,
        steps: ["Square both sides.", "Subtract the constant inside the radical.", "Check that the radicand gives the stated principal square root."],
        principles: ["Square both sides to undo a principal square root, then check the solution."],
      });
    }
    case "absolute value": {
      const center = 3 + sequence % 6;
      const distance = 2 + sequence % 5;
      return mathQuestion(ctx, {
        stem: `The larger solution of |x − ${center}| = ${distance} is what value?`,
        correct: center + distance,
        wrong: [[center - distance, "This is the smaller solution."], [distance, "This is the distance from the center, not the larger x-value."], [center, "The center is not a solution when the distance is positive."]],
        explanation: `x is ${distance} units from ${center}, so x = ${center} ± ${distance}; the larger is ${center + distance}.`,
        steps: ["Interpret absolute value as distance.", "Write both cases.", "Choose the larger result."],
        principles: ["|x − c| = d means x = c ± d for d ≥ 0."],
      });
    }
    case "linear-quadratic systems": {
      const x = 2 + sequence % 5;
      return mathQuestion(ctx, {
        stem: `The graphs y = x² and y = ${x}x intersect at x = 0 and x = k. What is k?`,
        correct: x,
        wrong: [[-x, "Substitution gives x(x − coefficient) = 0, not a negative second root."], [x * x, "This squares the coefficient unnecessarily."], [0, "Zero is one intersection, but k denotes the other."]],
        explanation: `Set x² = ${x}x: x(x − ${x}) = 0, so x = 0 or ${x}. Thus k = ${x}.`,
        steps: ["Set the two expressions for y equal.", "Factor the resulting equation.", "Select the nonzero intersection."],
        principles: ["Intersection points satisfy both equations."],
      });
    }
    case "nonlinear systems": {
      const x = 2 + sequence % 6;
      const y = x * x;
      return mathQuestion(ctx, {
        stem: `A point with positive x-coordinate lies on y = x² and y = ${x}x. What is its y-coordinate?`,
        correct: y,
        wrong: [[x, "This is the positive x-coordinate."], [2 * x, "This does not evaluate either equation at the intersection."], [0, "This is the other intersection's y-coordinate."]],
        explanation: `The positive intersection has x = ${x}; then y = ${x}² = ${y}.`,
        steps: ["Equate the two formulas for y.", "Find the positive x-coordinate.", "Substitute into y = x²."],
        principles: ["Solve systems by substitution and verify both coordinates."],
      });
    }
    case "quadratic functions": {
      const h = 2 + sequence % 6;
      const k = 3 + sequence % 8;
      return mathQuestion(ctx, {
        stem: `The graph of y = (x − ${h})² + ${k} has a minimum y-value of what?`,
        correct: k,
        wrong: [[h, "This is the vertex's x-coordinate."], [-k, "The graph is shifted upward, not downward."], [h + k, "Vertex coordinates are not added."]],
        explanation: `Vertex form y = (x − h)² + k has vertex (h, k) and opens upward, so the minimum is ${k}.`,
        steps: ["Recognize vertex form.", `Identify the vertex (${h}, ${k}).`, "Use the positive squared coefficient to determine that the vertex is a minimum."],
        principles: ["In y = a(x − h)² + k, the vertex is (h, k)."],
      });
    }
    case "exponential functions": {
      const start = 2 + sequence % 5;
      const periods = 3;
      return mathQuestion(ctx, {
        stem: `A culture starts with ${start} units and doubles each hour. How many units are present after ${periods} hours?`,
        correct: start * 2 ** periods,
        wrong: [[start + 2 * periods, "This models linear rather than exponential growth."], [start * 2 * periods, "This multiplies by 2n instead of 2^n."], [2 ** periods, "This omits the starting amount."]],
        explanation: `${start} · 2^${periods} = ${start * 2 ** periods}.`,
        steps: ["Identify the initial value.", "Use a growth factor of 2 for each period.", "Multiply by 2 raised to the number of periods."],
        principles: ["Exponential growth has form initial × factor^time."],
      });
    }
    case "polynomial functions": {
      const input = 2 + sequence % 4;
      const output = input ** 3 - input;
      return mathQuestion(ctx, {
        stem: `If p(x) = x³ − x, what is p(${input})?`,
        correct: output,
        wrong: [[input ** 3, "This omits the −x term."], [input ** 2 - input, "This squares rather than cubes the input."], [input ** 3 + input, "This adds instead of subtracting x."]],
        explanation: `p(${input}) = ${input}³ − ${input} = ${input ** 3} − ${input} = ${output}.`,
        steps: ["Substitute the input in every x position.", "Evaluate the exponent.", "Subtract the input."],
        principles: ["Apply order of operations when evaluating polynomial functions."],
      });
    }
    case "unit rates": {
      const quantity = 4 + sequence % 7;
      const rate = 3 + sequence % 8;
      return mathQuestion(ctx, {
        stem: `${quantity} ${scene.item} cost $${quantity * rate}. What is the cost per item, in dollars?`,
        correct: rate,
        wrong: [[quantity * rate, "This is the total cost."], [quantity, "This is the number of items."], [quantity * rate - quantity, "This subtracts instead of dividing."]],
        explanation: `Unit cost = ${quantity * rate}/${quantity} = $${rate}.`,
        steps: ["Identify total cost and quantity.", "Divide total by quantity.", "Attach dollars per item."],
        principles: ["Unit rate = total amount ÷ number of units."],
        verification: { kind: "probability", inputs: [quantity * rate, quantity], expected: rate },
      });
    }
    case "proportions": {
      const base = 3 + sequence % 6;
      const per = 2 + sequence % 5;
      const target = base + 4;
      return mathQuestion(ctx, {
        stem: `If ${base} boxes hold ${base * per} ${scene.item} at a constant rate, how many items do ${target} boxes hold?`,
        correct: target * per,
        wrong: [[base * per + target, "This adds boxes to items instead of using a constant rate."], [target * base, "This uses boxes per group instead of items per box."], [per, "This is only the unit rate."]],
        explanation: `${base * per}/${base} = ${per} items per box; ${target} · ${per} = ${target * per}.`,
        steps: ["Find items per box.", "Multiply the unit rate by the target boxes.", "Check proportional scaling."],
        principles: ["Equivalent ratios share a constant unit rate."],
      });
    }
    case "unit conversion": {
      const hours = 2 + sequence % 5;
      return mathQuestion(ctx, {
        stem: `A session lasts ${hours} hours. How many minutes is that?`,
        correct: hours * 60,
        wrong: [[hours + 60, "This adds rather than multiplies by the conversion factor."], [hours * 100, "An hour has 60, not 100, minutes."], [60 / hours, "This reverses the conversion."]],
        explanation: `${hours} × 60 = ${hours * 60} minutes.`,
        steps: ["Use 60 minutes per hour.", "Multiply so hours cancel.", "Report minutes."],
        principles: ["Multiply by a conversion factor equal to 1."],
        verification: { kind: "product", inputs: [hours, 60], expected: hours * 60 },
      });
    }
    case "percent change": {
      const original = 40 + sequence % 21;
      const percent = [10, 20, 25, 50][sequence % 4];
      const newer = original * (1 + percent / 100);
      return mathQuestion(ctx, {
        stem: `A count increases from ${original} to ${formatNumber(newer)}. What is the percent increase?`,
        correct: percent,
        wrong: [[newer - original, "This is the absolute increase, not the percent."], [(newer - original) / newer * 100, "This divides by the new value instead of the original."], [100 + percent, "This is the new value as a percent of the original."]],
        explanation: `(${formatNumber(newer)} − ${original})/${original} × 100 = ${percent}%.`,
        steps: ["Find the increase.", "Divide by the original value.", "Multiply by 100 percent."],
        principles: ["Percent change = change/original × 100%."],
        verification: { kind: "percent-change", inputs: [original, newer], expected: percent },
      });
    }
    case "percent applications": {
      const price = 40 + 10 * (sequence % 7);
      const pct = [10, 20, 25][sequence % 3];
      const discount = price * pct / 100;
      return mathQuestion(ctx, {
        stem: `A $${price} set of ${scene.item} is discounted ${pct}%. What is the discount, in dollars?`,
        correct: discount,
        wrong: [[price - discount, "This is the sale price, not the discount amount."], [pct, "This repeats the percent as a dollar amount."], [price + discount, "A discount does not increase the price."]],
        explanation: `${pct}% of $${price} is ${pct / 100} × ${price} = $${discount}.`,
        steps: ["Convert the percent to a decimal.", "Multiply by the original price.", "Answer the discount amount requested."],
        principles: ["Part = percent × whole."],
        verification: { kind: "percent-of", inputs: [price, pct], expected: discount },
      });
    }
    case "mean and median": {
      const values = [n, n + 2, n + 4, n + 6, n + 8];
      const mean = n + 4;
      return mathQuestion(ctx, {
        stem: `What is the mean of ${values.join(", ")}?`,
        correct: mean,
        wrong: [[values.reduce((a, b) => a + b, 0), "This is the sum, not the mean."], [mean + 2, "This does not divide the total by all five values."], [5, "This is the number of data values."]],
        explanation: `The sum is ${mean * 5}; divide by 5 to get ${mean}.`,
        steps: ["Add all five values.", "Count the values.", "Divide the sum by 5."],
        principles: ["Mean = sum of values ÷ number of values."],
        verification: { kind: "mean", inputs: values, expected: mean },
      });
    }
    case "spread": {
      const low = 4 + sequence % 8;
      const high = low + 10 + sequence % 6;
      return mathQuestion(ctx, {
        stem: `A data set has minimum ${low} and maximum ${high}. What is its range?`,
        correct: high - low,
        wrong: [[high + low, "Range uses subtraction, not addition."], [high, "This is the maximum."], [low, "This is the minimum."]],
        explanation: `Range = maximum − minimum = ${high} − ${low} = ${high - low}.`,
        steps: ["Identify maximum and minimum.", "Subtract minimum from maximum.", "Report the spread."],
        principles: ["Range = maximum − minimum."],
      });
    }
    case "distributions": {
      const median = 10 + sequence % 8;
      const outlier = 50 + sequence % 20;
      return mathQuestion(ctx, {
        stem: `A data set clustered near ${median} gains one high outlier at ${outlier}. Which measure is usually less affected: enter 1 for mean or 2 for median.`,
        correct: 2,
        wrong: [[1, "The mean uses every value and is pulled toward the outlier."], [0, "This code does not name either measure."], [3, "Only choices 1 and 2 are defined."]],
        explanation: "The median depends on order and position, so one extreme value typically affects it less than the mean.",
        steps: ["Identify the new value as an outlier.", "Recall how mean and median respond to extremes.", "Select the code for median."],
        principles: ["Median is resistant to extreme outliers; mean is not."],
      });
    }
    case "linear models": {
      const slope = 2 + sequence % 6;
      return mathQuestion(ctx, {
        stem: `A line of best fit predicts ${slope} additional visitors for each added hour. What is the model's slope?`,
        correct: slope,
        wrong: [[1 / slope, "This reverses output per input."], [slope + 1, "No extra unit is added to the stated rate."], [0, "The prediction changes with hours, so slope is not zero."]],
        explanation: `The stated change is ${slope} visitors per 1 hour, so slope = ${slope}.`,
        steps: ["Identify output change.", "Identify one unit of input change.", "Express output per input."],
        principles: ["A linear model's slope is its predicted change in y per unit x."],
      });
    }
    case "scatterplots": {
      const code = sequence % 2 === 0 ? 1 : -1;
      return mathQuestion(ctx, {
        stem: `As study time increases, error counts generally decrease. Enter 1 for positive association or −1 for negative association.`,
        correct: -1,
        wrong: [[1, "Positive association means both variables tend to rise together."], [0, "The described trend is not no association."], [2, "Only the stated codes represent association direction."]],
        explanation: "One variable increases while the other decreases, which is a negative association.",
        steps: ["Identify the direction of each variable.", "Compare whether they move together or oppositely.", "Select negative association."],
        principles: ["Negative association: as one variable increases, the other tends to decrease."],
      });
    }
    case "basic probability": {
      const favorable = 2 + sequence % 5;
      const total = favorable + 5 + sequence % 6;
      const probability = favorable / total;
      return mathQuestion(ctx, {
        stem: `A bag has ${total} tokens, ${favorable} of them blue. What is the probability of drawing blue? Give a decimal rounded to three places if needed.`,
        correct: formatNumber(probability),
        wrong: [[formatNumber((total - favorable) / total), "This is the probability of not blue."], [formatNumber(favorable / (total - favorable)), "This divides by unfavorable outcomes instead of total outcomes."], [formatNumber(1 / total), "This counts only one favorable token."]],
        explanation: `Probability = favorable/total = ${favorable}/${total} = ${formatNumber(probability)}.`,
        steps: ["Count favorable outcomes.", "Count all equally likely outcomes.", "Divide and round only at the end."],
        principles: ["Probability = favorable outcomes ÷ total outcomes."],
        verification: { kind: "probability", inputs: [favorable, total], expected: probability },
      });
    }
    case "conditional probability": {
      const group = 10 + sequence % 7;
      const favorable = 3 + sequence % 4;
      const probability = favorable / group;
      return mathQuestion(ctx, {
        stem: `Among ${group} surveyed students who ride the bus, ${favorable} also walk home at least once a week. What is P(walk | bus), rounded to three decimals if needed?`,
        correct: formatNumber(probability),
        wrong: [[formatNumber(favorable / (group + favorable)), "The conditional group already contains all bus riders."], [formatNumber((group - favorable) / group), "This is the conditional probability of not walking."], [formatNumber(1 / group), "This counts only one favorable student."]],
        explanation: `Restrict to the ${group} bus riders: ${favorable}/${group} = ${formatNumber(probability)}.`,
        steps: ["Use the condition to define the denominator.", "Count favorable cases within that group.", "Divide favorable by conditional total."],
        principles: ["Conditional probability restricts the sample space to cases satisfying the condition."],
        verification: { kind: "probability", inputs: [favorable, group], expected: probability },
      });
    }
    case "samples and populations": {
      return mathQuestion(ctx, {
        stem: `A random sample of students at ${scene.place} High is used to estimate the opinion of all students there. Enter 1 for sample or 2 for population: what group is “all students there”?`,
        correct: 2,
        wrong: [[1, "The sample is only the selected subset."], [0, "This code is not defined."], [3, "Only sample and population are options."]],
        explanation: "The population is the entire group the study aims to describe: all students at the school.",
        steps: ["Identify the group actually observed.", "Identify the broader group targeted by the conclusion.", "Classify the broader group as the population."],
        principles: ["A sample is observed; the population is the full group of interest."],
      });
    }
    case "margin of error": {
      const center = 50 + sequence % 20;
      const margin = 3 + sequence % 4;
      return mathQuestion(ctx, {
        stem: `An estimate is ${center}% with margin of error ±${margin} percentage points. What is the lower endpoint?`,
        correct: center - margin,
        wrong: [[center + margin, "This is the upper endpoint."], [margin, "This is only the margin."], [center - 2 * margin, "The stated margin is subtracted once."]],
        explanation: `Lower endpoint = ${center} − ${margin} = ${center - margin}.`,
        steps: ["Identify the center estimate.", "Subtract the margin once.", "Keep units in percentage points."],
        principles: ["A ±m interval extends m units below and above the estimate."],
      });
    }
    case "study design": {
      return mathQuestion(ctx, {
        stem: `Researchers randomly assign volunteers to use either Guide A or Guide B, then compare completion time. Enter 1 for observational study or 2 for experiment.`,
        correct: 2,
        wrong: [[1, "Random assignment to treatments makes this an experiment."], [0, "This code is not defined."], [3, "Only the two stated study types apply."]],
        explanation: "Researchers impose treatments through random assignment, so the study is an experiment.",
        steps: ["Ask whether researchers assign a treatment.", "Notice the random assignment to guides.", "Classify the design as an experiment."],
        principles: ["Experiments impose treatments; observational studies only observe existing conditions."],
      });
    }
    case "area": {
      const width = 4 + sequence % 8;
      const length = width + 3;
      return mathQuestion(ctx, {
        stem: `A rectangular display is ${length} feet by ${width} feet. What is its area, in square feet?`,
        correct: length * width,
        wrong: [[2 * (length + width), "This is perimeter."], [length + width, "Area requires multiplication."], [length * width * 2, "The rectangle is counted only once."]],
        explanation: `Area = length × width = ${length} × ${width} = ${length * width}.`,
        steps: ["Identify length and width.", "Multiply them.", "Use square feet."],
        principles: ["Rectangle area A = lw."],
        verification: { kind: "product", inputs: [length, width], expected: length * width },
      });
    }
    case "surface area": {
      const side = 3 + sequence % 6;
      return mathQuestion(ctx, {
        stem: `A cube has edge length ${side}. What is its surface area?`,
        correct: 6 * side * side,
        wrong: [[side ** 3, "This is volume."], [4 * side, "This does not find the area of six faces."], [6 * side, "Each face has area side squared."]],
        explanation: `Six square faces each have area ${side}², so surface area = 6(${side}²) = ${6 * side * side}.`,
        steps: ["Find one face's area.", "Count six congruent faces.", "Multiply."],
        principles: ["Cube surface area = 6s²."],
      });
    }
    case "volume": {
      const length = 4 + sequence % 5;
      const width = 3 + sequence % 4;
      const height = 2 + sequence % 6;
      return mathQuestion(ctx, {
        stem: `A rectangular prism measures ${length} by ${width} by ${height}. What is its volume?`,
        correct: length * width * height,
        wrong: [[2 * (length * width + length * height + width * height), "This is surface area."], [length + width + height, "Volume requires multiplying dimensions."], [length * width, "This is base area only."]],
        explanation: `V = lwh = ${length}·${width}·${height} = ${length * width * height}.`,
        steps: ["Identify all three dimensions.", "Multiply length, width, and height.", "Use cubic units."],
        principles: ["Rectangular prism volume V = lwh."],
        verification: { kind: "product", inputs: [length, width, height], expected: length * width * height },
      });
    }
    case "angle relationships": {
      const angle = 40 + sequence % 40;
      return mathQuestion(ctx, {
        stem: `Two angles form a linear pair. One measures ${angle}°. What is the other angle's measure?`,
        correct: 180 - angle,
        wrong: [[180 + angle, "Linear-pair angles sum to 180, not exceed it."], [90 - angle, "This treats the pair as complementary."], [angle, "Linear-pair angles need not be equal."]],
        explanation: `Linear-pair angles are supplementary: 180 − ${angle} = ${180 - angle}°.`,
        steps: ["Use a sum of 180 degrees.", "Subtract the known angle.", "Check that the pair sums to 180."],
        principles: ["Angles in a linear pair are supplementary."],
      });
    }
    case "similarity": {
      const small = 3 + sequence % 5;
      const large = small * 3;
      const other = 4 + sequence % 6;
      return mathQuestion(ctx, {
        stem: `Two similar triangles have corresponding sides ${small} and ${large}. If another side of the smaller triangle is ${other}, what is its corresponding larger side?`,
        correct: other * 3,
        wrong: [[other + (large - small), "Similarity uses multiplication by a scale factor, not adding side difference."], [other / 3, "This scales in the wrong direction."], [large, "This repeats a different side length."]],
        explanation: `Scale factor = ${large}/${small} = 3, so ${other}·3 = ${other * 3}.`,
        steps: ["Find the larger-to-smaller scale factor.", "Apply it to the corresponding side.", "Check proportionality."],
        principles: ["Corresponding sides of similar figures are proportional."],
      });
    }
    case "triangle geometry": {
      const a = 45 + sequence % 30;
      const b = 55 + sequence % 25;
      const c = 180 - a - b;
      return mathQuestion(ctx, {
        stem: `Two angles of a triangle measure ${a}° and ${b}°. What is the third angle?`,
        correct: c,
        wrong: [[a + b, "This is the sum of known angles."], [180 - a, "This subtracts only one known angle."], [360 - a - b, "A triangle's angles sum to 180, not 360."]],
        explanation: `Third angle = 180 − ${a} − ${b} = ${c}°.`,
        steps: ["Use the triangle angle sum.", "Subtract both known angles.", "Verify all three total 180."],
        principles: ["Interior angles of a triangle sum to 180°."],
      });
    }
    case "Pythagorean theorem": {
      const scale = 1 + sequence % 4;
      const a = 3 * scale;
      const b = 4 * scale;
      const c = 5 * scale;
      return mathQuestion(ctx, {
        stem: `A right triangle has legs ${a} and ${b}. What is its hypotenuse?`,
        correct: c,
        wrong: [[a + b, "The hypotenuse is not the sum of the legs."], [Math.sqrt(a + b), "The theorem squares the legs before adding."], [a * b, "The product of legs is unrelated to hypotenuse length."]],
        explanation: `c = √(${a}² + ${b}²) = ${c}.`,
        steps: ["Square both legs.", "Add the squares.", "Take the positive square root."],
        principles: ["For a right triangle, a² + b² = c²."],
        verification: { kind: "pythagorean", inputs: [a, b], expected: c },
      });
    }
    case "trigonometric ratios": {
      const opposite = 3 + sequence % 5;
      const hypotenuse = opposite + 5;
      const ratio = opposite / hypotenuse;
      return mathQuestion(ctx, {
        stem: `For an acute angle θ, the opposite side is ${opposite} and the hypotenuse is ${hypotenuse}. What is sin θ, rounded to three decimals if needed?`,
        correct: formatNumber(ratio),
        wrong: [[formatNumber(hypotenuse / opposite), "This reverses the ratio."], [formatNumber((hypotenuse - opposite) / hypotenuse), "This substitutes an unsupported adjacent length."], [formatNumber(opposite / (hypotenuse - opposite)), "This resembles tangent, not sine."]],
        explanation: `sin θ = opposite/hypotenuse = ${opposite}/${hypotenuse} = ${formatNumber(ratio)}.`,
        steps: ["Identify opposite and hypotenuse.", "Use the sine ratio.", "Divide and round at the end."],
        principles: ["sin θ = opposite/hypotenuse."],
        verification: { kind: "probability", inputs: [opposite, hypotenuse], expected: ratio },
      });
    }
    case "circle measures": {
      const radius = 3 + sequence % 8;
      return mathQuestion(ctx, {
        stem: `A circle has radius ${radius}. In the area kπ, what is k?`,
        correct: radius * radius,
        wrong: [[2 * radius, "This is the coefficient in circumference."], [radius, "Area uses radius squared."], [4 * radius * radius, "This would use the diameter squared."]],
        explanation: `Area = πr² = ${radius * radius}π, so k = ${radius * radius}.`,
        steps: ["Use the circle area formula.", "Square the radius.", "Identify the coefficient of π."],
        principles: ["Circle area A = πr²."],
        verification: { kind: "circle-area-coefficient", inputs: [radius], expected: radius * radius },
      });
    }
    case "circle equations": {
      const h = 2 + sequence % 6;
      const k = 3 + sequence % 5;
      const radius = 4 + sequence % 7;
      return mathQuestion(ctx, {
        stem: `The circle (x − ${h})² + (y − ${k})² = ${radius * radius} has radius what?`,
        correct: radius,
        wrong: [[radius * radius, "The right side is r², not r."], [h, "This is the center's x-coordinate."], [k, "This is the center's y-coordinate."]],
        explanation: `Standard form has right side r². Since r² = ${radius * radius}, r = ${radius}.`,
        steps: ["Compare with standard circle form.", "Identify r².", "Take the positive square root."],
        principles: ["(x − h)² + (y − k)² = r²."],
      });
    }
    default:
      throw new Error(`No SAT Math generator for ${task.skill}/${task.subskill}`);
  }
}

if (require.main === module) {
  const completed = generateSection("sat-math", generate, {
    generatorName: "sat-math-generator-v1",
    regenerateGenerated: process.argv.includes("--rebuild"),
    finalMultipleChoiceCount: 400,
  });
  console.log(
    `SAT Math: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
  );
}

module.exports = {
  context,
  formatNumber,
  mathQuestion,
};
