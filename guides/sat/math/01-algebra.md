# SAT Math — Algebra

**Catalog domain:** Algebra
**Skills:** Linear equations in one variable · Linear functions · Linear
equations in two variables · Systems of two linear equations · Linear
inequalities
**~35% of the section** — 13-15 questions

The largest domain, and the most reliably learnable. Nearly everything here
reduces to a small number of forms.

---

## What you must know cold

### Linear equation forms

| Form | Equation | When to use |
| --- | --- | --- |
| Slope-intercept | `y = mx + b` | You know slope and y-intercept |
| Point-slope | `y − y₁ = m(x − x₁)` | You know a point and slope |
| Standard | `Ax + By = C` | Intercepts, or systems |

### Slope

```
m = (y₂ − y₁) / (x₂ − x₁) = rise / run = Δy / Δx
```

| Relationship | Slopes |
| --- | --- |
| Parallel | Equal: `m₁ = m₂` |
| Perpendicular | Negative reciprocals: `m₁ · m₂ = −1` |
| Horizontal | `m = 0`, equation `y = c` |
| Vertical | undefined, equation `x = c` |

### Intercepts

- **x-intercept:** set `y = 0`, solve for `x`
- **y-intercept:** set `x = 0`, solve for `y`

In `Ax + By = C`: x-intercept is `C/A`, y-intercept is `C/B`.

### Systems — three solution cases

For `a₁x + b₁y = c₁` and `a₂x + b₂y = c₂`:

| Case | Condition | Graph |
| --- | --- | --- |
| **One solution** | `a₁/a₂ ≠ b₁/b₂` (different slopes) | Lines cross |
| **No solution** | `a₁/a₂ = b₁/b₂ ≠ c₁/c₂` (same slope, different intercept) | Parallel |
| **Infinitely many** | `a₁/a₂ = b₁/b₂ = c₁/c₂` (identical lines) | Same line |

**This is tested constantly**, usually as "for what value of `k` does the system
have no solution?" The answer comes from setting the slope ratios equal.

> *`3x + ky = 12` and `6x + 10y = 7` have no solution. Find k.*
>
> Slopes equal: `3/6 = k/10` → `k = 5`.
> Check that constants differ: `12/7 ≠ 3/6` ✓. So `k = 5`.

---

## Method by question type

### Solving linear equations

1. Distribute
2. Combine like terms on each side
3. Move variables to one side, constants to the other
4. Divide

**Fractions:** multiply every term by the LCD first. It's almost always faster
than working with fractions.

**No solution:** variables cancel and you get a false statement (`3 = 5`).
**Infinitely many:** variables cancel and you get a true statement (`3 = 3`).

### Systems

**Substitution** — best when one variable is already isolated or has coefficient
1.

**Elimination** — best when coefficients align or can be made to align. Multiply
one or both equations, then add or subtract.

**Graphing (Desmos)** — often fastest. Type both equations; the intersection
point is labeled. See the [Desmos playbook](06-desmos-playbook.md).

**Watch for the shortcut.** Some systems ask for `x + y` or `x − y` rather than
`x` and `y` individually. Adding or subtracting the two equations frequently
produces that directly, with no solving.

> *`3x + 2y = 14` and `x + 4y = 18`. What is `x + y`?*
>
> Add: `4x + 6y = 32` → divide by 2: `2x + 3y = 16`. Hmm, not directly it.
> Subtract: `2x − 2y = −4` → `x − y = −2`.
> Solve normally instead: from the second, `x = 18 − 4y`. Substitute:
> `3(18 − 4y) + 2y = 14` → `54 − 12y + 2y = 14` → `−10y = −40` → `y = 4`,
> `x = 2`. So `x + y = 6`.

Always *check* for the shortcut, but don't force it.

### Linear inequalities

Solve exactly like equations, with one rule:

> **Multiplying or dividing by a negative flips the inequality sign.**

This is the most-missed mechanical rule in the domain. Circle any negative
coefficient before dividing.

**Compound inequalities:** `−3 < 2x + 1 ≤ 7` — perform the same operation on all
three parts.

**Systems of inequalities:** the solution is the overlapping shaded region. In
Desmos, type both with inequality signs and the overlap is visible.

**Testing a point:** to check whether `(a, b)` satisfies a system, substitute
into each inequality. All must hold.

### Word problems and modeling

The interpretation questions are where students lose points, not the algebra.

**Translation table:**

| English | Math |
| --- | --- |
| is, was, will be | `=` |
| of | `×` |
| per, for each | rate (division) |
| more than, increased by | `+` |
| less than, decreased by | `−` (watch order) |
| twice, doubled | `× 2` |
| a number | variable |

**"Less than" reverses order.** "5 less than x" is `x − 5`, not `5 − x`. This
trips people constantly.

**Interpreting coefficients** — a very common SAT question type:

> *The cost `C` of a rental is `C = 45 + 0.30m`, where `m` is miles driven.
> What does `45` represent?*

- The **slope** (`0.30`) is a **rate**: cost per mile.
- The **y-intercept** (`45`) is the **starting/fixed value**: the base fee
  before driving any miles.

Generalize: in `y = mx + b` modeling a real situation, `m` is "per unit of x"
and `b` is "when x = 0."

**Units are the trap.** If `m` is in miles and a question asks about kilometers,
or `t` is in years and the question asks about months, the conversion is the
point of the question.

---

## Patterns and tells

**Two equations, one asked-for combination.** If the question asks for `x + y`,
`2x − y`, or similar, look for a direct combination before solving.

**"For what value of k" questions** are almost always about the three-cases
table. Set slope ratios equal.

**Systems questions with no numbers in the choices** — plug in. Pick values
satisfying both equations and test.

**Graph-description questions** — check the sign of the slope and the sign of
the intercept first. That usually eliminates two choices instantly.

**Inequality direction in modeling questions** — read the constraint language
carefully:

| Phrase | Symbol |
| --- | --- |
| at least, minimum, no less than | `≥` |
| at most, maximum, no more than | `≤` |
| more than, exceeds | `>` |
| less than, under | `<` |

"At least" and "at most" being confused is a top-five error in this domain.

---

## Traps

| Trap | Description |
| --- | --- |
| **Solving for the wrong variable** | Finds `x`, question wants `y` or `x + y` |
| **Forgetting to flip the inequality** | Divided by a negative |
| **"Less than" order** | Wrote `5 − x` for "5 less than x" |
| **Sign error in distribution** | `−2(x − 3) = −2x + 6`, not `−2x − 6` |
| **Unit mismatch** | Model in hours, question in minutes |
| **Slope reversed** | Computed `Δx/Δy` |
| **Perpendicular slope** | Used reciprocal without negating |
| **Interpreting the wrong parameter** | Explained the slope when asked about the intercept |

---

## Worked examples

### Example 1 — Interpretation

> *A biologist models a bacterial population as `P = 500 − 12d`, where `d` is
> days since treatment. Which statement is the best interpretation of `12`?*

The coefficient of `d` is the rate of change. It's negative in context (the term
is subtracted), so the population **decreases by 12 per day**.

A choice saying "the population decreases by 12 bacteria each day" is credited.
Choices about the initial population (500) or about total decrease are the
distractors.

### Example 2 — System with a parameter

> *The system `2x − 3y = 8` and `−4x + 6y = c` has infinitely many solutions.
> What is `c`?*

Infinitely many means the equations are multiples. Multiply the first by `−2`:
`−4x + 6y = −16`. So `c = −16`.

Trap: choosing `16` (sign error) or `8` (copying the original constant).

### Example 3 — Inequality modeling

> *A student has $40 to spend on notebooks costing $3.50 each and one binder
> costing $12. What is the greatest number of notebooks she can buy?*

`3.50n + 12 ≤ 40` → `3.50n ≤ 28` → `n ≤ 8`.

Answer: **8**.

Trap: `n ≤ 8` with a non-integer boundary would require rounding *down*, not to
the nearest integer. If the arithmetic had produced `n ≤ 8.6`, the answer is
still 8. "Greatest number" with a `≤` always rounds down.

### Example 4 — Perpendicular line

> *Line `ℓ` passes through `(2, −1)` and is perpendicular to the line
> `3x + 4y = 12`. What is the slope of `ℓ`?*

Rewrite: `4y = −3x + 12` → `y = −(3/4)x + 3`. Slope is `−3/4`.

Perpendicular slope is the negative reciprocal: `4/3`.

Trap: `3/4` (forgot to negate) or `−4/3` (negated twice).

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Mechanics | Linear equations in one variable, Easy | 20 untimed, writing every step |
| 2. Slopes and forms | Linear functions + Linear equations in two variables, Easy → Medium | 30 |
| 3. Systems | Systems of two linear equations, Medium | 25, including all three-cases problems |
| 4. Inequalities | Linear inequalities, Medium | 20, circling every negative divisor |
| 5. Modeling and interpretation | All skills, Medium → Hard | 30, writing what each coefficient means |
| 6. Mixed timed | Whole domain, all difficulties | 40 at 90 sec each |

Stage 5 deserves emphasis. Interpretation questions are a large share of SAT
Algebra and they're pure reading comprehension applied to an equation. Students
who can solve anything still lose these.

---

**Next:** [Advanced Math](02-advanced-math.md)
