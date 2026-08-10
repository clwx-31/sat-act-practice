# ACT Mathematics — Number and Quantity

**Catalog domain:** Number and Quantity
**Skills:** Real and complex numbers · Quantities and units
**~11% of the section** — about 5 questions

The smallest domain, but it contains several topics the SAT never touches, so
it's easy to be caught out.

---

## Number types and properties

| Type | Definition |
| --- | --- |
| **Natural / counting** | 1, 2, 3, ... |
| **Whole** | 0, 1, 2, 3, ... |
| **Integers** | ..., −2, −1, 0, 1, 2, ... |
| **Rational** | Expressible as `a/b` with integers `a`, `b ≠ 0`; decimals terminate or repeat |
| **Irrational** | Non-terminating, non-repeating: `√2`, `π`, `e` |
| **Real** | All rational and irrational |
| **Imaginary** | Multiples of `i = √(−1)` |
| **Complex** | `a + bi` |

**Facts tested:**
- `0` is even, and is neither positive nor negative.
- `1` is not prime. `2` is the only even prime.
- The product of two irrationals can be rational: `√2 · √2 = 2`.
- The sum of a rational and an irrational is always irrational.

### Divisibility rules

| Divisible by | Test |
| --- | --- |
| 2 | Last digit even |
| 3 | Digit sum divisible by 3 |
| 4 | Last two digits divisible by 4 |
| 5 | Ends in 0 or 5 |
| 6 | Divisible by 2 and 3 |
| 8 | Last three digits divisible by 8 |
| 9 | Digit sum divisible by 9 |
| 10 | Ends in 0 |

### Prime factorization, GCF, LCM

**Prime factorization:** break a number into primes. `72 = 2³ · 3²`.

**GCF (greatest common factor):** product of shared prime factors, each to the
*lowest* power.
**LCM (least common multiple):** product of all prime factors, each to the
*highest* power.

> `24 = 2³·3`, `36 = 2²·3²`
> GCF = `2²·3 = 12`
> LCM = `2³·3² = 72`

**Shortcut:** `GCF × LCM = product of the two numbers`. Here `12 × 72 = 864 =
24 × 36` ✓.

**Where these show up:** "the smallest number of X such that..." problems, and
scheduling problems ("two buses leave every 12 and 18 minutes; when do they
coincide?" → LCM).

---

## Fractions, decimals, percents

| Fraction | Decimal | Percent |
| --- | --- | --- |
| 1/2 | 0.5 | 50% |
| 1/3 | 0.333... | 33.3% |
| 1/4 | 0.25 | 25% |
| 1/5 | 0.2 | 20% |
| 1/6 | 0.1666... | 16.7% |
| 1/8 | 0.125 | 12.5% |
| 3/8 | 0.375 | 37.5% |
| 2/3 | 0.666... | 66.7% |
| 3/4 | 0.75 | 75% |

**Operations:**
- Add/subtract: common denominator required
- Multiply: straight across
- Divide: multiply by the reciprocal
- **Complex fractions:** multiply the whole expression by the LCD of the inner
  fractions

---

## Exponents and radicals

```
xᵃ · xᵇ = xᵃ⁺ᵇ           xᵃ / xᵇ = xᵃ⁻ᵇ
(xᵃ)ᵇ = xᵃᵇ              (xy)ᵃ = xᵃyᵃ
x⁰ = 1                   x⁻ᵃ = 1/xᵃ
x^(1/n) = ⁿ√x            x^(m/n) = ⁿ√(xᵐ)
```

**Simplifying radicals:** pull out perfect squares.
`√50 = √(25·2) = 5√2`

**Rationalizing:** multiply by the conjugate.
`3/(2 − √5) × (2 + √5)/(2 + √5) = 3(2 + √5)/(4 − 5) = −3(2 + √5)`

**Common error:** `√(a + b) ≠ √a + √b`. This is never valid.

---

## Scientific notation

```
a × 10ⁿ    where 1 ≤ |a| < 10
```

- Multiply: multiply the `a` values, add the exponents
- Divide: divide the `a` values, subtract the exponents
- Normalize the result so `1 ≤ |a| < 10`

> `(3 × 10⁵)(4 × 10⁻²) = 12 × 10³ = 1.2 × 10⁴`

---

## Absolute value

`|x|` is the distance from zero — always non-negative.

**Solving `|expression| = k`** produces **two** equations:
```
|2x − 3| = 7   →   2x − 3 = 7   or   2x − 3 = −7
                   x = 5        or   x = −2
```

**Inequalities:**

| Form | Becomes | Shape |
| --- | --- | --- |
| `|x| < k` | `−k < x < k` | A single interval ("and") |
| `|x| > k` | `x < −k` **or** `x > k` | Two intervals ("or") |

Forgetting the second case is the standard error.

**No solution:** `|x| = −3` and `|x| < −3` have none. `|x| > −3` is true for all
`x`.

---

## Complex numbers

```
i  = √(−1)
i² = −1
i³ = −i
i⁴ = 1
```

The cycle repeats every 4. To evaluate `iⁿ`, divide `n` by 4 and use the
remainder: `i²⁷` → `27 ÷ 4` leaves 3 → `i²⁷ = i³ = −i`.

**Arithmetic:** treat `i` as a variable, then replace `i²` with `−1`.

> `(3 + 2i)(1 − 4i) = 3 − 12i + 2i − 8i² = 3 − 10i + 8 = 11 − 10i`

**Division:** multiply by the conjugate of the denominator.

> `(2 + i)/(3 − i) × (3 + i)/(3 + i) = (6 + 2i + 3i + i²)/(9 + 1) = (5 + 5i)/10 = (1 + i)/2`

**Conjugate of `a + bi`** is `a − bi`. Their product is `a² + b²`, always real.

---

## Matrices

The ACT tests basic matrix operations. The SAT does not.

**Addition and subtraction:** element by element; dimensions must match.

**Scalar multiplication:** multiply every element.

**Matrix multiplication:** row × column. For an `m×n` times an `n×p`, the result
is `m×p`. The inner dimensions must match.

> For 2×2:
> ```
> [a b] [e f]   [ae+bg  af+bh]
> [c d] [g h] = [ce+dg  cf+dh]
> ```

**Determinant of a 2×2:**
```
det [a b]
    [c d]  =  ad − bc
```

Matrix multiplication is **not commutative**: `AB ≠ BA` in general. That fact
itself is sometimes the tested point.

---

## Sequences

**Arithmetic** — constant difference `d`:
```
aₙ = a₁ + (n − 1)d
sum of n terms = n(a₁ + aₙ)/2
```

**Geometric** — constant ratio `r`:
```
aₙ = a₁ · r^(n−1)
```

**Identifying which:** compute differences and ratios between consecutive terms.
Constant difference → arithmetic. Constant ratio → geometric.

---

## Quantities and units

### Unit conversion

Write units as fractions and cancel — dimensional analysis. If the units don't
cancel to what you want, the setup is wrong.

> *Convert 72 km/h to m/s:*
> ```
> 72 km    1000 m     1 h
> ----- ×  ------  × ------  =  20 m/s
>  1 h      1 km      3600 s
> ```

**Common conversions worth knowing:**

| | |
| --- | --- |
| 1 mile = 5280 feet | 1 hour = 3600 seconds |
| 1 yard = 3 feet | 1 kg = 1000 g |
| 1 foot = 12 inches | 1 km = 1000 m |
| 1 pound = 16 ounces | 1 liter = 1000 mL |

The ACT provides unusual conversions in the problem. You should know the common
ones.

### Unit reasoning

Some questions ask what unit an answer should have. Track the units through the
computation:

> If a rate is in dollars per hour and you multiply by hours, the result is
> dollars.

**Area units are squared, volume units are cubed.** Converting area or volume
units requires squaring or cubing the conversion factor:

> `1 m² = 100 cm × 100 cm = 10,000 cm²`, not 100 cm².

This is a favorite ACT trap.

---

## Traps

| Trap | Description |
| --- | --- |
| **Absolute value, one case** | Solved only the positive branch |
| **`i` cycle** | Computed `i²⁷` wrong |
| **`√(a+b) = √a + √b`** | Never valid |
| **Area/volume unit conversion** | Didn't square or cube the factor |
| **Matrix order** | Assumed `AB = BA` |
| **GCF vs. LCM** | Used the wrong one |
| **Scientific notation not normalized** | Left `12 × 10³` |
| **Negative exponent as negative number** | `2⁻³ = 1/8`, not `−8` |

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Exponents and radicals | Real and complex numbers, Easy → Medium | 25 |
| 2. Absolute value | Real and complex numbers, Medium | 15. Write both cases every time. |
| 3. Complex numbers | Real and complex numbers, Medium | 15 |
| 4. Matrices and sequences | Real and complex numbers, Medium | 15 |
| 5. Units | Quantities and units, Easy → Medium | 20. **Write the units** in every conversion. |
| 6. Mixed timed | Whole domain | 20 at 60 sec each |

This domain is only about five questions. Don't over-invest — but do learn
matrices, complex numbers, and absolute-value inequalities, since they're each
one or two nearly-free questions if you know the rule and impossible if you
don't.

---

**Next:** [Algebra](02-algebra.md)
