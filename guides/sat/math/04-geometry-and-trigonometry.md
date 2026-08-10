# SAT Math — Geometry and Trigonometry

**Catalog domain:** Geometry and Trigonometry
**Skills:** Area and volume · Lines, angles, and triangles · Right triangles and
trigonometry · Circles
**~15% of the section** — 5-7 questions

The smallest domain. Most core formulas are on the provided reference sheet,
which makes this the most "lookup-able" content on the test — but several
heavily tested facts are **not** on the sheet.

---

## Lines and angles

| Fact | |
| --- | --- |
| Straight line | 180° |
| Around a point | 360° |
| Vertical angles | equal |
| Complementary | sum to 90° |
| Supplementary | sum to 180° |

**Parallel lines cut by a transversal** — this generates most angle questions:

- **Corresponding** angles: equal
- **Alternate interior** angles: equal
- **Alternate exterior** angles: equal
- **Same-side (co-interior)** angles: supplementary

**Practical shortcut:** with parallel lines and a transversal, only **two**
distinct angle measures exist, and they're supplementary. Find one; every other
angle is either that value or `180 − that`. This solves most parallel-line
questions in seconds.

---

## Triangles

### Core facts

| Fact | |
| --- | --- |
| Angle sum | 180° |
| Exterior angle | equals the sum of the two remote interior angles |
| Triangle inequality | any two sides sum to more than the third |
| Larger angle | is opposite the longer side |
| Area | `½ · base · height` |

**Triangle inequality range:** for sides `a` and `b`, the third side `c`
satisfies `|a − b| < c < a + b`. This appears as "how many integer values are
possible for the third side?"

### Types

| Type | Properties |
| --- | --- |
| **Equilateral** | All sides equal, all angles 60° |
| **Isosceles** | Two equal sides, two equal base angles |
| **Right** | One 90° angle; Pythagorean theorem applies |
| **Scalene** | No equal sides |

**Isosceles is the most useful.** If a question tells you two sides are equal,
immediately mark the two base angles as equal — and vice versa. That single
inference solves a lot of angle problems.

### Similar triangles

Triangles are similar if their angles match (AA is sufficient). Then:

- Corresponding sides are **proportional**
- **Areas** scale by the **square** of the side ratio
- **Volumes** (for similar solids) scale by the **cube**

That area/volume scaling rule is not on the reference sheet and is tested.

> *Two similar triangles have sides in ratio 2:3. The smaller has area 8. The
> larger?*
>
> Area ratio is `(2:3)² = 4:9`. So `8 × 9/4 = 18`.

**Recognizing similarity:** look for a line parallel to one side of a triangle
(creates a similar smaller triangle), or a shared angle plus a right angle in
both.

### Pythagorean theorem

```
a² + b² = c²      (c is the hypotenuse)
```

**Pythagorean triples** — memorize these to skip computation:

> **3-4-5** · **5-12-13** · **8-15-17** · **7-24-25** · **9-40-41**

And their multiples: 6-8-10, 9-12-15, 10-24-26, 30-40-50.

Recognizing a triple on sight saves real time.

### Special right triangles

These are **on the reference sheet**, but you should know them cold.

**45-45-90** (isosceles right):
```
legs :  x  :  x  : x√2
```
Hypotenuse is `leg × √2`. A square's diagonal is `side × √2`.

**30-60-90:**
```
sides opposite 30 : 60 : 90  =  x : x√3 : 2x
```
The short leg is half the hypotenuse. The long leg is `short × √3`.

An **equilateral triangle** split down the middle produces two 30-60-90
triangles, which gives the equilateral area formula:

```
Area of equilateral triangle = (s²√3) / 4
```

**Not on the reference sheet.** Memorize it.

---

## Circles

### Basics

| Quantity | Formula |
| --- | --- |
| Circumference | `C = 2πr = πd` |
| Area | `A = πr²` |

### Standard equation

```
(x − h)² + (y − k)² = r²
```
Center `(h, k)`, radius `r`.

**Watch the signs.** `(x − 3)² + (y + 2)² = 25` has center `(3, −2)` and radius
`5` — not `(−3, 2)` and not radius 25.

**Completing the square** converts general form to standard form. Given
`x² + y² − 6x + 4y = 12`:

```
(x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4
(x − 3)² + (y + 2)² = 25
```
Center `(3, −2)`, radius `5`.

### Arcs and sectors

For a central angle of `θ` degrees:

| Quantity | Formula |
| --- | --- |
| Arc length | `(θ/360) · 2πr` |
| Sector area | `(θ/360) · πr²` |

Both are just "the fraction of the circle" times the whole.

### Radians

```
π radians = 180°

degrees → radians:  × π/180
radians → degrees:  × 180/π
```

| Degrees | Radians |
| --- | --- |
| 30° | π/6 |
| 45° | π/4 |
| 60° | π/3 |
| 90° | π/2 |
| 180° | π |
| 360° | 2π |

**Arc length in radians:** `s = rθ` — much cleaner than the degree version.

### Angle relationships in circles

- **Central angle** = its intercepted arc.
- **Inscribed angle** = **half** its intercepted arc.
- An angle inscribed in a **semicircle is 90°**.
- A **tangent** is perpendicular to the radius at the point of tangency.

The inscribed-angle-is-half rule and the tangent-perpendicular rule are both
tested and neither is on the reference sheet.

---

## Area and volume

### Two-dimensional

| Shape | Area |
| --- | --- |
| Rectangle | `lw` |
| Triangle | `½bh` |
| Parallelogram | `bh` |
| Trapezoid | `½(b₁ + b₂)h` |
| Circle | `πr²` |
| Equilateral triangle | `(s²√3)/4` |

### Three-dimensional

| Solid | Volume |
| --- | --- |
| Rectangular prism | `lwh` |
| Cylinder | `πr²h` |
| Sphere | `(4/3)πr³` |
| Cone | `(1/3)πr²h` |
| Pyramid | `(1/3)Bh` |

All of these are **on the reference sheet**. Don't memorize them at the expense
of the ones that aren't.

**Surface area is generally NOT on the sheet.** For a rectangular prism:
`2(lw + lh + wh)`. For a cylinder: `2πr² + 2πrh`.

**The general pattern:** prisms and cylinders are `base area × height`; cones and
pyramids are one-third of that.

**3D diagonal of a rectangular prism:** `√(l² + w² + h²)`.

---

## Right-triangle trigonometry

The SAT's trigonometry is light and almost entirely right-triangle based.

### SOH-CAH-TOA

```
sin θ = opposite / hypotenuse
cos θ = adjacent / hypotenuse
tan θ = opposite / adjacent
```

### The complementary identity

```
sin θ = cos(90° − θ)
cos θ = sin(90° − θ)
```

**This is the SAT's favorite trig fact.** Questions of the form "if
`sin x° = 0.6`, what is `cos(90 − x)°`?" appear regularly, and the answer is
just `0.6`.

The reason is visible in a right triangle: the two acute angles are
complementary, and one's opposite side is the other's adjacent side.

### Other identities worth knowing

```
sin²θ + cos²θ = 1
tan θ = sin θ / cos θ
```

### Values to know

| θ | sin | cos | tan |
| --- | --- | --- | --- |
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | √3/3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | undefined |

These come straight from the special right triangles. If you know 30-60-90 and
45-45-90, you can regenerate the whole table.

---

## Patterns and tells

**Draw the figure.** If a geometry question has no diagram, sketch one. If it
has a diagram, label everything you know on it. Unlabeled diagrams are where
geometry points get lost.

**Diagrams are drawn to scale unless the SAT says otherwise.** When a figure is
to scale, you can **estimate** — measure roughly against a known length and
eliminate choices that are the wrong size. When it says "not drawn to scale,"
ignore appearance completely.

**Look for the hidden right triangle.** A large fraction of SAT geometry is a
right triangle inside something else: a diagonal in a rectangle, a radius to a
tangent point, an altitude in an isosceles triangle, a 3D diagonal.

**Check for a Pythagorean triple** before doing arithmetic.

**Parallel lines → only two angle values exist.**

**Isosceles → mark the equal angles immediately.**

**Similar triangles → set up the proportion, and remember areas go as the
square.**

**Radius is the key length in every circle problem.** If you're stuck on a
circle question, find the radius.

---

## Traps

| Trap | Description |
| --- | --- |
| **Radius vs. diameter** | Used `d` where `r` belongs, or vice versa |
| **Circle center signs** | `(x + 3)²` → center x is `−3`, not `3` |
| **`r²` vs. `r`** | Read `r² = 25` as radius 25 |
| **Area vs. perimeter** | Solved for the wrong one |
| **Area vs. circumference** | Same |
| **Similar-figure scaling** | Scaled area linearly instead of by the square |
| **Special-triangle ratio reversed** | Multiplied by `√3` where you should divide |
| **Degrees vs. radians** | Mode error or unconverted |
| **Assumed a right angle** | Not stated, not marked, not derivable |
| **Trusted a not-to-scale figure** | Estimated from a distorted drawing |

---

## Worked examples

### Example 1 — Circle equation

> *A circle in the xy-plane has equation `x² + y² + 8x − 6y = 0`. What is its
> radius?*

Complete the square:
```
(x² + 8x + 16) + (y² − 6y + 9) = 0 + 16 + 9
(x + 4)² + (y − 3)² = 25
```
Radius = **5**. Center is `(−4, 3)`.

### Example 2 — Complementary trig

> *In a right triangle, `sin A = 5/13`. If angle `B` is the other acute angle,
> what is `cos B`?*

`A` and `B` are complementary, so `cos B = sin A = 5/13`.

### Example 3 — Similar triangles

> *A 6-foot person casts a 4-foot shadow. At the same time, a flagpole casts a
> 22-foot shadow. How tall is the flagpole?*

Similar triangles (same sun angle):
```
6/4 = h/22  →  h = 6 · 22 / 4 = 33 feet
```

### Example 4 — Sector

> *A circle has radius 6. A sector has a central angle of 120°. What is the
> sector's area?*

`(120/360) · π(6²) = (1/3)(36π) = 12π`.

### Example 5 — Hidden right triangle

> *A rectangular box measures 3 by 4 by 12. What is the length of the longest
> diagonal?*

`√(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13`.

Note the 3-4-5 triple appearing first (`√(9+16) = 5`), then 5-12-13.

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Angles | Lines, angles, and triangles, Easy | 20. Label every diagram fully. |
| 2. Triangles | Lines, angles, and triangles, Medium | 25. Identify the triple or special triangle first. |
| 3. Circles | Circles, Easy → Medium | 25, including completing the square |
| 4. Area and volume | Area and volume, Easy → Medium | 20 |
| 5. Trigonometry | Right triangles and trigonometry, Medium | 20. Every complementary-identity question. |
| 6. Mixed timed | Whole domain | 25 at 100 sec each |

Because this domain is only 5-7 questions, don't over-invest. If you're weak
across the whole math section, fix
[Algebra](01-algebra.md) and [Advanced Math](02-advanced-math.md) first — they
are five times the point value.

But do learn the **non-reference-sheet** facts, since they're cheap: equilateral
area, similar-figure scaling, inscribed angles, tangent perpendicularity,
surface areas, and the complementary trig identity.

---

**Next:** [Formula reference](05-formula-reference.md)
