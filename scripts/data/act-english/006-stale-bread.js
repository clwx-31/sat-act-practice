"use strict";

module.exports = {
  id: "act-english-p006",
  type: "informative-essay",
  title: "What Staling Actually Is",
  content: `[1] A loaf left on the counter for three days is {1 hard crumbly and
dull}. Most people call this drying out, and most people are wrong. Bread sealed
in a plastic bag, losing almost no water at all, {2 go} stale on roughly the same
schedule.

[2] {3} When dough bakes, its starch granules swell and burst. {4 The long
molecules inside them spreading into a loose, disordered tangle that holds water
and feels soft.} Cooling begins to {5 undo this}. The molecules — amylopectin
especially — creep back toward the ordered, crystalline arrangement they held
before baking, and they squeeze out the water they had been holding. {6 A dense,
water-repelling crystal, the tongue cannot reach that moisture once amylopectin
has reorganized.} The bread is not {7 losing} water to the air. It is locking it
away.

[3] {8 As a result,} the process has a temperature. Retrogradation runs fastest a
little above freezing, which is very nearly the temperature inside a
refrigerator. A loaf in the fridge goes stale several times faster than the same
loaf on the {9 counter, however the freezer stops the process almost entirely.}
Below freezing the molecules cannot move enough to reorganize {10 at all in any
way whatsoever}.

[4] The same chemistry explains why a stale loaf can be partly rescued. Heat
above about 140 degrees Fahrenheit melts the crystals apart again, and a stale
loaf warmed in an oven comes out noticeably softer — for a few hours. Once the
loaf cools, retrogradation resumes, and {11 it} runs faster the second time than
it did the first.

[5] {12} None of this makes a three-day-old loaf new. But it explains why a
bread box on the counter beats a refrigerator, {13 why bakeries sell out by
evening, and why the oldest advice about bread — buy less, buy more often — is
also the best}.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "series-commas",
      difficulty: "Easy",
      keep: false,
      key: "hard, crumbly, and dull",
      noChange: "Three items in a series need commas separating them, and none are present.",
      wrong: [
        ["hard, crumbly and dull", "The comma before 'and' is missing, so only two of the three are separated."],
        ["hard crumbly, and dull", "The first comma is missing, which leaves the opening two items run together."],
      ],
      why:
        "'Hard,' 'crumbly,' and 'dull' are three adjectives in a list, and a list of three takes a " +
        "comma after each item except the last.",
      steps: [
        "Count the items in the series. There are three.",
        "Place a comma after the first and after the second.",
      ],
      hint: "Count the items before you place any punctuation.",
      trap: "The phrase is short enough to read as a single unit rather than as a list.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-two-phrases",
      difficulty: "Medium",
      keep: false,
      key: "goes",
      noChange: "The plural verb has been matched to the interrupting phrase instead of to 'Bread.'",
      wrong: [
        ["are going", "The verb is still plural and now describes a moment rather than a general rule."],
        ["have gone", "The plural present perfect misses both the subject's number and the timeless claim."],
      ],
      why:
        "The subject is 'Bread,' a singular noun. 'Sealed in a plastic bag' and 'losing almost no " +
        "water at all' are both modifiers, and modifiers never supply the subject.",
      steps: [
        "Cross out everything between the commas.",
        "Read what is left — 'Bread … goes stale' — and match the verb to it.",
      ],
      hint: "Delete the interrupting phrases and the agreement becomes obvious.",
      trap: "Two plural-sounding phrases sit between the subject and the verb, both pulling the wrong way.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "What changes in a staling loaf is not its water but its starch.",
      wrong: [
        [
          "Starch is a carbohydrate made of long chains of glucose molecules.",
          "A definition of starch does not announce what this paragraph is about to correct.",
        ],
        [
          "Bakers have understood the behavior of dough for a very long time.",
          "The history of baking knowledge is a subject the paragraph never takes up.",
        ],
        [
          "There are several factors that influence the quality of a finished loaf.",
          "The vague plural promises a list, but the paragraph explains a single mechanism.",
        ],
      ],
      why:
        "Paragraph 1 says the common explanation is wrong. This paragraph supplies the right one, so " +
        "its opening has to name what actually changes.",
      steps: [
        "Read the end of the previous paragraph: most people are wrong about drying out.",
        "Choose the opening that answers what is really happening instead.",
      ],
      hint: "The paragraph is a correction, so its first sentence should say what is being corrected to.",
      trap: "Every choice is true and about bread, so subject matter alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "sentence-fragment",
      difficulty: "Easy",
      keep: false,
      key: "The long molecules inside them spread into a loose, disordered tangle that holds water and feels soft.",
      noChange: "The -ing form leaves the group of words without a main verb, so it is a fragment.",
      wrong: [
        [
          "The long molecules inside them, spreading into a loose, disordered tangle that holds water and feels soft.",
          "Adding a comma isolates the phrase further without supplying a main verb.",
        ],
        [
          "Which the long molecules inside them spread into a loose, disordered tangle that holds water and feels soft.",
          "The relative pronoun makes the whole group subordinate and unable to stand alone.",
        ],
      ],
      why:
        "'Spreading' is a participle, not a main verb. Changing it to 'spread' gives the subject " +
        "something to do and completes the sentence.",
      steps: [
        "Locate the subject: 'The long molecules.'",
        "Check whether it has a main verb. It does not, so supply one.",
      ],
      hint: "A long group of words can still be a fragment; look for the main verb, not the length.",
      trap: "The fragment is long and detailed, and detail makes it feel like a complete thought.",
    },
    {
      number: 5,
      subskill: "precision",
      family: "vague-reference",
      difficulty: "Medium",
      keep: false,
      key: "undo that tangle",
      noChange: "'This' points at the previous sentence without naming what is being undone.",
      wrong: [
        ["undo the situation", "The noun is as unspecific as the pronoun it was meant to replace."],
        ["undo what has happened", "The clause restates that something occurred without naming it."],
      ],
      why:
        "The previous sentence describes a specific structure — a loose, disordered tangle. Naming it " +
        "is what makes the next several sentences legible.",
      steps: [
        "Ask what exactly cooling undoes. The tangle formed during baking.",
        "Replace the bare pronoun with that noun.",
      ],
      hint: "When a sentence turns on 'this,' check whether the reader can name what 'this' is.",
      trap: "The meaning is recoverable from context, and recoverable feels the same as clear.",
    },
    {
      number: 6,
      subskill: "modifiers",
      family: "misplaced-appositive",
      difficulty: "Hard",
      keep: false,
      key: "Once amylopectin has reorganized into a dense, water-repelling crystal, the tongue cannot reach that moisture.",
      noChange: "The opening appositive describes a crystal, but the noun it lands on is 'the tongue.'",
      wrong: [
        [
          "A dense, water-repelling crystal, that moisture cannot be reached once amylopectin has reorganized.",
          "The appositive now describes the moisture, which is not a crystal either.",
        ],
        [
          "Being a dense, water-repelling crystal, the tongue cannot reach that moisture once amylopectin has reorganized.",
          "Changing the form leaves the phrase attached to the same wrong noun.",
        ],
      ],
      why:
        "An appositive at the head of a sentence renames the noun that follows it. Only amylopectin " +
        "is the crystal, so either amylopectin follows the phrase or the phrase is rebuilt as a clause.",
      steps: [
        "Ask what the opening phrase renames. It renames amylopectin.",
        "Rewrite so the sentence names amylopectin instead of leaving the phrase stranded.",
      ],
      hint: "An opening appositive renames whatever comes right after the comma — check what that is.",
      trap: "The sentence states a true fact about the tongue, so nothing sounds factually wrong.",
    },
    {
      number: 7,
      subskill: "verb forms",
      family: "present-progressive-for-an-ongoing-process",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["lose", "The simple present states a rule where the sentence describes a process underway."],
        ["lost", "The past tense breaks from the present-tense explanation around it."],
        ["has lost", "The present perfect reports a completed loss rather than a continuing one."],
      ],
      why:
        "The paragraph describes what a loaf is doing as it stales, and the next sentence matches: " +
        "'It is locking it away.' The progressive keeps the two halves parallel.",
      steps: [
        "Read the following sentence and note its verb form.",
        "Keep the underlined verb in the same form so the contrast lands.",
      ],
      hint: "The sentence right after this one tells you which form belongs here.",
      trap: "The simple present sounds more like a scientific statement, which reads as more correct.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "additive-versus-causal-transition",
      difficulty: "Medium",
      keep: false,
      key: "Moreover,",
      noChange: "'As a result' claims the temperature effect is caused by the previous paragraph.",
      wrong: [
        ["In contrast,", "The paragraph adds to the explanation rather than opposing it."],
        ["For instance,", "Temperature dependence is a further property, not an example of the mechanism."],
      ],
      why:
        "Paragraph 2 explains what retrogradation is; paragraph 3 adds a separate fact about it. " +
        "Nothing in paragraph 2 causes retrogradation to have a preferred temperature.",
      steps: [
        "Ask whether the new paragraph follows from the last one or simply adds to it.",
        "Choose the transition that adds rather than the one that concludes.",
      ],
      hint: "'As a result' is a strong claim; check that a cause was actually stated.",
      trap: "Causal transitions make writing feel rigorous, so they get used where nothing causes anything.",
    },
    {
      number: 9,
      subskill: "semicolons and colons",
      family: "semicolon-with-a-conjunctive-adverb",
      difficulty: "Hard",
      keep: false,
      key: "counter; however, the freezer stops the process almost entirely.",
      noChange: "'However' is not a conjunction, so a comma before it leaves two clauses spliced.",
      wrong: [
        [
          "counter, however, the freezer stops the process almost entirely.",
          "Commas on both sides still leave two independent clauses joined by no conjunction.",
        ],
        [
          "counter; however the freezer stops the process almost entirely.",
          "The semicolon is right but the comma after 'however' is missing.",
        ],
      ],
      why:
        "A conjunctive adverb joining two independent clauses takes a semicolon before it and a comma " +
        "after it. Both marks are required, and only one choice supplies both.",
      steps: [
        "Confirm both sides are complete sentences. They are.",
        "Put a semicolon before 'however' and a comma after it.",
      ],
      hint: "'However' between two sentences needs two different marks, not one repeated.",
      trap: "One choice fixes the splice and stops there, which passes a quick check.",
    },
    {
      number: 10,
      subskill: "conciseness",
      family: "stacked-intensifiers",
      difficulty: "Easy",
      keep: false,
      key: "at all",
      noChange: "'In any way whatsoever' repeats the emphasis 'at all' has already supplied.",
      wrong: [
        ["in any way whatsoever", "The phrase is longer than 'at all' and carries the same meaning."],
        ["at all in any way", "Two emphatic phrases remain where the sentence needs one."],
      ],
      why:
        "'At all' already means to any degree. Adding a second phrase of emphasis does not strengthen " +
        "the claim; it only lengthens it.",
      steps: [
        "Notice that the underlined phrase says one thing twice.",
        "Keep the shorter half.",
      ],
      hint: "Stacked emphasis usually means one of the phrases can go.",
      trap: "The longer phrasing sounds more absolute, and absoluteness sounds like precision.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'retrogradation.'"],
        ["the loaf", "Naming the loaf reverses the meaning, since it is the process that speeds up."],
        ["this", "The bare demonstrative is vaguer than the pronoun and points at the whole clause."],
      ],
      why:
        "'It' refers to 'retrogradation,' the singular subject of the clause immediately before. " +
        "Nothing else in the sentence is a process that could run faster.",
      steps: [
        "Name the noun the pronoun stands for: retrogradation.",
        "Confirm it is singular and that no other noun competes.",
      ],
      hint: "Ask what is running faster, then check that the pronoun matches it in number.",
      trap: "The loaf is the more vivid noun nearby, which invites replacing a correct pronoun.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best prepares the reader " +
        "for the practical advice that closes the essay?",
      key: "Every hour a loaf spends between the freezer and the oven is an hour it spends staling.",
      wrong: [
        [
          "Commercial bakeries often add enzymes that slow retrogradation for several days.",
          "Industrial additives are a different solution from the household advice that follows.",
        ],
        [
          "Rye and whole wheat loaves stale at somewhat different rates than white loaves.",
          "Variation among flours does not bear on when or how often to buy bread.",
        ],
        [
          "The chemistry of retrogradation was not well described until the twentieth century.",
          "The history of the research says nothing about what a reader should do with a loaf.",
        ],
      ],
      why:
        "The closing advice is about time — buy less, buy more often. The detail that sets it up is " +
        "the one framing ordinary storage as time spent staling.",
      steps: [
        "Read the essay's last sentence and identify what its advice is really about: elapsed time.",
        "Keep the choice that makes time the variable.",
      ],
      hint: "Look at what the final sentence recommends, then find the choice that makes it inevitable.",
      trap: "The enzyme choice is the most scientific and answers a question the essay is not asking.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-clause-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "why bakeries sell out by evening, and the oldest advice about bread — buy less, buy more often — is also the best",
          "The third item drops the 'why' that the first two share.",
        ],
        [
          "bakeries selling out by evening, and why the oldest advice about bread — buy less, buy more often — is also the best",
          "The second item becomes a phrase while the others remain clauses.",
        ],
        [
          "why bakeries sell out by evening, and that the oldest advice about bread — buy less, buy more often — is also the best",
          "The third item switches to 'that,' which does not match the explanatory 'why.'",
        ],
      ],
      why:
        "The sentence explains three things, and each item begins with 'why.' Repeating it is what " +
        "holds a long closing sentence together.",
      steps: [
        "Read the three items in the series and compare their first words.",
        "Keep the version in which all three open the same way.",
      ],
      hint: "The word the series repeats is the one doing the structural work; do not let it drop.",
      trap: "The interrupting dashes in the last item make it hard to hear against the first two.",
    },
    {
      number: 14,
      subskill: "conclusions",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to close the essay by turning an explanation into " +
        "something the reader can act on. Would the final paragraph accomplish that goal?",
      key: "Yes, because it converts the mechanism into a storage rule and a buying habit.",
      wrong: [
        [
          "Yes, because it restates the chemical process described in the second paragraph.",
          "Restating the chemistry would be explanation again rather than something to act on.",
        ],
        [
          "No, because it concedes that a three-day-old loaf cannot be made new again.",
          "The concession sets up the advice rather than preventing the paragraph from giving it.",
        ],
        [
          "No, because the advice it offers is older than the science the essay describes.",
          "The paragraph makes that age its point, arguing the old advice was right all along.",
        ],
      ],
      why:
        "The paragraph names two concrete actions — keep bread out of the fridge, and buy smaller " +
        "amounts more often — and grounds each in the mechanism the essay explained.",
      steps: [
        "Look for anything in the paragraph a reader could actually do.",
        "Keep the reason that points at those actions rather than at the chemistry.",
      ],
      hint: "An actionable ending contains a verb the reader can perform.",
      trap: "The paragraph opens by conceding a limit, which makes it read as walking the essay back.",
    },
  ],
};
