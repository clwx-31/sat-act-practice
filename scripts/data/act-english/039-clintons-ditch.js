"use strict";

module.exports = {
  id: "act-english-p039",
  type: "historical-account",
  title: "Clinton's Ditch",
  content: `[1] The proposal was to dig a channel three hundred and sixty-three
miles long across the state of New York, from the Hudson River to Lake Erie,
through forest and swamp and a rise of nearly six hundred {1 feet it} was widely
considered ridiculous. Thomas Jefferson {2 called} it little short of madness.

[2] {3} The state built it anyway, beginning in 1817 and finishing in 1825.
There {4 was} eighty-three locks along its length, each one a masonry chamber
raising or lowering a boat by a fixed {5 amount, the whole system was designed
and supervised by men who had never built a canal}.

[3] What the canal did to freight is the part that settled the argument. Moving
a ton of goods from Buffalo to New York City had cost about a hundred dollars
and taken three weeks. By 1830 it cost under ten and took {6 eight days and a
little over a week}. {7 Cut by nine tenths in a single decade, merchants
reorganised their entire trade around the new figure.}

[4] {8 Similarly,} the consequences ran further than freight. Wheat from Ohio
could now reach a seaport, which made western farmland worth {9 clearing, New York
overtook Philadelphia and Boston} as the country's busiest port and {10 stayed
that way}. Towns along the route grew into cities, and {11 they} exist today
largely where the locks were.

[5] {12} The canal was called Clinton's Ditch while it was being dug, after the
governor who staked his career on it. The name was meant to {13 mock him,
diminish the project, and warn other politicians away}. It is now the name of a
state historic corridor.

[6] Nothing about the engineering was clever by later standards. What was
unusual was that a government spent seven million dollars on an argument it
could not win in advance.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "feet. It",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["feet, it", "Adding a comma turns the run-on into a comma splice."],
        ["feet it,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'The proposal was to dig a channel … a rise of nearly six hundred feet' and 'It was widely " +
        "considered ridiculous' are both complete sentences.",
      steps: [
        "Find where the first complete thought ends: after 'feet.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "The sentence is long, so read to the end of the first idea before deciding.",
      trap: "The opening clause is so long that the join arrives after the reader has lost the thread.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["calls", "The present tense contradicts a judgement made two centuries ago."],
        ["had called", "The past perfect places the remark before an earlier past that is never named."],
        ["was calling", "The progressive suggests a repeated habit rather than a recorded judgement."],
      ],
      why:
        "The sentence reports a completed remark from the period the paragraph describes, and the " +
        "simple past is the tense a historical account uses for it.",
      steps: [
        "Ask when the remark was made: before the canal was built.",
        "Keep the simple past that reports it.",
      ],
      hint: "The whole paragraph is set before 1817.",
      trap: "The remark is still quoted today, which invites a present tense.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The objection was never that it could not be dug, only that it could not be worth it.",
      wrong: [
        [
          "New York was already the most populous state in the union by that decade.",
          "The state's population is never taken up again anywhere in the essay.",
        ],
        [
          "Canal building had been under way in Britain for the better part of a century.",
          "British canals are background the paragraph does not draw on.",
        ],
        [
          "There were a number of reasons the project attracted criticism at the time.",
          "The vague plural promises a list where the paragraph turns to construction.",
        ],
      ],
      why:
        "Paragraph 1 records ridicule. This paragraph says the state built it regardless, so the " +
        "opening should sharpen what the ridicule was actually about.",
      steps: [
        "Note what paragraph 1 establishes: the plan was considered absurd.",
        "Choose the opening that defines the objection before it is overruled.",
      ],
      hint: "The paragraph moves from doubt to construction; the opening should pivot.",
      trap: "Every choice is true about the period, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "expletive-there-agreement",
      difficulty: "Easy",
      keep: false,
      key: "were",
      noChange: "With 'there' as the placeholder, the verb agrees with the plural noun that follows.",
      wrong: [
        ["is", "The verb is still singular and the present tense breaks the historical narration."],
        ["has been", "The singular present perfect misses both the number and the time frame."],
      ],
      why:
        "In a sentence beginning 'There,' the real subject comes after the verb. Here it is " +
        "'eighty-three locks,' which is plural.",
      steps: [
        "Look past the verb for the real subject: 'eighty-three locks.'",
        "Match the verb to that plural.",
      ],
      hint: "'There' is never the subject; find the noun after the verb.",
      trap: "'There was' is so common in speech that it sounds right before any subject at all.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "amount. The whole system was designed and supervised by men who had never built a canal",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "amount, and the whole system was designed and supervised by men who had never built a canal",
          "'And' repairs the splice but buries the paragraph's most surprising fact inside a long sentence.",
        ],
        [
          "amount, the whole system being designed and supervised by men who had never built a canal",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The sentence has already described the locks in detail. The fact about the engineers is the " +
        "paragraph's point and deserves a sentence of its own.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Ask which half carries the paragraph's weight, and give it room.",
      ],
      hint: "The second clause is the one a reader will remember.",
      trap: "'And' fixes the grammar and flattens a revelation into a detail.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-measure",
      difficulty: "Easy",
      keep: false,
      key: "eight days",
      noChange: "'A little over a week' restates 'eight days' less precisely.",
      wrong: [
        ["a little over a week", "The vaguer phrase replaces a figure the sentence has already given."],
        ["eight days, just over a week", "Both measures remain and the second adds nothing."],
      ],
      why:
        "The sentence is a comparison of exact figures — a hundred dollars against ten, three weeks " +
        "against eight days. A second, looser statement of the same span weakens it.",
      steps: [
        "Notice the sentence is built on precise numbers.",
        "Keep the precise one and cut the paraphrase.",
      ],
      hint: "The other three figures in the comparison are exact.",
      trap: "The paraphrase feels helpful, as though the reader needed the conversion.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Cut by nine tenths in a single decade, the cost of freight forced merchants to reorganise their entire trade.",
      noChange: "The opening phrase describes the cost, but the noun after the comma is 'merchants.'",
      wrong: [
        [
          "Cutting by nine tenths in a single decade, merchants reorganised their entire trade around the new figure.",
          "The active form makes the merchants the thing being cut.",
        ],
        [
          "Cut by nine tenths in a single decade, the entire trade was reorganised around the new figure.",
          "The phrase now describes 'the entire trade,' which was reorganised rather than cut.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The freight cost was cut; the merchants responded to it.",
      steps: [
        "Ask what was cut by nine tenths. The cost was.",
        "Rewrite so 'the cost of freight' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence states something true about merchants, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-escalation-transition",
      difficulty: "Medium",
      keep: false,
      key: "The effects went further than that:",
      noChange: "'Similarly' claims a likeness, but this paragraph widens the argument beyond freight.",
      wrong: [
        ["Consequently,", "The wider consequences did not follow from freight rates alone."],
        ["Nevertheless,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 3 settles the argument on cost. This paragraph shows the canal reshaping farmland, " +
        "ports and cities, so the transition should mark the widening.",
      steps: [
        "Ask whether this paragraph repeats the last one or extends it.",
        "Choose the option that marks the extension.",
      ],
      hint: "The paragraph's first sentence says the consequences ran further.",
      trap: "'Similarly' fits the essay's list of effects while asserting nothing.",
    },
    {
      number: 9,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "clearing; New York overtook Philadelphia and Boston",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "clearing: New York overtook Philadelphia and Boston",
          "A colon introduces an explanation, but the second clause reports a separate consequence.",
        ],
        [
          "clearing and New York overtook Philadelphia and Boston",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The paragraph lists consequences of equal weight — farmland becoming worth clearing, and a " +
        "port overtaking its rivals. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or stands beside it. It stands beside it.",
      ],
      hint: "The paragraph is a list of effects, not a chain of causes.",
      trap: "The consequences really are connected, which makes a colon feel earned.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-phrase",
      difficulty: "Medium",
      keep: false,
      key: "has never lost the position since",
      noChange: "'Stayed that way' is vague about a claim the sentence is making across two centuries.",
      wrong: [
        ["kept it up", "The phrase is more casual and just as unspecific as the original."],
        ["remained in that general condition", "The wording is longer and hedges the claim rather than stating it."],
      ],
      why:
        "The essay is precise about figures and dates. A claim that reaches to the present should be " +
        "stated as one rather than gestured at.",
      steps: [
        "Ask how long the essay means the position lasted.",
        "State that span rather than pointing at it.",
      ],
      hint: "The essay's other claims all carry a number or a date.",
      trap: "'Stayed that way' is idiomatic and reads as a natural close.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural noun 'Towns.'"],
        ["these ones", "The phrase is nonstandard and adds nothing the pronoun does not carry."],
        ["the locks", "Naming the locks reverses the sentence, since it is the towns that still exist."],
      ],
      why:
        "The pronoun refers to 'Towns along the route,' the plural subject of the clause before it.",
      steps: [
        "Find what still exists today: the towns.",
        "Match the pronoun to that plural.",
      ],
      hint: "The subject of the first clause is the antecedent.",
      trap: "'The locks' appears at the end of the sentence and is the more concrete noun.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the " +
        "paragraph's point about the name?",
      key: "It appeared in newspapers years before the first boat, and it was not meant kindly.",
      wrong: [
        [
          "DeWitt Clinton served as governor of New York for most of the canal's construction.",
          "His tenure explains whose name it was, not what calling it that was meant to do.",
        ],
        [
          "The canal was widened and deepened several times over the following century.",
          "Later enlargement has no bearing on how the project was spoken of at the time.",
        ],
        [
          "Clinton had also served as mayor of New York City earlier in his career.",
          "His earlier office is biography rather than evidence about the nickname.",
        ],
      ],
      why:
        "The paragraph turns on a mocking name outlasting the mockery. The support has to establish " +
        "that the name was an insult before it was a landmark.",
      steps: [
        "Name what the paragraph is doing: tracking a nickname from insult to honour.",
        "Keep the choice that establishes the insult.",
      ],
      hint: "The paragraph's last sentence is the reversal; the support should set up what reversed.",
      trap: "Every choice is a true fact about Clinton or the canal.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "mock him, diminishing the project, and warn other politicians away",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "mock him, diminish the project, and other politicians were to be warned away",
          "The third item becomes a passive clause with a different subject.",
        ],
        [
          "mocking him, diminish the project, and warn other politicians away",
          "The first item breaks the pattern the other two establish.",
        ],
      ],
      why:
        "Three infinitives share 'was meant to,' and each has to be able to follow that phrase on its " +
        "own for the series to hold.",
      steps: [
        "Read 'The name was meant to' into each of the three items.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three purposes escalate, which makes varying the last one feel like emphasis.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a decision that could only be " +
        "judged after it was made. Would this essay accomplish that goal?",
      key: "Yes, because it closes on a government spending seven million dollars on an argument it could not win in advance.",
      wrong: [
        [
          "Yes, because Thomas Jefferson described the proposal as little short of madness.",
          "Jefferson's judgement is the doubt being described, not the essay's point about deciding.",
        ],
        [
          "No, because the essay states that the engineering involved was not especially clever.",
          "The closing raises that only to locate the achievement somewhere else.",
        ],
        [
          "No, because the freight figures show clearly that the canal was worth building.",
          "Those figures existed only after 1825, which is exactly what the essay is saying.",
        ],
      ],
      why:
        "The evidence that settled the argument — a hundred dollars a ton falling to ten — could not " +
        "exist until the canal did. The last sentence names that as the unusual thing.",
      steps: [
        "Ask when the decisive evidence became available.",
        "Keep the reason that names the decision rather than the outcome.",
      ],
      hint: "The essay's final sentence states its subject outright.",
      trap: "One wrong choice cites the essay's own evidence as though it had been available earlier.",
    },
  ],
};
