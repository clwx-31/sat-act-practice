"use strict";

module.exports = {
  id: "act-english-p024",
  type: "process-narrative",
  title: "With the Grain",
  content: `[1] A sheet of paper has a grain. The fibres in it {1 lie} mostly one
{2 way laid down} when the sheet was made, and paper folds cleanly along the
grain and badly across it. Everything else in bookbinding follows from that.

[2] {3} The sheets {4 are folded} into signatures, usually four nested together
to make sixteen pages. The grain has to run head to tail, parallel to the spine.
A book gathered against the grain will not lie {5 open, the pages cockle} in
damp weather, and no amount of care later in the process will correct it.

[3] The signatures are sewn onto tapes. A needle goes in at one station and out
at the next, catching the tape as it passes, so that every signature is tied to
every other through the tapes rather than {6 to its neighbours alone and only to
them}. {7 Brushed on afterward, the work glue does is much less than people
assume.}

[4] {8 Similarly,} the spine is rounded and backed. Rounding gives it a convex
{9 curve, backing splays the outermost signatures} outward with a hammer to
{10 make a thing} on each side. The shoulder is what the boards sit against, and
{11 it} is the reason a well-bound book opens flat instead of springing shut.

[5] {12} The case is built separately: two boards and a strip of card, covered
in cloth. Only at the very end are the {13 books} two halves brought together,
the endpapers pasted down, and the whole thing put under a press overnight.

[6] Nothing in the sequence can be done out of order. The grain decides the
fold, the fold decides the sewing, and the sewing decides whether the thing will
open at all.`,
  questions: [
    {
      number: 1,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["lies", "The singular verb has been matched to 'it' rather than to the plural 'fibres.'"],
        ["is lying", "The singular progressive misses the number and describes a moment, not a property."],
        ["has lain", "The present perfect reports a completed settling rather than a standing fact."],
      ],
      why:
        "The subject is 'The fibres,' which is plural. 'In it' is a prepositional phrase, and the " +
        "noun inside one is never the subject.",
      steps: [
        "Cross out 'in it' and read 'The fibres … lie.'",
        "Keep the plural verb that matches.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'It' sits directly before the verb and is singular, which is where the ear listens.",
    },
    {
      number: 2,
      subskill: "commas",
      family: "comma-before-a-participial-phrase",
      difficulty: "Easy",
      keep: false,
      key: "way, laid down",
      noChange: "The participial phrase describing the fibres needs a comma to separate it.",
      wrong: [
        ["way; laid down", "A semicolon must join independent clauses, and the phrase is not one."],
        ["way, laid down,", "The second comma cuts the phrase off from the time clause it governs."],
      ],
      why:
        "'Laid down when the sheet was made' modifies the fibres rather than continuing the main " +
        "clause, so a comma marks where the main clause ends.",
      steps: [
        "Find where the main clause finishes: after 'one way.'",
        "Place a single comma there.",
      ],
      hint: "A trailing participial phrase is set off from the clause it follows.",
      trap: "The sentence runs on smoothly, so no break announces itself.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The first decision a binder makes is the one that cannot be revisited.",
      wrong: [
        [
          "Papermaking by machine became widespread in Europe during the nineteenth century.",
          "The history of papermaking is never taken up again anywhere in the essay.",
        ],
        [
          "Signatures may contain anywhere from one to six sheets depending on the paper.",
          "A variation in signature size is a detail the paragraph does not go on to use.",
        ],
        [
          "There are several considerations that a binder must keep in mind at this stage.",
          "The vague plural promises a list where the paragraph explains one irreversible choice.",
        ],
      ],
      why:
        "Paragraph 1 ends by saying everything follows from the grain. This paragraph is about the " +
        "fold that commits to it, so the opening should mark that it cannot be undone.",
      steps: [
        "Note what paragraph 1 claims: the grain governs everything after it.",
        "Choose the opening that makes this paragraph the first consequence.",
      ],
      hint: "The paragraph ends on 'no amount of care later will correct it'; the opening should agree.",
      trap: "Every choice is true about bookbinding, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-passive-for-a-standard-procedure",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["were folded", "The past tense reports one book instead of how every book is made."],
        ["are being folded", "The progressive describes a single moment rather than standard practice."],
        ["have been folded", "The present perfect points at completed instances rather than a rule."],
      ],
      why:
        "The essay describes what happens whenever a book is bound, and the verbs around it are in " +
        "the simple present. That tense states standard practice.",
      steps: [
        "Check the tense of the nearby verbs: 'has,' 'will not lie,' 'are sewn.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A process narrative describes every performance at once.",
      trap: "The paragraph describes physical work being done, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "open, and the pages cockle",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "open, the pages cockling",
          "The participle leaves the second clause without a main verb of its own.",
        ],
        [
          "open; and the pages cockle",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "The sentence lists three consequences joined by 'and' at the end, so the first two have to " +
        "be joined the same way for the series to hold.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Match the joining used later in the same sentence.",
      ],
      hint: "Look at how the third item in this sentence is attached, then match it.",
      trap: "The sentence is long enough that the splice sits far from the 'and' that fixes it.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "stacked-redundancy",
      difficulty: "Easy",
      keep: false,
      key: "to its neighbours alone",
      noChange: "'And only to them' repeats exactly what 'alone' has already said.",
      wrong: [
        ["to its neighbours and only to them", "'Only to them' now carries the sense 'alone' carried more briefly."],
        ["to only its neighbours alone", "Two limiting words remain where the sentence needs one."],
      ],
      why:
        "'Alone' already restricts the attachment to the neighbouring signatures. Any further phrase " +
        "restricting it to the same thing adds length without meaning.",
      steps: [
        "Notice the two halves of the phrase impose the same restriction.",
        "Keep the shorter one.",
      ],
      hint: "Stacked limiting words usually mean one can go.",
      trap: "The doubled phrasing sounds emphatic, which is how redundancy survives revision.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Brushed on afterward, the glue does much less work than people assume.",
      noChange: "The opening phrase describes the glue, but the noun after the comma is 'the work.'",
      wrong: [
        [
          "Brushing on afterward, the glue does much less work than people assume.",
          "The active form makes the glue do the brushing to itself.",
        ],
        [
          "Brushed on afterward, much less work is done by the glue than people assume.",
          "The phrase now describes 'work,' which is not what gets brushed on.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The glue is what is brushed on, so the glue has to be that noun.",
      steps: [
        "Ask what is brushed on afterward. The glue is.",
        "Rewrite so 'the glue' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The original states a true fact about the glue, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Next,",
      noChange: "'Similarly' claims a likeness, but this paragraph is the following step in the sequence.",
      wrong: [
        ["Consequently,", "Rounding is not caused by the sewing; it is simply what happens after it."],
        ["Even so,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "The essay walks through the binding in order, and this paragraph takes the next step. The " +
        "transition should mark sequence rather than resemblance.",
      steps: [
        "Ask where this paragraph falls in the process.",
        "Choose the transition that marks the next stage.",
      ],
      hint: "The essay is organised by order of operations, so its transitions mostly count.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 9,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "curve; backing splays the outermost signatures",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "curve: backing splays the outermost signatures",
          "A colon introduces an explanation, but the second clause describes a separate operation.",
        ],
        [
          "curve and backing splays the outermost signatures",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The sentence defines two operations in parallel — what rounding does and what backing does. " +
        "A semicolon joins equals and keeps the pairing visible.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or matches it. It matches.",
      ],
      hint: "The sentence names two operations that were introduced together.",
      trap: "The clauses are short, which makes a comma feel sufficient.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Medium",
      keep: false,
      key: "form a shoulder",
      noChange: "'Make a thing' names nothing, and the next sentence depends on the name.",
      wrong: [
        ["create a sort of ridge", "The hedged phrasing still withholds the term the next sentence uses."],
        ["produce a raised area", "The description is longer and does not supply the noun that follows."],
      ],
      why:
        "The next sentence begins 'The shoulder,' so this sentence has to introduce that noun. " +
        "Without it the definite article points at nothing.",
      steps: [
        "Read the first words of the following sentence.",
        "Supply the noun it refers back to.",
      ],
      hint: "The sentence after this one tells you the word.",
      trap: "'A thing' reads as informal shorthand rather than as a missing definition.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'The shoulder.'"],
        ["this", "The bare demonstrative points at the clause rather than at a noun."],
        ["the boards", "Naming the boards reverses the claim, since the shoulder is what makes it work."],
      ],
      why:
        "The pronoun refers to 'The shoulder,' the singular subject of the sentence, and the sentence " +
        "is crediting the shoulder rather than the boards.",
      steps: [
        "Find the subject of the sentence: the shoulder.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The subject of the first clause is the antecedent.",
      trap: "'Boards' is plural and sits immediately before the pronoun.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "point that the book block and the case are made independently?",
      key: "A binder can have a finished case sitting on the bench for weeks before the block that goes in it exists.",
      wrong: [
        [
          "Bookcloth is usually a woven fabric backed with paper or starch filling.",
          "The composition of the covering material says nothing about the order of work.",
        ],
        [
          "Boards are cut slightly larger than the pages so that they overhang on three sides.",
          "The overhang is a dimension rather than evidence of separate construction.",
        ],
        [
          "Casing-in is the term binders use for joining the two halves together.",
          "Naming the step restates the sentence that follows instead of supporting the claim.",
        ],
      ],
      why:
        "The paragraph's claim is that the case is built separately. The detail that supports it is " +
        "the one showing the two halves need not exist at the same time.",
      steps: [
        "Name the claim: the case is made on its own, apart from the book.",
        "Keep the choice that demonstrates the independence rather than describing the case.",
      ],
      hint: "The support has to be about timing, since the claim is about separateness.",
      trap: "The casing-in choice uses the right vocabulary and merely renames the next sentence.",
    },
    {
      number: 13,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: false,
      key: "book's",
      noChange: "The bare plural shows no possession, so the halves belong to nothing.",
      wrong: [
        ["books'", "The plural possessive implies several books sharing one pair of halves."],
        ["books's", "The form is standard for neither the singular nor the plural possessive."],
      ],
      why:
        "One book owns the two halves, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Ask how many books the sentence describes. One.",
        "Add apostrophe-s to form the singular possessive.",
      ],
      hint: "Decide the number of owners before placing the apostrophe.",
      trap: "'Two halves' immediately after makes a plural feel correct.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a process in which an early, invisible " +
        "decision determines whether the finished object works. Would this essay accomplish that " +
        "goal?",
      key: "Yes, because the grain direction is chosen at the fold, is invisible in a bound book, and decides whether it opens.",
      wrong: [
        [
          "Yes, because the case is constructed separately from the sewn book block.",
          "Separate construction is a fact about sequence, not about an invisible early decision.",
        ],
        [
          "No, because the essay states that glue does much less work than people assume.",
          "That correction concerns a later step and does not bear on the grain at all.",
        ],
        [
          "No, because rounding and backing are described as the steps that make a book open flat.",
          "Those steps depend on signatures already folded with the grain running correctly.",
        ],
      ],
      why:
        "The grain is set before anything is sewn, cannot be seen once the book is bound, and the " +
        "closing sentence makes it the first term in the chain that ends in whether the book opens.",
      steps: [
        "Find the decision the essay says cannot be corrected later.",
        "Keep the reason that names it and connects it to the finished book.",
      ],
      hint: "The last sentence of the essay states the chain in order.",
      trap: "One wrong choice cites the essay's other memorable claim, which is about a later step.",
    },
  ],
};
