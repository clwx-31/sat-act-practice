"use strict";

module.exports = {
  id: "act-reading-p052",
  type: "natural-science",
  title: "The Ships That Broke in Half",
  intro: "This passage is adapted from an article on a failure in wartime shipbuilding.",
  content: `On a January morning in 1943 the tanker Schenectady, tied up at her fitting-out dock
in Portland with a calm sea and no cargo working, broke in two. The fracture ran from the
deck down through the hull on both sides in a fraction of a second, and the two halves
settled onto the bottom of the river while the middle of the ship rose clear of the water.
Nobody had been doing anything to her. She had been sitting still.

Schenectady was one of the emergency ships built to a standard design in unprecedented
numbers, and she was not alone. Of the roughly five thousand vessels built to those designs,
several hundred developed serious hull cracks and about twenty broke completely in half.
The failures clustered in cold water and in winter, and several occurred, like this one, with
the ship at rest.

The obvious suspect was welding. Ships had been riveted for a century, and the emergency
programme welded them instead, because welding is faster and can be done by workers trained
in weeks rather than years. The explanation was popular, it was partly right, and it was
wrong about the mechanism, which mattered because the fix that follows from it is different.

A riveted hull is not stronger than a welded one. What it is, is discontinuous. A crack that
starts in a riveted plate runs to the edge of that plate and stops, because the next plate is
a separate piece of steel and the crack has to start again to continue. A welded hull is one
continuous object, and a crack that starts anywhere can run the length of it. Welding did not
cause the cracks. It removed the thing that had always been quietly stopping them.

That left the question of why the cracks started, and the answer came from a metallurgist at
Cambridge, Constance Tipper, who had been working on the fracture of steel before the war.
Steel of the kind used in those hulls has a transition temperature. Above it the metal is
ductile: a crack advancing through it must deform the material ahead of it, which absorbs
energy, and the crack stops. Below it the same steel is brittle, and a crack propagates by
splitting the crystal structure, which takes very little energy and can run at a large
fraction of the speed of sound. The transition is not gradual. For a given steel it can be a
matter of a few degrees.

The steel in the emergency programme had a transition temperature near, and in some batches
above, the temperature of the North Atlantic in winter. Tipper's insight was that the failures
were not overload failures at all. The ships were not being asked to carry more than they
could. They were being made of a material that changed its character in cold water, and the
stress concentrations that started the cracks — a square hatch corner, a weld defect, a
poorly finished cut — were ordinary features that a ductile hull would have tolerated
indefinitely.

The remedies followed directly and all three are still in use. Hatch corners were rounded, to
remove the concentrations. Steel specifications were changed to lower the transition
temperature, which is a matter of composition and grain size. And riveted crack-arrestor
strakes were built back into welded hulls, restoring the discontinuity that riveting had
supplied by accident — a deliberate reconstruction of a property nobody had known they were
relying on until it was gone.

The episode is a standard teaching case, and what it is usually taught for is the last
point rather than the metallurgy. An old design carries properties its designers never
wrote down, because nobody writes down what has never failed. Replace it with something
better on every dimension anybody measured, and the dimensions nobody measured go with it.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "how the real cause of a failure differed from the obvious one.",
      wrong: [
        ["why welded hulls are weaker than riveted hulls.", "The passage says a riveted hull is not stronger, only discontinuous."],
        ["how emergency ships were built in unprecedented numbers.", "Production scale is background to the failures described."],
        ["why steel becomes more brittle as it grows older.", "The transition described depends on temperature, not on age."],
      ],
      why: "The passage says the welding explanation \"was partly right, and it was wrong about the mechanism,\" then traces the cracks to a transition temperature and to ordinary stress concentrations.",
      steps: [
        "Note the verdict given on the obvious suspect.",
        "Check that the option covers both why cracks started and why they ran.",
      ],
      hint: "Two separate questions are answered: starting and spreading.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, when Schenectady broke in two she was:",
      key: "tied up at a dock and at rest.",
      wrong: [
        ["loaded and under way in heavy weather.", "The passage says the sea was calm and no cargo was working."],
        ["carrying a full cargo across the Atlantic.", "She was at her fitting-out dock with no cargo working."],
        ["being repaired after an earlier hull crack.", "No prior damage to this ship is described."],
      ],
      why: "The passage says she broke \"tied up at her fitting-out dock in Portland with a calm sea and no cargo working,\" and adds that she \"had been sitting still.\"",
      steps: [
        "Read the first sentence of the passage.",
        "Note the conditions it lists.",
      ],
      hint: "The paragraph ends by stressing that nothing was happening.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-property",
      difficulty: "Easy",
      stem: "The passage says a crack in a riveted hull stops at a plate edge because the next plate is:",
      key: "a separate piece of steel.",
      wrong: [
        ["thicker than the plate that cracked.", "No difference in plate thickness is described."],
        ["made of a more ductile alloy.", "Composition differences between plates are not mentioned."],
        ["held under less stress by the rivets.", "The passage attributes the effect to discontinuity, not to stress levels."],
      ],
      why: "The passage says a crack \"runs to the edge of that plate and stops, because the next plate is a separate piece of steel and the crack has to start again to continue.\"",
      steps: [
        "Locate the sentence about cracks in riveted hulls.",
        "Read the clause introduced by *because*.",
      ],
      hint: "The reason is about where one piece ends and another begins.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the passage, the word *ductile* describes steel that:",
      key: "deforms ahead of an advancing crack.",
      wrong: [
        ["resists corrosion in cold seawater.", "Corrosion is not discussed anywhere in the passage."],
        ["splits along its crystal structure.", "That describes brittle behaviour, the opposite case."],
        ["can be welded without any defects.", "Weldability is not what the term is being used to mean."],
      ],
      why: "The passage says that above the transition temperature \"a crack advancing through it must deform the material ahead of it, which absorbs energy, and the crack stops.\"",
      steps: [
        "Find the sentence defining the term.",
        "Note what it says happens in front of the crack.",
      ],
      hint: "The definition is given in terms of energy absorption.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that the same ships would have been far less likely to fail if they had operated:",
      key: "in warmer water throughout the year.",
      wrong: [
        ["with smaller cargoes than they carried.", "The passage says the ships were not being overloaded."],
        ["at lower speeds in open ocean.", "Speed is never linked to the failures."],
        ["with rounded hatch corners only.", "That is one remedy among three, not a sufficient condition."],
      ],
      why: "The passage says the steel's transition temperature was \"near, and in some batches above, the temperature of the North Atlantic in winter,\" and that failures clustered in cold water and in winter.",
      steps: [
        "Note where and when the failures clustered.",
        "Connect that to the property the steel is said to have.",
      ],
      hint: "The material changes character at a temperature.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The detail that Schenectady was at rest when she broke serves mainly to:",
      key: "rule out overload as the explanation.",
      wrong: [
        ["show that the crew had been badly trained.", "No crew action is described or blamed in the passage."],
        ["establish how quickly the fracture travelled.", "Speed is given later, in the account of brittle fracture."],
        ["explain why the two halves settled upright.", "How she settled is described but not accounted for."],
      ],
      why: "Tipper's insight was that \"the failures were not overload failures at all. The ships were not being asked to carry more than they could,\" and a ship at a dock with no cargo working is the clearest case of that.",
      steps: [
        "Ask what a failure under no load rules out.",
        "Find the claim later in the passage that this supports.",
      ],
      hint: "The first paragraph insists that nothing was being done to her.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The passage is organised as:",
      key: "an incident, a wrong diagnosis, the right one, and its remedies.",
      wrong: [
        ["a biography of a metallurgist and her wartime work.", "Tipper appears in one paragraph as the source of the explanation."],
        ["a comparison of riveting and welding as techniques.", "The comparison serves one step of the argument, not the whole."],
        ["a chronological history of emergency shipbuilding.", "Only the failures and their analysis are covered."],
      ],
      why: "The passage opens with Schenectady, reports the popular welding explanation and corrects it, presents Tipper's transition-temperature account, and closes with three remedies.",
      steps: [
        "Label each paragraph with the job it performs.",
        "Check that the option accounts for the closing paragraph.",
      ],
      hint: "The third paragraph names an explanation the passage goes on to amend.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which fact best supports the claim that welding removed a protection rather than creating a weakness?",
      key: "A riveted hull halts a crack at every plate edge.",
      wrong: [
        ["Welders could be trained in weeks rather than years.", "Training time explains why welding was adopted, not its effect."],
        ["Several hundred of the ships developed serious cracks.", "The number of failures does not distinguish the two accounts."],
        ["Failures clustered in winter and in cold water.", "The seasonal pattern points to the steel, not to the joining method."],
      ],
      why: "The passage says a riveted hull \"is discontinuous\" and a crack \"has to start again to continue,\" concluding that welding \"removed the thing that had always been quietly stopping them.\"",
      steps: [
        "State the two rival readings of welding's role.",
        "Look for the fact about riveting that distinguishes them.",
        "Reject facts about adoption or about the cold.",
      ],
      hint: "The evidence must describe what riveting was doing.",
      trap: "Choosing the seasonal pattern, which bears on why cracks started rather than why they ran.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-explanation",
      difficulty: "Hard",
      stem: "The passage says the mechanism mattered, even though the welding explanation was partly right, because:",
      key: "a different diagnosis implies a different repair.",
      wrong: [
        ["a popular explanation is usually mistaken in full.", "The passage grants that this one was partly right."],
        ["welding could not have been abandoned in wartime.", "Feasibility of returning to riveting is not discussed."],
        ["the ships would otherwise have been blamed on the crews.", "No question of blaming crews is raised in the passage."],
      ],
      why: "The passage says the explanation \"was wrong about the mechanism, which mattered because the fix that follows from it is different,\" and the eventual remedies address steel, geometry, and discontinuity together.",
      steps: [
        "Find the clause explaining why the mechanism mattered.",
        "Compare the remedies adopted with what the welding account would suggest.",
        "Reject options about blame or wartime constraints.",
      ],
      hint: "The sentence states the reason immediately.",
      trap: "Treating a partly correct explanation as harmless.",
    },
    {
      subskill: "strengthen or weaken",
      family: "strengthening-a-position",
      difficulty: "Hard",
      stem: "Which finding would most strengthen Tipper's account of why the cracks began?",
      key: "Identical hulls in warm ports never developed the fractures.",
      wrong: [
        ["Riveted ships of the same era also cracked at hatch corners.", "Cracking in riveted ships would support the discontinuity point instead."],
        ["Welders on the programme had a high rate of defective seams.", "Defects are one trigger the account already treats as ordinary."],
        ["The emergency designs used thinner plate than earlier ships.", "Thinner plate would suggest an overload story, which Tipper rejects."],
      ],
      why: "The passage says the steel's transition temperature was \"near, and in some batches above, the temperature of the North Atlantic in winter,\" so hulls failing only in cold water would isolate temperature as the operative variable.",
      steps: [
        "State the variable Tipper's account makes decisive.",
        "Look for evidence that varies that alone.",
        "Reject findings supporting a different account.",
      ],
      hint: "The account rests on temperature, so a temperature comparison is what tests it.",
      trap: "Choosing a fact about welding quality, which the account already accommodates.",
    },
    {
      subskill: "conclusion",
      family: "drawing-a-conclusion",
      difficulty: "Medium",
      stem: "The passage's closing description of crack-arrestor strakes supports the conclusion that engineers:",
      key: "had depended on a property they never specified.",
      wrong: [
        ["should have kept riveting the hulls entirely.", "The remedy adds strakes to welded hulls rather than abandoning welding."],
        ["found the new steel specifications insufficient.", "All three remedies are described as complementary and still in use."],
        ["had known about brittle fracture before the war.", "Tipper's prewar work is hers, and the shipbuilders are not credited with it."],
      ],
      why: "The passage calls the strakes \"a deliberate reconstruction of a property nobody had known they were relying on until it was gone.\"",
      steps: [
        "Read the final clause of the passage.",
        "Note what it says about awareness of the property.",
      ],
      hint: "The last words describe when the reliance became visible.",
    },
  ],
};
