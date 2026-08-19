"use strict";

module.exports = {
  id: "act-reading-p025",
  type: "natural-science",
  title: "Counting Craters",
  intro: "This passage is adapted from an article on how the ages of planetary surfaces are determined.",
  content: `There is no way to put a date on a piece of the Moon without bringing a piece of it
home. Radiometric dating requires a laboratory, a sample, and several weeks. Six Apollo
landings and three Soviet robotic missions brought back material from nine places, all of
them on the near side, most of them on flat ground chosen because a spacecraft could land
there. Everything else known about the ages of surfaces in the solar system rests on a
method that requires no samples at all, and that was calibrated against those nine sites.

The method is counting craters. Impacts arrive at random over a surface, so an old surface
accumulates more of them than a young one. Count the craters above some diameter in a
measured area, and the number is a clock — provided you know the rate at which impacts
arrive, and that is what the Apollo samples supplied. A lava plain whose rocks date to 3.6
billion years ago carries a certain density of craters. Another plain with half that
density has been exposed for a shorter time, and the calibration converts density into
years.

The technique is powerful out of all proportion to its simplicity. It works from orbit, on
any airless body, at any distance a camera can resolve. It gave the first reliable ages for
the martian volcanic provinces, established that the lunar maria were not all the same age,
and produced the discovery that reorganised the field: crater densities on the oldest lunar
surfaces are far higher than a steady impact rate would predict, which implies that the
inner solar system was bombarded far more heavily before about 3.8 billion years ago than
afterwards. Whether that was a smooth decline or a distinct spike remains argued over, and
the argument matters, because the early Earth was in the same neighbourhood.

Every one of those results depends on assumptions that are worth stating plainly. The first
is that the impact rate measured at nine near-side sites applies everywhere. For the Moon
this is defensible. For Mars it requires a correction for the planet's position closer to
the asteroid belt, and the correction is a model, not a measurement. The second assumption
is that a crater, once made, stays. On the Moon this is nearly true. On Mars, wind moves
dust; on Europa, ice flows; on any body with an atmosphere, small impactors burn up before
arriving, so the small end of the crater distribution is missing for reasons that have
nothing to do with age.

The third problem is the one that has caused the most trouble, because it is invisible in
the data. A large impact throws out debris that falls back and makes craters of its own.
These secondaries are real craters, and at small diameters they can outnumber the ones made
by objects arriving from space. Counting them as primaries makes a surface look older than
it is. Two groups examining the same martian terrain in the 2000s produced ages differing
by a factor of several, and the disagreement was traced not to arithmetic but to where each
had drawn the line between the two populations.

None of this is a reason to distrust the method, and planetary scientists who use it daily
are its most careful critics. It is a reason to read a crater age as what it is: a relative
ordering that is very reliable, converted into absolute years by a chain that runs back to
nine boxes of rock collected in the 1970s. Almost every date in a textbook diagram of solar
system history hangs on that chain. Extending it is the strongest scientific argument for
returning samples from a surface nobody has sampled yet, and the surfaces most worth
sampling are the ones the current calibration fits worst.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "how a widely used dating method works and where it strains.",
      wrong: [
        ["why the Apollo programme returned samples from the near side.", "Landing-site selection is background given in a single clause."],
        ["whether the inner solar system suffered a sudden bombardment.", "That dispute is one result of the method, mentioned and left open."],
        ["how radiometric dating establishes the age of lunar rocks.", "Radiometric work is what the passage says cannot be done remotely."],
      ],
      why: "The passage explains crater counting, calls it \"powerful out of all proportion to its simplicity,\" and then devotes three paragraphs to assumptions, preservation, and secondary craters.",
      steps: [
        "Note how much of the passage follows the phrase about assumptions worth stating.",
        "Check that the option covers both the method's power and its limits.",
      ],
      hint: "Count the paragraphs describing problems.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, samples used to calibrate crater counting were collected from:",
      key: "nine sites, all on the Moon's near side.",
      wrong: [
        ["six sites visited by the Apollo landings.", "Three Soviet robotic missions contributed as well, making nine in total."],
        ["several places on Mars and on the Moon.", "No martian samples are described as having been returned."],
        ["sites chosen for their rugged terrain.", "The passage says most were chosen because a spacecraft could land there."],
      ],
      why: "The first paragraph says six Apollo landings and three Soviet robotic missions \"brought back material from nine places, all of them on the near side.\"",
      steps: [
        "Add the two kinds of mission the paragraph names.",
        "Take the location the sentence gives for all of them.",
      ],
      hint: "Two numbers in the sentence add to a third.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-error",
      difficulty: "Medium",
      stem: "The passage explains that counting secondary craters as primaries makes a surface appear:",
      key: "older than it actually is.",
      wrong: [
        ["younger than it actually is.", "More craters imply more elapsed time under the method, not less."],
        ["smoother than it actually is.", "The error concerns the age assigned, not the terrain's appearance."],
        ["closer to the asteroid belt.", "Distance from the belt is a separate correction applied to Mars."],
      ],
      why: "The passage says secondaries \"can outnumber the ones made by objects arriving from space\" and that \"counting them as primaries makes a surface look older than it is.\"",
      steps: [
        "Recall that the method reads more craters as more time.",
        "Apply that to a count inflated by debris from a single impact.",
      ],
      hint: "The clock runs on the number of craters.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the second paragraph, the word *clock* refers to:",
      key: "a crater count that stands in for elapsed time.",
      wrong: [
        ["an instrument carried aboard a landing spacecraft.", "No onboard instrument is described in the passage."],
        ["the decay of isotopes measured in a laboratory.", "That is radiometric dating, which the passage distinguishes from counting."],
        ["the interval between two successive large impacts.", "The method uses accumulated numbers, not the spacing of events."],
      ],
      why: "The paragraph says to \"count the craters above some diameter in a measured area, and the number is a clock,\" with the calibration converting density into years.",
      steps: [
        "Find what the sentence says *the number* is.",
        "Identify what quantity the number is standing in for.",
      ],
      hint: "The metaphor names the count itself.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-conditions",
      difficulty: "Medium",
      stem: "The passage indicates that crater counting is more reliable on the Moon than on Mars chiefly because the Moon:",
      key: "preserves craters and was directly sampled.",
      wrong: [
        ["receives impacts at a much steadier rate.", "The passage reports a change in the lunar impact rate over time."],
        ["has been photographed at higher resolution.", "Image quality is not compared between the two bodies."],
        ["has fewer secondary craters on its surface.", "Secondaries are described as a problem for the method generally."],
      ],
      why: "The fourth paragraph says the calibration is defensible for the Moon but requires a modelled correction for Mars, and that craters stay on the Moon while \"on Mars, wind moves dust.\"",
      steps: [
        "List what the passage says is true of the Moon in that paragraph.",
        "List what it says has to be adjusted for Mars.",
        "Choose the option that names both differences.",
      ],
      hint: "The paragraph raises two assumptions and treats the Moon well on both.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that on a body with an atmosphere, a crater count would:",
      key: "miss the smallest craters for reasons unrelated to age.",
      wrong: [
        ["overstate the age of the surface being examined.", "Missing small craters would tend to make a surface look younger, not older."],
        ["be impossible to carry out from orbit at all.", "The method is described as working from orbit at any resolvable distance."],
        ["require a laboratory sample before it could begin.", "The whole point of the method is that it needs no samples."],
      ],
      why: "The fourth paragraph says \"on any body with an atmosphere, small impactors burn up before arriving, so the small end of the crater distribution is missing for reasons that have nothing to do with age.\"",
      steps: [
        "Find the clause about atmospheres in the paragraph on preservation.",
        "Note which part of the size distribution it affects.",
      ],
      hint: "The effect is at one end of the range of sizes.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Medium",
      stem: "The two groups whose martian ages differed by a factor of several are cited in order to:",
      key: "show that a judgement, not arithmetic, drove the gap.",
      wrong: [
        ["prove that martian surfaces cannot be dated at all.", "The passage calls the method reliable for relative ordering throughout."],
        ["illustrate the correction needed for the asteroid belt.", "That correction belongs to a different assumption in the previous paragraph."],
        ["demonstrate how quickly wind erases craters on Mars.", "Erosion is discussed separately and is not what the disagreement turned on."],
      ],
      why: "The passage says \"the disagreement was traced not to arithmetic but to where each had drawn the line between the two populations\" of primary and secondary craters.",
      steps: [
        "Read the sentence explaining what the disagreement was traced to.",
        "Connect it to the problem the paragraph opens by naming.",
      ],
      hint: "The paragraph is about telling two kinds of crater apart.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which observation supports the conclusion that the early inner solar system was bombarded more heavily than it is now?",
      key: "The oldest lunar surfaces hold more craters than a steady rate predicts.",
      wrong: [
        ["The lunar maria were shown not to all be the same age.", "Differing mare ages show the method's resolution, not a change in rate."],
        ["Martian volcanic provinces received their first reliable ages.", "This is a separate application of the method to a different planet."],
        ["Secondary craters can outnumber primaries at small diameters.", "This is a source of counting error, not evidence about the impact rate."],
      ],
      why: "The third paragraph says \"crater densities on the oldest lunar surfaces are far higher than a steady impact rate would predict, which implies that the inner solar system was bombarded far more heavily before about 3.8 billion years ago.\"",
      steps: [
        "Identify the claim about the ancient impact rate.",
        "Find the observation the passage places immediately before the word *implies*.",
        "Reject results that show the method working rather than the rate changing.",
      ],
      hint: "The evidence must compare an observed density against a prediction.",
      trap: "Choosing a notable result of the method instead of the one that bears on the rate.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-method",
      difficulty: "Hard",
      stem: "The passage's closing recommendation rests on the point that the calibration chain:",
      key: "was built where the method is already most secure.",
      wrong: [
        ["has never been checked against radiometric results.", "The chain is anchored precisely in radiometrically dated samples."],
        ["produces relative orderings that cannot be trusted.", "The passage calls the relative ordering very reliable."],
        ["would be unnecessary if cameras had better resolution.", "Resolution is treated as adequate; the difficulty is the conversion to years."],
      ],
      why: "The last paragraph says crater ages are converted to absolute years \"by a chain that runs back to nine boxes of rock,\" and that \"the surfaces most worth sampling are the ones the current calibration fits worst.\"",
      steps: [
        "Note where the existing samples came from and how well the method works there.",
        "Read the final clause about which surfaces most need sampling.",
        "Choose the option that explains why new samples would add most.",
      ],
      hint: "The argument turns on where the existing anchor points are, not on their quality.",
      trap: "Reading a call for more data as a claim that the existing data are unsound.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Easy",
      stem: "The author opens the final paragraph by noting that users of the method are its most careful critics in order to:",
      key: "separate scrutiny of a method from rejection of it.",
      wrong: [
        ["show that the method has few defenders left.", "The paragraph says the method should not be distrusted."],
        ["credit one research group with correcting the others.", "No group is singled out for having resolved the difficulties."],
        ["explain why sample return missions were cancelled.", "No cancelled mission is mentioned anywhere in the passage."],
      ],
      why: "The paragraph begins \"none of this is a reason to distrust the method,\" and then restates what a crater age should be read as.",
      steps: [
        "Read the first clause of the final paragraph.",
        "Note what the rest of the paragraph goes on to recommend.",
      ],
      hint: "The sentence begins by ruling out one conclusion.",
    },
  ],
};
