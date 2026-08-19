"use strict";

module.exports = {
  id: "act-reading-p011",
  type: "natural-science",
  title: "What the Smoke Says",
  intro: "This passage is adapted from an article on fire-cued germination in Australian shrublands. The table accompanied the article.",
  content: `A seed lying in the soil of a fire-prone shrubland has one decision to make and no
way to take it back. Germinate in the wrong year and the seedling meets a closed canopy,
a dry summer, and nothing it can do about either. Germinate in the year after a fire and
it meets bare mineral soil, a flush of nutrients from the ash, and, for a season or two,
almost no competition. Species that get this right dominate the recovery. Species that
get it wrong are represented, five years later, by whatever is left in the seed bank.

So the seed has to know that a fire has happened, from underground, without having been
burnt. For most of the twentieth century the assumption was that heat did the telling.
Many shrubland seeds have hard, water-resistant coats, and brief exposure to temperatures
around eighty degrees cracks them, which lets water in. This is a real mechanism and it is
easy to demonstrate in an oven. It also failed to explain a large number of species whose
seed coats are already permeable and which nonetheless sat unmoved through every heat
treatment anyone applied.

The alternative was suggested by nurseries before it was accepted by laboratories. Growers
in South Africa and Western Australia had long claimed that watering trays with water that
smoke had been bubbled through would bring up seed that would otherwise do nothing. In 1990
a controlled trial confirmed it, and in 2004 a group at the University of Western Australia
isolated the active compound: a small molecule produced when cellulose burns, now called
karrikinolide. Concentrations of a few parts per billion are sufficient. It is stable in
soil for years, which means it is not only a signal that a fire has occurred but one that
persists into the seasons when the ash bed is still fertile.

The table below is from a germination trial in which 200 seeds of each of four species were
sown under each of four conditions.

Table 1. Seeds germinating within 21 days, as a percentage of 200 sown

Species          | Untreated | Heat only | Smoke water | Heat and smoke
Actinotus        |     2     |     4     |     61      |       66
Grevillea        |    11     |    48     |     14      |       57
Eucalyptus       |    54     |    57     |     55      |       58
Conospermum      |     1     |     2     |      3      |       44

The four rows are four strategies. Grevillea answers to heat, as the older account
predicted. Actinotus ignores heat entirely and answers to the chemical signal. Eucalyptus
germinates readily whatever is done to it, which is what a species does when its seed is
released from a woody fruit that the fire itself opens — the timing is handled above ground
and the seed needs no cue of its own. Conospermum is the interesting one. Neither treatment
alone lifts it above the untreated rate, and the two together lift it to nearly half.

That last pattern is what a demanding species looks like. Heat alone can be produced by a
hot day on bare sand; smoke alone drifts from a fire two valleys away and settles into soil
that has not itself burnt. A seed that requires both is insisting on evidence that the fire
passed over the ground it is lying in. The cost of that insistence is that Conospermum will
sit through events which its neighbours treat as sufficient, and the benefit is that it
almost never germinates into conditions that will kill it.

The finding has been put to work faster than most. Karrikinolide is now used to raise
species that nurseries could not previously propagate, and restoration projects on mine
sites spray it over sown ground. There is a caution attached, and it is the one the table
makes visible. A single compound applied uniformly to a mixed sowing will favour the
species that answer to it. Applied every year, as some rehabilitation contracts specify, it
does something no fire does: it delivers the signal without delivering the conditions the
signal is supposed to announce.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is primarily concerned with:",
      key: "how seeds detect fire and why species differ in what they require.",
      wrong: [
        ["how a chemical isolated in 2004 was identified in burnt cellulose.", "The discovery is one paragraph, and the passage keeps going for four more."],
        ["why heat-based explanations of germination were entirely mistaken.", "Heat is shown to be a real mechanism that Grevillea answers to, not a mistake."],
        ["how restoration projects on mine sites raise plants from local seed.", "Restoration appears only at the end, as an application with a caution attached."],
      ],
      why: "The passage opens with the seed's problem of timing, then compares heat and smoke as cues, and uses the table to lay out \"four strategies\" that different species follow.",
      steps: [
        "Note what the first paragraph says the seed has to solve.",
        "Check that the option covers both the cue and the variation between species.",
      ],
      hint: "The paragraph after the table names what the rows represent.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, karrikinolide is produced when:",
      key: "plant cellulose is consumed by fire.",
      wrong: [
        ["rainwater dissolves the ash bed.", "Ash is described as a source of nutrients in the seedbed, not of the compound."],
        ["a hard seed coat splits from heat.", "Cracking is what heat does to hard coats; it produces no chemical signal."],
        ["soil is warmed to eighty degrees.", "That temperature is given for coat-cracking, which the passage separates from smoke."],
      ],
      why: "The third paragraph says a group at the University of Western Australia \"isolated the active compound: a small molecule produced when cellulose burns.\"",
      steps: [
        "Find the sentence that names the compound.",
        "Read the description that follows the colon.",
      ],
      hint: "The definition sits in the same sentence as the name.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-outcome",
      difficulty: "Easy",
      stem: "The passage says that germinating in the year after a fire benefits a seedling because that ground offers:",
      key: "bare soil, added nutrients, and little competition.",
      wrong: [
        ["deeper shade, steady moisture, and warmer nights.", "Shade is what the passage says a seedling meets in the wrong year, under a closed canopy."],
        ["fewer seed-eating animals and softer sand.", "Neither predation nor soil texture is mentioned as an effect of fire here."],
        ["a longer growing season and later frosts.", "Season length is never discussed anywhere in the passage."],
      ],
      why: "The first paragraph says a seed germinating after a fire \"meets bare mineral soil, a flush of nutrients from the ash, and, for a season or two, almost no competition.\"",
      steps: [
        "Locate the sentence contrasting the wrong year with the year after a fire.",
        "Take the three conditions it lists.",
      ],
      hint: "The sentence gives three advantages in a row.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the last paragraph, the word *signal* refers to:",
      key: "the chemical evidence that a fire has occurred.",
      wrong: [
        ["the heat that cracks a resistant seed coat.", "Heat is treated as a separate cue, and the paragraph is about the sprayed compound."],
        ["the contract terms that govern a rehabilitation site.", "The contracts specify how often to spray; they are not what the seed detects."],
        ["the bare ground exposed after a fire has passed.", "Bare ground is among the conditions, which the paragraph distinguishes from the signal."],
      ],
      why: "The final sentence says spraying \"delivers the signal without delivering the conditions the signal is supposed to announce,\" and the sprayed substance is karrikinolide.",
      steps: [
        "Identify what is being sprayed in that paragraph.",
        "Note the contrast the sentence draws between signal and conditions.",
      ],
      hint: "The last sentence sets the word against a second term.",
    },
    {
      subskill: "integrate table data",
      family: "reading-a-table",
      difficulty: "Medium",
      stem: "According to Table 1, which species shows the largest increase from the untreated rate when heat alone is applied?",
      key: "Grevillea",
      wrong: [
        ["Actinotus", "Actinotus rises from 2 to 4 under heat, a change of two percentage points."],
        ["Conospermum", "Conospermum rises from 1 to 2 under heat, which the passage calls no lift at all."],
        ["Eucalyptus", "Eucalyptus moves from 54 to 57, and it starts high under every condition."],
      ],
      why: "Table 1 states that Grevillea goes from 11 per cent untreated to 48 per cent under heat only, a rise of 37 points; no other row in the table changes by more than 3 points under that treatment.",
      steps: [
        "Read the untreated and heat-only columns for each row.",
        "Subtract the first from the second in each case.",
        "Compare the four differences rather than the four heat-only values.",
      ],
      hint: "The question asks about change, not about the highest number in the column.",
      trap: "Choosing the species with the largest heat-only figure instead of the largest increase.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Medium",
      stem: "The discussion of Eucalyptus in the paragraph after the table serves mainly to:",
      key: "explain a row in which no treatment makes much difference.",
      wrong: [
        ["show that some species are damaged by exposure to smoke.", "Eucalyptus germinates at a similar rate under every column, including smoke."],
        ["identify the species most useful for restoring burnt ground.", "No species is recommended, and the closing caution warns against favouring any."],
        ["give an example of a seed with an unusually hard outer coat.", "Hard coats belong to the heat-responsive species, which Eucalyptus is not."],
      ],
      why: "The passage says Eucalyptus \"germinates readily whatever is done to it,\" and explains why: its fruit is opened by the fire itself, so \"the timing is handled above ground and the seed needs no cue of its own.\"",
      steps: [
        "Look at the Eucalyptus row and note how little it varies.",
        "Read what the passage offers as the reason for that flatness.",
      ],
      hint: "The explanation is about where the timing is decided.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage suggests that the older heat-based account was incomplete chiefly because:",
      key: "many unresponsive seeds already had permeable coats.",
      wrong: [
        ["laboratory ovens could not reach shrubland temperatures.", "The passage says the mechanism \"is easy to demonstrate in an oven,\" so the equipment worked."],
        ["nursery growers had refused to publish their own results.", "Growers had \"long claimed\" the effect; the claim was available and simply not accepted."],
        ["heat treatments destroyed the seeds before they could sprout.", "No damage from heating is described; the seeds sat unmoved rather than dying."],
      ],
      why: "The second paragraph says the heat mechanism \"failed to explain a large number of species whose seed coats are already permeable and which nonetheless sat unmoved through every heat treatment anyone applied.\"",
      steps: [
        "Find the sentence that states the limit of the heat explanation.",
        "Note that the unexplained seeds had nothing for heat to do.",
      ],
      hint: "If a coat already lets water in, cracking it changes nothing.",
    },
    {
      subskill: "conclusion",
      family: "drawing-a-conclusion",
      difficulty: "Hard",
      stem: "The passage's account of Conospermum best supports the conclusion that requiring two cues:",
      key: "trades lost opportunities for fewer fatal mistakes.",
      wrong: [
        ["produces higher germination than any single cue can.", "Conospermum reaches 44 per cent, below Actinotus and Grevillea at their best."],
        ["makes a species unusually vulnerable to a changed fire regime.", "The passage never discusses altered fire frequency or the risks it would pose."],
        ["shows that heat and smoke act on the same part of the seed.", "The two cues are described as working by different means throughout."],
      ],
      why: "The passage says the cost of insisting on both cues is that Conospermum \"will sit through events which its neighbours treat as sufficient,\" and the benefit is that \"it almost never germinates into conditions that will kill it.\"",
      steps: [
        "Read the sentence that names the cost and the benefit together.",
        "Check the table to confirm that its best figure is not the highest in the trial.",
        "Choose the option that keeps both halves of the trade.",
      ],
      hint: "The paragraph explicitly balances a cost against a benefit.",
      trap: "Reading a more demanding strategy as a straightforwardly better one.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which evidence best supports the claim that a smoke cue can mislead a seed that heat would not?",
      key: "Smoke drifts from fires that never reach the seed's own ground.",
      wrong: [
        ["Karrikinolide remains active in soil for a number of years.", "Persistence helps a seed catch the fertile seasons after a real fire on that site."],
        ["A few parts per billion of the compound are enough to work.", "Sensitivity says how little is needed, not whether the source was a local fire."],
        ["Growers used smoke water long before laboratories accepted it.", "The history of the discovery has no bearing on what the cue can get wrong."],
      ],
      why: "The paragraph on Conospermum says \"smoke alone drifts from a fire two valleys away and settles into soil that has not itself burnt,\" which is why a seed demanding both cues is \"insisting on evidence that the fire passed over the ground it is lying in.\"",
      steps: [
        "Find where the passage says how each cue can be produced without a local fire.",
        "Keep the one that concerns smoke rather than heat.",
        "Reject facts about the compound that do not bear on its source.",
      ],
      hint: "The relevant sentence explains why one cue is weaker evidence than two.",
      trap: "Choosing a striking fact about the compound that does not address being misled.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-practice",
      difficulty: "Hard",
      stem: "The caution in the final paragraph rests on the point that annual spraying:",
      key: "repeats the cue without repeating what it stands for.",
      wrong: [
        ["applies a dose far above what the compound requires.", "The passage gives the effective dose but never says restoration sprays exceed it."],
        ["fails on the species that respond to heat treatment.", "Grevillea does respond to smoke as well when heat accompanies it, and this is not the objection raised."],
        ["costs more than the sites under contract can afford.", "No figures on the expense of restoration appear in the passage."],
      ],
      why: "The last sentence says annual spraying \"does something no fire does: it delivers the signal without delivering the conditions the signal is supposed to announce.\" The cue's value came from what reliably accompanied it.",
      steps: [
        "State what a seed is entitled to infer when it detects the compound.",
        "Ask whether that inference holds on a site sprayed every year.",
        "Choose the option that names the broken link rather than a practical cost.",
      ],
      hint: "A signal works because of what usually comes with it.",
      trap: "Treating the objection as one about dosage or expense.",
    },
  ],
};
