"use strict";

module.exports = {
  id: "act-reading-p029",
  type: "natural-science",
  title: "The Hole That Was Filtered Out",
  intro: "This passage is adapted from an article on the discovery of Antarctic ozone depletion.",
  content: `The British Antarctic Survey has measured the ozone column above Halley Bay every
spring since 1957, with an instrument designed in the 1920s that works by comparing the
intensity of two ultraviolet wavelengths in scattered daylight. The instrument is simple,
the measurement is tedious, and by the early 1980s the programme was regarded within the
Survey as a routine obligation that somebody had to keep up.

In 1982 Joe Farman's readings came back roughly thirty per cent below the values recorded in
the 1960s. His first assumption was that the instrument was failing, which is the correct
first assumption. He had it checked. The next spring the depletion was deeper. In 1984 he
brought a second, newly calibrated instrument to a different Antarctic station, obtained the
same result, and only then wrote it up. The paper appeared in *Nature* in May 1985 and
reported that springtime ozone above Antarctica had fallen by more than a third.

The reaction included a question that has since become the most repeated detail of the
story. NASA had been mapping total ozone from satellites since 1978, over the whole planet,
continuously. Why had a satellite covering all of Antarctica every day missed something a
man with a 1920s instrument at one station had found?

The answer is not that the satellite failed to see it. The satellite saw it. The data
processing was set to flag values below 180 Dobson units as physically implausible and to
route them for inspection rather than into the published maps, because the lowest reading
ever recorded anywhere was well above that and a number below it was, on all prior
experience, an instrument fault. When the Halley Bay paper appeared, the flagged values were
retrieved from storage. They showed the depletion clearly, and they showed it developing
from 1979.

It is worth being precise about what went wrong, because the episode is often told as a
parable about trusting computers and it is not one. Screening implausible values is not a
mistake; a satellite instrument does fail, and a processing chain that published every
anomaly would publish mostly noise. The mistake was narrower. The threshold had been set
from historical experience and then left alone, and nothing in the system asked how often
the flag was firing or whether the flagged points were clustered in one place and one
season. A rejected measurement was treated as an absence of information rather than as
information about the screen.

The same failure is available to anyone who sets a limit and forgets it. A hospital monitor
that discards impossible readings, a bank system that quarantines improbable transactions,
and a laboratory that reruns any assay outside an expected range are all doing something
sensible, and all of them will hide a genuine change of the same shape: large, sudden, and
in the direction nobody had provided for. The protection is cheap and it is not technical.
Somebody has to look at what the filter is catching, on a schedule, and ask whether the
rejects have begun to form a pattern.

The rest moved with a speed that has no parallel in environmental policy. The chemistry
linking chlorofluorocarbons to ozone loss had been proposed in 1974 by Molina and Rowland,
and had been argued over for a decade without much consequence. The measurements made the
argument concrete, and they were unusually favourable to action: the affected region was
uninhabited, the substances involved were made by a small number of firms, and workable
substitutes existed or could be developed. The Montreal Protocol was signed in 1987, two
years after the paper, and has since been ratified by every country in the world, which no
other treaty has managed.

Atmospheric chlorine peaked in the late 1990s and has been declining since. The Antarctic
hole is expected to close in the 2060s, which is the timescale on which a molecule with an
atmospheric lifetime of fifty to a hundred years lets you act. That number is the part of
the story worth carrying: the decision was taken quickly, by the standards of these things,
and the recovery still takes eighty years.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "how a discovery was made, missed, and acted on.",
      wrong: [
        ["why satellite instruments are less reliable than ground ones.", "The passage says the satellite saw the depletion and blames the processing."],
        ["how chlorofluorocarbons destroy ozone in the upper atmosphere.", "The chemistry is mentioned in one clause and never explained."],
        ["why environmental treaties usually fail to be ratified.", "The Montreal Protocol is described as ratified by every country."],
      ],
      why: "The passage covers Farman's measurements, the satellite data that had been screened out, the analysis of what went wrong, and the treaty and its timescale.",
      steps: [
        "List the four things the passage's sections describe.",
        "Choose the option that covers all of them rather than one.",
      ],
      hint: "No single paragraph is the whole passage.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, before publishing, Farman confirmed his result by:",
      key: "repeating it with a second instrument elsewhere.",
      wrong: [
        ["comparing his data with the satellite record.", "The satellite values were retrieved only after the paper appeared."],
        ["waiting until the depletion stopped deepening.", "The depletion was still deepening when he published."],
        ["consulting the chemists who had proposed the mechanism.", "Molina and Rowland's work is cited, but no consultation is described."],
      ],
      why: "The passage says that in 1984 he \"brought a second, newly calibrated instrument to a different Antarctic station, obtained the same result, and only then wrote it up.\"",
      steps: [
        "Find the sentence describing what he did in 1984.",
        "Note the phrase that marks the sequence: only then.",
      ],
      hint: "A new instrument and a new station are both named.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-omission",
      difficulty: "Easy",
      stem: "The passage says the satellite's lowest readings did not reach the published maps because they were:",
      key: "below a threshold set for implausible values.",
      wrong: [
        ["collected only during the Antarctic winter.", "The measurements are described as continuous and daily over Antarctica."],
        ["lost when the storage system was replaced.", "The flagged values were retrieved from storage intact in 1985."],
        ["taken at wavelengths the instrument could not read.", "Wavelengths are discussed for the ground instrument, not the satellite."],
      ],
      why: "The passage says processing \"was set to flag values below 180 Dobson units as physically implausible and to route them for inspection rather than into the published maps.\"",
      steps: [
        "Locate the sentence describing the processing rule.",
        "Note where the flagged values went instead.",
      ],
      hint: "A number is given as the cut-off.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the fifth paragraph, the word *screen* refers to:",
      key: "the rule that set values aside automatically.",
      wrong: [
        ["the display on which maps were published.", "No display or presentation device is discussed in the paragraph."],
        ["the atmospheric layer that absorbs ultraviolet light.", "Ozone's absorption is not what the paragraph is about."],
        ["the review that scientists gave a submitted paper.", "Peer review is not mentioned anywhere in the passage."],
      ],
      why: "The paragraph says a rejected measurement \"was treated as an absence of information rather than as information about the screen,\" referring back to the threshold rule described above it.",
      steps: [
        "Find what the paragraph has been calling the threshold arrangement.",
        "Substitute that into the final sentence and check it reads correctly.",
      ],
      hint: "The word names the thing doing the rejecting.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that the processing system would have caught the problem if it had monitored:",
      key: "how often and where the flag was firing.",
      wrong: [
        ["the calibration of the ground instrument at Halley Bay.", "The ground instrument was not part of the satellite processing chain."],
        ["the total number of measurements taken each year.", "Volume alone would not reveal a cluster of rejected values."],
        ["the chemistry proposed by Molina and Rowland in 1974.", "The chemistry is a separate matter from the data screening."],
      ],
      why: "The passage says \"nothing in the system asked how often the flag was firing or whether the flagged points were clustered in one place and one season.\"",
      steps: [
        "Find the sentence naming what the system failed to ask.",
        "Note that both parts of the question concern the rejections themselves.",
      ],
      hint: "The failure is described as two unasked questions.",
    },
    {
      subskill: "function",
      family: "function-of-a-qualification",
      difficulty: "Medium",
      stem: "The author's remark that screening implausible values \"is not a mistake\" serves mainly to:",
      key: "narrow the fault to how the screen was maintained.",
      wrong: [
        ["defend the satellite team against any criticism at all.", "The paragraph goes on to identify a definite mistake."],
        ["show that the ground measurements were also screened.", "No screening of the Halley Bay readings is described."],
        ["argue that automated processing should be abandoned.", "The passage says a chain publishing every anomaly would publish noise."],
      ],
      why: "The paragraph says the episode \"is often told as a parable about trusting computers and it is not one,\" then locates the error: the threshold \"had been set from historical experience and then left alone.\"",
      steps: [
        "Note what the sentence rules out as the mistake.",
        "Read the sentences that follow, which say what the mistake was.",
      ],
      hint: "The remark clears the ground before the real charge is made.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which fact best supports the claim that the satellite had detected the depletion?",
      key: "The stored flagged values showed it developing from 1979.",
      wrong: [
        ["The satellite had covered Antarctica daily since 1978.", "Coverage shows opportunity to detect, not that a signal was recorded."],
        ["The threshold was set from all prior recorded readings.", "How the threshold was chosen bears on the error, not on detection."],
        ["Farman's 1984 result came from a second instrument.", "This confirms the ground measurement rather than the satellite's."],
      ],
      why: "The passage says that when the paper appeared, \"the flagged values were retrieved from storage. They showed the depletion clearly, and they showed it developing from 1979.\"",
      steps: [
        "Distinguish having the chance to observe from having observed.",
        "Look for the sentence reporting what the retrieved data contained.",
        "Reject facts about coverage or about the ground station.",
      ],
      hint: "The evidence has to describe what the data actually showed.",
      trap: "Choosing the satellite's coverage, which establishes opportunity rather than detection.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-case",
      difficulty: "Hard",
      stem: "The passage attributes the speed of the policy response chiefly to conditions that:",
      key: "made action unusually cheap to agree on.",
      wrong: [
        ["proved the chemistry beyond any remaining doubt.", "The chemistry had been argued over for a decade without consequence."],
        ["threatened a large and politically powerful population.", "The passage stresses that the affected region was uninhabited."],
        ["allowed the treaty to be enforced without inspections.", "Enforcement machinery is not discussed anywhere in the passage."],
      ],
      why: "The passage lists the favourable conditions: \"the affected region was uninhabited, the substances involved were made by a small number of firms, and workable substitutes existed or could be developed.\"",
      steps: [
        "Find the list of conditions the passage calls favourable to action.",
        "Ask what those three have in common.",
        "Reject options that name a factor the passage rules out.",
      ],
      hint: "Few opponents, few producers, available alternatives.",
      trap: "Assuming the science alone explains the speed, which the passage denies.",
    },
    {
      subskill: "conclusion",
      family: "drawing-a-conclusion",
      difficulty: "Hard",
      stem: "The final paragraph is best understood as making the point that:",
      key: "even prompt action buys a very slow repair.",
      wrong: [
        ["the treaty has failed to reduce atmospheric chlorine.", "Chlorine is reported to have peaked and to be declining."],
        ["the hole is unlikely to close within this century.", "Closure is projected for the 2060s, within the century."],
        ["longer-lived molecules should have been banned first.", "No ranking of substances by lifetime is proposed in the passage."],
      ],
      why: "The passage says the decision \"was taken quickly, by the standards of these things, and the recovery still takes eighty years,\" and calls that number \"the part of the story worth carrying.\"",
      steps: [
        "Identify the two facts the last sentence places side by side.",
        "Note which of them the author says is worth carrying.",
        "Reject options that dispute a fact the passage reports as settled.",
      ],
      hint: "The sentence sets a speed against a duration.",
      trap: "Reading a success story as reporting an unqualified success.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Medium",
      stem: "The observation that Farman's first assumption was \"the correct first assumption\" indicates that:",
      key: "suspecting one's own instrument is proper practice.",
      wrong: [
        ["the instrument had in fact developed a fault.", "The result was confirmed by a second, newly calibrated instrument."],
        ["he delayed publication longer than was necessary.", "The passage presents his checking as the right procedure."],
        ["the 1920s design was unsuited to modern work.", "The same design produced the confirmed result at two stations."],
      ],
      why: "The passage reports that his first assumption \"was that the instrument was failing, which is the correct first assumption,\" and then describes him checking it and repeating the measurement.",
      steps: [
        "Note that the author endorses the assumption rather than the conclusion.",
        "Follow what Farman does next in the same paragraph.",
      ],
      hint: "The remark praises a habit, not a diagnosis.",
    },
  ],
};
