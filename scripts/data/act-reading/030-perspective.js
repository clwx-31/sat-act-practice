"use strict";

module.exports = {
  id: "act-reading-p030",
  type: "humanities",
  title: "The Floor Tiles",
  intro: "This passage is adapted from an essay on the invention of linear perspective.",
  content: `Sometime around 1413, Filippo Brunelleschi stood in the doorway of the cathedral in
Florence and performed a demonstration that has no surviving object and a very good written
record. He had painted the Baptistery opposite on a small panel, using a construction he had
worked out. He drilled a hole through the panel at the point corresponding to the viewer's
eye. A spectator stood where he had stood, held the painted side away from them, looked
through the hole at a mirror, and saw the painting; then the mirror was removed and they
saw the building. The two were reported to coincide.

The demonstration is remembered as the invention of perspective, which is not quite right.
Painters had been making things smaller as they receded for a long time, and Roman wall
painting shows convergence that is roughly consistent within a single wall. What Brunelleschi
supplied was not the effect but the rule: a construction, repeatable by anyone, in which all
lines perpendicular to the picture plane meet at one point, and the rate at which equal
intervals shrink is fixed rather than judged.

The rule reached other painters through a book. Leon Battista Alberti's *On Painting*, of
1435, gave a method that could be followed by someone who had never met Brunelleschi. Divide
the base of the picture into equal units. Choose a height for the horizon and mark the
centric point on it. Draw lines from the base divisions to that point; these are the
receding edges of a tiled floor. Then determine the spacing of the transverse lines by a
separate construction, which Alberti describes and which is the only difficult part.

That floor is why perspective mattered. It is not a decoration. It is a measuring device
laid into the picture, and once it is there, everything standing on it acquires a size and a
position that can be checked. A figure two tiles back must be smaller by a determinate
amount. A building whose base sits on the fourth row is a calculable distance away. Painters
began to compose in depth because depth had become something they could be wrong about.

The gains were immediate and the constraints arrived with them, which is the part usually
left out. A single vanishing point implies a single viewer, standing still, at one distance,
with one eye. Real vision has two eyes that move constantly, and a painting built for the
ideal station point looks correct from that point and progressively strange elsewhere.
Painters knew this early. The workaround, applied throughout the fifteenth century, was to
place the vanishing point where a viewer was likely to stand — often at the height of a
person entering a chapel — and to keep the depicted space shallow enough that the distortion
stayed within tolerance.

There were also things the system could not represent, and their absence shaped what got
painted. Wide fields of view distort violently at the edges under a strict construction, so
the wide view was avoided. Curved space is not available: a straight line in the world is a
straight line in the picture, which is why a colonnade seen along its length is easy and a
dome seen from beneath is a permanent difficulty. And because the method fixes relative
size, it fixes relative importance to whatever geometry dictates. A patron who expected to
be painted larger than a peasant because he mattered more had to be moved forward instead.
Scale ceased to be available as a language for saying who was significant, which is a
substantial loss and one that medieval painters would have named at once.

None of this was hidden from the people using it. Alberti's book is explicit that the
construction is a device for making a picture rather than an account of how seeing works, a
distinction later writers repeatedly lost. What the fifteenth century produced was not a
discovery about vision. It was a convention, adopted because it did something no other
convention could do, and adopted with its costs understood by the first generation and
forgotten by the third.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is best described as an argument that linear perspective was:",
      key: "a useful convention adopted along with real limits.",
      wrong: [
        ["a discovery about how human vision actually operates.", "The passage says the fifteenth century produced no such discovery."],
        ["an effect Roman painters had already achieved fully.", "Roman convergence is called only roughly consistent within one wall."],
        ["a technique that made medieval methods obsolete.", "The passage counts a medieval capacity, scale for importance, as lost."],
      ],
      why: "The final paragraph says what was produced \"was not a discovery about vision. It was a convention, adopted because it did something no other convention could do, and adopted with its costs understood.\"",
      steps: [
        "Read the last paragraph, which states the passage's verdict.",
        "Check that the option includes the costs the middle paragraphs describe.",
      ],
      hint: "The closing sentence names both the reason for adoption and the price.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, in Brunelleschi's demonstration the spectator looked at the painting:",
      key: "through a hole, by way of a mirror.",
      wrong: [
        ["from the doorway, with both eyes open.", "The hole restricts the view to a single eye at a single point."],
        ["beside the Baptistery it depicted.", "The spectator stood where Brunelleschi had stood, in the cathedral doorway."],
        ["after the mirror had been taken away.", "Removing the mirror is what revealed the building itself."],
      ],
      why: "The first paragraph says the spectator \"held the painted side away from them, looked through the hole at a mirror, and saw the painting.\"",
      steps: [
        "Find the sentence describing what the spectator did.",
        "Note the order of the hole, the mirror, and the removal.",
      ],
      hint: "The painted face is turned away from the viewer.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-practice",
      difficulty: "Easy",
      stem: "The passage says fifteenth-century painters placed the vanishing point at the height of a person entering a chapel because:",
      key: "a picture looks correct only near its station point.",
      wrong: [
        ["chapels were lit from that height by their windows.", "Lighting is not discussed anywhere in the passage."],
        ["Alberti's method required a horizon at eye level.", "Alberti's method lets the horizon height be chosen freely."],
        ["patrons preferred to be depicted at that height.", "Patrons appear in the discussion of scale, not of the horizon."],
      ],
      why: "The passage says a painting built for the ideal station point \"looks correct from that point and progressively strange elsewhere,\" and that the workaround was to put the vanishing point where a viewer was likely to stand.",
      steps: [
        "Find the sentence describing what happens away from the ideal point.",
        "Read the sentence that gives the workaround.",
      ],
      hint: "The practice is a response to a limitation named just before it.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "The passage calls the tiled floor a \"measuring device\" chiefly because it:",
      key: "fixes the size and place of everything on it.",
      wrong: [
        ["records the dimensions of the room being painted.", "The floor is constructed in the picture, not measured from a room."],
        ["shows the viewer how far away they are standing.", "The construction fixes depicted distances, not the viewer's position."],
        ["was drawn with instruments rather than by eye.", "How it was drawn is not what the phrase is describing."],
      ],
      why: "The passage says once the floor is there, \"everything standing on it acquires a size and a position that can be checked,\" and that a figure two tiles back \"must be smaller by a determinate amount.\"",
      steps: [
        "Read the sentences that follow the phrase.",
        "Note that they describe what can be verified rather than what is recorded.",
      ],
      hint: "The next two sentences give examples of what it measures.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-methods",
      difficulty: "Medium",
      stem: "The passage distinguishes Brunelleschi's contribution from earlier practice by saying he supplied:",
      key: "a repeatable rule rather than the effect itself.",
      wrong: [
        ["the first painting in which objects recede at all.", "The passage says painters had long made things smaller as they receded."],
        ["a written treatise that other painters could follow.", "The treatise was Alberti's, published two decades later."],
        ["a demonstration that survives as a physical object.", "The passage says the demonstration has no surviving object."],
      ],
      why: "The second paragraph says \"what Brunelleschi supplied was not the effect but the rule: a construction, repeatable by anyone,\" in which the shrinking rate \"is fixed rather than judged.\"",
      steps: [
        "Find the sentence contrasting the effect with the rule.",
        "Note the two properties the rule adds: repeatability and fixed rates.",
      ],
      hint: "The sentence tells you what he did not supply first.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The remark that a dome seen from beneath is \"a permanent difficulty\" serves mainly to:",
      key: "illustrate a shape the construction cannot handle.",
      wrong: [
        ["show that domes were rarely painted in the period.", "Frequency of subjects is not claimed anywhere in the passage."],
        ["explain why Brunelleschi turned to architecture instead.", "His later career is not mentioned in the passage at all."],
        ["prove that curved lines cannot be drawn accurately.", "The point concerns how the system maps space, not draughtsmanship."],
      ],
      why: "The paragraph says \"curved space is not available: a straight line in the world is a straight line in the picture,\" and offers the colonnade and the dome as the easy and hard cases of that rule.",
      steps: [
        "Read the rule stated immediately before the examples.",
        "Ask which example the rule makes easy and which hard.",
      ],
      hint: "The two examples come in a matched pair.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which detail best supports the claim that perspective made depth something painters could be wrong about?",
      key: "A figure two tiles back must shrink by a set amount.",
      wrong: [
        ["Roman wall painting shows convergence within one wall.", "This describes practice before the rule, when nothing was determinate."],
        ["Alberti's transverse spacing is the only hard construction.", "Difficulty of a step says nothing about whether results can be checked."],
        ["Brunelleschi drilled a hole at the viewer's eye position.", "The hole controls viewing conditions rather than establishing correctness."],
      ],
      why: "The passage says a figure two tiles back \"must be smaller by a determinate amount\" and a building on the fourth row is \"a calculable distance away\" — a claim can now be checked against the floor.",
      steps: [
        "Ask what makes a painted size checkable rather than a matter of taste.",
        "Look for the detail that names a determinate quantity.",
      ],
      hint: "Being wrong requires a standard to be wrong against.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-cost",
      difficulty: "Hard",
      stem: "The passage treats the loss of scale as a language of importance as significant because it:",
      key: "removed a device earlier painters had used deliberately.",
      wrong: [
        ["made portraits of patrons impossible to compose.", "The passage says a patron could be moved forward instead."],
        ["proved that the new construction was geometrically flawed.", "The constraint follows from the geometry working, not failing."],
        ["was the reason perspective spread slowly across Europe.", "No account of the rate of adoption appears in the passage."],
      ],
      why: "The passage says scale \"ceased to be available as a language for saying who was significant, which is a substantial loss and one that medieval painters would have named at once.\"",
      steps: [
        "Identify what the older practice used size to communicate.",
        "Note whom the passage says would have recognised the loss.",
        "Reject options treating the constraint as a defect in the method.",
      ],
      hint: "The passage appeals to what an earlier generation could do.",
      trap: "Reading a cost of a working system as evidence that the system fails.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Hard",
      stem: "The author notes that Alberti was explicit about the construction's status chiefly to:",
      key: "place a later confusion on later writers.",
      wrong: [
        ["credit Alberti with inventing the method himself.", "The passage attributes the rule to Brunelleschi and the book to Alberti."],
        ["show that painters ignored the advice in his book.", "The passage describes painters following the method closely."],
        ["argue that the treatise was clearer than the demonstration.", "No comparison of clarity between the two is made."],
      ],
      why: "The passage says Alberti was explicit that the construction \"is a device for making a picture rather than an account of how seeing works, a distinction later writers repeatedly lost.\"",
      steps: [
        "Note whose understanding the sentence contrasts with Alberti's.",
        "Connect it to the closing claim about the third generation.",
        "Reject options about Alberti's originality or reception.",
      ],
      hint: "The clause after the comma names who lost the distinction.",
      trap: "Reading a remark about Alberti as a claim about his priority.",
    },
    {
      subskill: "synthesize information",
      family: "combining-sections",
      difficulty: "Hard",
      stem: "Taken together, the paragraphs on the station point and on wide views suggest that fifteenth-century compositions:",
      key: "were shaped by what the method handled well.",
      wrong: [
        ["abandoned the construction whenever it proved awkward.", "The passage describes painters working within the constraints, not dropping them."],
        ["became less accurate as the century went on.", "No decline in accuracy over the century is described."],
        ["required viewers to stand in a marked position.", "Painters adjusted the picture to the likely viewer instead."],
      ],
      why: "Painters kept depicted space \"shallow enough that the distortion stayed within tolerance\" and avoided the wide view because it \"distorts violently at the edges,\" so the subject matter followed the geometry.",
      steps: [
        "Name the constraint each of the two paragraphs describes.",
        "Ask what painters did in response in each case.",
        "Choose the option that generalises both responses.",
      ],
      hint: "Both paragraphs end with a choice about what to paint.",
      trap: "Treating adaptations to a constraint as rejections of it.",
    },
  ],
};
