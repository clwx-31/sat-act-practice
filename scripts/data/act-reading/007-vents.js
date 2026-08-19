"use strict";

module.exports = {
  id: "act-reading-p007",
  type: "natural-science",
  title: "Energy From the Rock",
  intro: "This passage is adapted from an essay on the discovery of chemosynthetic communities on the deep seafloor.",
  content: `Until 1977, every account of life on Earth rested on a single sentence: energy
enters the living world when a plant, an alga, or a cyanobacterium captures sunlight.
Everything else eats, or eats something that ate. The deep sea fitted the sentence
without difficulty. Below about two hundred metres there is no light to capture, so the
abyss was understood as a place of scarcity, sustained by whatever drifted down from the
lit water above — a slow rain of dead plankton and the occasional whale. Deep-sea animals
were accordingly expected to be small, slow, sparse, and patient. Most of them are.

In February 1977 the submersible Alvin was working the Galápagos Rift, two and a half
kilometres down. The expedition was geological. Its object was to photograph the seams
where new seafloor is made and to measure the warm water that instruments had detected
leaking from them. Nobody aboard was a biologist.

What the lights found was a field of clams the size of dinner plates. Beyond them stood
white tubes two metres tall, tipped with scarlet plumes that withdrew when the submersible
came near. Crabs moved over the rock in numbers that would have been unremarkable in a
tide pool and were, at that depth, impossible. The dredge came up full. The ship carried
no preservative suitable for animal tissue, and the first specimens of the richest
community ever found on the deep seafloor were put into vodka from the galley. The story
is usually told as comedy. It is better read as evidence: nobody had planned for biology,
because nobody expected there to be any.

The explanation took two years, and it did not come from the animals. It came from the
water, which stank of hydrogen sulfide, a gas that is poison to most organisms because it
disables the same enzyme that cyanide does. Certain bacteria, however, can strip electrons
from sulfide and use the energy released to build sugars out of carbon dioxide, exactly as
a plant uses the energy of light. The process had been described in 1887 by Sergei
Winogradsky, working with soil in a laboratory. It was never disputed. It had simply never
been thought to support anything larger than the bacteria performing it.

At the vents it supported everything. The giant tube worm, Riftia pachyptila, turned out
to have no mouth, no gut, and no anus. Two-thirds of its body is an organ packed with
sulfur-oxidising bacteria; the scarlet plume is a gill that gathers sulfide, oxygen, and
carbon dioxide and delivers all three to its tenants. The worm does not eat. It farms,
internally, and has given up the equipment for any other arrangement.

The finding could still have been quarantined as an oddity of volcanoes. What ended that
possibility was a discovery in 1984 on the continental slope of the Gulf of Mexico, where
the seafloor is cold and there is no volcanic activity whatever. Methane and sulfide seep
out of the sediment there under nothing more dramatic than pressure, and around the seeps
stood tube worms again, and mussels, and clams. The chemistry, not the heat, was doing the
work. Cold seeps have since been mapped on every continental margin that anyone has looked
at carefully.

One phrase from those years has proved harder to defend than the science it described.
Vent communities were widely announced as the first life found to be independent of the
sun. They are not. The bacteria oxidise sulfide with oxygen, and nearly all the free oxygen
in the ocean was put there by photosynthesis. Shut down the sunlit surface and the vents
would not run for long. What the communities are independent of is photosynthetic food,
which is a smaller claim and a truer one. Some biologists regard the correction as
pedantry. Others answer that the looser phrase is precisely what makes vents attractive as
a model for life on Europa or Enceladus, where there is no photosynthesis to supply any
oxygen, and that a model built on a misdescription will mislead whoever borrows it.

Either way, the tally of known species is not what changed in 1977. What changed was the
standing of a question. Before Alvin, asking where an ecosystem got its energy was a
formality with one answer. Afterwards it was a question that had to be asked each time,
and answered from the water.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is primarily concerned with:",
      key: "how one discovery changed which questions biologists had to ask about ecosystems.",
      wrong: [
        ["how a geological expedition came to make an important biological discovery.", "The accident of who was aboard occupies one paragraph; the passage then follows the science for thirty years."],
        ["how bacteria at deep-sea vents convert hydrogen sulfide into usable energy.", "The mechanism is explained, but as the answer to the puzzle rather than as the passage's subject."],
        ["why the deep ocean holds more species than the sunlit water above it does.", "The passage never claims this and says most deep-sea animals are sparse and slow."],
      ],
      why: "The last paragraph states that \"the tally of known species is not what changed in 1977\" but rather \"the standing of a question\" — one that had been \"a formality with one answer\" and afterwards had to be asked each time.",
      steps: [
        "Read the final paragraph, where the passage names what it takes to be the significance of the discovery.",
        "Check that the option covers the opening assumption as well as the vents themselves.",
      ],
      hint: "The last paragraph tells you what the author thinks actually changed.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the first specimens taken from the Galápagos Rift were preserved in:",
      key: "vodka taken from the ship's galley.",
      wrong: [
        ["formalin carried for geological samples.", "The passage says the ship carried no preservative suitable for animal tissue at all."],
        ["alcohol supplied by the ship's laboratory.", "The alcohol came from the galley, not from laboratory stores, which is the point of the anecdote."],
        ["seawater chilled inside the submersible.", "No storage of that kind is described; the dredge samples go straight into what was on board."],
      ],
      why: "The third paragraph says the ship \"carried no preservative suitable for animal tissue\" and that the specimens \"were put into vodka from the galley.\"",
      steps: [
        "Find the sentence about the dredge in the third paragraph.",
        "Read the clause that follows it to the end.",
      ],
      hint: "The detail is offered as a joke and then reread as evidence.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-condition",
      difficulty: "Easy",
      stem: "The passage indicates that the deep sea was long expected to be sparsely populated because:",
      key: "no sunlight reaches it, so its food has to sink from above.",
      wrong: [
        ["its water is too cold for large animals to grow quickly.", "Temperature is raised only at the cold seeps, and there to show that heat is not required."],
        ["the pressure at that depth prevents most tissues from forming.", "Pressure appears once, as what drives fluid out of seep sediment, not as a limit on life."],
        ["hydrogen sulfide from the seafloor poisons most organisms there.", "Sulfide is toxic, but the passage introduces it as the vents' energy source, not as the cause of scarcity."],
      ],
      why: "The first paragraph says that below two hundred metres \"there is no light to capture, so the abyss was understood as a place of scarcity, sustained by whatever drifted down from the lit water above.\"",
      steps: [
        "Locate the sentence in the first paragraph that gives the reason directly.",
        "Note that the reason is about the supply of food, not about physical conditions.",
      ],
      hint: "The first paragraph states the assumption and its ground in one sentence.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage suggests that Winogradsky's 1887 description of sulfide oxidation was:",
      key: "accepted, but assumed to explain little beyond the bacteria themselves.",
      wrong: [
        ["overlooked entirely until the samples from Alvin were examined.", "The passage says the process \"had been described\" and \"was never disputed,\" so it was known."],
        ["disputed by biologists who doubted that sulfide could be oxidised.", "The passage states the opposite: the process itself was never in question."],
        ["confined to soils and later shown not to operate in seawater.", "Sulfide oxidation is exactly what the passage says sustains the vent communities in seawater."],
      ],
      why: "The fourth paragraph says the process \"was never disputed. It had simply never been thought to support anything larger than the bacteria performing it.\" The gap was in the scope granted to it, not in its truth.",
      steps: [
        "Find the two short sentences that judge the earlier work.",
        "Separate the question of whether it was believed from the question of what it was thought to explain.",
      ],
      hint: "Two sentences in a row make two different claims about the 1887 work.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The description of Riftia's body indicates that the worm:",
      key: "depends completely on the bacteria it houses for its food.",
      wrong: [
        ["filters small drifting particles from the water with its plume.", "The plume is described as a gill that gathers gases, not as a feeding structure."],
        ["digests hydrogen sulfide directly in a specialised organ.", "The organ holds bacteria; the chemistry is theirs, and the worm has no digestive tract."],
        ["competes with its bacteria for the sulfide that it gathers.", "The passage presents the arrangement as farming, with the worm delivering all three gases."],
      ],
      why: "The fifth paragraph says Riftia has \"no mouth, no gut, and no anus,\" that two-thirds of its body holds sulfur-oxidising bacteria, and that \"the worm does not eat. It farms, internally.\"",
      steps: [
        "List the structures the passage says the worm lacks.",
        "Match that list to the option that follows from having no digestive system at all.",
      ],
      hint: "Start from what the worm does not have.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Medium",
      stem: "As it is used in the fifth paragraph, the word *tenants* refers to:",
      key: "the sulfur-oxidising bacteria living inside the worm.",
      wrong: [
        ["the tube worms themselves, which occupy the vent field.", "The worm is the landlord in the metaphor; it is what delivers the gases to something else."],
        ["the crabs that gather on the rock beside the vents.", "The crabs appear in an earlier paragraph and are never linked to the worm's anatomy."],
        ["the clams that settle in the warm water near a vent.", "The clams belong to the survey of the field, not to the description of Riftia's interior."],
      ],
      why: "The sentence says the plume \"gathers sulfide, oxygen, and carbon dioxide and delivers all three to its tenants,\" and the previous sentence says two-thirds of the body is an organ packed with bacteria.",
      steps: [
        "Identify who is doing the delivering in that sentence.",
        "Find what the preceding sentence says is housed in the worm's body.",
      ],
      hint: "A tenant occupies something belonging to somebody else.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Hard",
      stem: "The 1984 discovery in the Gulf of Mexico functions in the passage chiefly to:",
      key: "rule out the possibility that vent life was a peculiarity of volcanoes.",
      wrong: [
        ["show that seep communities are richer in species than vent communities.", "No comparison of abundance is made; the same kinds of animals are reported at both."],
        ["date the moment at which cold seeps were first mapped around the world.", "The mapping is described as later work, and no date is attached to it."],
        ["explain why methane rather than sulfide sustains the animals at seeps.", "Both gases are named at seeps, and the passage credits the chemistry generally."],
      ],
      why: "The paragraph opens by saying the vent finding \"could still have been quarantined as an oddity of volcanoes\" and that the Gulf discovery \"ended that possibility,\" because there \"the chemistry, not the heat, was doing the work.\"",
      steps: [
        "Read the sentence that introduces the paragraph, which states what was still open.",
        "Ask what the cold, volcano-free setting is being used to prove.",
      ],
      hint: "The first sentence of the paragraph names the objection the example answers.",
      trap: "Treating a second example as a mere addition rather than as a test of the first.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The passage is organised as:",
      key: "an assumption, its collapse, the mechanism found, and a dispute over wording.",
      wrong: [
        ["a chronological survey of deep-sea expeditions since the early 1970s.", "Only two expeditions appear, and both are used to make a point about energy sources."],
        ["a comparison of two competing explanations for the vent communities.", "One explanation is given; the argument at the end is about how to describe it."],
        ["a defence of a discovery against the objections raised against it.", "The passage grants an objection to the popular phrase rather than answering it."],
      ],
      why: "The first paragraph states the assumption, the third overturns it, the fourth and fifth supply chemosynthesis, and the seventh paragraph reports the argument over the phrase \"independent of the sun.\"",
      steps: [
        "Summarise each paragraph in three or four words.",
        "Check that the option accounts for the last third of the passage, not only the discovery.",
      ],
      hint: "Ask what the closing paragraphs are doing that the opening ones are not.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which detail most directly supports the claim that vent communities are not independent of the sun?",
      key: "The bacteria require oxygen, which photosynthesis put into the ocean.",
      wrong: [
        ["The vents lie far below the depth at which any sunlight penetrates.", "This is what makes the claim surprising; on its own it supports the opposite reading."],
        ["Dead plankton sinking from the surface feeds most deep-sea animals.", "That is the older picture the vents were thought to escape, not evidence about the vents."],
        ["Winogradsky described sulfide oxidation while working with garden soil.", "The date and setting of the earlier work say nothing about the vents' oxygen supply."],
      ],
      why: "The seventh paragraph says \"the bacteria oxidise sulfide with oxygen, and nearly all the free oxygen in the ocean was put there by photosynthesis,\" then concludes that the vents would not run for long without the sunlit surface.",
      steps: [
        "Find the sentence stating what the bacteria need besides sulfide.",
        "Trace where the passage says that substance comes from.",
        "Reject details that are true but do not connect the vents to sunlight.",
      ],
      hint: "Follow the second ingredient in the reaction, not the first.",
      trap: "Choosing a fact about depth, which supports the phrase the passage is correcting.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-dispute",
      difficulty: "Hard",
      stem: "The disagreement reported near the end of the passage turns on whether:",
      key: "a loose phrase does harm when it is carried into a new argument.",
      wrong: [
        ["sulfide oxidation genuinely resembles photosynthesis in its chemistry.", "Both sides accept the chemistry; the passage itself draws the comparison without hedging."],
        ["cold seeps and hot vents ought to be treated as one kind of system.", "That question is settled earlier in the passage and nobody is shown disputing it."],
        ["Europa and Enceladus are likely to hold any living organisms at all.", "The moons appear as a use to which the phrase is put, not as the point at issue."],
      ],
      why: "One side calls the correction \"pedantry\"; the other answers that the loose phrase \"is precisely what makes vents attractive as a model\" for moons with no photosynthesis, and that such a model \"will mislead whoever borrows it.\"",
      steps: [
        "State each side's position in one clause.",
        "Notice that neither side contests the chemistry, only what follows from how it is described.",
        "Choose the option that names the consequence the second side points to.",
      ],
      hint: "Both parties agree about the facts; ask what else they are arguing about.",
      trap: "Reading a dispute about wording as a dispute about the underlying science.",
    },
  ],
};
