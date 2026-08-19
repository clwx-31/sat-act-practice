"use strict";

module.exports = {
  id: "act-reading-p016",
  type: "humanities",
  title: "Playing It As It Was",
  intro: "Passage A is adapted from a book on historically informed performance. Passage B is adapted from a critic's response.",
  content: `PASSAGE A

For most of the nineteenth and twentieth centuries, music written in 1720 was played on
instruments built in 1890, by orchestras of a size Bach never assembled, at a pitch a
semitone above the one he tuned to, with a continuous vibrato that no treatise of his
century describes. Nobody decided this. It accumulated, the way a house accumulates
furniture, and by 1950 it was simply what the music sounded like.

The movement that grew up after the war set out to take the furniture back out. Its method
was documentary. Instruments were rebuilt from surviving originals rather than modernised
ones. Pitch was reset from tuning forks and organ pipes of the period. Ornamentation,
bowing, tempo, and the size and seating of ensembles were reconstructed from treatises,
account books, and the payment records of the churches that employed the players. The point
was not reverence. The point was that a great many decisions had been made on the music's
behalf by people who had never asked what the composer's own conditions were, and that
undoing those decisions was a matter of evidence, not of taste.

What the evidence produced was frequently a surprise, which is the best argument for the
method. Baroque orchestras turned out to be small, often one player to a part. Gut strings
under lower tension turned out to speak faster and to decay sooner, which makes rapid
passagework audible in a way modern strings cannot manage. Bach's own choirs, on the
payment evidence, may have numbered as few as eight singers. Nobody wanted these results in
advance. They came out of the documents, and several of them overturned assumptions the
movement's own founders had held. The early recordings of the 1960s used forces far larger
than the account books would later support, and the people who made them were the same
people who published the account books.

PASSAGE B

The historical work is real and I have no quarrel with it. My quarrel is with the word that
got attached to it. *Authentic* is not a description of a performance; it is a claim about
access, and the access is not available.

Consider what the documents cannot supply. They record the pitch, the number of players,
and the bowings. They do not record what the music sounded like to a listener in 1720, and
that listener is the one thing that cannot be reconstructed, because a listener is made of
everything else they have heard. The first audience for a Bach cantata had never heard
Wagner, Stravinsky, or a car. We have. Play the notes on gut with eight singers and the
sound still lands in an ear formed by three centuries the composer did not live through.
The performance can be historical. The hearing cannot.

There is a second difficulty, and the movement's better practitioners have owned it. The
period documents disagree with each other, and where they are silent — which is most of the
time, on most questions — somebody has to decide. Those decisions are made by musicians
alive now, using taste, and the taste is of our century. A style emerged in the 1980s that
was crisp, light, fast, and vibrato-free, and it was defended as historical. It is better
understood as a period style of the late twentieth century, formed in reaction to what came
before it, exactly as the plush orchestras of 1890 were formed in reaction to what came
before them.

I am not arguing for going back. The recordings are extraordinary and the scholarship has
been a gift. I am arguing that the movement produced a new way of playing, which is a large
achievement, and that calling it a recovered old way is a smaller and less honest claim
that the achievement does not need.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The main point of Passage A is that historically informed performance:",
      key: "removed accumulated choices nobody had ever examined.",
      wrong: [
        ["restored a reverence for composers that had been lost.", "Passage A says directly that \"the point was not reverence.\""],
        ["proved that older instruments sound better than modern ones.", "Passage A describes differences in behaviour, not a ranking of quality."],
        ["settled the disputes that had divided performers for decades.", "No prior dispute is described; the older practice is said to be unquestioned."],
      ],
      why: "Passage A says the older sound \"accumulated, the way a house accumulates furniture,\" and that the movement's aim was undoing decisions \"made on the music's behalf by people who had never asked what the composer's own conditions were.\"",
      steps: [
        "Find the metaphor the first paragraph uses for the older practice.",
        "Read the sentence stating what the movement was undoing.",
      ],
      hint: "The second paragraph states what the point was and was not.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to Passage A, evidence about the size of Bach's choirs came from:",
      key: "records of payments made to singers.",
      wrong: [
        ["surviving instruments from the period.", "Instruments supplied evidence about how parts were played, not how many sang."],
        ["treatises describing correct ornamentation.", "Treatises are cited for bowing, tempo, and ornament rather than for numbers."],
        ["organ pipes preserved in period churches.", "Pipes are named as the evidence used to reset pitch."],
      ],
      why: "Passage A says ensembles were reconstructed from \"treatises, account books, and the payment records of the churches,\" and that \"Bach's own choirs, on the payment evidence, may have numbered as few as eight singers.\"",
      steps: [
        "Find the sentence about the size of the choirs.",
        "Take the kind of evidence named in that sentence.",
      ],
      hint: "The phrase appears twice, once in a list and once on its own.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-effect",
      difficulty: "Easy",
      stem: "Passage A states that gut strings under lower tension make rapid passagework audible because they:",
      key: "speak faster and stop sounding sooner.",
      wrong: [
        ["are tuned a full semitone lower in pitch.", "The change in pitch is a separate finding about tuning standards."],
        ["are played by a single performer per part.", "One player to a part concerns ensemble size, not how a string behaves."],
        ["require a continuous vibrato to sustain them.", "Continuous vibrato is named as a modern habit the movement removed."],
      ],
      why: "Passage A says gut strings \"turned out to speak faster and to decay sooner, which makes rapid passagework audible in a way modern strings cannot manage.\"",
      steps: [
        "Locate the sentence about gut strings.",
        "Take the two properties given before the word *which*.",
      ],
      hint: "The sentence gives the cause before the effect.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in Passage B, the phrase \"a claim about access\" suggests that the word *authentic* asserts a:",
      key: "reach back to something now out of range.",
      wrong: [
        ["right to perform music without any licence.", "Nothing about permission or ownership is raised in either passage."],
        ["standard of technical skill in the players.", "Passage B praises the playing and disputes only the word attached to it."],
        ["preference for older instruments over newer.", "Passage B says the historical work itself is not what it quarrels with."],
      ],
      why: "Passage B says the word \"is a claim about access, and the access is not available,\" then explains that the 1720 listener \"is the one thing that cannot be reconstructed.\"",
      steps: [
        "Read the clause immediately after the phrase.",
        "Connect it to what the following paragraph says cannot be recovered.",
      ],
      hint: "The sentence itself says the access is not available.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "Passage B implies that a modern listener at a period-instrument concert:",
      key: "hears the performance through later music they know.",
      wrong: [
        ["is unable to notice the differences the movement made.", "Passage B calls the recordings extraordinary, which assumes the differences register."],
        ["prefers the plush orchestral style of the nineteenth century.", "Passage B explicitly refuses to argue for going back to that style."],
        ["should be told which decisions the performers had to guess.", "Disclosure to audiences is never proposed anywhere in the passage."],
      ],
      why: "Passage B says a listener \"is made of everything else they have heard,\" that the first audience \"had never heard Wagner, Stravinsky, or a car,\" and that the sound \"lands in an ear formed by three centuries the composer did not live through.\"",
      steps: [
        "Find what Passage B says a listener is made of.",
        "Apply that claim to someone hearing the music today.",
      ],
      hint: "The argument is about the ear, not about the players.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "In Passage A, the remark that nobody wanted the results in advance serves mainly to:",
      key: "show that the findings were not shaped by expectation.",
      wrong: [
        ["explain why the movement took so long to gain acceptance.", "Passage A never discusses how quickly the approach was accepted."],
        ["concede that some conclusions have since been overturned.", "What was overturned was the founders' assumptions, not the findings."],
        ["suggest that the founders disagreed with one another sharply.", "No internal dispute among the founders is described in the passage."],
      ],
      why: "Passage A introduces the surprises as \"the best argument for the method,\" and says the results \"came out of the documents\" and \"overturned assumptions the movement's own founders had held.\"",
      steps: [
        "Note what the paragraph says the surprises are an argument for.",
        "Ask what unwanted results show about how the evidence was used.",
      ],
      hint: "Evidence is more persuasive when it contradicts the person gathering it.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Medium",
      stem: "The author of Passage B ends by praising the recordings and the scholarship chiefly to:",
      key: "separate an objection to a word from an attack on the work.",
      wrong: [
        ["soften a judgement the author expects readers to resist.", "The praise is presented as sincere and repeats a concession made at the start."],
        ["show that the movement has already accepted the criticism.", "Only its \"better practitioners\" are credited, and with a different point."],
        ["recommend the recordings to readers unfamiliar with them.", "No recommendation to listeners is made; the subject is how to describe the work."],
      ],
      why: "Passage B opens \"the historical work is real and I have no quarrel with it. My quarrel is with the word,\" and closes by calling the movement's achievement large while calling the label \"a smaller and less honest claim.\"",
      steps: [
        "Compare the first paragraph of Passage B with its last.",
        "Identify what is being praised and what is being refused.",
      ],
      hint: "The same distinction is drawn at both ends of the passage.",
    },
    {
      subskill: "compare perspectives",
      family: "comparing-two-texts",
      difficulty: "Hard",
      stem: "Passage B's central objection to Passage A is that Passage A:",
      key: "treats a reconstructed sound as a recovered experience.",
      wrong: [
        ["relies on documents that scholars now consider unreliable.", "Passage B accepts the documentary work and calls the scholarship a gift."],
        ["overstates how far modern orchestras departed from the originals.", "Passage B does not dispute the account of nineteenth-century practice."],
        ["assumes that older audiences listened more attentively than ours.", "Neither passage makes any claim about the attentiveness of listeners."],
      ],
      why: "Passage A treats the removal of accumulated decisions as recovering the composer's conditions. Passage B answers that \"the performance can be historical. The hearing cannot,\" because the listener cannot be reconstructed.",
      steps: [
        "State what Passage A claims the method achieves.",
        "Find the sentence in Passage B that concedes half of that and denies the other half.",
        "Reject options attacking evidence that Passage B accepts.",
      ],
      hint: "Passage B grants everything about the players and objects about the listeners.",
      trap: "Assuming the responding passage must reject the first passage's evidence.",
    },
    {
      subskill: "synthesize information",
      family: "combining-two-texts",
      difficulty: "Hard",
      stem: "Both passages would agree that the style of playing common in 1890 was:",
      key: "the product of habits rather than of deliberate choice.",
      wrong: [
        ["closer to Bach's own practice than critics have allowed.", "Passage A lists several ways it departed, and Passage B does not dispute them."],
        ["an unfortunate error that the movement has now corrected.", "Passage B declines to call the newer style a correction of the older."],
        ["based on documents that were later found to be forgeries.", "No forgery or discredited source is mentioned in either passage."],
      ],
      why: "Passage A says of the older practice that \"nobody decided this. It accumulated.\" Passage B agrees, describing the plush orchestras as \"formed in reaction to what came before them,\" the same way it describes the modern period style.",
      steps: [
        "Find each passage's account of how the nineteenth-century style arose.",
        "Look for the point at which the two accounts coincide.",
        "Discard options that one passage would reject.",
      ],
      hint: "Passage B uses the older style as a parallel, not as a target.",
      trap: "Assuming the responding passage defends what the first passage criticised.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which point in Passage B best supports its claim that current practice reflects present-day taste?",
      key: "The documents are silent on most questions performers face.",
      wrong: [
        ["A listener in 1720 had never heard Wagner or Stravinsky.", "This supports the separate claim about hearing, not about performers' choices."],
        ["The recordings the movement has produced are extraordinary.", "Praise for the results says nothing about how the choices were made."],
        ["Orchestras in 1890 played Bach on instruments built then.", "This describes the practice the movement replaced, not the taste in the new one."],
      ],
      why: "Passage B says the documents \"disagree with each other, and where they are silent — which is most of the time — somebody has to decide,\" and that those decisions are made \"using taste, and the taste is of our century.\"",
      steps: [
        "Separate Passage B's two arguments: one about listeners, one about gaps in evidence.",
        "Identify which argument the question is asking about.",
        "Choose the support belonging to that argument.",
      ],
      hint: "The claim concerns players' decisions, so the support must concern the evidence they work from.",
      trap: "Selecting the listener argument, which is the passage's other line of attack.",
    },
  ],
};
