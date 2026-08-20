"use strict";

module.exports = {
  id: "act-reading-p054",
  type: "social-science",
  title: "First Bell",
  intro: "This passage is adapted from an article on the debate over school start times.",
  content: `The biological finding is not in dispute and has not been for twenty years. At puberty
the timing of the circadian system shifts later by about two hours, in every population that
has been measured, and it shifts back in the early twenties. A sixteen-year-old told to be
asleep at ten is being asked to sleep at what their body treats as eight in the evening.
Most cannot. The shift is not a preference, it is not caused by screens, and it appears in
adolescents with no access to electric light at all.

Set against that, a school day beginning at half past seven requires a rising time of about
six, and the arithmetic produces a chronic deficit of one to two hours a night through the
school week, partly repaid at weekends by a sleep pattern that then makes Monday worse.

The intervention follows obviously: start later. Districts that have done so have been
studied more carefully than most education reforms, because the change is sharp, dated, and
applies to everybody at once. The results are consistent. Students sleep between twenty and
forty-five minutes longer on school nights — less than the delay, because bedtimes drift
later too, but a real gain. Attendance improves. Reported daytime sleepiness falls. In
districts with the necessary records, crash rates among teenaged drivers fall in the morning
hours, which is the single most robust finding in the literature and the one least often
quoted.

Academic effects are smaller and less consistent than advocates usually suggest. Some studies
find modest improvements in grades; others find none; the honest summary is that the health
and safety case is strong and the attainment case is weak. That distinction matters, because
the reform is usually sold on attainment and then evaluated on it.

The reason the change is difficult has almost nothing to do with any of this. A school
district's start times are the visible end of a transport system. Most districts run each bus
on two or three routes in sequence — high school first, then middle, then elementary —
because running them simultaneously would require two or three times the buses and drivers.
Move the high school later and either the elementary schools move earlier, putting the
youngest children at stops in the dark, or the district buys a fleet it does not have.

Around that constraint sits everything else. Athletic practice uses the last daylight of the
afternoon and competes with other districts on a shared schedule. Older students work
shifts. Families with two jobs have arranged childcare around a bell that has not moved in
thirty years, and a change of an hour is not an inconvenience to them but a crisis requiring
a new arrangement they may not be able to make.

None of these is an argument that the start time is correct. They are the reasons a correct
change is expensive, and they explain a pattern that recurs: districts adopt the reform, meet
the transport cost in the second year, and quietly reverse it, and the reversal is not
reported by anybody. Where the change has held, it has usually been because a state
legislature imposed it on every district at once, which removes the competitive problem in
athletics and forces the transport question to be solved rather than avoided.

The literature's own conclusion is unglamorous. This is not a case where evidence is
contested or where a lobby is suppressing a finding. It is a case where the evidence is
clear, the beneficiaries are children who do not vote, the costs are concentrated, immediate,
and land on a budget line somebody has to defend, and the benefits are diffuse and arrive
later. Reforms with that shape are hard whatever the evidence says, and treating the
difficulty as ignorance is the mistake advocates most often make.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "why a well-supported reform is nonetheless hard to adopt.",
      wrong: [
        ["how adolescent sleep patterns differ from adults'.", "The biology occupies the opening and is offered as settled."],
        ["whether later start times improve academic results.", "Attainment is one part of the evidence the passage reviews."],
        ["how school districts organise their bus networks.", "Transport is the leading obstacle, not the subject."],
      ],
      why: "The passage sets out the biology and the evidence, then devotes its second half to transport, athletics, childcare, and the shape of the political problem.",
      steps: [
        "Note where the passage stops presenting evidence.",
        "Check that the option covers the closing paragraph.",
      ],
      hint: "The final paragraph names the kind of problem this is.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the circadian shift at puberty is about:",
      key: "two hours later.",
      wrong: [
        ["two hours earlier.", "The shift described runs later, not earlier."],
        ["forty-five minutes later.", "That figure is the upper bound on extra sleep after a start-time change."],
        ["one hour later.", "One to two hours is the resulting nightly deficit, not the shift."],
      ],
      why: "The passage says \"the timing of the circadian system shifts later by about two hours, in every population that has been measured.\"",
      steps: [
        "Find the sentence describing the shift.",
        "Distinguish its size from the other figures given later.",
      ],
      hint: "Several numbers appear; take the one attached to the shift itself.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-constraint",
      difficulty: "Easy",
      stem: "The passage says districts run buses on two or three routes in sequence because running them at once would require:",
      key: "several times as many buses and drivers.",
      wrong: [
        ["a change to the state's transport regulations.", "No regulatory obstacle to simultaneous routes is described."],
        ["elementary schools to start in the dark.", "That is a consequence of moving times, not of simultaneous running."],
        ["agreement from neighbouring school districts.", "Inter-district agreement concerns athletics, not bus scheduling."],
      ],
      why: "The passage says districts stagger routes \"because running them simultaneously would require two or three times the buses and drivers.\"",
      steps: [
        "Locate the sentence about sequenced bus routes.",
        "Read the clause after *because*.",
      ],
      hint: "The reason is a multiple of the existing fleet.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "The passage says a change of an hour is \"not an inconvenience\" to some families but a crisis because they:",
      key: "have built childcare around the existing bell.",
      wrong: [
        ["live too far from the school to adjust.", "Distance is not raised as a difficulty for families."],
        ["rely on older children to drive younger ones.", "Teenaged driving appears in the crash statistics, not here."],
        ["cannot afford the cost of the new buses.", "The fleet cost falls on the district, not on households."],
      ],
      why: "The passage says families with two jobs \"have arranged childcare around a bell that has not moved in thirty years,\" and that a change requires \"a new arrangement they may not be able to make.\"",
      steps: [
        "Find the sentence about families with two jobs.",
        "Note what the passage says they have arranged around the bell.",
      ],
      hint: "The difficulty is about what has been built on the current time.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that students gain less extra sleep than the delay in start time because they:",
      key: "go to bed later once the change is made.",
      wrong: [
        ["are woken by younger siblings leaving earlier.", "Sibling schedules are not offered as a cause of lost sleep."],
        ["take on additional shifts at outside jobs.", "Student employment is listed among constraints, not as an effect."],
        ["sleep less at weekends than they used to.", "The weekend pattern is described before the reform, not after."],
      ],
      why: "The passage says students sleep twenty to forty-five minutes longer, \"less than the delay, because bedtimes drift later too.\"",
      steps: [
        "Find the sentence quantifying the sleep gain.",
        "Read the clause explaining why it is smaller than the delay.",
      ],
      hint: "The explanation is given in the same sentence.",
    },
    {
      subskill: "function",
      family: "function-of-a-qualification",
      difficulty: "Medium",
      stem: "The author's remark that the attainment case is weak serves mainly to:",
      key: "separate the strong evidence from the weak.",
      wrong: [
        ["argue that the reform should not be adopted.", "The passage treats the change as correct and expensive."],
        ["show that the studies were poorly designed.", "The studies are described as unusually careful."],
        ["explain why districts reverse the change later.", "Reversals are attributed to transport costs, not to grades."],
      ],
      why: "The passage says \"the honest summary is that the health and safety case is strong and the attainment case is weak,\" and notes the reform is sold on attainment and then evaluated on it.",
      steps: [
        "Note the two cases the sentence distinguishes.",
        "Read the sentence that follows about how the reform is sold.",
      ],
      hint: "The remark warns about which case to argue from.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which finding does the passage identify as the most robust in the literature?",
      key: "Morning crash rates among teenaged drivers fall.",
      wrong: [
        ["Students sleep up to forty-five minutes longer.", "The sleep gain is reported without being ranked."],
        ["Attendance improves after start times move.", "Attendance is listed among the consistent results, not singled out."],
        ["Grades improve modestly in some districts.", "Grade effects are described as small and inconsistent."],
      ],
      why: "The passage says crash rates in the morning hours fall, \"which is the single most robust finding in the literature and the one least often quoted.\"",
      steps: [
        "Look for the finding the passage explicitly ranks.",
        "Note the second clause about how often it is cited.",
        "Reject results the passage reports without ranking.",
      ],
      hint: "One result is described in superlative terms.",
      trap: "Choosing the most-quoted outcome rather than the most robust one.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-position",
      difficulty: "Hard",
      stem: "The passage says state-level mandates have succeeded where district decisions failed chiefly because a mandate:",
      key: "applies to every district at the same time.",
      wrong: [
        ["provides the funding for additional buses.", "No funding is attributed to the legislature in the passage."],
        ["is harder for parents to object to publicly.", "Parental objection is not said to be reduced by a mandate."],
        ["comes with evidence districts had not seen.", "The passage denies that the difficulty is one of ignorance."],
      ],
      why: "The passage says imposing the change on every district at once \"removes the competitive problem in athletics and forces the transport question to be solved rather than avoided.\"",
      steps: [
        "Find the sentence describing what a mandate accomplishes.",
        "Note both effects it names.",
        "Reject options attributing money or new evidence to the mandate.",
      ],
      hint: "The advantage is that nobody can opt out.",
      trap: "Assuming a successful mandate must have supplied resources.",
    },
    {
      subskill: "synthesize information",
      family: "combining-sections",
      difficulty: "Hard",
      stem: "The account of quiet reversals and the closing paragraph together suggest that adoption fails mainly at the point where:",
      key: "concentrated costs meet diffuse benefits.",
      wrong: [
        ["the biological evidence is challenged by critics.", "The passage says the evidence is not contested."],
        ["parents learn that grades have not improved.", "Reversals are dated to the transport cost in the second year."],
        ["students themselves campaign against the change.", "No student opposition is described anywhere."],
      ],
      why: "Districts reverse the change once they \"meet the transport cost in the second year,\" and the closing paragraph says the costs are \"concentrated, immediate, and land on a budget line somebody has to defend\" while the benefits are diffuse and later.",
      steps: [
        "Note when in the sequence districts reverse the change.",
        "Match that to the description of costs in the final paragraph.",
        "Reject explanations the passage rules out.",
      ],
      hint: "The reversal is dated to a particular year for a reason.",
      trap: "Attributing failure to disputed evidence when the passage insists there is none.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Hard",
      stem: "The final sentence identifies which error on the part of advocates?",
      key: "Treating a political difficulty as a lack of knowledge.",
      wrong: [
        ["Overstating the size of the sleep gain achieved.", "The gain is reported accurately in the passage's own terms."],
        ["Ignoring the needs of families with two jobs.", "Those families are described but no advocate is blamed for them."],
        ["Relying on states rather than on local districts.", "State mandates are credited with the reform's survival."],
      ],
      why: "The passage says reforms of this shape \"are hard whatever the evidence says, and treating the difficulty as ignorance is the mistake advocates most often make.\"",
      steps: [
        "Read the final clause of the passage.",
        "Note the noun it uses for the misdiagnosis.",
        "Reject options describing errors the passage does not attribute to advocates.",
      ],
      hint: "The word the sentence ends on names the error.",
      trap: "Choosing a criticism of the reform when the sentence criticises its supporters' diagnosis.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The observation that the shift appears in adolescents with no electric light indicates that it is:",
      key: "not produced by modern habits.",
      wrong: [
        ["stronger in communities without electricity.", "No difference in magnitude between populations is reported."],
        ["harder to measure outside industrial societies.", "The passage says it has been measured in every population."],
        ["dependent on the season in which it is measured.", "Seasonal variation is not discussed in the passage."],
      ],
      why: "The passage says the shift \"is not a preference, it is not caused by screens, and it appears in adolescents with no access to electric light at all.\"",
      steps: [
        "Find the sentence listing what the shift is not.",
        "Note what the final clause is offered to rule out.",
      ],
      hint: "The clause answers a common explanation.",
    },
  ],
};
