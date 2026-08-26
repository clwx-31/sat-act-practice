"use strict";

module.exports = {
  id: "act-english-p036",
  type: "process-narrative",
  title: "The Burr Is the Proof",
  content: `[1] Sharpening is not the removal of {1 dullness it} is the removal
of steel. An edge is the line where two ground surfaces meet, and a dull edge is
one where those surfaces no longer quite reach each other. The gap between them
{2 are} what has to go, and the only way to close it is to grind both sides down
until they meet again.

[2] {3} A whetstone {4 does} that grinding, and the first requirement is an
angle held constant. Twenty degrees a side is a common figure for a kitchen
knife. The exact number matters much less than keeping it: a blade rocked
through five degrees on every stroke produces a rounded shoulder rather than an
{5 edge, the steel comes off the wrong places}.

[3] Work begins on a coarse stone. Coarse grit cuts fast and leaves deep
scratches, which the finer stones that follow will remove. Starting fine is the
commonest mistake, because a fine stone {6 takes off metal very slowly and at a
low rate} and will polish a dull edge into a shiny dull edge. {7 Ground away on
one side until a wire of metal folds over the other, the sharpener can feel
progress with a thumbnail.}

[4] {8 Similarly,} that folded wire is called the burr, and it is the point of
the whole exercise. A burr along the entire length means the two surfaces have
finally met everywhere. A burr along half the blade means half the blade is
still {9 not there yet}. It is the only honest signal in the process, and
{10 it} cannot be faked by polishing.

[5] {11} The burr is then removed, on finer stones and finally on leather, in
strokes that {12 lighten with each pass, alternate sides, and end trailing away
from the edge}. What is left is two flat surfaces meeting in a line too narrow
to see.

[6] A sharp knife is not a knife that has been sharpened recently. It is a knife
whose two sides actually {13 meet}.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "dullness. It",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["dullness, it", "Adding a comma turns the run-on into a comma splice."],
        ["dullness it,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'Sharpening is not the removal of dullness' and 'It is the removal of steel' are both " +
        "complete sentences, and nothing joins them.",
      steps: [
        "Find where the first complete thought ends: after 'dullness.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "The second half begins with a new subject and its own verb.",
      trap: "The two halves are a matched pair, which makes them feel like one sentence.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'them' rather than to the singular 'The gap.'",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense explanation."],
        ["have been", "The plural present perfect misses both the number and the standing claim."],
      ],
      why:
        "The subject is 'The gap,' singular. 'Between them' is a prepositional phrase, and the noun " +
        "inside one is never the subject.",
      steps: [
        "Cross out 'between them.'",
        "Read 'The gap … is what has to go' and match the verb.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'Them' is plural and sits directly before the verb, which is where the ear listens.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Closing that gap is a matter of geometry before it is a matter of effort.",
      wrong: [
        [
          "Whetstones are quarried in several countries and are sold in a range of grits.",
          "Where stones come from is never taken up again anywhere in the essay.",
        ],
        [
          "Kitchen knives are usually made of stainless steel with some carbon content.",
          "The metal's composition is not what this paragraph goes on to explain.",
        ],
        [
          "There are a number of things a person should know before sharpening a knife.",
          "The vague plural promises a list where the paragraph explains one requirement.",
        ],
      ],
      why:
        "Paragraph 1 defines the problem as two surfaces failing to meet. This paragraph is about " +
        "holding an angle, so the opening should present that as the geometric answer.",
      steps: [
        "Note what paragraph 1 establishes: a gap that has to be closed.",
        "Choose the opening that makes this paragraph the method for closing it.",
      ],
      hint: "The paragraph is about angle, which is geometry rather than force.",
      trap: "Every choice is true about sharpening, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["did", "The past tense reports one occasion instead of what a whetstone always does."],
        ["is doing", "The progressive describes a single moment rather than standard practice."],
        ["has done", "The present perfect points at completed instances rather than a rule."],
      ],
      why:
        "The essay describes what happens whenever a knife is sharpened, and the verbs around it are " +
        "in the simple present.",
      steps: [
        "Check the tense of the neighbouring verbs: 'is,' 'matters,' 'produces.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A process narrative describes every performance at once.",
      trap: "The paragraph describes physical work, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "edge, because the steel comes off the wrong places",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "edge, and the steel comes off the wrong places",
          "'And' repairs the splice but hides that the second clause is the reason for the first.",
        ],
        [
          "edge; the steel coming off the wrong places",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The second clause explains why rocking the blade produces a shoulder. 'Because' repairs the " +
        "splice and states the relationship the sentence actually has.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the conjunction that names the relationship rather than merely adding.",
      ],
      hint: "Ask what the second half is doing to the first.",
      trap: "'And' is the reflex fix and flattens a reason into a list.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "takes off metal very slowly",
      noChange: "'At a low rate' repeats exactly what 'very slowly' has already said.",
      wrong: [
        ["takes off metal at a low rate", "The phrase is longer than the adverb it replaces and means the same."],
        ["takes off metal slowly and gradually", "The second adverb restates the first."],
      ],
      why:
        "Both halves describe the same rate. One says everything the pair says, and the sentence's " +
        "point is what follows the 'and.'",
      steps: [
        "Notice the two halves mean the same thing.",
        "Keep the shorter one so the clause after it lands.",
      ],
      hint: "The memorable half of this sentence is 'a shiny dull edge.'",
      trap: "The doubling sounds precise because it mentions a rate.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Ground away on one side until a wire of metal folds over the other, the edge announces its own progress to a thumbnail.",
      noChange: "The opening phrase describes the edge, but the noun after the comma is 'the sharpener.'",
      wrong: [
        [
          "Grinding away on one side until a wire of metal folds over the other, the sharpener can feel progress with a thumbnail.",
          "The active form is grammatical but says the sharpener is the thing being ground away.",
        ],
        [
          "Ground away on one side until a wire of metal folds over the other, progress can be felt with a thumbnail.",
          "The phrase now describes 'progress,' which is not what gets ground.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The edge is ground away; the sharpener does the grinding.",
      steps: [
        "Ask what is ground away on one side. The edge is.",
        "Rewrite so the edge follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence states something true about the sharpener, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-emphasis-transition",
      difficulty: "Medium",
      keep: false,
      key: "That is the whole point:",
      noChange: "'Similarly' claims a likeness, but this paragraph identifies the previous one's payoff.",
      wrong: [
        ["Consequently,", "The burr having a name is not caused by the grinding described before it."],
        ["Nevertheless,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 3 ends with a wire of metal folding over. This paragraph names it and explains why " +
        "it matters, so the transition should mark that the essay has arrived at its centre.",
      steps: [
        "Ask what this paragraph does with the last thing the previous one described.",
        "Choose the option that marks arrival rather than resemblance.",
      ],
      hint: "The paragraph goes on to call the burr the point of the whole exercise.",
      trap: "'Similarly' fits the essay's step-by-step rhythm while asserting nothing.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-phrase",
      difficulty: "Medium",
      keep: false,
      key: "still short of the edge",
      noChange: "'Not there yet' names no condition in a sentence explaining what a partial burr means.",
      wrong: [
        ["not quite done", "The phrase describes the sharpener's progress rather than the steel's state."],
        ["in an incomplete condition", "The wording is more formal and no more exact than the original."],
      ],
      why:
        "The essay has defined the problem as two surfaces failing to reach each other. A partial " +
        "burr means that is still true along half the blade, and the sentence should say so.",
      steps: [
        "Recall how paragraph 1 defined a dull edge.",
        "Describe the half-sharpened blade in those same terms.",
      ],
      hint: "The right phrase echoes the definition the essay opened with.",
      trap: "'Not there yet' is idiomatic and reads as a natural close to the sentence.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'signal.'"],
        ["this", "The bare demonstrative points at the clause rather than at a noun."],
        ["the blade", "Naming the blade changes the claim, since it is the signal that cannot be faked."],
      ],
      why:
        "The pronoun refers to 'the only honest signal,' the singular subject of the clause before " +
        "it, and that is what polishing cannot counterfeit.",
      steps: [
        "Find what cannot be faked: the signal.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The first half of the sentence names the antecedent.",
      trap: "'Stones' and 'surfaces' appear in the plural nearby and colour the ear.",
    },
    {
      number: 11,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "claim that the burr is the only honest signal?",
      key: "A blade can be brought to a mirror finish without ever raising one, and it will still not cut.",
      wrong: [
        [
          "Water stones must be soaked before use and dry out between sessions.",
          "How a stone is prepared has no bearing on what the burr proves.",
        ],
        [
          "Professional sharpeners often work through five or six grits in sequence.",
          "The number of stones used is a matter of method rather than of evidence.",
        ],
        [
          "A burr can usually be seen as well as felt if the light is right.",
          "How the burr is detected does not establish that it is the reliable test.",
        ],
      ],
      why:
        "The claim is that appearance can deceive and the burr cannot. The support has to show a " +
        "blade that looks sharpened and is not.",
      steps: [
        "Name the claim: polish is not evidence and the burr is.",
        "Keep the choice that separates the two.",
      ],
      hint: "The support should describe a blade that passes the eye and fails the work.",
      trap: "The choice about seeing the burr sounds relevant and concerns detection, not proof.",
    },
    {
      number: 12,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "lighten with each pass, alternating sides, and end trailing away from the edge",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "lighten with each pass, alternate sides, and the finish trails away from the edge",
          "The third item becomes a clause with a new subject.",
        ],
        [
          "lightening with each pass, alternate sides, and end trailing away from the edge",
          "The first item breaks the pattern the other two establish.",
        ],
      ],
      why:
        "Three verbs share the subject 'strokes,' and the sentence describes one continuous change in " +
        "how the strokes are made.",
      steps: [
        "Read 'strokes that' into each of the three items in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three instructions differ in kind, which makes varying the form feel natural.",
    },
    {
      number: 13,
      subskill: "semicolons and colons",
      family: "colon-before-an-explanation",
      difficulty: "Hard",
      keep: false,
      key: "meet:",
      noChange: "The sentence ends on a claim the essay never explains, though it has one to give.",
      wrong: [
        ["meet;", "A semicolon needs an independent clause after it, and none follows."],
        ["meet,", "A comma is too weak to introduce the definition the sentence has set up."],
      ],
      why:
        "'A knife whose two sides actually meet' is complete and invites the definition the essay has " +
        "been building. A colon is the mark that delivers what a complete clause has promised.",
      steps: [
        "Confirm the words before the mark form a complete sentence. They do.",
        "Use the mark that introduces the phrase completing the definition.",
      ],
      hint: "The essay's closing thought needs somewhere to go.",
      trap: "A full stop is grammatical and leaves the definition unstated.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a process in which the sign of success is " +
        "something a beginner would try to avoid. Would this essay accomplish that goal?",
      key: "Yes, because the burr is a flaw in the steel that the sharpener is working to produce.",
      wrong: [
        [
          "Yes, because starting on a fine stone is described as the commonest mistake.",
          "That is an error to avoid, not a sign of success mistaken for one.",
        ],
        [
          "No, because the burr is removed on the finer stones before the work is finished.",
          "Removing it afterward is what makes raising it first a deliberate step.",
        ],
        [
          "No, because the essay states that the exact sharpening angle matters very little.",
          "The angle's tolerance is a separate point and does not bear on the burr.",
        ],
      ],
      why:
        "A wire of metal folded over the edge looks like damage, and the essay makes it the proof " +
        "that the two surfaces have met — then removes it once it has done its job.",
      steps: [
        "Ask what the burr is physically: a defect raised on purpose.",
        "Keep the reason that names both the appearance and the intent.",
      ],
      hint: "The essay calls the burr the point of the whole exercise.",
      trap: "One wrong choice cites a real error from the essay and mistakes it for the answer.",
    },
  ],
};
