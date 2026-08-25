"use strict";

module.exports = {
  id: "act-english-p012",
  type: "process-narrative",
  title: "You Can Only Go Down",
  content: `[1] A bell is not one note. Struck {1 once it sounds} five distinct
tones at the same time, and whether the bell is any good depends entirely on how
those five stand in relation to one another.

[2] {2} Bell metal is bronze, roughly four parts copper to one part tin, which
{3 are} harder and more brittle than the bronze poured for statues. The mould
{4 is built} in two pieces: a core shaped like the inside of the bell, and an
outer shell shaped like the outside, with the gap between them set to the exact
thickness of the metal to come.

[3] The pour takes under a {5 minute, the cooling takes days:} a large bell
stays buried in its mould for {6 a period of time lasting most of a week}.
{7 Left buried that long, cracking is avoided by the slow cooling.} What comes
out is a bell that rings, and a bell that rings is not yet a bell that is in
tune.

[4] {8 Meanwhile,} the bell is laid on its side on a vertical boring machine. A
cutting tool takes metal off the inside, and where the tool cuts determines
which of the five tones {9 changes}. Metal off the waist lowers one
{10 partial, metal near the lip lowers another,} and the tuner works around the
inside a fraction of an inch at a time, striking the bell and listening to
{11 it} between passes.

[5] The constraint is absolute. Taking metal away can only lower a tone and
never raise one, so a bell is cast {12 thick, heavy, and deliberately sharp},
and every pass of the tool spends something that cannot be put back. A bell
tuned past its note is scrap. {13}

[6] The tuning takes longer than the casting. It is also the only part of the
work a listener ever hears.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-participle-comma",
      difficulty: "Easy",
      keep: false,
      key: "once, it sounds",
      noChange: "The introductory participial phrase runs into the main clause with no comma.",
      wrong: [
        ["once; it sounds", "A semicolon must join independent clauses, and 'Struck once' is not one."],
        ["once it sounds,", "The comma now falls after the subject and before its own verb."],
      ],
      why:
        "'Struck once' is a participial phrase opening the sentence. A comma marks where it ends and " +
        "the main clause begins.",
      steps: [
        "Find where the opening phrase stops: after 'once.'",
        "Place the comma there.",
      ],
      hint: "A phrase that opens a sentence and cannot stand alone is followed by a comma.",
      trap: "The phrase is only two words long, which makes punctuating it feel excessive.",
    },
    {
      number: 2,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Getting those five tones to agree begins long before the bell has a shape.",
      wrong: [
        [
          "Bronze has been used for casting bells in Europe for well over a thousand years.",
          "The history of the craft is never taken up again anywhere in the essay.",
        ],
        [
          "Foundries that still cast large bells are now rare in Britain and North America.",
          "The scarcity of foundries has no bearing on the process the paragraph describes.",
        ],
        [
          "There are a number of important considerations involved in producing a good bell.",
          "The vague plural promises a list, but the paragraph describes one continuous process.",
        ],
      ],
      why:
        "Paragraph 1 ends on the relationship among five tones. This paragraph starts the process " +
        "that produces them, so the opening should connect the two.",
      steps: [
        "Read the last sentence of paragraph 1 and name what it leaves open.",
        "Choose the opening that begins answering it.",
      ],
      hint: "The first paragraph poses a standard; the second should begin meeting it.",
      trap: "Every choice is true about bells, so subject matter alone cannot decide it.",
    },
    {
      number: 3,
      subskill: "subject-verb agreement",
      family: "relative-pronoun-agreement",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'parts' rather than to the alloy 'bronze.'",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense description."],
        ["have been", "The plural present perfect misses the number and reports a finished span."],
      ],
      why:
        "'Which' refers to bell metal, a single alloy, so the verb in the relative clause is " +
        "singular. The proportions between the commas only describe it.",
      steps: [
        "Ask what 'which' stands for. It stands for the bronze itself.",
        "Match the verb to that singular noun.",
      ],
      hint: "Decide what the relative pronoun refers to before you look at the verb.",
      trap: "'Four parts' and 'one part' sit closest to the verb and read as a plural subject.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-passive-for-a-standard-procedure",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was built", "The past tense reports one mould instead of how every mould is made."],
        ["is being built", "The progressive describes one moment rather than standard practice."],
        ["has been built", "The present perfect points at completed instances rather than a rule."],
      ],
      why:
        "The essay describes what happens every time a bell is cast. The simple present passive " +
        "states standard practice and keeps the mould as the subject.",
      steps: [
        "Check the tense of the verbs around it: 'is,' 'takes,' 'stays.' All simple present.",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A process narrative describes every performance at once, which the present tense does.",
      trap: "The sentence describes a physical object being made, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "minute. The cooling takes days:",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "minute, and the cooling takes days:",
          "The conjunction repairs the splice but flattens a contrast the sentence is drawing.",
        ],
        [
          "minute, the cooling taking days:",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The two clauses set a minute against a week, and the contrast lands hardest when they are " +
        "separate sentences. A period gives the second one its own weight.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the punctuation that keeps the contrast between them audible.",
      ],
      hint: "The sentence is built on an opposition; ask which mark preserves it.",
      trap: "'And' fixes the grammar and quietly turns a contrast into a list.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "wordy-time-phrase",
      difficulty: "Easy",
      keep: false,
      key: "most of a week",
      noChange: "'A period of time lasting' says nothing that 'most of a week' does not already say.",
      wrong: [
        ["a period lasting most of a week", "Shortening the frame leaves a frame that still adds nothing."],
        ["most of a week's worth of time", "'Worth of time' repeats what the unit 'week' already carries."],
      ],
      why:
        "A week is already a period of time. Any phrase announcing that a duration is a duration is " +
        "filler.",
      steps: [
        "Cross out every word that only tells you a length of time is a length of time.",
        "Keep what remains.",
      ],
      hint: "The unit itself supplies the category, so the category does not need stating.",
      trap: "The longer phrasing sounds careful, which is how filler survives revision.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "participle-with-a-passive-main-clause",
      difficulty: "Hard",
      keep: false,
      key: "Left buried that long, the bell cools slowly enough not to crack.",
      noChange: "The opening phrase describes the bell, but the noun after the comma is 'cracking.'",
      wrong: [
        [
          "Left buried that long, the slow cooling avoids cracking.",
          "The phrase now describes the cooling, which is not the thing left buried.",
        ],
        [
          "Leaving it buried that long, cracking is avoided by the slow cooling.",
          "Changing the participle leaves the main clause passive and the actor still missing.",
        ],
      ],
      why:
        "The passive main clause hides who is doing what. Naming the bell as the subject gives the " +
        "opening phrase something true to attach to.",
      steps: [
        "Ask what is left buried that long. The bell is.",
        "Rewrite the main clause so the bell is its subject.",
      ],
      hint: "When an opening phrase dangles, look for a passive verb hiding the actor.",
      trap: "The sentence states a true fact about cracking, so nothing sounds factually wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Only then",
      noChange: "'Meanwhile' says the tuning happens during the cooling, but it can only follow it.",
      wrong: [
        ["Similarly,", "Tuning is not like casting; the paragraph is describing the next stage."],
        ["Nevertheless,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "The bell cannot be cut until it is out of the mould and cool. The transition has to mark " +
        "that this stage waits on the last one.",
      steps: [
        "Ask whether this step can happen during the previous one. It cannot.",
        "Choose the transition that marks a step that had to wait.",
      ],
      hint: "The last paragraph ends with the bell coming out of the mould; this one starts after that.",
      trap: "'Meanwhile' is a natural process-narrative word and asserts exactly the wrong order.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "imprecise-verb",
      difficulty: "Medium",
      keep: false,
      key: "drops",
      noChange: "'Changes' allows a tone to rise, which the next paragraph says is impossible.",
      wrong: [
        ["is affected", "The passive phrasing is vaguer than the original it was meant to fix."],
        ["moves in pitch", "The phrase still leaves the direction of the movement unstated."],
      ],
      why:
        "Cutting metal can only lower a partial. The verb should say which way the tone goes, since " +
        "that one-way constraint is the essay's subject.",
      steps: [
        "Recall what removing metal can and cannot do to a tone.",
        "Choose the verb that names the direction.",
      ],
      hint: "The paragraph after this one tells you which verb is accurate.",
      trap: "'Changes' is true as far as it goes, and half-true verbs read as safely neutral.",
    },
    {
      number: 10,
      subskill: "semicolons and colons",
      family: "semicolons-in-a-series-with-commas",
      difficulty: "Hard",
      keep: false,
      key: "partial; metal near the lip lowers another;",
      noChange: "Two independent clauses are joined by commas inside a sentence already full of them.",
      wrong: [
        [
          "partial: metal near the lip lowers another,",
          "A colon introduces an explanation, but the second clause is a parallel example.",
        ],
        [
          "partial, and metal near the lip lowers another,",
          "The conjunction fixes the splice but buries the pairing among the sentence's other commas.",
        ],
      ],
      why:
        "The sentence carries three clauses and several internal commas. Semicolons separate the " +
        "paired clauses clearly, which commas at that level cannot do.",
      steps: [
        "Notice how many commas the sentence already contains.",
        "Raise the separation between the paired clauses to semicolons.",
      ],
      hint: "When a sentence is already crowded with commas, the next level of separation is a semicolon.",
      trap: "The comma version is grammatical once 'and' is added, and merely unreadable.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the singular noun 'the bell.'"],
        ["the tone", "Naming the tone changes the meaning, since the tuner listens to the whole bell."],
        ["this", "The bare demonstrative points at the clause rather than at a noun."],
      ],
      why:
        "The pronoun refers to 'the bell,' named in the same clause as the thing being struck, and " +
        "the singular object pronoun matches it.",
      steps: [
        "Find what the tuner strikes and then listens to: the bell.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The verb just before the pronoun names its antecedent.",
      trap: "'Passes' and 'tones' are both plural and nearby, which colors the ear.",
    },
    {
      number: 12,
      subskill: "parallelism",
      family: "parallel-adjective-series",
      difficulty: "Medium",
      keep: true,
      wrong: [
        [
          "thick, heavy, and with deliberate sharpness",
          "The third item becomes a prepositional phrase where the first two are adjectives.",
        ],
        [
          "thickly, heavy, and deliberately sharp",
          "The first item becomes an adverb and no longer describes the bell.",
        ],
        [
          "thick, with weight, and deliberately sharp",
          "The middle item switches to a phrase the others do not match.",
        ],
      ],
      why:
        "Three adjectives describe how the bell is cast, and all three have to be able to follow " +
        "'is cast' on their own.",
      steps: [
        "Read 'a bell is cast' into each of the three items in turn.",
        "Keep the version in which all three fit.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The adverb in one choice sounds more precise while describing the casting, not the bell.",
    },
    {
      number: 13,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the " +
        "paragraph's point that tuning is irreversible?",
      key: "A tuner who cuts too deep cannot add bronze back, and the bell goes to the furnace to be cast again.",
      wrong: [
        [
          "Large bells may take several days on the boring machine before they are finished.",
          "The time a bell spends being tuned is not what makes the cutting permanent.",
        ],
        [
          "Tuners often work from a set of tuning forks kept for that purpose in the foundry.",
          "How a tuner checks the pitch says nothing about whether a cut can be undone.",
        ],
        [
          "The five partials are known as the hum, prime, tierce, quint, and nominal.",
          "Naming the partials is useful background and does not bear on irreversibility.",
        ],
      ],
      why:
        "The paragraph says every pass spends something unrecoverable. The detail that supports it is " +
        "the one showing what happens when a cut goes too far.",
      steps: [
        "Name the claim: metal removed cannot be replaced.",
        "Keep the choice that shows the consequence of overshooting.",
      ],
      hint: "The support should describe a failure, because the claim is about a risk.",
      trap: "The list of partial names is the most technical choice and supports nothing here.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a craft in which the most demanding stage " +
        "is also the least visible. Would this essay accomplish that goal?",
      key: "Yes, because the tuning takes the longest, allows no mistakes, and is the only part a listener perceives as sound.",
      wrong: [
        [
          "Yes, because the essay explains that bell metal is harder and more brittle than statue bronze.",
          "The alloy is background; it is neither the most demanding stage nor an invisible one.",
        ],
        [
          "No, because the casting is described in more detail than the tuning is.",
          "The tuning occupies two paragraphs and the casting one, so the comparison is backwards.",
        ],
        [
          "No, because a listener plainly hears the bell, which makes the tuning entirely visible.",
          "Hearing the result is not the same as seeing the work that produced it.",
        ],
      ],
      why:
        "The last paragraph states both halves outright: tuning takes longer than casting, and it is " +
        "the only part of the work a listener ever encounters.",
      steps: [
        "Read the final paragraph and note the two claims it makes.",
        "Keep the reason that matches both halves of the stated goal.",
      ],
      hint: "The goal has two parts, so the correct reason has to cover both.",
      trap: "One wrong choice turns on a real distinction between hearing a result and seeing the work.",
    },
  ],
};
