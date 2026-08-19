"use strict";

module.exports = {
  id: "act-reading-p015",
  type: "natural-science",
  title: "What the Jay Remembers",
  intro: "This passage is adapted from an article on animal memory.",
  content: `A western scrub jay in autumn will hide as many as thirty thousand items of food in
a season, one at a time, in separate places, and will recover most of them over the following
months. That much has been known to anyone who has watched a jay for an afternoon. The
interesting question is what the bird has to know in order to do it.

The obvious answer is location, and jays are extraordinary at location. Nicola Clayton's
group at Cambridge established something less obvious in a series of experiments beginning in
the late 1990s. Jays were given two kinds of food to cache: peanuts, which keep, and wax moth
larvae, which the birds prefer strongly but which decay within about four days. The birds
cached both, in trays they could later be returned to. When they were let back after four
hours, they went for the larvae. When they were let back after five days, they ignored the
larvae entirely and dug up the peanuts.

Nothing about the tray told them how long it had been. The larvae had not visibly changed
and the birds did not sample them; they walked past. To choose correctly the jay had to hold
three things together: what it had cached, where it had put it, and how long ago. Clayton
called this what-where-when memory, and the finding was significant because that combination
had been widely treated as the signature of human episodic memory — remembering an event as
an event, rather than knowing a fact.

The claim was contested immediately, and the objection was a good one. A bird could produce
exactly this behaviour without remembering anything as an event, if what it had formed was a
rule: peanuts stay good, larvae go bad after four days, and the cache made at such-and-such a
time is now old. That is knowing a fact about the world, not reliving an episode. Critics
proposed calling the capacity *episodic-like* memory, and Clayton's group accepted the term,
which is why the literature now uses it.

The experiments that followed were designed to press on the difference. In one, jays that
had been allowed to cache larvae, and had then learned in a separate context that larvae
degrade faster than they had thought, changed their recovery behaviour on caches made
*before* they learned it. A rule formed at the time of caching cannot do that; the birds
appear to be revisiting a stored record and applying new information to it. In another, jays
that had themselves stolen from other birds' caches were far more likely to re-hide their own
food if another jay had watched them cache it — and jays with no history of pilfering did not
show the effect. What a bird had done seemed to inform what it expected others to do.

The last result attracted the most attention and the most caution, because the leap from it
to a claim about mental attribution is enormous and the alternative explanations are not
exotic. A jay that has pilfered has simply had more experience of what a watched cache looks
like from the outside, and stress from a rival's presence may be enough on its own. Careful
researchers state the finding at the level the design supports and let the larger question
stand open.

What is no longer defensible is the position the field held in 1990, which is that this kind
of memory required language, or a primate brain, or both. Corvids have neither. Their
forebrains are organised on a plan that diverged from the mammalian line some three hundred
million years ago, and they arrive at something functionally similar by an architecture that
does not resemble ours. Whatever the jay is doing when it walks past a five-day-old larva, it
is not doing it the way we do.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "what jay caching experiments do and do not establish about memory.",
      wrong: [
        ["how scrub jays manage to recover thirty thousand hidden items.", "Recovery ability is the starting point, not the question the passage pursues."],
        ["why wax moth larvae decay faster than peanuts do in storage.", "The two foods are experimental materials; their chemistry is never discussed."],
        ["how corvid brains evolved separately from those of mammals.", "Brain organisation appears once, in the final paragraph, as a closing point."],
      ],
      why: "The passage says \"the interesting question is what the bird has to know in order to do it,\" then reports each result together with the objection to it and the position that remains defensible.",
      steps: [
        "Note the question the first paragraph poses.",
        "Check that the option accounts for the objections as well as the findings.",
      ],
      hint: "Every experiment in the passage is followed by a caution.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, jays returned to their caches after five days chose to recover:",
      key: "the peanuts and not the larvae.",
      wrong: [
        ["the larvae and not the peanuts.", "That is what the birds did after four hours, when the larvae were still fresh."],
        ["both foods in roughly equal numbers.", "The passage says they ignored one food entirely rather than dividing their effort."],
        ["neither food until the trays were refilled.", "The birds do recover food at five days; no refilling is described."],
      ],
      why: "The second paragraph says that when the birds were let back after five days, \"they ignored the larvae entirely and dug up the peanuts.\"",
      steps: [
        "Find the sentence describing the five-day condition.",
        "Distinguish it from the four-hour condition in the sentence before.",
      ],
      hint: "Two delays are described in consecutive sentences.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-behaviour",
      difficulty: "Easy",
      stem: "The passage reports that a jay was more likely to re-hide its food if the bird:",
      key: "had stolen from other birds' caches before.",
      wrong: [
        ["had been kept from its cache for several days.", "Delay affects which food is recovered, not whether a cache is moved."],
        ["had cached larvae rather than peanuts that day.", "The re-hiding result is not reported as depending on the food type."],
        ["was returning to a tray it had not used before.", "Familiarity with the tray is not among the conditions the passage describes."],
      ],
      why: "The fifth paragraph says jays \"that had themselves stolen from other birds' caches were far more likely to re-hide their own food if another jay had watched them,\" and that birds with no such history \"did not show the effect.\"",
      steps: [
        "Locate the second experiment described in the fifth paragraph.",
        "Identify which group of birds showed the behaviour.",
      ],
      hint: "The passage contrasts two groups of birds by their own history.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the fourth paragraph, the word *rule* refers to:",
      key: "a general fact a bird could learn about food.",
      wrong: [
        ["a procedure imposed on the birds by researchers.", "The rule described is something the bird might form, not a protocol applied to it."],
        ["a pattern in where the birds prefer to cache.", "The objection concerns knowledge about time and decay, not about places."],
        ["a limit on how long a trial was allowed to run.", "No constraint on trial length is discussed anywhere in the passage."],
      ],
      why: "The paragraph gives the content directly: \"peanuts stay good, larvae go bad after four days,\" and calls this \"knowing a fact about the world, not reliving an episode.\"",
      steps: [
        "Read the clause that spells out what the rule would say.",
        "Note the contrast drawn at the end of the paragraph.",
      ],
      hint: "The passage states the rule in the bird's own terms.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The experiment in which jays learned about faster decay after caching is presented as evidence that the birds:",
      key: "can apply new information to an older stored record.",
      wrong: [
        ["can smell the condition of food without digging it up.", "The passage says the birds did not sample the larvae and walked past them."],
        ["prefer peanuts once they have eaten spoiled larvae.", "No change in preference is reported; the birds still prefer larvae strongly."],
        ["learn faster when tested in an unfamiliar context.", "The separate context is where the learning happened, not a speed comparison."],
      ],
      why: "The passage says the birds changed their behaviour on caches made \"*before* they learned it,\" and that \"a rule formed at the time of caching cannot do that; the birds appear to be revisiting a stored record.\"",
      steps: [
        "Note when the caches were made relative to when the birds learned.",
        "Read what the passage says a rule formed earlier could not account for.",
      ],
      hint: "The design turns on the order of two events.",
    },
    {
      subskill: "function",
      family: "function-of-a-term",
      difficulty: "Medium",
      stem: "The introduction of the term *episodic-like* memory functions in the passage to:",
      key: "record a concession the researchers made to their critics.",
      wrong: [
        ["mark a discovery that superseded the earlier findings.", "The findings stand; only the name attached to them was narrowed."],
        ["distinguish jays from other corvids that were tested.", "No comparison among corvid species appears in the passage."],
        ["name a memory system found only in birds and primates.", "The term marks uncertainty about interpretation, not a taxonomy of systems."],
      ],
      why: "The passage says critics \"proposed calling the capacity *episodic-like* memory, and Clayton's group accepted the term, which is why the literature now uses it.\" The hedge is the point of the word.",
      steps: [
        "Find who proposed the term and who adopted it.",
        "Ask what the added word is protecting against.",
      ],
      hint: "The word was suggested by the objectors, not by the discoverers.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The observation that the birds \"walked past\" the larvae is offered to show that they:",
      key: "decided without inspecting the cached food.",
      wrong: [
        ["had forgotten the location of those caches.", "The passage says the jays could locate caches accurately over months."],
        ["preferred peanuts to larvae in general terms.", "The birds are described as preferring larvae strongly when fresh."],
        ["were disturbed by the researchers' presence.", "No effect of observers on this part of the experiment is described."],
      ],
      why: "The third paragraph says \"the larvae had not visibly changed and the birds did not sample them; they walked past,\" which rules out judging the food on the spot.",
      steps: [
        "Read the sentence that says what the birds did not do.",
        "Ask what possibility that sentence is designed to exclude.",
      ],
      hint: "The detail rules out one obvious explanation.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the sixth paragraph is to:",
      key: "urge that a striking result be stated modestly.",
      wrong: [
        ["dismiss the re-hiding experiment as poorly designed.", "The design is not faulted; the caution concerns what may be concluded from it."],
        ["argue that stress explains all of the birds' caching.", "Stress is offered as one alternative for one result, not as a general account."],
        ["show that jays understand what rivals are thinking.", "The paragraph is written against that conclusion, calling the leap enormous."],
      ],
      why: "The paragraph says the leap to \"a claim about mental attribution is enormous,\" lists ordinary alternatives, and ends: \"careful researchers state the finding at the level the design supports.\"",
      steps: [
        "Identify which result the paragraph is about.",
        "Read its final sentence, which states the standard being recommended.",
      ],
      hint: "The paragraph's last sentence names the practice it endorses.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which finding most directly undermines the position the field held in 1990?",
      key: "Jays track what, where, and when without any language.",
      wrong: [
        ["Jays recover most of the food they cache across a season.", "Recovery on that scale was already known and needs only location memory."],
        ["Jays re-hide food when they have been watched by a rival.", "The passage treats this result as too uncertain to carry a strong conclusion."],
        ["Corvid forebrains diverged from mammals long ago in time.", "Anatomy alone shows difference of structure, not what the birds can do."],
      ],
      why: "The last paragraph says the untenable position was \"that this kind of memory required language, or a primate brain, or both,\" and the what-where-when result establishes the capacity in an animal with neither.",
      steps: [
        "State the 1990 position in one sentence.",
        "Ask which result would have to be false for it to survive.",
        "Reject results the passage itself hedges or treats as long known.",
      ],
      hint: "The claim being refuted is about what memory requires.",
      trap: "Choosing the most dramatic experiment rather than the one that meets the claim.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-objection",
      difficulty: "Hard",
      stem: "The passage treats the critics' objection to the original finding as:",
      key: "well founded and answered by a later experimental design.",
      wrong: [
        ["mistaken, since the birds did not sample the cached food.", "Not sampling rules out on-the-spot inspection but not a learned rule."],
        ["unanswerable, since no experiment can separate the two accounts.", "The passage reports a design intended to do exactly that, and describes its result."],
        ["irrelevant, since the term in use was changed to accommodate it.", "The change of term is presented as a genuine concession, not as a dismissal."],
      ],
      why: "The passage calls the objection \"a good one,\" then says the experiments that followed \"were designed to press on the difference,\" and reports birds updating caches made before they learned about faster decay.",
      steps: [
        "Find the author's explicit verdict on the objection.",
        "Identify the experiment introduced in response to it.",
        "Check whether the passage says that experiment succeeded.",
      ],
      hint: "One sentence rates the objection; the next paragraph answers it.",
      trap: "Mistaking the change in terminology for the whole of the response.",
    },
  ],
};
