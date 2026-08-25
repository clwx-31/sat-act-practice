"use strict";

module.exports = {
  id: "act-english-p008",
  type: "process-narrative",
  title: "Six Weeks of Cold Nights",
  content: `[1] A sugar maple does not give up sap because it is spring. It gives
up sap because the temperature crosses freezing twice a day. Cold nights draw
water up into the trunk, {1 warm days build pressure in the wood and a hole}
drilled through the bark lets it out.

[2] {2 In contrast,} tapping begins when that pattern settles in, usually in late
February. The tap is a metal spout driven into a hole about an inch and a half
deep. One healthy tree carries one or two taps and rarely three, since the number
a trunk can support {3 depend} on its diameter, and a tap {4 does} the tree no
lasting harm.

[3] What runs out of the spout looks like water and {5 tastes faintly sweet in
terms of its flavor}. It is about two percent sugar. Finished syrup is
sixty-six percent. {6 With only two percent sugar, the sugarmaker must drive off
nearly forty gallons of water for every gallon of syrup.}

[4] The boiling is done in a long, shallow pan over a hot fire, because shallow
sap concentrates faster and scorches less, and sap that scorches cannot be
recovered once {7 they have} caught. The finish is judged neither by the clock
nor by eye but by {8 a thing that measures temperature}: syrup is done when it
boils about seven degrees above the temperature at which water boils that
{9 day, and that temperature changes with the weather.}

[5] The syrup is then {10 filtered while hot, graded by color, and sealed while
warm}, since the fine grit called sugar sand settles out as it cools and will
cloud a jar. {11 Meanwhile,} the run lasts exactly as long as the nights stay
cold, which in most years is about six weeks.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "warm days build pressure in the wood, and a hole",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["warm days build pressure in the wood; and a hole", "A semicolon and a conjunction do the same job, so using both is redundant."],
        ["warm days, build pressure in the wood and a hole", "The comma now separates the subject from its own verb."],
      ],
      why:
        "'Warm days build pressure in the wood' and 'a hole drilled through the bark lets it out' are " +
        "both complete sentences, so the 'and' joining them takes a comma before it.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "A comma goes before 'and' only when a full sentence follows it.",
      trap: "The sentence already contains one comma, which makes a second look excessive.",
    },
    {
      number: 2,
      subskill: "transitions",
      family: "contrast-versus-consequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Accordingly,",
      noChange: "'In contrast' sets up an opposition, but this paragraph follows from the last one.",
      wrong: [
        ["Even so,", "The concession answers an objection the first paragraph never raised."],
        ["Meanwhile,", "The tapping does not run alongside the freeze-thaw cycle; it waits for it."],
      ],
      why:
        "Paragraph 1 explains the freeze-thaw cycle that makes sap move. Tapping begins because that " +
        "cycle has started, so the transition should signal consequence.",
      steps: [
        "State the relationship between the paragraphs: the second depends on the first.",
        "Choose the transition that marks a consequence rather than a contrast.",
      ],
      hint: "Name the relationship in your own words before reading the choices.",
      trap: "'In contrast' sounds like it is organizing the essay while asserting the opposite relation.",
    },
    {
      number: 3,
      subskill: "subject-verb agreement",
      family: "subject-across-a-relative-clause",
      difficulty: "Medium",
      keep: false,
      key: "depends",
      noChange: "The verb has been matched to 'taps' rather than to the singular subject 'the number.'",
      wrong: [
        ["are depending", "The verb is still plural and the progressive form suits no general rule."],
        ["have depended", "The plural present perfect misses the number and reports a finished span."],
      ],
      why:
        "The subject is 'the number,' which is singular. 'A trunk can support' is a relative clause " +
        "describing the taps, and a clause never supplies the subject of the main verb.",
      steps: [
        "Strip the relative clause and read what remains: 'the number … depends.'",
        "Match the verb to that singular subject.",
      ],
      hint: "'The number of' is singular; 'a number of' is plural.",
      trap: "'Taps' is plural and sits immediately before the verb, which is where the ear listens.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "simple-present-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["did", "The past tense reports one occasion instead of a fact that holds generally."],
        ["is doing", "The progressive describes a moment rather than a standing truth."],
        ["has done", "The present perfect points to completed instances rather than a rule."],
      ],
      why:
        "The clause states something true of tapping in general, and the rest of the paragraph is in " +
        "the simple present. The simple present is what states a standing fact.",
      steps: [
        "Check the tense of the verbs around it: 'carries,' 'depends.' All simple present.",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A process narrative states what always happens, which the simple present is built for.",
      trap: "The sentence sits at the end of a long chain of clauses, so its subject is easy to lose.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "empty-qualifier",
      difficulty: "Easy",
      keep: false,
      key: "tastes faintly sweet",
      noChange: "'In terms of its flavor' repeats what the verb 'tastes' has already established.",
      wrong: [
        ["tastes faintly sweet in flavor", "'In flavor' still restates the information carried by 'tastes.'"],
        ["has a faintly sweet sort of taste", "The noun phrasing is longer and less direct than the verb."],
      ],
      why:
        "'Tastes' already names the sense involved. Any phrase specifying that the taste is a taste " +
        "adds words without adding meaning.",
      steps: [
        "Notice what the verb already tells you.",
        "Delete the phrase that repeats it.",
      ],
      hint: "'In terms of' is almost always removable.",
      trap: "The phrase sounds careful and analytical, which is how empty qualifiers survive edits.",
    },
    {
      number: 6,
      subskill: "modifiers",
      family: "misattached-prepositional-opener",
      difficulty: "Hard",
      keep: false,
      key: "Because the sap carries only two percent sugar, the sugarmaker must drive off nearly forty gallons of water for every gallon of syrup.",
      noChange: "The opening phrase describes the sap, but the noun after the comma is the sugarmaker.",
      wrong: [
        [
          "With only two percent sugar, nearly forty gallons of water must be driven off for every gallon of syrup.",
          "The phrase now describes the water, which is the thing without any sugar in it.",
        ],
        [
          "Having only two percent sugar, the sugarmaker must drive off nearly forty gallons of water for every gallon of syrup.",
          "Changing the form leaves the phrase attached to the same wrong noun.",
        ],
      ],
      why:
        "An opening phrase attaches to the noun that follows it. Sap has two percent sugar; the " +
        "sugarmaker does not. Turning the phrase into a clause names the sap outright.",
      steps: [
        "Ask what has only two percent sugar. The sap does.",
        "Rewrite so the sap is named rather than left implied.",
      ],
      hint: "Read the opening phrase, then read the first noun after the comma, and see if they match.",
      trap: "The sentence states a true fact about the sugarmaker, so nothing sounds factually wrong.",
    },
    {
      number: 7,
      subskill: "pronouns",
      family: "pronoun-agreement-with-a-singular",
      difficulty: "Medium",
      keep: false,
      key: "it has",
      noChange: "The plural pronoun and verb do not agree with the singular noun 'sap.'",
      wrong: [
        ["they has", "The pronoun stays plural while the verb becomes singular, so neither agrees."],
        ["it have", "The pronoun is corrected but the verb remains plural."],
      ],
      why:
        "'Sap' is a mass noun and takes singular agreement. Both the pronoun and its verb have to " +
        "follow it.",
      steps: [
        "Find the noun the pronoun replaces: 'sap.'",
        "Make both the pronoun and its verb singular.",
      ],
      hint: "Two words have to change here, not one.",
      trap: "Two choices fix half the error, and half a fix reads as a fix.",
    },
    {
      number: 8,
      subskill: "precision",
      family: "circumlocution",
      difficulty: "Medium",
      keep: false,
      key: "thermometer",
      noChange: "'A thing that measures temperature' describes an instrument that already has a name.",
      wrong: [
        ["a temperature-measuring device", "The hyphenated phrase is still a description rather than the name."],
        ["an instrument of the appropriate kind", "The wording is vaguer than the original it was meant to fix."],
      ],
      why:
        "The sentence is contrasting three ways of judging the finish — clock, eye, and instrument. " +
        "The third needs to be as short and definite as the first two.",
      steps: [
        "Note the pattern the sentence sets up: 'neither by the clock nor by eye but by ___.'",
        "Supply the single noun that completes it.",
      ],
      hint: "The two things it is being contrasted with are one word each.",
      trap: "Describing an object instead of naming it sounds explanatory rather than evasive.",
    },
    {
      number: 9,
      subskill: "clause relationships",
      family: "compound-sentence-with-a-clear-subject",
      difficulty: "Medium",
      keep: true,
      wrong: [
        [
          "day, which changes with the weather.",
          "'Which' would attach to 'day' rather than to the boiling temperature that is meant.",
        ],
        [
          "day, changing with the weather.",
          "The participle leaves the reader to guess what it modifies among three nearby nouns.",
        ],
        [
          "day; and that temperature changes with the weather.",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "The second clause needs its own stated subject, because the sentence has just named a day, " +
        "a temperature, and water. Repeating 'that temperature' removes the ambiguity.",
      steps: [
        "List the nouns a pronoun or relative could attach to. There are three.",
        "Keep the version that names the intended subject outright.",
      ],
      hint: "When several nouns compete, a full clause beats a relative pronoun.",
      trap: "'Which' is more economical, and economy usually is the better answer — but not here.",
    },
    {
      number: 10,
      subskill: "parallelism",
      family: "parallel-participle-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "filtered while hot, graded by color, and they seal it while warm",
          "The third item becomes an independent clause with a new subject.",
        ],
        [
          "filtered while hot, grading by color, and sealed while warm",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "filtering while hot, graded by color, and sealed while warm",
          "The first item breaks the pattern the other two establish.",
        ],
      ],
      why:
        "Three past participles share the subject 'The syrup' and one auxiliary, 'is.' Each has to be " +
        "able to follow that auxiliary on its own.",
      steps: [
        "Read 'The syrup is' into each item in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem into each item separately.",
      trap: "The items are separated by long modifiers, which makes the mismatch hard to hear.",
    },
    {
      number: 11,
      subskill: "transitions",
      family: "summarizing-transition",
      difficulty: "Easy",
      keep: false,
      key: "All told,",
      noChange: "'Meanwhile' claims simultaneity, but this sentence sums the whole season up.",
      wrong: [
        ["However,", "The sentence completes the account rather than qualifying anything in it."],
        ["For example,", "The length of the season is not an instance of filtering or grading."],
      ],
      why:
        "The final sentence steps back from the steps and reports how long the whole run lasts. The " +
        "transition should mark that step back.",
      steps: [
        "Ask what the sentence is doing: summing up rather than continuing the sequence.",
        "Choose the transition that signals a summary.",
      ],
      hint: "The last sentence of a process narrative usually stops narrating and starts totaling.",
      trap: "'Meanwhile' feels at home in a narrative even where nothing is happening at once.",
    },
    {
      number: 12,
      subskill: "organization",
      family: "paragraph-move",
      difficulty: "Hard",
      stem:
        "The writer is considering moving Paragraph 3 so that it appears immediately after " +
        "Paragraph 4. Should the writer make this change?",
      key: "No, because the forty-to-one ratio is what explains why so much boiling is necessary.",
      wrong: [
        [
          "No, because Paragraph 3 is the only paragraph that gives numerical measurements.",
          "Paragraph 2 gives a depth and Paragraph 4 gives a temperature, so the claim is false.",
        ],
        [
          "Yes, because the boiling is the most demanding step and should be described first.",
          "Difficulty is not what orders a process narrative; sequence and cause are.",
        ],
        [
          "Yes, because both paragraphs concern the removal of water and belong side by side.",
          "They already sit side by side, and reversing them would put the result before its reason.",
        ],
      ],
      why:
        "Paragraph 3 establishes how little sugar sap carries. Paragraph 4 describes the boiling that " +
        "answers that fact. Reversing them states the remedy before the problem.",
      steps: [
        "Say what each paragraph contributes: one gives the ratio, the next gives the response.",
        "Ask whether the response makes sense before the ratio is known. It does not.",
      ],
      hint: "In a process narrative, a step's reason has to come before the step.",
      trap: "Both paragraphs really are about water, which makes grouping them sound tidier.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Medium",
      stem:
        "Suppose the writer's goal had been to explain a process whose schedule is set by the " +
        "weather rather than by the person performing it. Would this essay accomplish that goal?",
      key: "Yes, because the weather opens the season, sets the finishing temperature, and ends the run.",
      wrong: [
        [
          "Yes, because it explains that a tap does a healthy sugar maple no lasting harm.",
          "The effect of tapping on the tree has nothing to do with who controls the schedule.",
        ],
        [
          "No, because the sugarmaker decides when to tap, how deep to drill, and how hot to burn.",
          "Those choices all happen inside a window the freeze-thaw cycle opens and closes.",
        ],
        [
          "No, because the essay describes equipment more thoroughly than it describes the season.",
          "The spout and the pan get a sentence each; the season frames the whole account.",
        ],
      ],
      why:
        "Three separate points turn on the weather: the freeze-thaw cycle that starts the flow, the " +
        "day's boiling point that defines the finish, and the warm nights that end the run.",
      steps: [
        "Scan for every place the essay lets weather decide something.",
        "Keep the reason that names more than one of them.",
      ],
      hint: "Count how many steps the weather controls before choosing a reason.",
      trap: "One wrong choice lists real decisions the sugarmaker makes and draws the wrong conclusion.",
    },
  ],
};
