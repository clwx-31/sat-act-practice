"use strict";

module.exports = {
  id: "act-english-p025",
  type: "personal-essay",
  title: "The House at Two in the Afternoon",
  content: `[1] My mother worked nights at a hospital for eleven years, which
{1 means} that for eleven years our house ran on a {2 rule between} eight in the
morning and three in the afternoon, it was the middle of the night.

[2] {3} We learned the floor. There {4 is} a board in the upstairs hall that
speaks if you put weight on the middle of it and says nothing at the {5 edge, I
could cross that hall} at eleven years old without a sound. My brother could
not, and never learned, and I have thought since that this was {6 less a matter
of skill and more about skill not being the issue}.

[3] The rule was not enforced. {7 Woken by any noise at all, my mother never
once came out of that room to tell us to be quiet.} She did not have to, because
the alternative was {8 worse, she would come down at three} with a face that had
not slept, and make dinner anyway, and we would understand exactly what it had
{9 run her}.

[4] {10 Similarly,} what I did not understand until much later was that she
never told us it was hard. Eleven years, and I cannot remember a single
complaint about the hours. I took {11 that} at the time as evidence that the
hours were fine.

[5] I am not quiet by nature. I talk over people. But I still know where that
board is, and I have {12 never in my life let a door close behind me on its
own}, and I never {13 will}.

[6] {14} The house was sold in 2019. {15} I would still be able to cross that
hall.`,
  questions: [
    {
      number: 1,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Medium",
      keep: false,
      key: "meant",
      noChange: "The present tense contradicts eleven years the essay places firmly in the past.",
      wrong: [
        ["had meant", "The past perfect places the consequence before an earlier past never named."],
        ["was meaning", "'Mean' in this sense does not take the progressive form."],
      ],
      why:
        "The clause reports what her schedule entailed during those eleven years, and the sentence " +
        "around it is in the simple past.",
      steps: [
        "Check the tense of the main verb: 'worked.'",
        "Match the relative clause to it.",
      ],
      hint: "The first verb in the sentence sets the tense.",
      trap: "The rule feels like a standing fact, which invites the present tense.",
    },
    {
      number: 2,
      subskill: "commas",
      family: "colon-versus-comma",
      difficulty: "Easy",
      keep: false,
      key: "rule: between",
      noChange: "A comma is too weak to introduce the rule the clause has just promised.",
      wrong: [
        ["rule, that between", "'That' turns the rule into a clause but leaves the comma doing a colon's work."],
        ["rule; between", "A semicolon joins two independent clauses, and 'between eight … night' explains instead."],
      ],
      why:
        "'Our house ran on a rule' is complete and promises to say what the rule was. A colon is the " +
        "mark that delivers on that promise.",
      steps: [
        "Check that the words before the mark form a complete sentence. They do.",
        "Ask whether what follows explains it. It does, so use a colon.",
      ],
      hint: "A sentence that announces something and then supplies it wants a colon.",
      trap: "The sentence is already long, so one more heavy mark feels like too many.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "A rule like that gets into the body before it gets into the head.",
      wrong: [
        [
          "Night-shift nurses often work three twelve-hour shifts in a row.",
          "The structure of hospital scheduling is never taken up again in the essay.",
        ],
        [
          "Our house was a two-storey wooden building put up sometime in the 1940s.",
          "The age and construction of the house are not what this paragraph describes.",
        ],
        [
          "There were a number of adjustments the family had to make during those years.",
          "The vague plural promises a list where the paragraph describes one learned habit.",
        ],
      ],
      why:
        "Paragraph 1 states the rule. This paragraph is about the rule becoming physical — knowing " +
        "the floorboard — so the opening should make that turn.",
      steps: [
        "Note what paragraph 1 establishes: a rule about hours.",
        "Choose the opening that moves from the rule to how it was lived.",
      ],
      hint: "The paragraph is about the body, not the schedule.",
      trap: "The detail about the house is concrete and connects to nothing that follows.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "expletive-there-agreement",
      difficulty: "Easy",
      keep: false,
      key: "is",
      noChange: "The plural verb does not agree with the singular subject 'a board' that follows it.",
      wrong: [
        ["were", "The verb is plural and the past tense breaks the present-tense description."],
        ["have been", "The plural present perfect misses both the number and the standing fact."],
      ],
      why:
        "In a sentence beginning 'There,' the real subject follows the verb. Here it is 'a board,' " +
        "which is singular.",
      steps: [
        "Look past the verb for the real subject: 'a board.'",
        "Keep the singular verb that matches it.",
      ],
      hint: "'There' is never the subject; find the noun after the verb.",
      trap: "The two long clauses after the noun make the sentence feel plural by the end.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "edge, and I could cross that hall",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "edge, I could cross that hall,",
          "Moving the comma leaves the splice and cuts the phrase that follows.",
        ],
        [
          "edge; and I could cross that hall",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "'There is a board … that says nothing at the edge' and 'I could cross that hall … without a " +
        "sound' are both complete, so joining them takes a comma plus a conjunction.",
      steps: [
        "Test each side of the comma as its own sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "Cover the comma and read each half aloud on its own.",
      trap: "The first clause is long and technical, which makes the second feel like its continuation.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "circular-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "less about skill than about how much either of us minded",
      noChange: "The phrase says skill was not the issue twice and never names what was.",
      wrong: [
        ["less a matter of skill than of skill", "The repetition is now explicit and still names no alternative."],
        ["not really about skill in any case", "The hedge removes the contrast the sentence is built on."],
      ],
      why:
        "The sentence is drawing a contrast, so both halves have to be filled: not skill, but " +
        "something else. The original supplies only the first half twice over.",
      steps: [
        "Identify the two slots the construction requires: less X than Y.",
        "Fill the second slot with the thing that actually differed.",
      ],
      hint: "'Less … than' needs two different nouns.",
      trap: "The circular version sounds thoughtful because it hesitates.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "My mother, who woke at any noise at all, never once came out of that room to tell us to be quiet.",
      noChange: "The opening phrase describes the mother, but it reads as her never coming out because she was woken.",
      wrong: [
        [
          "Waking at any noise at all, my mother never once came out of that room to tell us to be quiet.",
          "The participle now says her waking is what kept her in the room, reversing the point.",
        ],
        [
          "Woken by any noise at all, that room was never once left by my mother to tell us to be quiet.",
          "The phrase now describes the room, which is not what any noise woke.",
        ],
      ],
      why:
        "Her light sleeping is a standing fact about her, not the cause of her silence. A relative " +
        "clause attaches it to her without claiming it explains what follows.",
      steps: [
        "Ask what relationship the opening phrase asserts. It asserts a cause.",
        "Rewrite it as a clause that describes her instead.",
      ],
      hint: "An opening participle claims to explain the main clause; check whether it should.",
      trap: "The sentence is grammatical enough to pass, and only its logic is wrong.",
    },
    {
      number: 8,
      subskill: "semicolons and colons",
      family: "colon-before-an-explanation",
      difficulty: "Hard",
      keep: false,
      key: "worse: she would come down at three",
      noChange: "A comma is too weak to introduce the explanation of what the alternative was.",
      wrong: [
        [
          "worse; she would come down at three",
          "A semicolon balances two equal clauses, but the second half here spells out the first.",
        ],
        [
          "worse, and she would come down at three",
          "'And' adds the clause instead of presenting it as the content of 'worse.'",
        ],
      ],
      why:
        "'The alternative was worse' is complete and promises to say how. A colon introduces what a " +
        "complete clause has set up.",
      steps: [
        "Confirm the words before the mark form a complete sentence. They do.",
        "Ask whether the second half explains the first or balances it. It explains.",
      ],
      hint: "The word 'worse' is the promise; the rest of the sentence is the payment.",
      trap: "Both halves are full clauses, which makes the semicolon look like the technical answer.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "imprecise-verb",
      difficulty: "Medium",
      keep: false,
      key: "cost her",
      noChange: "'Run her' is not idiomatic and blurs the sentence's central claim.",
      wrong: [
        ["taken out of her", "The phrasing is vaguer and turns a cost into an extraction."],
        ["meant for her", "'Meant' names a significance rather than a price paid."],
      ],
      why:
        "The essay's subject is what her hours took from her and what the children owed. 'Cost' is " +
        "the verb that names a price, which is what the whole paragraph has been building toward.",
      steps: [
        "Ask what the children understood at that moment: what she had paid.",
        "Use the verb that names a price.",
      ],
      hint: "The paragraph is an accounting; the verb should be one too.",
      trap: "The unusual phrasing reads as a deliberate turn rather than a wrong word.",
    },
    {
      number: 10,
      subskill: "transitions",
      family: "comparison-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "What is stranger,",
      noChange: "'Similarly' claims a likeness, but this paragraph reports something the essay finds odd.",
      wrong: [
        ["Consequently,", "Her silence about the hours was not caused by the family's quiet."],
        ["For instance,", "Her never complaining is not an example of the unenforced rule."],
      ],
      why:
        "Paragraph 3 describes what the children understood. Paragraph 4 turns to what they did not, " +
        "so the transition should mark that the essay is going somewhere less expected.",
      steps: [
        "Ask whether this paragraph parallels the last one or complicates it.",
        "Choose the transition that marks the complication.",
      ],
      hint: "The sentence begins 'what I did not understand,' which is a reversal.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the singular absence of complaint."],
        ["it", "'It' would point at the hours rather than at her silence about them."],
        ["this here", "The phrase is nonstandard and adds nothing the pronoun does not carry."],
      ],
      why:
        "The pronoun refers to the fact stated in the previous sentence — that she never complained. " +
        "'That' is the demonstrative for a whole preceding statement.",
      steps: [
        "Ask what the narrator took as evidence: her never complaining.",
        "Keep the pronoun that stands for that statement.",
      ],
      hint: "The antecedent here is a fact, not a noun.",
      trap: "'The hours' is the nearest noun phrase and would change the meaning entirely.",
    },
    {
      number: 12,
      subskill: "parallelism",
      family: "parallel-clause-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "never in my life letting a door close behind me on its own",
          "The participle breaks the pattern set by 'I still know' and 'I never will.'",
        ],
        [
          "a door has never in my life closed behind me on its own",
          "The clause switches subject from the narrator to the door.",
        ],
        [
          "never let a door close behind me on its own in my life",
          "Moving the phrase to the end leaves the emphasis on 'in my life' rather than on the habit.",
        ],
      ],
      why:
        "The sentence runs three clauses that all take the narrator as subject: what they are not, " +
        "what they still know, and what they have never done. The pattern is what makes the close land.",
      steps: [
        "Read the three clauses in the sentence and compare their subjects.",
        "Keep the version in which all three are the narrator acting.",
      ],
      hint: "Check the subject of each clause before checking anything else.",
      trap: "The participle version is smoother and quietly drops the narrator from the sentence.",
    },
    {
      number: 13,
      subskill: "consistency",
      family: "elliptical-verb-agreement",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["do", "The present tense breaks from the future the clause is completing."],
        ["would", "The conditional does not match 'have never … let,' which is a completed habit."],
        ["did", "The past tense contradicts a promise the sentence makes about the future."],
      ],
      why:
        "The clause completes 'I have never … let' with a statement about what the narrator will not " +
        "do. 'Will' is the auxiliary that carries the habit forward.",
      steps: [
        "Read the full sentence and note it moves from what has happened to what will not.",
        "Keep the auxiliary that makes that move.",
      ],
      hint: "The sentence ends by looking forward; the verb should too.",
      trap: "The preceding clause is perfect tense, which makes matching it feel like consistency.",
    },
    {
      number: 14,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “It sold for " +
        "somewhat less than my parents had hoped, in a slow spring market.” Should the writer make " +
        "this addition?",
      key: "No, because the closing is about what the narrator still carries, not about the sale.",
      wrong: [
        [
          "Yes, because it explains why the family decided to sell the house when they did.",
          "The essay never raises the question of why they sold, so nothing needs explaining.",
        ],
        [
          "Yes, because it grounds the ending in a specific and verifiable circumstance.",
          "Specificity does not help when the detail belongs to a subject the essay has dropped.",
        ],
        [
          "No, because the essay has already stated the year in which the house was sold.",
          "The year is not what makes the added sentence out of place here.",
        ],
      ],
      why:
        "The final paragraph exists to set a sold house against a habit that outlasted it. A note " +
        "about the sale price pulls the ending toward real estate.",
      steps: [
        "Read the sentence that follows the marker and name what the paragraph is doing.",
        "Test the addition against that, not against its accuracy.",
      ],
      hint: "The last sentence tells you what the paragraph is about.",
      trap: "The detail is true, concrete, and about the very thing the sentence before it names.",
    },
    {
      number: 15,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the essay's closing claim?",
      key: "I walked through it once during the showing and put my feet in the old places without deciding to.",
      wrong: [
        [
          "My brother had moved out of state some years before it went on the market.",
          "Where the brother went says nothing about what the narrator retained.",
        ],
        [
          "The new owners replaced the upstairs carpet within the first year.",
          "A change made by strangers does not bear on the narrator's own memory of the floor.",
        ],
        [
          "My mother retired from the hospital two years after the house was sold.",
          "Her retirement is a fact about her rather than about the habit the essay describes.",
        ],
      ],
      why:
        "The closing claims the narrator could still cross that hall. The support has to show the " +
        "habit surviving without conscious effort, which is the essay's whole point about the rule.",
      steps: [
        "Read the last sentence and name what it claims: an intact, unwilled ability.",
        "Keep the choice that demonstrates it rather than adding a fact about the family.",
      ],
      hint: "The claim is about the body remembering; the support must be too.",
      trap: "Every choice is a plausible true sentence about the same house and family.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a rule that worked because it " +
        "was never enforced. Would this essay accomplish that goal?",
      key: "Yes, because the mother never once came out to demand quiet, and the children policed themselves against what her exhaustion would cost.",
      wrong: [
        [
          "Yes, because the narrator learned which floorboard in the upstairs hall would creak.",
          "The floorboard is how the rule was kept, not why it held without enforcement.",
        ],
        [
          "No, because the narrator's brother never learned to cross the hall quietly.",
          "The brother's failure shows the rule depended on minding, which is the essay's point.",
        ],
        [
          "No, because the essay states that the household rule was set by the mother's schedule.",
          "A rule can originate in a schedule and still be sustained without being imposed.",
        ],
      ],
      why:
        "The essay says outright that the rule was not enforced and that she never came out of the " +
        "room. What held it was the children's own accounting of what breaking it cost her.",
      steps: [
        "Find the sentence that says the rule was not enforced.",
        "Keep the reason that explains what held it in place instead.",
      ],
      hint: "The third paragraph answers the question directly.",
      trap: "One wrong choice cites a real detail from the essay and mistakes method for motive.",
    },
  ],
};
