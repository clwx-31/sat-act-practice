"use strict";

module.exports = {
  id: "act-reading-p002",
  type: "social-science",
  title: "The Invention of Being On Time",
  intro: "This passage is adapted from a history of timekeeping and transport.",
  content: `Before the railways, every town kept its own time, and no one thought this
strange. Noon was when the sun stood highest over that particular place, which meant
that a clock in a town forty miles east of another ran some three minutes ahead of it.
The discrepancy was real, but it was also invisible. A traveller on horseback covering
thirty miles in a day arrived to find the church clock a little out and adjusted his
pocket watch without comment, if he carried one at all.

What changed was not the accuracy of clocks. Clocks had been accurate enough for a
century. What changed was the speed at which a person could move between two of them.

A railway timetable is a promise about the future made in public. It says that a train
will be at a particular place at a particular moment, and it says so to thousands of
people at once, most of whom have no way of verifying the claim until they are standing
on the platform. For this promise to mean anything, the moment named has to be the same
moment for the company, the stationmaster, the signalman, and the passenger. Local time
made that impossible. A train leaving one city at ten and arriving at another at
eleven-fifty had, by the clocks at each end, taken an hour and forty-seven minutes, or
an hour and fifty-three, depending on which direction it was travelling.

The railway companies solved this before any government did, and they solved it in the
way companies usually solve things, which is by declaring the problem solved and
carrying on. British railways simply adopted the time kept at the Greenwich observatory
and printed it in their timetables, and instructed their staff to keep it. This was not
a legal act. For decades there was no statute requiring anyone to use railway time, and
a number of towns pointedly refused, keeping a second minute hand on the town clock so
that both times could be read at once. Photographs survive of clock faces with two
minute hands, one for the town and one for the trains, which is as clear a picture of
a society changing its mind as one could ask for.

The interesting question is not why the railways won. Of course they won. The
interesting question is what people thought they were losing, because the resistance
was neither ignorant nor merely sentimental. A town clock that showed local noon
described something true about that place: the relation of the town to the sun. A clock
showing Greenwich time described something true about a network the town belonged to.
Both statements are accurate. They are answers to different questions.

Historians of the period sometimes present the change as the replacement of a natural
measure by an artificial one, but this is not quite right either. Local noon is no more
natural than any other convention once it is being read off a mechanism. The town clock
did not track the sun; it tracked a pendulum, corrected occasionally against the sun by
somebody whose job that was. What the standardisation replaced was not nature but a
particular locality — the sense that the place one lived in was the centre from which
measurement began.

This is why the disputes were so often about who should have to change. Nobody in the
smaller towns argued that time zones were incoherent. They argued that the observatory
was in a specific place, and that place was not theirs, and that a measure calling
itself universal had a great deal in common with a measure belonging to somebody else.
That argument has not gone away. It is made now about other standards, and made in the
same terms, and it is usually lost for the same reason: the network is more useful than
the locality, and usefulness compounds.

By the end of the century the second minute hands had been quietly removed. The towns
that had kept them did not hold ceremonies. Someone climbed up, took off a hand, and
came down, and the clock afterwards said what every other clock said, and the people
who had argued about it were mostly dead or had stopped caring, which is how most
arguments of this kind conclude.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-argument",
      difficulty: "Medium",
      stem: "The main idea of the passage is that standardised time:",
      key: "displaced a local measure whose defenders had a coherent case.",
      wrong: [
        ["became necessary once mechanical clocks grew accurate enough.", "The passage says directly that clock accuracy was not what changed; travel speed was."],
        ["was imposed on unwilling towns by government legislation.", "The railways acted first and, the passage says, for decades no statute required railway time."],
        ["proved that natural measures are superior to artificial ones.", "The author argues the opposite, that local noon was itself read off a mechanism."],
      ],
      why: "The passage repeatedly grants the objectors their point — \"the resistance was neither ignorant nor merely sentimental,\" and both kinds of clock made statements that \"are accurate\" — while describing the change as inevitable.",
      steps: [
        "Separate what the author reports from what the author endorses.",
        "Notice how much space is given to the case against standardisation.",
      ],
      hint: "The author keeps conceding something to the losing side.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, some towns responded to railway time by:",
      key: "adding a second minute hand to the town clock.",
      wrong: [
        ["refusing to allow railway timetables to be posted.", "No such refusal appears; the resistance described is about clocks, not timetables."],
        ["petitioning Parliament for an exemption from the rule.", "The passage says there was no statute for decades, so no exemption was available."],
        ["moving the observatory reference point closer to them.", "The observatory's fixed location is presented as the objectors' grievance."],
      ],
      why: "The fourth paragraph says a number of towns refused, \"keeping a second minute hand on the town clock so that both times could be read at once.\"",
      steps: [
        "Find the paragraph describing towns that refused.",
        "Read the clause after the comma, which names what they did.",
      ],
      hint: "The passage mentions surviving photographs of the result.",
    },
    {
      subskill: "cause and effect",
      family: "cause-and-effect",
      difficulty: "Medium",
      stem: "The passage indicates that local time became a problem primarily because:",
      key: "people began moving between distant clocks quickly.",
      wrong: [
        ["clocks in different towns were built to different standards.", "The passage says clocks had been accurate enough for a century."],
        ["railway companies wanted a single national timetable.", "The single timetable is the response to the problem, not its cause."],
        ["the sun's position was measured incorrectly in some towns.", "The measurement is described as real and correct, only local."],
      ],
      why: "The second paragraph is a two-sentence pivot: \"What changed was not the accuracy of clocks... What changed was the speed at which a person could move between two of them.\"",
      steps: [
        "Locate the paragraph that states what did and did not change.",
        "Take the second sentence, which supplies the cause.",
      ],
      hint: "One short paragraph exists only to answer this.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Medium",
      stem: "As it is used near the end of the passage, *usefulness compounds* most nearly means that:",
      key: "each new user makes the standard more valuable to the rest.",
      wrong: [
        ["the benefits of a standard are difficult to measure directly.", "The passage treats the benefit as obvious, not hard to measure."],
        ["standards become harder to reverse the longer they are used.", "This is a consequence the passage implies but not what the phrase itself states."],
        ["arguments about standards grow more complicated over time.", "The passage says such arguments are usually lost, not that they grow complex."],
      ],
      why: "The phrase closes the sentence \"the network is more useful than the locality, and usefulness compounds.\" A network's value grows with the number of participants, which is what compounding names here.",
      steps: [
        "Read the whole sentence, which contrasts network with locality.",
        "Ask what property of a network would make its advantage grow.",
      ],
      hint: "The word *network* two clauses earlier controls the meaning.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Hard",
      stem: "The author's purpose in discussing what the town clock actually tracked is to:",
      key: "undercut the framing of the change as natural versus artificial.",
      wrong: [
        ["show that town clocks were less reliable than railway clocks.", "Reliability is not at issue; both are said to be read off mechanisms."],
        ["explain the technical means by which pendulums were corrected.", "The correction is mentioned in a clause, not developed as an explanation."],
        ["argue that the towns misunderstood their own timekeeping methods.", "The author credits the objectors with a coherent case, not a misunderstanding."],
      ],
      why: "The paragraph opens by naming the framing it means to reject — \"historians of the period sometimes present the change as the replacement of a natural measure by an artificial one\" — and then observes that the town clock \"did not track the sun; it tracked a pendulum.\"",
      steps: [
        "Find the claim the paragraph opens by attributing to others.",
        "Read the detail as evidence against that claim rather than as information.",
      ],
      hint: "The paragraph begins by saying someone else is not quite right.",
      trap: "Reading a detail offered as counter-evidence as though it were offered for its own sake.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Hard",
      stem: "The passage most strongly suggests that the objectors' argument failed because:",
      key: "the advantages of joining a network outweighed the objection.",
      wrong: [
        ["their reasoning about the observatory's location was mistaken.", "The passage calls the observatory point simply true: it was in a specific place that was not theirs."],
        ["public opinion turned against them once photographs circulated.", "The photographs are evidence for the historian, not a force acting on opinion."],
        ["the railway companies had legal authority they could not resist.", "The passage stresses that railway time was not a legal act for decades."],
      ],
      why: "The passage says such arguments are \"usually lost for the same reason: the network is more useful than the locality.\" It attributes the loss to utility, not to error or to authority.",
      steps: [
        "Find the sentence giving the reason such arguments are lost.",
        "Check the alternatives against what the passage says about law and about correctness.",
      ],
      hint: "The author states the reason outright and calls it general.",
    },
    {
      subskill: "comparison",
      family: "comparison-within-passage",
      difficulty: "Medium",
      stem: "The passage compares the town clock and the Greenwich clock chiefly to establish that:",
      key: "each answered a different question accurately.",
      wrong: [
        ["one was maintained more carefully than the other.", "Maintenance is mentioned only for the town clock and is not contrasted."],
        ["neither could be trusted by a travelling passenger.", "The passage's whole point is that both were accurate."],
        ["the older method was preferred by most townspeople.", "Preference among townspeople is never quantified in the passage."],
      ],
      why: "After describing what each clock described, the passage states: \"Both statements are accurate. They are answers to different questions.\"",
      steps: [
        "Locate the two sentences that summarise the comparison.",
        "Notice that the author refuses to call either one wrong.",
      ],
      hint: "Two very short sentences carry the comparison.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The final paragraph functions in the passage to:",
      key: "close the episode by noting how undramatically it ended.",
      wrong: [
        ["summarise the arguments made on both sides of the dispute.", "It contains no argument; it describes a man on a ladder."],
        ["predict that similar disputes will recur in the future.", "The prediction, such as it is, appears in the previous paragraph."],
        ["identify the legislation that finally settled the question.", "No legislation is named anywhere in the passage."],
      ],
      why: "The paragraph reports the removal of the second hands, notes that \"the towns that had kept them did not hold ceremonies,\" and ends with the observation that this is \"how most arguments of this kind conclude.\"",
      steps: [
        "Ask what the paragraph adds that earlier paragraphs did not.",
        "Notice it supplies an ending rather than an argument.",
      ],
      hint: "Nothing is argued after the ladder appears.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which piece of evidence best supports the claim that the change was not driven by law?",
      key: "No statute required railway time for several decades.",
      wrong: [
        ["Some towns kept two minute hands on their public clocks.", "This shows resistance existed, not that law was absent."],
        ["The railways printed Greenwich time in their timetables.", "This shows what the companies did, not whether law compelled it."],
        ["The second minute hands were removed by the century's end.", "This describes the outcome and is silent on the mechanism."],
      ],
      why: "The passage states plainly that adopting Greenwich time \"was not a legal act\" and that \"for decades there was no statute requiring anyone to use railway time.\" That sentence is the evidence; the others are compatible with either explanation.",
      steps: [
        "Identify the claim: the change was not legally driven.",
        "Look for a detail that would be false if the claim were false.",
      ],
      hint: "Only one option mentions law at all.",
    },
    {
      subskill: "synthesize information",
      family: "apply-passage-principle",
      difficulty: "Hard",
      stem: "Based on the passage, the author would most likely analyse a modern dispute over a technical standard by first asking:",
      key: "whose locality the proposed universal measure belongs to.",
      wrong: [
        ["whether the standard is more accurate than its rivals.", "Accuracy is the criterion the passage sets aside; both clocks were accurate."],
        ["how quickly the standard is being adopted by its users.", "Adoption speed is treated as an outcome, not a diagnostic question."],
        ["which government body has authority to enforce the rule.", "The passage's case turned on the absence of enforcement."],
      ],
      why: "The passage says the modern argument \"is made now about other standards, and made in the same terms\" — the terms being that a measure \"calling itself universal had a great deal in common with a measure belonging to somebody else.\"",
      steps: [
        "Find the sentence extending the analysis to the present.",
        "Recover the terms of the historical argument it points back to.",
      ],
      hint: "The author says explicitly that the argument recurs.",
      trap: "Applying a criterion the passage takes trouble to rule out.",
    },
  ],
};
