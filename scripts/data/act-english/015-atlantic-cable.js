"use strict";

module.exports = {
  id: "act-english-p015",
  type: "historical-account",
  title: "Nine Years and Four Expeditions",
  content: `[1] The first attempt was made in 1857, and it {1 failed} within days.
Four hundred miles out of Valentia {2 Bay the cable} parted under its own weight
and went to the bottom, and the ships turned around.

[2] {3} The idea was not absurd. Telegraphy on land already worked, and a wire
across the Atlantic {4 were} going to cut the time between London and New York
from ten days to minutes. The trouble was that nobody had ever laid twenty-five
hundred miles of anything across two miles of {5 water, the engineering had to
be invented} while it was being used.

[3] They tried again in 1858, and that time the cable reached both shores. In
August, Queen Victoria and President Buchanan exchanged {6 greetings and
messages of goodwill with each other}, and cities on both coasts held parades.
The Queen's message took sixteen hours to send. Within three weeks the cable was
dead, {7 it's} insulation ruined. {8 Raised too far by an operator trying to
force signals through faster, the insulation failed under the voltage.} For
years afterward nobody could say with certainty whether the fault lay in the
cable or in the way {9 it} had been used.

[4] {10 Meanwhile,} the failure cost more than money. Investors had been told
the Atlantic was conquered and had then watched it go silent in a
{11 month, several London papers said openly} that the whole enterprise had been
a fraud.

[5] {12} The 1865 expedition broke six hundred miles short of Newfoundland. The
1866 expedition worked, and then the same ship turned around, grappled the 1865
cable up off the sea floor, and finished it as well. From 1866 there {13 were}
two.

[6] Nine years, four expeditions, and a long stretch in the middle when the only
evidence anyone could point to was a dead wire and a great many parades.`,
  questions: [
    {
      number: 1,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["had failed", "The past perfect places the failure before an earlier past that is never named."],
        ["has failed", "The present perfect connects an 1857 expedition to the present moment."],
        ["was failing", "The progressive suggests an ongoing failure rather than a sudden one."],
      ],
      why:
        "The sentence reports a completed event in a year the sentence itself supplies, and the " +
        "paragraph around it is in the simple past.",
      steps: [
        "Locate the date in the sentence: 1857.",
        "Match the verb to that completed past.",
      ],
      hint: "Let the year in the sentence choose the tense.",
      trap: "'Had failed' sounds more formal, and formality reads as correctness in a history.",
    },
    {
      number: 2,
      subskill: "commas",
      family: "introductory-phrase-comma",
      difficulty: "Easy",
      keep: false,
      key: "Bay, the cable",
      noChange: "The introductory phrase runs into the subject with no comma between them.",
      wrong: [
        ["Bay, the cable,", "The second comma cuts the subject off from its own verb."],
        ["Bay; the cable", "A semicolon must join independent clauses, and the opening phrase is not one."],
      ],
      why:
        "'Four hundred miles out of Valentia Bay' opens the sentence and is not its subject. One " +
        "comma marks where the phrase ends and the main clause begins.",
      steps: [
        "Find where the opening phrase stops: after 'Bay.'",
        "Place a single comma there.",
      ],
      hint: "A place phrase at the head of a sentence takes one comma, not two.",
      trap: "The phrase is long enough that a second comma feels like it restores balance.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "It is worth asking why anyone thought this could be done at all.",
      wrong: [
        [
          "Valentia Bay lies on the southwestern coast of Ireland, facing the open Atlantic.",
          "The geography of the departure point is not what this paragraph goes on to explain.",
        ],
        [
          "Samuel Morse had demonstrated his telegraph to Congress some fifteen years earlier.",
          "Morse's demonstration is background the paragraph never returns to or depends on.",
        ],
        [
          "There were several notable engineering projects undertaken during this period.",
          "The vague plural promises a survey the paragraph does not deliver.",
        ],
      ],
      why:
        "Paragraph 1 ends with a cable on the sea floor and ships turning back. This paragraph " +
        "defends the attempt as reasonable, so the opening should raise that question.",
      steps: [
        "Note where paragraph 1 leaves the reader: with an apparent folly.",
        "Choose the opening that turns that impression into the paragraph's question.",
      ],
      hint: "The paragraph answers an objection, so its first sentence should raise it.",
      trap: "The Valentia Bay detail connects to the previous sentence and leads nowhere after it.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Easy",
      keep: false,
      key: "was",
      noChange: "The plural verb has been matched to 'London and New York' rather than to 'a wire.'",
      wrong: [
        ["are", "The verb is still plural and the present tense breaks the historical narration."],
        ["have been", "The plural present perfect misses both the number and the past time frame."],
      ],
      why:
        "The subject is 'a wire,' singular. 'Across the Atlantic' is a prepositional phrase, and the " +
        "noun inside one is never the subject.",
      steps: [
        "Cross out 'across the Atlantic.'",
        "Read 'a wire … was going to cut' and confirm the match.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'The Atlantic' sits directly before the verb and reads as a heavy, plural-feeling noun.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "water, and the engineering had to be invented",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "water, the engineering having to be invented",
          "The participle leaves the second half without a main verb of its own.",
        ],
        [
          "water; and the engineering had to be invented",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "Both halves stand alone as sentences. A comma plus 'and' joins them and adds the second " +
        "difficulty to the first without inventing a relationship between them.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "Cover the comma and read each half aloud on its own.",
      trap: "The sentence is already long, which makes one more conjunction feel like too many.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "greetings",
      noChange: "'Messages of goodwill' repeats 'greetings,' and 'exchanged' already means with each other.",
      wrong: [
        ["greetings with each other", "'Exchanged' already carries the mutual sense that 'with each other' adds."],
        ["greetings and messages of goodwill", "The two nouns name the same thing in different words."],
      ],
      why:
        "Three redundancies are stacked: the second noun restates the first, and 'with each other' " +
        "restates the verb. One noun says all of it.",
      steps: [
        "Notice what 'exchanged' already tells you about direction.",
        "Keep one noun and cut the rest.",
      ],
      hint: "Check the verb before you read its object; the verb may already have done the work.",
      trap: "Ceremonial language sounds appropriate for a ceremonial occasion.",
    },
    {
      number: 7,
      subskill: "apostrophes",
      family: "its-versus-it-is",
      difficulty: "Easy",
      keep: false,
      key: "its",
      noChange: "'It's' means 'it is,' which makes no sense before the noun 'insulation.'",
      wrong: [
        ["its'", "There is no such form; the possessive of 'it' never takes an apostrophe."],
        ["it is", "Spelling out the contraction makes the ungrammatical reading explicit."],
      ],
      why:
        "The insulation belongs to the cable, so the possessive pronoun 'its' is required. The " +
        "possessive of 'it' is the one possessive in English that takes no apostrophe.",
      steps: [
        "Read the underlined word as 'it is' and see whether the sentence works. It does not.",
        "Use the possessive form instead.",
      ],
      hint: "Substitute 'it is' out loud; if the sentence breaks, you need 'its.'",
      trap: "Apostrophes mark possession almost everywhere else, which makes 'it's' feel right here.",
    },
    {
      number: 8,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Raised too far by an operator trying to force signals through faster, the voltage destroyed the insulation.",
      noChange: "The opening phrase describes the voltage, but the noun after the comma is the insulation.",
      wrong: [
        [
          "Raising it too far to force signals through faster, the insulation failed under the voltage.",
          "The active form makes the insulation do the raising, which reverses the meaning.",
        ],
        [
          "Raised too far by an operator trying to force signals through faster, the cable lost its insulation.",
          "The phrase now describes the cable, which is not what the operator raised.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The operator raised the voltage, so the voltage has to be that noun.",
      steps: [
        "Ask what was raised too far. The voltage was.",
        "Rewrite so 'the voltage' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and check whether they match.",
      trap: "The sentence states a true fact about the insulation, so nothing sounds factually wrong.",
    },
    {
      number: 9,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'the cable.'"],
        ["the operator", "Naming the operator changes the meaning, since it is the cable that was used."],
        ["this", "The bare demonstrative points at the clause rather than at a noun."],
      ],
      why:
        "The pronoun refers to 'the cable,' named earlier in the same sentence, and the sentence is " +
        "contrasting a fault in the cable with a fault in how the cable was handled.",
      steps: [
        "Find the noun the pronoun stands for: the cable.",
        "Confirm it is singular and keep the matching pronoun.",
      ],
      hint: "The two halves of the contrast name the same object twice.",
      trap: "'The operator' appears in the sentence before and is the more vivid noun.",
    },
    {
      number: 10,
      subskill: "transitions",
      family: "escalation-transition",
      difficulty: "Medium",
      keep: false,
      key: "Worse,",
      noChange: "'Meanwhile' claims simultaneity, but this paragraph deepens the failure just described.",
      wrong: [
        ["Similarly,", "The cost to investors is not like the technical failure that caused it."],
        ["For instance,", "Financial damage is not an example of insulation breaking down."],
      ],
      why:
        "Paragraph 3 ends with a cable nobody could account for. Paragraph 4 says the damage went " +
        "further than the wire, so the transition should escalate.",
      steps: [
        "Ask whether this paragraph runs alongside the last one or goes beyond it.",
        "Choose the transition that marks escalation.",
      ],
      hint: "The sentence itself says the failure cost 'more than money.'",
      trap: "'Meanwhile' feels natural in a chronological account and asserts the wrong relation.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "month; several London papers said openly",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "month: several London papers said openly",
          "A colon introduces an explanation, but the second clause reports a separate reaction.",
        ],
        [
          "month and several London papers said openly",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and equally weighted — what investors saw, and what the papers " +
        "then said. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or stands beside it. It stands beside it.",
      ],
      hint: "Two full sentences of similar weight are what a semicolon is for.",
      trap: "The second clause reads like a consequence, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “The Great " +
        "Eastern was the largest ship in the world and had been a commercial failure as a " +
        "passenger liner.” Should the writer make this addition?",
      key: "Yes, because a ship too big to succeed at its own purpose is what made the later attempts possible.",
      wrong: [
        [
          "Yes, because it explains why the 1865 expedition broke short of Newfoundland.",
          "The essay gives no cause for that break, and the ship's size is not offered as one.",
        ],
        [
          "No, because the essay is concerned with the cable rather than with the vessels involved.",
          "The vessel is what allowed a single ship to carry the whole cable, so it is not a digression.",
        ],
        [
          "No, because the commercial history of the Great Eastern is unrelated to telegraphy.",
          "Its capacity is precisely what telegraphy needed, whatever it failed at before.",
        ],
      ],
      why:
        "Earlier expeditions had to splice cable between ships. A vessel large enough to carry all " +
        "of it at once is the reason 1866 could succeed where 1858 could not.",
      steps: [
        "Ask what the paragraph needs the reader to understand about the later attempts.",
        "Test whether the sentence supplies it. The ship's capacity does.",
      ],
      hint: "Not every add-a-sentence question is answered 'no.'",
      trap: "The sentence looks like a digression about shipping and is load-bearing.",
    },
    {
      number: 13,
      subskill: "consistency",
      family: "tense-consistency-in-a-historical-account",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["are", "The present tense contradicts the 1866 date the sentence itself supplies."],
        ["have been", "The present perfect carries the claim to the present, which the essay does not."],
        ["was", "The singular verb does not agree with the plural subject 'two.'"],
      ],
      why:
        "The sentence reports the state of things from 1866, and the whole essay is narrated in the " +
        "past. The subject 'two' is plural.",
      steps: [
        "Note the date the sentence names: 1866.",
        "Keep the past-tense plural verb that matches both the date and the subject.",
      ],
      hint: "Two things have to agree here: the tense and the number.",
      trap: "The cables did continue operating, which invites a tense that reaches the present.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a success that is remembered " +
        "without the failures that produced it. Would this essay accomplish that goal?",
      key: "Yes, because it spends four paragraphs on breakages and recrimination and one on the cable that worked.",
      wrong: [
        [
          "Yes, because it reports that Queen Victoria and President Buchanan exchanged messages in 1858.",
          "That exchange is one of the failures, since the cable died three weeks later.",
        ],
        [
          "No, because the essay states that the 1866 expedition succeeded and completed a second cable.",
          "Recording the success is not the same as letting it eclipse what came before.",
        ],
        [
          "No, because the essay concerns engineering difficulty rather than public memory.",
          "The parades and the fraud accusations are precisely about how the work was perceived.",
        ],
      ],
      why:
        "The proportions are the argument. The essay gives 1866 a single sentence and gives nine " +
        "years of breakage, silence, and accusation everything else.",
      steps: [
        "Count how much of the essay is failure and how much is success.",
        "Keep the reason that rests on that proportion.",
      ],
      hint: "Look at how many sentences the successful expedition actually receives.",
      trap: "One wrong choice cites the most famous moment in the story, which the essay treats as a failure.",
    },
  ],
};
