#!/usr/bin/env node
"use strict";

const { generateSection } = require("./lib/generation");
const {
  context,
  formatNumber,
  mathQuestion,
} = require("./generate-sat-math");

function q(sequence, data) {
  const scene = context(sequence);
  return mathQuestion({
    responseType: "multiple-choice",
    scene: { ...scene, place: `${scene.place} Academy` },
    sequence,
  }, data);
}

function generate({ sequence, task }) {
  const scene = context(sequence);
  const a = 2 + sequence % 7;
  const b = 3 + (sequence * 3) % 8;
  switch (task.subskill) {
    case "number properties": {
      const multiple = a * b;
      return q(sequence, {
        stem: `What is the greatest common factor of ${multiple} and ${multiple + a}?`,
        correct: a,
        wrong: [[b, "This factor does not necessarily divide both numbers."], [multiple, "The smaller number does not divide the larger one."], [1, "Both numbers share the factor shown in their construction."]],
        explanation: `${multiple} = ${a}·${b} and ${multiple + a} = ${a}·${b + 1}; consecutive integers ${b} and ${b + 1} share no larger factor, so the GCF is ${a}.`,
        steps: ["Factor out the visible common factor.", "Compare the remaining consecutive factors.", "Identify the greatest shared factor."],
        principles: ["The GCF is the largest positive integer dividing both values."],
      });
    }
    case "complex numbers": {
      const coefficient = 2 + sequence % 8;
      return q(sequence, {
        stem: `If i² = −1, what is the real value of ${coefficient}i² + ${b}?`,
        correct: b - coefficient,
        wrong: [[b + coefficient, "This treats i² as +1."], [coefficient * b, "The terms are added after replacing i²; they are not multiplied."], [b, "This omits the complex-unit term."]],
        explanation: `${coefficient}i² + ${b} = ${coefficient}(−1) + ${b} = ${b - coefficient}.`,
        steps: ["Replace i² with −1.", "Multiply the coefficient.", "Combine the real terms."],
        principles: ["The imaginary unit satisfies i² = −1."],
      });
    }
    case "exponents": {
      const p = 2 + sequence % 5;
      const r = 3 + sequence % 6;
      return q(sequence, {
        stem: `If x^${p} · x^${r} = x^k, what is k?`,
        correct: p + r,
        wrong: [[p * r, "Exponents are added for a product of like bases."], [r - p, "Subtract exponents only when dividing like bases."], [p + r + 1, "No additional factor of x appears."]],
        explanation: `Add exponents: k = ${p} + ${r} = ${p + r}.`,
        steps: ["Confirm the bases match.", "Apply the product rule.", "Add the exponents."],
        principles: ["x^m · x^n = x^(m+n)."],
      });
    }
    case "unit conversion":
    case "measurement conversion": {
      const feet = 3 + sequence % 8;
      return q(sequence, {
        stem: `A board is ${feet} feet long. How many inches long is it?`,
        correct: feet * 12,
        wrong: [[feet + 12, "Conversion requires multiplication, not addition."], [feet / 12, "This converts inches to feet, the opposite direction."], [feet * 3, "A foot contains 12, not 3, inches."]],
        explanation: `${feet} feet × 12 inches per foot = ${feet * 12} inches.`,
        steps: ["Use 12 inches per foot.", "Multiply so feet cancel.", "Report inches."],
        principles: ["Multiply by a unit conversion factor equal to 1."],
        verification: { kind: "product", inputs: [feet, 12], expected: feet * 12 },
      });
    }
    case "dimensional reasoning": {
      const speed = 4 + sequence % 7;
      const hours = 2 + sequence % 5;
      return q(sequence, {
        stem: `A cart moves at ${speed} meters per hour for ${hours} hours. How many meters does it travel?`,
        correct: speed * hours,
        wrong: [[speed + hours, "Distance is rate multiplied by time."], [speed / hours, "This divides rather than canceling hours."], [hours / speed, "This reverses the dimensional relationship."]],
        explanation: `${speed} m/h × ${hours} h = ${speed * hours} m.`,
        steps: ["Write the rate with units.", "Multiply by time.", "Cancel hours and retain meters."],
        principles: ["Distance = rate × time; units provide a check."],
        verification: { kind: "product", inputs: [speed, hours], expected: speed * hours },
      });
    }
    case "linear equations": {
      const x = 3 + sequence % 8;
      const coefficient = 2 + sequence % 5;
      const constant = 4 + sequence % 7;
      const total = coefficient * x + constant;
      return q(sequence, {
        stem: `Solve ${coefficient}x + ${constant} = ${total}.`,
        correct: x,
        wrong: [[total - constant, "This does not divide by the coefficient."], [total / coefficient, "This ignores the constant term."], [(total + constant) / coefficient, "This adds instead of subtracting the constant."]],
        explanation: `Subtract ${constant}, then divide by ${coefficient}: x = ${x}.`,
        steps: ["Subtract the constant.", "Divide by the coefficient.", "Substitute back to verify."],
        principles: ["Use inverse operations equally on both sides."],
        verification: { kind: "linear-equation", inputs: [coefficient, constant, total], expected: x },
      });
    }
    case "inequalities": {
      const boundary = 3 + sequence % 7;
      return q(sequence, {
        stem: `Which value is the least integer satisfying 2x > ${2 * boundary}?`,
        correct: boundary + 1,
        wrong: [[boundary, "The strict inequality excludes the boundary."], [2 * boundary, "This is the original right side, not a solution boundary."], [boundary - 1, "This is below the required boundary."]],
        explanation: `Divide by 2: x > ${boundary}; the least integer is ${boundary + 1}.`,
        steps: ["Divide by the positive coefficient.", "Keep the strict inequality.", "Choose the next integer above the boundary."],
        principles: ["Strict inequalities exclude equality."],
      });
    }
    case "systems": {
      const x = 2 + sequence % 6;
      const y = 3 + sequence % 5;
      return q(sequence, {
        stem: `If x + y = ${x + y} and x − y = ${x - y}, what is y?`,
        correct: y,
        wrong: [[x, "This is x, not y."], [2 * y, "Subtracting the equations yields twice y before division."], [x + y, "This is the given sum."]],
        explanation: `Subtract the second equation from the first: 2y = ${2 * y}, so y = ${y}.`,
        steps: ["Subtract equations to eliminate x.", "Solve for y.", "Check in both original equations."],
        principles: ["Combine equations to eliminate one variable."],
      });
    }
    case "factoring": {
      const r = 2 + sequence % 6;
      const s = r + 2;
      return q(sequence, {
        stem: `What is the larger zero of x² − ${r + s}x + ${r * s}?`,
        correct: s,
        wrong: [[r, "This is the smaller zero."], [r + s, "This is the sum of the zeros."], [r * s, "This is the product of the zeros."]],
        explanation: `Factor as (x − ${r})(x − ${s}); the larger zero is ${s}.`,
        steps: ["Find two numbers with the needed sum and product.", "Factor the trinomial.", "Set each factor to zero."],
        principles: ["Factored form exposes polynomial zeros."],
      });
    }
    case "rational expressions": {
      const c = 2 + sequence % 8;
      return q(sequence, {
        stem: `For x ≠ ${c}, simplify (x² − ${c * c})/(x − ${c}). What constant is added to x in the result?`,
        correct: c,
        wrong: [[-c, "This uses the wrong sign in the remaining factor."], [c * c, "This is the square in the numerator, not the simplified constant."], [2 * c, "The factorization does not double the constant."]],
        explanation: `Factor the numerator as (x − ${c})(x + ${c}) and cancel, leaving x + ${c}.`,
        steps: ["Use the difference-of-squares pattern.", "Cancel the common factor under the restriction.", "Read the remaining constant."],
        principles: ["a² − b² = (a − b)(a + b)."],
      });
    }
    case "notation": {
      const coefficient = 2 + sequence % 5;
      const constant = 3 + sequence % 6;
      const input = 2 + sequence % 4;
      return q(sequence, {
        stem: `If f(x) = ${coefficient}x + ${constant}, find f(${input}).`,
        correct: coefficient * input + constant,
        wrong: [[coefficient + input + constant, "This adds instead of multiplying the input."], [coefficient * (input + constant), "This incorrectly includes the constant in the product."], [coefficient * input, "This omits the constant."]],
        explanation: `f(${input}) = ${coefficient}(${input}) + ${constant} = ${coefficient * input + constant}.`,
        steps: ["Substitute the input.", "Multiply.", "Add the constant."],
        principles: ["Function notation asks for the output at a given input."],
      });
    }
    case "domain and range": {
      const low = 2 + sequence % 5;
      const high = low + 6;
      return q(sequence, {
        stem: `A function is defined only for integer inputs from ${low} through ${high}, inclusive. How many values are in its domain?`,
        correct: high - low + 1,
        wrong: [[high - low, "Inclusive counting requires one more than the endpoint difference."], [high, "This is the upper endpoint."], [low + high, "Endpoints are not added to count integers."]],
        explanation: `${high} − ${low} + 1 = ${high - low + 1} integer inputs.`,
        steps: ["Subtract endpoints.", "Add 1 because both are included.", "Check by listing if needed."],
        principles: ["Inclusive integer count = upper − lower + 1."],
      });
    }
    case "transformations": {
      const shift = 2 + sequence % 7;
      return q(sequence, {
        stem: `The graph of y = f(x − ${shift}) is the graph of y = f(x) shifted how many units to the right?`,
        correct: shift,
        wrong: [[-shift, "The question asks for a positive number of units to the right."], [2 * shift, "Horizontal shift magnitude equals the constant."], [0, "The input replacement creates a horizontal shift."]],
        explanation: `Replacing x with x − ${shift} shifts the graph ${shift} units right.`,
        steps: ["Inspect the input of f.", "Use the opposite-sign horizontal shift rule.", "Report the shift magnitude."],
        principles: ["f(x − h) shifts f right by h."],
      });
    }
    case "linear": {
      const slope = 2 + sequence % 6;
      const intercept = 4 + sequence % 8;
      return q(sequence, {
        stem: `For y = ${slope}x + ${intercept}, what is y when x = 3?`,
        correct: slope * 3 + intercept,
        wrong: [[slope + 3 + intercept, "This adds instead of multiplying slope by x."], [slope * 3, "This omits the intercept."], [intercept * 3 + slope, "This multiplies the wrong constant."]],
        explanation: `y = ${slope}(3) + ${intercept} = ${slope * 3 + intercept}.`,
        steps: ["Substitute x = 3.", "Multiply by slope.", "Add the intercept."],
        principles: ["Linear function y = mx + b."],
      });
    }
    case "quadratic": {
      const h = 2 + sequence % 6;
      const k = 3 + sequence % 7;
      return q(sequence, {
        stem: `What is the minimum value of y = (x − ${h})² + ${k}?`,
        correct: k,
        wrong: [[h, "This is the vertex's x-coordinate."], [-k, "The vertical shift is upward."], [h + k, "Vertex coordinates are not added."]],
        explanation: `The vertex is (${h}, ${k}) and the parabola opens upward, so its minimum is ${k}.`,
        steps: ["Recognize vertex form.", "Identify the vertex.", "Use the positive squared coefficient."],
        principles: ["y = a(x − h)² + k has vertex (h, k)."],
      });
    }
    case "exponential": {
      const start = 3 + sequence % 5;
      return q(sequence, {
        stem: `A quantity starts at ${start} and triples twice. What is its final value?`,
        correct: start * 9,
        wrong: [[start + 6, "This treats repeated multiplication as addition."], [start * 6, "Two factors of 3 give 3², not 3·2."], [9, "This omits the starting amount."]],
        explanation: `${start} · 3² = ${start * 9}.`,
        steps: ["Identify the initial amount.", "Use a factor of 3 for each period.", "Multiply by 9."],
        principles: ["Repeated percent or factor change is exponential."],
      });
    }
    case "angles": {
      const angle = 35 + sequence % 50;
      return q(sequence, {
        stem: `One angle in a linear pair measures ${angle}°. What is the other angle?`,
        correct: 180 - angle,
        wrong: [[180 + angle, "Linear pairs sum to 180°."], [90 - angle, "This treats them as complementary."], [angle, "The angles are not stated to be equal."]],
        explanation: `180 − ${angle} = ${180 - angle}°.`,
        steps: ["Use the supplementary-angle relationship.", "Subtract the known angle.", "Verify a sum of 180°."],
        principles: ["A linear pair is supplementary."],
      });
    }
    case "triangles": {
      const scale = 1 + sequence % 4;
      return q(sequence, {
        stem: `A right triangle has legs ${3 * scale} and ${4 * scale}. Find the hypotenuse.`,
        correct: 5 * scale,
        wrong: [[7 * scale, "This adds the legs."], [12 * scale * scale, "This multiplies the legs."], [Math.sqrt(7 * scale), "The Pythagorean theorem adds squares, not lengths."]],
        explanation: `√((${3 * scale})² + (${4 * scale})²) = ${5 * scale}.`,
        steps: ["Square the legs.", "Add.", "Take the square root."],
        principles: ["a² + b² = c²."],
        verification: { kind: "pythagorean", inputs: [3 * scale, 4 * scale], expected: 5 * scale },
      });
    }
    case "circles": {
      const radius = 3 + sequence % 8;
      return q(sequence, {
        stem: `A circle has radius ${radius}. What is the coefficient of π in its area?`,
        correct: radius * radius,
        wrong: [[2 * radius, "This is the circumference coefficient."], [radius, "Area squares the radius."], [4 * radius * radius, "This squares the diameter."]],
        explanation: `A = πr² = ${radius * radius}π.`,
        steps: ["Use circle area.", "Square the radius.", "Read the coefficient."],
        principles: ["Circle area A = πr²."],
        verification: { kind: "circle-area-coefficient", inputs: [radius], expected: radius * radius },
      });
    }
    case "coordinate geometry": {
      const x1 = sequence % 6;
      const x2 = x1 + 8;
      return q(sequence, {
        stem: `What is the x-coordinate of the midpoint between (${x1}, ${b}) and (${x2}, ${b + 4})?`,
        correct: (x1 + x2) / 2,
        wrong: [[x2 - x1, "This is the horizontal distance."], [x1 + x2, "This omits division by 2."], [(b + b + 4) / 2, "This is the midpoint's y-coordinate."]],
        explanation: `Average the x-coordinates: (${x1} + ${x2})/2 = ${(x1 + x2) / 2}.`,
        steps: ["Take the two x-coordinates.", "Add them.", "Divide by 2."],
        principles: ["Midpoint coordinates are coordinate-wise averages."],
        verification: { kind: "midpoint-x", inputs: [x1, x2], expected: (x1 + x2) / 2 },
      });
    }
    case "area":
    case "perimeter and area": {
      const length = 6 + sequence % 8;
      const width = 3 + sequence % 6;
      return q(sequence, {
        stem: `A rectangle measures ${length} by ${width}. What is its area?`,
        correct: length * width,
        wrong: [[2 * (length + width), "This is perimeter."], [length + width, "Area requires multiplication."], [2 * length * width, "The rectangle is counted twice."]],
        explanation: `${length} · ${width} = ${length * width}.`,
        steps: ["Identify length and width.", "Multiply.", "Use square units."],
        principles: ["Rectangle area A = lw."],
        verification: { kind: "product", inputs: [length, width], expected: length * width },
      });
    }
    case "surface area": {
      const side = 3 + sequence % 6;
      return q(sequence, {
        stem: `A cube has side length ${side}. Find its surface area.`,
        correct: 6 * side * side,
        wrong: [[side ** 3, "This is volume."], [6 * side, "Each face area is side squared."], [4 * side * side, "A cube has six faces, not four."]],
        explanation: `6s² = 6(${side}²) = ${6 * side * side}.`,
        steps: ["Find one square face's area.", "Multiply by six faces.", "Use square units."],
        principles: ["Cube surface area = 6s²."],
      });
    }
    case "volume": {
      const length = 3 + sequence % 5;
      const width = 4 + sequence % 4;
      const height = 2 + sequence % 6;
      return q(sequence, {
        stem: `A rectangular prism measures ${length} by ${width} by ${height}. Find its volume.`,
        correct: length * width * height,
        wrong: [[length * width, "This is only base area."], [length + width + height, "Volume requires multiplication."], [2 * (length + width + height), "This is not a volume formula."]],
        explanation: `${length}·${width}·${height} = ${length * width * height}.`,
        steps: ["Identify three dimensions.", "Multiply all three.", "Use cubic units."],
        principles: ["Rectangular prism volume V = lwh."],
        verification: { kind: "product", inputs: [length, width, height], expected: length * width * height },
      });
    }
    case "right-triangle trigonometry": {
      const opposite = 3 + sequence % 5;
      const hypotenuse = opposite + 5;
      return q(sequence, {
        stem: `For angle θ, opposite = ${opposite} and hypotenuse = ${hypotenuse}. Find sin θ to three decimals if needed.`,
        correct: formatNumber(opposite / hypotenuse),
        wrong: [[formatNumber(hypotenuse / opposite), "This reverses sine."], [formatNumber((hypotenuse - opposite) / hypotenuse), "The adjacent side cannot be found by simple subtraction here."], [formatNumber(opposite / (hypotenuse - opposite)), "This is not the sine ratio."]],
        explanation: `sin θ = ${opposite}/${hypotenuse} = ${formatNumber(opposite / hypotenuse)}.`,
        steps: ["Identify opposite and hypotenuse.", "Divide.", "Round at the end."],
        principles: ["sin θ = opposite/hypotenuse."],
        verification: { kind: "probability", inputs: [opposite, hypotenuse], expected: opposite / hypotenuse },
      });
    }
    case "identities": {
      const sine = 0.6;
      return q(sequence, {
        stem: "For an acute angle θ, sin θ = 0.6 and cos θ = 0.8. What is sin²θ + cos²θ?",
        correct: 1,
        wrong: [[1.4, "This adds sine and cosine without squaring."], [0.48, "This multiplies sine and cosine."], [0.04, "This subtracts the squared values."]],
        explanation: `0.6² + 0.8² = 0.36 + 0.64 = 1.`,
        steps: ["Square sine.", "Square cosine.", "Add."],
        principles: ["sin²θ + cos²θ = 1."],
      });
    }
    case "center and spread":
    case "averages": {
      const values = [a, a + 2, a + 4, a + 6, a + 8];
      return q(sequence, {
        stem: `Find the mean of ${values.join(", ")}.`,
        correct: a + 4,
        wrong: [[5 * (a + 4), "This is the sum."], [a + 6, "This is above the center of the symmetric list."], [5, "This is the count of values."]],
        explanation: `The symmetric list has mean ${a + 4}.`,
        steps: ["Add the values or identify the center.", "Divide by five.", "Check against the range."],
        principles: ["Mean = sum/count."],
        verification: { kind: "mean", inputs: values, expected: a + 4 },
      });
    }
    case "data displays": {
      const total = 30 + sequence % 20;
      const part = 10 + sequence % 10;
      return q(sequence, {
        stem: `A bar chart shows ${part} of ${total} responses in one category. What fraction of responses is in that category, as a decimal to three places if needed?`,
        correct: formatNumber(part / total),
        wrong: [[formatNumber((total - part) / total), "This is the complement."], [formatNumber(part / (total - part)), "This uses the other category as denominator."], [formatNumber(total / part), "This reverses part and whole."]],
        explanation: `${part}/${total} = ${formatNumber(part / total)}.`,
        steps: ["Identify category count.", "Use total as denominator.", "Divide."],
        principles: ["Proportion = part/whole."],
        verification: { kind: "probability", inputs: [part, total], expected: part / total },
      });
    }
    case "regression": {
      const slope = 2 + sequence % 7;
      return q(sequence, {
        stem: `A regression model predicts ${slope} more units for each additional hour. What is its slope?`,
        correct: slope,
        wrong: [[1 / slope, "This reverses output per input."], [slope + 1, "No additional unit is added."], [0, "The prediction changes, so slope is not zero."]],
        explanation: `The predicted rate is ${slope} units per hour, so slope = ${slope}.`,
        steps: ["Identify output change.", "Identify one unit of input.", "Write output per input."],
        principles: ["Regression slope is predicted change in y per unit x."],
      });
    }
    case "counting": {
      const shirts = 3 + sequence % 4;
      const pants = 2 + sequence % 3;
      return q(sequence, {
        stem: `A uniform can use any of ${shirts} shirts and ${pants} pairs of pants. How many combinations are possible?`,
        correct: shirts * pants,
        wrong: [[shirts + pants, "Use multiplication for independent choices."], [shirts * pants - 1, "All pairings are allowed."], [shirts ** pants, "The multiplication principle, not exponentiation, applies."]],
        explanation: `${shirts}·${pants} = ${shirts * pants} combinations.`,
        steps: ["Count first choices.", "Count second choices.", "Multiply independent options."],
        principles: ["Fundamental counting principle: multiply stage counts."],
        verification: { kind: "product", inputs: [shirts, pants], expected: shirts * pants },
      });
    }
    case "compound probability": {
      const favorable = 3;
      const total = 6;
      return q(sequence, {
        stem: "A fair six-sided number cube is rolled twice. What is the probability both results are even?",
        correct: 0.25,
        wrong: [[0.5, "This is the probability for one roll."], [1 / 3, "This does not multiply independent event probabilities."], [0.75, "This is not the probability of two successes."]],
        explanation: `(3/6)² = (1/2)² = 1/4 = 0.25.`,
        steps: ["Find one-roll probability.", "Use independence.", "Multiply."],
        principles: ["Multiply probabilities of independent events."],
      });
    }
    case "rates":
    case "proportions": {
      const count = 4 + sequence % 6;
      const rate = 3 + sequence % 7;
      const target = count + 3;
      return q(sequence, {
        stem: `${count} ${scene.item} cost $${count * rate}. At the same rate, what do ${target} cost?`,
        correct: target * rate,
        wrong: [[count * rate + target, "This adds quantity instead of using unit rate."], [rate, "This is cost per item only."], [count * target, "This uses initial quantity as a rate."]],
        explanation: `Unit cost is $${rate}; ${target} cost $${target * rate}.`,
        steps: ["Find unit rate.", "Multiply by target quantity.", "Check proportionality."],
        principles: ["Equivalent ratios share a constant unit rate."],
      });
    }
    case "percentages": {
      const price = 40 + 10 * (sequence % 6);
      const pct = [10, 20, 25][sequence % 3];
      return q(sequence, {
        stem: `What is ${pct}% of ${price}?`,
        correct: price * pct / 100,
        wrong: [[price - price * pct / 100, "This is the amount remaining after a discount."], [pct, "This treats a percent as the result."], [price + price * pct / 100, "This adds the percentage amount."]],
        explanation: `${pct / 100}·${price} = ${price * pct / 100}.`,
        steps: ["Convert percent to decimal.", "Multiply by the whole.", "Check magnitude."],
        principles: ["Part = percent × whole."],
        verification: { kind: "percent-of", inputs: [price, pct], expected: price * pct / 100 },
      });
    }
    case "financial contexts": {
      const principal = 100 + 20 * (sequence % 8);
      const rate = 5;
      return q(sequence, {
        stem: `$${principal} earns ${rate}% simple interest for one year. How many dollars of interest are earned?`,
        correct: principal * rate / 100,
        wrong: [[principal + principal * rate / 100, "This is the ending balance, not interest."], [rate, "This repeats the percent as dollars."], [principal - principal * rate / 100, "Interest is added, not subtracted."]],
        explanation: `Interest = ${principal}·0.05 = $${principal * rate / 100}.`,
        steps: ["Convert rate to decimal.", "Multiply by principal and one year.", "Answer interest, not balance."],
        principles: ["Simple interest I = Prt."],
        verification: { kind: "percent-of", inputs: [principal, rate], expected: principal * rate / 100 },
      });
    }
    case "combined concepts": {
      const start = 20 + sequence % 15;
      const added = 6 + sequence % 8;
      return q(sequence, {
        stem: `A container starts with ${start} liters, gains ${added} liters, then the total is split equally among 2 tanks. How many liters go in each tank?`,
        correct: (start + added) / 2,
        wrong: [[start + added, "This is the total before splitting."], [start / 2 + added, "The added amount must also be split."], [start + added / 2, "Order of operations leaves the starting amount unsplit."]],
        explanation: `(${start} + ${added})/2 = ${(start + added) / 2}.`,
        steps: ["Combine the amounts.", "Divide the total by two.", "Check that two shares reconstruct the total."],
        principles: ["Use parentheses to preserve multi-step order."],
      });
    }
    default:
      throw new Error(`No ACT Mathematics generator for ${task.skill}/${task.subskill}`);
  }
}

const completed = generateSection("act-mathematics", generate, {
  generatorName: "act-mathematics-generator-v1",
  regenerateGenerated: process.argv.includes("--rebuild"),
});
console.log(
  `ACT Mathematics: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
);
