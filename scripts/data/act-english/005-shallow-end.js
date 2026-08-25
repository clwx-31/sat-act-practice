"use strict";

module.exports = {
  id: "act-english-p005",
  type: "personal-essay",
  title: "The Shallow End",
  content: `[1] I learned to swim at fourteen, in the shallow end of a municipal
pool, in a class otherwise made up of six-year-olds. My {1 mother, who had
signed me up in March} did not ask me first. I resented it for about six weeks
and {2 have been} grateful for it ever since.

[2] {3 In addition,} the embarrassment was the whole problem. There {4 is} six
of us in that shallow end, five of them still learning to count. At fourteen you
have already decided what kind of person you are, and being bad at something in
front of witnesses is not part of it. {5}

[3] The {6 instructors} name was Denise, and she was perhaps twenty. She never
once mentioned that I was three heads taller than anyone else in the water
{7 — a restraint I have thought about many times since,} and she never let the
six-year-olds mention it either. It was, though I did not see it then,
{8 a totally clutch move}.

[4] What she did instead was give me a {9 job, while} the little ones practiced
blowing bubbles, she had me work with {10 them}. I {11 held the kickboard,
counted their kicks, and walked them back to the wall}. It looked like helping.
It was actually forty minutes a week of standing in chest-deep water until
{12 you stopped noticing where you were standing}. {13}

[5] {14 Meanwhile,} the swimming came later, and it came fast. Floating was the
hard part, and floating is mostly a decision — you have to stop holding yourself
up before the water will agree to do it for you. I could not make that decision
in June. In July I made it by accident, lying back to look at the ceiling
girders, and the water took my weight the way Denise had been saying for two
months that it would.

[6] I am a mediocre swimmer and I will never be anything else. But I know what
it is to be the worst person in a room and to stay in the room, and I do not
know another way I could have learned it.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "nonrestrictive-clause",
      difficulty: "Easy",
      keep: false,
      key: ", who had signed me up in March,",
      noChange: "A nonrestrictive clause needs a comma closing it as well as one opening it.",
      wrong: [
        [" who had signed me up in March,", "Dropping the opening comma leaves the pair unbalanced at the other end."],
        [" who had signed me up in March", "With no commas at all the clause reads as identifying which mother."],
      ],
      why:
        "The clause adds information about a mother the reader can already identify, so it is " +
        "nonrestrictive and takes a comma on each side.",
      steps: [
        "Remove the clause and check the sentence still works: 'My mother did not ask me first.'",
        "Since it can be removed, enclose it in a matched pair of commas.",
      ],
      hint: "If the clause could be lifted out without changing who is meant, it needs two commas.",
      trap: "The opening comma is already there, which makes the punctuation look half handled.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "present-perfect-with-ever-since",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["was", "The simple past closes off a gratitude the phrase 'ever since' keeps open."],
        ["am", "The simple present drops the stretch of time 'ever since' requires."],
        ["had been", "The past perfect places the gratitude before some earlier past that is never named."],
      ],
      why:
        "'Ever since' names a span running from a past moment to now, and the present perfect is the " +
        "form that covers exactly that span.",
      steps: [
        "Notice the time phrase at the end of the sentence: 'ever since.'",
        "Match the verb to a period that began in the past and continues.",
      ],
      hint: "Let the time phrase choose the tense, not the verb beside it.",
      trap: "The first half of the sentence is simple past, which makes the match feel like the answer.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "additive-transition",
      difficulty: "Medium",
      keep: false,
      key: "At first,",
      noChange: "'In addition' adds this sentence to a list, but nothing before it began a list.",
      wrong: [
        ["Therefore,", "The embarrassment is not caused by anything stated in the first paragraph."],
        ["Regardless,", "The word dismisses an objection the essay has not raised."],
      ],
      why:
        "The paragraph opens the essay's difficulty and locates it in time — this was how things " +
        "stood at the start, before Denise changed them. The transition should mark that.",
      steps: [
        "Ask what this paragraph does: it describes the beginning of the problem.",
        "Choose the transition that places it in time rather than adding it to a list.",
      ],
      hint: "The essay is a story, so its transitions are mostly about when.",
      trap: "'In addition' is grammatically harmless, and harmless words are easy to leave alone.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "expletive-there-agreement",
      difficulty: "Easy",
      keep: false,
      key: "are",
      noChange: "With 'there' as the placeholder, the verb agrees with the plural noun that follows.",
      wrong: [
        ["was", "The verb is still singular and the tense now conflicts with the present narration."],
        ["has been", "The singular present perfect misses the plural subject and the ongoing scene."],
      ],
      why:
        "In a sentence beginning 'There,' the real subject comes after the verb. Here it is 'six of " +
        "us,' which is plural.",
      steps: [
        "Find the noun after the verb: 'six of us.'",
        "Match the verb to that noun, not to 'there.'",
      ],
      hint: "'There' is never the subject; look past the verb to find the real one.",
      trap: "'There is' is so common in speech that it sounds correct before any subject at all.",
    },
    {
      number: 5,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “The pool " +
        "had been built in 1962 and its filtration system was replaced the following spring.” " +
        "Should the writer make this addition?",
      key: "No, because the paragraph is about how being watched felt, not about the building.",
      wrong: [
        [
          "Yes, because it explains why the class was held in the shallow end of the pool.",
          "Nothing connects the filtration work to where the beginners' class was placed.",
        ],
        [
          "Yes, because it grounds the essay in a specific place with a specific history.",
          "Specificity does not help when the detail belongs to a subject the paragraph left behind.",
        ],
        [
          "No, because the essay has already given the year in which the narrator learned to swim.",
          "The essay never states a year, so the reason describes something that is not there.",
        ],
      ],
      why:
        "The paragraph builds one feeling: at fourteen, being visibly bad at something is intolerable. " +
        "The pool's construction date does not touch that, so it interrupts the build.",
      steps: [
        "Say in one phrase what the paragraph is doing: establishing the embarrassment.",
        "Test the sentence against that. A filtration system does not serve it.",
      ],
      hint: "Ask what the paragraph is about before you ask whether the sentence is interesting.",
      trap: "Concrete dates feel like good personal-essay writing, which makes cutting them feel wrong.",
    },
    {
      number: 6,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: false,
      key: "instructor's",
      noChange: "Without an apostrophe the word is a plain plural and shows no possession.",
      wrong: [
        ["instructors'", "The plural possessive implies several instructors sharing one name."],
        ["instructor", "The singular is correct in number but still marks no possessive relationship."],
      ],
      why: "One instructor owns the name, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Ask how many instructors the sentence is about. One.",
        "Add the apostrophe before the s.",
      ],
      hint: "Count the owners first; the apostrophe's position follows from that.",
      trap: "The plural and the possessive are pronounced identically, so the ear offers no help.",
    },
    {
      number: 7,
      subskill: "dashes and parentheses",
      family: "mismatched-pair",
      difficulty: "Medium",
      keep: false,
      key: "— a restraint I have thought about many times since —",
      noChange: "A dash opens the interrupter and a comma closes it, which is not a matched pair.",
      wrong: [
        [
          "(a restraint I have thought about many times since —",
          "A parenthesis and a dash cannot open and close the same interrupter.",
        ],
        [
          ", a restraint I have thought about many times since —",
          "The marks are still mismatched, with the comma and dash simply swapped.",
        ],
      ],
      why:
        "An interrupter is enclosed by two marks of the same kind. Whatever opens it has to close it.",
      steps: [
        "Lift the interrupter out and confirm the sentence still reads. It does.",
        "Make the closing mark match the opening one.",
      ],
      hint: "Check both ends of the interruption, not just the end where the error feels likely.",
      trap: "Each wrong choice is correctly punctuated on one side, so a partial check passes it.",
    },
    {
      number: 8,
      subskill: "style and tone",
      family: "slang-in-a-reflective-essay",
      difficulty: "Medium",
      keep: false,
      key: "an act of tact",
      noChange: "The slang collides with a sentence that is otherwise carefully measured.",
      wrong: [
        ["a real power move on her part", "The phrase is as casual as the original and misreads her motive."],
        ["an exercise of considerable interpersonal discretion", "The clinical phrasing is as far from the essay's voice as the slang."],
      ],
      why:
        "The essay's voice is plain and controlled — 'I resented it for about six weeks.' The sentence " +
        "is also making a serious point about kindness, and slang undercuts it.",
      steps: [
        "Recall a sentence from earlier in the essay and note how it sounds.",
        "Choose the phrase that could sit in that voice unnoticed.",
      ],
      hint: "The right answer is the one that does not call attention to itself.",
      trap: "The wrong choices miss in opposite directions, so rejecting slang alone does not decide it.",
    },
    {
      number: 9,
      subskill: "semicolons and colons",
      family: "colon-before-an-explanation",
      difficulty: "Hard",
      keep: false,
      key: "job: while",
      noChange: "A comma is too weak to introduce the explanation of what the job was.",
      wrong: [
        [
          "job; while",
          "A semicolon joins two independent clauses, and the second half here explains the first.",
        ],
        [
          "job, and while",
          "The conjunction turns an explanation into a second, unrelated event.",
        ],
      ],
      why:
        "'What she did instead was give me a job' is complete and promises to say what the job was. " +
        "A colon is the mark that delivers on that promise.",
      steps: [
        "Confirm the words before the mark form a complete sentence. They do.",
        "Ask whether what follows explains it or merely stands beside it. It explains.",
      ],
      hint: "A colon answers the sentence before it; a semicolon only balances one.",
      trap: "Both halves are full clauses, which makes the semicolon look like the technical answer.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["him", "The singular pronoun cannot stand for the plural 'the little ones.'"],
        ["it", "The singular neuter pronoun refers to no noun in the sentence."],
        ["us", "The first-person plural would include the narrator among the children being helped."],
      ],
      why:
        "The pronoun refers to 'the little ones,' a plural noun phrase in the same sentence, so the " +
        "plural object pronoun is right.",
      steps: [
        "Find the noun the pronoun replaces: 'the little ones.'",
        "Match it in number and use the object form after 'with.'",
      ],
      hint: "Name the exact noun before checking the pronoun's form.",
      trap: "The sentence is long enough that the antecedent has scrolled out of mind by the pronoun.",
    },
    {
      number: 11,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "held the kickboard, counting their kicks, and walked them back to the wall",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "held the kickboard, their kicks were counted, and walked them back to the wall",
          "The middle item becomes a passive clause with a different subject entirely.",
        ],
        [
          "was holding the kickboard, counted their kicks, and walking them back to the wall",
          "Three different verb forms appear where the series needs one repeated form.",
        ],
      ],
      why:
        "Three past-tense verbs share the subject 'I' and run in one series. Repeating the form is " +
        "what makes the list read as a single stretch of work.",
      steps: [
        "Read the three items separately and compare their verb forms.",
        "Keep the version in which all three are simple past.",
      ],
      hint: "In a series, check the first word of each item against the others.",
      trap: "Varying the forms looks like avoiding repetition, but a series is where repetition is the rule.",
    },
    {
      number: 12,
      subskill: "consistency",
      family: "person-shift",
      difficulty: "Medium",
      keep: false,
      key: "I stopped noticing where I was standing",
      noChange: "The sentence turns to 'you' in the middle of a first-person account.",
      wrong: [
        ["one stopped noticing where one was standing", "The formal 'one' is still a departure from the narrator's 'I.'"],
        ["we stopped noticing where we were standing", "The plural takes in the six-year-olds, who were never afraid of the water."],
      ],
      why:
        "The whole paragraph is about what happened to the narrator. Switching to 'you' hands the " +
        "experience to the reader, who was not there.",
      steps: [
        "Check who the paragraph is about: the narrator, in the first person.",
        "Keep the sentence in that person.",
      ],
      hint: "A personal essay slips into 'you' most easily at the moment it turns reflective.",
      trap: "The second person makes the insight sound universal, which reads as good writing.",
    },
    {
      number: 13,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the idea that Denise's assignment worked because it was not presented as help?",
      key: "She never told me what it was for, and I did not work it out until years afterward.",
      wrong: [
        [
          "She had been teaching beginners' classes at that pool for three summers already.",
          "Her experience explains how she knew to do it, not why the method worked on me.",
        ],
        [
          "The six-year-olds were entirely willing to take instruction from a stranger.",
          "The children's willingness concerns them rather than the narrator's own resistance.",
        ],
        [
          "By August I could cross the shallow end without putting a foot on the bottom.",
          "The result belongs to the next paragraph and does not explain the method.",
        ],
      ],
      why:
        "The paragraph's claim is that the job looked like helping and was actually exposure therapy. " +
        "Only the detail about Denise never explaining it shows why the disguise was the point.",
      steps: [
        "Name the claim precisely: it worked because the narrator did not know it was treatment.",
        "Keep the choice that speaks to the narrator's not knowing.",
      ],
      hint: "The claim is about concealment, so the support has to be about what was concealed.",
      trap: "Every choice is a plausible true sentence about the same swimming class.",
    },
    {
      number: 14,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Easy",
      keep: false,
      key: "Eventually,",
      noChange: "'Meanwhile' says this happened at the same time, but it happened afterward.",
      wrong: [
        ["Nevertheless,", "The sentence continues the story rather than contradicting the last paragraph."],
        ["For instance,", "Learning to swim is not an example of standing in chest-deep water."],
      ],
      why:
        "The paragraph moves the story forward from the weeks of standing in the water to the " +
        "swimming that followed, so the transition marks time passing.",
      steps: [
        "Ask whether this paragraph happens during the last one or after it. After.",
        "Choose the transition that marks a later stage.",
      ],
      hint: "The sentence itself says 'came later,' which tells you what the transition should say.",
      trap: "'Meanwhile' is a story word, so it feels at home in a narrative even when it is wrong.",
    },
    {
      number: 15,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a teacher whose most important " +
        "lesson was never actually taught. Would this essay accomplish that goal?",
      key: "Yes, because what the narrator kept was something Denise arranged rather than explained.",
      wrong: [
        [
          "Yes, because Denise gave the narrator detailed instruction in how to float on their back.",
          "The essay says floating was worked out alone, by accident, in July.",
        ],
        [
          "No, because the narrator states that they remain a mediocre swimmer to this day.",
          "Mediocrity at swimming is what makes the other lesson the essay's real subject.",
        ],
        [
          "No, because the essay describes a class the narrator attended rather than a single teacher.",
          "The class is where the teaching happened, so the setting does not disqualify the essay.",
        ],
      ],
      why:
        "Denise taught by assignment and by silence: the kickboard job, and never mentioning the " +
        "narrator's age. The closing names the lesson, and it is not swimming.",
      steps: [
        "Decide yes or no from the essay's closing paragraph before reading the reasons.",
        "Keep the reason that describes teaching by arrangement rather than by instruction.",
      ],
      hint: "The last paragraph tells you what the narrator actually took away.",
      trap: "One wrong choice quotes the essay accurately and reaches the opposite verdict.",
    },
  ],
};
