# ACT Mathematics — Geometry

**Catalog domain:** Geometry
**Skills:** Plane geometry · Measurement · Trigonometry
**~18% of the section** — about 8 questions

The ACT tests substantially more geometry than the SAT, and **provides no
formula sheet**. Everything here must be memorized.

---

## Lines and angles

| Fact | |
| --- | --- |
| Straight line | 180° |
| Around a point | 360° |
| Vertical angles | equal |
| Complementary | sum to 90° |
| Supplementary | sum to 180° |

**Parallel lines cut by a transversal:**

- Corresponding angles: equal
- Alternate interior: equal
- Alternate exterior: equal
- Same-side interior: supplementary

**Shortcut:** with parallel lines and a transversal, only **two** angle measures
exist and they're supplementary. Find one; every other angle is that value or
`180 − that`.

---

## Triangles

| Fact | |
| --- | --- |
| Angle sum | 180° |
| Exterior angle | = sum of the two remote interior angles |
| Triangle inequality | `\|a − b\| < c < a + b` |
| Larger angle | opposite the longer side |
| Area | `½bh` |

### Types

**Equilateral:** all sides equal, all angles 60°.
```
Area = (s²√3)/4
Height = (s√3)/2
```

**Isosceles:** two equal sides, two equal base angles. Whenever a problem states
one, immediately mark the other.

**Right:** `a² + b² = c²`.

### Pythagorean triples

> **3-4-5** · **5-12-13** · **8-15-17** · **7-24-25** · **9-40-41**

Plus multiples: 6-8-10, 9-12-15, 10-24-26, 30-40-50.

Recognizing these on sight saves real time on a speed-limited section.

### Special right triangles

**45-45-90:** `x : x : x√2`
**30-60-90:** `x : x√3 : 2x` (short leg : long leg : hypotenuse)

In a 30-60-90, the short leg is **half the hypotenuse** — often the fastest route
into a problem.

### Similar and congruent

**Similar** (AA, SSS~, SAS~): angles equal, sides proportional.

| Ratio | Scales by |
| --- | --- |
| Sides | `k` |
| **Areas** | `k²` |
| **Volumes** | `k³` |

**Congruent** (SSS, SAS, ASA, AAS, HL): identical.

**Note:** SSA is **not** a valid congruence criterion. The ACT occasionally tests
this.

### Special segments

- **Median:** vertex to the midpoint of the opposite side
- **Altitude:** vertex perpendicular to the opposite side
- **Angle bisector:** splits an angle in half
- **Midsegment:** connects two midpoints; parallel to the third side and **half
  its length**

---

## Polygons

```
Sum of interior angles       = (n − 2) · 180°
Each interior angle (regular) = (n − 2) · 180° / n
Sum of exterior angles        = 360°  (any polygon)
Each exterior angle (regular)  = 360° / n
Number of diagonals            = n(n − 3)/2
```

### Quadrilaterals

| Shape | Properties | Area |
| --- | --- | --- |
| **Square** | 4 equal sides, 4 right angles | `s²` |
| **Rectangle** | Opposite sides equal, 4 right angles | `lw` |
| **Parallelogram** | Opposite sides parallel and equal; opposite angles equal | `bh` |
| **Rhombus** | 4 equal sides; diagonals perpendicular | `bh` or `½d₁d₂` |
| **Trapezoid** | One pair of parallel sides | `½(b₁ + b₂)h` |

**Diagonals:** a square's diagonal is `s√2`. A rectangle's is `√(l² + w²)`.

---

## Circles

```
Circumference:  C = 2πr = πd
Area:           A = πr²
Equation:       (x − h)² + (y − k)² = r²
```

**Arcs and sectors** (central angle `θ` in degrees):
```
Arc length  = (θ/360) · 2πr
Sector area = (θ/360) · πr²
```

In radians: `s = rθ` and `A = ½r²θ`.

**Angle relationships:**

- **Central angle** = its intercepted arc
- **Inscribed angle** = **half** its intercepted arc
- Angle inscribed in a **semicircle** = 90°
- **Tangent** ⊥ radius at the point of tangency
- Two tangents from an external point are equal in length

**Radius is the key length in every circle problem.** If you're stuck, find it.

---

## Solid geometry

| Solid | Volume | Surface area |
| --- | --- | --- |
| Cube | `s³` | `6s²` |
| Rectangular prism | `lwh` | `2(lw + lh + wh)` |
| Cylinder | `πr²h` | `2πr² + 2πrh` |
| Sphere | `(4/3)πr³` | `4πr²` |
| Cone | `(1/3)πr²h` | `πr² + πrl` (`l` = slant height) |
| Pyramid | `(1/3)Bh` | varies |

**Pattern:** prisms and cylinders are `base × height`; cones and pyramids are
one-third of that.

**3D diagonal of a rectangular prism:** `√(l² + w² + h²)`.

**Cone slant height:** `l = √(r² + h²)` — a Pythagorean relationship.

---

## Coordinate geometry

```
Distance:  d = √[(x₂−x₁)² + (y₂−y₁)²]
Midpoint:  ((x₁+x₂)/2, (y₁+y₂)/2)
Slope:     m = (y₂−y₁)/(x₂−x₁)
```

**Circle:** `(x − h)² + (y − k)² = r²`

**Parabola:** `y = a(x − h)² + k`, vertex `(h, k)`

**Ellipse:** `(x−h)²/a² + (y−k)²/b² = 1`

**Hyperbola:** `(x−h)²/a² − (y−k)²/b² = 1`

The ACT tests conic **recognition** — identifying which equation is which shape
— more than conic manipulation.

**Transformations of figures:**

| Transformation | Effect on `(x, y)` |
| --- | --- |
| Reflect over x-axis | `(x, −y)` |
| Reflect over y-axis | `(−x, y)` |
| Reflect over `y = x` | `(y, x)` |
| Rotate 90° counterclockwise about origin | `(−y, x)` |
| Rotate 180° about origin | `(−x, −y)` |
| Translate by `(a, b)` | `(x + a, y + b)` |

---

## Trigonometry

The ACT goes further than the SAT here.

### Right triangles

```
sin θ = opp/hyp     cos θ = adj/hyp     tan θ = opp/adj
csc θ = hyp/opp     sec θ = hyp/adj     cot θ = adj/opp
```

### Identities

```
sin²θ + cos²θ = 1
tan θ = sin θ / cos θ
sin θ = cos(90° − θ)
```

### Law of Sines

```
a/sin A = b/sin B = c/sin C
```

Use when you have: two angles and any side (AAS/ASA), or two sides and a
non-included angle (SSA).

### Law of Cosines

```
c² = a² + b² − 2ab·cos C
```

Use when you have: three sides (SSS), or two sides and the included angle (SAS).

Note that when `C = 90°`, `cos C = 0` and this reduces to the Pythagorean
theorem.

### Area of a triangle with two sides and the included angle

```
Area = ½ab·sin C
```

**These three formulas are not on any reference sheet and each appears
occasionally on the ACT.** They're cheap points if memorized.

### Angles of elevation and depression

Both are measured **from the horizontal**. An angle of elevation from A to B
equals the angle of depression from B to A. Draw the right triangle and apply
SOH-CAH-TOA.

---

## Strategy

**Draw it.** No diagram? Sketch one. Diagram provided? Label everything you know
directly on it.

**ACT figures are drawn to scale unless labeled otherwise.** When to scale, you
can **estimate** — compare against a known length and eliminate choices of the
wrong magnitude. When it says "not drawn to scale," ignore appearance entirely.

**Look for the hidden right triangle.** A large fraction of ACT geometry is a
right triangle inside something else: a rectangle's diagonal, a radius to a
tangent point, an altitude in an isosceles triangle, a cone's slant height, a 3D
diagonal.

**Check for Pythagorean triples** before computing.

**Break composite figures apart** into shapes you know. Shaded-region problems
are usually "big shape minus small shape."

---

## Traps

| Trap | Description |
| --- | --- |
| **Radius vs. diameter** | |
| **Area vs. perimeter/circumference** | Solved the wrong one |
| **Similar-figure area scaling** | Scaled linearly instead of by `k²` |
| **Circle center signs** | `(x + 3)²` → center `x = −3` |
| **Special triangle ratio** | Multiplied by `√3` where you should divide |
| **Degrees vs. radians** | Calculator mode |
| **Assumed a right angle** | Not stated or marked |
| **Trusted a not-to-scale figure** | |
| **Surface area vs. volume** | |
| **Forgot the cone/pyramid 1/3** | |

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Angles | Plane geometry, Easy | 20. Label diagrams fully. |
| 2. Triangles | Plane geometry, Medium | 30. Identify the triple or special triangle first. |
| 3. Polygons and quadrilaterals | Plane geometry, Medium | 20 |
| 4. Circles | Plane geometry, Medium | 25 |
| 5. Solids and measurement | Measurement, Medium | 20 |
| 6. Coordinate geometry | Measurement, Medium | 20 |
| 7. Trigonometry | Trigonometry, Medium → Hard | 25, including Law of Sines and Cosines |
| 8. Mixed timed | Whole domain | 30 at 70 sec each |

Because there's no formula sheet, **the memorization is the study plan** for a
meaningful share of this domain. Handwrite the
[formula reference](07-formula-reference.md) once, then do weekly blank-page
recall tests.

---

**Next:** [Statistics and Probability](05-statistics-and-probability.md)
