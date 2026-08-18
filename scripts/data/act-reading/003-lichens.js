"use strict";

module.exports = {
  id: "act-reading-p003",
  type: "natural-science",
  title: "Two Organisms, One Name",
  intro: "This passage is adapted from an article on symbiosis.",
  content: `A lichen looks like a single thing. It grows on a rock as one crust, spreads
at one rate, dies at one time, and has been given one Latin name. For most of the
history of biology this was taken to be a description rather than an assumption.

In 1867 Simon Schwendener proposed that a lichen is not an organism but an
association: a fungus and an alga living together, the fungus providing structure and
mineral capture, the alga providing sugar through photosynthesis. The proposal was
received badly. Lichenologists of the period had spent careers describing lichen
species, and the claim implied that every one of those species was a partnership that
had been misfiled as an individual. One prominent critic called the theory a romance.

Schwendener was right, and the evidence that settled it was not subtle. A lichen can be
pulled apart. Grown separately in the laboratory, the fungal partner produces a
shapeless mass with none of the structure the lichen shows on the rock, and the algal
partner grows as ordinary green cells. Put back together under the right conditions of
moisture and light, they reassemble into the familiar form. The lichen is the
relationship, not either party to it.

What took much longer to establish was how unequal the relationship is, and whether
"partnership" is the right word for it at all. The fungus is not merely housing the
alga. It penetrates the algal cells with specialised structures and draws off sugar,
and in some species the rate of extraction is high enough that the algal population
cannot grow. Left alone, the alga would divide freely; inside the lichen it divides
just fast enough to replace what the fungus consumes. Some biologists have described
this as controlled parasitism, and the description is difficult to argue with on the
evidence of the transfer rates alone.

But transfer rates are not the whole account. The alga inside a lichen occupies places
no free-living alga can occupy: bare rock in full sun, Arctic scree, the surfaces of
desert stones. It survives desiccation that would kill it outside, because the fungal
tissue holds water and shades the cells. Whether this counts as compensation depends on
what one thinks a measure of benefit should be. Counted as sugar, the alga loses.
Counted as territory, it wins ground it could not otherwise hold. The two accountings
do not reduce to each other, and the argument over which to prefer has continued for a
century without resolution, which is a sign that it is not really an empirical argument.

The picture became more complicated in 2016, when a survey of lichen genomes found a
second fungus present in a wide range of species — a yeast, embedded in the outer
layer, previously overlooked because it is not visible in the sections lichenologists
had been cutting for a hundred and fifty years. Its presence correlated with the
production of certain compounds and with differences in appearance that had been used
to separate species. Two lichens classified as distinct on the basis of colour and
chemistry turned out to have identical primary partners and different yeasts.

The finding did not overturn Schwendener. It extended his point in a direction he did
not anticipate: that the boundary drawn around a lichen and called a species is a
boundary drawn by an observer, and that observers had drawn it around whatever they
could see. Later work has found further partners in some species, and the number is not
obviously converging.

There is a temptation to state the lesson as a slogan — that no organism is truly
individual, that all life is collaboration. This overstates the case in a way the
evidence does not support. A wolf is an individual by any measure one cares to apply.
The lichen is interesting precisely because it is not typical: it is a case where the
ordinary boundary fails, and the failure is instructive about how the boundary is
normally drawn, which is mostly by looking.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-argument",
      difficulty: "Medium",
      stem: "The passage is primarily concerned with:",
      key: "how the case of lichens exposes the way biological boundaries get drawn.",
      wrong: [
        ["why nineteenth-century lichenologists resisted a well-supported theory.", "The resistance occupies one paragraph and is resolved by the third; the passage continues well past it."],
        ["the mechanisms by which fungi extract sugar from algal cells inside lichens.", "The mechanism is described in service of the argument about partnership, not as the subject."],
        ["whether all living organisms are best understood as cooperative assemblies.", "The final paragraph rejects exactly this generalisation as overstating the case."],
      ],
      why: "The closing paragraph names the point: the lichen \"is a case where the ordinary boundary fails, and the failure is instructive about how the boundary is normally drawn.\" The earlier sections build to that.",
      steps: [
        "Read the last paragraph, which states what the case is interesting for.",
        "Check that the answer covers the whole passage and not one section of it.",
      ],
      hint: "The author explicitly refuses one tempting summary.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, a fungal partner grown by itself in the laboratory:",
      key: "forms a shapeless mass without the lichen's structure.",
      wrong: [
        ["dies within days unless algal cells are introduced.", "Nothing in the passage says the isolated fungus dies; it grows, only formlessly."],
        ["produces the same crust it forms on an exposed rock.", "The passage says it produces none of the structure the lichen shows."],
        ["begins to photosynthesise using pigments of its own.", "Photosynthesis is attributed throughout to the algal partner."],
      ],
      why: "The third paragraph states that grown separately, \"the fungal partner produces a shapeless mass with none of the structure the lichen shows on the rock.\"",
      steps: [
        "Find the paragraph describing the separation experiment.",
        "Read what is said about the fungus specifically.",
      ],
      hint: "The paragraph treats each partner in turn.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The detail that the alga divides \"just fast enough to replace what the fungus consumes\" indicates that:",
      key: "the algal population inside a lichen does not increase.",
      wrong: [
        ["the fungus adjusts its consumption to the alga's growth.", "The passage describes the constraint running the other way, from extraction rate to division rate."],
        ["the alga reproduces faster inside a lichen than outside.", "The passage says the reverse: left alone it would divide freely."],
        ["both partners reproduce at rates set by available light.", "Light is mentioned only for reassembly conditions, not as a rate control."],
      ],
      why: "The sentence before it says the extraction rate is high enough that \"the algal population cannot grow,\" and the quoted clause restates that as a balance between division and consumption.",
      steps: [
        "Read the sentence preceding the quoted clause.",
        "Translate the balance into a statement about population size.",
      ],
      hint: "Replacement means no net change.",
    },
    {
      subskill: "cause and effect",
      family: "cause-and-effect",
      difficulty: "Easy",
      stem: "The passage states that the alga in a lichen survives desiccation because:",
      key: "fungal tissue retains water and shades the cells.",
      wrong: [
        ["it produces protective compounds under bright light.", "Compound production is associated in the passage with the yeast, not with drought survival."],
        ["it enters a dormant state until moisture returns.", "Dormancy is never mentioned; the mechanism given is structural."],
        ["the rock beneath it holds moisture through the day.", "The rock is described as bare and sun-exposed, not as a water source."],
      ],
      why: "The fifth paragraph says it survives desiccation \"because the fungal tissue holds water and shades the cells.\"",
      steps: [
        "Locate the sentence about desiccation.",
        "Take the clause introduced by *because*.",
      ],
      hint: "The reason is given in the same sentence.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Hard",
      stem: "The passage implies that the dispute over whether lichens are partnerships or parasitism persists because:",
      key: "the two sides measure benefit by incompatible standards.",
      wrong: [
        ["the transfer rates between partners have never been measured.", "The passage treats transfer rates as measured and as hard to argue with."],
        ["new partner species keep being discovered in the same lichens.", "That finding is later and is used to complicate species boundaries, not this dispute."],
        ["laboratory conditions differ too much from conditions on rock.", "The laboratory work is presented as decisive for Schwendener's claim, not as suspect."],
      ],
      why: "The passage says \"counted as sugar, the alga loses. Counted as territory, it wins,\" that the two accountings \"do not reduce to each other,\" and that the century-long persistence is \"a sign that it is not really an empirical argument.\"",
      steps: [
        "Find the two contrasting accountings.",
        "Read the author's comment on why the argument has not resolved.",
      ],
      hint: "The author says what kind of argument it is not.",
      trap: "Assuming an unresolved scientific question must be short of data.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The mention of the wolf in the final paragraph serves to:",
      key: "limit the conclusion the lichen case can be made to support.",
      wrong: [
        ["contrast a predator's biology with that of a symbiotic organism.", "The wolf's biology is not described; only its status as an individual is used."],
        ["introduce a second example of overlooked symbiotic partners.", "The wolf is offered as a case where no such complication arises."],
        ["suggest that mammals were studied more carefully than lichens.", "No comparison of research effort is made anywhere in the passage."],
      ],
      why: "The paragraph rejects the slogan that \"no organism is truly individual\" and offers the wolf as the counter-case: \"a wolf is an individual by any measure one cares to apply.\"",
      steps: [
        "Identify the claim the paragraph says is overstated.",
        "Ask what work an obvious individual does against that claim.",
      ],
      hint: "The wolf appears immediately after a slogan is rejected.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Medium",
      stem: "As it is used in the second paragraph, the word *romance* most nearly means:",
      key: "an appealing story unsupported by evidence.",
      wrong: [
        ["a detailed account of a long historical process.", "The critic is dismissing the theory, not praising its detail."],
        ["a theory too complex for its period to assess.", "The objection described is to the claim's implications, not its complexity."],
        ["an affectionate description of a natural process.", "The word is used as an insult by a prominent critic."],
      ],
      why: "The sentence reports that the proposal \"was received badly\" and that a critic \"called the theory a romance\" — the word is doing the work of a dismissal, marking the idea as invention rather than fact.",
      steps: [
        "Note that the word is quoted from a hostile critic.",
        "Choose the reading that makes it a criticism.",
      ],
      hint: "The surrounding sentences are all about rejection.",
    },
    {
      subskill: "strengthen or weaken",
      family: "evidence-evaluation",
      difficulty: "Hard",
      stem: "Which finding, if true, would most weaken the description of the fungus as a controlled parasite?",
      key: "Algal cells inside lichens divide faster than free ones.",
      wrong: [
        ["A third fungal partner is found in most lichen species.", "Additional partners complicate species boundaries without addressing the transfer balance."],
        ["Some lichens survive on rock surfaces for many centuries.", "Longevity of the lichen says nothing about the algal partner's cost."],
        ["The fungus can be cultured without any algal partner present.", "The passage already reports this and treats it as consistent with the parasitism reading."],
      ],
      why: "The parasitism description rests on the claim that extraction holds the algal population flat — \"inside the lichen it divides just fast enough to replace what the fungus consumes.\" A higher division rate inside than outside would contradict that premise directly.",
      steps: [
        "State the premise the parasitism description depends on.",
        "Look for the option that contradicts that premise rather than the conclusion.",
      ],
      hint: "Attack the measurement the description is built on.",
      trap: "Choosing a finding that is merely surprising rather than one that touches the premise.",
    },
    {
      subskill: "synthesize information",
      family: "combine-passage-sections",
      difficulty: "Hard",
      stem: "Taken together, the 2016 yeast finding and the passage's closing argument suggest that lichen species were separated largely by:",
      key: "traits an observer could see with existing methods.",
      wrong: [
        ["the identity of the algal partner in each specimen.", "The finding was that two species had identical primary partners and differed only in yeast."],
        ["the environments in which each specimen was collected.", "Habitat is discussed for the alga's benefit, never as a basis for classification."],
        ["the rate at which each specimen grew on bare rock.", "Growth rate appears in the opening description, not as a taxonomic criterion."],
      ],
      why: "The yeast had been \"previously overlooked because it is not visible in the sections lichenologists had been cutting,\" and the closing paragraph says observers drew the boundary \"around whatever they could see... which is mostly by looking.\"",
      steps: [
        "Take the reason the yeast was missed.",
        "Join it to the closing claim about how boundaries get drawn.",
      ],
      hint: "Both passages of text mention what could and could not be seen.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The passage is organised as a sequence in which:",
      key: "a settled correction is followed by complications it did not foresee.",
      wrong: [
        ["a controversy is described and then resolved by new evidence.", "The partnership-or-parasitism dispute is explicitly left unresolved."],
        ["a method is explained and then applied to several examples.", "Only one organism is examined throughout; no second example is worked."],
        ["a common belief is stated and then confirmed in detail.", "The common belief that a lichen is one organism is overturned, not confirmed."],
      ],
      why: "Schwendener's correction is established as right by the third paragraph, after which the passage raises the unequal-exchange question, the 2016 yeast, further partners, and finally the limits of the lesson.",
      steps: [
        "Mark where the original question is settled.",
        "Notice how much of the passage comes after that point.",
      ],
      hint: "The passage does not end where the argument is won.",
    },
  ],
};
