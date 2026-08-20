"use strict";

module.exports = {
  id: "act-reading-p050",
  type: "humanities",
  title: "The Back of the Book",
  intro: "This passage is adapted from an essay on the history of the book index.",
  content: `An index is a machine for not reading a book, and that is not a criticism. It was
invented, twice, in the thirteenth century, by people who had a specific problem: preachers
and scholars needed to find every passage in an enormous body of text that bore on a
particular word, and reading the whole of it every time was not available to them.

The two inventions were the alphabetical subject index, produced by Dominicans at Saint
Jacques in Paris, and the concordance, which lists every occurrence of every word in a text.
Both required something that seems trivial and was not: a stable way of pointing at a place.
A manuscript copied by hand has no fixed pagination; the same work in two copies has the
text in different positions. The Paris concordance solved this by dividing the biblical books
into chapters and then into seven lettered sections, so that a reference located a passage in
any copy. The chapter divisions still in use were made for the purpose of being cited.

Alphabetical order is the other thing worth noticing, because it was not obvious and was
resisted. To arrange topics alphabetically is to arrange them in an order with no relation to
their importance, their logical connection, or the order in which God is presumed to have
made things. Medieval scholars who used alphabetical order frequently apologised for it in
prefaces, explaining that it was a concession to the weakness of memory and not a claim about
the world. It won because it is the only ordering a stranger can navigate without being told
the scheme.

What an index does to reading is genuinely double, and both effects were noticed early. It
makes a large text usable, which is the whole point, and it makes it possible to use a book
one has not read, which alarmed people from the beginning. Sixteenth-century complaints about
scholars who know only the indexes are indistinguishable in tone from twenty-first-century
complaints about people who know only the search results, and they are complaining about the
same thing, which is that a tool for finding has become a substitute for having read.

The interesting question is whether the complaint is correct, and the honest answer is that it
depends on what the reader is doing. If the object is to find every mention of a term, an
index is not a shortcut; it is the correct instrument, and doing it by reading would be worse
as well as slower. If the object is to understand an argument, the index is actively
misleading, because an argument is not distributed evenly across the pages that mention its
key term. The best pages on a subject often do not contain the word.

Professional indexers say this last point more sharply than anyone. A good index is not a
list of where words appear — software has done that since the 1960s and it is not an index.
It is a map of what the book is about, made by somebody who has read it and who decides that
this discussion of markets belongs under *scarcity*, that these four scattered pages are one
topic, and that the author's term for something is not the term a reader will look up.
Building it requires the judgement the index then allows the reader to skip, which is the
central oddity of the form.

That is why an index cannot be generated and why the good ones are increasingly rare. They
take a skilled reader several days per book, they are invisible when done well, and the first
economy available to a publisher under pressure is the one nobody notices until they need it.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "what an index is for and what making one requires.",
      wrong: [
        ["how medieval scholars organised their libraries.", "Libraries as institutions are not discussed in the passage."],
        ["why alphabetical order replaced logical arrangement.", "Alphabetisation is one stage in the larger account."],
        ["how software has changed the publishing industry.", "Software appears once, as something an index is not."],
      ],
      why: "The passage explains the index's purpose, the double effect it has on reading, and closes by describing the judgement an indexer supplies and the economy that removes it.",
      steps: [
        "Note the definition offered in the first sentence.",
        "Check that the option covers the final two paragraphs on making one.",
      ],
      hint: "The last paragraphs are about the indexer, not the reader.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the Paris concordance located passages by dividing biblical books into chapters and then into:",
      key: "seven lettered sections.",
      wrong: [
        ["numbered pages in each copy.", "The passage says handwritten copies had no fixed pagination."],
        ["alphabetical lists of topics.", "Alphabetical subject indexing was the other invention."],
        ["paragraphs marked by the scribe.", "No scribal marking scheme is described in the passage."],
      ],
      why: "The passage says the concordance divided the books \"into chapters and then into seven lettered sections, so that a reference located a passage in any copy.\"",
      steps: [
        "Find the sentence describing the concordance's method.",
        "Take the subdivision it names after chapters.",
      ],
      hint: "A number and a kind of marking are given together.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-practice",
      difficulty: "Easy",
      stem: "The passage says medieval scholars apologised for alphabetical order because it arranges topics with no relation to their:",
      key: "importance or logical connection.",
      wrong: [
        ["frequency in the text being indexed.", "Frequency is not among the orderings the passage mentions."],
        ["position in the manuscript's chapters.", "Chapter position is what a reference records, not what order ignores."],
        ["difficulty for an inexperienced reader.", "Difficulty is what alphabetical order was said to relieve."],
      ],
      why: "The passage says to arrange topics alphabetically \"is to arrange them in an order with no relation to their importance, their logical connection, or the order in which God is presumed to have made things.\"",
      steps: [
        "Locate the sentence listing what alphabetical order ignores.",
        "Take the items it names.",
      ],
      hint: "The sentence lists three things in a row.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "The passage calls an index \"a machine for not reading a book\" chiefly to indicate that it:",
      key: "lets a reader reach a passage directly.",
      wrong: [
        ["discourages people from finishing long books.", "The passage says the description is not a criticism."],
        ["replaces the need for any reading at all.", "The indexer must read the book completely to build it."],
        ["was designed to save the cost of printing.", "Cost enters only in the final paragraph, about publishers."],
      ],
      why: "The passage says its inventors needed to find every passage bearing on a word, and that \"reading the whole of it every time was not available to them.\"",
      steps: [
        "Read the sentence following the phrase.",
        "Note the problem the invention was built to solve.",
      ],
      hint: "The next sentence describes what the users needed.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-uses",
      difficulty: "Medium",
      stem: "The passage says an index is the correct instrument when a reader wants to:",
      key: "find every mention of a particular term.",
      wrong: [
        ["follow the development of an argument.", "The passage calls the index actively misleading for that purpose."],
        ["decide whether a book is worth buying.", "Purchasing decisions are not discussed in the passage."],
        ["compare two books on the same subject.", "No comparison across books is described."],
      ],
      why: "The passage says if the object is to find every mention of a term, \"an index is not a shortcut; it is the correct instrument,\" while for understanding an argument it misleads.",
      steps: [
        "Find the two purposes the paragraph distinguishes.",
        "Match each with the verdict the passage gives.",
      ],
      hint: "The paragraph gives one purpose the index suits and one it does not.",
    },
    {
      subskill: "function",
      family: "function-of-a-comparison",
      difficulty: "Medium",
      stem: "The comparison between sixteenth-century and modern complaints serves mainly to:",
      key: "show that the worry is old rather than new.",
      wrong: [
        ["argue that search results are worse than indexes.", "The passage treats the two complaints as the same complaint."],
        ["establish that indexes were resisted by publishers.", "Publisher resistance concerns cost and appears at the end."],
        ["explain why alphabetical order was apologised for.", "The apologies concern ordering, not superficial reading."],
      ],
      why: "The passage says the two sets of complaints \"are indistinguishable in tone\" and \"are complaining about the same thing, which is that a tool for finding has become a substitute for having read.\"",
      steps: [
        "Note what the passage says the two complaints have in common.",
        "Ask what pairing them across four centuries establishes.",
      ],
      hint: "The point is the continuity, not the ranking.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which detail best supports the claim that an index is not a list of where words appear?",
      key: "An indexer files a discussion under a word the book never uses.",
      wrong: [
        ["Software has produced such lists since the 1960s.", "This says what software does, not what an index adds."],
        ["A good index takes a skilled reader several days.", "Effort shows the cost of the work, not its nature."],
        ["Chapter divisions were created for the sake of citation.", "That concerns referencing, not the content of an index."],
      ],
      why: "The passage says an indexer \"decides that this discussion of markets belongs under *scarcity*\" and that \"the author's term for something is not the term a reader will look up.\"",
      steps: [
        "Identify what a purely mechanical list could not do.",
        "Find the example of a judgement the indexer makes.",
        "Reject details about effort or about citation.",
      ],
      hint: "The decisive evidence is a heading the text does not contain.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-claim",
      difficulty: "Hard",
      stem: "The passage calls the form's central oddity the fact that building an index:",
      key: "demands the reading it then spares the reader.",
      wrong: [
        ["requires alphabetical order despite its arbitrariness.", "Alphabetisation is defended as navigable, not called odd."],
        ["is paid for by publishers rather than by readers.", "Payment is raised only as an economy near the end."],
        ["produces a tool that few readers ever consult.", "The passage says indexes are needed and missed when absent."],
      ],
      why: "The passage says building an index \"requires the judgement the index then allows the reader to skip, which is the central oddity of the form.\"",
      steps: [
        "Find the sentence in which the phrase appears.",
        "Note the two parties it contrasts: maker and reader.",
        "Reject options concerning ordering or economics.",
      ],
      hint: "The oddity is about who does the reading.",
      trap: "Mistaking a remark about labour for a remark about cost.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Hard",
      stem: "Which finding, if true, would most weaken the passage's claim that an index cannot be generated?",
      key: "Automated indexes match human ones on scattered topics.",
      wrong: [
        ["Software can list every word in a text instantly.", "The passage grants this and says such a list is not an index."],
        ["Readers rarely notice which index a book contains.", "Invisibility is exactly what the passage says a good index has."],
        ["Publishers have reduced their spending on indexing.", "Reduced spending confirms the passage's closing point."],
      ],
      why: "The passage grounds the claim in judgement: gathering \"these four scattered pages\" into one topic and choosing headings the author never used. A system matching human indexers on precisely that would undercut it.",
      steps: [
        "Identify which judgements the passage says a machine cannot make.",
        "Look for evidence that a machine makes them anyway.",
        "Reject findings the passage already concedes.",
      ],
      hint: "The claim rests on grouping and naming, not on listing.",
      trap: "Choosing the capability the passage explicitly grants to software.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Hard",
      stem: "The passage implies that the best pages on a subject often lack its key term because:",
      key: "an argument is not distributed by vocabulary.",
      wrong: [
        ["authors deliberately avoid repeating a term.", "No authorial strategy of avoidance is described."],
        ["indexers move discussions to other headings.", "Indexers respond to this fact rather than causing it."],
        ["readers look up terms other than the author's.", "That is a separate difficulty about the reader's vocabulary."],
      ],
      why: "The passage says the index misleads about arguments \"because an argument is not distributed evenly across the pages that mention its key term. The best pages on a subject often do not contain the word.\"",
      steps: [
        "Find the sentence explaining why the index misleads.",
        "Note that the claim is about how arguments are built.",
        "Reject explanations that attribute the effect to a person's choice.",
      ],
      hint: "The reason is stated immediately before the observation.",
      trap: "Attributing to authors or indexers what the passage attributes to the nature of argument.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the final paragraph is to:",
      key: "explain why good indexes are disappearing.",
      wrong: [
        ["urge readers to check an index before buying.", "No advice to readers is offered in the paragraph."],
        ["show that indexing has become faster to do.", "The passage says it takes several days per book."],
        ["blame indexers for the decline in quality.", "The cause given is publishers' economising, not indexers' work."],
      ],
      why: "The paragraph says good indexes \"are invisible when done well,\" take days of skilled reading, and that cutting them \"is the one nobody notices until they need it.\"",
      steps: [
        "Note the three facts the paragraph states in one sentence.",
        "Ask what conclusion they jointly support.",
      ],
      hint: "The paragraph explains an economic pressure and its result.",
    },
  ],
};
