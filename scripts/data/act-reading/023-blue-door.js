"use strict";

module.exports = {
  id: "act-reading-p023",
  type: "literary-narrative",
  title: "The Blue Door",
  intro: "This passage is adapted from a novel. Nell has returned to the town where she grew up for her uncle Pav's funeral.",
  content: `The story went like this, and I had been telling it for thirty-one years.

I was seven. The river behind the allotments was in flood, brown and moving fast, and I had
gone down to look at it because a boy called Terrence had said there was a dead sheep in the
willows. There was no sheep. There was a bank that had been undercut, and I stood on it, and
it went. What I remember is the cold as a kind of noise, and then a hand in the collar of my
coat, and then the blue door of my uncle's shed going past sideways as somebody carried me
up the slope at a speed that seemed, even at seven, unreasonable.

The story had a shape. It had a boy who lied about a sheep, a bank that gave way, and my
uncle Pav, who was not a warm man and who did not like children and who was there anyway.
It was the story I told when people asked about my family, because it did in ninety seconds
what would otherwise take an hour: it explained why I had driven four hundred miles for the
funeral of a man who had never once telephoned me.

Ivo found me by the tea urn. He is two years older, has my uncle's hands and none of his
silence, and he had clearly been sent over by his sister.

He said the eulogy had been all right. I said it had been too long. He said everything at a
funeral is too long except the bit you want, which is a thing his mother says, and then he
said, "You told the river."

I said I had.

"You know it was Mum," he said.

I did not say anything, because there was nothing in me that could have made a sentence
just then.

"She was up at the shed with the seed trays. Dad was at work until six that whole week; he
was on the Renfrew job." He said it without any weight at all, the way you correct
somebody's train time. "She went in in her good coat, which is why we heard about it for
about nine years."

I have gone over the memory since, carefully, the way you check a room you are certain you
locked. The cold is still there. The hand in the collar is still there. The blue door is
extremely clear, and the blue door is the thing that gives it away, because the shed was my
uncle's shed, and being carried past it is not evidence that my uncle carried me. A
seven-year-old sees a door and knows whose door it is, and thirty-one years of telling puts
the owner of the door into the arms doing the carrying, and after a while there is no seam
where the two were joined.

What I have not decided is what to do with the rest of it. Because the story was doing
something. It was not a lie; I was not inventing a rescue. Somebody did pull me out. But I
had built a version of my uncle on it — a hard man who came when it counted — and I had
carried that version for three decades and had, on the strength of it, forgiven him a great
deal that he had never asked to be forgiven for and might not have wanted forgiving.

His actual position, on the evidence, was that he was at work. That is not a failing. He
was pouring concrete in Renfrew. It only looks like a failing next to a version of him that
I made and that he never knew existed.

Ivo waited while I worked out that I was not going to be able to say any of this, and then
he refilled my cup, which was the only sensible thing available.`,
  questions: [
    {
      subskill: "main idea",
      family: "narrative-central-insight",
      difficulty: "Medium",
      stem: "The passage is best described as an account of the narrator's:",
      key: "reckoning with what a familiar story had been doing for her.",
      wrong: [
        ["anger at a cousin who corrected her in a public place.", "She calls Ivo's manner weightless and reports his final gesture approvingly."],
        ["grief at a funeral for a relative she had rarely seen.", "The funeral is the setting; the passage turns on the memory, not the loss."],
        ["discovery that she had invented a rescue that never occurred.", "She states plainly that \"somebody did pull me out\" and that it was not a lie."],
      ],
      why: "After the correction she says \"what I have not decided is what to do with the rest of it,\" and explains that she had built a version of her uncle on the story and forgiven him on its strength.",
      steps: [
        "Identify what Ivo corrects and what he does not.",
        "Read the paragraphs after the correction, where she works out what she has lost.",
      ],
      hint: "The last third of the passage is about the uncle, not the river.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to Ivo, his father was absent on the day of the flood because he was:",
      key: "away at work on the Renfrew job.",
      wrong: [
        ["up at the shed with the seed trays.", "That is where Ivo says his mother was, which is the point of the correction."],
        ["helping with the allotments by the river.", "No one is described as working the allotments that day."],
        ["at home and unaware of the flooding.", "Ivo says he was at work until six for the whole week."],
      ],
      why: "Ivo says \"Dad was at work until six that whole week; he was on the Renfrew job,\" and the narrator later repeats that he was \"pouring concrete in Renfrew.\"",
      steps: [
        "Find Ivo's two sentences of correction.",
        "Take the location he gives for his father.",
      ],
      hint: "The detail is repeated near the end of the passage.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-error",
      difficulty: "Medium",
      stem: "The narrator concludes that her memory went wrong because:",
      key: "a landmark she recognised was attributed to its owner.",
      wrong: [
        ["she was too young to remember the day at all.", "She retains the cold and the hand in the collar and does not doubt them."],
        ["her aunt deliberately let her uncle take the credit.", "Nothing suggests any concealment; the family joked about the good coat."],
        ["she confused the flood with a different year's flood.", "Only one flood is described and its date is never in question."],
      ],
      why: "She says \"the blue door is the thing that gives it away,\" since being carried past her uncle's shed \"is not evidence that my uncle carried me,\" and thirty-one years of telling \"puts the owner of the door into the arms doing the carrying.\"",
      steps: [
        "Find which detail she says exposes the error.",
        "Follow the reasoning she gives about what that detail does and does not show.",
      ],
      hint: "The shed belonged to somebody, and the arms belonged to somebody else.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "In saying there is \"no seam where the two were joined,\" the narrator means that the joined parts:",
      key: "can no longer be told apart in memory.",
      wrong: [
        ["were sewn together by someone else's account.", "She attributes the joining to her own repeated telling, not to another person."],
        ["contradict each other whenever she recalls them.", "The trouble is that they fit together perfectly, not that they clash."],
        ["have been separated by her cousin's correction.", "The correction identifies the error without undoing the memory's smoothness."],
      ],
      why: "The sentence describes years of telling putting the door's owner into the carrying arms, \"and after a while there is no seam where the two were joined\" — the join has become invisible.",
      steps: [
        "Identify the two elements she says were joined.",
        "Read the metaphor as describing how the join now appears.",
      ],
      hint: "A seam is what lets you see that something was assembled.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The narrator says she told the story when asked about her family because it:",
      key: "explained her attendance quickly.",
      wrong: [
        ["proved that her uncle had been fond of her.", "She describes him as a man who did not like children."],
        ["kept people from asking further questions.", "She values the story's speed, not its power to close a subject."],
        ["showed how dangerous the river had been.", "The river's danger is the story's occasion, not its purpose for her."],
      ],
      why: "She says it \"did in ninety seconds what would otherwise take an hour: it explained why I had driven four hundred miles for the funeral of a man who had never once telephoned me.\"",
      steps: [
        "Find the sentence giving the story's use to her.",
        "Note the contrast between ninety seconds and an hour.",
      ],
      hint: "The sentence names a distance and a phone that never rang.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The detail about the aunt's good coat serves mainly to:",
      key: "support Ivo's account with a family memory.",
      wrong: [
        ["show that the aunt resented the rescue afterwards.", "The nine years of retelling is presented as family comedy, not resentment."],
        ["explain why the narrator failed to recognise her.", "The narrator's confusion is traced to the shed door, not to clothing."],
        ["establish how cold the river was on that day.", "The coat detail concerns its ruin at the bank, not the temperature."],
      ],
      why: "Ivo adds that his mother \"went in in her good coat, which is why we heard about it for about nine years,\" supplying a corroborating detail that only the family present would carry.",
      steps: [
        "Ask what the detail adds to Ivo's claim rather than to the scene.",
        "Note that it is something the household repeated for years.",
      ],
      hint: "The detail is evidence, offered casually.",
    },
    {
      subskill: "perspective",
      family: "retrospective-narration",
      difficulty: "Hard",
      stem: "The narrator's stance towards her uncle at the end of the passage is best described as:",
      key: "clearing him of a charge he never faced.",
      wrong: [
        ["blaming him for failing to appear when she needed him.", "She says explicitly that being at work \"is not a failing.\""],
        ["defending him against her cousin's version of the day.", "She accepts Ivo's account without disputing any part of it."],
        ["regretting that she never thanked him while he was alive.", "No missed thanks is mentioned; what she regrets is a version she built."],
      ],
      why: "She says his position \"was that he was at work. That is not a failing,\" and that it \"only looks like a failing next to a version of him that I made and that he never knew existed.\"",
      steps: [
        "Note whom the narrator holds responsible for the mistaken version.",
        "Read the final sentence about the uncle carefully.",
        "Reject options that assign him blame or credit he was never given.",
      ],
      hint: "The comparison she rejects is one she constructed herself.",
      trap: "Reading her disappointment as directed at the uncle rather than at her own account.",
    },
    {
      subskill: "theme",
      family: "thematic-statement",
      difficulty: "Hard",
      stem: "The passage develops the idea that a long-told story can:",
      key: "become a relationship the other person never entered.",
      wrong: [
        ["preserve a childhood event more accurately than documents.", "The passage is an account of that preservation failing."],
        ["be corrected only by someone who witnessed the event.", "Ivo did not witness it either; he reports what his household knew."],
        ["cause a family to quarrel over what actually happened.", "No quarrel occurs; Ivo speaks lightly and the narrator accepts it."],
      ],
      why: "She had built \"a hard man who came when it counted,\" forgiven him \"a great deal that he had never asked to be forgiven for,\" and made a version \"that he never knew existed.\"",
      steps: [
        "Identify what the story produced besides a memory.",
        "Note whether the uncle ever participated in what it produced.",
        "Choose the option that names both the construction and his absence from it.",
      ],
      hint: "Ask what the narrator gave him, and whether he was there to receive it.",
      trap: "Settling for a general point about memory being unreliable.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which detail best supports the narrator's claim that the memory itself is not fabricated?",
      key: "The cold and the hand in her collar remain unchanged.",
      wrong: [
        ["The blue door of the shed appears with great clarity.", "That is the detail she identifies as the source of the error."],
        ["Ivo delivered his correction without any weight at all.", "His manner concerns how the news was given, not what she retains."],
        ["She had told the story for thirty-one years running.", "Long repetition is what she blames for the distortion."],
      ],
      why: "Checking the memory, she reports \"the cold is still there. The hand in the collar is still there,\" and separately says \"I was not inventing a rescue. Somebody did pull me out.\"",
      steps: [
        "Distinguish the parts of the memory she keeps from the part she rejects.",
        "Match the claim to the parts she says survive scrutiny.",
        "Reject the detail she names as the point of failure.",
      ],
      hint: "She lists what is still there before naming what gave it away.",
      trap: "Choosing the vivid detail, which is precisely the corrupted one.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage suggests that Ivo came to the tea urn:",
      key: "on an errand arranged by another relative.",
      wrong: [
        ["to ask the narrator about her long drive.", "He opens with the eulogy and moves directly to the story."],
        ["because he had disliked the eulogy himself.", "He says the eulogy \"had been all right.\""],
        ["to warn her that his mother was upset.", "His mother's feelings are never mentioned in the exchange."],
      ],
      why: "The narrator says \"he had clearly been sent over by his sister,\" and he raises the river within a few lines of arriving.",
      steps: [
        "Find the sentence describing how Ivo arrived.",
        "Note what the narrator infers about why.",
      ],
      hint: "One clause in his introduction says who sent him.",
    },
  ],
};
