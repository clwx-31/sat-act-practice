"use strict";

module.exports = {
  id: "sat-rw-b001",
  title: "Batch 1",
  items: [
    {
      id: "sat-rw-0001",
      subskill: "text completion",
      family: "completion-adjective",
      difficulty: "Medium",
      passage: `The keeper of the Sand Point light recorded the weather four times a day for
thirty-one years. The entries are almost entirely without comment: wind, visibility, the
condition of the lamp. Historians value the logbooks precisely because the keeper made no
attempt to interpret what he saw, leaving a record that is ______.`,
      stem: "Which choice completes the text with the most logical and precise word or phrase?",
      key: "unembellished",
      wrong: [
        ["exhaustive", "The passage stresses the absence of comment, not the completeness of the record."],
        ["unreliable", "Nothing in the passage questions the accuracy of what the keeper wrote down."],
        ["contradictory", "The passage describes consistency across decades rather than internal conflict."],
      ],
      why:
        "The sentence turns on 'made no attempt to interpret.' The blank has to name the quality that " +
        "absence produces, which is a record without ornament or gloss.",
      steps: [
        "Find the clause the blank depends on: the keeper did not interpret what he saw.",
        "Choose the word that names a record free of interpretation.",
      ],
      hint: "The blank restates the clause before it rather than adding a new idea.",
      trap: "'Exhaustive' is true of thirty-one years of entries and is not what the sentence is saying.",
    },
    {
      id: "sat-rw-0002",
      subskill: "main idea",
      family: "main-idea-of-a-finding",
      difficulty: "Medium",
      passage: `Most trees in a mature forest are connected below ground by fungal threads that link
their roots. Sugars and nutrients move along these threads, sometimes from a tree with more to
one with less. Researchers disagree about whether this movement reflects cooperation between
trees or simply the fungus managing its own supply lines for its own benefit.`,
      stem: "Which choice best states the main idea of the text?",
      key: "A well-documented exchange between trees has more than one possible explanation.",
      wrong: [
        ["Fungal threads are the primary means by which forest trees obtain nutrients.", "The text says sugars move along the threads, not that this is trees' primary supply."],
        ["Trees in mature forests cooperate by sharing resources with weaker neighbours.", "That is one of the two readings the text explicitly leaves unsettled."],
        ["Researchers have been unable to determine whether the fungal threads exist.", "The threads and the movement along them are presented as established."],
      ],
      why:
        "The first two sentences establish a fact and the third establishes that its meaning is " +
        "disputed. A main idea has to carry both halves.",
      steps: [
        "Separate what the text presents as settled from what it presents as argued.",
        "Choose the statement that keeps the fact and the dispute together.",
      ],
      hint: "The last sentence is the one that decides between the choices.",
      trap: "One choice states the more appealing of the two explanations as though the text endorsed it.",
    },
    {
      id: "sat-rw-0003",
      subskill: "modifier placement",
      family: "misplaced-participial-opener",
      difficulty: "Hard",
      passage: `Pulled from the press one sheet at a time and hung to dry across the room, ______`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "the prints filled the studio for two days.",
      wrong: [
        ["the printmaker filled the studio with prints for two days.", "The opening phrase describes what was pulled from the press, and the printmaker was not."],
        ["it took two days for the studio to fill with prints.", "The phrase attaches to 'it,' which names nothing that could be pulled from a press."],
        ["two days were needed before the studio was full of prints.", "The phrase now describes 'two days,' which cannot be hung up to dry."],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The prints are pulled and hung, so the prints must be that noun.",
      steps: [
        "Ask what was pulled from the press and hung to dry. The prints were.",
        "Choose the completion that puts 'the prints' immediately after the comma.",
      ],
      hint: "Read the opening phrase, then ask 'who or what?' — the answer must come next.",
      trap: "Three of the four choices are perfectly grammatical sentences on their own.",
    },
    {
      id: "sat-rw-0004",
      subskill: "logical transition",
      family: "contrast-transition",
      difficulty: "Easy",
      passage: `A city centre is often several degrees warmer than the countryside around it, because
brick and asphalt hold the day's heat and release it slowly overnight. Planting trees is the
usual remedy. ______ shade alone does little; the cooling comes mostly from water evaporating
out of the leaves, so a drought-stressed tree cools almost nothing.`,
      stem: "Which choice completes the text with the most logical transition?",
      key: "However,",
      wrong: [
        ["Therefore,", "The limitation on trees does not follow from trees being the usual remedy."],
        ["Likewise,", "The sentence qualifies the remedy rather than adding a similar one."],
        ["For example,", "What follows is a correction about how trees work, not an instance of planting them."],
      ],
      why:
        "The text names a remedy and then restricts it. The transition has to mark that the sentence " +
        "is pushing against the one before it.",
      steps: [
        "Read the sentence before the blank and the sentence after it.",
        "Ask whether the second agrees with the first. It qualifies it, so use a contrast.",
      ],
      hint: "The word 'alone' signals that a limitation is coming.",
      trap: "'Therefore' fits the scientific register while asserting the wrong relationship.",
    },
    {
      id: "sat-rw-0005",
      subskill: "meaning in context",
      family: "verb-in-context",
      difficulty: "Medium",
      passage: `For a century the Voynich manuscript has resisted every attempt at decipherment. Its
script follows statistical patterns that look like a natural language, which has kept scholars
from dismissing it outright, but no proposed reading has ever survived scrutiny by other
specialists.`,
      stem: "As used in the text, what does the word “survived” most nearly mean?",
      key: "withstood",
      wrong: [
        ["outlived", "The reading is not being compared with something that ended earlier."],
        ["endured hardship", "The word here describes a test passed, not suffering undergone."],
        ["remained alive", "The subject is a proposed reading rather than a living thing."],
      ],
      why:
        "The object of the verb is 'scrutiny by other specialists.' To survive scrutiny is to hold up " +
        "under examination, which is what 'withstood' names.",
      steps: [
        "Look at what the verb takes as its object: scrutiny.",
        "Choose the meaning that fits an object of that kind.",
      ],
      hint: "The object of the verb decides which sense of it applies.",
      trap: "Two choices give the word's commonest meaning, which is not the one in play here.",
    },
    {
      id: "sat-rw-0006",
      subskill: "subject-verb agreement",
      family: "subject-across-a-clause",
      difficulty: "Medium",
      passage: `The dates on which migrating warblers arrive in the northern forests ______ shifted
earlier by roughly a week over the past forty years, while the insect hatches the birds depend on
have shifted earlier by rather more.`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "have",
      wrong: [
        ["has", "The verb has been matched to 'forests' rather than to the plural subject 'dates.'"],
        ["is", "The verb is singular and the tense cannot form a perfect with 'shifted.'"],
        ["was", "The verb is singular and the simple past leaves 'shifted' without an auxiliary."],
      ],
      why:
        "The subject is 'The dates,' which is plural. 'On which migrating warblers arrive in the " +
        "northern forests' is a relative clause and cannot supply the verb's number.",
      steps: [
        "Strip the relative clause and read 'The dates … shifted earlier.'",
        "Choose the plural auxiliary that agrees.",
      ],
      hint: "Delete everything between the subject and the verb before deciding.",
      trap: "'Forests' is plural too but sits inside the clause, and 'week' nearby is singular.",
    },
    {
      id: "sat-rw-0007",
      subskill: "author's purpose",
      family: "purpose-of-a-text",
      difficulty: "Medium",
      passage: `A jazz standard is not a fixed object. “Autumn Leaves” has been recorded thousands of
times, and performers routinely substitute chords, change the key partway through, and reharmonise
whole sections. What survives across the versions is a melodic outline and a harmonic destination.
Everything between them is negotiable.`,
      stem: "Which choice best describes the main purpose of the text?",
      key: "To explain what remains constant in a form that invites alteration",
      wrong: [
        ["To argue that recordings of jazz standards have become too numerous", "The number of recordings is offered as evidence, not as a problem."],
        ["To describe the harmonic techniques used by a particular performer", "No performer is named and no technique is attributed to anyone."],
        ["To trace the history of a single song from its composition onward", "The text gives no chronology and no origin for the song."],
      ],
      why:
        "The text lists what performers change and then names what does not change. Its purpose is to " +
        "locate the fixed part of a form defined by variation.",
      steps: [
        "Note the structure: a list of what varies, then a statement of what does not.",
        "Choose the purpose that accounts for both halves.",
      ],
      hint: "The last two sentences are where the purpose becomes visible.",
      trap: "One choice mistakes the text's evidence for its argument.",
    },
    {
      id: "sat-rw-0008",
      subskill: "sentence boundaries",
      family: "comma-splice",
      difficulty: "Easy",
      passage: `The Antikythera mechanism was recovered from a shipwreck in 1901 and sat largely
unexamined for ______ gearing was not understood until imaging techniques could see
inside the corroded mass.`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "decades; its",
      wrong: [
        ["decades, its", "A comma alone between two independent clauses is a splice."],
        ["decades its", "With no punctuation at all the two clauses run together as a fused sentence."],
        ["decades, and, its", "The comma after the conjunction separates it from the clause it introduces."],
      ],
      why:
        "Both halves are complete sentences of equal weight — what happened to the object, and what " +
        "was not understood about it. A semicolon joins equals without subordinating either.",
      steps: [
        "Test each side of the blank as its own sentence. Both stand.",
        "Choose the mark that can join two independent clauses on its own.",
      ],
      hint: "Cover the blank and read each half aloud.",
      trap: "The two clauses are closely related, which makes a comma feel sufficient.",
    },
    {
      id: "sat-rw-0009",
      subskill: "logical inference",
      family: "inference-from-a-constraint",
      difficulty: "Hard",
      passage: `Restoring a salt marsh requires reopening it to the tide, which means breaching the
dikes that once drained it for farmland. Marsh plants colonise the reflooded ground within a few
seasons. The sediment that raises the marsh surface, however, arrives only with the tides, and it
accumulates at a few millimetres a year. It therefore follows that ______`,
      stem: "Which choice most logically completes the text?",
      key: "a restored marsh may look established long before it can keep pace with a rising sea.",
      wrong: [
        ["breaching the dikes is the most expensive stage of a marsh restoration.", "The text says nothing about the cost of any stage."],
        ["marsh plants cannot colonise ground that has been drained for farmland.", "The text states the opposite: they colonise within a few seasons."],
        ["sediment accumulates faster in restored marshes than in undisturbed ones.", "No comparison between restored and undisturbed marshes appears in the text."],
      ],
      why:
        "The text sets a fast process against a slow one: plants in seasons, sediment in millimetres " +
        "a year. The inference has to hold both rates together.",
      steps: [
        "Identify the two rates the text gives and note how different they are.",
        "Choose the conclusion that depends on the gap between them.",
      ],
      hint: "The word 'however' marks the sentence the inference turns on.",
      trap: "Two choices contradict something the text states directly.",
    },
    {
      id: "sat-rw-0010",
      subskill: "function of a sentence",
      family: "function-of-a-concession",
      difficulty: "Hard",
      passage: `A translator's footnotes are usually taken as an admission of defeat: a word that could
not be carried across has to be explained instead. Some translators embrace this. They footnote
freely, on the argument that a reader who is told what is being lost is better served than a reader
who is quietly given something else.`,
      stem: "Which choice best describes the function of the second sentence in the text as a whole?",
      key: "It marks the point at which the text stops reporting a common view and begins complicating it.",
      wrong: [
        ["It provides an example of the practice described in the first sentence.", "It introduces translators who reject the first sentence's framing rather than illustrating it."],
        ["It restates the first sentence in more precise terms.", "It reverses the first sentence's evaluation instead of sharpening it."],
        ["It identifies the group of readers the text is addressed to.", "It names a group of translators, and readers appear only in the third sentence."],
      ],
      why:
        "The first sentence reports what footnotes are 'usually taken as.' The second says some " +
        "translators welcome exactly that, which is the hinge between the received view and the argument.",
      steps: [
        "Read the first sentence and note that it is reporting an opinion, not endorsing one.",
        "Ask what the second sentence does to that opinion.",
      ],
      hint: "Three words — 'Some translators embrace this' — carry the whole turn.",
      trap: "The sentence is short and looks transitional rather than structural.",
    },
    {
      id: "sat-rw-0011",
      subskill: "precision",
      family: "precise-noun",
      difficulty: "Easy",
      passage: `When lava cools, iron-bearing minerals within it align with the earth's magnetic field
and then lock in that orientation. Rocks of different ages therefore preserve a ______ of where the
poles stood when each of them formed.`,
      stem: "Which choice completes the text with the most logical and precise word or phrase?",
      key: "record",
      wrong: [
        ["theory", "The rocks preserve physical evidence rather than an explanation of it."],
        ["prediction", "Nothing about a past pole position is being forecast."],
        ["duplicate", "The rocks preserve an orientation, not a copy of the field itself."],
      ],
      why:
        "The passage describes an orientation being locked in and preserved across rocks of different " +
        "ages. That is a record of past conditions.",
      steps: [
        "Ask what the rocks physically retain: the direction the field had when they cooled.",
        "Choose the noun that names retained evidence.",
      ],
      hint: "The verb 'preserve' tells you what kind of noun the blank needs.",
      trap: "'Theory' fits the scientific setting and names the wrong kind of thing.",
    },
    {
      id: "sat-rw-0012",
      subskill: "within-sentence punctuation",
      family: "nonrestrictive-appositive",
      difficulty: "Medium",
      passage: `The lookout on Castle Peak ______ was staffed every summer from 1934 until the last
season in 1991, when aerial patrols took over the work.`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: ", a fourteen-foot tower reached by a ladder,",
      wrong: [
        [", a fourteen-foot tower reached by a ladder", "The appositive is opened with a comma and never closed."],
        ["a fourteen-foot tower reached by a ladder,", "The closing comma appears without an opening one."],
        ["; a fourteen-foot tower reached by a ladder;", "Semicolons cannot enclose a phrase that is not an independent clause."],
      ],
      why:
        "The phrase renames the lookout and can be lifted out of the sentence, so it takes a matching " +
        "pair of commas around it.",
      steps: [
        "Remove the phrase and check the sentence still works. It does.",
        "Enclose it in commas on both sides.",
      ],
      hint: "Whatever mark opens an interrupter has to close it.",
      trap: "Two choices punctuate one side correctly, so checking a single end passes them.",
    },
    {
      id: "sat-rw-0013",
      subskill: "supporting detail",
      family: "detail-retrieval",
      difficulty: "Easy",
      passage: `A sourdough starter is a stable community of wild yeasts and lactic acid bacteria. The
bacteria produce the acids that give the bread its flavour and make the dough inhospitable to most
competing organisms. The yeasts, which tolerate that acidity, produce the gas that raises the loaf.`,
      stem: "According to the text, what is the role of the bacteria in a sourdough starter?",
      key: "They generate acids that flavour the bread and suppress competing organisms.",
      wrong: [
        ["They produce the gas that causes the dough to rise.", "The text assigns that to the yeasts."],
        ["They protect the yeasts from the acidity of the dough.", "The yeasts are described as tolerating the acidity themselves."],
        ["They convert the flour's starches into sugars the yeasts can use.", "No such conversion appears anywhere in the text."],
      ],
      why:
        "The second sentence assigns the bacteria two jobs: making acids that flavour the bread, and " +
        "making the dough hostile to competitors.",
      steps: [
        "Find the sentence that names the bacteria.",
        "List what it says they do, and match it against the choices.",
      ],
      hint: "The text divides the labour explicitly between two organisms.",
      trap: "The wrong choices describe real steps in breadmaking that this text does not mention.",
    },
    {
      id: "sat-rw-0014",
      subskill: "verb form",
      family: "past-perfect-for-the-earlier-past",
      difficulty: "Medium",
      passage: `By the time Maelzel patented the metronome in 1815, a Dutch inventor named Winkel
______ the essential mechanism, and Maelzel had seen it in Winkel's workshop.`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "had already built",
      wrong: [
        ["already built", "The simple past loses the order between Winkel's work and the patent."],
        ["has already built", "The present perfect connects an 1815 event to the present moment."],
        ["was already building", "The progressive leaves the mechanism unfinished when Maelzel saw it."],
      ],
      why:
        "The sentence names a later past moment — the 1815 patent — and Winkel's work came before it. " +
        "The past perfect is what marks the earlier of two past events.",
      steps: [
        "Find the two past moments: Winkel building, then Maelzel patenting.",
        "Put the earlier one in the past perfect.",
      ],
      hint: "'By the time' almost always sets up a past perfect.",
      trap: "The second clause already uses 'had seen,' which makes a plain past feel like variety.",
    },
    {
      id: "sat-rw-0015",
      subskill: "rhetorical goal",
      family: "goal-directed-completion",
      difficulty: "Medium",
      passage: `A seed vault stores samples at temperatures low enough that most species remain viable
for decades without attention. The design assumes that the institutions holding the seeds will
still exist when the seeds are needed. ______`,
      stem: "Which choice most effectively concludes the text by identifying the assumption's weakness?",
      key: "It is an assumption about politics, not about biology, and nothing in the freezer tests it.",
      wrong: [
        ["Seeds of some species lose viability far faster than others, even when frozen.", "That is a biological limitation and leaves the stated assumption untouched."],
        ["Several national vaults now hold duplicate collections in separate countries.", "Duplication is a response to the risk rather than a statement of it."],
        ["The vaults are built into permafrost, which keeps them cold without power.", "That addresses a mechanical risk, not the survival of institutions."],
      ],
      why:
        "The assumption named in the text is institutional continuity. Its weakness has to be that the " +
        "technology cannot secure something that is not technological.",
      steps: [
        "Identify exactly what the text says the design assumes.",
        "Choose the sentence that attacks that assumption rather than a different one.",
      ],
      hint: "The assumption is about institutions, so the weakness must be too.",
      trap: "Every wrong choice names a real risk to a seed vault, just not the one the text raises.",
    },
    {
      id: "sat-rw-0016",
      subskill: "pronoun agreement",
      family: "ambiguous-pronoun",
      difficulty: "Medium",
      passage: `A courtroom stenographer produces a transcript while the proceeding is still under way,
and an appellate court may later rely on that transcript rather than on any recording. Because
______ is the record on which an appeal is argued, its accuracy is not a clerical matter.`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "the transcript",
      wrong: [
        ["it", "The pronoun could refer to the transcript, the recording or the proceeding."],
        ["this", "The bare demonstrative points at the whole preceding clause rather than one noun."],
        ["they", "The plural pronoun agrees with none of the singular nouns available."],
      ],
      why:
        "Three singular nouns precede the blank — transcript, recording, proceeding — so a pronoun " +
        "cannot identify which one is meant. Naming it removes the ambiguity.",
      steps: [
        "Count the nouns a pronoun in this position could refer to. There are three.",
        "Since more than one fits, name the intended noun outright.",
      ],
      hint: "Ambiguity is not fixed by choosing a different pronoun.",
      trap: "Context makes the intended meaning obvious, and obviousness is not the same as clarity.",
    },
    {
      id: "sat-rw-0017",
      subskill: "quantitative evidence",
      family: "data-completion",
      difficulty: "Hard",
      passage: `Tidal generators produce power on a schedule set by the moon rather than by demand. A
survey of four estuary sites recorded the hours per day during which flow was strong enough to
generate:

| Site | Hours per day |
| --- | --- |
| Kerr Inlet | 11.4 |
| Bell Narrows | 9.8 |
| Dunmore | 12.1 |
| Ardgour | 6.5 |

A planner argued that no single site could supply a steady baseload, noting that ______`,
      stem: "Which choice most effectively uses data from the table to complete the text?",
      key: "even Dunmore, the best of the four, generated for barely half the day.",
      wrong: [
        ["Ardgour generated for 6.5 hours per day, the lowest figure recorded.", "The weakest site does not establish that the best one is also insufficient."],
        ["Kerr Inlet and Bell Narrows differed by 1.6 hours per day.", "A gap between two middling sites says nothing about baseload capacity."],
        ["the four sites averaged just under 10 hours of generation per day.", "An average across sites does not describe what any single site could supply."],
      ],
      why:
        "The claim is that no *single* site suffices. Only the strongest site can test that, and at " +
        "12.1 hours Dunmore runs about half of each day.",
      steps: [
        "Note the claim is about any one site, so find the best-performing one.",
        "Check whether even that figure supports steady supply.",
      ],
      hint: "To show that no site is enough, use the site with the best case.",
      trap: "The lowest figure is the most dramatic and proves the weakest version of the claim.",
    },
    {
      id: "sat-rw-0018",
      subskill: "parallel structure",
      family: "parallel-noun-series",
      difficulty: "Easy",
      passage: `Making bobbin lace requires a pillow to pin the pattern to, a set of weighted bobbins to
carry the threads, and ______`,
      stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
      key: "a pricking card to guide the pins.",
      wrong: [
        ["guiding the pins with a pricking card.", "The gerund breaks the pattern set by the first two noun phrases."],
        ["the pins are guided by a pricking card.", "The item becomes an independent clause where the series needs a noun phrase."],
        ["to guide the pins with a pricking card.", "The infinitive does not match the article-plus-noun shape of the other items."],
      ],
      why:
        "The sentence lists three pieces of equipment, each named as a noun phrase followed by an " +
        "infinitive saying what it is for. The third item has to take that shape.",
      steps: [
        "Read the first two items and note how each is built.",
        "Choose the item that repeats that pattern.",
      ],
      hint: "Compare the first word of each item before anything else.",
      trap: "Each wrong choice contains the same information in a different grammatical form.",
    },
    {
      id: "sat-rw-0019",
      subskill: "textual evidence",
      family: "evidence-for-a-claim",
      difficulty: "Hard",
      passage: `A marine biologist claims that the census undercounted deep-sea species not because the
sampling was careless but because the method itself could not detect certain animals. Which finding,
if true, would most directly support this claim?`,
      stem: "Which choice most effectively supports the biologist's claim?",
      key: "Gelatinous animals disintegrate in the nets used, leaving no identifiable remains.",
      wrong: [
        ["Sampling was concentrated in the North Atlantic and the South Pacific.", "Uneven geographic coverage is a flaw in the sampling design, not in the method's detection."],
        ["The census identified more than a thousand species previously unknown.", "A large number of discoveries does not show that others were undetectable."],
        ["Several research vessels reported equipment failures during the survey.", "Equipment failure is an operational problem, which the claim explicitly sets aside."],
      ],
      why:
        "The claim distinguishes careless sampling from an inherent limit of the method. Only an " +
        "animal destroyed by the apparatus itself demonstrates the second.",
      steps: [
        "Note what the claim rules out: carelessness.",
        "Choose the finding that shows a limit built into the method rather than a mistake in using it.",
      ],
      hint: "The claim's two halves tell you which kind of evidence counts.",
      trap: "Two choices describe real problems with a survey and both are the kind the claim excludes.",
    },
    {
      id: "sat-rw-0020",
      subskill: "sentence connection",
      family: "additive-connection",
      difficulty: "Medium",
      passage: `The varnish on an old Italian violin is thin, flexible, and chemically unlike anything a
modern shop mixes. Analysts have identified its components. ______ nobody has reproduced an
instrument that sounds like the originals by copying the recipe, which suggests the varnish is one
variable among many rather than the secret it is often taken for.`,
      stem: "Which choice completes the text with the most logical transition?",
      key: "Even so,",
      wrong: [
        ["Consequently,", "The failure to reproduce the sound does not follow from identifying the components."],
        ["Similarly,", "The sentence opposes the previous one rather than adding a parallel case."],
        ["In other words,", "The sentence introduces a new fact rather than restating the last one."],
      ],
      why:
        "The text grants that the recipe is known and then reports that knowing it has not been enough. " +
        "The transition marks that concession turning into a limit.",
      steps: [
        "Read the sentence before the blank: the components have been identified.",
        "Ask whether what follows extends that success or qualifies it.",
      ],
      hint: "The clause after the comma reaches a deflating conclusion.",
      trap: "'Consequently' suits the analytical tone and asserts the opposite relationship.",
    },
    {
      id: "sat-rw-0021",
      subskill: "meaning in context",
      family: "noun-in-context",
      difficulty: "Medium",
      passage: `The dark coating on desert boulders builds at perhaps a micrometre per thousand years,
and it forms only where the rock is stable and undisturbed. Archaeologists use its presence as a
rough measure of how long a surface has lain untouched.`,
      stem: "As used in the text, what does the word “measure” most nearly mean?",
      key: "indication",
      wrong: [
        ["quantity", "The coating indicates duration; it is not itself an amount of it."],
        ["standard", "Nothing in the text presents the coating as a benchmark others are judged against."],
        ["precaution", "The word here concerns evidence rather than a step taken to avoid harm."],
      ],
      why:
        "The coating does not give a number; it signals that a surface has been undisturbed for a long " +
        "time. The word is being used in its evidential sense.",
      steps: [
        "Ask what archaeologists get from the coating: a sign, not a figure.",
        "Choose the meaning that matches a rough signal.",
      ],
      hint: "The adjective 'rough' tells you the word is not being used numerically.",
      trap: "The commonest sense of the word is quantitative, and the sentence looks quantitative.",
    },
    {
      id: "sat-rw-0022",
      subskill: "student notes",
      family: "notes-synthesis",
      difficulty: "Medium",
      passage: `While researching a topic, a student has taken these notes:

- Deep subway tunnels warm over decades as train braking releases heat into the surrounding clay.
- The London Underground's deep lines have risen from about 14°C when built to about 26°C today.
- The clay around the tunnels absorbed heat for a century and is now close to saturated.
- Cooling systems must therefore reject heat somewhere other than the surrounding ground.

The student wants to explain why cooling the tunnels has become harder over time.`,
      stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
      key: "The clay that absorbed a century of waste heat is now nearly saturated, so it can no longer serve as the heat sink cooling systems once relied on.",
      wrong: [
        ["The deep lines of the London Underground have warmed from about 14°C to about 26°C.", "The temperature rise is the symptom rather than the reason cooling has become harder."],
        ["Heat enters subway tunnels largely through the braking of the trains that run in them.", "The source of the heat does not explain why removing it has become more difficult."],
        ["Cooling systems in deep tunnels must reject their heat somewhere other than the ground.", "That is the consequence of the difficulty, not an explanation of it."],
      ],
      why:
        "The goal asks why cooling got *harder*. Only the note about saturated clay explains a change " +
        "over time in the ground's ability to take heat away.",
      steps: [
        "State the goal precisely: explain an increase in difficulty.",
        "Find the note that describes something changing rather than something being true.",
      ],
      hint: "Three notes state conditions; one states a condition that has changed.",
      trap: "Every choice uses the notes accurately, and only one answers the goal as written.",
    },
    {
      id: "sat-rw-0023",
      subskill: "agreement",
      family: "cross-text-agreement",
      difficulty: "Hard",
      passage: `Text 1: An oral historian argues that a recorded interview is a document like any other.
It is shaped by who asked, what was asked, and what the speaker judged safe to say, and it should be
read with those conditions in view.

Text 2: A folklorist replies that this framing understates the difference. A written document is
fixed before the historian arrives; an interview is created by the encounter itself, and the
historian is inside the evidence rather than beside it.`,
      stem: "Based on the texts, how would the author of Text 2 most likely respond to the argument in Text 1?",
      key: "By agreeing that conditions shape the record while denying that the historian's role is comparable to that of a reader of documents.",
      wrong: [
        ["By arguing that recorded interviews are less reliable than written documents.", "Text 2 questions the analogy rather than ranking the two kinds of source."],
        ["By denying that the circumstances of an interview affect what a speaker says.", "Text 2 accepts that and objects to a different part of the claim."],
        ["By claiming that written documents are also created by the researcher's presence.", "Text 2 says the opposite: a document is fixed before the historian arrives."],
      ],
      why:
        "Text 2 grants that conditions matter and objects to treating an interview as a document the " +
        "historian merely reads, because the historian helped make it.",
      steps: [
        "Identify what Text 2 concedes and what it disputes.",
        "Choose the response that keeps both.",
      ],
      hint: "The reply agrees with more of Text 1 than it rejects.",
      trap: "Two choices turn a disagreement about framing into a disagreement about reliability.",
    },
    {
      id: "sat-rw-0024",
      subskill: "response between texts",
      family: "cross-text-evidence",
      difficulty: "Hard",
      passage: `Text 1: Mass balance is the simplest measure of a glacier's health: snow gained against ice
lost. A glacier with a negative balance is shrinking, whatever else it does.

Text 2: A glacier can advance while losing mass, if meltwater at the bed lets the whole body slide
faster than it is wasting away. Terminus position is therefore a poor proxy for balance, and
photographs of an advancing snout have repeatedly been offered as evidence against measurements
that were correct.`,
      stem: "Which piece of evidence would most strengthen the position taken in Text 2?",
      key: "A glacier whose terminus advanced for six years while its measured mass balance stayed negative throughout.",
      wrong: [
        ["A glacier whose terminus retreated in every year that its mass balance was negative.", "That case is consistent with both texts and distinguishes neither."],
        ["A survey showing that most glaciers worldwide currently have negative mass balances.", "The global picture does not bear on whether terminus position tracks balance."],
        ["A record of snowfall totals showing wide variation between neighbouring valleys.", "Variation in snowfall says nothing about the relationship Text 2 disputes."],
      ],
      why:
        "Text 2's claim is that advance and mass loss can coincide. The evidence that supports it is a " +
        "documented case of exactly that pairing.",
      steps: [
        "State Text 2's claim as a combination of two things happening at once.",
        "Choose the evidence in which both are observed together.",
      ],
      hint: "Look for the case that would be impossible if Text 2 were wrong.",
      trap: "The first wrong choice describes a real glacier behaving as expected, which supports neither side.",
    },
    {
      id: "sat-rw-0025",
      subskill: "main idea",
      family: "main-idea-of-a-mechanism",
      difficulty: "Easy",
      passage: `A zipper works because each tooth is both a hook and a hollow. The slider does not press
the two sides together so much as steer them: a wedge inside it forces the teeth to approach at an
angle that seats each hook into the hollow ahead of it. Pull the slider the other way and the same
wedge prises them apart.`,
      stem: "Which choice best states the main idea of the text?",
      key: "A zipper's slider works by controlling the angle at which identical teeth meet.",
      wrong: [
        ["A zipper fails when its teeth are bent out of their original shape.", "The text does not discuss failure at all."],
        ["Each tooth on a zipper is manufactured to a different specification.", "The text describes the teeth as identical, each both hook and hollow."],
        ["The slider presses the two sides of a zipper firmly together.", "The text explicitly denies this and offers steering instead."],
      ],
      why:
        "The text corrects an intuition about pressing and replaces it with steering, then explains " +
        "that reversing the slider reverses the effect.",
      steps: [
        "Find the sentence that says what the slider does not do.",
        "Choose the statement that captures what it does instead.",
      ],
      hint: "The phrase 'so much as' marks the correction the text is making.",
      trap: "One choice states the intuition the text sets out to overturn.",
    },
  ],
};
