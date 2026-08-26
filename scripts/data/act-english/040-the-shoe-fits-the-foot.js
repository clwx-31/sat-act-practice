"use strict";

module.exports = {
  id: "act-english-p040",
  type: "process-narrative",
  title: "The Shoe Fits the Foot",
  content: `[1] A horseshoe is shaped to the {1 hoof the} hoof is never shaped to
the shoe. Everything a farrier does follows from that order, and the order
{2 are} the opposite of what most people assume when they watch it done.

[2] {3 Similarly,} the work begins with the old shoe coming off and the foot
being cleaned. A hoof {4 grows} continuously, about a centimetre a month, so by
six weeks the wall has run past the shoe and the balance of the foot has
shifted. The farrier trims it back to where it should {5 sit, this is the
decision the rest of the job depends on}.

[3] Only then is a shoe chosen. It is heated, held against the trimmed hoof for
a second or two, and lifted away. The scorch mark shows exactly where the shoe
{6 is making contact and touching}, and the farrier hammers the shoe, not the
foot, until the mark is even all the way round. {7 Held in the fire until it
glows, the farrier can bend the steel by hand-width increments.}

[4] {8 Consequently,} the nailing is the part with no margin. The outer wall of
a hoof has no nerves; the inner tissue does. Between them runs a pale band called
the white line, and every nail must pass through the wall outside {9 that thing}
and emerge through the side of the hoof. A nail driven a few millimetres inside
it draws blood and lames the animal.

[5] Each nail is then {10 clenched, which means} the protruding tip is bent over
and filed flush. Seven or eight nails hold a shoe for six weeks against a
thousand pounds of animal, and {11 they hold by friction, sit below the surface,
and carry no weight themselves}. {12}

[6] The order is the whole craft. Trim first, fit second, nail last, and never
in the belief that a shoe can correct a foot it was not cut to match.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "hoof. The",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["hoof, the", "Adding a comma turns the run-on into a comma splice."],
        ["hoof the,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'A horseshoe is shaped to the hoof' and 'The hoof is never shaped to the shoe' are both " +
        "complete sentences, and nothing joins them.",
      steps: [
        "Find where the first complete thought ends: after 'hoof.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "The two halves are a matched pair, which is what makes the join easy to miss.",
      trap: "The symmetry of the two clauses makes them feel like one sentence.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "simple-singular-subject",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The singular subject 'the order' cannot take a plural verb.",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense claim."],
        ["have been", "The plural present perfect misses both the number and the standing fact."],
      ],
      why: "'The order' is one thing, so the verb is singular.",
      steps: [
        "Identify the subject: 'the order.'",
        "Choose the singular verb.",
      ],
      hint: "Nothing separates this subject from its verb; read them straight through.",
      trap: "'Most people' follows soon after and pulls the ear toward a plural.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "comparison-versus-sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "In practice,",
      noChange: "'Similarly' claims a likeness to the first paragraph, which stated a principle.",
      wrong: [
        ["Consequently,", "Removing the old shoe does not follow from the principle about order."],
        ["Nevertheless,", "Nothing in the first paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 1 states the rule. This paragraph begins showing how the rule is carried out, so " +
        "the transition should mark the move from principle to procedure.",
      steps: [
        "Ask what this paragraph does with the last one: it applies it.",
        "Choose the transition that marks application.",
      ],
      hint: "The essay moves from a claim to a sequence of steps.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["grew", "The past tense reports one hoof instead of what every hoof always does."],
        ["is growing", "The progressive describes a moment rather than a continuous property."],
        ["has grown", "The present perfect points at a completed span rather than an ongoing rate."],
      ],
      why:
        "The sentence states a rate that holds always, and the paragraph around it uses the simple " +
        "present throughout.",
      steps: [
        "Check the tense of the neighbouring verbs: 'begins,' 'trims,' 'shifted.'",
        "Keep the underlined verb in the tense that states a rule.",
      ],
      hint: "A growth rate is not tied to any particular occasion.",
      trap: "The sentence goes on to describe a six-week span, which invites a perfect tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "sit. This is the decision the rest of the job depends on",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "sit, and this is the decision the rest of the job depends on",
          "'And' repairs the splice but attaches the essay's central claim to the end of a procedure.",
        ],
        [
          "sit, this being the decision the rest of the job depends on",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The second clause is the paragraph's point rather than another step. A full stop gives it " +
        "the weight the rest of the essay leans on.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Ask which half the essay depends on, and give it room.",
      ],
      hint: "The whole essay is about which step governs the others.",
      trap: "'And' fixes the grammar and demotes the claim to a fourth item in a sequence.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Medium",
      keep: false,
      key: "touches",
      noChange: "'Is making contact and touching' says one thing twice and in five words.",
      wrong: [
        ["is making contact", "The phrase is longer than the verb it replaces and means the same."],
        ["touches and makes contact", "Both halves remain, and the pair still names one action."],
      ],
      why:
        "The sentence is about a scorch mark showing where metal met horn. One verb states that, and " +
        "the sentence's real work is in the clause that follows.",
      steps: [
        "Notice the two halves mean the same thing.",
        "Keep the single verb so the second half of the sentence lands.",
      ],
      hint: "The memorable part of the sentence is 'the shoe, not the foot.'",
      trap: "The progressive phrasing sounds more technical than the plain verb.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Held in the fire until it glows, the steel can be bent by hand-width increments.",
      noChange: "The opening phrase describes the steel, but the noun after the comma is 'the farrier.'",
      wrong: [
        [
          "Holding it in the fire until it glows, the steel can be bent by hand-width increments.",
          "The active form makes the steel do the holding.",
        ],
        [
          "Held in the fire until it glows, bending the steel by hand-width increments is possible.",
          "The phrase now describes 'bending,' which is not what goes in the fire.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The steel is held in the fire; the farrier does the holding.",
      steps: [
        "Ask what is held in the fire until it glows. The steel is.",
        "Rewrite so 'the steel' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The farrier really does the work, which makes the original read as accurate.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "consequence-versus-escalation-transition",
      difficulty: "Medium",
      keep: false,
      key: "Then comes",
      noChange: "'Consequently' says the nailing follows logically, when it simply follows in sequence.",
      wrong: [
        ["Similarly,", "Nailing is not like the fitting described before it; it is the next stage."],
        ["Even so,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "The essay is a sequence of steps, and this is the one after fitting. The transition should " +
        "mark the step rather than assert a logical consequence.",
      steps: [
        "Ask where this paragraph falls in the process.",
        "Choose the transition that marks the next stage.",
      ],
      hint: "The essay is organised by order of operations.",
      trap: "'Consequently' sounds analytical in a paragraph that is simply counting.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Medium",
      keep: false,
      key: "the white line",
      noChange: "'That thing' names nothing, and the sentence has just given the band its name.",
      wrong: [
        ["that band", "The noun is vaguer than the term the sentence has just supplied."],
        ["the aforementioned area", "The phrasing is bureaucratic and less exact than the name."],
      ],
      why:
        "The clause before it names the white line precisely. Referring back to it by name keeps the " +
        "instruction usable, which is what a sentence about a few millimetres has to be.",
      steps: [
        "Read the clause before and note the term it introduces.",
        "Use that term rather than pointing at it.",
      ],
      hint: "The sentence has just defined the thing; use the definition.",
      trap: "'That thing' reads as casual shorthand in an otherwise plain sentence.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the singular noun 'the white line.'"],
        ["this", "The bare demonstrative points at the clause rather than at a noun."],
        ["the wall", "Naming the wall reverses the warning, since the wall is the safe side."],
      ],
      why:
        "The pronoun refers to the white line, and a nail driven inside that line reaches the " +
        "sensitive tissue the paragraph has just described.",
      steps: [
        "Ask what a nail must not pass inside of: the white line.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The sentence before this one names the antecedent.",
      trap: "'Millimetres' is plural and sits immediately before the pronoun.",
    },
    {
      number: 11,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "they hold by friction, sitting below the surface, and carry no weight themselves",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "they hold by friction, sit below the surface, and no weight is carried by them",
          "The third item becomes a passive clause with a different subject.",
        ],
        [
          "holding by friction, sit below the surface, and carry no weight themselves",
          "The first item breaks the pattern the other two establish.",
        ],
      ],
      why:
        "Three verbs share the subject 'they,' and the sentence's point is that all three facts are " +
        "true of the same nails at once.",
      steps: [
        "Read 'they' into each of the three items in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three facts are different in kind, which makes varying the form feel natural.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "closing claim about order?",
      key: "A shoe nailed to an untrimmed foot will hold perfectly well and will still be wrong.",
      wrong: [
        [
          "Farriers in most countries complete a formal apprenticeship of several years.",
          "The length of training says nothing about why the sequence of steps matters.",
        ],
        [
          "A working horse is usually reshod every six to eight weeks throughout the year.",
          "The interval is already established and does not bear on the order of operations.",
        ],
        [
          "Aluminium shoes are lighter than steel and are used for racing rather than work.",
          "The choice of material is a separate decision from the sequence the essay describes.",
        ],
      ],
      why:
        "The closing says a shoe cannot correct a foot it was not cut to match. The support has to " +
        "show that a correctly attached shoe on an untrimmed foot is still a failure.",
      steps: [
        "Read the final sentence and name what it warns against.",
        "Keep the choice that shows good work in the wrong order failing anyway.",
      ],
      hint: "The claim is about sequence, so the support has to describe a sequence going wrong.",
      trap: "Every choice is a true fact about farriery.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a craft in which the most consequential step " +
        "is the one that removes material rather than adds it. Would this essay accomplish that " +
        "goal?",
      key: "Yes, because the trim is called the decision the rest of the job depends on, and everything after it is fitting and fastening.",
      wrong: [
        [
          "Yes, because the nailing is described as the part of the work with no margin for error.",
          "The nailing is the riskiest step, not the one the other steps depend on.",
        ],
        [
          "No, because the essay explains that a hoof grows about a centimetre every month.",
          "The growth rate is why trimming is needed, which supports the goal rather than undermining it.",
        ],
        [
          "No, because the shoe is hammered to shape after being held against the hoof.",
          "Shaping the shoe is explicitly subordinate to the trim, which sets what it must match.",
        ],
      ],
      why:
        "The trim is the only step that takes material away, and the essay says outright that the " +
        "rest of the job depends on it. Fitting matches the shoe to that trim, and nailing fastens it.",
      steps: [
        "Find the step the essay calls decisive.",
        "Keep the reason that names it and subordinates the others.",
      ],
      hint: "The second paragraph states which step the others depend on.",
      trap: "The nailing is the most dramatic step, which makes it feel like the most important.",
    },
  ],
};
