"use strict";

module.exports = {
  id: "act-english-p029",
  type: "personal-essay",
  title: "The One Thing I Was Allowed to Quit",
  content: `[1] My family had one rule about {1 activities and it} was not
negotiable: you finish the season, the term, the year. You could decline to
start. You could not stop.

[2] {2} I {3 played} the cello for six years under that rule. I was not bad. I
was not good either, and the distance between those two {4 were} a thing I could
feel in my hands every Tuesday at four {5 o'clock, I sat} in a practice room
that smelled of radiator dust.

[3] What I remember is not the playing. It is the arithmetic. Six years times
two lessons a month times whatever the lessons cost, plus the rental, plus the
drive. I did that sum {6 often and did it many times}, and never once in front
of my mother. {7 Adding it up in my head on the drive home, the number was
something I never said out loud.}

[4] {8 Similarly,} in the spring of my junior year she asked me, in the car,
whether I wanted to keep going. The question itself was the {9 thing}. I said no
before I had decided anything, which is how I learned that {10 I} had decided.

[5] {11} She did not argue. She said the rule had been about not letting me quit
things {12 because they were hard, because they were boring, or because I was
losing}, and that this was not {13 that, she had been waiting a while} for me to
say so.

[6] I have not touched a cello since. I do not regret it. But I think about how
long I carried an argument I never had, and how the other side turned out to
have been ready the whole time.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "activities, and it",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["activities; and it", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["activities, and, it", "The second comma separates the conjunction from the subject that follows."],
      ],
      why:
        "'My family had one rule about activities' and 'it was not negotiable' are both complete " +
        "clauses, so the 'and' between them takes a comma.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "A comma goes before 'and' when a full sentence follows it.",
      trap: "The colon later in the sentence draws the eye away from the earlier join.",
    },
    {
      number: 2,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The rule was easy to keep until it was attached to something I was not going to be good at.",
      wrong: [
        [
          "My parents had both played instruments when they were in school themselves.",
          "The parents' own musical history is never taken up again anywhere in the essay.",
        ],
        [
          "Cellos are typically rented rather than purchased for students of that age.",
          "The rental arrangement appears later as a cost, not as this paragraph's subject.",
        ],
        [
          "There were several activities I took part in during those years.",
          "The vague plural promises a survey where the essay follows one instrument.",
        ],
      ],
      why:
        "Paragraph 1 states a rule in the abstract. This paragraph attaches it to six years of an " +
        "instrument, so the opening should make that attachment.",
      steps: [
        "Note what paragraph 1 leaves the reader with: a rule and no case.",
        "Choose the opening that supplies the case.",
      ],
      hint: "The best opening turns the previous paragraph's principle into this paragraph's problem.",
      trap: "The rental detail connects to a real sentence later and belongs in a different paragraph.",
    },
    {
      number: 3,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["have played", "The present perfect implies the playing continued into the present."],
        ["had played", "The past perfect places the six years before an earlier past never named."],
        ["was playing", "The progressive suggests one stretch rather than a completed span of years."],
      ],
      why:
        "The essay narrates a finished period in the simple past, and the closing paragraph says the " +
        "narrator has not touched a cello since.",
      steps: [
        "Check the tense of the verbs around it: 'was,' 'could feel.'",
        "Keep the simple past that matches them.",
      ],
      hint: "The last paragraph tells you the playing has stopped.",
      trap: "'Six years' is a span, which makes a perfect tense feel appropriate.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: false,
      key: "was",
      noChange: "The plural verb has been matched to 'those two' rather than to 'the distance.'",
      wrong: [
        ["are", "The verb is still plural and the present tense breaks the past-tense narration."],
        ["have been", "The plural present perfect misses both the number and the time frame."],
      ],
      why:
        "The subject is 'the distance,' singular. 'Between those two' is a prepositional phrase, and " +
        "the noun inside one is never the subject.",
      steps: [
        "Cross out 'between those two.'",
        "Read 'the distance … was' and match the verb.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'Those two' is plural and sits directly before the verb, which is where the ear listens.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "o'clock, sitting",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "o'clock, and I sat",
          "The conjunction repairs the splice but makes the sitting a second, separate event.",
        ],
        [
          "o'clock; I sat",
          "A semicolon repairs the splice and still separates the feeling from where it happened.",
        ],
      ],
      why:
        "The sitting is not a second action but the circumstance of the first. A participial phrase " +
        "attaches it to the clause it describes.",
      steps: [
        "Ask whether the second half is a new event or the setting of the first.",
        "Subordinate it rather than giving it equal weight.",
      ],
      hint: "The practice room is where the feeling happened, not something that happened next.",
      trap: "Both alternatives are grammatical, and only one keeps the sentence's meaning.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "often",
      noChange: "'Did it many times' repeats exactly what 'often' has already said.",
      wrong: [
        ["often and many times", "The two phrases still say the same thing in the same sentence."],
        ["many times and often did it", "Reversing the order keeps both halves of the repetition."],
      ],
      why:
        "'Often' already states frequency. The second clause adds no information about how often, " +
        "when, or why.",
      steps: [
        "Notice the two halves of the phrase mean the same thing.",
        "Keep the single word.",
      ],
      hint: "If a clause only restates an adverb, delete the clause.",
      trap: "The doubling gives the sentence a rhythm, which makes it feel deliberate.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Adding it up in my head on the drive home, I never said the number out loud.",
      noChange: "The opening phrase describes the narrator, but the noun after the comma is 'the number.'",
      wrong: [
        [
          "Adding it up in my head on the drive home, the number went unsaid.",
          "The phrase still attaches to 'the number,' which is not what does the adding.",
        ],
        [
          "Added up in my head on the drive home, I never said the number out loud.",
          "The passive participle now describes the narrator as the thing being added up.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The narrator does the adding, so the narrator has to be that noun.",
      steps: [
        "Ask who adds it up on the drive home. The narrator does.",
        "Rewrite so 'I' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence states something true about the number, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Then,",
      noChange: "'Similarly' claims a likeness, but this paragraph is the moment the situation changed.",
      wrong: [
        ["Consequently,", "The question in the car was not caused by the narrator's private arithmetic."],
        ["For instance,", "The conversation is not an example of the silence described before it."],
      ],
      why:
        "Paragraph 3 describes years of a sum kept private. This paragraph reports the day that ended, " +
        "so the transition should mark a point in time.",
      steps: [
        "Ask what this paragraph does to the situation in the last one: it ends it.",
        "Choose the transition that marks the moment.",
      ],
      hint: "The essay is a story, so its transitions are mostly about when.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Medium",
      keep: false,
      key: "surprise",
      noChange: "'The thing' names nothing in the sentence that turns the essay.",
      wrong: [
        ["main thing", "The added adjective still leaves the noun empty."],
        ["part that stood out", "The phrase is longer and no more specific than the original."],
      ],
      why:
        "The point is that the narrator expected an argument and got a question instead. Naming the " +
        "surprise is what makes the next sentence's answer make sense.",
      steps: [
        "Ask why the question mattered more than the answer.",
        "Use the noun that names the narrator's reaction.",
      ],
      hint: "The whole essay turns on the mother asking rather than insisting.",
      trap: "'The thing' is conversational, which can read as the essay's natural voice.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "subject-pronoun-case",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["me", "The object pronoun cannot serve as the subject of the clause 'had decided.'"],
        ["myself", "A reflexive needs a matching subject earlier in the same clause."],
        ["mine", "The possessive pronoun cannot function as the subject of a verb."],
      ],
      why:
        "The pronoun is the subject of 'had decided,' so it takes the subject form.",
      steps: [
        "Find the verb the pronoun governs: 'had decided.'",
        "Use the subject form of the pronoun.",
      ],
      hint: "Ask who did the deciding, then use the form that can be a subject.",
      trap: "The clause is buried at the end of a long sentence, which loosens the ear.",
    },
    {
      number: 11,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “The cello " +
        "went back to the rental shop on Grand Avenue the following Saturday.” Should the writer " +
        "make this addition?",
      key: "No, because the paragraph is about what she said, not about what happened to the instrument.",
      wrong: [
        [
          "Yes, because it confirms that the narrator really did stop playing the cello.",
          "The final paragraph already states that, and the paragraph is not about the outcome.",
        ],
        [
          "Yes, because the rental has already been mentioned as one of the costs involved.",
          "A detail can echo an earlier one and still interrupt the paragraph it lands in.",
        ],
        [
          "No, because the essay has not established where the family rented the instrument.",
          "Naming the shop is not what makes the sentence wrong here.",
        ],
      ],
      why:
        "This paragraph is the mother's answer and nothing else. A logistical detail about returning " +
        "the instrument moves the reader out of the conversation the essay has been building toward.",
      steps: [
        "Name what the paragraph is doing: reporting what she said.",
        "Test the sentence against that rather than against its accuracy.",
      ],
      hint: "Ask what the paragraph would lose by pausing for a Saturday errand.",
      trap: "The sentence ties back to a real earlier detail, which makes it feel connected.",
    },
    {
      number: 12,
      subskill: "parallelism",
      family: "parallel-clause-series",
      difficulty: "Medium",
      keep: true,
      wrong: [
        [
          "because they were hard, boring, or because I was losing",
          "The middle item drops the 'because' the other two carry.",
        ],
        [
          "because they were hard, because of boredom, or because I was losing",
          "The middle item becomes a prepositional phrase rather than a clause.",
        ],
        [
          "because they were hard, because they were boring, or losing",
          "The third item loses both its conjunction and its subject.",
        ],
      ],
      why:
        "Three reasons share the frame 'because they were,' and repeating it is what makes the " +
        "mother's list sound like a rule she had thought through.",
      steps: [
        "Read the three items and compare how each begins.",
        "Keep the version in which all three are full clauses.",
      ],
      hint: "In a series, compare the first word of each item before anything else.",
      trap: "Shortening the middle item reads as more economical and breaks the pattern.",
    },
    {
      number: 13,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "that; she had been waiting a while",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "that: she had been waiting a while",
          "A colon introduces an explanation, but the second clause is a separate admission.",
        ],
        [
          "that and she had been waiting a while",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The two clauses are complete and equally weighted — what the rule was not, and what she had " +
        "been doing meanwhile. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or stands beside it. It stands beside it.",
      ],
      hint: "The second clause is the essay's revelation; it should not be made subordinate.",
      trap: "The sentence is long, so the splice sits far from where the eye stops.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a conflict that existed only " +
        "on one side. Would this essay accomplish that goal?",
      key: "Yes, because the narrator spent years rehearsing an argument the mother turned out to have been waiting to have.",
      wrong: [
        [
          "Yes, because the family rule made no exception for activities the narrator disliked.",
          "The rule is the setting; the essay's point is that it was never applied the way the narrator assumed.",
        ],
        [
          "No, because the mother explains that the rule was intended for a different situation.",
          "Her explanation is what reveals the conflict was one-sided, not what disproves it.",
        ],
        [
          "No, because the narrator answers the question before having decided anything.",
          "Answering that fast is evidence the decision had been made privately long before.",
        ],
      ],
      why:
        "The closing says it outright: an argument carried for years and never had, with the other " +
        "side ready the whole time.",
      steps: [
        "Read the final sentence and name what it claims about the two sides.",
        "Keep the reason that names both the years of silence and her readiness.",
      ],
      hint: "The last sentence of the essay answers the question directly.",
      trap: "Two wrong choices cite accurate details and treat them as contradicting the goal.",
    },
  ],
};
