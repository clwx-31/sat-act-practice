# SAT Math — Problem-Solving and Data Analysis

**Catalog domain:** Problem-Solving and Data Analysis
**Skills:** Ratios, rates, and units · Percentages · One-variable data ·
Two-variable data · Probability · Statistical inference
**~15% of the section** — 5-7 questions

The smallest math domain by count but disproportionately full of quick points.
Almost none of it is hard mathematically; the errors come from misreading and
from percent confusion.

---

## Ratios, rates, and units

### Ratios

A ratio `a : b` means the quantities are in that proportion, not that there are
`a` and `b` of them.

**Part-to-part vs. part-to-whole:** if boys to girls is `3 : 5`, then boys are
`3/8` of the total, not `3/5`. Read carefully which is being asked.

**Method for "total" problems:** let the parts be `3x` and `5x`. Then the total
is `8x`. Solve for `x`.

> *A mixture is 3 parts sand to 5 parts gravel by weight. If the mixture weighs
> 96 kg, how much sand is there?*
>
> `3x + 5x = 96` → `8x = 96` → `x = 12`. Sand = `3(12) = 36 kg`.

### Proportions

Set up and cross-multiply. Keep units aligned on both sides.

```
a/b = c/d   →   ad = bc
```

### Unit conversion — dimensional analysis

Write units as fractions and cancel. This eliminates nearly all conversion
errors.

> *A car travels 45 miles per hour. How many feet per second is that?*
>
> ```
> 45 mi     5280 ft     1 hr        45 · 5280
> ----- ×  --------  × ------  =  ------------ = 66 ft/s
>  1 hr      1 mi       3600 s        3600
> ```

Arrange each conversion factor so the unwanted unit cancels. If the units don't
cancel to what you want, you've set it up wrong — which is exactly why writing
them out is worth the time.

**Multi-step conversions are a favorite SAT construction.** The question gives
you a rate in one unit system and asks for another, sometimes with two or three
conversions chained.

### Rates

```
distance = rate × time
work     = rate × time
```

**Average speed is not the average of the speeds.** It's total distance over
total time.

> *A trip of 120 miles at 60 mph, returning at 40 mph. Average speed?*
>
> Out: 2 hours. Back: 3 hours. Total 240 miles in 5 hours = **48 mph** —
> not 50.

**Combined work rates add:**

> If A does a job in 4 hours and B in 6 hours, together they do
> `1/4 + 1/6 = 5/12` of the job per hour, so the job takes `12/5 = 2.4` hours.

---

## Percentages

The most error-prone topic in the entire section, because the language is
slippery.

### The three questions

| Question | Setup |
| --- | --- |
| What is `p%` of `n`? | `(p/100) × n` |
| `a` is what percent of `b`? | `(a/b) × 100` |
| `a` is `p%` of what? | `a ÷ (p/100)` |

### Percent change

```
percent change = (new − old) / old × 100
```

**The denominator is always the ORIGINAL value.** This is the single most common
percent error.

### Increase and decrease as multipliers

| Change | Multiplier |
| --- | --- |
| Increase by 15% | `× 1.15` |
| Decrease by 15% | `× 0.85` |
| Increase by 100% | `× 2` |
| Decrease by 40% | `× 0.60` |

Using multipliers rather than computing the change and adding it is faster and
much less error-prone. Chain them for successive changes.

### Successive percent changes do not add

> *A price increases 20%, then decreases 20%. Net change?*
>
> `1.20 × 0.80 = 0.96` → a **4% decrease**, not zero.

This is tested directly and regularly.

### Percent vocabulary traps

| Phrase | Meaning |
| --- | --- |
| "increased **by** 30%" | new = old × 1.30 |
| "increased **to** 30% of" | new = old × 0.30 (a decrease!) |
| "30% **more than** x" | `1.30x` |
| "30% **less than** x" | `0.70x` |
| "x is 30% **of** y" | `x = 0.30y` |
| "**percent** increase" | relative to original |
| "**percentage point** increase" | absolute difference between two percents |

That last distinction matters: going from 20% to 25% is a **5 percentage point**
increase but a **25 percent** increase.

---

## One-variable data

### Measures of center

| Measure | Definition | Sensitive to outliers? |
| --- | --- | --- |
| **Mean** | sum ÷ count | **Yes, strongly** |
| **Median** | middle value when ordered | No |
| **Mode** | most frequent value | No |

**Mean from a frequency table:** multiply each value by its frequency, sum, then
divide by the total frequency — not by the number of distinct values.

**Working backward from a mean:** if the mean of `n` values is `m`, the sum is
`n × m`. Most "mean" word problems are solved by converting to sums.

> *The mean of 5 numbers is 12. If one number is removed and the mean of the
> remaining 4 is 13, what was removed?*
>
> Original sum: `60`. New sum: `52`. Removed: **8**.

### Spread

- **Range** = max − min
- **Standard deviation** = a measure of typical distance from the mean

**The SAT does not ask you to compute standard deviation.** It asks you to
compare it between data sets. The rule:

> More spread out → larger standard deviation. More clustered near the mean →
> smaller standard deviation.

Comparing two dot plots or histograms, the one where values bunch tightly around
the center has the smaller SD, regardless of where the center is. **Shifting all
values by a constant does not change the standard deviation.**

### Effects of changing a data set

| Change | Mean | Median | SD |
| --- | --- | --- | --- |
| Add a value equal to the mean | unchanged | may shift slightly | decreases slightly |
| Add an extreme outlier | shifts toward it | barely moves | increases |
| Add a constant to every value | increases by that constant | same | **unchanged** |
| Multiply every value by `k` | × k | × k | × \|k\| |

### Shape and skew

| Shape | Relationship |
| --- | --- |
| Symmetric | mean ≈ median |
| **Right-skewed** (tail to the right) | **mean > median** |
| **Left-skewed** (tail to the left) | **mean < median** |

Mnemonic: the mean chases the tail.

---

## Two-variable data

### Scatterplots and lines of best fit

- **Positive association:** as x increases, y increases.
- **Negative association:** as x increases, y decreases.
- The **line of best fit** models the trend; the SAT asks you to read its slope,
  intercept, and predictions.

**Reading questions to expect:**

| Question | Method |
| --- | --- |
| "What does the slope represent?" | Change in y per one unit of x, in context |
| "What does the y-intercept represent?" | Predicted y when x = 0 |
| "Predict y when x = ___" | Read the line, not the data points |
| "How many points lie above the line?" | Count carefully; this is a counting question |
| "By how much does the model over/underestimate?" | Actual data point value minus line value |

**"Predicted" always means read the line. "Actual" always means read the data
point.** Questions combining both are common:

> *For the year in which the actual value was 40, the model predicted 34. The
> model underestimated by 6.*

### Interpolation vs. extrapolation

Predicting within the data range is reasonable; predicting far outside it is
not. The SAT sometimes asks which prediction is least reliable — it's the one
furthest outside the observed range.

### Correlation is not causation

The SAT tests this directly. A strong association in observational data does not
establish that one variable causes the other. Only a **randomized controlled
experiment** supports a causal conclusion.

### Two-way tables

Rows and columns of counts, with totals.

| Question type | Denominator |
| --- | --- |
| "What fraction of **all** participants..." | grand total |
| "What fraction of **the men**..." | men's row total |
| "Of those who **responded yes**, what fraction..." | yes-column total |

**The whole skill is identifying the denominator.** Circle the group the
question restricts to before computing. Nearly all errors here are
right-numerator-wrong-denominator.

---

## Probability

```
P(event) = favorable outcomes / total outcomes
```

- Probabilities range from 0 to 1.
- `P(not A) = 1 − P(A)`
- **Independent events:** `P(A and B) = P(A) × P(B)`
- **Mutually exclusive:** `P(A or B) = P(A) + P(B)`
- **General:** `P(A or B) = P(A) + P(B) − P(A and B)`

**Conditional probability** — "given that..." restricts the sample space:

```
P(A given B) = P(A and B) / P(B)
```

In a two-way table, this is just "use the row or column total as the
denominator."

The SAT's probability questions are overwhelmingly two-way table questions.
Master the denominator identification above and you have most of them.

---

## Statistical inference

### Sampling

A conclusion generalizes to the population **the sample was randomly drawn
from** — and no further.

> A random sample of students at *one high school* supports conclusions about
> *that school's students*, not about all high school students, not about all
> teenagers.

Questions frequently offer an over-broad generalization as the trap.

### Margin of error

Reported as `estimate ± margin`. It expresses uncertainty from sampling.

- **Larger sample → smaller margin of error.**
- Higher confidence level → larger margin of error.
- The margin does **not** account for bias in how the sample was collected.

**Interpretation:** "The plausible values for the population parameter are
between (estimate − margin) and (estimate + margin)."

Do **not** interpret it as "95% of the data falls in this range" or "there's a
95% chance the true value is exactly the estimate." Those are the standard
distractors.

### Study design — the key distinction

| Design | Supports |
| --- | --- |
| **Randomized controlled experiment** with random assignment | A **causal** conclusion |
| **Observational study** / survey with random selection | An **association**, generalizable to the population |
| Non-random sample | Neither; conclusions are limited to the sample |

Two independent requirements:

- **Random selection** → lets you generalize to a population
- **Random assignment** → lets you claim causation

A study can have one, both, or neither, and the SAT asks you to say what
conclusion is licensed. Check both separately.

---

## Traps

| Trap | Description |
| --- | --- |
| **Percent change denominator** | Divided by the new value instead of the original |
| **Successive percents added** | +20% then −20% treated as net zero |
| **Percent vs. percentage points** | Confused a 5-point rise with a 5% rise |
| **Wrong denominator in a table** | Used the grand total instead of a row total |
| **Average of averages** | Averaged two speeds instead of using total/total |
| **Part-to-part read as part-to-whole** | `3:5` treated as `3/5` of the total |
| **Predicted vs. actual** | Read the data point when the line was wanted |
| **Over-generalizing a sample** | Extended a school's result to all students |
| **Causation from observation** | No random assignment, but claimed cause |
| **Unit not converted** | Answer in the wrong unit |

---

## Drill plan

| Stage | Filter | Volume |
| --- | --- | --- |
| 1. Percents | Percentages, Easy → Medium | 25. Use multipliers, never compute-and-add. |
| 2. Rates and units | Ratios, rates, and units, Medium | 25. **Write the units** in every conversion. |
| 3. One-variable stats | One-variable data, Easy → Medium | 20. Convert every mean question to sums. |
| 4. Two-way tables | Two-variable data + Probability, Medium | 25. Circle the restricting group first. |
| 5. Scatterplots | Two-variable data, Medium | 15 |
| 6. Inference | Statistical inference, Medium → Hard | 15. State what conclusion is licensed. |
| 7. Mixed timed | Whole domain | 30 at 90 sec each |

Stage 1 has the highest yield. Percent errors show up across the whole test, not
just this domain, and the multiplier habit fixes most of them permanently.

---

**Next:** [Geometry and Trigonometry](04-geometry-and-trigonometry.md)
