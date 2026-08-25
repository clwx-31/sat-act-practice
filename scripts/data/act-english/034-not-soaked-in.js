"use strict";

module.exports = {
  id: "act-english-p034",
  type: "informative-essay",
  title: "Not Soaked In",
  content: `[1] A well-used cast iron pan is black and slick, and the usual
explanation is that decades of oil have soaked into the {1 metal the}
explanation is wrong. Iron {2 is} not porous in any way that would let that
happen.

[2] {3} What sits on the surface of a seasoned pan is not oil. It {4 was}
plastic, or near enough. Heated past its smoke point, a fat begins to break
apart, and the fragments link to one another and to the iron, forming a hard
film chemically bonded to the {5 pan, this process is called polymerisation}.

[3] Two consequences follow. The first is that thin coats {6 work better and are
more effective} than thick ones. A thick layer cannot cross-link all the way
through: the outside hardens, the inside stays soft, and the surface comes away
in sticky patches. {7 Wiped on until the pan looks almost dry, the film builds
in layers a molecule or two deep.}

[4] {8 Similarly,} the second consequence is that the film is far tougher than
most people treat it as being. Modern dish soap is a {9 thing that removes
grease}; polymerised seasoning is not grease. The lye soaps that could strip a
pan {10 went out of circulation ages ago}.

[5] What does destroy seasoning is standing water, because the film is not
continuous and iron rusts underneath {11 it}. A pan washed and dried at once is
{12 fine, a pan left wet in the sink overnight is a repair job}. {13}

[6] The instruction that gets passed down — never use soap — is a sound rule
attached to the wrong reason. {14} It survives because it works, and it works
because the people who avoid soap also {15 dry the pan, put it back on the heat,
and wipe it with oil}. The soap was never the point.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "metal. The",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["metal, the", "Adding a comma turns the run-on into a comma splice."],
        ["metal the,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'A well-used cast iron pan is black … soaked into the metal' and 'The explanation is wrong' " +
        "are both complete sentences, and nothing joins them.",
      steps: [
        "Find where the first complete thought ends: after 'metal.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "Read to the end of the first idea and check whether a new subject follows.",
      trap: "The sentence is long enough that the join passes without a pause.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "mass-noun-subject",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["are", "The plural verb does not agree with the singular mass noun 'Iron.'"],
        ["were", "The verb is plural and the past tense breaks the present-tense claim."],
        ["have been", "The plural present perfect misses both the number and the standing fact."],
      ],
      why:
        "'Iron' is a mass noun and takes singular agreement, and the sentence states a property that " +
        "holds now.",
      steps: [
        "Identify the subject: 'Iron.'",
        "Keep the singular present-tense verb.",
      ],
      hint: "A material named as a substance is singular however much of it there is.",
      trap: "The long phrase after the verb loosens the ear before the agreement is settled.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The black layer is real; only the account of how it got there is mistaken.",
      wrong: [
        [
          "Cast iron cookware has been produced industrially since the eighteenth century.",
          "The history of the cookware is never taken up again anywhere in the essay.",
        ],
        [
          "Most modern pans are sold pre-seasoned by the manufacturer before shipping.",
          "How pans arrive from a factory is not what this paragraph goes on to explain.",
        ],
        [
          "There are several misconceptions people hold about caring for cast iron.",
          "The vague plural promises a list where the paragraph explains one mechanism.",
        ],
      ],
      why:
        "Paragraph 1 rejects the common explanation without denying what people see. This paragraph " +
        "supplies the right account, so the opening should separate the observation from the story.",
      steps: [
        "Note what paragraph 1 rejects and what it leaves standing.",
        "Choose the opening that keeps the observation and replaces the explanation.",
      ],
      hint: "The paragraph is a correction, so its first sentence should say what is being corrected.",
      trap: "Every choice is true about cast iron, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: false,
      key: "is",
      noChange: "The past tense would confine a permanent property of the film to some earlier time.",
      wrong: [
        ["has been", "The present perfect implies a span that began and might end."],
        ["is being", "The progressive suggests a temporary state rather than what the film is."],
      ],
      why:
        "The sentence states what the surface layer is, always, and the paragraph uses the simple " +
        "present throughout.",
      steps: [
        "Check the tense of the verbs nearby: 'sits,' 'begins,' 'link.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A material property does not belong to any particular time.",
      trap: "The sentence corrects a claim about the past, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "pan. This process is called polymerisation",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "pan, and this process is called polymerisation",
          "The conjunction repairs the splice but hangs the definition off an already long sentence.",
        ],
        [
          "pan, the process being called polymerisation",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The first clause has already run through three stages of a process. Naming that process " +
        "deserves its own sentence rather than a fourth clause.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Count the clauses already in the first half before deciding where the name belongs.",
      ],
      hint: "The sentence is long before the comma arrives.",
      trap: "'And' fixes the grammar and produces a sentence with five clauses.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "work better",
      noChange: "'Are more effective' repeats what 'work better' has already said.",
      wrong: [
        ["are more effective", "The phrasing is longer than the two words it replaces and means the same."],
        ["work better and more effectively", "The adverb restates the comparison the verb already carries."],
      ],
      why:
        "Both halves make the same comparison, and the sentence that follows explains why it holds.",
      steps: [
        "Notice the two halves mean the same thing.",
        "Keep whichever reads more plainly.",
      ],
      hint: "Paired phrases joined by 'and' are often one phrase and its echo.",
      trap: "The doubling sounds emphatic, and the claim is one a reader may resist.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Wiped on until the pan looks almost dry, the oil builds a film in layers a molecule or two deep.",
      noChange: "The opening phrase describes the oil, but the noun after the comma is 'the film.'",
      wrong: [
        [
          "Wiping on until the pan looks almost dry, the film builds in layers a molecule or two deep.",
          "The active form makes the film do the wiping.",
        ],
        [
          "Wiped on until the pan looks almost dry, layers a molecule or two deep are the result.",
          "The phrase now describes 'layers,' which are produced rather than wiped on.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The oil is wiped on; the film is what the oil becomes.",
      steps: [
        "Ask what is wiped on until the pan looks dry. The oil is.",
        "Rewrite so 'the oil' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence describes the outcome correctly, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-enumeration-transition",
      difficulty: "Medium",
      keep: false,
      key: "More usefully,",
      noChange: "'Similarly' claims a likeness, but the sentence is counting off the second consequence.",
      wrong: [
        ["Consequently,", "The film's toughness is not caused by the rule about thin coats."],
        ["Nevertheless,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 3 announced two consequences and gave the first. This paragraph gives the second, " +
        "so the transition should mark the step rather than a resemblance.",
      steps: [
        "Look back at the sentence that announced two consequences.",
        "Choose the transition that carries the reader to the second.",
      ],
      hint: "The sentence itself says 'the second consequence.'",
      trap: "'Similarly' fits the parallel structure while asserting the wrong relation.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "circumlocution",
      difficulty: "Medium",
      keep: false,
      key: "degreaser",
      noChange: "'A thing that removes grease' describes an object that already has a name.",
      wrong: [
        ["grease-removing product", "The hyphenated phrase is still a description rather than the name."],
        ["substance for cutting grease", "The wording is longer and no more exact than the original."],
      ],
      why:
        "The sentence turns on one distinction — soap attacks grease, and seasoning is not grease. " +
        "Naming soap precisely is what makes the second half land.",
      steps: [
        "Note the contrast the sentence draws in its second half.",
        "Use the one-word term that sets it up.",
      ],
      hint: "The clause after the semicolon supplies the word the first half needs.",
      trap: "Describing rather than naming reads as explanatory and blunts the contrast.",
    },
    {
      number: 10,
      subskill: "style and tone",
      family: "register-shift",
      difficulty: "Easy",
      keep: false,
      key: "have not been sold for household use in a very long time",
      noChange: "'Went out of circulation ages ago' is casual in an otherwise exact explanation.",
      wrong: [
        ["are basically ancient history at this point", "The slang is further from the essay's register than the original."],
        ["were discontinued at some juncture in the past", "The bureaucratic phrasing is as far from the voice as the slang."],
      ],
      why:
        "The essay is precise everywhere else — smoke points, molecules, cross-linking. The sentence " +
        "settles a factual question and should sound like the rest of it.",
      steps: [
        "Recall how the essay states other facts.",
        "Keep the phrasing that could sit in that voice unnoticed.",
      ],
      hint: "The right answer is the one you would not notice.",
      trap: "The wrong choices miss in opposite directions, so rejecting slang alone does not settle it.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the singular noun 'the film.'"],
        ["that", "The bare demonstrative points at the clause rather than at a noun."],
        ["the water", "Naming the water reverses the meaning, since the rust forms under the film."],
      ],
      why:
        "The pronoun refers to 'the film,' the singular subject of the clause before it, and the rust " +
        "forms beneath that film.",
      steps: [
        "Find what the iron rusts underneath: the film.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The clause before the comma names the antecedent.",
      trap: "'Patches' and 'layers' appear in the plural earlier and colour the ear.",
    },
    {
      number: 12,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "fine; a pan left wet in the sink overnight is a repair job",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "fine: a pan left wet in the sink overnight is a repair job",
          "A colon introduces an explanation, but the second clause is the matching half of a pair.",
        ],
        [
          "fine and a pan left wet in the sink overnight is a repair job",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The two clauses are complete and deliberately parallel — one pan cared for, one pan not. A " +
        "semicolon joins equals and keeps the symmetry audible.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or mirrors it. It mirrors.",
      ],
      hint: "The two halves are built the same way on purpose.",
      trap: "The clauses are short, which makes a comma feel sufficient.",
    },
    {
      number: 13,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the " +
        "paragraph's claim about standing water?",
      key: "Seasoning is hard but not sealed, and a film that thin cannot cover every place the iron reaches the surface.",
      wrong: [
        [
          "Cast iron pans are heavy because the metal must be cast thick to avoid cracking.",
          "The pan's weight and thickness have nothing to do with where rust begins.",
        ],
        [
          "A rusted pan can be stripped back to bare metal and seasoned again from scratch.",
          "The remedy belongs after the problem and does not support the claim about water.",
        ],
        [
          "Water boils away from a hot pan almost immediately after washing.",
          "That explains why drying works rather than why standing water does damage.",
        ],
      ],
      why:
        "The paragraph says iron rusts underneath the film. That only makes sense if the reader knows " +
        "the film does not seal the surface completely.",
      steps: [
        "Name the claim: water reaches iron that the film does not cover.",
        "Keep the choice that establishes the film is not a seal.",
      ],
      hint: "The claim is about rust forming under a layer; the support must explain how water gets there.",
      trap: "The remedy choice is genuinely useful and answers a later question.",
    },
    {
      number: 14,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Enamelled " +
        "cast iron is finished with a glass coating and is never seasoned at all.” Should the writer " +
        "make this addition?",
      key: "No, because the paragraph is explaining why a rule about bare iron survives, not sorting cookware types.",
      wrong: [
        [
          "Yes, because it prevents the reader from applying the essay's advice to the wrong pan.",
          "The essay has specified bare cast iron throughout, so no such confusion is in play.",
        ],
        [
          "Yes, because it shows that seasoning depends on the metal rather than the shape.",
          "The essay establishes that in paragraph 2, and this paragraph has moved past it.",
        ],
        [
          "No, because the essay has already stated that iron is not porous.",
          "Porosity is not what makes the added sentence out of place here.",
        ],
      ],
      why:
        "The last paragraph explains why advice with a wrong reason still works. A different kind of " +
        "cookware pulls the reader away from that account.",
      steps: [
        "Name what the paragraph is doing: accounting for the rule's persistence.",
        "Test the sentence against that rather than against its accuracy.",
      ],
      hint: "Ask whether the sentence helps explain why people avoid soap.",
      trap: "The distinction is genuinely useful somewhere and belongs in a different essay.",
    },
    {
      number: 15,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "dry the pan, putting it back on the heat, and wipe it with oil",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "dry the pan, put it back on the heat, and it gets wiped with oil",
          "The third item becomes a passive clause with a different subject.",
        ],
        [
          "drying the pan, put it back on the heat, and wipe it with oil",
          "The first item breaks the pattern the other two establish.",
        ],
      ],
      why:
        "Three verbs share the subject 'the people who avoid soap,' and the sentence's argument is " +
        "that all three habits travel together.",
      steps: [
        "Read 'the people who avoid soap also' into each of the three items.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three habits are distinct actions, which makes varying the form feel natural.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to explain why a piece of advice can be worth following " +
        "even when the reason given for it is false. Would this essay accomplish that goal?",
      key: "Yes, because avoiding soap travels with drying and re-oiling, and those are what actually protect the pan.",
      wrong: [
        [
          "Yes, because it establishes that polymerised seasoning is chemically bonded to the iron.",
          "The chemistry explains why soap is harmless, not why the advice still works.",
        ],
        [
          "No, because the essay states plainly that modern dish soap will not strip a pan.",
          "That is the false reason being set aside, which is the first half of the essay's point.",
        ],
        [
          "No, because the essay recommends washing and drying a pan immediately after use.",
          "That recommendation is the mechanism by which the old rule succeeds.",
        ],
      ],
      why:
        "The closing says the rule survives because it works, and it works because the people who " +
        "keep it also dry the pan and re-oil it. The stated reason is wrong and the habit is sound.",
      steps: [
        "Separate the reason people give from the behaviour the rule produces.",
        "Keep the choice that credits the behaviour rather than the reason.",
      ],
      hint: "The essay's last two sentences answer the question directly.",
      trap: "One wrong choice cites the essay's own correction and treats it as a refutation.",
    },
  ],
};
