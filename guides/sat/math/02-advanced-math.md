# SAT Math — Advanced Math

**Catalog domain:** Advanced Math
**Skills:** Equivalent expressions · Nonlinear equations · Systems of equations ·
Nonlinear functions
**~35% of the section** — 13-15 questions

Tied with Algebra as the largest domain, and the source of most of the hardest
questions on the section. Quadratics dominate.

---

## What you must know cold

### Factoring patterns

| Pattern | Factored |
| --- | --- |
| Difference of squares | `a² − b² = (a + b)(a − b)` |
| Perfect square | `a² + 2ab + b² = (a + b)²` |
| Perfect square | `a² − 2ab + b² = (a − b)²` |
| Difference of cubes | `a³ − b³ = (a − b)(a² + ab + b²)` |
| Sum of cubes | `a³ + b³ = (a + b)(a² − ab + b²)` |
| Common factor | `ax + ay = a(x + y)` |

Difference of squares is by far the most tested. Recognize it in disguised
forms: `4x² − 9 = (2x + 3)(2x − 3)`, `x⁴ − 16 = (x² + 4)(x² − 4) = (x² + 4)(x + 2)(x − 2)`.

### Quadratic forms

| Form | Equation | Reveals |
| --- | --- | --- |
| Standard | `y = ax² + bx + c` | y-intercept `c` |
| Factored | `y = a(x − r₁)(x − r₂)` | x-intercepts (roots) `r₁, r₂` |
| Vertex | `y = a(x − h)² + k` | vertex `(h, k)` |

**A very common SAT question:** "which form displays the [vertex / zeros /
y-intercept] as constants?" The answer is whichever form above matches. This is
free if you know the table.

### Quadratic formula

```
x = [ −b ± √(b² − 4ac) ] / (2a)
```

**Discriminant** `D = b² − 4ac`:

| D | Real solutions |
| --- | --- |
| `D > 0` | Two distinct real |
| `D = 0` | Exactly one real (repeated) |
| `D < 0` | None (two complex) |

**"For what value of k does this have exactly one solution?"** → set `D = 0`.
This is one of the most reliably recurring question forms on the section.

### Vertex

For `y = ax² + bx + c`, the axis of symmetry and vertex x-coordinate:

```
x = −b / (2a)
```

Then substitute to get the y-coordinate. The vertex is the **minimum** if
`a > 0`, the **maximum** if `a < 0`.

**Alternative:** the vertex x-coordinate is the **midpoint of the two roots**.
If you know the zeros are 2 and 8, the vertex is at `x = 5`. Often faster.

### Sum and product of roots

For `ax² + bx + c = 0`:

```
sum of roots     = −b/a
product of roots =  c/a
```

Useful shortcut when a question asks for the sum or product without needing the
individual roots.

### Exponent rules

| Rule | |
| --- | --- |
| `xᵃ · xᵇ = xᵃ⁺ᵇ` | `xᵃ / xᵇ = xᵃ⁻ᵇ` |
| `(xᵃ)ᵇ = xᵃᵇ` | `(xy)ᵃ = xᵃyᵃ` |
| `x⁰ = 1` (x ≠ 0) | `x⁻ᵃ = 1/xᵃ` |
| `x^(1/n) = ⁿ√x` | `x^(m/n) = ⁿ√(xᵐ) = (ⁿ√x)ᵐ` |

**Fractional exponents are heavily tested on the SAT.** Be fluent converting
between radical and exponent notation in both directions.

### Radicals

- `√(ab) = √a · √b`
- `√(a/b) = √a / √b`
- **Rationalize** by multiplying by the conjugate: `1/(2 + √3) · (2 − √3)/(2 − √3) = (2 − √3)/1 = 2 − √3`
- **Always check for extraneous solutions** when you square both sides of an
  equation. Squaring can create solutions that don't satisfy the original.

### Exponential functions

```
y = a · bˣ
```

- `a` = initial value (value at `x = 0`)
- `b` = growth factor per unit of `x`
- `b > 1` → growth; `0 < b < 1` → decay

**Percent form:** `y = a(1 + r)ᵗ` for growth at rate `r`, `y = a(1 − r)ᵗ` for
decay.

| Description | b |
| --- | --- |
| Increases 8% per year | `1.08` |
| Decreases 8% per year | `0.92` |
| Doubles each period | `2` |
| Halves each period | `0.5` |
| Triples every 5 years | `3^(t/5)` |

**Compound intervals:** if something grows `r` per year but is compounded `n`
times per year over `t` years: `A = P(1 + r/n)^(nt)`.

**Linear vs. exponential** — a distinction the SAT tests directly:

| | Linear | Exponential |
| --- | --- | --- |
| Changes by | a constant **amount** | a constant **percent/factor** |
| Language | "increases by 5 each year" | "increases by 5% each year" |
| Table test | constant differences | constant ratios |

Given a table, compute differences and ratios. Whichever is constant tells you
the model.

### Function notation

- `f(3)` means substitute 3 for `x`.
- `f(g(x))` means substitute `g(x)` into `f` — **inner function first**.
- `f(x) = 0` asks for the **zeros / x-intercepts / roots** (all the same thing).
- `f(x) = g(x)` asks where the graphs **intersect**.

**Vocabulary equivalence** — the SAT rotates through these terms for the same
concept:

> zero = root = solution = x-intercept = where the graph crosses the x-axis =
> where `f(x) = 0`

If `(x − 4)` is a **factor** of `f(x)`, then `f(4) = 0`, and `(4, 0)` is on the
graph. All three statements are the same statement. Questions frequently test
whether you know that.

### Transformations

For `f(x)`:

| Transformation | Effect |
| --- | --- |
| `f(x) + k` | Shift **up** k |
| `f(x) − k` | Shift **down** k |
| `f(x + h)` | Shift **left** h |
| `f(x − h)` | Shift **right** h |
| `−f(x)` | Reflect over **x-axis** |
| `f(−x)` | Reflect over **y-axis** |
| `a·f(x)`, a > 1 | Vertical stretch |
| `f(ax)`, a > 1 | Horizontal compression |

**The horizontal ones are counterintuitive and that's the trap.** `f(x + 3)`
shifts **left**, not right. Inside the parentheses, everything is backwards.

### Polynomials

- **Degree** = highest exponent. A degree-*n* polynomial has at most *n* real
  roots and at most *n − 1* turning points.
- **End behavior:** even degree → both ends same direction; odd degree → opposite
  directions. Positive leading coefficient → right end up.
- **Remainder theorem:** the remainder of `f(x) ÷ (x − a)` is `f(a)`.
- **Factor theorem:** `(x − a)` is a factor ⟺ `f(a) = 0`.
- **Multiplicity:** a root with even multiplicity *touches* the x-axis and turns
  around; odd multiplicity *crosses*.

### Rational expressions

- Simplify by factoring numerator and denominator and cancelling.
- **Excluded values:** any `x` making a denominator zero is excluded from the
  domain — even after cancelling.
- To solve, multiply through by the LCD, then **check for extraneous
  solutions**.

---

## Method by question type

### "Equivalent expressions"

Two approaches. Pick by which is faster:

**Approach A — manipulate.** Factor, expand, or combine.

**Approach B — plug in a number.** Pick `x = 2` (or another safe value),
evaluate the original, then evaluate each choice. Keep the match.

Approach B is usually faster and always less error-prone. Use it whenever the
algebra looks tedious. Avoid `x = 0` and `x = 1`, and avoid any value that makes
a denominator zero.

### Solving quadratics — choose your method

| Situation | Best method |
| --- | --- |
| Factors easily | Factor and set each to zero |
| Of the form `x² = k` | Square root both sides (**remember ±**) |
| Doesn't factor | Quadratic formula, or Desmos |
| Asked for the vertex | `x = −b/2a`, or complete the square |
| Asked for number of solutions | Discriminant only — don't solve |
| Anything graphable | Desmos |

**Forgetting `±`** when taking a square root is a top error. `x² = 16` has two
solutions.

### "For what value of k..."

Nearly always the discriminant.

> *`x² + kx + 25 = 0` has exactly one solution. What are the possible values of
> k?*
>
> `D = 0`: `k² − 4(1)(25) = 0` → `k² = 100` → `k = ±10`.

Trap: reporting only `10` and missing `−10`.

### Nonlinear systems

Usually a line and a parabola, or two curves.

**Method:** substitute one into the other, get a quadratic, solve. Or graph in
Desmos and read intersections.

**Number of intersections** questions use the discriminant of the resulting
quadratic, exactly as above.

---

## Patterns and tells

**"Which form displays X as a constant?"** — match to the three quadratic forms
table. Free question.

**Exactly one solution / no solution / two solutions** — always the
discriminant. Don't solve.

**A question that seems to need ugly algebra** — try plugging in a number, or
graph it.

**If the answer choices are expressions**, plugging in beats manipulating almost
every time.

**Zeros questions** — check whether the question wants the zeros, their sum,
their product, or the number of them. All four appear and they're different
answers.

**Growth/decay word problems** — identify `a` (initial) and `b` (factor) and
you're usually done. Read whether the rate is per year, per month, or per some
other interval, and whether the exponent needs adjusting.

---

## Traps

| Trap | Description |
| --- | --- |
| **Missing `±`** | `x² = 9` → only wrote `3` |
| **Extraneous solutions** | Squared both sides, didn't check |
| **Horizontal shift direction** | `f(x + 2)` shifted right instead of left |
| **Composition order** | Computed `g(f(x))` instead of `f(g(x))` |
| **Percent as factor** | Used `1.5` for a 5% increase instead of `1.05` |
| **Decay factor** | Used `1 − 0.08 = 0.92` correctly, or wrongly used `0.08` |
| **Only one k value** | `k² = 100` → reported `10`, missed `−10` |
| **Excluded values** | Cancelled a factor and forgot the domain restriction |
| **Exponent on the wrong base** | `(2x)³ = 8x³`, not `2x³` |
| **Vertex sign** | `y = (x − 3)² + 2` has vertex `(3, 2)`, not `(−3, 2)` |

---

## Worked examples

### Example 1 — Discriminant

> *For what value of `c` does `2x² − 8x + c = 0` have exactly one real solution?*

`D = b² − 4ac = (−8)² − 4(2)(c) = 64 − 8c`. Set to zero: `64 = 8c` → `c = 8`.

### Example 2 — Equivalent expression by plugging in

> *Which is equivalent to `(x² − 9)/(x² + 5x + 6)`?*

Factor: `(x + 3)(x − 3) / [(x + 3)(x + 2)] = (x − 3)/(x + 2)`, with `x ≠ −3`.

Or plug in `x = 4`: original = `(16 − 9)/(16 + 20 + 6) = 7/42 = 1/6`. Test
choices at `x = 4`: `(4 − 3)/(4 + 2) = 1/6` ✓.

### Example 3 — Exponential model

> *A culture of 200 bacteria triples every 4 hours. Which expression gives the
> population after `t` hours?*

Initial `a = 200`. Factor 3 per 4 hours, so the exponent is `t/4`:

```
P = 200 · 3^(t/4)
```

Trap choices: `200 · 3^(4t)` (exponent inverted), `200 · 3ᵗ` (ignored the
interval), `200 · 4^(t/3)` (swapped the numbers).

### Example 4 — Function composition

> *If `f(x) = 2x + 1` and `g(x) = x² − 3`, what is `f(g(2))`?*

Inner first: `g(2) = 4 − 3 = 1`. Then `f(1) = 2(1) + 1 = 3`.

Trap: computing `g(f(2)) = g(5) = 25 − 3 = 22`.

### Example 5 — Vertex from roots

> *The graph of `y = x² + bx + c` has x-intercepts at `−2` and `6`. What is the
> x-coordinate of the vertex?*

Midpoint of the roots: `(−2 + 6)/2 = 2`.

No need to find `b` or `c` at all.

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Factoring fluency | Equivalent expressions, Easy | 25. Recognize difference of squares on sight. |
| 2. Quadratic forms | Nonlinear functions, Easy → Medium | 25. For each, name what the form reveals. |
| 3. Solving quadratics | Nonlinear equations, Medium | 30. Track whether you missed a `±`. |
| 4. Discriminant | Nonlinear equations, Medium → Hard | 15. Every "how many solutions" question. |
| 5. Exponentials | Nonlinear functions, Medium | 25. Write `a` and `b` explicitly each time. |
| 6. Function notation and transformations | Nonlinear functions, Medium → Hard | 25 |
| 7. Mixed timed | Whole domain | 40 at 100 sec each |

Stages 1 and 4 have the best return per minute. Factoring fluency speeds up
everything downstream, and discriminant questions are formulaic points that
students skip because they look hard.

---

**Next:** [Problem-Solving and Data Analysis](03-problem-solving-and-data-analysis.md)
