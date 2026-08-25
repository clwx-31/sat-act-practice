"use strict";

module.exports = {
  id: "act-english-p013",
  type: "personal-essay",
  title: "Ninety-One Species",
  content: `[1] I started the list because I was bored. I had mononucleosis the
fall of my sophomore {1 year, and missed} nine weeks of school, and for most of
that time the only thing I could do without getting tired {2 was} sit in the
chair by the front window.

[2] {3} My mother brought home a field guide from the {4 library, I think she
wanted to stop me} from staring at the ceiling. The first week I wrote down four
{5 birds} names: house sparrow, starling, crow, robin. I assumed that was the
entire population of the yard.

[3] It was not. By the end of October I had {6 eleven, by March I had thirty.}
The birds had not changed; I {7 was the thing that was different}. A house
sparrow and a house finch {8 is} not remotely alike once you have looked at
both, and until you have looked at both they are the same brown bird.

[4] {9 Nevertheless,} what the list did was make the window worth sitting at.
There is a difference between looking and looking for something, and the list
{10 supplied the second one of those two things}. I started noticing the
{11 juncos in the yard that arrive in late October and leave in the first week
of April}.

[5] I am back at school now. I still keep {12 it}. {13} Ninety-one species from
one window, which a serious birder would find unimpressive and which took me
three years.

[6] I did not learn to love birds. I {14 learned} that a thing gets interesting
in proportion to how long you are made to look at it, and that I found this out
only because I was too sick to look at anything else.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-with-compound-predicate",
      difficulty: "Easy",
      keep: false,
      key: "year and missed",
      noChange: "A comma before 'and' needs a second subject after it, and none appears.",
      wrong: [
        ["year; and missed", "A semicolon must join independent clauses, and 'missed nine weeks' is not one."],
        ["year, and I missed,", "The added comma after the verb separates it from its own object."],
      ],
      why:
        "'Had' and 'missed' share the subject 'I,' so they form a compound predicate, which takes no " +
        "comma before its conjunction.",
      steps: [
        "Look for a subject after 'and.' There is none.",
        "Remove the comma.",
      ],
      hint: "Ask whether the words after 'and' could stand alone as a sentence.",
      trap: "The sentence is long and pauses naturally there in speech.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "linking-verb-with-a-singular-subject",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["were", "The plural verb does not agree with the singular subject 'the only thing.'"],
        ["is", "The present tense contradicts a sophomore-year illness the essay places in the past."],
        ["had been", "The past perfect places the sitting before some earlier past that is never named."],
      ],
      why:
        "The subject is 'the only thing,' singular, and the paragraph narrates in the simple past. " +
        "Everything between the subject and the verb is a modifier.",
      steps: [
        "Strip the clause 'I could do without getting tired.'",
        "Read 'the only thing … was' and confirm the match.",
      ],
      hint: "Cut the clause between the subject and the verb before deciding.",
      trap: "'Nine weeks' and 'school' sit nearby and pull the ear toward a plural.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Nine weeks is long enough for boredom to turn into something else.",
      wrong: [
        [
          "Mononucleosis is caused by the Epstein-Barr virus and is common among teenagers.",
          "A clinical fact about the illness has nothing to do with the list the essay is about.",
        ],
        [
          "Field guides to North American birds have been published continuously since 1934.",
          "The publishing history of field guides never comes up again in the essay.",
        ],
        [
          "There were several things that helped me get through that particular autumn.",
          "The vague plural promises a list of remedies the paragraph does not deliver.",
        ],
      ],
      why:
        "Paragraph 1 ends with a bored, tired narrator in a chair. This paragraph is where that " +
        "boredom starts becoming the list, so the opening should mark the turn.",
      steps: [
        "Note what paragraph 1 leaves the reader with: boredom and a window.",
        "Choose the opening that turns that state into the paragraph's subject.",
      ],
      hint: "The best opening makes the sentences after it feel like a consequence.",
      trap: "The medical detail is accurate and specific, which is what makes it tempting.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "library, and I think she wanted to stop me",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "library, I think, she wanted to stop me",
          "The added commas turn 'I think' into an aside and leave the splice in place.",
        ],
        [
          "library; and I think she wanted to stop me",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "'My mother brought home a field guide' and 'I think she wanted to stop me' are both complete " +
        "sentences, so joining them takes a comma plus a conjunction.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "Cover the comma and read each half aloud on its own.",
      trap: "'I think' sounds like an interrupter, which makes the second clause feel subordinate.",
    },
    {
      number: 5,
      subskill: "apostrophes",
      family: "plural-possessive",
      difficulty: "Easy",
      keep: false,
      key: "birds'",
      noChange: "The bare plural shows no possession, so the names belong to nothing.",
      wrong: [
        ["bird's", "The singular possessive contradicts 'four' in the same phrase."],
        ["birds's", "The form is standard for neither the singular nor the plural possessive."],
      ],
      why:
        "Four birds own the four names, so the noun takes the plural possessive: the plural spelling " +
        "followed by an apostrophe.",
      steps: [
        "Decide how many birds there are. Four.",
        "Add the apostrophe after the s of the plural.",
      ],
      hint: "Spell the plural first, then place the apostrophe.",
      trap: "'Four birds names' scans as a natural phrase, so nothing looks misspelled.",
    },
    {
      number: 6,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "eleven; by March I had thirty.",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "eleven: by March I had thirty.",
          "A colon introduces an explanation, but the second clause is the matching half of a pair.",
        ],
        [
          "eleven and by March I had thirty.",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The two clauses are short, complete, and deliberately parallel — one count, then a larger " +
        "one. A semicolon joins equals and keeps the progression audible.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or matches it. It matches.",
      ],
      hint: "Two short, balanced sentences are what a semicolon is best at.",
      trap: "The clauses are brief enough to read as one thought, which makes a comma feel sufficient.",
    },
    {
      number: 7,
      subskill: "precision",
      family: "wordy-predicate",
      difficulty: "Medium",
      keep: false,
      key: "had",
      noChange: "'Was the thing that was different' takes six words to complete a two-word parallel.",
      wrong: [
        ["was different", "The verb no longer matches 'had not changed' in the first half."],
        ["was the one who had changed", "The clause restates the parallel instead of completing it."],
      ],
      why:
        "The first clause is 'The birds had not changed.' The second answers it by repeating the " +
        "auxiliary and nothing else, which is what makes the reversal land.",
      steps: [
        "Read the first clause and note its verb: 'had not changed.'",
        "Complete the parallel with the same auxiliary alone.",
      ],
      hint: "The sentence is built on a contrast; the shortest completion is the sharpest.",
      trap: "The longer versions state the meaning outright, which feels clearer and reads flatter.",
    },
    {
      number: 8,
      subskill: "subject-verb agreement",
      family: "compound-subject-with-and",
      difficulty: "Easy",
      keep: false,
      key: "are",
      noChange: "Two nouns joined by 'and' form a plural subject and take a plural verb.",
      wrong: [
        ["was", "The verb is still singular and the past tense breaks the present-tense claim."],
        ["has been", "The singular present perfect misses the number and reports a finished span."],
      ],
      why: "'A house sparrow and a house finch' names two birds, so the verb is plural.",
      steps: [
        "Count the nouns in the subject. There are two.",
        "Choose the plural verb.",
      ],
      hint: "Two things joined by 'and' are always plural, however singular each one is.",
      trap: "Each half of the subject is singular, and the second one sits closest to the verb.",
    },
    {
      number: 9,
      subskill: "transitions",
      family: "concession-versus-addition-transition",
      difficulty: "Medium",
      keep: false,
      key: "More than that,",
      noChange: "'Nevertheless' concedes something, but this paragraph extends the previous point.",
      wrong: [
        ["For example,", "The window becoming worth sitting at is not an instance of learning to tell birds apart."],
        ["In contrast,", "The paragraph builds on the last one rather than opposing it."],
      ],
      why:
        "Paragraph 3 says the narrator changed rather than the birds. Paragraph 4 goes further and " +
        "says what the list did, so the transition should add rather than concede.",
      steps: [
        "Ask whether this paragraph pushes against the last one or goes beyond it.",
        "Choose the transition that adds.",
      ],
      hint: "Name the relationship before reading the choices, or all three will sound possible.",
      trap: "'Nevertheless' sounds thoughtful and asserts a reversal the essay never makes.",
    },
    {
      number: 10,
      subskill: "conciseness",
      family: "wordy-reference",
      difficulty: "Easy",
      keep: false,
      key: "supplied the second",
      noChange: "'One of those two things' restates a contrast the sentence has just drawn.",
      wrong: [
        ["supplied the second of those two", "'Of those two' still repeats what the sentence established."],
        ["supplied the second thing mentioned", "'Thing mentioned' adds words without adding meaning."],
      ],
      why:
        "The sentence has just named two activities. 'The second' points at one of them without " +
        "having to count them again.",
      steps: [
        "Notice that the sentence already named exactly two things.",
        "Cut every word that only reminds the reader there were two.",
      ],
      hint: "An ordinal like 'the second' already implies the set it comes from.",
      trap: "The longer phrasing feels more explicit, and explicitness reads as clarity.",
    },
    {
      number: 11,
      subskill: "modifiers",
      family: "misplaced-relative-clause",
      difficulty: "Hard",
      keep: false,
      key: "juncos that arrive in the yard in late October and leave in the first week of April",
      noChange: "The relative clause sits next to 'the yard,' so it describes the yard rather than the juncos.",
      wrong: [
        [
          "juncos that arrive in late October in the yard and leave in the first week of April",
          "The clause now modifies the juncos but strands the location inside the first verb phrase.",
        ],
        [
          "juncos in the yard, which arrive in late October and leave in the first week of April",
          "The comma makes the clause nonrestrictive, implying all juncos everywhere do this.",
        ],
      ],
      why:
        "A relative clause modifies the noun immediately before it. Moving 'in the yard' inside the " +
        "clause puts 'juncos' next to 'that' and keeps the clause restrictive.",
      steps: [
        "Ask what arrives in October. The juncos do, not the yard.",
        "Rearrange so the clause follows 'juncos' directly.",
      ],
      hint: "Find the noun the clause is supposed to describe and put it next to 'that.'",
      trap: "The meaning is obvious from context, and obviousness hides the misplacement.",
    },
    {
      number: 12,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["them", "The plural pronoun does not agree with the singular noun 'the list.'"],
        ["that one", "The phrase is vaguer than the pronoun and points at nothing specific."],
        ["the same", "The phrase names no noun and leaves what is kept unstated."],
      ],
      why:
        "The pronoun refers to the list, the essay's subject from its first sentence and the only " +
        "singular thing in it that could be kept.",
      steps: [
        "Ask what the narrator still keeps: the list.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The essay's first sentence names the antecedent.",
      trap: "'Birds' and 'species' are plural and nearby, which colors the ear toward 'them.'",
    },
    {
      number: 13,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “The record " +
        "for a single North American yard list is well over two hundred species.” Should the writer " +
        "make this addition?",
      key: "No, because the essay is not measuring the list against anyone else's.",
      wrong: [
        [
          "Yes, because it shows the reader how modest ninety-one species really is.",
          "The next clause already concedes that a serious birder would be unimpressed.",
        ],
        [
          "Yes, because it establishes that yard lists are a recognized practice among birders.",
          "The essay never questions whether the practice is recognized, so nothing needs establishing.",
        ],
        [
          "No, because the essay has already stated how many species the narrator recorded.",
          "Repeating a number is not the problem; the comparison to a record is.",
        ],
      ],
      why:
        "The essay is about attention over three years, not about ranking. The sentence that follows " +
        "already handles the modesty of the number, in the narrator's own voice.",
      steps: [
        "Name what the paragraph is doing: reporting a total and pre-empting the reader's judgment.",
        "Test the sentence against that, not against whether it is true.",
      ],
      hint: "Read the sentence that follows the marker before deciding.",
      trap: "The record seems to supply useful scale for a number the reader cannot otherwise judge.",
    },
    {
      number: 14,
      subskill: "consistency",
      family: "tense-consistency-in-a-closing",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["have learned", "The present perfect breaks the parallel with 'did not learn' beside it."],
        ["had learned", "The past perfect places the learning before some earlier past that is not named."],
        ["learn", "The present tense contradicts the completed account the paragraph is closing."],
      ],
      why:
        "The paragraph sets two clauses against each other — what the narrator did not learn and what " +
        "they did. The contrast only works when both verbs are in the same tense.",
      steps: [
        "Read the previous sentence and note its verb: 'did not learn.'",
        "Match the underlined verb to it.",
      ],
      hint: "The sentence before this one sets the tense the contrast has to use.",
      trap: "The present perfect sounds more reflective, which suits a closing paragraph.",
    },
    {
      number: 15,
      subskill: "conclusions",
      family: "closing-sentence",
      difficulty: "Hard",
      stem:
        "The writer is considering deleting the final clause of the essay, “and that I found this " +
        "out only because I was too sick to look at anything else.” Should the clause be kept or " +
        "deleted?",
      key: "Kept, because it ties the essay's conclusion back to the illness that produced it.",
      wrong: [
        [
          "Kept, because it reminds the reader how many weeks of school the narrator missed.",
          "The clause gives no number and does not concern the schooling that was lost.",
        ],
        [
          "Deleted, because the essay has already explained that the narrator was ill.",
          "Naming the illness again is not what the clause does; it makes the illness the cause.",
        ],
        [
          "Deleted, because it undercuts the general claim the sentence has just made.",
          "Limiting the claim to how the narrator arrived at it is what makes the claim honest.",
        ],
      ],
      why:
        "Without the clause the essay ends on a general maxim anyone could write. With it, the maxim " +
        "is earned by the specific nine weeks the essay has just described.",
      steps: [
        "Read the sentence without the clause and note what it becomes.",
        "Keep the reason that identifies what the clause adds.",
      ],
      hint: "Ask what the sentence would lose, not what it would still say.",
      trap: "The clause does narrow a broad statement, which is usually a reason to cut.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about how a limitation produced an " +
        "ability rather than prevented one. Would this essay accomplish that goal?",
      key: "Yes, because being confined to one chair is what made a single window worth learning.",
      wrong: [
        [
          "Yes, because the narrator recorded ninety-one species over the course of three years.",
          "The total is the outcome; the goal asks what produced it.",
        ],
        [
          "No, because the narrator says outright that the birds themselves never changed.",
          "That the birds stayed the same is precisely what makes the change the narrator's.",
        ],
        [
          "No, because the essay describes an illness rather than a skill the narrator developed.",
          "The illness occupies one paragraph; the skill it forced occupies the other five.",
        ],
      ],
      why:
        "Nine weeks in a chair removed every option but one window, and the essay's closing states " +
        "outright that the looking is what made the yard interesting.",
      steps: [
        "Name the limitation and the ability the essay pairs.",
        "Keep the reason that connects them as cause and effect.",
      ],
      hint: "The last sentence of the essay states the relationship in plain terms.",
      trap: "One wrong choice quotes the essay accurately and reaches the opposite conclusion.",
    },
  ],
};
