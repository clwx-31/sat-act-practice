"use strict";

module.exports = {
  id: "act-english-p003",
  type: "historical-account",
  title: "The Threads Did Not Match",
  content: `[1] On the morning of {1 February 7 1904 a fire} began in the
basement of a dry goods warehouse in downtown Baltimore. It burned for thirty
hours. When crews finally stopped it at the Jones Falls, it {2 had taken}
roughly eighty city blocks and some fifteen hundred buildings.

[2] {3} Baltimore's own companies could not hold the fire, and the city
telegraphed for help. Engines came from Washington, from Philadelphia, from New
York and Wilmington and Harrisburg. By the end, more than twenty {4 citys}
crews were standing in the streets of a burning downtown. {5 They had brought
their engines they could do very little with them.}

[3] The problem was the threads. A fire hose ends in a brass coupling that
screws onto a hydrant, and in 1904 there was no agreement about {6 how that
coupling should be cut and shaped in terms of its threading}. Cities bought from
local foundries, and the foundries used the pattern they had always used.
{7 Cut by a local foundry to a local pattern, a visiting company found that its
couplings fit nothing.} Crews tried packing the joints with canvas and leather
{8 ; the pressure blew them apart.}

[4] {9 Likewise,} the argument moved from the streets to the committee rooms.
Within a year the National Fire Protection Association had adopted a national
standard for hose coupling threads. The chiefs who had argued about the cost of
the change found that the decision now fell to {10 they and their city
councils}. Adoption {11 took a long while} anyway. {12} A city that agreed to
the standard had to replace {13 every hydrant, every hose, and every engine it
owned}, and some of them were still converting in the 1920s.

[5] The standard is why a strange engine can pull up to a hydrant in a city it
has never worked in and go straight to work. It is an unglamorous sort of
progress. Nobody remembers the committee, and {14 the fire is remembered
instead}.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "date-commas",
      difficulty: "Easy",
      keep: false,
      key: "February 7, 1904, a fire",
      noChange: "A full date needs a comma before the year and another after it.",
      wrong: [
        ["February 7, 1904 a fire", "The comma after the year is missing, so the date runs into the subject."],
        ["February 7 1904, a fire", "The comma before the year is missing, which is the first of the two required."],
      ],
      why:
        "When a date gives month, day, and year inside a sentence, the year is set off by commas on " +
        "both sides. Only one choice supplies both.",
      steps: [
        "Place the first comma between the day and the year.",
        "Place the second after the year, before the sentence continues.",
      ],
      hint: "A year written out mid-sentence takes a comma on each side, like an interrupter.",
      trap: "Choices that fix one comma look right until you check the other side of the year.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "past-perfect-for-the-earlier-past",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["took", "The simple past loses the order between the taking and the stopping."],
        ["has taken", "The present perfect connects a 1904 fire to the present moment."],
        ["was taking", "The past progressive suggests the burning was still going on when it stopped."],
      ],
      why:
        "The destruction happened before the crews stopped the fire, and the sentence names that " +
        "later moment. The past perfect is what marks the earlier of two past events.",
      steps: [
        "Find the two past events: the fire taking blocks, then the crews stopping it.",
        "Put the earlier one in the past perfect.",
      ],
      hint: "When a sentence names two past moments, the earlier one usually takes 'had.'",
      trap: "The simple past reads more plainly, and plainer often feels like the safer answer.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "By the second day the fire had outgrown any one city's ability to fight it.",
      wrong: [
        [
          "Baltimore in 1904 was the sixth-largest city in the United States.",
          "The city's rank never becomes relevant to the help that arrives in this paragraph.",
        ],
        [
          "Firefighting in the early twentieth century was dangerous and poorly paid work.",
          "A general claim about the profession does not set up the specific call for help.",
        ],
        [
          "The telegraph had by then reached nearly every city on the eastern seaboard.",
          "The technology is a detail of the request, not the reason the request was made.",
        ],
      ],
      why:
        "The paragraph is about outside companies arriving and failing to help. Its opening has to " +
        "establish that Baltimore needed them, which is what makes everything after it follow.",
      steps: [
        "Read the sentence after the blank: Baltimore could not hold the fire and wired for help.",
        "Choose the opening that gives the reason help was needed at all.",
      ],
      hint: "The best opening makes the next sentence sound like a consequence.",
      trap: "Every choice is a true fact about 1904, so period detail is not the test.",
    },
    {
      number: 4,
      subskill: "apostrophes",
      family: "plural-possessive",
      difficulty: "Easy",
      keep: false,
      key: "cities'",
      noChange: "The plural of 'city' is 'cities,' and no apostrophe marks the possession.",
      wrong: [
        ["city's", "The singular possessive contradicts 'more than twenty' in the same phrase."],
        ["cities", "The plural is spelled correctly but still shows no possessive relationship."],
      ],
      why:
        "More than twenty cities own the crews, so the noun needs the plural spelling 'cities' and " +
        "then an apostrophe after the s.",
      steps: [
        "Spell the plural first: 'cities.'",
        "Add the apostrophe after the s to make the plural possessive.",
      ],
      hint: "Get the plural right before you decide where the apostrophe goes.",
      trap: "'Citys' is a misspelling and a missing apostrophe at once, so fixing one still fails.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "fused-sentence",
      difficulty: "Easy",
      keep: false,
      key: "They had brought their engines, but they could do very little with them.",
      noChange: "Two complete clauses run together with no punctuation and no conjunction.",
      wrong: [
        [
          "They had brought their engines, they could do very little with them.",
          "Adding only a comma turns the fused sentence into a comma splice.",
        ],
        [
          "They had brought their engines and could do very little with them.",
          "The conjunction joins the clauses but 'and' claims agreement where there is contrast.",
        ],
      ],
      why:
        "Two independent clauses need both a comma and a conjunction, and the relationship here is " +
        "opposition — they arrived, yet they were useless — so the conjunction is 'but.'",
      steps: [
        "Confirm both halves are complete sentences. They are.",
        "Join them with a comma and the conjunction that matches the contrast.",
      ],
      hint: "Fixing the punctuation is half the job; the conjunction has to fit the meaning too.",
      trap: "One choice repairs the run-on correctly and still gets the relationship backwards.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "wordy-abstraction",
      difficulty: "Easy",
      keep: false,
      key: "how that coupling should be cut",
      noChange: "'Shaped in terms of its threading' restates the cutting in vaguer words.",
      wrong: [
        ["how that coupling should be cut and threaded", "'Threaded' repeats what 'cut' already covers here."],
        ["what the cutting and shaping of that coupling should be", "The noun phrasing is longer and less direct than the verb."],
      ],
      why:
        "The sentence has already named the thing in dispute. 'In terms of' adds an empty frame, and " +
        "'shaped' repeats 'cut.'",
      steps: [
        "Strike 'in terms of,' which almost never carries meaning.",
        "Keep one verb for the one action being described.",
      ],
      hint: "'In terms of' is nearly always a sign that a phrase can be shortened.",
      trap: "The longer version sounds technical, and technical sounds precise.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "misattached-opening-phrase",
      difficulty: "Hard",
      keep: false,
      key: "Cut by a local foundry to a local pattern, a visiting company's couplings fit nothing.",
      noChange: "The opening phrase describes the couplings, but the noun after the comma is a company.",
      wrong: [
        [
          "Cutting by a local foundry to a local pattern, a visiting company found its couplings fit nothing.",
          "The active form makes the company do the cutting, which reverses what happened.",
        ],
        [
          "Cut by a local foundry to a local pattern, nothing fit a visiting company's couplings.",
          "The phrase now describes 'nothing,' which cannot be cut by a foundry.",
        ],
      ],
      why:
        "An opening participial phrase attaches to the first noun after the comma. The couplings were " +
        "cut by the foundry, so the couplings must be that noun.",
      steps: [
        "Ask what was cut by the foundry. The couplings were.",
        "Rewrite so 'couplings' is the first noun following the comma.",
      ],
      hint: "Say the opening phrase aloud and then ask 'who or what?' — the answer must come next.",
      trap: "The original states a true fact about the company, which hides the grammatical mismatch.",
    },
    {
      number: 8,
      subskill: "semicolons and colons",
      family: "semicolon-between-clauses",
      difficulty: "Medium",
      keep: true,
      wrong: [
        [", the pressure blew them apart.", "A comma alone between two independent clauses is a splice."],
        [": the pressure blew them apart.", "A colon introduces an explanation, and this clause reports a result."],
        [" and the pressure blew them apart.", "Joining with 'and' but no comma leaves the clauses unpunctuated."],
      ],
      why:
        "Both halves are complete sentences of equal weight — the crews tried something, and it " +
        "failed. A semicolon is the mark for two balanced independent clauses.",
      steps: [
        "Check both sides of the mark. Each stands alone as a sentence.",
        "Keep the semicolon, which joins equals without subordinating either.",
      ],
      hint: "Two full sentences of equal weight are what a semicolon is for.",
      trap: "The colon is tempting because the second clause feels like it explains the first.",
    },
    {
      number: 9,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Afterward,",
      noChange: "'Likewise' claims a similarity, but the paragraph moves forward in time instead.",
      wrong: [
        ["Nonetheless,", "Nothing in the previous paragraph is being conceded or contradicted here."],
        ["In other words,", "The paragraph reports what happened next rather than restating the last point."],
      ],
      why:
        "Paragraph 3 describes the failure during the fire; paragraph 4 describes what followed it. " +
        "The transition has to mark that step forward in time.",
      steps: [
        "Name the relationship between the paragraphs: the second follows the first in time.",
        "Choose the transition that signals sequence, not similarity or restatement.",
      ],
      hint: "Work out the relationship before you read the choices, or every one will sound plausible.",
      trap: "'Likewise' is doing nothing at all, and a word doing nothing is easy to read past.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-case-after-a-preposition",
      difficulty: "Easy",
      keep: false,
      key: "them and their city councils",
      noChange: "'They' is a subject pronoun, but the phrase is the object of the preposition 'to.'",
      wrong: [
        ["they and their city council's", "The case is still wrong and an apostrophe is added to a plain plural."],
        ["themselves and their city councils", "A reflexive pronoun needs a matching subject earlier in the clause."],
      ],
      why:
        "'Fell to' takes an object, so the pronoun must be in the object case: 'them.' Pairing it with " +
        "another noun does not change the case.",
      steps: [
        "Drop the second half and read it alone: 'the decision fell to they.'",
        "Correct the pronoun to the object form, then put the pair back together.",
      ],
      hint: "Test a compound by removing the other half and reading the pronoun by itself.",
      trap: "'They and their councils' sounds formal, and formality is mistaken for correctness.",
    },
    {
      number: 11,
      subskill: "precision",
      family: "vague-quantity",
      difficulty: "Medium",
      keep: false,
      key: "took decades",
      noChange: "'A long while' gives no scale in a paragraph built on specific dates.",
      wrong: [
        ["took a considerable amount of time", "The phrase is longer than the original and no more exact."],
        ["was slow to happen in many places", "The vagueness moves from the duration to the number of places."],
      ],
      why:
        "The paragraph names a year, a standard, and the 1920s. A sentence about how long adoption " +
        "took should be as specific as the sentences around it.",
      steps: [
        "Notice how precise the neighboring sentences are about time.",
        "Choose the phrase that names a scale rather than gesturing at one.",
      ],
      hint: "The final sentence of the paragraph tells you what the right scale is.",
      trap: "Two choices are longer than the original, and length reads as added information.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, best explains why adoption " +
        "was slow even after the standard existed?",
      key: "The change was all or nothing: a half-converted city could not couple its own hoses to its own hydrants.",
      wrong: [
        [
          "The National Fire Protection Association had no power to compel any city to comply.",
          "A lack of authority explains why cities could refuse, not why refusing was rational.",
        ],
        [
          "Baltimore rebuilt its burned district in under two years, faster than anyone expected.",
          "The speed of the rebuilding says nothing about the pace of the thread conversion.",
        ],
        [
          "Several foundries continued to advertise their own patterns well into the 1910s.",
          "Foundry advertising is a symptom of slow adoption rather than a reason for it.",
        ],
      ],
      why:
        "The next sentence lists everything a city had to replace. The detail that prepares it is the " +
        "one showing why a city could not convert a piece at a time.",
      steps: [
        "Read the sentence after the blank: a city had to replace every hydrant, hose, and engine.",
        "Keep the choice that explains why the replacement could not be partial.",
      ],
      hint: "The question is why cities waited, not why they were allowed to wait.",
      trap: "The authority choice is the most familiar explanation and answers a different question.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-series",
      difficulty: "Medium",
      keep: true,
      wrong: [
        [
          "every hydrant, all its hoses, and every engine it owned",
          "The middle item switches determiner and number, breaking the pattern.",
        ],
        [
          "every hydrant, every hose, and all of the engines that it owned",
          "The third item expands into a clause the first two do not match.",
        ],
        [
          "all hydrants, every hose, and the engines it owned",
          "Three different forms appear where the series needs one repeated form.",
        ],
      ],
      why:
        "The three items already share one pattern — 'every' plus a singular noun — and repeating it " +
        "is what makes the list land as a single burden.",
      steps: [
        "Read the three items in isolation and compare their openings.",
        "Keep the version in which all three begin the same way.",
      ],
      hint: "In a series, look at the first word of each item before anything else.",
      trap: "Varying the wording looks like good style, but a series is where repetition is required.",
    },
    {
      number: 14,
      subskill: "consistency",
      family: "voice-shift",
      difficulty: "Hard",
      keep: false,
      key: "everyone remembers the fire",
      noChange: "The clause turns passive while the clause beside it stays active.",
      wrong: [
        [
          "the fire is what gets remembered instead",
          "The passive survives in a wordier form, so the shift is unfixed.",
        ],
        [
          "there is remembrance of the fire instead",
          "The abstract noun drops the actor the parallel clause has already named.",
        ],
      ],
      why:
        "The sentence balances two clauses about the same actor. 'Nobody remembers' is active, so the " +
        "second clause has to be active too for the contrast to land.",
      steps: [
        "Identify the voice of the first clause: active, with 'nobody' doing the remembering.",
        "Put the second clause in the same voice, with someone doing the remembering.",
      ],
      hint: "When two clauses are set against each other, they should be built the same way.",
      trap: "The passive is grammatical, so nothing sounds wrong until you compare the two halves.",
    },
    {
      number: 15,
      subskill: "conclusions",
      family: "closing-sentence",
      difficulty: "Medium",
      stem:
        "The writer is considering deleting the sentence “It is an unglamorous sort of progress.” " +
        "Should the sentence be kept or deleted?",
      key: "Kept, because it names the judgment the final sentence then illustrates.",
      wrong: [
        [
          "Kept, because it reminds the reader that the fire destroyed eighty city blocks.",
          "The sentence makes no reference to the destruction described in paragraph 1.",
        ],
        [
          "Deleted, because the essay has already described the committee's work in detail.",
          "The essay gives the committee one sentence, so nothing is being repeated.",
        ],
        [
          "Deleted, because it interrupts the description of how a modern engine operates.",
          "The paragraph is not a description of operation but an assessment of the standard.",
        ],
      ],
      why:
        "The last paragraph makes a claim and then supports it: the progress is unglamorous, and the " +
        "proof is that the committee is forgotten while the fire is not. Cutting the claim leaves the " +
        "proof with nothing to prove.",
      steps: [
        "Read the sentence that follows and ask what it demonstrates.",
        "Keep the sentence that states the idea the last one demonstrates.",
      ],
      hint: "Look forward from the sentence, not backward.",
      trap: "Short evaluative sentences look like padding, which is what delete questions usually target.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay explaining how a disaster exposed a " +
        "problem that no single city could have solved alone. Would this essay accomplish that goal?",
      key: "Yes, because the mismatch only became visible when twenty cities' equipment met in one place.",
      wrong: [
        [
          "Yes, because it describes the specific brass fittings that Baltimore's foundries produced.",
          "The essay never identifies any particular foundry or fitting, so that cannot be the reason.",
        ],
        [
          "No, because Baltimore eventually rebuilt its downtown without any outside assistance.",
          "The essay makes no claim about the rebuilding, so the reason rests on nothing in the text.",
        ],
        [
          "No, because the essay concerns a technical standard rather than the fire that preceded it.",
          "The essay treats the two as one story, and the standard is the fire's direct consequence.",
        ],
      ],
      why:
        "Each city's threads worked fine at home. The defect existed only across cities, and it took " +
        "a fire large enough to summon twenty of them to reveal it — which is the goal exactly.",
      steps: [
        "Decide yes or no from what the essay actually argues, before reading the reasons.",
        "Keep only the reason that describes something the essay really says.",
      ],
      hint: "Ask whether any one city could have discovered this problem by itself.",
      trap: "Both 'No' reasons sound informed, and one of them even praises the essay's focus.",
    },
  ],
};
