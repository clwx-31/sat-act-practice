"use strict";

module.exports = {
  id: "act-english-p010",
  type: "informative-essay",
  title: "Twice a Year the Lake Turns Over",
  content: `[1] Almost everything contracts as it cools, and water does too —
down to a point. At about thirty-nine degrees {1 Fahrenheit four degrees} above
freezing, water reaches its greatest density. Cool it any further and it expands
again. That is why ice floats, and it is also why a deep lake spends a year
doing something strange.

[2] {2} By August a lake in the upper Midwest is layered. The top ten or fifteen
feet, warmed by the sun and stirred by the wind, {3 is} relatively light.
Beneath them {4 lies} a colder, denser mass the wind cannot reach. Between the
two is a narrow band across which the temperature drops {5 sharply, that band is
a barrier:} the layers do not mix.

[3] The consequences are not small. The lower layer is sealed off from the air,
and as organic material sinks into it and decays, the layer's oxygen is
{6 gotten rid of} and never replaced. By late summer the bottom of a productive
lake can be nearly lifeless, and the wind that stirs the surface all afternoon
{7 cannot reach in any useful way the water forty feet down}.

[4] {8 Similarly,} autumn arrives. The surface cools, and as {9 it} approaches
thirty-nine degrees it becomes the densest water in the lake and sinks. Water
from below rises to take its place, cools, and sinks in turn. Within days the
whole column stands at one temperature and the wind can drive the entire lake in
a single slow circulation. Oxygen goes {10 down, nutrients come up.}

[5] Winter inverts the arrangement: ice and near-freezing water on top, water
close to thirty-nine degrees {11 down at the very bottom part of the lake}. In
spring the surface warms toward thirty-nine, grows dense, and the lake turns
over a second time. {12}

[6] A lake that {13 stratifies in summer, turns in fall, inverts under ice, and
turns again in spring} is called dimictic. Most of Wisconsin's lakes are.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "appositive-comma",
      difficulty: "Easy",
      keep: false,
      key: "Fahrenheit, four degrees",
      noChange: "The appositive renaming the temperature needs a comma to set it off.",
      wrong: [
        ["Fahrenheit; four degrees", "A semicolon must join independent clauses, and this phrase is not one."],
        ["Fahrenheit four degrees,", "The comma now falls after the appositive begins rather than before it."],
      ],
      why:
        "'Four degrees above freezing' renames the temperature just given. An appositive is set off " +
        "from the noun it renames by a comma.",
      steps: [
        "Notice that the phrase restates the same temperature in different terms.",
        "Put a comma between the noun and the phrase that renames it.",
      ],
      hint: "When a phrase says the same thing twice in different units, it is an appositive.",
      trap: "Both numbers read as part of one measurement, which hides the boundary between them.",
    },
    {
      number: 2,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The strangeness begins in the middle of summer, when the lake stops behaving as one body of water.",
      wrong: [
        [
          "The upper Midwest contains tens of thousands of lakes formed by retreating glaciers.",
          "The glacial origin of the lakes is never taken up again anywhere in the essay.",
        ],
        [
          "Water temperature is measured by limnologists at several depths throughout the year.",
          "How the measurements are taken is not what this paragraph goes on to describe.",
        ],
        [
          "Summer is a season of considerable biological activity in a temperate lake.",
          "The vague claim about activity does not set up the layering the paragraph explains.",
        ],
      ],
      why:
        "Paragraph 1 ends by promising something strange. This paragraph delivers the first stage of " +
        "it, so the opening should name when that strangeness starts.",
      steps: [
        "Read the last sentence of paragraph 1 and note what it promises.",
        "Choose the opening that begins paying off that promise.",
      ],
      hint: "The previous paragraph ends on a hook; find the choice that answers it.",
      trap: "Every choice is true of Midwestern lakes, so accuracy does not narrow the field.",
    },
    {
      number: 3,
      subskill: "subject-verb agreement",
      family: "subject-across-two-participles",
      difficulty: "Medium",
      keep: false,
      key: "are",
      noChange: "The singular verb has been matched to 'the wind' rather than to 'The top ten or fifteen feet.'",
      wrong: [
        ["was", "The verb is still singular and the past tense breaks the present-tense description."],
        ["has been", "The singular present perfect misses both the number and the standing condition."],
      ],
      why:
        "The subject is 'The top ten or fifteen feet,' which is plural. Everything between the commas " +
        "modifies it and cannot supply the verb's number.",
      steps: [
        "Remove the two participial phrases between the commas.",
        "Read 'The top ten or fifteen feet … are' and match the verb.",
      ],
      hint: "Cut everything between the commas before deciding on the verb.",
      trap: "'The wind' is singular and sits immediately before the verb, which is where the ear listens.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "inverted-subject-agreement",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["lie", "The plural verb does not agree with the singular subject 'a colder, denser mass.'"],
        ["lays", "'Lays' requires an object, and nothing here is being laid down."],
        ["laid", "The past tense of the wrong verb breaks both the tense and the meaning."],
      ],
      why:
        "The sentence is inverted: the subject 'a colder, denser mass' follows the verb. It is " +
        "singular, so the verb is singular.",
      steps: [
        "Turn the sentence around: 'a colder, denser mass lies beneath them.'",
        "Match the verb to that subject.",
      ],
      hint: "When a sentence opens with a place, the subject usually comes after the verb.",
      trap: "'Them' sits right before the verb and is plural, which pulls toward the plural form.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "sharply, and that band is a barrier:",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "sharply, that band being a barrier:",
          "The participle leaves the second clause without a main verb of its own.",
        ],
        [
          "sharply; and that band is a barrier:",
          "A semicolon and a coordinating conjunction do the same work, so using both is redundant.",
        ],
      ],
      why:
        "'The temperature drops sharply' and 'that band is a barrier' are both complete sentences, so " +
        "joining them takes a comma plus a conjunction.",
      steps: [
        "Test each side of the comma as its own sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "The colon later in the sentence is correct; the problem is earlier.",
      trap: "The colon draws the eye, so the splice ahead of it goes unexamined.",
    },
    {
      number: 6,
      subskill: "precision",
      family: "imprecise-verb-phrase",
      difficulty: "Medium",
      keep: false,
      key: "consumed",
      noChange: "'Gotten rid of' is casual and suggests removal rather than chemical use.",
      wrong: [
        ["taken away", "The phrase still describes removal instead of the oxygen being used up."],
        ["made to disappear", "The wording is vaguer than the original and no more accurate."],
      ],
      why:
        "Decay uses the oxygen in chemical reactions; nothing carries it off. 'Consumed' names what " +
        "actually happens and matches the essay's factual register.",
      steps: [
        "Ask what decay actually does to the oxygen. It uses it.",
        "Choose the verb that names consumption rather than removal.",
      ],
      hint: "The right verb has to be true of a chemical process, not of a physical one.",
      trap: "'Gotten rid of' describes the outcome correctly while describing the mechanism wrongly.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "misplaced-prepositional-phrase",
      difficulty: "Hard",
      keep: false,
      key: "cannot reach the water forty feet down in any useful way",
      noChange: "The phrase 'in any useful way' is stranded between the verb and its own object.",
      wrong: [
        [
          "cannot in any useful way reach the water forty feet down",
          "The phrase now splits the auxiliary from the verb it belongs to.",
        ],
        [
          "cannot reach in any useful way water forty feet down",
          "The object loses its article and the phrase still interrupts the verb.",
        ],
      ],
      why:
        "A verb and its direct object belong together. The modifying phrase goes after the object, " +
        "where it describes the reaching without separating it from what is reached.",
      steps: [
        "Identify the verb and its object: 'reach' and 'the water forty feet down.'",
        "Move the modifying phrase so it no longer stands between them.",
      ],
      hint: "Find the verb, find its object, and make sure nothing sits between them.",
      trap: "The original is grammatical and merely awkward, so nothing reads as an error.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Then",
      noChange: "'Similarly' claims a likeness, but the paragraph moves the year forward instead.",
      wrong: [
        ["Nevertheless,", "Nothing in the previous paragraph is being conceded or contradicted."],
        ["In other words,", "The paragraph reports a new stage rather than restating the last one."],
      ],
      why:
        "The essay walks through a year in order — August, autumn, winter, spring. This paragraph " +
        "begins the next stage, so the transition marks time rather than resemblance.",
      steps: [
        "Ask where this paragraph falls in the year the essay is tracing.",
        "Choose the transition that marks the next stage.",
      ],
      hint: "The essay is organized by the calendar, so its transitions mostly mark time.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 9,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'The surface.'"],
        ["the lake", "Naming the lake changes the meaning, since only the surface cools first."],
        ["one", "The indefinite pronoun refers to no particular noun in the sentence."],
      ],
      why:
        "The pronoun refers to 'The surface,' the singular subject of the clause just before, and no " +
        "other noun in the sentence competes for it.",
      steps: [
        "Find the noun the pronoun stands for: 'The surface.'",
        "Confirm it is singular and keep the matching pronoun.",
      ],
      hint: "Ask what is approaching thirty-nine degrees, then check the number.",
      trap: "'The lake' is the more prominent noun nearby and would quietly change the meaning.",
    },
    {
      number: 10,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "down; nutrients come up.",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "down: nutrients come up.",
          "A colon introduces an explanation, but the second clause is the matching half of a pair.",
        ],
        [
          "down and nutrients come up.",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The two clauses are short, complete, and deliberately parallel — one movement down, one up. " +
        "A semicolon joins equals and keeps the symmetry audible.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or mirrors it. It mirrors.",
      ],
      hint: "Two short, balanced sentences are what a semicolon is best at.",
      trap: "The clauses are so short they read as one thought, which makes a comma feel sufficient.",
    },
    {
      number: 11,
      subskill: "conciseness",
      family: "wordy-location-phrase",
      difficulty: "Easy",
      keep: false,
      key: "at the bottom",
      noChange: "'Down at the very bottom part of the lake' takes eight words to say three.",
      wrong: [
        ["down at the bottom of the lake", "'Down' and 'of the lake' are both recoverable from context."],
        ["at the very bottom part", "'Very' and 'part' add emphasis and vagueness rather than information."],
      ],
      why:
        "The sentence has already named the lake and established that this is a vertical " +
        "arrangement. Only the position itself still needs stating.",
      steps: [
        "Cross out every word the sentence has already supplied elsewhere.",
        "Keep what remains.",
      ],
      hint: "Compare the phrase with 'on top' earlier in the same sentence.",
      trap: "The longer phrase feels more concrete, and concreteness is usually a virtue.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "point that turnover is what keeps a lake habitable?",
      key: "Each mixing carries a season's worth of oxygen to a bottom that has had none since June.",
      wrong: [
        [
          "Spring turnover is usually briefer than fall turnover because the water warms quickly.",
          "The relative length of the two events says nothing about what either accomplishes.",
        ],
        [
          "Shallow lakes may mix continuously all summer and never stratify at all.",
          "The exception describes lakes the essay is not about and does not support its point.",
        ],
        [
          "Fish in a stratified lake concentrate in the band where temperature and oxygen suit them.",
          "Where fish gather during stratification is not an effect of the mixing itself.",
        ],
      ],
      why:
        "The essay's argument is that the lower layer runs out of oxygen and turnover restores it. " +
        "Only the choice naming that restoration supports it.",
      steps: [
        "Recall the problem paragraph 3 established: the bottom loses its oxygen.",
        "Keep the choice that shows turnover solving that specific problem.",
      ],
      hint: "The support should answer the problem the essay raised, not add a new fact.",
      trap: "The sentence about fish is the most biological and answers a different question.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "stratifies in summer, turning in fall, inverts under ice, and turns again in spring",
          "The second item shifts to an -ing form the other three do not use.",
        ],
        [
          "stratifies in summer, turns in fall, is inverted under ice, and turns again in spring",
          "The third item switches to the passive while the others stay active.",
        ],
        [
          "stratifies in summer, turns in fall, inverts under ice, and a second turn in spring",
          "The fourth item becomes a noun phrase where the series needs a verb.",
        ],
      ],
      why:
        "Four present-tense verbs share the subject 'A lake' and define one term. Repeating the form " +
        "is what lets a four-part definition hold together.",
      steps: [
        "Read 'A lake that' into each of the four items in turn.",
        "Keep the version in which all four fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "Four items is long enough that the mismatch in the middle is hard to hear.",
    },
    {
      number: 14,
      subskill: "conclusions",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to explain how a single physical property produces an " +
        "entire annual cycle. Would this essay accomplish that goal?",
      key: "Yes, because every stage of the year follows from water being densest at thirty-nine degrees.",
      wrong: [
        [
          "Yes, because it names the four stages of the year in the order they occur.",
          "Listing the stages is description; the goal asks the essay to explain what drives them.",
        ],
        [
          "No, because the essay attributes the mixing to wind rather than to water's density.",
          "Wind can only drive the lake once density has already made the column uniform.",
        ],
        [
          "No, because the loss of oxygen in the lower layer is a biological rather than physical effect.",
          "That effect is a consequence the essay traces, not a competing explanation for the cycle.",
        ],
      ],
      why:
        "One fact from paragraph 1 — maximum density at thirty-nine degrees — accounts for the summer " +
        "layering, the fall sinking, the winter inversion, and the spring turnover.",
      steps: [
        "Identify the single property the essay opens with.",
        "Check whether each stage of the year traces back to it. Each one does.",
      ],
      hint: "The first paragraph states the property; the rest of the essay spends it.",
      trap: "One wrong choice names something the essay really does and calls it the explanation.",
    },
  ],
};
