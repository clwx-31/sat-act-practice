"use strict";

module.exports = {
  id: "act-english-p037",
  type: "personal-essay",
  title: "The Corral",
  content: `[1] For two summers I collected shopping carts in a grocery lot in
{1 Wauwatosa and the} job taught me more about people than any class I
{2 took} that year. It is not a flattering thing to have learned.

[2] {3 Similarly,} a cart left in a parking space is a decision. Somebody
weighed a walk against the effort of not walking and chose. The lot {4 held}
about four hundred spaces and had six corrals, and by the end of my first month
I could have drawn a map of where carts were abandoned without looking at the
lot at all.

[3] The map was not random. It was a set of rings around each {5 corral, carts
were abandoned almost nowhere within thirty feet of one}. Between thirty and
sixty feet the abandonments began. Past a hundred feet from any corral, people
left carts wherever they had finished with {6 them and simply walked off and
away}. {7 Measured out across the asphalt, I could see the whole thing was a
question of distance.}

[4] {8 Consequently,} the store's response was to hire more of us. What would
have worked was two more corrals. I said so once, to a manager, in the tone of a
seventeen-year-old who has {9 figured something out}, and he said the corrals
cost money and I did not, and both of {10 us} were right.

[5] {11} I do not think worse of people for any of it. A person pushing a cart
a hundred feet in July heat is spending something real, and the store had
decided not to spend anything to prevent it.

[6] I still park near a corral. I have never once thought about it as a moral
{12 choice, it is simply where the walk is shortest}.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "Wauwatosa, and the",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["Wauwatosa; and the", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["Wauwatosa, and, the", "The second comma separates the conjunction from the subject that follows."],
      ],
      why:
        "'For two summers I collected shopping carts in a grocery lot in Wauwatosa' and 'the job " +
        "taught me more about people than any class' are both complete clauses.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "A comma goes before 'and' when a full sentence follows it.",
      trap: "The opening phrase already sets a rhythm that makes another pause feel excessive.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["take", "The present tense contradicts two summers the essay places in the past."],
        ["had taken", "The past perfect places the classes before an earlier past that is never named."],
        ["was taking", "The progressive suggests one class in progress rather than a year's worth."],
      ],
      why:
        "The essay narrates two finished summers in the simple past, and the main verb of the " +
        "sentence, 'taught,' is in that tense.",
      steps: [
        "Check the tense of the main clause: 'the job taught me.'",
        "Match the comparison clause to it.",
      ],
      hint: "The verb in the first half of the sentence sets the tense.",
      trap: "'Had taken' sounds more careful about sequence than the sentence needs.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "comparison-versus-opening-transition",
      difficulty: "Medium",
      keep: false,
      key: "To begin with,",
      noChange: "'Similarly' claims a likeness to the first paragraph, which described the job.",
      wrong: [
        ["Consequently,", "A cart being a decision does not follow from the job having taught the narrator."],
        ["Nevertheless,", "Nothing in the first paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 1 promises something learned. This paragraph states the first premise of it, so " +
        "the transition should mark the start of an explanation.",
      steps: [
        "Ask what this paragraph does: it lays the first piece of the argument.",
        "Choose the transition that marks a beginning.",
      ],
      hint: "The paragraph supplies a foundational claim the rest of the essay builds on.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "simple-singular-subject",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["hold", "The plural verb does not agree with the singular subject 'The lot.'"],
        ["holds", "The singular present tense is right in number and wrong in time frame."],
        ["have held", "The plural present perfect misses both the number and the time frame."],
      ],
      why: "'The lot' is one thing, and the paragraph narrates in the past, so the verb is 'held.'",
      steps: [
        "Identify the subject: 'The lot.'",
        "Choose the singular past-tense verb.",
      ],
      hint: "Nothing separates this subject from its verb; read them straight through.",
      trap: "'Four hundred spaces' follows immediately and pulls the ear toward a plural.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "corral. Carts were abandoned almost nowhere within thirty feet of one",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "corral, and carts were abandoned almost nowhere within thirty feet of one",
          "'And' repairs the splice but makes the first measurement read as an afterthought.",
        ],
        [
          "corral, carts being abandoned almost nowhere within thirty feet of one",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The sentence introduces a pattern and then begins reporting it. Splitting them lets the " +
        "first distance start a series the next two sentences continue.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Separate them so the measurements read as a sequence.",
      ],
      hint: "The two sentences after this one are built the same way; match them.",
      trap: "'And' fixes the grammar and buries the first band of the pattern.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "them and walked off",
      noChange: "'Simply,' 'off' and 'away' pile three ways of saying one departure.",
      wrong: [
        ["them and simply walked away", "'Simply' adds emphasis rather than information."],
        ["them, walking off and away", "Both directional words remain and the participle drops the subject."],
      ],
      why:
        "The point of the sentence is the distance, not the manner of leaving. One verb and one " +
        "particle carry it.",
      steps: [
        "Notice the three words all describe the same act of leaving.",
        "Keep the shortest version that still says it.",
      ],
      hint: "The measurement earlier in the sentence is doing the work.",
      trap: "The piled-up wording sounds dismissive, which suits the narrator's tone.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Measured out across the asphalt, the whole thing turned out to be a question of distance.",
      noChange: "The opening phrase describes the pattern, but the noun after the comma is 'I.'",
      wrong: [
        [
          "Measuring out across the asphalt, the whole thing was a question of distance.",
          "The active form makes the pattern do the measuring.",
        ],
        [
          "Measured out across the asphalt, it was clear to me the whole thing was a question of distance.",
          "The phrase now attaches to the empty subject 'it,' which nothing measured.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The pattern was measured out; the narrator did the measuring.",
      steps: [
        "Ask what was measured out across the asphalt. The pattern was.",
        "Rewrite so the thing measured follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The narrator really did the measuring, which makes the original read as accurate.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "consequence-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "Even so,",
      noChange: "'Consequently' says the hiring followed from the pattern, but it ignored the pattern.",
      wrong: [
        ["Similarly,", "Hiring more staff is not like the distance pattern described before it."],
        ["For instance,", "The response is not an example of the pattern but a failure to use it."],
      ],
      why:
        "Paragraph 3 identifies distance as the cause. Paragraph 4 reports a response that treated " +
        "the symptom, so the transition should mark the gap between the two.",
      steps: [
        "Ask whether the store's response followed from the finding or disregarded it.",
        "Choose the transition that marks the disconnect.",
      ],
      hint: "The next sentence says what would have worked instead.",
      trap: "'Consequently' sounds like the essay is drawing a conclusion, which is the opposite.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-phrase",
      difficulty: "Medium",
      keep: false,
      key: "solved a problem nobody asked him to solve",
      noChange: "'Figured something out' names nothing and drops the self-deprecation the sentence needs.",
      wrong: [
        ["worked it all out", "The phrase is just as unspecific and loses the narrator's tone."],
        ["arrived at a useful realisation", "The formal wording sits oddly in a sentence mocking the speaker."],
      ],
      why:
        "The clause is describing the narrator at seventeen, and the joke is on the narrator. Naming " +
        "the presumption exactly is what makes the manager's reply land.",
      steps: [
        "Ask what the sentence is doing to its own narrator.",
        "Choose the phrasing that carries that self-mockery.",
      ],
      hint: "The manager's answer is a rebuke; the setup should earn it.",
      trap: "'Figured something out' is idiomatic and sounds like the narrator's natural voice.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-case-in-a-compound",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["we", "The subject pronoun cannot follow the preposition 'of.'"],
        ["ourselves", "A reflexive needs a matching subject earlier in the same clause."],
        ["our", "The possessive cannot serve as the object of a preposition."],
      ],
      why:
        "'Both of' takes an object, so the pronoun is in the object case.",
      steps: [
        "Find the preposition governing the pronoun: 'of.'",
        "Use the object form.",
      ],
      hint: "Read 'both of ___ were right' and test each form in the blank.",
      trap: "The clause ends with 'were right,' which makes a subject pronoun feel natural.",
    },
    {
      number: 11,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the " +
        "paragraph's refusal to blame the customers?",
      key: "The nearest corral to the far row was a hundred and forty feet away, which I know because I paced it.",
      wrong: [
        [
          "Most customers who left carts did so without appearing to think about it at all.",
          "Thoughtlessness is a charge rather than a defence, and the paragraph is defending them.",
        ],
        [
          "The store's carts were older models and heavier than the ones sold today.",
          "Cart weight is a fact about equipment rather than about the walk being asked for.",
        ],
        [
          "I was paid slightly above minimum wage for the work of collecting them.",
          "The narrator's pay is about the job rather than about the customers' choice.",
        ],
      ],
      why:
        "The paragraph argues the walk was a real cost. A measured distance the narrator took the " +
        "trouble to pace makes that concrete and makes the refusal to blame credible.",
      steps: [
        "Name what the paragraph is defending: that pushing a cart that far costs something.",
        "Keep the choice that establishes how far.",
      ],
      hint: "The paragraph's claim is about effort, so the support should measure it.",
      trap: "The thoughtlessness choice sounds like an observation and is an accusation.",
    },
    {
      number: 12,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "choice; it is simply where the walk is shortest",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "choice: it is simply where the walk is shortest",
          "A colon introduces an explanation, but the second clause denies the first rather than expanding it.",
        ],
        [
          "choice and it is simply where the walk is shortest",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The sentence sets a moral reading against a practical one. Both clauses are complete, and a " +
        "semicolon holds them against each other without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or refuses it. It refuses.",
      ],
      hint: "The essay's last clause is a correction, not an elaboration.",
      trap: "The second clause reads as a reason, which points the eye toward a colon.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a problem that looked like a " +
        "failure of character and was a failure of layout. Would this essay accomplish that goal?",
      key: "Yes, because the abandonments fell into rings measured in feet from the nearest corral.",
      wrong: [
        [
          "Yes, because the store hired more staff instead of building additional corrals.",
          "That is the store's error, which follows from the finding rather than establishing it.",
        ],
        [
          "No, because the narrator admits the job taught them something unflattering about people.",
          "The essay then spends four paragraphs converting that impression into a measurement.",
        ],
        [
          "No, because the narrator still chooses to park near a corral out of habit.",
          "The closing says that choice is about distance, which is the essay's whole point.",
        ],
      ],
      why:
        "The pattern is geometric: almost nothing abandoned within thirty feet, a rising band between " +
        "thirty and sixty, and past a hundred feet carts left wherever they stopped.",
      steps: [
        "Name what the essay measures and what it measures it against.",
        "Keep the reason that rests on the distances rather than on anyone's conduct.",
      ],
      hint: "The third paragraph is entirely in feet.",
      trap: "One wrong choice quotes the essay's opening admission and ignores what follows it.",
    },
  ],
};
