"use strict";

module.exports = {
  id: "act-english-p018",
  type: "informative-essay",
  title: "Salt Does Not Melt Ice",
  content: `[1] Road salt does not melt ice. The correction is short enough to
sound like a {1 quibble and the} difference between the two descriptions
{2 are} what decides whether a road is safe at ten degrees.

[2] {3} Salt {4 lowers} the temperature at which water freezes. A film of pure
water turns solid at thirty-two degrees Fahrenheit. {5 Salt water staying liquid
to twenty, to ten, in theory to about six below zero.} What a truck spreads on a
highway is not a substance that {6 attacks and goes after} ice. It is a
substance that changes the rules ice has to obey.

[3] Two consequences follow, and both are inconvenient. The first is that salt
needs liquid water before it can work at all. {7 Landing on dry ice at five
degrees, nothing happens to a salt crystal.} It cannot dissolve, and until it
dissolves it cannot {8 do its thing}. That is why crews lay down brine ahead of
a storm rather than dry salt after it.

[4] {9 Similarly,} the process costs heat. Melting ice absorbs energy, and at
low temperatures the pavement has very little of {10 it} to spare. In theory
sodium chloride works down to six below {11 zero, in practice most agencies stop
expecting much} from it below about fifteen degrees, because by then the melting
is slower than the next hour of snow falling on top of it.

[5] {12 For example,} crews change chemicals or change goals. Calcium chloride
{13 gives off heat as it dissolves and stays useful far colder}. Sand melts
nothing whatever and is spread for traction alone. {14}

[6] The distinction is not pedantic. A driver who believes salt melts ice
expects a bare road at any temperature. A driver who knows salt lowers a
freezing point expects sand.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "quibble, and the",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["quibble; and the", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["quibble, and, the", "The second comma separates the conjunction from the subject that follows."],
      ],
      why:
        "'The correction is short enough to sound like a quibble' and 'the difference … is what " +
        "decides' are both complete clauses, so the 'and' between them takes a comma.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "A comma goes before 'and' when a full sentence follows it.",
      trap: "The second clause is long, so by the time it arrives the missing comma is behind you.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'the two descriptions' rather than to 'the difference.'",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense claim."],
        ["have been", "The plural present perfect misses both the number and the standing assertion."],
      ],
      why:
        "The subject is 'the difference,' singular. 'Between the two descriptions' is a prepositional " +
        "phrase, and the noun inside one is never the subject.",
      steps: [
        "Cross out 'between the two descriptions.'",
        "Read 'the difference … is what decides' and match the verb.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'The two descriptions' is plural and sits directly before the verb.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "What salt actually does is change a number.",
      wrong: [
        [
          "Sodium chloride is mined in several states and shipped to municipalities by rail.",
          "Where road salt comes from is never taken up again anywhere in the essay.",
        ],
        [
          "Winter road maintenance is one of the largest line items in a northern city's budget.",
          "The cost of maintenance is not what this paragraph goes on to explain.",
        ],
        [
          "There are several chemical properties of salt that are relevant to winter driving.",
          "The vague plural promises a survey where the paragraph delivers a single mechanism.",
        ],
      ],
      why:
        "Paragraph 1 says the common description is wrong. This paragraph supplies the right one, so " +
        "its opening should announce what salt really does.",
      steps: [
        "Note what the previous paragraph establishes: the usual explanation is wrong.",
        "Choose the opening that begins replacing it.",
      ],
      hint: "The paragraph is a correction, so its first sentence should say what is being corrected to.",
      trap: "Every choice is true about road salt, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["lowered", "The past tense would confine a permanent chemical property to some earlier time."],
        ["is lowering", "The progressive suggests a temporary process rather than what salt always does."],
        ["has lowered", "The present perfect implies a span that began and might end."],
      ],
      why:
        "The sentence states a property that holds always. The simple present is the tense for a " +
        "standing physical fact, and the paragraph uses it throughout.",
      steps: [
        "Check the tense of the verbs nearby: 'turns,' 'is,' 'changes.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A chemical property does not belong to any particular time.",
      trap: "The sentence is correcting an earlier claim, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "sentence-fragment",
      difficulty: "Medium",
      keep: false,
      key: "Salt water stays liquid to twenty, to ten, in theory to about six below zero.",
      noChange: "The -ing form leaves the group of words without a main verb, so it is a fragment.",
      wrong: [
        [
          "Salt water, staying liquid to twenty, to ten, in theory to about six below zero.",
          "The added comma isolates the phrase further without supplying a main verb.",
        ],
        [
          "While salt water staying liquid to twenty, to ten, in theory to about six below zero.",
          "The subordinator makes the fragment worse by promising a main clause that never arrives.",
        ],
      ],
      why:
        "'Staying' is a participle, not a main verb. Changing it to 'stays' gives the subject " +
        "something to do and completes the sentence.",
      steps: [
        "Locate the subject: 'Salt water.'",
        "Check whether it has a main verb. It does not, so supply one.",
      ],
      hint: "A long group of words can still be a fragment; look for the main verb, not the length.",
      trap: "The falling series of temperatures gives the fragment a finished, rhetorical shape.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-verb",
      difficulty: "Easy",
      keep: false,
      key: "attacks",
      noChange: "'Attacks' and 'goes after' name the same action twice.",
      wrong: [
        ["goes after and attacks", "Reversing the order keeps both halves of the repetition."],
        ["attacks or goes after", "Changing the conjunction still leaves two verbs where one is needed."],
      ],
      why:
        "The sentence is denying one idea, not two. A single verb states the thing being denied and " +
        "keeps the contrast with the next sentence clean.",
      steps: [
        "Notice that both verbs mean the same thing here.",
        "Keep the shorter one.",
      ],
      hint: "Paired verbs joined by 'and' are often one verb and its echo.",
      trap: "The doubled phrasing sounds forceful, and force reads as emphasis worth keeping.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Landing on dry ice at five degrees, a salt crystal does nothing.",
      noChange: "The opening phrase describes a crystal, but the word after the comma is 'nothing.'",
      wrong: [
        [
          "Landing on dry ice at five degrees, there is nothing that happens to a salt crystal.",
          "The phrase now attaches to the empty subject 'there,' which lands on nothing.",
        ],
        [
          "Having landed on dry ice at five degrees, nothing happens to a salt crystal.",
          "Changing the participle leaves it attached to the same wrong subject.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The crystal is what lands, so the crystal has to be that noun.",
      steps: [
        "Ask what lands on the ice. A salt crystal does.",
        "Rewrite so 'a salt crystal' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and check whether they match.",
      trap: "The sentence states a true fact, so nothing about it sounds incorrect.",
    },
    {
      number: 8,
      subskill: "precision",
      family: "vague-verb-phrase",
      difficulty: "Easy",
      keep: false,
      key: "lower anything",
      noChange: "'Do its thing' names no action in the sentence that explains the mechanism.",
      wrong: [
        ["perform its function", "The phrase is more formal and just as unspecific as the original."],
        ["have any effect on things", "The wording is vaguer than the original it was meant to fix."],
      ],
      why:
        "The paragraph has just explained that salt works by lowering a freezing point. This sentence " +
        "should name that action, since it is the one thing an undissolved crystal cannot do.",
      steps: [
        "Recall what the previous paragraph said salt does.",
        "Use that verb here.",
      ],
      hint: "The precise verb has already appeared in the essay.",
      trap: "'Do its thing' is idiomatic and fluent, so the sentence does not sound wrong.",
    },
    {
      number: 9,
      subskill: "transitions",
      family: "escalation-transition",
      difficulty: "Medium",
      keep: false,
      key: "Worse,",
      noChange: "'Similarly' claims a likeness, but this paragraph raises a second, harder problem.",
      wrong: [
        ["Therefore,", "The heat cost is not caused by salt's need for liquid water."],
        ["In other words,", "The paragraph introduces a new consequence rather than restating the last."],
      ],
      why:
        "Paragraph 3 gives the first consequence; this one gives the second and more limiting. The " +
        "transition should mark that the problem deepens.",
      steps: [
        "Ask whether this paragraph repeats the last one or goes further.",
        "Choose the transition that escalates.",
      ],
      hint: "The paragraph before this one announced 'two consequences,' both inconvenient.",
      trap: "'Similarly' fits the parallel structure of the two consequences and states no relation.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the singular mass noun 'energy.'"],
        ["that", "The bare demonstrative points at the clause rather than at a noun."],
        ["the ice", "Naming the ice reverses the meaning, since the pavement supplies the heat."],
      ],
      why:
        "The pronoun refers to 'energy,' named in the first half of the sentence, and the pavement is " +
        "what has little of it to give.",
      steps: [
        "Ask what the pavement has little of: energy.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The first clause of the sentence names the antecedent.",
      trap: "'Low temperatures' is plural and sits closer to the pronoun than the antecedent does.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "zero; in practice most agencies stop expecting much",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "zero: in practice most agencies stop expecting much",
          "A colon introduces an explanation, but the second clause opposes the first rather than explaining it.",
        ],
        [
          "zero and in practice most agencies stop expecting much",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The sentence sets theory against practice. Both halves are complete, and a semicolon holds " +
        "the two against each other without making either subordinate.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or is set against it. It is set against it.",
      ],
      hint: "'In theory' and 'in practice' signal a matched pair.",
      trap: "The second clause qualifies the first, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "transitions",
      family: "example-versus-condition-transition",
      difficulty: "Medium",
      keep: false,
      key: "Below fifteen degrees,",
      noChange: "'For example' promises an instance, but the sentence sets a condition.",
      wrong: [
        ["Nevertheless,", "Nothing in the previous paragraph is being conceded or contradicted."],
        ["Similarly,", "Changing chemicals is not like the failure of salt described before it."],
      ],
      why:
        "The previous paragraph establishes fifteen degrees as the practical limit. This paragraph " +
        "describes what happens past that limit, so the transition should name it.",
      steps: [
        "Find the number the previous paragraph ends on: about fifteen degrees.",
        "Choose the transition that carries the reader past it.",
      ],
      hint: "The paragraph needs a threshold, not an example.",
      trap: "'For example' is the commonest paragraph opener there is and passes unexamined.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-verb-pair",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "gives off heat as it dissolves and staying useful far colder",
          "The second verb shifts to an -ing form the first does not use.",
        ],
        [
          "gives off heat as it dissolves and is useful to a far colder temperature",
          "The pair no longer matches, and the second half restates rather than continues.",
        ],
        [
          "giving off heat as it dissolves and stays useful far colder",
          "The first verb becomes a participle, leaving the sentence without a main verb.",
        ],
      ],
      why:
        "Two present-tense verbs share the subject 'Calcium chloride,' and the sentence contrasts it " +
        "with sodium chloride on both counts at once. Both verbs must take the same form.",
      steps: [
        "Read 'Calcium chloride' into each half of the pair.",
        "Keep the version in which both halves are simple present.",
      ],
      hint: "Test a pair the same way you would test a longer series.",
      trap: "The two halves describe different kinds of behaviour, which makes varying the form feel natural.",
    },
    {
      number: 14,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the " +
        "paragraph's point that the goal itself changes below fifteen degrees?",
      key: "A sanded road is not clear; it is merely one a tire can hold onto.",
      wrong: [
        [
          "Calcium chloride is more expensive per ton than sodium chloride is.",
          "Relative cost explains why crews hesitate, not what the new goal is.",
        ],
        [
          "Sand is usually stockpiled at the same depots that store road salt.",
          "Where sand is kept has no bearing on what spreading it is meant to achieve.",
        ],
        [
          "Magnesium chloride is another chemical used by some northern agencies.",
          "Naming a third chemical extends the list without addressing the change in goal.",
        ],
      ],
      why:
        "The paragraph says crews change chemicals *or change goals*. The sand half is the changed " +
        "goal, and only one choice says what that goal actually is.",
      steps: [
        "Notice the paragraph offers two responses, and sand is the second.",
        "Keep the choice that defines what sand is meant to accomplish.",
      ],
      hint: "The question asks about the goal, not about the chemicals.",
      trap: "The cost choice is the most practical-sounding and answers a different question.",
    },
    {
      number: 15,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to show that a small inaccuracy in how something is " +
        "described leads people to expect the wrong thing. Would this essay accomplish that goal?",
      key: "Yes, because it ends by contrasting what each of the two descriptions leads a driver to expect.",
      wrong: [
        [
          "Yes, because it explains that sodium chloride works in theory to six degrees below zero.",
          "The theoretical limit is part of the mechanism, not part of what drivers expect.",
        ],
        [
          "No, because the essay concerns the chemistry of freezing-point depression rather than belief.",
          "The chemistry is what the essay uses to show why the belief misleads.",
        ],
        [
          "No, because the two descriptions of salt produce the same result at ordinary temperatures.",
          "That they agree above fifteen degrees is precisely why the error goes unnoticed.",
        ],
      ],
      why:
        "The closing paragraph puts the two beliefs side by side and gives each its consequence: one " +
        "driver expects a bare road, the other expects sand.",
      steps: [
        "Read the final paragraph and note that it is about expectations, not chemistry.",
        "Keep the reason that rests on that contrast.",
      ],
      hint: "The last two sentences of the essay answer the question directly.",
      trap: "One wrong choice states something true that is the reason the error survives.",
    },
  ],
};
