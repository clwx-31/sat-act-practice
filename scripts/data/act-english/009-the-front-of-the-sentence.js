"use strict";

module.exports = {
  id: "act-english-p009",
  type: "personal-essay",
  title: "The Front of the Sentence",
  content: `[1] My grandmother came to Milwaukee in 1961 with a suitcase and a
sister already here. She learned enough English to shop and to {1 work, and then
stopped}, the way a person stops digging once the hole is deep enough.

[2] {2} I {3 was} nine the first time I translated something that mattered. A
pharmacist was explaining a dosage. I got it right — one in the morning, one at
night, with food — {4 the pharmacist looked at me and not at her the whole time
he was saying it.}

[3] That was the part nobody warned me about. The adults in those rooms
{5 was} always looking at me. Their questions were about her, but the
{6 adults} eyes went to whoever could answer, and she stood beside me while I
{7 handled it}, and I did not understand until I was much older what that must
have cost her.

[4] {8 As a result,} I was good at it. I want to say so plainly, because for a
long time I {9 was low-key mortified about it}. {10 Holding a whole sentence in
my head, the words for its beginning could be found while the rest waited.} I
learned which English words had no Polish that fit — deductible, copay,
appointment window — and I learned to explain the idea rather than hunt for the
word.

[5] {11} What I could not do was translate her. Babcia was funny in Polish.
{12 She} had timing. In English, through me, she became a polite woman with a
list of {13 symptoms, everything that made her herself stayed on the other
side.}

[6] She died when I was twenty-two. {14} I still {15 catch} myself translating
in my head when I hear a sentence I know she would have said better.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-with-compound-predicate",
      difficulty: "Easy",
      keep: false,
      key: "work and then stopped",
      noChange: "A comma before 'and' needs a second subject after it, and none appears.",
      wrong: [
        ["work; and then stopped", "A semicolon must join independent clauses, and 'then stopped' is not one."],
        ["work and, then stopped", "The comma now separates the conjunction from the verb it introduces."],
      ],
      why:
        "'Learned' and 'stopped' share the subject 'She,' so they form a compound predicate. A " +
        "compound predicate takes no comma before its conjunction.",
      steps: [
        "Look for a subject after 'and.' There is none — 'then stopped' has no subject of its own.",
        "Remove the comma.",
      ],
      hint: "Ask whether the words after 'and' could stand alone as a sentence.",
      trap: "The sentence pauses naturally there in speech, which is where the comma feels earned.",
    },
    {
      number: 2,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "What she did not learn, my brother and I supplied.",
      wrong: [
        [
          "Milwaukee's Polish community was among the largest in the United States at that time.",
          "The size of the community never bears on anything the essay goes on to describe.",
        ],
        [
          "Children of immigrants often take on responsibilities their classmates do not have.",
          "The general claim states the essay's subject instead of entering this particular story.",
        ],
        [
          "My grandmother's apartment was four blocks from the pharmacy on Lincoln Avenue.",
          "The geography is vivid but does not connect her stopped English to what follows.",
        ],
      ],
      why:
        "Paragraph 1 ends with a grandmother who learned only as much English as she needed. This " +
        "paragraph is about who covered the rest, so the opening should make that turn.",
      steps: [
        "Read the last sentence of the previous paragraph: she stopped learning.",
        "Choose the opening that answers what happened because she stopped.",
      ],
      hint: "The best opening turns the previous paragraph's last idea into this paragraph's subject.",
      trap: "The general statement about children of immigrants is true and belongs in a different essay.",
    },
    {
      number: 3,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["had been", "The past perfect places the age before some earlier past that is never named."],
        ["am", "The present tense contradicts a memory the essay places decades ago."],
        ["was being", "The progressive suggests being nine was a temporary condition of that moment."],
      ],
      why:
        "The essay narrates a finished episode in the simple past — 'translated,' 'got,' 'looked.' " +
        "The verb naming the narrator's age belongs in that same tense.",
      steps: [
        "Check the tense of the verbs in the sentences around it.",
        "Keep the simple past that matches them.",
      ],
      hint: "Match the tense the story is already being told in.",
      trap: "'Had been' sounds more literary, and literary reads as more correct in a personal essay.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "and the pharmacist looked at me and not at her the whole time he was saying it.",
      noChange: "Two independent clauses are joined by a comma with no conjunction between them.",
      wrong: [
        [
          "the pharmacist looking at me and not at her the whole time he was saying it.",
          "The participle leaves the second half without a main verb of its own.",
        ],
        [
          "but the pharmacist looked at me and not at her the whole time he was saying it.",
          "'But' asserts a contrast between getting it right and being looked at, which is not the point.",
        ],
      ],
      why:
        "Both halves are complete sentences. A comma plus 'and' joins them and lets the second fact " +
        "sit alongside the first, which is what the paragraph needs.",
      steps: [
        "Test each side of the comma as its own sentence. Both stand.",
        "Add the conjunction that adds rather than one that contrasts.",
      ],
      hint: "Once you see the splice, choose the conjunction that does not invent a relationship.",
      trap: "'But' repairs the punctuation perfectly and quietly changes what the sentence means.",
    },
    {
      number: 5,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Easy",
      keep: false,
      key: "were",
      noChange: "The singular verb has been matched to 'rooms' rather than to 'The adults.'",
      wrong: [
        ["is", "The verb is still singular and the present tense breaks the past-tense narration."],
        ["has been", "The singular present perfect misses both the number and the time frame."],
      ],
      why:
        "The subject is 'The adults,' which is plural. 'In those rooms' is a prepositional phrase, " +
        "and the noun inside one is never the subject.",
      steps: [
        "Cross out 'in those rooms.'",
        "Read 'The adults … were' and confirm the verb matches.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'Rooms' is plural too, so the usual singular-noun tell is absent here.",
    },
    {
      number: 6,
      subskill: "apostrophes",
      family: "plural-possessive",
      difficulty: "Easy",
      keep: false,
      key: "adults'",
      noChange: "The bare plural shows no possession, so the eyes belong to no one.",
      wrong: [
        ["adult's", "The singular possessive contradicts 'The adults' named in the previous sentence."],
        ["adults's", "The form is standard for neither the singular nor the plural possessive."],
      ],
      why:
        "Several adults own the eyes, so the noun takes the plural possessive: the plural spelling " +
        "followed by an apostrophe.",
      steps: [
        "Decide how many adults there are. More than one.",
        "Add the apostrophe after the s of the plural.",
      ],
      hint: "Spell the plural first, then place the apostrophe.",
      trap: "The plural and the possessive sound identical, so the ear gives no signal.",
    },
    {
      number: 7,
      subskill: "precision",
      family: "vague-verb-phrase",
      difficulty: "Medium",
      keep: false,
      key: "answered for her",
      noChange: "'Handled it' names no action in the sentence that defines the essay's subject.",
      wrong: [
        ["dealt with the situation", "The phrase is longer and just as unspecific as the original."],
        ["took care of what was needed", "The wording gestures at the task without naming it."],
      ],
      why:
        "The whole essay turns on one act: a child speaking in place of an adult. This is the " +
        "sentence that has to name it exactly.",
      steps: [
        "Ask what the narrator was actually doing while she stood there.",
        "Use the words that say it.",
      ],
      hint: "The precise phrase is the one that makes the next clause about cost make sense.",
      trap: "'Handled it' is idiomatic and fluent, so nothing about the sentence sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "consequence-versus-concession-transition",
      difficulty: "Medium",
      keep: false,
      key: "Still,",
      noChange: "'As a result' claims the narrator's skill was caused by the adults' behavior.",
      wrong: [
        ["Similarly,", "Being good at translating is not like the discomfort just described."],
        ["For instance,", "Competence is not an example of adults looking at the wrong person."],
      ],
      why:
        "Paragraph 3 describes what was uncomfortable; paragraph 4 concedes something that sat " +
        "alongside it. The transition marks a turn, not a consequence.",
      steps: [
        "Ask whether this paragraph follows from the last one or pushes against it.",
        "Choose the transition that concedes.",
      ],
      hint: "The next sentence says 'I want to say so plainly,' which signals a difficult admission.",
      trap: "Causal transitions make an essay feel argued, so they get used where nothing causes anything.",
    },
    {
      number: 9,
      subskill: "style and tone",
      family: "slang-in-a-reflective-essay",
      difficulty: "Easy",
      keep: false,
      key: "was embarrassed to",
      noChange: "The slang breaks a sentence that is otherwise making a careful admission.",
      wrong: [
        ["was totally cringing about it", "The casual phrasing clashes with the essay's restrained voice."],
        ["experienced considerable self-consciousness", "The clinical phrasing is as far from the voice as the slang is."],
      ],
      why:
        "The essay speaks plainly — 'I got it right,' 'She had timing.' The sentence is admitting " +
        "something the narrator finds hard, and slang undercuts the admission.",
      steps: [
        "Recall how the essay has been sounding and what it is admitting here.",
        "Keep the phrase that could sit in that voice unnoticed.",
      ],
      hint: "The right answer is the one you would not notice on a first read.",
      trap: "The wrong choices miss in opposite directions, so rejecting slang alone does not settle it.",
    },
    {
      number: 10,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Holding a whole sentence in my head, I could find the words for its beginning while the rest waited.",
      noChange: "The opening phrase describes the narrator, but the noun after the comma is 'the words.'",
      wrong: [
        [
          "Holding a whole sentence in my head, the beginning of it could be found while the rest waited.",
          "The phrase now modifies 'the beginning,' which is not what holds the sentence.",
        ],
        [
          "By holding a whole sentence in my head, the words for its beginning could be found while the rest waited.",
          "Adding 'by' does not supply the person doing the holding.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The narrator does the holding, so the narrator has to be that noun.",
      steps: [
        "Ask who holds the sentence in their head. The narrator does.",
        "Rewrite so 'I' follows the comma.",
      ],
      hint: "Say the opening phrase and then ask 'who?' — the answer must come next.",
      trap: "The passive version sounds modest, which suits a paragraph about not bragging.",
    },
    {
      number: 11,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Polish is a " +
        "West Slavic language with seven cases and no articles.” Should the writer make this " +
        "addition?",
      key: "No, because the paragraph is about what could not be carried across, not about grammar.",
      wrong: [
        [
          "Yes, because it explains why some English words had no Polish equivalent.",
          "The missing equivalents were insurance terms, which have nothing to do with cases.",
        ],
        [
          "Yes, because it gives readers unfamiliar with Polish necessary background.",
          "The paragraph asks nothing of the reader that this background would help with.",
        ],
        [
          "No, because the essay has already described the grammatical differences at length.",
          "The essay never discusses grammar, so the reason misdescribes what came before.",
        ],
      ],
      why:
        "The paragraph is about humor, timing, and personality failing to survive translation. A " +
        "structural fact about the language does not touch any of that.",
      steps: [
        "Name what the paragraph is about: what was lost that was not information.",
        "Test the sentence against that, not against its own accuracy.",
      ],
      hint: "Ask what the paragraph is doing before asking whether the sentence is interesting.",
      trap: "The linguistic detail looks like exactly the kind of specificity essays are told to add.",
    },
    {
      number: 12,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["They", "The plural pronoun does not agree with the singular antecedent 'Babcia.'"],
        ["It", "The neuter pronoun would refer to the humor rather than to the person who had it."],
        ["Her", "The object pronoun cannot serve as the subject of the sentence."],
      ],
      why:
        "The pronoun refers to Babcia, named in the sentence just before, and it is the subject of " +
        "its own sentence, so the singular subject pronoun is correct.",
      steps: [
        "Find the antecedent: Babcia, in the previous sentence.",
        "Use the singular subject form.",
      ],
      hint: "Check both the number of the antecedent and the pronoun's job in its own sentence.",
      trap: "The three-word sentence looks too plain to be right, which invites an unneeded change.",
    },
    {
      number: 13,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "symptoms; everything that made her herself stayed on the other side.",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "symptoms: everything that made her herself stayed on the other side.",
          "A colon introduces an explanation, but the second clause states a separate loss.",
        ],
        [
          "symptoms, and everything that made her herself stayed on the other side.",
          "The conjunction repairs the splice but flattens two balanced statements into a list.",
        ],
      ],
      why:
        "Both clauses are complete and carry equal weight — what she became, and what was left " +
        "behind. A semicolon holds two such clauses together without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or balances it. It balances.",
      ],
      hint: "A semicolon is for two sentences of equal weight; a colon is for one that answers the other.",
      trap: "The colon is tempting because the second clause feels like it is spelling out the first.",
    },
    {
      number: 14,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the idea the essay closes on?",
      key: "At the funeral an aunt told a story about her that I had never heard, because it had never needed me.",
      wrong: [
        [
          "By then I had been translating for her at appointments for thirteen years.",
          "The span of service restates what the essay has shown rather than extending it.",
        ],
        [
          "I had started college two years earlier and was home only on weekends.",
          "The narrator's schedule is a fact about the narrator, not about what was lost.",
        ],
        [
          "She had lived in the same apartment on Lincoln Avenue for more than forty years.",
          "The detail is vivid but bears on neither her humor nor the limits of translation.",
        ],
      ],
      why:
        "The closing says the narrator still hears sentences she would have said better. A story that " +
        "reached the family without passing through the narrator shows exactly what was missing.",
      steps: [
        "Read the final sentence and name what it claims was lost.",
        "Keep the choice that demonstrates that loss rather than restating the essay's facts.",
      ],
      hint: "The support should show her sounding like herself to someone else.",
      trap: "Every choice is a true sentence about the same grandmother and the same years.",
    },
    {
      number: 15,
      subskill: "consistency",
      family: "tense-shift-into-the-present",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["caught", "The past tense would end a habit the sentence says is still going on."],
        ["had caught", "The past perfect places the habit before her death rather than after it."],
        ["was catching", "The progressive describes one stretch of time instead of a continuing habit."],
      ],
      why:
        "The paragraph moves deliberately from a past event — she died — to a present habit. The " +
        "present tense is what marks that the habit did not end with her.",
      steps: [
        "Notice the shift the paragraph makes: one sentence in the past, then the narrator now.",
        "Keep the present tense that places the habit in the present.",
      ],
      hint: "A tense shift is only an error when it is unintended; here the sentence means to shift.",
      trap: "The preceding sentence is past tense, which makes matching it feel like consistency.",
    },
    {
      number: 16,
      subskill: "conclusions",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a skill that solved one problem " +
        "and created another. Would this essay accomplish that goal?",
      key: "Yes, because the translating that made appointments work is also what kept her out of her own conversations.",
      wrong: [
        [
          "Yes, because the narrator became fluent enough to explain insurance terms without hunting for words.",
          "That fluency is the solved half only; the goal requires the cost as well.",
        ],
        [
          "No, because the narrator states plainly that the work was done well and done early.",
          "Doing the work well is what made the second problem possible, not what prevents it.",
        ],
        [
          "No, because the essay is about the narrator's grandmother rather than about the narrator.",
          "The essay traces what the arrangement did to both of them, which is the point.",
        ],
      ],
      why:
        "The skill got the dosage right and kept the household running. It also meant adults spoke to " +
        "a child instead of to her, and that her humor never crossed into English.",
      steps: [
        "Name the problem the skill solved and the one it created.",
        "Keep the reason that holds both halves together.",
      ],
      hint: "The goal has two parts, so the correct reason must have two parts as well.",
      trap: "One wrong choice describes the essay accurately and only covers half of what the goal asks.",
    },
  ],
};
