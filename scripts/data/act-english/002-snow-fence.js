"use strict";

module.exports = {
  id: "act-english-p002",
  type: "informative-essay",
  title: "Where the Snow Lands",
  content: `[1] Along the interstates of the northern plains, low slatted
{1 fences, stand} in the fields, sometimes a hundred yards from the pavement.
{2 Not to keep anything in or out.} They are snow fences, and their work is to
decide where snow lands.

[2] The common assumption is that a snow fence blocks drifting snow. It does
not. A solid barrier would only move the problem, because wind piles snow
directly against it and the drift creeps forward until the fence is buried and
the road is covered again. The gaps in a snow fence {3 are} what make it work.

[3] {4} Slower air cannot carry as much snow, so the snow settles out downwind
in a long, {5 tapering drift that gradually tapers off}. {6 Measured across its
face, engineers find that a fence works best at about half open.} A fence that
is too solid drifts against itself, and one that is too open never slows the
wind enough to make it drop what it is carrying. The proportion of gap to board
{7 — roughly half and half —} matters more than whether the slats are wood or
plastic.

[4] Placement matters {8 more than the fence}. A drift forms downwind for about
thirty times the fence's height, so a six-foot fence belongs some two hundred
feet back from the road it protects, {9 farther back than you would guess}.
Highway departments set the line by the prevailing winter wind rather than by
the property line, which is why a snow fence so often runs at an angle to the
pavement instead of parallel to it.

[5] The design is old. Railroads in the 1880s {10 built} them out of scrap lath
and set them along the cuts where drifts stopped trains. {11 Nevertheless,} the
plains states have used them without interruption. {12} A snow fence costs a
small fraction of what plowing the same stretch costs across one winter, and
{13 it} works while nobody is watching.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-between-subject-and-verb",
      difficulty: "Easy",
      keep: false,
      key: "fences stand",
      noChange: "A comma cannot stand between a subject and the verb that belongs to it.",
      wrong: [
        ["fences; stand", "A semicolon separates independent clauses, and 'stand in the fields' is not one."],
        ["fences stand,", "Moving the comma leaves it interrupting the verb and its own prepositional phrase."],
      ],
      why:
        "'Fences' is the subject of 'stand.' Nothing interrupts them, so no punctuation belongs " +
        "between the two.",
      steps: [
        "Find the subject and its verb: 'fences … stand.'",
        "Remove any mark that falls between them when nothing is inserted there.",
      ],
      hint: "Read the sentence without the opening phrase and listen for the break.",
      trap: "The long opening phrase makes a pause feel natural exactly where it is wrong.",
    },
    {
      number: 2,
      subskill: "clause relationships",
      family: "sentence-fragment",
      difficulty: "Easy",
      keep: false,
      key: "They are not there to keep anything in or out.",
      noChange: "The group of words has no subject and no main verb, so it is a fragment.",
      wrong: [
        ["Not keeping anything in or out.", "Changing the verb form leaves the fragment without a subject."],
        ["Which is not to keep anything in or out.", "A relative clause cannot stand on its own as a sentence."],
      ],
      why:
        "An infinitive phrase cannot serve as a sentence. Supplying the subject 'They' and the verb " +
        "'are' turns it into a complete statement about the fences.",
      steps: [
        "Ask what the subject of the sentence is. There is none.",
        "Choose the version that supplies both a subject and a main verb.",
      ],
      hint: "A group of words starting with 'to' plus a verb is rarely a sentence by itself.",
      trap: "The fragment reads as a deliberate stylistic clip, which makes it sound intended.",
    },
    {
      number: 3,
      subskill: "subject-verb agreement",
      family: "subject-verb-across-a-phrase",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["is", "The verb has been matched to 'fence' instead of to the plural subject 'gaps.'"],
        ["was", "The past tense contradicts the present-tense explanation running through the paragraph."],
        ["has been", "The singular present perfect misses the plural subject and the timeless claim."],
      ],
      why:
        "The subject is 'The gaps,' which is plural. 'In a snow fence' is a prepositional phrase, " +
        "and the noun inside a prepositional phrase is never the subject.",
      steps: [
        "Cross out the prepositional phrase 'in a snow fence.'",
        "Read what is left — 'The gaps … are' — and confirm the verb matches.",
      ],
      hint: "Delete the phrase between the subject and the verb, then check agreement.",
      trap: "'Fence' sits directly before the verb and is singular, which pulls the ear the wrong way.",
    },
    {
      number: 4,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "When wind carrying snow meets a porous fence, it slows without stopping.",
      wrong: [
        [
          "Snow fences have been studied by highway engineers for over a century.",
          "A sentence about research history does not set up the physical explanation that follows.",
        ],
        [
          "Drifting snow is one of the most expensive problems a northern highway faces.",
          "The cost of drifting belongs to the closing paragraph, not to this mechanism.",
        ],
        [
          "There are several things a driver should know about winter road maintenance.",
          "The vague promise names no idea that the rest of the paragraph then develops.",
        ],
      ],
      why:
        "The paragraph explains a chain: wind slows, slower air drops snow, the drift forms downwind. " +
        "The opening has to supply the first link, and only one choice does.",
      steps: [
        "Read the sentence immediately after the blank. It begins 'Slower air …'",
        "Choose the opening that makes 'slower' refer to something already said.",
      ],
      hint: "The next sentence names its own antecedent; find the choice that supplies it.",
      trap: "Every choice is true and on the subject of snow fences, so truth cannot decide it.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "redundancy",
      difficulty: "Easy",
      keep: false,
      key: "tapering drift",
      noChange: "'Tapering' and 'gradually tapers off' state the same thing twice.",
      wrong: [
        ["drift that gradually tapers off and thins", "'Tapers off' and 'thins' repeat one idea in two verbs."],
        ["tapering, gradually thinning drift", "Two modifiers deliver the same information about the drift."],
      ],
      why:
        "The adjective 'tapering' already describes a drift that thins as it goes. Restating it in a " +
        "relative clause adds length without adding meaning.",
      steps: [
        "Identify the idea in the adjective: the drift narrows.",
        "Cut any following phrase that says only that again.",
      ],
      hint: "When a modifier and a clause mean the same thing, keep the shorter one.",
      trap: "The redundancy is split across an adjective and a verb, so it does not read as a repeat.",
    },
    {
      number: 6,
      subskill: "modifiers",
      family: "dangling-modifier",
      difficulty: "Hard",
      keep: false,
      key: "Measured across its face, a fence works best at about half open.",
      noChange: "The opening phrase describes the fence, but the noun after the comma is 'engineers.'",
      wrong: [
        [
          "Measuring across its face, a fence works best at about half open.",
          "The active form makes the fence do the measuring, which reverses the meaning.",
        ],
        [
          "Measured across its face, the best result comes at about half open.",
          "The phrase now modifies 'result,' and a result cannot be measured across a face.",
        ],
      ],
      why:
        "An opening modifier attaches to the first noun after the comma. 'Measured across its face' " +
        "describes the fence, so the fence has to be that noun.",
      steps: [
        "Ask what is being measured across its face. The fence is.",
        "Rewrite so that 'a fence' is the first noun after the comma.",
      ],
      hint: "Name the thing the opening phrase describes, then look at what follows the comma.",
      trap: "The sentence states a true fact about engineers, so the mismatch reads as ordinary prose.",
    },
    {
      number: 7,
      subskill: "dashes and parentheses",
      family: "paired-dashes",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["— roughly half and half,", "A dash and a comma cannot pair; an interrupter needs matching marks."],
        ["(roughly half and half —", "A parenthesis and a dash are mismatched openings and closings."],
        [", roughly half and half —", "The comma opens the interrupter with a mark the dash does not answer."],
      ],
      why:
        "The phrase interrupts the subject and its verb, so it needs a matched pair of marks around " +
        "it. Two dashes is such a pair; a dash with a comma is not.",
      steps: [
        "Check that the sentence still works when the interrupter is removed. It does.",
        "Confirm the marks on both sides of the interrupter are the same kind.",
      ],
      hint: "Whatever mark opens an interrupter has to be the mark that closes it.",
      trap: "Each wrong choice is correct on one side, so a quick glance at either end passes.",
    },
    {
      number: 8,
      subskill: "comparisons",
      family: "illogical-comparison",
      difficulty: "Medium",
      keep: false,
      key: "more than the fence's design",
      noChange: "The sentence compares placement to a fence rather than to another quality of it.",
      wrong: [
        ["more than fences", "Comparing where a fence sits to fences themselves still compares unlike things."],
        ["the most of all", "The superlative names no second item, so nothing is actually being compared."],
      ],
      why:
        "A comparison has to hold two like things side by side. Placement and design are both " +
        "properties of a fence; placement and the fence itself are not comparable.",
      steps: [
        "Name the two things being compared: placement and 'the fence.'",
        "Replace the object with the property that placement can be weighed against.",
      ],
      hint: "Ask whether the two sides of 'more than' are the same kind of thing.",
      trap: "The shortened comparison is how people speak, so the ear accepts it.",
    },
    {
      number: 9,
      subskill: "consistency",
      family: "person-shift",
      difficulty: "Medium",
      keep: false,
      key: "farther back than most drivers would guess",
      noChange: "The essay never addresses a reader as 'you' anywhere else in its five paragraphs.",
      wrong: [
        ["farther back than one would guess", "The formal 'one' is still a shift away from the essay's third person."],
        ["farther back than we would guess", "The first-person plural pulls in a narrator the essay does not have."],
      ],
      why:
        "The passage is written about fences, wind, and highway departments in the third person. " +
        "Naming the drivers keeps that stance instead of turning to address the reader.",
      steps: [
        "Scan the paragraph for any other person: 'departments,' 'a fence,' 'the road.' All third.",
        "Choose the option that stays in the third person.",
      ],
      hint: "Check what person the surrounding sentences use before you pick a pronoun.",
      trap: "'You' feels friendly and direct, which makes it read as good informative writing.",
    },
    {
      number: 10,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["had built", "The past perfect needs a later past event to sit before, and none is given."],
        ["have built", "The present perfect implies the building continues into the present."],
        ["build", "The present tense contradicts the date the sentence itself supplies."],
      ],
      why:
        "The sentence names a finished period, the 1880s, so the simple past reports it directly.",
      steps: [
        "Locate the time marker in the sentence: 'in the 1880s.'",
        "Match the verb to that completed past.",
      ],
      hint: "Let the date in the sentence choose the tense.",
      trap: "The paragraph opens in the present tense, which makes the past tense look inconsistent.",
    },
    {
      number: 11,
      subskill: "transitions",
      family: "contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "Since then,",
      noChange: "'Nevertheless' announces a contrast, but the two sentences agree with each other.",
      wrong: [
        ["However,", "Like 'Nevertheless,' it sets up an opposition the sentences do not contain."],
        ["For instance,", "The sentence continues the history rather than giving an example of it."],
      ],
      why:
        "The railroads built snow fences and the plains states kept using them. That is continuation " +
        "in time, so the transition should mark the passage of time.",
      steps: [
        "State the relationship between the two sentences in one word: continuation.",
        "Pick the transition that signals continuation rather than contrast or illustration.",
      ],
      hint: "Decide what the relationship is before you look at the choices.",
      trap: "The wrong choices are the two most common transitions, so they feel safe.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, best prepares the reader " +
        "for the cost comparison in the sentence that follows?",
      key: "A mile of fence is put up once and then left standing for twenty winters.",
      wrong: [
        [
          "Modern fences are usually orange plastic mesh rather than the original wooden lath.",
          "Material has already been ruled out as the thing that matters in paragraph 3.",
        ],
        [
          "Wyoming maintains more miles of snow fence than any other state in the country.",
          "A ranking establishes scale but says nothing about what a fence costs to run.",
        ],
        [
          "Drifting snow can close a rural highway for days at a time during a hard winter.",
          "The consequence of drifting is not the same as the expense of preventing it.",
        ],
      ],
      why:
        "The next sentence weighs one winter of plowing against the price of a fence. The detail that " +
        "prepares it is the one establishing that a fence is paid for once and keeps working.",
      steps: [
        "Read the sentence after the blank and name its claim: a fence is cheaper than plowing.",
        "Keep the choice that supplies the reason that claim holds.",
      ],
      hint: "A setup sentence should make the sentence after it feel already half proved.",
      trap: "Three choices are interesting facts about snow fences, and interest is not support.",
    },
    {
      number: 13,
      subskill: "pronouns",
      family: "ambiguous-pronoun",
      difficulty: "Hard",
      keep: false,
      key: "the fence",
      noChange: "'It' could refer to the fence or to the plowing, and the sentence names both.",
      wrong: [
        ["they", "The plural pronoun agrees with neither of the singular nouns in the sentence."],
        ["this", "The demonstrative is as unanchored as 'it' and points at the same two candidates."],
      ],
      why:
        "The sentence has just mentioned a snow fence and the cost of plowing. A pronoun with two " +
        "possible antecedents has to be replaced by the noun itself.",
      steps: [
        "List the singular nouns the pronoun could refer to: the fence, the plowing.",
        "Since more than one fits, name the intended noun outright.",
      ],
      hint: "Count how many nouns the pronoun could point to before deciding it is clear.",
      trap: "Context makes the intended meaning obvious, and obviousness is not the same as clarity.",
    },
    {
      number: 14,
      subskill: "conclusions",
      family: "closing-sentence",
      difficulty: "Hard",
      stem:
        "The writer is considering deleting the final clause of the essay, “and it works while " +
        "nobody is watching.” Should the clause be kept or deleted?",
      key: "Kept, because it names the quality that has made the fence worth its cost for a century.",
      wrong: [
        [
          "Kept, because it introduces the idea that snow fences require no maintenance at all.",
          "The essay never claims a fence is maintenance-free, so the clause cannot introduce it.",
        ],
        [
          "Deleted, because the essay has already explained how a snow fence slows the wind.",
          "Restating the mechanism is not what the clause does, so that is no reason to cut it.",
        ],
        [
          "Deleted, because it shifts the essay from information to the writer's own opinion.",
          "That a fence works unattended is a fact the essay has built toward, not a judgment.",
        ],
      ],
      why:
        "The essay's last paragraph is about cost, and the clause completes it: the fence is cheap " +
        "because it needs no operator. Cutting it ends the essay on the price alone.",
      steps: [
        "Decide what the final paragraph is about. Cost, not mechanism.",
        "Ask whether the clause adds to that idea or repeats an earlier one. It adds.",
      ],
      hint: "Judge the clause against the paragraph it closes, not against the whole essay.",
      trap: "The clause sounds like a flourish, and flourishes are the usual answer to a delete question.",
    },
  ],
};
