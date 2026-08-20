"use strict";

module.exports = {
  id: "act-reading-p041",
  type: "natural-science",
  title: "How a Swarm Decides",
  intro: "This passage is adapted from an article on collective decision-making in honeybees.",
  content: `When a honeybee colony outgrows its hive, about two-thirds of the workers leave with
the old queen and hang in a cluster on a branch, sometimes for several days. In that time
the swarm must choose a new home, and the choice is close to irreversible: a cluster that
settles in a cavity too small, too damp, or too exposed will not survive the winter. It has
no leader. The queen makes no decisions of any kind, and no individual bee visits more than
one or two candidate sites.

Thomas Seeley spent three decades working out how the choice is made, largely on an island
off the coast of Maine that had no natural cavities, so that every site a swarm could
consider was a box he had put there and measured.

The process begins with a few hundred scouts, older workers who leave the cluster and search
independently over an area of many square kilometres. A scout that finds a cavity inspects it
thoroughly — walking the interior walls, measuring the volume by a route that takes about
forty minutes, noting the size and height of the entrance — and returns to the cluster to
dance. The waggle dance encodes direction and distance in the angle and duration of a
repeated figure, and the scout repeats it a number of times that depends on how good she
judges the site to be. A mediocre cavity gets a few circuits. An excellent one gets a
hundred.

The crucial detail is what happens next, and it is the reason the system converges rather
than deadlocking. A returning scout does not dance indefinitely. Each time she leaves the
cluster and comes back she dances fewer circuits than before, and after a number of trips
she stops dancing altogether and becomes an ordinary member of the audience. This decay is
independent of what other scouts are advertising. A bee does not stop because she has been
persuaded; she stops because she has run out of enthusiasm on a fixed schedule.

The consequence is that support for a site can only be sustained by new recruits going out,
inspecting it themselves, and coming back convinced. A poor site attracts a few dancers whose
displays decay and are not replaced. A good one recruits faster than its advocates fade.
Within a day or two the dancing on the cluster is nearly unanimous, and it is unanimous for a
site that most of the dancers have personally inspected.

The final step is not a count of dancers. Scouts at a candidate cavity monitor how many other
scouts are present there, and when the number at one site passes a threshold — roughly
twenty or thirty bees in the same place at the same time — those scouts return and produce a
signal that warms the whole cluster for flight. The swarm then lifts off and is guided to the
site by the scouts who know where it is. Seeley's experiments showed that the quorum, not the
dance count, is what triggers departure: swarms could be made to leave early by artificially
crowding a site with bees, even a poor one.

The system's properties are worth stating carefully, because they are frequently overstated.
It is accurate: in Seeley's trials, swarms chose the best available cavity in the great
majority of cases. It is not infallible, and it can be fooled by exactly the manipulation
just described. And its accuracy depends on conditions that are easy to state and easy to
lose — scouts search independently, they report honestly, they assess sites themselves rather
than copying an assessment, and their enthusiasm decays whether or not anyone is listening.
Remove any one of those and the swarm still reaches a decision, quickly and unanimously, and
the decision stops being reliably good.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "the mechanism by which a leaderless group chooses well.",
      wrong: [
        ["the difficulty a swarm faces in surviving a winter.", "Winter survival is given as the stake, not as the subject."],
        ["the way the waggle dance encodes distance and direction.", "The dance is one component of the process described."],
        ["the design of the island experiments Seeley carried out.", "The island appears in one sentence explaining experimental control."],
      ],
      why: "The passage describes the search, the dance, the decay of dancing, the quorum, and closes by listing the conditions on which the accuracy of the choice depends.",
      steps: [
        "Note that the opening paragraph stresses the absence of a leader.",
        "Check that the option covers the final paragraph's conditions.",
      ],
      hint: "The first paragraph names what makes the problem hard.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, a scout inspecting a cavity measures its volume by:",
      key: "walking a route inside for about forty minutes.",
      wrong: [
        ["counting the other scouts already present.", "Counting other scouts is how the quorum is assessed later."],
        ["comparing it with the colony's previous hive.", "No comparison with the old hive is described."],
        ["dancing a number of circuits proportional to it.", "The circuits report her judgement; they do not measure the cavity."],
      ],
      why: "The passage says a scout inspects a cavity thoroughly, \"walking the interior walls, measuring the volume by a route that takes about forty minutes.\"",
      steps: [
        "Find the description of an inspection.",
        "Take the method given for volume in particular.",
      ],
      hint: "A duration is attached to the measurement.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-convergence",
      difficulty: "Easy",
      stem: "The passage says support for a site can be sustained only if:",
      key: "new scouts inspect it and return convinced.",
      wrong: [
        ["the original scouts keep dancing for it.", "Each scout's dancing decays and eventually stops entirely."],
        ["the queen moves closer to that direction.", "The queen is said to make no decisions of any kind."],
        ["rival sites are abandoned by their dancers.", "Decay happens independently of what rivals are advertising."],
      ],
      why: "The passage says that because each dancer's display decays, \"support for a site can only be sustained by new recruits going out, inspecting it themselves, and coming back convinced.\"",
      steps: [
        "Note that every dancer eventually stops.",
        "Ask what must happen for a site to keep any advocates.",
      ],
      hint: "The answer follows from the decay described in the paragraph before.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the passage, the word *quorum* refers to:",
      key: "a number of scouts present at one site.",
      wrong: [
        ["a number of circuits danced on the cluster.", "The passage says the trigger is not the dance count."],
        ["the share of the colony that leaves the hive.", "That share is described in the opening paragraph as two-thirds."],
        ["the minimum size a cavity must have.", "Cavity size is assessed by individual scouts, not by a quorum."],
      ],
      why: "The passage says scouts \"monitor how many other scouts are present there, and when the number at one site passes a threshold — roughly twenty or thirty bees in the same place.\"",
      steps: [
        "Read the sentence introducing the threshold.",
        "Note what is being counted and where.",
      ],
      hint: "The count happens at the cavity, not on the cluster.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that a scout's decay in dancing is important because it:",
      key: "prevents an early advocate from dominating.",
      wrong: [
        ["conserves the energy the swarm needs for flight.", "No energetic benefit of the decay is suggested."],
        ["allows the queen to intervene if she chooses.", "The queen makes no decisions at any point."],
        ["ensures that every cavity receives equal attention.", "Poor sites are explicitly left with no advocates."],
      ],
      why: "The passage says the decay \"is independent of what other scouts are advertising\" and that consequently a site's support must be renewed by new bees who have inspected it themselves.",
      steps: [
        "Ask what would happen if a scout could dance indefinitely.",
        "Compare that with what the passage says makes the system converge.",
      ],
      hint: "The paragraph calls this the reason the system converges.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The detail that the island had no natural cavities serves mainly to:",
      key: "show that every option could be controlled.",
      wrong: [
        ["explain why the swarms studied were unusually small.", "Swarm size is not connected to the island in the passage."],
        ["indicate that the bees had been introduced recently.", "Nothing is said about how the bees came to be there."],
        ["establish that the research took three decades.", "The duration is given separately from the island."],
      ],
      why: "The passage says the island was chosen \"so that every site a swarm could consider was a box he had put there and measured.\"",
      steps: [
        "Read the clause following the description of the island.",
        "Note what the arrangement guaranteed for the experimenter.",
      ],
      hint: "The sentence names what he could then know about every site.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which evidence shows that the quorum rather than the dancing triggers departure?",
      key: "Crowding a poor site made swarms leave early.",
      wrong: [
        ["Swarms chose the best cavity in most trials.", "Accuracy shows the system works, not what sets it off."],
        ["An excellent cavity receives about a hundred circuits.", "Dance intensity is the alternative the evidence is testing against."],
        ["A cluster may hang on a branch for several days.", "Duration describes the process rather than its trigger."],
      ],
      why: "The passage says Seeley's experiments showed the quorum is what triggers departure because \"swarms could be made to leave early by artificially crowding a site with bees, even a poor one\" — with dancing unchanged.",
      steps: [
        "Identify the two candidate triggers.",
        "Look for a manipulation that changes one while leaving the other alone.",
        "Reject facts that show the system's accuracy instead.",
      ],
      hint: "The decisive evidence is an intervention, not an observation.",
      trap: "Choosing evidence that the system works when the question asks what starts the flight.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-conditions",
      difficulty: "Hard",
      stem: "The final paragraph's argument depends on distinguishing a group that reaches a decision from one that:",
      key: "reaches a decision worth having.",
      wrong: [
        ["reaches a decision without any disagreement.", "The passage says the swarm becomes unanimous either way."],
        ["reaches a decision faster than its rivals do.", "Speed is preserved even when the conditions are removed."],
        ["reaches a decision that can later be reversed.", "The choice is described as close to irreversible throughout."],
      ],
      why: "The paragraph says that removing any of the listed conditions leaves the swarm still reaching a decision \"quickly and unanimously,\" while \"the decision stops being reliably good.\"",
      steps: [
        "Note the two properties the last sentence separates.",
        "Identify which one survives the loss of the conditions.",
        "Reject options naming properties the passage says are unaffected.",
      ],
      hint: "The last sentence grants three things and withholds one.",
      trap: "Taking unanimity or speed as the quality at stake.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Hard",
      stem: "Which finding, if true, would most weaken the claim that scouts assess sites independently?",
      key: "Scouts dance for cavities they have never entered.",
      wrong: [
        ["Scouts search areas of many square kilometres.", "A wide search is consistent with independent assessment."],
        ["Scouts stop dancing after a fixed number of trips.", "The decay is the passage's own evidence for independence."],
        ["Scouts monitor how many bees are at a cavity.", "Quorum sensing occurs at the site after inspection, not instead of it."],
      ],
      why: "The passage's account requires that each dancer \"assess sites themselves rather than copying an assessment,\" and that the final consensus be one \"most of the dancers have personally inspected.\" Dancing for an uninspected cavity would be copying.",
      steps: [
        "State the condition the claim asserts.",
        "Find the observation that would directly violate it.",
        "Reject findings that the passage already reports as part of the system.",
      ],
      hint: "Independence fails if a bee advertises on someone else's word.",
      trap: "Choosing a feature of the system that supports rather than undercuts the claim.",
    },
    {
      subskill: "synthesize information",
      family: "combining-sections",
      difficulty: "Medium",
      stem: "Taken together, the paragraphs on decay and on the quorum indicate that the swarm's accuracy and its speed are produced by:",
      key: "two separate mechanisms doing different jobs.",
      wrong: [
        ["one mechanism operating at two different scales.", "Dance decay and site crowding are described as distinct processes."],
        ["the same scouts performing both roles at once.", "Scouts do both, but the passage separates the jobs the mechanisms do."],
        ["a comparison between rival sites on the cluster.", "The passage says decay is independent of what rivals advertise."],
      ],
      why: "The passage says a good site \"recruits faster than its advocates fade,\" so dance decay is what filters sites by quality; it then states that the quorum at a cavity, not the dance count, is what triggers departure.",
      steps: [
        "State what the decay accomplishes.",
        "State what the quorum accomplishes.",
        "Choose the option that keeps them distinct.",
      ],
      hint: "One mechanism selects and the other launches.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The remark that a bee \"does not stop because she has been persuaded\" indicates that the decay is:",
      key: "internal rather than a response to rivals.",
      wrong: [
        ["a sign that the site she found was poor.", "Even excellent sites' dancers decay on the same schedule."],
        ["evidence that she has forgotten the location.", "Nothing suggests scouts lose the information they carry."],
        ["caused by fatigue from the long inspection.", "No physical cause of the decline is offered in the passage."],
      ],
      why: "The passage says the decay \"is independent of what other scouts are advertising\" and that a bee \"stops because she has run out of enthusiasm on a fixed schedule.\"",
      steps: [
        "Read the two sentences around the remark.",
        "Note what they rule out and what they substitute.",
      ],
      hint: "The schedule is described as fixed.",
    },
  ],
};
