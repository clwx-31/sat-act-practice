"use strict";

module.exports = {
  id: "act-english-p031",
  type: "historical-account",
  title: "The Word Was His",
  content: `[1] In October {1 1859 a} steam clipper called the Royal Charter was
driven onto the Anglesey coast in a storm and broke apart within sight of land.
More than four hundred people died. The wreck {2 had been} one of about two hundred
that week.

[2] {3} Robert FitzRoy had commanded the {4 Beagle, by 1859 he ran} the small
meteorological office of the Board of Trade. His department collected weather
observations from ships and coastal {5 stations and gathered them from those
sources}. What it did not do {6 were} say anything about tomorrow.

[3] FitzRoy proposed that it should. Telegraph lines already linked the coasts.
{7 Falling at one station, another could be warned before the weather arrived.}
In 1861 his office began issuing storm {8 warnings, later that year the Times
began printing} what he called {9 the things}. The word was his.

[4] {10 Similarly,} the objections were immediate, and they came from two
directions. Shipowners disliked warnings that kept {11 their} vessels in port on
days that turned out fine. Scientists disliked the enterprise on principle: the
Royal Society held that meteorology {12 was} not yet capable of prediction, and
that issuing guesses under an official name damaged the whole field.

[5] FitzRoy died in 1865. The warnings were suspended the following year, on the
grounds that they were unscientific.

[6] They were restored in 1867, after two years in which the fishing fleets had
gone on {13 keeping their own records, comparing them against the old warnings,
and counting which had been right}. {14} The pressure had not come from the
Royal Society. {15}`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-phrase-comma",
      difficulty: "Easy",
      keep: false,
      key: "1859, a",
      noChange: "The introductory phrase runs into the subject with no comma between them.",
      wrong: [
        ["1859, a,", "The second comma separates the article from the noun it belongs to."],
        ["1859; a", "A semicolon must join independent clauses, and the opening phrase is not one."],
      ],
      why:
        "'In October 1859' opens the sentence and is not its subject. A comma marks where the " +
        "introductory phrase ends and the main clause begins.",
      steps: [
        "Find where the opening phrase stops: after '1859.'",
        "Place a single comma there.",
      ],
      hint: "A date at the head of a sentence takes one comma after it.",
      trap: "The sentence is long, so the missing pause is behind you by the time it matters.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Medium",
      keep: false,
      key: "was",
      noChange: "The past perfect places the wreck before an earlier past that is never named.",
      wrong: [
        ["is", "The present tense contradicts the 1859 date the paragraph has just supplied."],
        ["would be", "The conditional turns a stated fact into a projection."],
      ],
      why:
        "The sentence reports a completed fact from a dated week, and the paragraph around it is in " +
        "the simple past.",
      steps: [
        "Locate the time frame: October 1859.",
        "Match the verb to that completed past.",
      ],
      hint: "Let the date the paragraph supplies choose the tense.",
      trap: "'Had been' sounds more formal, and formality reads as correctness in a history.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The information that might have kept those ships in harbour already existed.",
      wrong: [
        [
          "The Royal Charter had been carrying gold from Australia when she was lost.",
          "The cargo is a detail of the wreck and connects to nothing the essay goes on to argue.",
        ],
        [
          "Barometers had been in common use aboard British ships for many decades.",
          "The instrument's history is background the paragraph never returns to.",
        ],
        [
          "There were several government departments concerned with maritime matters.",
          "The vague plural promises an overview where the paragraph names one office.",
        ],
      ],
      why:
        "Paragraph 1 is a disaster. This paragraph introduces an office that was already collecting " +
        "the relevant data and doing nothing predictive with it, so the opening should join the two.",
      steps: [
        "Note what paragraph 1 leaves the reader with: preventable deaths.",
        "Choose the opening that makes this paragraph the answer to that.",
      ],
      hint: "The paragraph ends on what the office did not do; the opening should set that up.",
      trap: "The gold is the most memorable fact about the wreck and leads nowhere in the essay.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "Beagle, and by 1859 he ran",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "Beagle, by 1859 running",
          "The participle leaves the second half without a main verb of its own.",
        ],
        [
          "Beagle; and by 1859 he ran",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "'Robert FitzRoy had commanded the Beagle' and 'by 1859 he ran the small meteorological " +
        "office' are both complete, so joining them takes a comma plus a conjunction.",
      steps: [
        "Test each side of the comma as its own sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "Cover the comma and read each half aloud on its own.",
      trap: "The two halves are both about FitzRoy, which makes them feel like one thought.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "redundant-tail",
      difficulty: "Easy",
      keep: false,
      key: "stations",
      noChange: "'Gathered them from those sources' repeats what the sentence has already said.",
      wrong: [
        ["stations and gathered them", "The second verb still restates the collecting already named."],
        ["stations, gathering them from those sources", "The participle keeps the repetition and adds a comma."],
      ],
      why:
        "'Collected weather observations from ships and coastal stations' already names the action " +
        "and both sources. The trailing clause repeats all three.",
      steps: [
        "Read the sentence without the trailing clause and check nothing is lost.",
        "Cut it.",
      ],
      hint: "If a clause repeats its own sentence's verb and objects, delete it.",
      trap: "The tail gives the sentence a rhythmic close, which makes it feel intended.",
    },
    {
      number: 6,
      subskill: "subject-verb agreement",
      family: "noun-clause-subject",
      difficulty: "Easy",
      keep: false,
      key: "was",
      noChange: "The plural verb has been matched to 'observations' rather than to the clause subject.",
      wrong: [
        ["are", "The verb is still plural and the present tense breaks the historical narration."],
        ["have been", "The plural present perfect misses both the number and the time frame."],
      ],
      why:
        "The subject is the noun clause 'What it did not do,' and a noun clause acting as a subject " +
        "is always singular.",
      steps: [
        "Identify the subject: the clause beginning 'What.'",
        "Choose the singular verb.",
      ],
      hint: "A 'what' clause acting as a subject takes a singular verb.",
      trap: "The previous sentence ends on a plural, which carries the ear into this one.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Falling at one station, a barometer could warn another before the weather arrived.",
      noChange: "The opening phrase describes a barometer, but the noun after the comma is 'another.'",
      wrong: [
        [
          "Falling at one station, the warning could reach another before the weather arrived.",
          "The phrase now describes the warning, which is not the thing that falls.",
        ],
        [
          "Fallen at one station, another could be warned before the weather arrived.",
          "Changing the participle leaves it attached to the same empty pronoun.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "A barometer falls; a station being warned does not.",
      steps: [
        "Ask what falls at one station. A barometer does.",
        "Rewrite so 'a barometer' follows the comma.",
      ],
      hint: "The sentence never names the thing the opening phrase describes.",
      trap: "The meaning is recoverable from the paragraph, which hides the missing noun.",
    },
    {
      number: 8,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "warnings; later that year the Times began printing",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "warnings: later that year the Times began printing",
          "A colon introduces an explanation, but the second clause reports a separate development.",
        ],
        [
          "warnings and later that year the Times began printing",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and equally weighted — what the office did, and what the newspaper " +
        "then did. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or follows it. It follows.",
      ],
      hint: "Two dated developments of similar importance want a mark that treats them equally.",
      trap: "The second clause reads as a consequence, which points the eye toward a colon.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Easy",
      keep: false,
      key: "forecasts",
      noChange: "'The things' withholds the word the next sentence depends on entirely.",
      wrong: [
        ["these predictions", "The paraphrase names the concept but not the word FitzRoy coined."],
        ["them", "The pronoun points back to the warnings and loses the new term altogether."],
      ],
      why:
        "The sentence that follows is 'The word was his.' Without the word itself on the page, that " +
        "sentence has no referent and the paragraph's point disappears.",
      steps: [
        "Read the sentence immediately after this one.",
        "Supply the word it is about.",
      ],
      hint: "The next sentence tells you exactly what is missing.",
      trap: "'The things' reads as casual shorthand rather than as a hole in the argument.",
    },
    {
      number: 10,
      subskill: "transitions",
      family: "comparison-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "Even so,",
      noChange: "'Similarly' claims a likeness, but this paragraph turns against the achievement just described.",
      wrong: [
        ["Consequently,", "The objections did not follow from the coining of the word."],
        ["For instance,", "The objections are not an example of the warnings but a reaction to them."],
      ],
      why:
        "Paragraph 3 ends on FitzRoy's success. Paragraph 4 reports that it was attacked at once, so " +
        "the transition has to mark the reversal.",
      steps: [
        "Ask whether this paragraph continues the last one or opposes it.",
        "Choose the transition that concedes and turns.",
      ],
      hint: "The paragraph's first adjective is 'immediate,' which signals a reaction.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "possessive-pronoun-agreement",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["its", "The singular possessive does not agree with the plural noun 'Shipowners.'"],
        ["there", "The adverb is not a possessive and cannot modify 'vessels.'"],
        ["they're", "'They're' means 'they are,' which cannot precede the noun 'vessels.'"],
      ],
      why:
        "The vessels belong to the shipowners, a plural noun, so the plural possessive pronoun is " +
        "correct.",
      steps: [
        "Ask whose vessels are kept in port: the shipowners'.",
        "Use the plural possessive that matches.",
      ],
      hint: "Try reading it as 'they are' — if that fails, the possessive is right.",
      trap: "'Port' and 'vessels' sit between the pronoun and its antecedent.",
    },
    {
      number: 12,
      subskill: "consistency",
      family: "sequence-of-tenses",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["is", "The present tense breaks the sequence set by the past-tense reporting verb 'held.'"],
        ["will be", "The future contradicts a position stated in the past."],
        ["had been", "The past perfect places the incapacity before the Society's own statement."],
      ],
      why:
        "'Held' is past, so the reported clause takes the past as well. That is the standard sequence " +
        "of tenses after a past-tense reporting verb.",
      steps: [
        "Find the reporting verb: 'held.'",
        "Put the reported clause in the matching past tense.",
      ],
      hint: "A past-tense reporting verb pulls the clause after it into the past.",
      trap: "The claim about meteorology could be stated in the present, which invites 'is.'",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-participle-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "keeping their own records, compared them against the old warnings, and counting which had been right",
          "The middle item becomes a past-tense verb the two participles do not match.",
        ],
        [
          "keeping their own records, comparison against the old warnings, and counting which had been right",
          "The middle item becomes a noun phrase where the others are participles.",
        ],
        [
          "to keep their own records, comparing them against the old warnings, and counting which had been right",
          "The first item takes an infinitive the other two do not share.",
        ],
      ],
      why:
        "Three participles share 'had gone on,' and each has to be able to follow that phrase on its " +
        "own for the series to hold.",
      steps: [
        "Read 'the fishing fleets had gone on' into each of the three items.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The items describe three different activities, which makes varying the form feel natural.",
    },
    {
      number: 14,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “FitzRoy had " +
        "sailed as captain of the Beagle on the voyage that carried Charles Darwin.” Should the " +
        "writer make this addition?",
      key: "No, because the paragraph is about who forced the warnings back, not about FitzRoy's earlier career.",
      wrong: [
        [
          "Yes, because it establishes FitzRoy's scientific standing against the Royal Society's objection.",
          "The paragraph has moved past the objection to the people who overturned it.",
        ],
        [
          "Yes, because the Beagle has already been mentioned and the detail completes it.",
          "A detail can complete an earlier mention and still interrupt the paragraph it lands in.",
        ],
        [
          "No, because the essay has not established that FitzRoy was a scientist at all.",
          "The essay describes him running a meteorological office, so the reason is inaccurate.",
        ],
      ],
      why:
        "The final paragraph is about fishing fleets keeping their own tallies and forcing a reversal. " +
        "FitzRoy's most famous command belongs two paragraphs earlier, if anywhere.",
      steps: [
        "Name what the paragraph is doing: identifying who restored the warnings.",
        "Test the sentence against that rather than against its interest.",
      ],
      hint: "Ask whose story the last paragraph is telling.",
      trap: "The Beagle is the one fact most readers already know, which makes it feel essential.",
    },
    {
      number: 15,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively completes " +
        "the essay's argument?",
      key: "It came from the people who had been betting their boats on whether the warnings held.",
      wrong: [
        [
          "The Board of Trade continued to publish weather observations throughout the suspension.",
          "Observations are what the office had always published; the dispute was about prediction.",
        ],
        [
          "Storm warnings are now issued by national services in almost every maritime country.",
          "The modern arrangement postdates the argument rather than completing it.",
        ],
        [
          "The Royal Society did not formally revisit its position on prediction for some years.",
          "What the Society did next is precisely what the paragraph has just set aside.",
        ],
      ],
      why:
        "The sentence before it rules out the Royal Society. The essay's point is that the warnings " +
        "were vindicated by people with something at stake rather than by the institution that judged them.",
      steps: [
        "Read the sentence before the marker and note what it denies.",
        "Keep the choice that supplies the positive half of that contrast.",
      ],
      hint: "The previous sentence says where the pressure did not come from.",
      trap: "The modern-services choice sounds like a natural closing and answers nothing.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a service judged by the wrong " +
        "people. Would this essay accomplish that goal?",
      key: "Yes, because the Royal Society ruled on the warnings in principle while the fleets were checking whether they worked.",
      wrong: [
        [
          "Yes, because shipowners objected to warnings that kept their vessels in port needlessly.",
          "The shipowners had an interest but were judging cost, not whether the warnings were right.",
        ],
        [
          "No, because the Royal Society was the body qualified to assess a scientific claim.",
          "Its objection was that prediction was impossible in principle, which the records tested directly.",
        ],
        [
          "No, because the essay concerns the coining of the word 'forecast' rather than its use.",
          "The word occupies one sentence; the dispute over the warnings occupies four paragraphs.",
        ],
      ],
      why:
        "The Society suspended the warnings on the grounds that meteorology could not predict. The " +
        "fishing fleets had been keeping tallies of which warnings had been right, and it was their " +
        "evidence that restored the service.",
      steps: [
        "Name the two groups judging the warnings and what each was measuring.",
        "Keep the reason that contrasts a ruling in principle with a record of results.",
      ],
      hint: "Ask which group had actually tested the warnings against outcomes.",
      trap: "One wrong choice names a genuinely interested party who was measuring something else.",
    },
  ],
};
