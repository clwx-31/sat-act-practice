"use strict";

module.exports = {
  id: "act-english-p028",
  type: "process-narrative",
  title: "From the Top Down",
  content: `[1] A jacket is fitted from the top down. The shoulders come
{1 first and not} because they are the hardest part to alter but because they
are the only part that cannot {2 be altered} at all without rebuilding the
garment.

[2] {3} The shoulder seam should end where the arm begins. If it hangs past that
point the sleeve collapses into folds beneath it, and if it stops short the
whole jacket {4 pull} across the back. A tailor checks this before touching
anything else, because every other adjustment assumes the shoulders are already
right.

[3] After that the work is chalk. The customer stands {5 still, the tailor
pins}. A jacket is taken in at the centre back seam and at the side seams, and
{6 both of those two are ordinary and routine}. Letting a jacket out is a
different {7 matter, it depends on how much fabric the maker left} in the seam
allowance, and once that is gone there is {8 nothing doing}. {9 Left in the seam
allowance by the maker, a tailor can only let a jacket out as far as that fabric
goes.}

[4] {10 Similarly,} sleeves are shortened from the cuff, unless there are
working buttonholes, in which case {11 they} are shortened from the shoulder,
which costs three times as much. A tailor who does not check the cuff before
quoting {12 quoted} wrong.

[5] The jacket is {13 basted, tried on again, and only then sewn}. {14} Basting
is long loose stitching meant to be pulled out. It looks like wasted work and is
the opposite: it is the last point at which a mistake is still free. {15}

[6] Buy the shoulders. Everything below them is negotiable.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-correlative",
      difficulty: "Easy",
      keep: false,
      key: "first, and not",
      noChange: "The 'not … but' contrast that follows needs a comma to separate it from the main clause.",
      wrong: [
        ["first; and not", "A semicolon must join independent clauses, and 'not because …' is not one."],
        ["first and, not", "The comma now separates the conjunction from the phrase it introduces."],
      ],
      why:
        "'The shoulders come first' is complete, and what follows is a two-part explanation set " +
        "against itself. A comma marks where the statement ends and the explanation begins.",
      steps: [
        "Find where the main clause finishes: after 'first.'",
        "Place a single comma there.",
      ],
      hint: "A 'not … but' construction trailing a complete clause is set off from it.",
      trap: "The sentence runs long enough that by the time 'but' arrives the opening is forgotten.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "passive-infinitive",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["be altering", "The progressive form cannot follow 'cannot' in a passive construction."],
        ["have altered", "The active perfect reverses the meaning, making the part do the altering."],
        ["altered", "Dropping 'be' leaves the modal 'cannot' without a verb to govern."],
      ],
      why:
        "The shoulders receive the action rather than perform it, so the infinitive after 'cannot' " +
        "has to be passive: 'be altered.'",
      steps: [
        "Ask whether the part alters or is altered. It is altered.",
        "Keep the passive infinitive that follows the modal.",
      ],
      hint: "Decide who does the action before choosing the verb form.",
      trap: "The shorter option reads smoothly and quietly removes the auxiliary.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Knowing that, the first thing to look at is a seam most people never notice.",
      wrong: [
        [
          "Jackets have been constructed along broadly similar lines for over a century.",
          "The history of tailoring is never taken up again anywhere in the essay.",
        ],
        [
          "A good tailor will usually have served a long apprenticeship before working alone.",
          "The tailor's training is not what this paragraph goes on to describe.",
        ],
        [
          "There are a number of things worth checking when trying on a new jacket.",
          "The vague plural promises a list where the paragraph examines one seam.",
        ],
      ],
      why:
        "Paragraph 1 establishes that the shoulders cannot be altered. This paragraph explains what " +
        "to look for there, so the opening should carry that conclusion into a practical instruction.",
      steps: [
        "Note what paragraph 1 establishes: the shoulders are fixed.",
        "Choose the opening that turns that fact into what the reader should do.",
      ],
      hint: "The best opening makes the paragraph feel like a consequence of the last one.",
      trap: "Every choice is true about jackets, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "simple-singular-subject",
      difficulty: "Easy",
      keep: false,
      key: "pulls",
      noChange: "The singular subject 'the whole jacket' cannot take a plural verb.",
      wrong: [
        ["are pulling", "The verb is still plural and the progressive suits a moment rather than a rule."],
        ["have pulled", "The plural present perfect misses both the number and the conditional sense."],
      ],
      why: "'The whole jacket' is one thing, so the verb is singular.",
      steps: [
        "Identify the subject: 'the whole jacket.'",
        "Choose the singular verb.",
      ],
      hint: "Nothing separates this subject from its verb; read them straight through.",
      trap: "'Shoulders' and 'folds' are plural and nearby, which colours the ear.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "still while the tailor pins",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "still, and the tailor pins",
          "'And' repairs the splice but makes two simultaneous actions read as a sequence.",
        ],
        [
          "still, the tailor pinning",
          "The participle leaves the second clause without a main verb of its own.",
        ],
      ],
      why:
        "The two actions happen at the same time and the sentence is about that stillness. " +
        "Subordinating the second with 'while' says so; joining them with 'and' does not.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the conjunction that states the relationship, which here is simultaneity.",
      ],
      hint: "Ask whether the two halves happen one after the other or at once.",
      trap: "'And' fixes the punctuation and loses the only thing the sentence is saying.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "stacked-redundancy",
      difficulty: "Easy",
      keep: false,
      key: "both are ordinary",
      noChange: "'Of those two' repeats 'both,' and 'routine' repeats 'ordinary.'",
      wrong: [
        ["both of those are ordinary", "'Of those' still restates what 'both' has already established."],
        ["both are ordinary and routine", "The second adjective means the same as the first."],
      ],
      why:
        "'Both' already names the two seams, and 'ordinary' already says the work is unremarkable. " +
        "Two separate redundancies are stacked in one short clause.",
      steps: [
        "Strike the phrase that repeats 'both.'",
        "Strike the adjective that repeats 'ordinary.'",
      ],
      hint: "There are two things to cut here, not one.",
      trap: "Each redundancy is small on its own, which makes both easy to leave.",
    },
    {
      number: 7,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "matter; it depends on how much fabric the maker left",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "matter: it depends on how much fabric the maker left",
          "A colon introduces an explanation, but the sentence runs on to a third clause a colon cannot govern.",
        ],
        [
          "matter and it depends on how much fabric the maker left",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete, and the sentence continues into a third clause after them. A " +
        "semicolon separates the first two cleanly and leaves the sentence able to go on.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Note that the sentence continues past them, and choose the mark that allows it.",
      ],
      hint: "Look at what comes after the second clause before choosing the mark.",
      trap: "The second clause explains the first, which points the eye toward a colon.",
    },
    {
      number: 8,
      subskill: "precision",
      family: "vague-idiom",
      difficulty: "Easy",
      keep: false,
      key: "nothing to draw on",
      noChange: "'Nothing doing' is an idiom for refusal and says nothing about fabric.",
      wrong: [
        ["nothing much left", "The hedge weakens a claim the paragraph states absolutely."],
        ["not anything you can do", "The phrasing turns to address the reader and stays unspecific."],
      ],
      why:
        "The clause is about a physical supply running out. Naming what is exhausted keeps the " +
        "sentence about the seam allowance rather than about the tailor's willingness.",
      steps: [
        "Ask what has run out: the spare fabric.",
        "Use the phrase that says so.",
      ],
      hint: "The subject of the whole sentence is the fabric, not the tailor.",
      trap: "The idiom is fluent and sounds like a deliberate flourish.",
    },
    {
      number: 9,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Left in the seam allowance by the maker, the spare fabric is all a tailor has to draw on.",
      noChange: "The opening phrase describes the fabric, but the noun after the comma is 'a tailor.'",
      wrong: [
        [
          "Leaving it in the seam allowance, a tailor can only let a jacket out as far as that fabric goes.",
          "The active form makes the tailor the one who left the fabric, which the maker did.",
        ],
        [
          "Left in the seam allowance by the maker, letting a jacket out depends on how far that fabric goes.",
          "The phrase now describes 'letting,' which is not what was left in the allowance.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The maker left the fabric, so the fabric has to be that noun.",
      steps: [
        "Ask what was left in the seam allowance. The fabric was.",
        "Rewrite so 'the spare fabric' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence states a true limit on the tailor, so nothing sounds wrong.",
    },
    {
      number: 10,
      subskill: "transitions",
      family: "comparison-versus-topic-transition",
      difficulty: "Medium",
      keep: false,
      key: "As for sleeves,",
      noChange: "'Similarly' claims a likeness, but this paragraph turns to a different part of the jacket.",
      wrong: [
        ["Consequently,", "How sleeves are shortened is not caused by the seam allowance."],
        ["Even so,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 3 is about the body of the jacket. This one moves to the sleeves, so the " +
        "transition should announce the change of subject.",
      steps: [
        "Ask what changes between the paragraphs: the part being altered.",
        "Choose the transition that marks a new topic.",
      ],
      hint: "The paragraph is not comparing anything; it is moving on.",
      trap: "'Similarly' fits the essay's part-by-part structure while asserting nothing.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural noun 'sleeves.'"],
        ["these", "The demonstrative points outward rather than back to the sentence's subject."],
        ["the buttonholes", "Naming the buttonholes reverses the meaning, since the sleeves are shortened."],
      ],
      why:
        "The pronoun refers to 'sleeves,' the plural subject of the sentence, and the sentence is " +
        "still describing what happens to them.",
      steps: [
        "Find what gets shortened: the sleeves.",
        "Match the pronoun to that plural.",
      ],
      hint: "The subject of the sentence has not changed, however far away it now is.",
      trap: "'Buttonholes' is plural too and sits immediately before the pronoun.",
    },
    {
      number: 12,
      subskill: "consistency",
      family: "tense-consistency-in-a-rule",
      difficulty: "Medium",
      keep: false,
      key: "will quote",
      noChange: "The past tense reports one occasion instead of a rule that always holds.",
      wrong: [
        ["would quote", "The conditional softens a claim the paragraph makes flatly."],
        ["has quoted", "The present perfect points at past instances rather than a standing consequence."],
      ],
      why:
        "The sentence states a rule about what always follows from skipping the check, and the " +
        "future is what expresses that certainty in a process narrative.",
      steps: [
        "Ask whether the sentence describes one event or an invariable consequence.",
        "Keep the form that states the consequence.",
      ],
      hint: "The sentence is a warning, and warnings are about what will happen.",
      trap: "The paragraph's other verbs are present tense, which makes matching them feel right.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-participle-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "basted, tried on again, and then they sew it",
          "The third item becomes a clause with a new subject and an active verb.",
        ],
        [
          "basting, tried on again, and only then sewn",
          "The first item shifts to an -ing form the other two do not use.",
        ],
        [
          "basted, tries on again, and only then sewn",
          "The middle item becomes an active verb that no longer follows 'is.'",
        ],
      ],
      why:
        "Three past participles share the subject 'The jacket' and one auxiliary, 'is.' Each has to " +
        "be able to follow that auxiliary on its own.",
      steps: [
        "Read 'The jacket is' into each of the three items in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "'Only then' before the third item makes it feel like a new clause.",
    },
    {
      number: 14,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Basting " +
        "thread is usually a contrasting colour so that it can be found easily.” Should the writer " +
        "make this addition?",
      key: "Yes, because it shows the thread is designed to be removed, which is the paragraph's point.",
      wrong: [
        [
          "Yes, because it gives the reader a concrete detail about how tailors work.",
          "Concreteness alone does not earn a sentence a place in this paragraph.",
        ],
        [
          "No, because the colour of the thread has nothing to do with the fitting process.",
          "The colour exists precisely because the thread will be pulled out, which is the point.",
        ],
        [
          "No, because the paragraph is about the order of operations rather than materials.",
          "The paragraph is about basting being provisional, and the thread's colour demonstrates that.",
        ],
      ],
      why:
        "The paragraph argues that basting only looks like wasted work. A thread chosen so it can be " +
        "found and pulled out is evidence that the impermanence is deliberate.",
      steps: [
        "Name what the paragraph is arguing: basting is provisional by design.",
        "Test whether the sentence supports that. The contrasting colour does.",
      ],
      hint: "Not every add-a-sentence question is answered 'no.'",
      trap: "The detail looks like decoration, and two of the wrong reasons are plausible readings.",
    },
    {
      number: 15,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best prepares the reader " +
        "for the essay's closing advice?",
      key: "A tailor can rescue almost any jacket that fits the shoulders, and almost none that does not.",
      wrong: [
        [
          "Alterations typically cost a fraction of what the jacket itself cost.",
          "The relative cost does not explain why one measurement outranks the others.",
        ],
        [
          "Many shops will include a first round of alterations in the purchase price.",
          "What is included in a sale says nothing about which fit cannot be changed.",
        ],
        [
          "Most jackets are sold in a limited range of standard sizes.",
          "The sizing system is context rather than a reason to prioritise the shoulders.",
        ],
      ],
      why:
        "The closing tells the reader to buy the shoulders. The sentence that earns it has to state " +
        "the asymmetry: everything else is fixable and this is not.",
      steps: [
        "Read the final paragraph and name the advice it gives.",
        "Keep the choice that makes that advice follow.",
      ],
      hint: "The support has to explain why one fit is different in kind from the rest.",
      trap: "The cost choices are practical and answer a question the essay is not asking.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a process organised entirely around what " +
        "cannot be undone. Would this essay accomplish that goal?",
      key: "Yes, because the order of work runs from the fixed shoulders through the adjustable seams to the basting that keeps mistakes free.",
      wrong: [
        [
          "Yes, because it explains that sleeves with working buttonholes cost three times as much.",
          "The price difference is a consequence of the method, not a thing that cannot be undone.",
        ],
        [
          "No, because the essay describes several alterations that a tailor can make successfully.",
          "Those are the reversible steps, and the contrast with the shoulders is the essay's point.",
        ],
        [
          "No, because basting is presented as work that is later removed and therefore wasted.",
          "The essay says the opposite: basting is what keeps a mistake from becoming permanent.",
        ],
      ],
      why:
        "Every stage is ranked by reversibility — shoulders first because they are fixed, taking in " +
        "before letting out because the allowance runs out, and basting last because it is the final " +
        "point at which an error costs nothing.",
      steps: [
        "List the stages in order and mark which can be reversed.",
        "Keep the reason that describes the whole sequence rather than one step.",
      ],
      hint: "Ask why the essay puts the shoulders first and the basting last.",
      trap: "One wrong choice inverts the essay's explicit claim about basting.",
    },
  ],
};
