"use strict";

module.exports = {
  id: "act-english-p017",
  type: "personal-essay",
  title: "The Oldest Part Is Uphill",
  content: `[1] The cemetery {1 hired} me the summer I was seventeen because I
owned boots. That was the whole interview. Ray asked whether I had
{2 boots and I} said yes, and he said be here at six thirty.

[2] {3} The work was, {4 for the most part and by and large}, mowing. Forty
acres, a zero-turn mower for the open ground, a push mower for the rows too
tight to turn in, and {5 using a string trimmer at the base of every stone}.
There are eleven thousand {6 stones, I learned to hate that trimmer} in a way I
have never since hated a tool.

[3] What I did not expect was the reading. A person cannot trim around a stone
without reading it, and not on purpose either: the words {7 is} simply there, at
the level of your hands, for eight hours at a stretch. By August I {8 knew},
without ever having tried to, {9 stuff about which decades had been hard here}.

[4] {10 Similarly,} the oldest part is uphill, and it is the part people visit
least. The 1918 section is a row of small stones carrying the same year, and in
the middle of it one {11 family's} four children. {12 Trimmed every ten days all
summer, Ray never assigned that row to anyone else.} I did not ask {13 why, I
have thought since that he may have been waiting} to see whether I would.

[5] {14} I do not think the job made me wiser about death. It made me specific
about it. Eleven thousand is a number. Four small stones in a row of small
stones is not.

[6] {15} I still know where that row is. I could walk to it in the dark.`,
  questions: [
    {
      number: 1,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["had hired", "The past perfect places the hiring before an earlier past that is never named."],
        ["hires", "The present tense contradicts a summer the essay places years ago."],
        ["was hiring", "The progressive suggests an ongoing process rather than a single decision."],
      ],
      why:
        "The essay narrates a finished summer in the simple past — 'asked,' 'said,' 'owned.' The " +
        "opening verb belongs in that tense.",
      steps: [
        "Check the tense of the verbs in the sentences around it.",
        "Keep the simple past that matches them.",
      ],
      hint: "Match the tense the story is already being told in.",
      trap: "'Had hired' sounds more literary, and literary reads as more correct in an essay.",
    },
    {
      number: 2,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "boots, and I",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["boots; and I", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["boots, and, I", "The extra comma separates the conjunction from the subject that follows it."],
      ],
      why:
        "'Ray asked whether I had boots' and 'I said yes' are both complete clauses, so the 'and' " +
        "joining them takes a comma before it — as the next clause in the sentence already shows.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "The same sentence punctuates its next 'and' correctly; match it.",
      trap: "'I said yes' is short enough to read as part of the first clause.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Boots turned out to be the right question to have asked.",
      wrong: [
        [
          "Cemetery maintenance is seasonal work in most of the northern United States.",
          "A general fact about the industry does not connect the interview to the labour.",
        ],
        [
          "Ray had been the groundskeeper there for something over twenty years.",
          "Ray's tenure is never taken up again and explains nothing about the work.",
        ],
        [
          "There were a number of different tasks that made up an ordinary day.",
          "The vague plural states what the paragraph will list instead of framing it.",
        ],
      ],
      why:
        "Paragraph 1 ends on a one-question interview about boots. This paragraph explains what the " +
        "boots were for, so the opening should connect the question to the work.",
      steps: [
        "Note what paragraph 1 leaves the reader holding: an interview that asked one thing.",
        "Choose the opening that pays that off.",
      ],
      hint: "The best opening turns the previous paragraph's last detail into this paragraph's subject.",
      trap: "The detail about Ray is the most concrete choice and leads nowhere in the essay.",
    },
    {
      number: 4,
      subskill: "conciseness",
      family: "doubled-qualifier",
      difficulty: "Easy",
      keep: false,
      key: "for the most part",
      noChange: "'For the most part' and 'by and large' are two ways of saying the same thing.",
      wrong: [
        ["by and large and for the most part", "Reversing the order keeps both halves of the repetition."],
        ["mostly and for the most part", "One qualifier is simply replaced by a synonym of the other."],
      ],
      why:
        "Both phrases hedge the same claim by the same amount. Keeping one says everything two say.",
      steps: [
        "Notice that the two phrases mean the same thing.",
        "Keep whichever one reads more plainly and cut the other.",
      ],
      hint: "Two hedges in a row are one hedge too many.",
      trap: "The doubled phrasing sounds careful, which is how hedging survives revision.",
    },
    {
      number: 5,
      subskill: "parallelism",
      family: "parallel-noun-series",
      difficulty: "Hard",
      keep: false,
      key: "a string trimmer for the base of every stone",
      noChange: "The fourth item becomes a gerund phrase where the first three are noun phrases.",
      wrong: [
        [
          "a string trimmer used at the base of every stone",
          "The added participle breaks the pattern the first three items set with 'for.'",
        ],
        [
          "using a string trimmer for the base of every stone",
          "The gerund remains, so the item still does not match the three before it.",
        ],
      ],
      why:
        "The sentence is a list of equipment: acreage, then three tools, each named as a noun phrase " +
        "followed by what it is for. The fourth item has to take the same shape.",
      steps: [
        "Read the four items in isolation and compare how each begins.",
        "Rewrite the last one to open with an article and a noun, like the others.",
      ],
      hint: "Compare the first word of each item before anything else.",
      trap: "The gerund reads fluently because it is the only item describing an action.",
    },
    {
      number: 6,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "stones, and I learned to hate that trimmer",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "stones, I learned to hate that trimmer,",
          "Adding a comma later leaves the splice at the start untouched.",
        ],
        [
          "stones; and I learned to hate that trimmer",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "'There are eleven thousand stones' and 'I learned to hate that trimmer' both stand alone, " +
        "so joining them takes a comma plus a conjunction.",
      steps: [
        "Test each side of the comma as its own sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "Cover the comma and read each half aloud on its own.",
      trap: "The number in the first clause makes it read like a setup rather than a sentence.",
    },
    {
      number: 7,
      subskill: "subject-verb agreement",
      family: "simple-plural-subject",
      difficulty: "Easy",
      keep: false,
      key: "are",
      noChange: "The subject 'the words' is plural and cannot take a singular verb.",
      wrong: [
        ["was", "The verb is still singular and the past tense breaks the present-tense claim."],
        ["has been", "The singular present perfect misses the number and reports a finished span."],
      ],
      why: "'The words' names more than one thing, so the verb is plural.",
      steps: [
        "Identify the subject: 'the words,' plural.",
        "Choose the plural verb.",
      ],
      hint: "Nothing separates this subject from its verb, so read them straight through.",
      trap: "The colon before it makes the clause feel like a fresh start with a new subject.",
    },
    {
      number: 8,
      subskill: "consistency",
      family: "tense-consistency-in-a-narrative",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["know", "The present tense contradicts 'By August,' which places the knowing in that summer."],
        ["had known", "The past perfect implies the knowledge preceded the summer it was acquired in."],
        ["was knowing", "'Know' does not take the progressive in standard usage."],
      ],
      why:
        "'By August' locates the sentence inside the summer being narrated, and the paragraph around " +
        "it is in the simple past.",
      steps: [
        "Read the time marker that opens the sentence: 'By August.'",
        "Match the verb to that point in the past.",
      ],
      hint: "The phrase at the front of the sentence tells you when it happens.",
      trap: "The essay ends in the present tense, which makes the present feel available here too.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Medium",
      keep: false,
      key: "which decades had been hard here",
      noChange: "'Stuff about' names nothing and undercuts the sentence it belongs to.",
      wrong: [
        ["things about which decades had been hard here", "'Things about' is as empty as 'stuff about.'"],
        ["information regarding the harder decades here", "The phrasing is bureaucratic and less exact than the original clause."],
      ],
      why:
        "The clause after it is already precise. The vague noun in front adds a layer between the " +
        "reader and the one fact the sentence exists to deliver.",
      steps: [
        "Read the sentence without the vague noun and see whether it still works.",
        "Cut the layer and let the clause be the object.",
      ],
      hint: "If deleting a noun loses no meaning, the noun was in the way.",
      trap: "'Stuff about' softens a hard claim, which can feel like modesty rather than vagueness.",
    },
    {
      number: 10,
      subskill: "transitions",
      family: "comparison-versus-addition-transition",
      difficulty: "Medium",
      keep: false,
      key: "In fact,",
      noChange: "'Similarly' claims a likeness to the previous paragraph, which described reading stones.",
      wrong: [
        ["Therefore,", "The location of the oldest section is not caused by anything said before it."],
        ["Instead,", "Nothing has been proposed and rejected, so there is no alternative on offer."],
      ],
      why:
        "Paragraph 3 says the narrator learned which decades had been hard. Paragraph 4 gives the " +
        "sharpest instance of that, so the transition should intensify rather than compare.",
      steps: [
        "Ask what this paragraph does with the last one's claim: it drives it home.",
        "Choose the transition that marks intensification.",
      ],
      hint: "Name the relationship in your own words before reading the choices.",
      trap: "'Similarly' sounds like it is organizing the essay while asserting nothing.",
    },
    {
      number: 11,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["families", "The plural shows no possession and contradicts the singular 'one.'"],
        ["families'", "The plural possessive contradicts 'one family' in the same phrase."],
        ["family", "The singular is correct in number but marks no possessive relationship."],
      ],
      why:
        "One family owns the four children, so the noun takes the singular possessive: apostrophe, " +
        "then s.",
      steps: [
        "Note the article in front of the noun: 'one.'",
        "Keep the singular possessive that matches it.",
      ],
      hint: "The word before the noun tells you how many owners there are.",
      trap: "'Four children' immediately after makes a plural possessive feel right.",
    },
    {
      number: 12,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Though I trimmed that row every ten days all summer, Ray never assigned it to anyone else.",
      noChange: "The opening phrase describes the row, but the noun after the comma is Ray.",
      wrong: [
        [
          "Trimming every ten days all summer, Ray never assigned that row to anyone else.",
          "The active form makes Ray do the trimming, which the essay says he did not.",
        ],
        [
          "Trimmed every ten days all summer, that row was never assigned to anyone else by Ray.",
          "The modifier now attaches correctly but the passive buries who did the assigning.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "Turning it into a clause names the narrator as the one trimming and keeps Ray as the subject.",
      steps: [
        "Ask who trimmed the row. The narrator did.",
        "Rewrite the phrase as a clause that says so.",
      ],
      hint: "When no rearrangement puts the right noun after the comma, make the phrase a clause.",
      trap: "The sentence states a true fact about Ray, so nothing reads as an error.",
    },
    {
      number: 13,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "why; I have thought since that he may have been waiting",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "why: I have thought since that he may have been waiting",
          "A colon introduces an explanation, but the second clause is a later reflection.",
        ],
        [
          "why and I have thought since that he may have been waiting",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and equally weighted — what the narrator did not do then, and what " +
        "they have concluded since. A semicolon joins equals and holds the gap between the two times.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or sits beside it. It sits beside it.",
      ],
      hint: "The two clauses happen years apart; the mark should let both stand.",
      trap: "The second clause reads like an explanation, which points the eye toward a colon.",
    },
    {
      number: 14,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “The 1918 " +
        "influenza pandemic killed more people worldwide than the First World War.” Should the " +
        "writer make this addition?",
      key: "No, because the paragraph is turning away from large numbers, not reaching for a larger one.",
      wrong: [
        [
          "Yes, because it explains why so many stones in that section carry the same year.",
          "The essay has already supplied the year and never needs the cause explained.",
        ],
        [
          "Yes, because it gives the reader necessary historical context for the section described.",
          "The context adds nothing the row of small stones has not already conveyed.",
        ],
        [
          "No, because the essay has already stated how many people are buried in the cemetery.",
          "The eleven thousand figure is not what makes the added sentence wrong here.",
        ],
      ],
      why:
        "The paragraph's whole movement is from eleven thousand to four. A worldwide death toll " +
        "pulls in exactly the direction the paragraph is working to escape.",
      steps: [
        "Name what the paragraph is doing: replacing a large number with a small one.",
        "Test the sentence against that movement rather than against its accuracy.",
      ],
      hint: "Read the last two sentences of the paragraph before deciding.",
      trap: "The fact is striking and genuinely explains the section, which is why it is tempting.",
    },
    {
      number: 15,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the claim the essay closes on?",
      key: "I have not been back in six years and I could still tell you which stone is the smallest.",
      wrong: [
        [
          "Ray retired two summers after I worked there and the cemetery hired a contractor.",
          "What became of Ray does not bear on what the narrator retained.",
        ],
        [
          "I worked there for two more summers before I left for school.",
          "The length of employment measures time served rather than what was remembered.",
        ],
        [
          "The cemetery has since added a section on the far side of the access road.",
          "A change to the grounds says nothing about the narrator's memory of them.",
        ],
      ],
      why:
        "The closing claims a memory precise enough to navigate in the dark. The support has to " +
        "demonstrate that precision surviving time away.",
      steps: [
        "Read the last sentence and name what it claims: exact, durable memory.",
        "Keep the choice that demonstrates it rather than adding a fact about the place.",
      ],
      hint: "The claim is about what the narrator still knows, so the support must be too.",
      trap: "Every choice is a plausible true sentence about the same cemetery.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about learning something without " +
        "being taught it. Would this essay accomplish that goal?",
      key: "Yes, because the reading happened at hand level for eight hours a day and nobody ever mentioned it.",
      wrong: [
        [
          "Yes, because Ray explained the layout of the cemetery during the narrator's first week.",
          "The essay describes a one-question interview and no instruction of any kind.",
        ],
        [
          "No, because the narrator states plainly that the work was mowing rather than study.",
          "That the job was mowing is exactly what makes the learning incidental.",
        ],
        [
          "No, because Ray deliberately assigned the 1918 row to the narrator as a lesson.",
          "The essay only wonders whether he might have; it never says he did.",
        ],
      ],
      why:
        "Nobody taught the narrator anything. The stones were at hand height for eight hours a day, " +
        "and the knowledge arrived as a by-product of trimming around them.",
      steps: [
        "Ask what instruction the essay actually contains. None.",
        "Keep the reason that explains how the learning happened anyway.",
      ],
      hint: "The essay says the reading was 'not on purpose either.'",
      trap: "One wrong choice turns the essay's speculation about Ray into a stated fact.",
    },
  ],
};
