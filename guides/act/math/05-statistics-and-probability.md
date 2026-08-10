# ACT Mathematics — Statistics and Probability

**Catalog domain:** Statistics and Probability
**Skills:** Data analysis · Probability
**~15% of the section** — about 7 questions

Mathematically the easiest domain. The errors come from misreading and from
counting problems, not from difficult computation.

---

## Measures of center

| Measure | Definition | Outlier-sensitive? |
| --- | --- | --- |
| **Mean** | sum ÷ count | **Yes** |
| **Median** | middle value when ordered | No |
| **Mode** | most frequent | No |

**Median with an even count:** average the two middle values.

**Mean from a frequency table:** multiply each value by its frequency, sum, then
divide by the **total frequency** — not by the number of distinct values.

> Values 2, 3, 5 with frequencies 4, 1, 5:
> `(2·4 + 3·1 + 5·5)/(4+1+5) = (8 + 3 + 25)/10 = 3.6`

### Working backward from a mean

If the mean of `n` values is `m`, the **sum** is `n × m`. Nearly every mean word
problem is solved by converting to sums.

> *The mean of 6 numbers is 15. A seventh number is added and the mean becomes
> 16. What was added?*
>
> Old sum: `90`. New sum: `7 × 16 = 112`. Added: **22**.

### Weighted average

When groups have different sizes, weight by size — don't average the averages.

> *Class A: 20 students, average 80. Class B: 30 students, average 90. Combined
> average?*
>
> `(20·80 + 30·90)/50 = (1600 + 2700)/50 = 4300/50 = 86`
>
> Not 85.

---

## Spread and shape

- **Range** = max − min
- **Standard deviation** — typical distance from the mean. The ACT asks you to
  **compare**, not compute.

> More spread out → larger SD. More clustered → smaller SD.
> Adding a constant to every value: mean shifts, **SD unchanged**.
> Multiplying every value by `k`: SD scales by `|k|`.

**Skew:**

| Shape | Relationship |
| --- | --- |
| Symmetric | mean ≈ median |
| Right-skewed (tail right) | **mean > median** |
| Left-skewed (tail left) | **mean < median** |

The mean chases the tail.

### Effects of changing a data set

| Change | Mean | Median | SD |
| --- | --- | --- | --- |
| Add a value equal to the mean | unchanged | may shift | decreases slightly |
| Add an extreme outlier | shifts toward it | barely moves | increases |
| Add a constant to all values | + constant | + constant | **unchanged** |
| Multiply all values by `k` | × k | × k | × \|k\| |

---

## Data displays

| Display | Reading it |
| --- | --- |
| **Bar graph** | Compare category heights |
| **Histogram** | Bars are ranges; area matters, and bars touch |
| **Line graph** | Trend over time |
| **Scatterplot** | Association between two variables |
| **Box plot** | Min, Q1, median, Q3, max; box = middle 50% |
| **Pie chart** | Parts of a whole; `360° × fraction` gives the angle |
| **Stem-and-leaf** | Stems are the leading digits |

**Box plots** — worth knowing precisely:
- The box spans Q1 to Q3; its width is the **interquartile range (IQR)**
- The line inside is the **median**, not the mean
- Each of the four regions contains about 25% of the data
- `IQR = Q3 − Q1`

**Pie charts:** the whole is 360°. A sector representing 25% has a 90° angle.

**Before answering any data question, read the title, axis labels, units, and
legend.** Ten seconds. It prevents most errors here.

---

## Probability

```
P(event) = favorable outcomes / total outcomes
```

- `0 ≤ P ≤ 1`
- `P(not A) = 1 − P(A)`

| Rule | Formula |
| --- | --- |
| Independent events | `P(A and B) = P(A) · P(B)` |
| Mutually exclusive | `P(A or B) = P(A) + P(B)` |
| General "or" | `P(A or B) = P(A) + P(B) − P(A and B)` |
| Conditional | `P(A given B) = P(A and B)/P(B)` |

### With and without replacement

This distinction matters and the ACT tests it.

> *A bag has 5 red and 3 blue marbles. Probability of drawing two reds?*
>
> **With replacement:** `(5/8)(5/8) = 25/64`
> **Without replacement:** `(5/8)(4/7) = 20/56 = 5/14`

Without replacement, both the numerator and the denominator shrink.

### Geometric probability

Probability as a ratio of areas or lengths.

> *A dart hits a 10×10 square at random. A circle of radius 3 is inscribed
> within it. Probability of hitting the circle?*
>
> `π(3²)/100 = 9π/100 ≈ 0.283`

### Expected value

```
E = Σ (value × probability)
```

> *A game pays $10 with probability 0.2 and $0 otherwise. Expected value?*
> `10(0.2) + 0(0.8) = $2`

---

## Counting

The ACT tests counting more than the SAT does.

### Fundamental counting principle

Multiply the number of choices at each stage.

> 3 shirts, 4 pants, 2 hats → `3 × 4 × 2 = 24` outfits.

### Permutations vs. combinations

**The distinction: does order matter?**

| | Order matters | Formula |
| --- | --- | --- |
| **Permutation** | Yes | `P(n,r) = n!/(n−r)!` |
| **Combination** | No | `C(n,r) = n!/[r!(n−r)!]` |

**Signals:**
- Permutation: *arrange, order, rank, first/second/third, seat in a row,
  password*
- Combination: *choose, select, committee, group, handshake, team*

> *How many ways to choose 3 people from 8 for a committee?*
> Order doesn't matter → `C(8,3) = 8!/(3!·5!) = 56`
>
> *How many ways to award gold, silver, bronze among 8?*
> Order matters → `P(8,3) = 8·7·6 = 336`

**Factorials:** `n! = n × (n−1) × ... × 1`, and `0! = 1`.

### Overlapping sets

For two groups with overlap:
```
Total = A + B − (both) + (neither)
```

Venn diagrams help. Fill in the overlap **first**, then work outward — the
overlap is counted in both circles and subtracting it correctly is the whole
problem.

---

## Patterns and tells

**Convert mean problems to sums.** Almost always the fastest route.

**Weighted averages are not simple averages.** If group sizes differ, weight.

**Check "with or without replacement"** on every multi-draw probability question.

**Order matters?** Decide before choosing permutation or combination.

**Read the axes and legend before the question.**

**On box plots, the line is the median.** Not the mean.

**Probability answers must be between 0 and 1** — an immediate sanity check that
eliminates choices.

---

## Traps

| Trap | Description |
| --- | --- |
| **Averaged the averages** | Ignored group sizes |
| **Mean vs. median** | Answered the wrong one |
| **Forgot to reorder** | Median without sorting the data |
| **Replacement** | Used the wrong denominator on the second draw |
| **Permutation vs. combination** | Order mattered and you used `C` |
| **Frequency table mean** | Divided by the number of distinct values |
| **Double-counted the overlap** | In an overlapping-sets problem |
| **Read the wrong series** | Multi-line graph |
| **Missed a unit prefix** | "in thousands" |

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Center and spread | Data analysis, Easy → Medium | 25. Convert every mean question to sums. |
| 2. Weighted averages | Data analysis, Medium | 15 |
| 3. Data displays | Data analysis, Easy → Medium | 25. Narrate title/axes/units aloud first. |
| 4. Basic probability | Probability, Easy → Medium | 25. Check replacement every time. |
| 5. Counting | Probability, Medium → Hard | 25. State "order matters / doesn't" before solving. |
| 6. Overlapping sets | Probability, Medium | 15. Draw the Venn diagram. |
| 7. Mixed timed | Whole domain | 25 at 60 sec each |

Counting (stage 5) is where most points hide in this domain. The math is
trivial; the errors are all in choosing permutation vs. combination. Making
yourself say which one out loud before computing fixes it in about twenty
questions.

---

**Next:** [Integrating Essential Skills](06-integrating-essential-skills.md)
