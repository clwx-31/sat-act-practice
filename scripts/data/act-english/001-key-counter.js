"use strict";

module.exports = {
  id: "act-english-p001",
  type: "personal-essay",
  title: "The Key Counter",
  content: `[1] The hardware store on Vliet Street hired me the summer I turned
{1 sixteen, and put me} at the key counter, a narrow station between the paint
mixer and the register. My training {2 lasted} eleven minutes. Ruth, who had
worked there since 1988, showed me how to clamp a blank, align the shoulders,
and let the cutting wheel do the work. Then she went back to the paint desk and
left me alone with a wall of four hundred blanks. {3}

[2] For the first week I was certain I would ruin something. A key is an
unforgiving object. {4 Cut it a few thousandths of an inch too deep, the pins
will not set,} and the customer comes back holding a key that turns halfway and
stops. I made three bad keys my first day, and Ruth remade {5 all three of them
over again} without a word.

[3] What I did not expect was how much of the job was listening. People do not
come to a key counter for keys. They come because a daughter is moving home, or
a tenant left without warning, or a locksmith quoted them ninety dollars. Ruth
and I {6 was} the only ones who heard any of it. {7} They explain all of this
while the wheel is running, over the noise, and by the end of the summer I could
tell from a {8 customers} first sentence whether they wanted a copy or {9 wanted
a witness}.

[4] Ruth's phrase for the difficult ones was {10 simple, cut it twice.} She
meant: take a second blank and do the job again, slowly, whether or not the
first one was fine. I thought this was superstition. {11 It} was not. It was a
way of making sure the counter never became a place where I hurried.

[5] {12 Consequently,} I have not cut a key in four years. But I still notice
when someone behind a counter is only {13 phoning it in}, and I know exactly
what that costs. What stayed with me was not {14 clamping the blank, how to
align the shoulders, or the wheel}. It was the eleven minutes Ruth spent, and
the four hundred blanks she left me alone with.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-with-compound-predicate",
      difficulty: "Easy",
      keep: false,
      key: "sixteen and put me",
      noChange: "A comma before 'and' would need a second subject after it, and there is none.",
      wrong: [
        ["sixteen; and put me", "A semicolon has to join two independent clauses, and 'and put me' is not one."],
        ["sixteen, and putting me", "The -ing form breaks the pairing with the past-tense verb 'hired'."],
      ],
      why:
        "'Hired me' and 'put me' share the subject 'The hardware store,' so they form a compound " +
        "predicate rather than two sentences. A compound predicate takes no comma before 'and.'",
      steps: [
        "Look for a subject after 'and.' There is none — the next word is the verb 'put.'",
        "With one subject running two verbs, drop the comma.",
      ],
      hint: "Ask whether the words after 'and' could stand alone as a sentence.",
      trap: "The sentence is long, and length tempts students to punctuate it like two clauses.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "tense-consistency",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["had lasted", "The past perfect implies an earlier past event that the sentence never supplies."],
        ["was lasting", "The past progressive suggests an unfinished action, but the training was a closed span."],
        ["lasts", "The present tense conflicts with the past-tense narration running through the paragraph."],
      ],
      why:
        "The paragraph is narrated in the simple past — 'hired,' 'showed,' 'went.' A finished " +
        "eleven-minute span belongs in the same tense.",
      steps: [
        "Find the tense of the verbs on either side: 'hired' before, 'showed' after.",
        "Keep the underlined verb in that same simple past.",
      ],
      hint: "Match the verb to the tense the rest of the paragraph is already using.",
      trap: "Past perfect looks more formal, so it reads as the 'better writing' answer when it is not.",
    },
    {
      number: 3,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: " +
        "“The store also carried bird feeders, lawn fertilizer, and a rack of work gloves " +
        "near the door.” Should the writer make this addition?",
      key: "No, because the store's inventory is not what the paragraph is establishing.",
      wrong: [
        [
          "Yes, because it gives the reader a fuller picture of where the narrator worked.",
          "A detail can be true and still fail, because the paragraph is not about the store's stock.",
        ],
        [
          "Yes, because it explains why the narrator was left alone at the counter.",
          "Nothing links the merchandise on the shelves to Ruth's return to the paint desk.",
        ],
        [
          "No, because the essay states elsewhere that the store sold only hardware.",
          "The essay never makes that claim, so the reason misdescribes the passage.",
        ],
      ],
      why:
        "Paragraph 1 builds one idea: a brief training and a large, intimidating wall of blanks. " +
        "A list of unrelated merchandise interrupts that build without advancing it.",
      steps: [
        "State the paragraph's job in one phrase: how little preparation the narrator got.",
        "Test the sentence against that job. Bird feeders do not serve it, so it does not belong.",
      ],
      hint: "Ask what the paragraph is for, not whether the sentence is true.",
      trap: "The sentence is accurate and concrete, which makes deleting it feel like losing detail.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "Cut it a few thousandths of an inch too deep and the pins will not set,",
      noChange: "Two complete clauses are joined by nothing but a comma, which is a splice.",
      wrong: [
        [
          "Cutting it a few thousandths of an inch too deep, the pins will not set,",
          "The opening phrase dangles, since the pins are not what does the cutting.",
        ],
        [
          "Cut it a few thousandths of an inch too deep, the pins do not set,",
          "Changing the verb's tense leaves the comma splice exactly where it was.",
        ],
      ],
      why:
        "'Cut it too deep' and 'the pins will not set' are both complete clauses. A comma alone " +
        "cannot join them; the coordinating conjunction 'and' can.",
      steps: [
        "Split at the comma and test each side as its own sentence. Both stand alone.",
        "Join them with a conjunction rather than leaving the comma to do the work.",
      ],
      hint: "Cover the comma and read each half aloud as a separate sentence.",
      trap: "The imperative opening does not look like a clause, so the splice hides.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "redundancy",
      difficulty: "Easy",
      keep: false,
      key: "all three",
      noChange: "'Over again' repeats the idea that the prefix in 'remade' already carries.",
      wrong: [
        ["all three of the bad keys over again", "Naming the keys again adds words the sentence has already supplied."],
        ["every one of them a second time", "'Remade' contains the second time, so stating it repeats the verb."],
      ],
      why:
        "'Remade' already means made again. Any phrase that restates the repetition is redundant, " +
        "and 'of them' adds nothing that 'all three' has not said.",
      steps: [
        "Read the verb and the underlined phrase together: 'remade … over again.'",
        "Cut every word whose meaning the verb already contains.",
      ],
      hint: "Look at what the verb already tells you before you read its object.",
      trap: "The longest choice sounds the most emphatic, and emphasis reads as correctness.",
    },
    {
      number: 6,
      subskill: "subject-verb agreement",
      family: "compound-subject-agreement",
      difficulty: "Easy",
      keep: false,
      key: "were",
      noChange: "A compound subject joined by 'and' takes a plural verb, not a singular one.",
      wrong: [
        ["is", "The present tense disagrees with the past-tense narration as well as with the subject."],
        ["has been", "The singular present perfect misses both the number and the time frame."],
      ],
      why: "'Ruth and I' is two people joined by 'and,' so the verb must be plural: 'were.'",
      steps: [
        "Identify the subject: 'Ruth and I.'",
        "Two nouns joined by 'and' are plural, so choose the plural verb.",
      ],
      hint: "Count the people in the subject before you look at the verb.",
      trap: "The singular 'I' sits right beside the verb and pulls the ear toward a singular form.",
    },
    {
      number: 7,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the paragraph's point that customers arrive at the counter with more than a lock problem?",
      key: "One man set a key on the counter and told me, before I could ask, that it had been his mother's.",
      wrong: [
        [
          "Most of the blanks on the wall fit one of six common residential locks.",
          "A fact about inventory says nothing about what customers bring with them.",
        ],
        [
          "The store charged a dollar sixty for a copy, less than half the locksmith's rate.",
          "Price supports the earlier clause about the quote rather than the paragraph's point.",
        ],
        [
          "Ruth could identify a blank from across the room by the shape of its bow.",
          "Ruth's expertise is a different subject from what customers say at the counter.",
        ],
      ],
      why:
        "The paragraph claims people come to the counter carrying something besides a lock. Only " +
        "the man who volunteers whose key it was shows a customer offering more than the job requires.",
      steps: [
        "Name the claim the added sentence has to serve: customers bring more than a key.",
        "Discard every choice that is about the store, the price, or Ruth rather than a customer.",
      ],
      hint: "Three choices are about the business; one is about a person.",
      trap: "Each wrong choice echoes a real phrase from the paragraph, so it feels connected.",
    },
    {
      number: 8,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: false,
      key: "customer's",
      noChange: "The bare plural has no apostrophe, so the possessive relationship disappears.",
      wrong: [
        ["customers'", "The plural possessive points to many customers when only one is speaking."],
        ["customers's", "This form is standard for neither the singular nor the plural possessive."],
      ],
      why:
        "The first sentence belongs to one customer, so the noun needs the singular possessive: " +
        "apostrophe before the s.",
      steps: [
        "Ask whose first sentence it is. One customer's.",
        "Form the singular possessive by adding apostrophe-s.",
      ],
      hint: "Decide how many owners there are before you place the apostrophe.",
      trap: "The plural and the possessive sound identical, so the ear cannot settle it.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "precise-word-choice",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["wanted something else", "The vague phrase drops the specific contrast the sentence is building."],
        ["wanted to be heard by somebody", "The wordier version blunts the parallel with 'wanted a copy.'"],
        ["needed a certain kind of attention", "The abstraction is less exact than the single noun it replaces."],
      ],
      why:
        "'A witness' names exactly what the paragraph has been describing — someone to hear the " +
        "story — and it balances 'a copy' as a second short noun phrase.",
      steps: [
        "Read the two halves together: 'wanted a copy or ______.'",
        "Keep the phrasing that names the thing precisely and matches the first half's shape.",
      ],
      hint: "The better choice is the one that stays as short and as specific as 'a copy.'",
      trap: "The longer choices sound more thoughtful, but each one is vaguer than the original.",
    },
    {
      number: 10,
      subskill: "semicolons and colons",
      family: "colon-before-explanation",
      difficulty: "Hard",
      keep: false,
      key: "simple: cut it twice.",
      noChange: "A comma is too weak to introduce the phrase that explains what the rule was.",
      wrong: [
        [
          "simple; cut it twice.",
          "A semicolon balances two equal clauses, but the second half here explains the first.",
        ],
        [
          "simple, which was cut it twice.",
          "The relative clause collides grammatically with the imperative that follows it.",
        ],
      ],
      why:
        "The first half is a complete clause that promises an explanation, and the second half " +
        "delivers it. A colon is the mark that introduces what a complete clause has set up.",
      steps: [
        "Check that the words before the mark form a complete sentence. They do.",
        "Ask whether the second half explains the first or balances it. It explains, so use a colon.",
      ],
      hint: "Decide whether the second half answers the first half or merely sits beside it.",
      trap: "Two complete clauses make the semicolon look right, and the explaining relationship is easy to miss.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "pronoun-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["They", "The plural pronoun has no plural antecedent anywhere in the preceding sentence."],
        ["This here", "The phrase is nonstandard and adds nothing the pronoun does not already carry."],
        ["Which", "A relative pronoun cannot open a sentence as its own subject."],
      ],
      why:
        "The antecedent is 'superstition,' a singular noun in the sentence just before. 'It' agrees " +
        "with that antecedent and refers to it without ambiguity.",
      steps: [
        "Find the noun the pronoun replaces: 'superstition,' singular.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "Name the exact noun the pronoun stands for, then check its number.",
      trap: "The short sentence looks too plain to be correct, which invites an unnecessary change.",
    },
    {
      number: 12,
      subskill: "transitions",
      family: "causal-transition",
      difficulty: "Medium",
      keep: false,
      key: "Now,",
      noChange: "Nothing in the previous paragraph causes the narrator to stop cutting keys.",
      wrong: [
        ["Similarly,", "The paragraph turns to the present rather than drawing a comparison."],
        ["For example,", "What follows is not an instance of anything the previous paragraph claimed."],
      ],
      why:
        "The essay shifts from the summer to the present day. The transition has to mark that jump " +
        "in time, and 'Consequently' asserts a cause the passage never established.",
      steps: [
        "Compare the two paragraphs: one is that summer, the next is four years later.",
        "Choose the transition that marks a change in time rather than cause or comparison.",
      ],
      hint: "Work out what actually changes between the paragraphs before you read the choices.",
      trap: "'Consequently' sounds like the mature choice, so it survives a quick read.",
    },
    {
      number: 13,
      subskill: "style and tone",
      family: "register-shift",
      difficulty: "Medium",
      keep: false,
      key: "half listening",
      noChange: "The slang breaks the measured tone the rest of the essay maintains.",
      wrong: [
        ["totally checked out", "The casual phrasing clashes with the essay's restrained voice."],
        ["failing to render adequate service", "The bureaucratic phrasing is as far from the essay's voice as the slang is."],
      ],
      why:
        "The essay's voice is plain and controlled — 'without a word,' 'I thought this was " +
        "superstition.' A neutral phrase belongs; both slang and jargon pull away from it.",
      steps: [
        "Characterize the essay's voice from a sentence you have already read.",
        "Keep the choice that could sit in that voice without calling attention to itself.",
      ],
      hint: "The right answer here is the one you would not notice.",
      trap: "Two of the choices are wrong in opposite directions, so rejecting slang is not enough.",
    },
    {
      number: 14,
      subskill: "parallelism",
      family: "parallel-series",
      difficulty: "Hard",
      keep: false,
      key: "clamping the blank, aligning the shoulders, or running the wheel",
      noChange: "The three items in the series take three different grammatical forms.",
      wrong: [
        [
          "to clamp the blank, aligning the shoulders, or the wheel",
          "Two of the three items still fail to match the form of the first.",
        ],
        [
          "the clamp, how to align the shoulders, or running the wheel",
          "A noun, a clause, and a gerund cannot sit together in one parallel series.",
        ],
      ],
      why:
        "A series joined by 'or' needs all its items in one grammatical form. Three -ing phrases " +
        "match, and they also echo the training sentence in paragraph 1.",
      steps: [
        "List the three items separately and note the form of each.",
        "Rewrite so that all three open with the same kind of word.",
      ],
      hint: "Read the sentence stem into each item in turn and listen for the one that breaks.",
      trap: "The series sounds fluent aloud, because varied forms disguise themselves as variety.",
    },
    {
      number: 15,
      subskill: "organization",
      family: "paragraph-placement",
      difficulty: "Hard",
      stem: "For the sake of the logic and coherence of this essay, Paragraph 3 should be placed:",
      key: "where it is now.",
      wrong: [
        [
          "before Paragraph 1.",
          "The paragraph depends on the counter and on Ruth, and both are introduced later.",
        ],
        [
          "before Paragraph 2.",
          "Moving it ahead of the ruined keys breaks the order in which the summer unfolded.",
        ],
        [
          "after Paragraph 5.",
          "Placing it after the closing strands the essay's reflection ahead of its evidence.",
        ],
      ],
      why:
        "The essay runs in time: training, early mistakes, what the narrator noticed later, Ruth's " +
        "rule, the present. Paragraph 3 is the turn from the machine to the people, and it has to " +
        "follow the mistakes and precede the rule that answers them.",
      steps: [
        "Track what each paragraph does, in order, in a few words each.",
        "Test whether Paragraph 3 depends on anything that comes after it. It does not, so it stays.",
      ],
      hint: "'Where it is now' is a real answer; check the sequence before assuming a move is needed.",
      trap: "A placement question implies something is misplaced, which pressures a change.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Medium",
      stem:
        "Suppose the writer's goal had been to write a brief essay about a job that taught a " +
        "technical skill the writer still uses. Would this essay accomplish that goal?",
      key: "No, because it treats the technical skill as the part of the job that mattered least.",
      wrong: [
        [
          "Yes, because it describes in detail how a key blank is clamped and cut.",
          "The procedure appears once and never returns as the essay's subject.",
        ],
        [
          "Yes, because the narrator explains why three keys were cut incorrectly.",
          "The ruined keys illustrate early uncertainty, not a skill the narrator retained.",
        ],
        [
          "No, because the essay never identifies what job the narrator held.",
          "The job is named in the first sentence, so the reason misreads the essay.",
        ],
      ],
      why:
        "The closing says outright that what stayed was not the clamping or the wheel. The essay is " +
        "about attention, and it ends by setting the technical skill aside.",
      steps: [
        "Answer yes or no first, from the essay's actual subject.",
        "Then keep only the reason that describes what the essay really does.",
      ],
      hint: "Settle yes or no before reading the reasons, so a good reason cannot pull you across.",
      trap: "Both 'No' reasons reach the right verdict, so the verdict alone does not decide it.",
    },
  ],
};
