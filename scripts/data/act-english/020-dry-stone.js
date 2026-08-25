"use strict";

module.exports = {
  id: "act-english-p020",
  type: "process-narrative",
  title: "Nothing in It Is Glued",
  content: `[1] A dry stone wall has no mortar in it. Nothing holds it together
but its own weight and the friction between one stone and the {1 next and walls}
built this way across Britain and Ireland {2 have} stood for three hundred
years.

[2] {3} The work starts below the ground. A trench {4 is dug} down to firm
subsoil, wide enough for two rows of foundation stones set side by {5 side, a
wall that settles unevenly is a wall} that comes apart. The largest stones go in
first, at the bottom, {6 where nobody will ever see them at any point}.

[3] Above the foundation the wall rises as two faces leaning slightly in toward
each other, and the gap between them is packed with small stones called
hearting. The hearting is not filler. It is what stops the two faces from
folding inward. {7 Packed loosely into the gap, a waller ends up with a wall
that will bulge within ten years.}

[4] {8 Similarly,} the rule governing every course is one over two and two over
one. Each stone bridges the joint beneath it, so that no vertical seam ever
{9 goes very far}. Each stone also goes in with its length pointing into the
wall rather than along the face, which is the opposite of what looks tidy from
outside.

[5] A waller does not force a stone. If a stone does not sit, {10 it} is the
wrong stone, and the answer is another stone rather than a hammer.
Through-stones long enough to reach across both faces are set at intervals to
tie the wall to {11 itself, a row of copestones on edge finishes} the top and
weights down everything beneath it.

[6] Nothing in it is glued. It is a heap of stones arranged carefully enough
that gravity holds it up.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "next, and walls",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["next; and walls", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["next, and, walls", "The second comma separates the conjunction from the subject that follows."],
      ],
      why:
        "'Nothing holds it together but its own weight and the friction' and 'walls built this way … " +
        "have stood for three hundred years' are both complete clauses.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "This sentence already contains one 'and' joining nouns; the second joins clauses.",
      trap: "The earlier 'and' in the same sentence correctly takes no comma, which sets an expectation.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-a-participial-phrase",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["has", "The singular verb has been matched to 'Ireland' rather than to the plural 'walls.'"],
        ["is", "The verb is singular and the tense drops the span 'for three hundred years' requires."],
        ["had", "The past perfect implies the standing ended at some earlier past moment."],
      ],
      why:
        "The subject is 'walls,' plural. 'Built this way across Britain and Ireland' is a participial " +
        "phrase describing it and cannot supply the verb's number.",
      steps: [
        "Strike the participial phrase and read 'walls … have stood.'",
        "Keep the plural verb that matches.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'Britain and Ireland' sits directly before the verb and reads as the subject.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "A wall held up by friction has to begin with something that will not move.",
      wrong: [
        [
          "Dry stone walling is recognised as a traditional craft in several countries.",
          "Official recognition of the craft is never taken up again anywhere in the essay.",
        ],
        [
          "Limestone and gritstone are the two materials most often used for these walls.",
          "The choice of stone is not what this paragraph goes on to describe.",
        ],
        [
          "There are a number of stages involved in building a wall of this kind.",
          "The vague promise of stages does not set up the specific one the paragraph explains.",
        ],
      ],
      why:
        "Paragraph 1 establishes that only weight and friction hold the wall together. This paragraph " +
        "explains the foundation, so the opening should link the two.",
      steps: [
        "Note what the previous paragraph establishes: nothing but friction holds it up.",
        "Choose the opening that makes the foundation follow from that.",
      ],
      hint: "The best opening makes the paragraph's subject feel like a consequence.",
      trap: "Every choice is true about dry stone walls, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-passive-for-a-standard-procedure",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was dug", "The past tense reports one trench instead of how every wall begins."],
        ["is being dug", "The progressive describes a single moment rather than standard practice."],
        ["has been dug", "The present perfect points at completed instances rather than a rule."],
      ],
      why:
        "The essay describes what happens whenever a wall is built, and the verbs around it are in " +
        "the simple present. That tense states standard practice.",
      steps: [
        "Check the tense of the nearby verbs: 'starts,' 'go,' 'comes.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A process narrative describes every performance at once.",
      trap: "The paragraph describes a physical job being done, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "side, because a wall that settles unevenly is a wall",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "side, and a wall that settles unevenly is a wall",
          "'And' repairs the splice but hides that the second clause is the reason for the first.",
        ],
        [
          "side; because a wall that settles unevenly is a wall",
          "A semicolon cannot precede a subordinating conjunction joining the clauses.",
        ],
      ],
      why:
        "The second clause explains why the trench must be that wide. 'Because' both repairs the " +
        "splice and states the relationship the sentence actually has.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the conjunction that names the relationship rather than merely adding.",
      ],
      hint: "Once you see the splice, ask what the second half is doing to the first.",
      trap: "'And' is the reflex fix and flattens a reason into a list.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "redundant-intensifier",
      difficulty: "Easy",
      keep: false,
      key: "where nobody will ever see them",
      noChange: "'At any point' repeats the sense that 'ever' has already supplied.",
      wrong: [
        ["where nobody will see them at any point", "Trading 'ever' for the longer phrase is no shorter."],
        ["where nobody is ever going to see them at all", "'At all' and the periphrastic future both add length only."],
      ],
      why:
        "'Ever' already covers all time. Adding a phrase that also covers all time strengthens " +
        "nothing and lengthens the clause.",
      steps: [
        "Notice that two phrases in the clause do the same job.",
        "Keep the single word.",
      ],
      hint: "Stacked time words usually mean one can go.",
      trap: "The doubled phrasing sounds emphatic, and emphasis reads as intention.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Packed loosely into the gap, the hearting produces a wall that will bulge within ten years.",
      noChange: "The opening phrase describes the hearting, but the noun after the comma is 'a waller.'",
      wrong: [
        [
          "Packing it loosely into the gap, a wall that will bulge within ten years is the result.",
          "The phrase now attaches to 'a wall,' which is not what does the packing.",
        ],
        [
          "Packed loosely into the gap, there will be a wall that bulges within ten years.",
          "The phrase attaches to the empty subject 'there,' which nothing can pack.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The hearting is what gets packed, so the hearting has to be that noun.",
      steps: [
        "Ask what is packed loosely into the gap. The hearting is.",
        "Rewrite so 'the hearting' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and check whether they match.",
      trap: "A waller really is the one doing the packing, which makes the sentence feel accurate.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-emphasis-transition",
      difficulty: "Medium",
      keep: false,
      key: "Above all,",
      noChange: "'Similarly' claims a likeness to the hearting, but this rule governs the whole wall.",
      wrong: [
        ["Consequently,", "The coursing rule is not caused by anything the previous paragraph states."],
        ["Meanwhile,", "The rule does not run alongside the hearting; it applies throughout."],
      ],
      why:
        "Paragraph 3 describes one component. This paragraph introduces the rule that governs every " +
        "course of the wall, so the transition should mark its greater weight.",
      steps: [
        "Ask whether this paragraph is parallel to the last one or larger than it.",
        "Choose the transition that marks emphasis.",
      ],
      hint: "The sentence says the rule governs 'every course,' which is a claim about scope.",
      trap: "'Similarly' fits the essay's list-like structure while asserting nothing.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-measure",
      difficulty: "Medium",
      keep: false,
      key: "runs up more than one course",
      noChange: "'Goes very far' gives no measure in a sentence that exists to state a limit.",
      wrong: [
        ["travels too great a distance", "The phrase is longer and states no limit either."],
        ["continues upward for very long", "The wording remains a gesture rather than a specification."],
      ],
      why:
        "The whole rule is a limit expressed in courses — one over two, two over one. The sentence " +
        "explaining it has to name that unit.",
      steps: [
        "Read the rule stated in the previous sentence and note its unit.",
        "Use that unit here.",
      ],
      hint: "The sentence before this one already tells you what the measure is.",
      trap: "'Goes very far' feels sufficient because the reader can infer the rest.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'a stone.'"],
        ["that", "The bare demonstrative points at the clause rather than at a noun."],
        ["the waller", "Naming the waller reverses the meaning, since the stone is what is wrong."],
      ],
      why:
        "The pronoun refers to 'a stone,' the singular subject of the clause immediately before it, " +
        "and the sentence is judging the stone rather than the person.",
      steps: [
        "Find the noun the pronoun stands for: a stone.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The clause before the comma names the antecedent.",
      trap: "The paragraph opens with 'A waller,' which is the more prominent noun nearby.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "itself; a row of copestones on edge finishes",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "itself: a row of copestones on edge finishes",
          "A colon introduces an explanation, but the second clause describes a separate step.",
        ],
        [
          "itself and a row of copestones on edge finishes",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and equally weighted — what the through-stones do, and what the " +
        "copestones do. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or sits beside it. It sits beside it.",
      ],
      hint: "Two finishing steps of equal importance want a mark that treats them equally.",
      trap: "The sentence is long, so the splice sits far from where the eye stops.",
    },
    {
      number: 12,
      subskill: "conclusions",
      family: "closing-paragraph-function",
      difficulty: "Hard",
      stem:
        "The writer is considering deleting the final paragraph. Should the paragraph be kept or " +
        "deleted?",
      key: "Kept, because it restates the essay's opening claim as something the reader has now been shown.",
      wrong: [
        [
          "Kept, because it introduces the idea that gravity is what holds the wall together.",
          "Paragraph 1 already says weight and friction are all that hold it, so nothing is new.",
        ],
        [
          "Deleted, because it repeats the point about mortar made in the essay's first sentence.",
          "Repeating it after the demonstration is what turns an assertion into a conclusion.",
        ],
        [
          "Deleted, because it describes the finished wall rather than any step in building it.",
          "A process narrative is entitled to end by describing what the process produced.",
        ],
      ],
      why:
        "The first sentence of the essay is a bare claim. After the foundation, the hearting, the " +
        "coursing rule and the copestones, the same claim reads as a result rather than an assertion.",
      steps: [
        "Compare the final paragraph with the essay's opening sentence.",
        "Ask what has changed in between that makes the repetition worth making.",
      ],
      hint: "Repetition can be the point when the reader now knows why it is true.",
      trap: "The paragraph genuinely does repeat, which is the usual reason to cut a closing.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a craft in which the most important work " +
        "is the part that cannot be seen in the finished object. Would this essay accomplish that " +
        "goal?",
      key: "Yes, because the foundation, the hearting, and the through-stones are all buried inside the finished wall.",
      wrong: [
        [
          "Yes, because the essay explains that a waller never forces a stone into place.",
          "That rule concerns technique rather than anything hidden inside the wall.",
        ],
        [
          "No, because the copestones and the two faces are the parts the essay describes at greatest length.",
          "The hidden components take three paragraphs and the visible ones take a few sentences.",
        ],
        [
          "No, because the essay states that the wall's strength comes from weight and friction.",
          "Weight and friction are exactly what the hidden components are arranged to produce.",
        ],
      ],
      why:
        "The largest stones go where nobody will see them, the hearting sits between the faces, and " +
        "the through-stones are inside the wall. Everything holding it up is out of sight.",
      steps: [
        "List the components the essay describes and mark which are visible in a finished wall.",
        "Keep the reason that names more than one hidden component.",
      ],
      hint: "Count how many of the described parts a passer-by could actually see.",
      trap: "One wrong choice cites a real rule from the essay that has nothing to do with visibility.",
    },
  ],
};
