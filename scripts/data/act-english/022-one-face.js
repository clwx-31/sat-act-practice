"use strict";

module.exports = {
  id: "act-english-p022",
  type: "informative-essay",
  title: "Once Every Orbit",
  content: `[1] The Moon keeps one face turned toward the Earth. It is often said
that this means the Moon does not {1 rotate and the} opposite is true: it
rotates exactly once for every orbit it completes, which {2 are} the only
arrangement that keeps the same side pointed at us.

[2] {3} The Earth's gravity {4 pulls} harder on the near side of the Moon than
on the far side. That difference stretches the Moon slightly along the line
between the two {5 bodies, raising a bulge on each end of it on both sides}.
Rock is not perfectly {6 rigid, the bulge takes time} to form and time to
relax.

[3] Early in its history the Moon spun faster than it orbited, so its bulge was
carried a little ahead of the line joining the two bodies. {7 Dragged slightly
ahead by the rotation, the Earth's pull on that offset bulge acted as a brake.}
The braking lasted as long as the mismatch did. It ended when the spin and the
orbit matched, because at that point the bulge stopped moving relative to the
Earth and there was nothing left to drag against.

[4] {8 Consequently,} we do not see exactly half the Moon. Its orbit is
elliptical and {9 its} axis is tilted, so it appears to rock from side to side
and nod up and down across a {10 while}. This libration brings about fifty-nine
percent of the surface into view over {11 time, the rest of it went unseen} by
anyone until 1959.

[5] {12} The same process is at work on the Earth. Tides raised by the Moon are
{13 slowing our rotation, lengthening the day by about two milliseconds a
century, and pushing the Moon away by roughly four centimetres a year}.

[6] Given enough time the Earth would become locked to the Moon in turn. There
is not enough time. The Sun will interrupt first.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "rotate, and the",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["rotate; and the", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["rotate and, the", "The comma now separates the conjunction from the subject that follows it."],
      ],
      why:
        "'It is often said that this means the Moon does not rotate' and 'the opposite is true' are " +
        "both complete clauses, so the 'and' between them takes a comma.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "A comma goes before 'and' when a full sentence follows it.",
      trap: "The first clause is long, so by the time 'and' arrives the sentence feels mid-thought.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "relative-pronoun-agreement",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'orbits' rather than to the singular 'arrangement.'",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense explanation."],
        ["have been", "The plural present perfect misses the number and reports a finished span."],
      ],
      why:
        "'Which' refers to the arrangement just described — one rotation per orbit — and that is a " +
        "single arrangement, so the verb is singular.",
      steps: [
        "Ask what 'which' stands for. It stands for the whole arrangement, not the orbits.",
        "Match the verb to that singular noun.",
      ],
      hint: "Decide what the relative pronoun refers to before you look at the verb.",
      trap: "'Every orbit it completes' sits closest to the verb and reads as plural.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Nothing arranged that neatly happens by accident, and this one did not.",
      wrong: [
        [
          "The Moon is roughly a quarter of the Earth's diameter and has no atmosphere.",
          "The Moon's size and airlessness are never taken up again anywhere in the essay.",
        ],
        [
          "Astronomers have measured the Moon's rotation with considerable precision.",
          "How the rotation was measured is not what this paragraph goes on to explain.",
        ],
        [
          "There are several forces acting on the Earth-Moon system at any given moment.",
          "The vague plural promises a survey where the paragraph traces one mechanism.",
        ],
      ],
      why:
        "Paragraph 1 establishes a suspiciously exact match between spin and orbit. This paragraph " +
        "begins explaining how that match came about, so the opening should raise the question.",
      steps: [
        "Note what paragraph 1 leaves unexplained: why the two periods are identical.",
        "Choose the opening that turns that coincidence into the paragraph's subject.",
      ],
      hint: "The paragraph explains a cause, so its first sentence should point at the effect.",
      trap: "Every choice is true about the Moon, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["pulled", "The past tense would confine a continuing physical fact to some earlier time."],
        ["is pulling", "The progressive suggests a temporary condition rather than a permanent one."],
        ["has pulled", "The present perfect implies a span that began and might end."],
      ],
      why:
        "The sentence states something that is true at every moment. The simple present is the tense " +
        "for a standing physical fact, and the paragraph uses it throughout.",
      steps: [
        "Check the tense of the verbs nearby: 'stretches,' 'is,' 'takes.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A law of gravitation does not belong to any particular time.",
      trap: "The next paragraph is in the past tense, which makes the past feel available here.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "stacked-redundancy",
      difficulty: "Easy",
      keep: false,
      key: "bodies, raising a bulge on each end",
      noChange: "'Of it' and 'on both sides' each repeat what 'on each end' already says.",
      wrong: [
        ["bodies, raising a bulge on each end of it", "'Of it' restates a possessor the sentence has already named."],
        ["bodies, raising a bulge on both sides of it", "The phrasing is no shorter and still carries the extra pronoun."],
      ],
      why:
        "'On each end' already specifies two positions on the Moon named earlier in the sentence. " +
        "Both additions restate part of that.",
      steps: [
        "Strike each phrase that repeats information already in the sentence.",
        "Keep the shortest version that still locates the bulges.",
      ],
      hint: "Two separate redundancies are stacked here, not one.",
      trap: "The extra phrases read as clarification, which is how padding survives revision.",
    },
    {
      number: 6,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "rigid, so the bulge takes time",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "rigid, and the bulge takes time",
          "'And' repairs the splice but hides that the second clause follows from the first.",
        ],
        [
          "rigid; so the bulge takes time",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "The second clause is the consequence of the first: because rock flexes slowly, the bulge " +
        "lags. 'So' repairs the splice and states that relationship.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the conjunction that names the relationship rather than merely adding.",
      ],
      hint: "The lag is the whole point of the sentence; the conjunction should say so.",
      trap: "'And' is the reflex fix and flattens a cause into a list.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Dragged slightly ahead by the rotation, the bulge gave the Earth's pull something to brake against.",
      noChange: "The opening phrase describes the bulge, but the noun after the comma is 'the Earth's pull.'",
      wrong: [
        [
          "Dragging slightly ahead by the rotation, the Earth's pull on that offset bulge acted as a brake.",
          "The active form makes the pull do the dragging, which reverses the mechanism.",
        ],
        [
          "Dragged slightly ahead by the rotation, a brake was created by the Earth's pull on that bulge.",
          "The phrase now describes 'a brake,' which is not what the rotation dragged.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The bulge is what gets dragged ahead, so the bulge has to be that noun.",
      steps: [
        "Ask what is dragged ahead by the rotation. The bulge is.",
        "Rewrite so 'the bulge' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and check whether they match.",
      trap: "The sentence describes the braking correctly, so the mechanism sounds right.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "consequence-versus-concession-transition",
      difficulty: "Medium",
      keep: false,
      key: "Even so,",
      noChange: "'Consequently' says the partial view follows from the locking, but it qualifies it.",
      wrong: [
        ["Similarly,", "Seeing more than half the Moon is not like the braking described before it."],
        ["For example,", "Libration is not an instance of tidal locking but a departure from it."],
      ],
      why:
        "Paragraph 3 ends with the Moon locked. This paragraph concedes that the lock is not quite " +
        "perfect, so the transition marks a qualification rather than a result.",
      steps: [
        "Ask whether this paragraph follows from the last or complicates it.",
        "Choose the transition that concedes.",
      ],
      hint: "The sentence begins 'we do not,' which is the shape of an exception.",
      trap: "'Consequently' sounds rigorous and asserts the opposite of what the paragraph does.",
    },
    {
      number: 9,
      subskill: "pronouns",
      family: "possessive-pronoun-agreement",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["their", "The plural possessive does not agree with the singular noun 'the Moon.'"],
        ["it's", "'It's' means 'it is,' which cannot precede the noun 'axis.'"],
        ["the", "The article drops the possession the sentence needs to attribute the axis."],
      ],
      why:
        "The axis belongs to the Moon, a singular noun, so the singular possessive pronoun is " +
        "correct — and it takes no apostrophe.",
      steps: [
        "Ask whose axis is tilted: the Moon's.",
        "Use the singular possessive pronoun, with no apostrophe.",
      ],
      hint: "Try reading it as 'it is' — if that fails, the possessive is right.",
      trap: "The parallel 'Its orbit' earlier in the sentence makes the second instance easy to skim.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-time-word",
      difficulty: "Medium",
      keep: false,
      key: "month",
      noChange: "'A while' gives no period in a sentence describing a regular cycle.",
      wrong: [
        ["period of time", "The phrase names a duration without saying what it is."],
        ["fairly long stretch", "The wording is vaguer than the original and adds a judgement."],
      ],
      why:
        "Libration completes its cycle over one orbit, and the paragraph is describing a repeating " +
        "motion, so the sentence has to name the period.",
      steps: [
        "Ask over what interval the rocking and nodding repeat.",
        "Name that interval.",
      ],
      hint: "The Moon's orbit gives you the unit.",
      trap: "'A while' reads as deliberate vagueness rather than a missing number.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "time; the rest of it went unseen",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "time: the rest of it went unseen",
          "A colon introduces an explanation, but the second clause states the complementary fact.",
        ],
        [
          "time and the rest of it went unseen",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The two clauses are complete and paired — what libration reveals, and what stayed hidden. A " +
        "semicolon joins equals and keeps the pairing audible.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or completes it. It completes it.",
      ],
      hint: "Fifty-nine percent and the rest are two halves of one fact.",
      trap: "The second clause supplies the remainder, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best prepares the reader " +
        "for the claim that follows?",
      key: "Locking is not something that happened to the Moon alone; it is a process still running.",
      wrong: [
        [
          "The Moon's gravitational pull is roughly a sixth as strong as the Earth's at the surface.",
          "Comparative surface gravity has no bearing on whether the process is ongoing.",
        ],
        [
          "Ocean tides on Earth are the most familiar consequence of the Moon's gravity.",
          "Naming a familiar effect does not establish that the effect is still changing anything.",
        ],
        [
          "The Earth completes one rotation roughly every twenty-four hours at present.",
          "The current day length is what the next sentence changes, not what sets it up.",
        ],
      ],
      why:
        "The sentence that follows applies the same mechanism to the Earth. The setup has to say " +
        "that the mechanism did not stop when the Moon locked.",
      steps: [
        "Read the sentence after the blank and name what it assumes.",
        "Keep the choice that supplies that assumption.",
      ],
      hint: "The paragraph turns from a finished process to an unfinished one.",
      trap: "The tides choice mentions the right force and says nothing about time.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-participle-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "slowing our rotation, lengthening the day by about two milliseconds a century, and the Moon is pushed away by roughly four centimetres a year",
          "The third item becomes an independent clause with a different subject.",
        ],
        [
          "slowing our rotation, they lengthen the day by about two milliseconds a century, and pushing the Moon away by roughly four centimetres a year",
          "The middle item becomes a clause the two participles do not match.",
        ],
        [
          "to slow our rotation, lengthening the day by about two milliseconds a century, and pushing the Moon away by roughly four centimetres a year",
          "The first item takes an infinitive where the others take participles.",
        ],
      ],
      why:
        "Three participles share the subject 'Tides' and one auxiliary, 'are.' Each has to be able to " +
        "follow that auxiliary on its own for the series to hold.",
      steps: [
        "Read 'Tides raised by the Moon are' into each item in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three effects are physically different, which makes varying the grammar feel natural.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to explain an arrangement that looks like a coincidence " +
        "and is not. Would this essay accomplish that goal?",
      key: "Yes, because it shows the matched periods being produced by a braking process that could only stop once they matched.",
      wrong: [
        [
          "Yes, because it establishes that the Moon rotates once for every orbit it completes.",
          "That is the coincidence being explained, not the explanation of it.",
        ],
        [
          "No, because libration means the Moon's rotation and orbit are not perfectly matched.",
          "Libration is an apparent rocking caused by orbital shape and tilt, not a mismatch in period.",
        ],
        [
          "No, because the essay describes the Earth's tides as well as the Moon's rotation.",
          "The Earth is offered as the same process still running, which supports the goal.",
        ],
      ],
      why:
        "The braking depended on a mismatch between spin and orbit and necessarily stopped when the " +
        "mismatch vanished. The exact match is the only stable end point, not a lucky one.",
      steps: [
        "Name what would look like coincidence: the periods being identical.",
        "Keep the reason that explains why no other outcome was possible.",
      ],
      hint: "Ask what the braking process was still able to act on once the periods matched.",
      trap: "One wrong choice restates the coincidence and mistakes it for the account of it.",
    },
  ],
};
