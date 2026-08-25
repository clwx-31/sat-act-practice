"use strict";

module.exports = {
  id: "act-english-p033",
  type: "personal-essay",
  title: "Not in Any of Them",
  content: `[1] I became the family photographer at twelve because I was the one
who asked for the {1 camera nobody} appointed me. It simply became true, the way
jobs in families {2 become} true, which is to say by nobody objecting.

[2] {3 Similarly,} I was good at it in the way a twelve-year-old is good at
things, which is to say relentlessly. Two hundred pictures of one birthday.
Forty of the same cousin blinking. I {4 photographed} the food, the wrapping
paper, the dog under the table, and the dog under the table {5 again, nobody
asked me to stop}.

[3] {6 Consequently, what} I did not understand was the arithmetic. Every
picture I took was a picture I was not in. Over eleven years that adds up to an
absence with a {7 shape and a definite outline}, and the shape is that of a
person standing three feet behind the camera. {8 Counted up one winter
afternoon, I found the albums held four photographs of me between the ages of
twelve and twenty-three.}

[4] In three of the four I am holding a camera. The fourth was taken by a
stranger at a {9 place}, and I remember the moment mostly as an interruption.
I was not {10 hiding, I had found a job} that let me be in the room without
being in it.

[5] My brother takes the pictures now. I have started asking him to hand me the
camera and step in. He finds {11 this} irritating. I find it necessary.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "camera. Nobody",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["camera, nobody", "Adding a comma turns the run-on into a comma splice."],
        ["camera nobody,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'I became the family photographer … asked for the camera' and 'Nobody appointed me' are both " +
        "complete sentences, and nothing joins them.",
      steps: [
        "Find where the first complete thought ends: after 'camera.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "Read to the end of the first idea and check whether a new subject follows.",
      trap: "The sentence is long enough that the join passes without a pause.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "simple-plural-subject",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["becomes", "The singular verb does not agree with the plural subject 'jobs.'"],
        ["became", "The past tense breaks the general present-tense claim the clause is making."],
        ["is becoming", "The progressive describes one moment rather than how such jobs generally arise."],
      ],
      why:
        "The subject is 'jobs in families,' which is plural, and the clause states something that is " +
        "generally true rather than something that happened once.",
      steps: [
        "Cross out 'in families' and read 'jobs … become.'",
        "Keep the plural present-tense verb.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'Families' is plural but is not the subject, and 'the way' before it reads as singular.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "comparison-versus-continuation-transition",
      difficulty: "Medium",
      keep: false,
      key: "For a while,",
      noChange: "'Similarly' claims a likeness to the first paragraph, which described how the job arose.",
      wrong: [
        ["Consequently,", "Being good at photography did not follow from nobody objecting to the role."],
        ["In contrast,", "The paragraph continues the account rather than opposing it."],
      ],
      why:
        "Paragraph 1 explains how the job began. This paragraph describes the years of doing it, so " +
        "the transition should mark a stretch of time rather than a resemblance.",
      steps: [
        "Ask what this paragraph adds: the period during which the job was held.",
        "Choose the transition that marks duration.",
      ],
      hint: "The essay is a story, so its transitions are mostly about when.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["photograph", "The present tense contradicts a period the essay places years ago."],
        ["had photographed", "The past perfect places the pictures before an earlier past never named."],
        ["was photographing", "The progressive suggests a single occasion rather than a habit of years."],
      ],
      why:
        "The paragraph narrates a finished stretch of years in the simple past, and the sentences " +
        "around it use that tense.",
      steps: [
        "Check the tense of the verbs nearby: 'was,' 'asked.'",
        "Keep the simple past that matches them.",
      ],
      hint: "Match the tense the story is already being told in.",
      trap: "The list that follows is vivid and present-feeling, which invites the present tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "again. Nobody asked me to stop",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "again, and nobody asked me to stop",
          "The conjunction repairs the splice but attaches the observation to the end of a long list.",
        ],
        [
          "again, nobody asking me to stop",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The sentence has already run a four-item list. Giving the second clause its own sentence " +
        "lets it land as the observation it is rather than as a fifth item.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Separate them so the second is not swallowed by the list.",
      ],
      hint: "Count how many items the first half already contains.",
      trap: "'And' is the reflex repair and buries the sentence's point.",
    },
    {
      number: 6,
      subskill: "transitions",
      family: "consequence-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "What",
      noChange: "'Consequently' claims the narrator's blind spot followed from the picture-taking.",
      wrong: [
        ["Similarly, what", "The paragraph reverses the previous one rather than matching it."],
        ["For instance, what", "The arithmetic is not an example of relentless photographing."],
      ],
      why:
        "Paragraph 2 is about doing the job well. Paragraph 3 turns to what that cost, and the turn " +
        "is sharper with no connective at all than with one that asserts a false relation.",
      steps: [
        "Ask what this paragraph does to the last one: it undercuts it.",
        "Choose the option that lets the reversal land without a misleading signpost.",
      ],
      hint: "Sometimes the right transition is none, and the sentence says the turn itself.",
      trap: "Every alternative supplies a connective, which makes deleting one feel like an omission.",
    },
    {
      number: 7,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "shape",
      noChange: "'A definite outline' repeats what 'shape' has already established.",
      wrong: [
        ["shape and an outline", "The second noun still names the same property as the first."],
        ["definite shape and outline", "Both nouns remain, and 'definite' adds emphasis rather than meaning."],
      ],
      why:
        "The next clause names the shape exactly. A synonym in front of that weakens it by making the " +
        "sentence say the same thing twice before saying it once precisely.",
      steps: [
        "Read the clause that follows and note that it defines the shape.",
        "Cut the synonym so the definition carries the weight.",
      ],
      hint: "The sentence is about to be specific; the noun before it should not hedge.",
      trap: "The pairing sounds emphatic, and the absence being described is the essay's point.",
    },
    {
      number: 8,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Counted up one winter afternoon, the photographs of me between the ages of twelve and twenty-three came to four.",
      noChange: "The opening phrase describes the photographs, but the noun after the comma is 'I.'",
      wrong: [
        [
          "Counting up one winter afternoon, the albums held four photographs of me between the ages of twelve and twenty-three.",
          "The active form makes the albums do the counting.",
        ],
        [
          "Counted up one winter afternoon, there were four photographs of me between the ages of twelve and twenty-three.",
          "The phrase attaches to the empty subject 'there,' which nothing can count.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The photographs were counted; the narrator did the counting.",
      steps: [
        "Ask what was counted up. The photographs were.",
        "Rewrite so 'the photographs' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The narrator really did the counting, which makes the original read as accurate.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Medium",
      keep: false,
      key: "rest stop in Nebraska",
      noChange: "'A place' names nothing in a sentence whose point is that the moment was incidental.",
      wrong: [
        ["a location", "The noun is more formal and just as empty as the original."],
        ["somewhere or other", "The phrase adds a shrug without adding any information."],
      ],
      why:
        "The essay is otherwise exact — two hundred pictures, forty of a cousin, four photographs, " +
        "three feet behind the camera. A vague noun here breaks a pattern the reader has come to rely on.",
      steps: [
        "Notice how specific the essay's other details are.",
        "Choose the option that matches that level of detail.",
      ],
      hint: "Every other number and place in this essay is exact.",
      trap: "Vagueness can read as a deliberate refusal to dwell, which suits the sentence's tone.",
    },
    {
      number: 10,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "hiding; I had found a job",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "hiding: I had found a job",
          "A colon introduces an explanation, but the second clause corrects the first rather than expanding it.",
        ],
        [
          "hiding and I had found a job",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The sentence denies one account and offers another. Both halves are complete, and a " +
        "semicolon holds the correction against the denial without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or replaces it. It replaces it.",
      ],
      hint: "The two clauses are rival explanations, not a statement and its reason.",
      trap: "The second clause does feel explanatory, which points the eye toward a colon.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the single request described before it."],
        ["these", "The demonstrative points outward rather than back to the sentence just given."],
        ["it all", "The phrase widens the reference beyond the one thing the brother objects to."],
      ],
      why:
        "The pronoun stands for the whole preceding statement — being asked to hand over the camera " +
        "and step in — and 'this' is the demonstrative for a complete preceding idea.",
      steps: [
        "Ask what the brother finds irritating: the request just described.",
        "Keep the pronoun that stands for that statement.",
      ],
      hint: "The antecedent here is a sentence, not a noun.",
      trap: "'Pictures' is plural and nearby, which pulls toward a plural pronoun.",
    },
    {
      number: 12,
      subskill: "organization",
      family: "paragraph-move",
      difficulty: "Medium",
      stem:
        "The writer is considering moving Paragraph 3 so that it appears immediately after " +
        "Paragraph 4. Should the writer make this change?",
      key: "No, because Paragraph 4 counts the photographs that Paragraph 3 has just predicted.",
      wrong: [
        [
          "No, because Paragraph 3 is the only paragraph that gives a span of years.",
          "Paragraph 4 gives ages and Paragraph 1 gives an age, so the claim is not accurate.",
        ],
        [
          "Yes, because the essay would then present the evidence before drawing its conclusion.",
          "Paragraph 4's four photographs mean nothing until the arithmetic has been stated.",
        ],
        [
          "Yes, because both paragraphs concern the narrator's absence from the albums.",
          "They approach it as claim and confirmation, and the order is what makes the second land.",
        ],
      ],
      why:
        "Paragraph 3 works out that every picture taken is a picture missed. Paragraph 4 opens the " +
        "albums and finds four. Reversing them turns a confirmation into a bare statistic.",
      steps: [
        "Say what each paragraph does: one reasons, the next verifies.",
        "Ask whether the verification means anything without the reasoning first.",
      ],
      hint: "Ask which paragraph makes the other one land.",
      trap: "Leading with evidence is a real editing principle applied to the wrong pair.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a role that solved one problem " +
        "by creating a smaller version of it. Would this essay accomplish that goal?",
      key: "Yes, because the camera let the narrator be present without being exposed, which is what left them out of the record.",
      wrong: [
        [
          "Yes, because the narrator took two hundred photographs of a single birthday.",
          "The volume shows how thoroughly the job was done, not what it solved or cost.",
        ],
        [
          "No, because the narrator says outright that they do not believe they were hiding.",
          "The denial is followed immediately by a description of what the job did instead.",
        ],
        [
          "No, because the essay ends with the narrator's brother taking the pictures instead.",
          "That ending is the narrator stepping out of the role, which completes the argument.",
        ],
      ],
      why:
        "The essay says the job let the narrator be in the room without being in the room — a relief " +
        "at twelve and a habit by twenty-three, and the reason four photographs exist instead of many.",
      steps: [
        "Find the sentence that says what the job did for the narrator.",
        "Keep the reason that names both what it gave and what it cost.",
      ],
      hint: "The fourth paragraph states the trade in one sentence.",
      trap: "One wrong choice quotes an explicit denial that the next clause immediately qualifies.",
    },
  ],
};
