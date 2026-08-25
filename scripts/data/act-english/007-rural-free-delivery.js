"use strict";

module.exports = {
  id: "act-english-p007",
  type: "historical-account",
  title: "The Rule That Built the Roads",
  content: `[1] Before 1896{1 a farmer} who wanted mail rode to town for it. The
post office sat in a corner of a general store, it opened when the storekeeper
felt like opening it, and a letter {2 might have sat} in a pigeonhole for a
month.

[2] {3} The Post Office Department began experimenting with free delivery to
rural addresses in West Virginia in 1896. The idea {4 were} not popular inside
the department. Delivery to scattered farms cost far more per letter than
delivery to a city {5 block, the first estimates alarmed nearly everyone who saw
them.}

[3] What the department discovered was that the cost was not the hard part. The
roads were. A carrier with a horse and a light wagon could not run a route over
a road that {6 turned into mud and became muddy} in April, and so the
{7 departments} rule settled the matter: it would not establish a route where
the roads were impassable.

[4] {8 Similarly,} the rule did what no road bill had managed to do. {9 Wanting
daily mail, a county's roads had to be graded, its culverts built, and its
bridges kept standing.} Petitions for Rural Free Delivery began arriving with
road-improvement plans attached. By 1902 the service was {10 made a real thing},
and by 1910 it reached most of the settled countryside.

[5] The second effect was commercial. A farm on a delivery route could receive
catalogs, and Sears and Montgomery Ward printed {11 them} by the million. {12}
Parcel post followed in 1913, and what had once been a day's trip to town became
{13 — for several million households —} a form and a wait.

[6] Rural Free Delivery is not remembered as a road program or as a retail
revolution. It is remembered, {14 when it is remembered at all,} as mail.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-element-comma",
      difficulty: "Easy",
      keep: false,
      key: ", a farmer",
      noChange: "An introductory element needs a comma before the main clause begins.",
      wrong: [
        [", a farmer,", "The second comma cuts the subject off from the clause describing it."],
        ["; a farmer", "A semicolon must join two independent clauses, and 'Before 1896' is not one."],
      ],
      why:
        "'Before 1896' opens the sentence and is not the subject. A comma marks where the " +
        "introductory phrase ends and the main clause starts.",
      steps: [
        "Find where the opening phrase stops: after '1896.'",
        "Place a single comma there.",
      ],
      hint: "A date or phrase at the head of a sentence is almost always followed by one comma.",
      trap: "Adding a second comma looks symmetrical and quietly severs the subject from its clause.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "habitual-past",
      difficulty: "Medium",
      keep: false,
      key: "might sit",
      noChange: "'Might have sat' names one completed possibility, not a recurring condition.",
      wrong: [
        ["might be sitting", "The progressive describes one letter at one moment instead of a practice."],
        ["may sit", "The present-tense modal contradicts the sentence's pre-1896 setting."],
      ],
      why:
        "The sentence describes what regularly happened before 1896. 'Might sit' expresses that " +
        "habitual possibility and matches the past-tense verbs beside it.",
      steps: [
        "Ask whether the sentence describes one event or a recurring one. Recurring.",
        "Use the modal form that expresses habitual possibility in the past.",
      ],
      hint: "The whole sentence is about what used to happen, not what happened once.",
      trap: "'Might have' looks more grammatically elaborate, and elaboration reads as correctness.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The department's answer to that inconvenience began as a small experiment.",
      wrong: [
        [
          "West Virginia was chosen partly because several of its counties had petitioned for it.",
          "A detail about site selection cannot open a paragraph that has not yet named the program.",
        ],
        [
          "The United States Post Office Department was among the largest employers of the era.",
          "The department's size is never taken up again and connects to nothing that follows.",
        ],
        [
          "Mail delivery has always been one of the federal government's most visible services.",
          "The sweeping generalization sets up no specific development for the paragraph to trace.",
        ],
      ],
      why:
        "Paragraph 1 establishes the problem — farmers had to fetch their own mail. This paragraph " +
        "introduces the response, so its opening should link the two.",
      steps: [
        "Name what the previous paragraph left the reader with: an inconvenience.",
        "Choose the opening that presents this paragraph as the answer to it.",
      ],
      hint: "A paragraph that begins a new stage should point back at what it is answering.",
      trap: "The West Virginia detail is the most specific choice and belongs a sentence later.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "simple-singular-subject",
      difficulty: "Easy",
      keep: false,
      key: "was",
      noChange: "The subject 'The idea' is singular and cannot take a plural verb.",
      wrong: [
        ["are", "The verb is still plural and the present tense conflicts with the 1896 setting."],
        ["have been", "The plural present perfect misses both the number and the historical time frame."],
      ],
      why: "'The idea' is one thing, so the verb is singular, and the paragraph is in the past tense.",
      steps: [
        "Identify the subject: 'The idea,' singular.",
        "Choose the singular past-tense verb.",
      ],
      hint: "Nothing separates this subject from its verb, so read them directly together.",
      trap: "The sentence is surrounded by plurals — farms, estimates, letters — which colors the ear.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "block, and the first estimates alarmed nearly everyone who saw them.",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "block the first estimates alarmed nearly everyone who saw them.",
          "Removing the comma fuses the clauses instead of separating them.",
        ],
        [
          "block, the first estimates alarming nearly everyone who saw them.",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "Both halves stand alone as sentences. Joining them takes a comma plus a conjunction, and " +
        "'and' adds the second fact to the first without inventing a relationship.",
      steps: [
        "Test each side of the comma as a sentence. Both work.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "Cover the comma and read the halves separately.",
      trap: "The second clause is long, which makes it feel subordinate to the first.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "redundancy",
      difficulty: "Easy",
      keep: false,
      key: "turned to mud",
      noChange: "'Turned into mud' and 'became muddy' state the same change twice.",
      wrong: [
        ["turned into mud and was muddy", "The second clause still repeats what the first has said."],
        ["became muddy and turned to mud", "Reversing the order leaves both halves of the repetition."],
      ],
      why:
        "One verb describes the road's change completely. The second phrase adds no new information " +
        "about when, how far, or how fast.",
      steps: [
        "Compare the two halves of the underlined phrase and note that they mean the same thing.",
        "Keep whichever half is shorter and more concrete.",
      ],
      hint: "If you can delete half a phrase and lose no meaning, delete it.",
      trap: "The doubled phrasing sounds emphatic, and emphasis is easy to mistake for detail.",
    },
    {
      number: 7,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: false,
      key: "department's",
      noChange: "Without an apostrophe the word is a plain plural and shows no possession.",
      wrong: [
        ["departments'", "The plural possessive implies several departments sharing one rule."],
        ["departments's", "This form is standard for neither the singular nor the plural possessive."],
      ],
      why:
        "One department made the rule, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Ask how many departments the sentence names. One.",
        "Add apostrophe-s to form the singular possessive.",
      ],
      hint: "Decide the number of owners first; the apostrophe follows from that.",
      trap: "'Departments' is a perfectly ordinary word, so nothing about it looks misspelled.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-consequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "In effect,",
      noChange: "'Similarly' claims a likeness to the previous paragraph, which described a refusal.",
      wrong: [
        ["Nevertheless,", "Nothing is being conceded; the rule's effect follows directly from it."],
        ["Meanwhile,", "The effect did not run alongside the rule but resulted from it."],
      ],
      why:
        "Paragraph 3 ends with a rule about impassable roads. This paragraph says what that rule " +
        "amounted to, so the transition should signal an upshot.",
      steps: [
        "State the relationship: the rule produced the outcome described here.",
        "Choose the transition that marks an upshot rather than a likeness.",
      ],
      hint: "Say the relationship in your own words before you look at the options.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 9,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Wanting daily mail, a county had to grade its roads, build its culverts, and keep its bridges standing.",
      noChange: "The opening phrase describes a county, but the noun after the comma is 'roads.'",
      wrong: [
        [
          "Wanting daily mail, the grading of roads, culverts, and bridges fell to the county.",
          "The phrase now modifies 'the grading,' which cannot want anything.",
        ],
        [
          "Wanting daily mail, a county's roads had to be graded, its culverts built, and its bridges standing.",
          "The modifier is still stranded and the third item drops out of the pattern.",
        ],
      ],
      why:
        "An opening participial phrase attaches to the first noun after the comma. Counties want mail; " +
        "roads do not. Fixing it also puts the three obligations into one grammatical form.",
      steps: [
        "Ask who wants daily mail. A county does.",
        "Rewrite so 'a county' is the first noun after the comma, and keep the three verbs parallel.",
      ],
      hint: "Two things are wrong at once here — check the series as well as the opening phrase.",
      trap: "One choice repairs the modifier and quietly breaks the parallel series instead.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "imprecise-phrasing",
      difficulty: "Medium",
      keep: false,
      key: "made permanent",
      noChange: "'Made a real thing' is casual and names no actual administrative change.",
      wrong: [
        ["made official in a formal sense", "The phrase is longer and still does not say what changed."],
        ["fully established as something lasting", "The wording gestures at permanence instead of stating it."],
      ],
      why:
        "The sentence marks the moment an experiment became a standing service. 'Permanent' is the " +
        "exact word for that change and matches the dated, factual register around it.",
      steps: [
        "Ask what actually happened to the service in 1902.",
        "Choose the phrase that names it in one word.",
      ],
      hint: "The sentence pairs a date with a status change; the status needs a precise name.",
      trap: "The longer choices sound more formal while saying less than the short one.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural noun 'catalogs.'"],
        ["these", "The demonstrative points outward rather than back to a noun in the sentence."],
        ["those ones", "The phrase is nonstandard and adds nothing the pronoun does not carry."],
      ],
      why:
        "The pronoun refers to 'catalogs,' the plural noun in the first half of the sentence, so the " +
        "plural object pronoun is correct.",
      steps: [
        "Find what Sears and Montgomery Ward printed: catalogs.",
        "Match the pronoun to that noun in number.",
      ],
      hint: "Name the noun the pronoun replaces before checking its form.",
      trap: "'A farm' and 'a delivery route' are both singular and sit closer to the pronoun.",
    },
    {
      number: 12,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Montgomery " +
        "Ward had been founded in Chicago in 1872, two years before Sears was born.” Should the " +
        "writer make this addition?",
      key: "No, because the founding dates do not bear on what delivery changed for farms.",
      wrong: [
        [
          "Yes, because it establishes that mail-order retail existed before Rural Free Delivery.",
          "The paragraph's claim is about what delivery changed, not about which came first.",
        ],
        [
          "Yes, because it gives the reader necessary background on the two companies named.",
          "The companies need no background here; they appear only as the printers of catalogs.",
        ],
        [
          "No, because the essay has already explained how the two companies competed for sales.",
          "The essay never mentions competition between them, so the reason misdescribes it.",
        ],
      ],
      why:
        "The paragraph makes one point: a farm on a route could receive a catalog, and that changed " +
        "how it bought things. Corporate chronology does not advance that point.",
      steps: [
        "Say what the paragraph is establishing: the commercial effect of being on a route.",
        "Test the sentence against that purpose rather than against its own accuracy.",
      ],
      hint: "A true, well-written sentence can still be the wrong sentence for the paragraph.",
      trap: "The date is precise and verifiable, which makes it feel like exactly the right kind of detail.",
    },
    {
      number: 13,
      subskill: "dashes and parentheses",
      family: "paired-dashes",
      difficulty: "Hard",
      keep: true,
      wrong: [
        ["— for several million households,", "A dash cannot be closed by a comma; the pair must match."],
        ["(for several million households —", "A parenthesis and a dash are mismatched as an opening and closing."],
        [", for several million households,", "Commas here read as a list, blurring the aside into the sentence."],
      ],
      why:
        "The phrase interrupts the sentence and needs a matched pair of marks. Dashes are the pair " +
        "that keeps the interruption audible in a sentence already carrying commas elsewhere.",
      steps: [
        "Remove the interrupter and check the sentence still reads. It does.",
        "Confirm the marks on both sides are the same kind.",
      ],
      hint: "Whatever opens an interrupter has to close it.",
      trap: "Two choices punctuate one side correctly, so checking a single end passes them both.",
    },
    {
      number: 14,
      subskill: "style and tone",
      family: "understatement-in-a-historical-account",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["when anybody bothers to think about it at all,", "The casual dismissal breaks the essay's even, factual register."],
        ["in those instances where recollection occurs,", "The bureaucratic phrasing is stiffer than anything else in the essay."],
        ["and it hardly ever is,", "The interjection asserts a claim the essay has not established."],
      ],
      why:
        "The essay reports without editorializing — dates, rules, effects. The dry aside fits that " +
        "register and makes the closing point without raising its voice.",
      steps: [
        "Recall how the essay has been sounding: plain, dated, unemphatic.",
        "Keep the phrase that could sit in that voice unnoticed.",
      ],
      hint: "The right answer is the one that does not draw attention to the writer.",
      trap: "The wrong choices miss in three different directions, so ruling out one is not enough.",
    },
    {
      number: 15,
      subskill: "organization",
      family: "paragraph-move",
      difficulty: "Hard",
      stem:
        "The writer is considering moving Paragraph 4 so that it appears immediately after " +
        "Paragraph 5. Should the writer make this change?",
      key: "No, because the roads had to be built before the routes existed that made catalogs possible.",
      wrong: [
        [
          "No, because Paragraph 4 is the only paragraph in the essay that mentions specific years.",
          "Paragraph 2 also gives a year, so the stated reason is not accurate.",
        ],
        [
          "Yes, because both paragraphs describe consequences and belong together at the essay's end.",
          "Grouping the consequences would break the causal order the essay is built on.",
        ],
        [
          "Yes, because the commercial effect was larger and should therefore be presented first.",
          "The essay never ranks the effects, and size is not what orders this account.",
        ],
      ],
      why:
        "The essay runs on cause: the rule forced road work, road work created routes, routes made " +
        "mail-order retail possible. Paragraph 5 depends on Paragraph 4, so it cannot precede it.",
      steps: [
        "Trace the chain of cause through the essay's paragraphs in order.",
        "Ask whether Paragraph 5 could be true before Paragraph 4 had happened. It could not.",
      ],
      hint: "When paragraphs form a causal chain, their order is the argument.",
      trap: "Both effects really are effects, which makes grouping them sound like better organization.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a government program whose " +
        "largest consequences were ones it did not set out to produce. Would this essay accomplish " +
        "that goal?",
      key: "Yes, because a program meant to deliver mail ended up rebuilding roads and reshaping how farms bought goods.",
      wrong: [
        [
          "Yes, because the department's early cost estimates turned out to be far too high.",
          "The essay never says the estimates were wrong, only that the roads mattered more.",
        ],
        [
          "No, because the department deliberately used its rule to force counties to improve roads.",
          "The essay presents the rule as an operating requirement, not as a road policy in disguise.",
        ],
        [
          "No, because the essay concerns the growth of mail-order retail rather than the postal service.",
          "Retail is one of two consequences the essay traces, not the subject that displaces the rest.",
        ],
      ],
      why:
        "The department wanted to deliver mail. What it produced was graded roads, standing bridges, " +
        "and a national mail-order market — none of which were the point when it began.",
      steps: [
        "Name what the program set out to do, then list what the essay says it did.",
        "Keep the reason that names the gap between the two.",
      ],
      hint: "The last paragraph states the mismatch outright.",
      trap: "One wrong choice is a defensible reading of the rule and still answers the wrong question.",
    },
  ],
};
