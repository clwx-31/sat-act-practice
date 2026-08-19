"use strict";

module.exports = {
  id: "act-reading-p008",
  type: "humanities",
  title: "The Argument Over Dirt",
  intro: "This passage is adapted from an essay on the conservation of paintings.",
  content: `A picture that has hung in a public gallery for two hundred years is not the
object the painter left behind. It has been varnished, and revarnished when the first
varnish yellowed. It has been retouched where the paint flaked, sometimes by a hand with
opinions of its own. It may have been lined — glued to a new canvas from behind, under
heat, because the old one had gone brittle. Every one of those acts was performed by
someone trying to save it. The cumulative result is a surface with a history, and the
conservator who approaches it has to decide which parts of that history are the painting.

Varnish is where the argument usually starts. A resin varnish is applied because it
saturates colour: it fills the microscopic pits in dried paint so that light enters and
returns instead of scattering, and a varnished picture is therefore deeper and more
vivid than an unvarnished one. Natural resins also oxidise. Over sixty or eighty years
they turn amber, then brown, and they take the blues down first, so that a sky recedes
towards green and a shadow that the painter mixed from blue and red reads as plain
umber. Removing such a layer with solvent is the single most common act of restoration.
It is also irreversible, and it is performed on a film that lies directly on the paint.

The dispute that made this public lasted from 1980 to 1994 and concerned a ceiling. When
the Vatican's restorers began cleaning Michelangelo's frescoes, the figures that emerged
from beneath the accumulated grime were coloured in a way almost nobody expected: acid
greens, shrill pinks, oranges. A group of critics, led by the art historian James Beck,
argued that the cleaning had gone too far — that Michelangelo had finished the frescoes
*a secco*, working over the dried plaster in glue-bound pigment to deepen the shadows,
and that this final layer of his own modelling had been dissolved along with the soot.

The restorers answered with analysis rather than with taste. Samples of the removed
material were found to contain animal glue and candle soot but no pigment bound in the
glue, which is what a lost *a secco* layer would have left behind. The critics replied
that sampling could not prove a negative across a ceiling of that size. Neither side
changed its position, and the argument is instructive for that reason: both parties were
looking at the same surface, and looking harder was not going to settle anything.

Underneath the technical quarrel lie two ideas of what an old painting is. On the first,
the object of conservation is the artist's material intention, and everything deposited
since is an obstruction to be removed as far as the evidence permits. On the second, a
painting is a thing that has lived in the world, and the softened, unified tone that age
gives it — what the trade calls patina — is not damage but part of what the object has
become. The first view treats time as noise. The second treats it as authorship, and its
opponents reply, reasonably enough, that no one asked a candle to collaborate.

The Italian theorist Cesare Brandi proposed a way through that has since become the
profession's working rule. A restoration, he argued, should be reversible, so that a
later generation with better knowledge can undo it; and it should be recognisable at
close range as a restoration, so that no viewer mistakes the restorer's work for the
painter's. Filling a loss is permitted. Inventing what the painter might have put there,
in a manner indistinguishable from his, is not.

Brandi's rule disciplines the argument without ending it, because varnish removal cannot
be made reversible. What it has produced in practice is caution: partial cleanings that
thin a varnish rather than strip it, solvents chosen for the narrowest action that will
do the work, and documentation so complete that a conservator in 2120 can reconstruct
exactly what was taken off and why.

There remains one argument the cautious party has never been able to answer. A yellowed
varnish is not stable. It goes on oxidising, it grows more brittle, and in time it
contracts and pulls at the paint beneath it. Waiting is not the neutral option it feels
like. Whoever decides to leave a picture alone has also decided what it will look like
in fifty years, and has done so without knowing.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is best described as an examination of:",
      key: "why decisions about cleaning a painting cannot be settled by technical means alone.",
      wrong: [
        ["how modern chemical analysis resolved a long dispute about a famous ceiling.", "The passage says the analysis did not settle the quarrel and that neither side moved."],
        ["why natural resin varnishes should be replaced by synthetic ones in galleries.", "Synthetic varnishes are never proposed; the passage stays with the decision, not the material."],
        ["how the profession of conservation came to adopt a single agreed standard.", "Brandi's rule is said to discipline the argument \"without ending it,\" and cleaning escapes it."],
      ],
      why: "The passage moves from the physical facts about varnish to \"two ideas of what an old painting is,\" and says of the ceiling dispute that \"looking harder was not going to settle anything.\" The unresolved question is what the object is, not what it is made of.",
      steps: [
        "Notice where the passage stops describing materials and starts describing views.",
        "Check that the option accounts for the two philosophies and the closing paragraph.",
      ],
      hint: "Ask what the fifth paragraph adds that the second one could not supply.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, a varnish is applied to a painting in order to:",
      key: "saturate the colour by filling pits in the dried paint.",
      wrong: [
        ["protect the paint from soot given off by burning candles.", "Soot is described as something that settles on old surfaces, not as what varnish is for."],
        ["hold a brittle canvas together until it can be relined.", "Relining is a separate treatment applied from behind with heat and glue."],
        ["give a later restorer a layer that can safely be removed.", "Reversibility is Brandi's principle, and the passage says varnish removal is irreversible."],
      ],
      why: "The second paragraph states that varnish \"is applied because it saturates colour: it fills the microscopic pits in dried paint so that light enters and returns instead of scattering.\"",
      steps: [
        "Find the sentence in the second paragraph that begins with the reason.",
        "Separate the purpose of varnishing from the problems varnish later causes.",
      ],
      hint: "The reason is given before the complaint.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-condition",
      difficulty: "Easy",
      stem: "The passage explains that an aged varnish makes a painted sky look greenish because the varnish:",
      key: "darkens to amber and removes the blues first.",
      wrong: [
        ["reacts with the blue pigments the painter used.", "The change described is in the varnish film above the paint, not in the pigments themselves."],
        ["is thicker over the upper part of a picture.", "No difference in thickness across a picture is mentioned anywhere in the passage."],
        ["scatters light instead of letting it return.", "Scattering is what an unvarnished surface does; it is the problem varnish is meant to fix."],
      ],
      why: "The second paragraph says that ageing resins \"turn amber, then brown, and they take the blues down first, so that a sky recedes towards green.\"",
      steps: [
        "Locate the sentence describing what oxidised resin does to colour.",
        "Note which colours the passage says are affected first.",
      ],
      hint: "The sentence names the effect on a sky directly.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-positions",
      difficulty: "Medium",
      stem: "The two ideas of an old painting described in the fifth paragraph differ chiefly over whether:",
      key: "the changes brought by time belong to the work itself.",
      wrong: [
        ["a painter's intentions can be recovered from the paint film.", "Both views assume the original surface exists; they disagree about its standing."],
        ["a public gallery is the right place to keep an old picture.", "Where paintings hang is described in the opening but is not what the two views dispute."],
        ["a restorer's work should be visible to a viewer up close.", "That is Brandi's separate principle, introduced in the following paragraph."],
      ],
      why: "The passage says the first view holds that everything deposited since the artist's work \"is an obstruction to be removed,\" while the second holds that patina \"is not damage but part of what the object has become.\" It sums this up: one \"treats time as noise,\" the other \"as authorship.\"",
      steps: [
        "State each view in a single clause.",
        "Find the sentence that contrasts them and take the term it turns on.",
      ],
      hint: "The paragraph ends with a two-word contrast: noise against authorship.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage suggests that the critics' reply about sampling was:",
      key: "logically sound but incapable of deciding the case either way.",
      wrong: [
        ["a concession that the restorers' analysis had settled the matter.", "The critics maintained their position, and the passage says neither side changed."],
        ["an objection the restorers had already answered with more samples.", "No further sampling is described; the exchange stops where the passage leaves it."],
        ["evidence that the restorers had taken samples from the wrong areas.", "The objection concerns what sampling can show at all, not where the samples came from."],
      ],
      why: "The critics said \"sampling could not prove a negative across a ceiling of that size,\" and the passage then observes that \"looking harder was not going to settle anything.\" The reply blocks the restorers' proof without supplying one of its own.",
      steps: [
        "Read what the critics actually claimed about sampling.",
        "Ask whether that claim, if true, gives their own position any support.",
      ],
      hint: "An objection that nothing could be proved cuts in both directions.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the fifth paragraph, the word *patina* most nearly means:",
      key: "the softened, unified tone that age gives a surface.",
      wrong: [
        ["the resin film a conservator applies after cleaning.", "That is varnish, which the passage names separately and treats as removable."],
        ["the layer of animal glue found on the Vatican ceiling.", "The glue is identified as residue from earlier restorations, not as patina."],
        ["the original modelling a painter added over dry plaster.", "That describes the disputed a secco work, which the critics said was lost."],
      ],
      why: "The paragraph defines the term in place: \"the softened, unified tone that age gives it — what the trade calls patina.\"",
      steps: [
        "Look at the clause immediately before the word.",
        "Confirm the definition fits the argument being made about time."],
      hint: "The passage defines the word in the same sentence it introduces it.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Medium",
      stem: "The author's chief purpose in describing Brandi's two principles is to:",
      key: "show what the profession settled and what it could not.",
      wrong: [
        ["argue that the Vatican restorers violated an accepted rule.", "The passage never applies Brandi's rule to the ceiling or judges the restorers by it."],
        ["propose a standard the author believes should be adopted.", "The rule is reported as already being \"the profession's working rule,\" not urged."],
        ["explain why filling a loss in a painting is always improper.", "The passage says plainly that \"filling a loss is permitted\" under the rule."],
      ],
      why: "The paragraph after Brandi's rule begins \"Brandi's rule disciplines the argument without ending it, because varnish removal cannot be made reversible.\" The principles are introduced to mark the boundary of what they solve.",
      steps: [
        "Read the sentence immediately after the principles are stated.",
        "Ask what work the author gets out of the rule in the rest of the passage.",
      ],
      hint: "The next paragraph tells you what the rule does not reach.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Easy",
      stem: "The remark that \"no one asked a candle to collaborate\" serves mainly to:",
      key: "state the objection to treating age as a kind of authorship.",
      wrong: [
        ["explain how soot came to accumulate on the Vatican ceiling.", "The mechanism of soot deposit is covered earlier and is not at issue in the remark."],
        ["show that the author rejects the case for cleaning a picture.", "The remark is aimed at the other view, which defends leaving surfaces alone."],
        ["identify the material the Vatican restorers actually removed.", "The removed material is described in the analysis paragraph, not by this phrase."],
      ],
      why: "The sentence before it says the second view \"treats [time] as authorship,\" and the passage adds that \"its opponents reply, reasonably enough, that no one asked a candle to collaborate.\" The remark voices that reply.",
      steps: [
        "Identify whose position the sentence is reporting.",
        "Match the joke to the word in the previous clause that it mocks.",
      ],
      hint: "The word the remark attacks is in the clause just before it.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "The restorers' analysis of the removed material was offered as evidence against the claim that:",
      key: "Michelangelo's own final glue-bound modelling had been dissolved.",
      wrong: [
        ["the material taken off the ceiling contained no soot from candles.", "Soot is what the restorers reported finding, so this states their own result as the target."],
        ["the colours revealed by cleaning were brighter than expected.", "The unexpected colours are described as fact by both sides and were never denied."],
        ["a sample cannot represent a surface as large as that ceiling.", "That is the critics' answer to the analysis, raised after it, not the claim it addressed."],
      ],
      why: "Beck's group argued that a final *a secco* layer of Michelangelo's own had gone with the soot. The restorers found \"animal glue and candle soot but no pigment bound in the glue, which is what a lost *a secco* layer would have left behind.\"",
      steps: [
        "State the critics' claim in one sentence.",
        "Ask what the absence of pigment in the glue would show if the claim were true.",
        "Reject options describing the reply rather than the claim under test.",
      ],
      hint: "Evidence answers a claim; find the claim that pigment in the glue would have confirmed.",
      trap: "Selecting the critics' later objection instead of their original claim.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Hard",
      stem: "The final paragraph weakens the case for leaving an old varnish untouched mainly by:",
      key: "denying that postponing a decision avoids making one.",
      wrong: [
        ["showing that solvents have become far safer than they once were.", "Solvent choice appears in the previous paragraph as caution, not as a new capability."],
        ["arguing that galleries have a duty to display pictures brightly.", "Nothing in the passage rests on how a picture ought to look to visitors."],
        ["proving that varnish removal can in fact be made reversible.", "The passage states the opposite: removal \"cannot be made reversible.\""],
      ],
      why: "The paragraph says a yellowed varnish \"goes on oxidising\" and \"contracts and pulls at the paint beneath it,\" and concludes that \"waiting is not the neutral option it feels like\" — whoever leaves a picture alone \"has also decided what it will look like in fifty years.\"",
      steps: [
        "Identify what the cautious position assumes about doing nothing.",
        "Find the sentence that contradicts that assumption.",
        "Check that the option names the assumption rather than a fact about solvents.",
      ],
      hint: "The paragraph attacks a hidden premise rather than the conclusion.",
      trap: "Looking for a new fact in favour of cleaning instead of an attack on the alternative.",
    },
  ],
};
