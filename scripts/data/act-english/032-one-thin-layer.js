"use strict";

module.exports = {
  id: "act-english-p032",
  type: "process-narrative",
  title: "One Thin Layer",
  content: `[1] {1 Planted in a garden a Honeycrisp seed} will grow into an apple
tree. It will not grow into a Honeycrisp. Apples do not come true from seed, and
every named apple in every orchard {2 are} a cutting from one original tree,
kept alive by being joined to other roots for two hundred years or more.

[2] {3} The joining is called grafting, and the whole operation depends on a
single layer. Between the bark and the wood of a young shoot lies a band of
dividing cells a fraction of a millimetre {4 thick and very thin indeed}, called
the cambium. It {5 is} what makes new wood and new bark. If the cambium of the
cutting meets the cambium of the rootstock, the two will {6 knit, if it does
not, nothing happens} at all.

[3] The work is done in late winter, while both pieces are dormant. A scion — a
pencil-thick length of last year's growth from the tree being copied — is cut
with a long sloping face. {7 Cut to match the scion, the grafter then splits
each face partway.} The two pieces interlock and hold themselves together.

[4] {8 Similarly,} the cut faces are pressed together with their edges
{9 aligned, alignment is the entire operation}. If the scion is thinner than the
stock, the grafter lines up one side rather than {10 doing it in the middle},
because a centred scion has {11 its} cambium touching nothing.

[5] {12} The joint is wrapped and sealed against drying, and then it is left
alone. A graft that is {13 checked, unwrapped, and adjusted} is a graft that
fails.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-participle-comma",
      difficulty: "Easy",
      keep: false,
      key: "Planted in a garden, a Honeycrisp seed",
      noChange: "The introductory participial phrase runs into the subject with no comma.",
      wrong: [
        ["Planted in a garden a Honeycrisp seed,", "The comma now falls after the subject and before its own verb."],
        ["Planted, in a garden, a Honeycrisp seed", "The commas isolate the prepositional phrase and leave the clause boundary unmarked."],
      ],
      why:
        "'Planted in a garden' opens the sentence and describes the seed. A comma marks where the " +
        "phrase ends and the main clause begins.",
      steps: [
        "Find where the opening phrase stops: after 'garden.'",
        "Place a single comma there.",
      ],
      hint: "A participial phrase opening a sentence is followed by one comma.",
      trap: "The phrase is short enough that punctuating it feels fussy.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'orchard' rather than to 'every named apple.'",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense claim."],
        ["have been", "The plural present perfect misses both the number and the standing fact."],
      ],
      why:
        "The subject is 'every named apple,' and 'every' makes it singular however many orchards " +
        "follow it in a prepositional phrase.",
      steps: [
        "Cross out 'in every orchard.'",
        "Read 'every named apple … is' and match the verb.",
      ],
      hint: "'Every' always takes a singular verb.",
      trap: "The sentence describes thousands of trees, which colours the ear toward a plural.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Keeping a variety alive therefore means joining wood to wood, and that turns out to hang on one thin layer.",
      wrong: [
        [
          "Apple trees belong to the rose family and are grown on every continent but Antarctica.",
          "The tree's botanical family is never taken up again anywhere in the essay.",
        ],
        [
          "Commercial orchards usually replace their trees every twenty to thirty years.",
          "Orchard economics are not what this paragraph goes on to explain.",
        ],
        [
          "There are a number of methods a grafter can choose between.",
          "The vague plural promises a survey where the paragraph describes one requirement.",
        ],
      ],
      why:
        "Paragraph 1 establishes that varieties survive only as cuttings. This paragraph explains what " +
        "makes joining a cutting to a root work, so the opening should connect the two.",
      steps: [
        "Note what paragraph 1 establishes: every named apple is a cutting.",
        "Choose the opening that turns that fact into this paragraph's problem.",
      ],
      hint: "The paragraph is about one layer; the opening should point at it.",
      trap: "Every choice is true about apples, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "thick",
      noChange: "'Very thin indeed' repeats the measurement the sentence has already given exactly.",
      wrong: [
        ["thick and very thin", "The two halves still describe the same dimension twice."],
        ["thick, very thin indeed", "Punctuating the repetition does not remove it."],
      ],
      why:
        "'A fraction of a millimetre' has already stated the thickness precisely. A vague restatement " +
        "adds nothing and weakens the number.",
      steps: [
        "Notice the sentence has already measured the layer.",
        "Cut the phrase that measures it again, less well.",
      ],
      hint: "A precise figure does not need a vague adjective after it.",
      trap: "The repetition sounds emphatic, and the layer's thinness is the point.",
    },
    {
      number: 5,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was", "The past tense would confine a permanent property of the cambium to some earlier time."],
        ["has been", "The present perfect implies a span that began and might end."],
        ["is being", "The progressive suggests a temporary state rather than what the cambium is."],
      ],
      why:
        "The sentence states what the cambium always does, and every verb around it is in the simple " +
        "present.",
      steps: [
        "Check the tense of the neighbouring verbs: 'lies,' 'meets,' 'happens.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A biological property does not belong to any particular time.",
      trap: "The next paragraph shifts to describing a procedure, which invites a different tense.",
    },
    {
      number: 6,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "knit. If it does not, nothing happens",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "knit, and if it does not, nothing happens",
          "The conjunction repairs the splice but merges two opposed conditions into one sentence.",
        ],
        [
          "knit, if it does not nothing happens",
          "Removing the second comma leaves the splice and strands the conditional clause.",
        ],
      ],
      why:
        "The paragraph sets two outcomes against each other, and each conditional deserves its own " +
        "sentence so the second lands as flatly as it reads.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Separate them so the contrast between the two conditions is audible.",
      ],
      hint: "The two halves are opposite outcomes, not a continuation.",
      trap: "'And' fixes the grammar and flattens an either-or into a list.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Cut to match the scion, the rootstock is then split partway across its face.",
      noChange: "The opening phrase describes the rootstock, but the noun after the comma is 'the grafter.'",
      wrong: [
        [
          "Cutting to match the scion, the grafter then splits each face partway.",
          "The active form is grammatical but says the grafter is what matches the scion.",
        ],
        [
          "Cut to match the scion, each face is then split partway by the grafter.",
          "The phrase now describes 'each face,' which is a part of the thing that was cut.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The rootstock is cut to match; the grafter is not.",
      steps: [
        "Ask what is cut to match the scion. The rootstock is.",
        "Rewrite so 'the rootstock' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The grafter really does the cutting, which makes the original read as accurate.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Only then",
      noChange: "'Similarly' claims a likeness, but this is the step that follows the shaping.",
      wrong: [
        ["Consequently,", "Pressing the faces together is not caused by the splitting; it comes after it."],
        ["Meanwhile,", "The faces cannot be pressed together while they are still being shaped."],
      ],
      why:
        "The two pieces have to be shaped before they can be joined. The transition should mark that " +
        "this step waits on the last one.",
      steps: [
        "Ask whether this step can happen during the previous one. It cannot.",
        "Choose the transition that marks a step that had to wait.",
      ],
      hint: "The essay is a sequence, and this is the join it has been building toward.",
      trap: "'Similarly' fits the essay's step-by-step rhythm while asserting nothing.",
    },
    {
      number: 9,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "aligned; alignment is the entire operation",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "aligned: alignment is the entire operation",
          "A colon introduces an explanation, but the second clause states a verdict rather than a definition.",
        ],
        [
          "aligned and alignment is the entire operation",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete — what is done, and how much it matters. A semicolon joins equals " +
        "and lets the second clause land as its own claim.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or judges it. It judges.",
      ],
      hint: "The second clause is the paragraph's thesis; it should not be subordinated.",
      trap: "The repetition of 'aligned' and 'alignment' makes the second clause feel like a gloss.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-verb-phrase",
      difficulty: "Medium",
      keep: false,
      key: "centring it",
      noChange: "'Doing it in the middle' names no technique in a sentence about a specific choice.",
      wrong: [
        ["putting it in the centre", "The phrasing is longer and still describes rather than names."],
        ["going down the middle with it", "The wording is vaguer than the original it was meant to fix."],
      ],
      why:
        "The sentence contrasts two placements, and the next clause names the centred scion outright. " +
        "The verb has to match that noun for the contrast to hold.",
      steps: [
        "Read the clause that follows and note the word it uses.",
        "Use the verb form of that word here.",
      ],
      hint: "The rest of the sentence already supplies the right term.",
      trap: "'In the middle' is perfectly clear in meaning and imprecise as terminology.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "possessive-pronoun-agreement",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it's", "'It's' means 'it is,' which cannot precede the noun 'cambium.'"],
        ["their", "The plural possessive does not agree with the singular 'a centred scion.'"],
        ["the", "The article drops the possession and leaves the cambium unattributed."],
      ],
      why:
        "The cambium belongs to the scion, a singular noun, so the singular possessive pronoun is " +
        "correct, and it takes no apostrophe.",
      steps: [
        "Ask whose cambium touches nothing: the scion's.",
        "Use the singular possessive, with no apostrophe.",
      ],
      hint: "Try reading it as 'it is' — if that fails, the possessive is right.",
      trap: "Apostrophes mark possession nearly everywhere else, which makes 'it's' feel right.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "closing claim about leaving the graft alone?",
      key: "The knitting happens in the first few weeks, and every disturbance tears cells that have just joined.",
      wrong: [
        [
          "Grafting wax and specialised tapes are sold for sealing the joint.",
          "The materials used for sealing say nothing about why the joint must not be disturbed.",
        ],
        [
          "A successful graft will usually push its first leaves within a month or so.",
          "When leaves appear is a sign of success rather than a reason for patience.",
        ],
        [
          "Grafting has been practised in orchards for at least two thousand years.",
          "The antiquity of the technique does not bear on what happens after the wrap goes on.",
        ],
      ],
      why:
        "The closing says a graft that is checked and adjusted fails. The support has to explain why " +
        "inspection is destructive rather than merely unnecessary.",
      steps: [
        "Read the final sentence and name what it warns against.",
        "Keep the choice that explains the damage checking would do.",
      ],
      hint: "The claim is about harm, so the support has to describe harm.",
      trap: "The leaf choice is the most encouraging detail and answers a different question.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-participle-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "checked, unwrapped, and you adjust it",
          "The third item becomes a clause with a new subject and an active verb.",
        ],
        [
          "checked, unwrapping, and adjusted",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "checked, unwrapped, and then adjustment",
          "The third item becomes a noun where the series needs a participle.",
        ],
      ],
      why:
        "Three past participles share the subject 'A graft' and one auxiliary, 'is.' Each has to be " +
        "able to follow that auxiliary on its own.",
      steps: [
        "Read 'A graft that is' into each of the three items in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three actions escalate, which makes varying the last one feel like emphasis.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a procedure whose success depends on " +
        "something too small to see clearly. Would this essay accomplish that goal?",
      key: "Yes, because everything from the sloping cut to the off-centre alignment exists to make two fractions of a millimetre meet.",
      wrong: [
        [
          "Yes, because the work must be carried out in late winter while the wood is dormant.",
          "The timing is a condition of the work, not the thing too small to see.",
        ],
        [
          "No, because the essay explains that apples do not come true from seed.",
          "That fact is why grafting is done at all, not an argument against the goal.",
        ],
        [
          "No, because the grafter aligns the pieces by eye rather than with instruments.",
          "Aligning by eye is what makes the smallness of the target the whole difficulty.",
        ],
      ],
      why:
        "The cambium is a fraction of a millimetre thick, and every step described — the long sloping " +
        "face, the interlocking split, lining up one edge instead of centring — exists to bring two " +
        "such layers into contact.",
      steps: [
        "Name the thing the essay says the operation depends on.",
        "Keep the reason that shows the other steps serving it.",
      ],
      hint: "Ask what the sloping cut and the off-centre alignment are both for.",
      trap: "One wrong choice states a real condition of the work and mistakes it for the subject.",
    },
  ],
};
