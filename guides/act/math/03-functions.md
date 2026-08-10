# ACT Mathematics — Functions

**Catalog domain:** Functions
**Skills:** Function concepts · Function models
**~18% of the section** — about 8 questions

The ACT reaches further into function territory than the SAT does: logarithms,
trigonometric graphs, and inverse functions all appear here.

---

## Function basics

### Notation

- `f(3)` — substitute 3 for `x`
- `f(a + 2)` — substitute the whole expression
- `f(x) = 0` — find the **zeros / roots / x-intercepts**
- `f(x) = g(x)` — find where the graphs **intersect**

**Vocabulary equivalence** — all the same thing:

> zero = root = solution = x-intercept = where the graph crosses the x-axis =
> where `f(x) = 0`

### Domain and range

**Domain** — allowable inputs. Restricted by:
- Division by zero → denominator ≠ 0
- Even roots of negatives → radicand ≥ 0
- Logarithms → argument > 0

**Range** — possible outputs. Often found from the graph, or by reasoning about
the function's shape (a parabola opening up has range `y ≥ k` where `k` is the
vertex y-value).

### Composition

`f(g(x))` — **inner function first**.

> `f(x) = 2x + 1`, `g(x) = x²`
> `f(g(3)) = f(9) = 19`
> `g(f(3)) = g(7) = 49`

Order matters, and reversing it is the standard trap.

### Inverse functions

`f⁻¹(x)` undoes `f(x)`.

**To find:** swap `x` and `y`, then solve for `y`.

> `y = 3x − 6` → `x = 3y − 6` → `y = (x + 6)/3`

**Properties:**
- `f(f⁻¹(x)) = x`
- The graph of `f⁻¹` is the reflection of `f` over the line `y = x`
- If `(a, b)` is on `f`, then `(b, a)` is on `f⁻¹`
- A function has an inverse only if it's one-to-one (passes the horizontal line
  test)

**Note:** `f⁻¹(x)` is **not** `1/f(x)`. The ACT offers that as a distractor.

---

## Transformations

For `f(x)`:

| Transformation | Effect |
| --- | --- |
| `f(x) + k` | Up `k` |
| `f(x) − k` | Down `k` |
| `f(x + h)` | **Left** `h` |
| `f(x − h)` | **Right** `h` |
| `−f(x)` | Reflect over the x-axis |
| `f(−x)` | Reflect over the y-axis |
| `a·f(x)`, `a > 1` | Vertical stretch |
| `a·f(x)`, `0 < a < 1` | Vertical compression |
| `f(ax)`, `a > 1` | Horizontal compression |

**Horizontal transformations are backwards.** `f(x + 3)` shifts **left**. Inside
the parentheses, everything is inverted. This is the trap on nearly every
transformation question.

---

## Quadratic functions

**Three forms:**

| Form | Reveals |
| --- | --- |
| `y = ax² + bx + c` | y-intercept `c` |
| `y = a(x − r₁)(x − r₂)` | Roots |
| `y = a(x − h)² + k` | Vertex `(h, k)` |

**Vertex:** `x = −b/(2a)`, then substitute. Or take the **midpoint of the
roots**, which is often faster.

**Direction:** `a > 0` opens up (minimum at the vertex); `a < 0` opens down
(maximum).

**Axis of symmetry:** the vertical line through the vertex, `x = −b/(2a)`.

**Maximum/minimum word problems** are vertex problems. "What value of `x`
maximizes profit?" → find the vertex.

---

## Exponential functions

```
y = a · bˣ
```

- `a` = initial value (at `x = 0`)
- `b` = growth factor
- `b > 1` growth; `0 < b < 1` decay

**Percent form:** `y = a(1 ± r)ᵗ`

| Description | `b` |
| --- | --- |
| +8% per period | 1.08 |
| −8% per period | 0.92 |
| Doubles | 2 |
| Halves | 0.5 |
| Triples every 5 years | `3^(t/5)` |

**Compound interest:** `A = P(1 + r/n)^(nt)`

**Linear vs. exponential:**

| | Linear | Exponential |
| --- | --- | --- |
| Changes by | constant **amount** | constant **factor** |
| Table shows | constant differences | constant ratios |
| Language | "increases by 5 each year" | "increases by 5% each year" |

**Asymptote:** `y = a·bˣ` approaches `y = 0` but never reaches it. Shifting the
function shifts the asymptote: `y = a·bˣ + c` has asymptote `y = c`.

---

## Logarithms

The ACT tests logs; the SAT largely doesn't.

### Definition

```
log_b(x) = y   ⟺   bʸ = x
```

A logarithm answers: *"to what power must I raise the base to get this number?"*

> `log₂(8) = 3` because `2³ = 8`
> `log₁₀(1000) = 3`
> `log₅(1) = 0` — any log of 1 is 0

### Rules

```
log(mn)   = log m + log n
log(m/n)  = log m − log n
log(mᵖ)   = p · log m
log_b(b)  = 1
log_b(1)  = 0
```

**Change of base:** `log_b(x) = log(x)/log(b)` — needed to compute non-standard
bases on a calculator.

**Conventions:** `log x` with no base means base 10. `ln x` means base `e`.

**Solving:** convert to exponential form.

> `log₃(x − 1) = 2` → `3² = x − 1` → `x = 10`

**Domain restriction:** the argument of a log must be **positive**. Solutions
that make it non-positive are extraneous.

---

## Trigonometric functions and graphs

### The unit circle basics

```
sin θ = opp/hyp     cos θ = adj/hyp     tan θ = opp/adj
```

Reciprocals — the ACT does test these:
```
csc θ = 1/sin θ     sec θ = 1/cos θ     cot θ = 1/tan θ
```

### Graph properties

For `y = A·sin(Bx + C) + D`:

| Parameter | Meaning |
| --- | --- |
| `|A|` | **Amplitude** — half the distance from max to min |
| `B` | Affects period: **period = 2π/\|B\|** |
| `C` | Phase shift |
| `D` | Vertical shift — the midline is `y = D` |

For tangent, the period is `π/|B|`, not `2π/|B|`.

**Common question:** "What is the amplitude and period of `y = 3sin(2x)`?"
Amplitude `3`, period `2π/2 = π`.

### Values to know

| θ | 0 | π/6 (30°) | π/4 (45°) | π/3 (60°) | π/2 (90°) |
| --- | --- | --- | --- | --- | --- |
| sin | 0 | 1/2 | √2/2 | √3/2 | 1 |
| cos | 1 | √3/2 | √2/2 | 1/2 | 0 |
| tan | 0 | √3/3 | 1 | √3 | — |

### Identities

```
sin²θ + cos²θ = 1
tan θ = sin θ / cos θ
sin θ = cos(90° − θ)
```

**Radians:** `π rad = 180°`. Convert with `× π/180` or `× 180/π`.

---

## Reading graphs and tables

Many ACT function questions give you a graph or table instead of an equation.

| Question | How to answer |
| --- | --- |
| "What is `f(3)`?" | Find `x = 3`, read the `y` value |
| "For what `x` is `f(x) = 5`?" | Find `y = 5`, read the `x` value(s) — there may be several |
| "Where is `f` increasing?" | Where the graph goes up left-to-right |
| "How many solutions does `f(x) = 2` have?" | Count intersections with the horizontal line `y = 2` |
| "Where do `f` and `g` intersect?" | Where the two curves cross |
| "What is the maximum value?" | The highest `y`, not the `x` where it occurs |

**That last distinction is a recurring trap.** "The maximum value of the
function" is a `y`-value. "The value of `x` at which the maximum occurs" is an
`x`-value. Read which is asked.

---

## Patterns and tells

**Backsolve on function questions with numeric choices.** Substituting is faster
than solving.

**For "which graph represents..." questions**, check three things: the
y-intercept, the direction, and one easy point. That usually eliminates
everything but one.

**Transformation questions:** determine the horizontal shift direction
explicitly. Say out loud "plus three inside means left three."

**Amplitude/period questions** are formulaic. `|A|` and `2π/|B|`.

**Composition questions:** write the inner value down before computing the
outer. Don't do it in one step.

---

## Traps

| Trap | Description |
| --- | --- |
| **Horizontal shift direction** | `f(x+2)` shifted right |
| **Composition order** | Computed `g(f(x))` |
| **`f⁻¹(x)` as `1/f(x)`** | |
| **Max value vs. location** | Reported `x` instead of `y` |
| **Period formula** | Used `B` instead of `2π/B` |
| **Log domain** | Kept a solution making the argument negative |
| **Log rules** | `log(m + n) ≠ log m + log n` |
| **Exponential rate** | Used `0.05` instead of `1.05` |

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Notation and composition | Function concepts, Easy → Medium | 25. Write the inner value separately. |
| 2. Domain and range | Function concepts, Medium | 15 |
| 3. Transformations | Function concepts, Medium | 20. Say the direction aloud. |
| 4. Quadratic functions | Function models, Medium | 25 |
| 5. Exponentials | Function models, Medium | 20. Write `a` and `b` explicitly. |
| 6. Logarithms | Function concepts, Medium → Hard | 20 |
| 7. Trig graphs | Function models, Medium → Hard | 15. Amplitude and period drills. |
| 8. Mixed timed | Whole domain | 30 at 65 sec each |

Logs and trig graphs are worth specific attention — they're each one or two
questions, they're formulaic, and students who skipped them lose those points
every time.

---

**Next:** [Geometry](04-geometry.md)
