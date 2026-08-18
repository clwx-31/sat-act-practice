# Difficulty calibration

Easy, Medium, and Hard were decorative: `assignDifficulties` rotated an index
and no generator read the label, so the shipped ACT Mathematics bank calls
*"what is 20% of 80?"* Hard and *"a right triangle has legs 12 and 16, find the
hypotenuse"* Easy. This document defines what the three labels mean, so a
generator can be written to them and a validator can check them.

## The rule

**Difficulty is the reasoning a question demands, never the size of its
numbers, the length of its sentences, or the obscurity of its topic.** A
question with four-digit numbers and one step is Easy. A question with
single-digit numbers that requires recognising which of two models applies is
Hard.

## The seven factors

Each is scored 0, 1, or 2. A question's tier is set by its total.

| Factor | 0 | 1 | 2 |
| --- | --- | --- | --- |
| **Reasoning steps** | One operation or one lookup | Two or three chained steps | Four or more, or an unbounded search |
| **Conceptual complexity** | One named rule, stated or obvious | One rule applied in an unfamiliar form | The governing structure must be identified before anything can be computed |
| **Interpretation burden** | The question states what is wanted | One translation from words or a figure into mathematics | Sustained reading, or reconciling two representations |
| **Distractor subtlety** | Wrong answers come from arithmetic slips | Wrong answers come from a plausible wrong method | At least one distractor is the answer to the question a careful student thinks is being asked |
| **Abstraction** | Concrete numbers throughout | A symbol stands for a fixed unknown | A parameter, a general case, or a relationship rather than a value |
| **Synthesis** | One skill | Two skills from the same domain | Two or more skills from different domains |
| **Trap likelihood** | No common misconception applies | A known misconception is available | The intuitive answer is wrong |

**Easy: 0–3. Medium: 4–8. Hard: 9–14.**

A Hard question must score 2 on at least two factors. "Larger numbers" moves no
factor, which is the point.

## What each tier looks like

**Easy** — the student sees what to do on reading it. One relationship applied
once, and the answer is what the question asked for. Failure means not knowing
the rule, not failing to find it.

**Medium** — the student must plan before computing. There is an intermediate
quantity that is not the answer, and the most common error is stopping at it.

**Hard** — the student must decide *what kind of problem this is* before any
computation is possible. The work is often shorter than a Medium item once the
structure is seen; the difficulty is seeing it. Reaching for the neighbouring
rule — the wrong counting model, the wrong average, the wrong sign convention —
produces one of the offered answers.

## Applied per section

**Math (ACT and SAT).** Easy: evaluate, substitute, apply one formula. Medium:
two or three steps, or one modelling translation. Hard: identify a structure
(alligation, harmonic mean, inverse-square variation, discriminant reasoning,
counting model), work symbolically, or combine domains. A Hard item may not be
an Easy item with worse numbers.

**Reading (ACT and SAT).** Easy: the answer is stated in one place and the
question points near it. Medium: the answer is distributed across a paragraph,
or requires an inference the passage clearly supports. Hard: the answer requires
synthesising separated parts of the passage, or distinguishing what the author
asserts from what a cited source asserts. Distractor subtlety carries most of
the weight here — every distractor must be defensible from a misreading a real
student would make, and all four choices must be within a few words of the same
length.

**English and Writing conventions.** Easy: one rule, one clause, the error is
audible. Medium: the governing element is separated from the error by
intervening words, or two rules interact. Hard: the choice turns on meaning or
rhetorical purpose rather than grammaticality — more than one option is
grammatical and only one serves the passage.

**Science.** Easy: read one value off one figure. Medium: compare two figures,
or interpolate a trend. Hard: apply a stated model to a case outside the data,
or decide which of two viewpoints a new result supports.

## How this is enforced

`scripts/check-difficulty.js` measures each bank and fails on:

1. **Identical shape under two labels.** The same question shape appearing as
   both Medium and Hard means the label is decorative.
2. **Tier inversion.** Median reasoning steps, estimated seconds, and distractor
   count must not decrease as difficulty rises.
3. **Tier collapse.** The three tiers' medians must actually separate; if Easy
   and Hard look alike on every measure, the calibration is not real.
4. **Blind solvability by tier.** A student who never reads the question should
   not do *better* on Hard items than on Easy ones.

Generators branch on `task.difficulty` and pick a shape built for that tier.
A tier with only one shape is rejected by `scripts/check-shapes.js`, because a
tier needs several structurally different questions to be worth the label.
