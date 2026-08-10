# SAT Math — Desmos Playbook

Bluebook includes a full Desmos graphing calculator on every Math question. It
is the largest single strategic advantage available on the digital SAT, and most
students underuse it badly — treating it as an arithmetic calculator when it can
often replace the entire solving process.

The core move: **turn algebra problems into graph-reading problems.**

---

## Setup and habits

- **Practice with the real thing.** Desmos is free at desmos.com/calculator. The
  Bluebook version is the same tool. Doing your practice with it builds the
  fluency that matters on test day.
- **Learn the keyboard.** `^` for exponents, `/` for fractions (the cursor
  auto-formats), arrow keys to escape a fraction or exponent, `sqrt` for
  radicals.
- **Use the expression list.** Each line is a separate object; you can toggle
  them on and off with the colored circle.
- **Click intersections and intercepts.** Desmos labels them with exact
  coordinates. This is the feature that does the most work.

---

## Play 1 — Solve any equation by graphing

Any equation `f(x) = g(x)` can be solved by graphing both sides and reading the
intersections.

> *Solve `2x² − 5x − 1 = 3x − 4`*

Type:
```
y = 2x^2 - 5x - 1
y = 3x - 4
```
Click each intersection. Done — no algebra, no quadratic formula, no sign
errors.

**Or** move everything to one side and read the x-intercepts:
```
y = 2x^2 - 8x + 3
```

This works for equations you couldn't solve by hand at all: radicals,
exponentials, absolute values, rational equations, mixtures of all of them.

**Caveat:** Desmos gives decimal approximations at the click points. If the
answer choices are exact radicals, use the decimals to identify which choice
matches, then confirm.

---

## Play 2 — Systems of equations

Type both equations exactly as given — Desmos handles implicit forms, so you do
**not** need to solve for `y`.

```
3x + 2y = 14
x + 4y = 18
```

Click the intersection: `(2, 4)`.

This is usually faster than substitution or elimination, and it removes
arithmetic risk entirely.

**For "no solution" or "infinitely many" questions**, graph and look: parallel
lines, or one line on top of another.

---

## Play 3 — Questions with a parameter

Use a **slider**. Type an equation containing a letter other than `x` or `y`,
and Desmos offers to add a slider for it.

> *For what value of `k` does `y = x² + kx + 9` have exactly one x-intercept?*

Type:
```
y = x^2 + kx + 9
```
Click "add slider" for `k`. Drag it until the parabola just touches the x-axis.
You'll see it happen at `k = 6` and `k = −6`.

This gives you the answer *and* shows you there are two values — which is
exactly the trap in that question type.

Sliders also let you answer "which of the following could be the value of..."
questions empirically.

---

## Play 4 — Testing answer choices

For "which of the following is equivalent to..." questions, graph the original
and each choice. **Equivalent expressions produce identical graphs.**

```
y = (x^2 - 9)/(x^2 + 5x + 6)
y = (x - 3)/(x + 2)
```

If the second graph traces exactly over the first, they're equivalent. Toggle
lines on and off to compare.

Faster variant: use a **table**. Create one and compare output values at several
x-values.

---

## Play 5 — Tables

Click the `+` button and choose "table." Enter x-values and Desmos computes any
function you define.

Uses:

- Comparing two expressions at several points
- Reading a modeling function at specific inputs
- Checking whether a sequence is arithmetic or geometric (constant differences
  vs. constant ratios)
- Verifying that your answer satisfies a condition

---

## Play 6 — Statistics

Desmos has built-in statistical functions. Type them directly:

```
mean([3, 7, 7, 9, 14])
median([3, 7, 7, 9, 14])
stdev([3, 7, 7, 9, 14])
total([3, 7, 7, 9, 14])
```

For a data set you'll reuse, define a list:
```
L = [3, 7, 7, 9, 14]
mean(L)
```

This handles nearly every one-variable data question mechanically.

---

## Play 7 — Regressions (line of best fit)

Enter a table of data, then type a regression model with `~`:

```
y_1 ~ mx_1 + b
```

Desmos reports `m`, `b`, and `r²`. Works for other model types too:

```
y_1 ~ ax_1^2 + bx_1 + c      (quadratic)
y_1 ~ ab^{x_1}               (exponential)
```

Useful when a question gives you data and asks about the best-fit model's slope,
intercept, or prediction.

---

## Play 8 — Inequalities

Type inequalities directly and Desmos shades the solution region.

```
y > 2x - 3
y <= -x + 5
```

The overlap is where both hold — visibly darker. For "which point satisfies the
system," look at where the point falls.

You can also plot a specific point to check:
```
(3, 1)
```

---

## Play 9 — Finding maxima, minima, and intercepts

Desmos labels key points when you click near them:

- **Vertex** of a parabola
- **Zeros / x-intercepts**
- **y-intercept**
- **Intersections** of any two curves
- **Local maxima and minima** of higher-degree polynomials

This replaces completing the square, the `−b/2a` computation, and factoring for
most questions that ask for these directly.

---

## Play 10 — Circles and conics

Type the standard form directly:
```
(x - 3)^2 + (y + 2)^2 = 25
```

Desmos graphs it. You can read the center and radius visually, which catches
sign errors instantly.

For a circle in general form, you can type it as-is and Desmos will still graph
it — no completing the square required:
```
x^2 + y^2 + 8x - 6y = 0
```

---

## When NOT to use Desmos

Judgment matters. Desmos costs setup time, and some questions are faster by
hand.

| Situation | Why |
| --- | --- |
| **Simple arithmetic** | Typing takes longer than thinking |
| **One-step algebra** | `3x = 12` does not need a graph |
| **Abstract/symbolic answers** | Choices in terms of `a`, `b`, `c` with no numbers |
| **Pure geometry with a diagram** | Nothing to graph |
| **Interpretation questions** | "What does the slope represent" is reading, not computing |
| **When you already see the method** | Just do it |

**The rule of thumb:** reach for Desmos when the question involves an *equation
with numbers* and you want a *specific value*. Skip it when the question is
conceptual.

---

## A practice protocol

Fluency here is worth real points, and it takes about a week to build.

**Week 1, 20 minutes a day at desmos.com/calculator:**

| Day | Practice |
| --- | --- |
| 1 | Typing: exponents, fractions, radicals, subscripts. Speed only. |
| 2 | Graph 10 equations, click every intercept and vertex |
| 3 | Solve 10 systems by graphing |
| 4 | Sliders: 10 parameter questions |
| 5 | Tables and equivalence checking |
| 6 | Statistics functions and one regression |
| 7 | Mixed: 20 practice questions, forcing Desmos use even where it's slower |

Day 7 matters. Deliberately over-using it teaches you where it *isn't* faster,
which is how you build the judgment for test day.

**Then:** in every subsequent practice session, note which questions you solved
by hand that would have been faster graphed. That list is your real curriculum
here.

---

## The bottom line

On a typical SAT Math module, somewhere between a quarter and a half of the
questions can be solved or checked faster with Desmos. Students who are fluent
with it gain time *and* accuracy — they stop making sign errors on problems they
never algebraically manipulate.

The gain is not free. It requires practicing with the tool before test day.
Doing your prep on paper and then meeting Desmos for the first time in Bluebook
wastes the advantage entirely.

---

**Back to:** [SAT Math overview](00-overview.md)
