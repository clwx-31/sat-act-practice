"use strict";

// Question frames for shapes that have no real-world setting to rotate.
//
// The validator rejects two stems in a section whose word sets overlap by 90%
// or more, counting only words longer than two characters — which drops the
// small numbers an algebra item is made of. `3x + 5 = 26` and `4x + 7 = 31`
// therefore carry the same tokens and read as the same question. A shape reused
// eight times across a bank needs eight genuinely different sentences, and for
// abstract mathematics the only thing left to vary is how the question is
// posed.
//
// Each frame below is written to carry two or three words the other seven lack
// — given, suppose, assume, provided, determine, satisfy, holds — so that the
// frame alone separates two reuses even when the mathematics between them is
// nearly identical. Frames are deliberately plain: an ACT stem asks its
// question and stops.
//
// Usage:
//   stem: pose(variant, "givenFind", { given: `${a}x + ${b} = ${c}`, target: "x" })
//
// A shape that also has a setting to rotate (a print shop, a ferry) should draw
// one from lib/scenes.js instead; frames and scenes compose, and word problems
// generally need both because their fixed prose is long enough to push two
// reuses over the threshold on its own.

const FRAMES = {
  // "If <given>, what is <target>?" — an equation or condition, then an unknown.
  givenFind: [
    ({ given, target }) => `If ${given}, what is the value of ${target}?`,
    ({ given, target }) => `Given that ${given}, determine ${target}.`,
    ({ given, target }) => `Suppose ${given}. Which number does ${target} represent?`,
    ({ given, target }) => `Assume ${given} holds. Find ${target}.`,
    ({ given, target }) => `When ${given}, ${target} takes which value?`,
    ({ given, target }) => `Provided ${given}, what must ${target} equal?`,
    ({ given, target }) => `Take ${given} as given. Compute ${target}.`,
    ({ given, target }) => `Let ${given} be true. What is ${target}?`,
  ],

  // "What is the value of <expression>?" — nothing given, just evaluate.
  value: [
    ({ expression }) => `What is the value of ${expression}?`,
    ({ expression }) => `Evaluate ${expression}.`,
    ({ expression }) => `${expression} equals which number?`,
    ({ expression }) => `Compute ${expression}.`,
    ({ expression }) => `Which number does ${expression} represent?`,
    ({ expression }) => `Simplified completely, ${expression} is what?`,
    ({ expression }) => `Determine the value of ${expression}.`,
    ({ expression }) => `To what number does ${expression} reduce?`,
  ],

  // "How many integers x satisfy <condition>?"
  countIntegers: [
    ({ condition, symbol }) => `How many integers ${symbol} satisfy ${condition}?`,
    ({ condition, symbol }) => `For how many integer values of ${symbol} is ${condition} true?`,
    ({ condition, symbol }) => `Counting only integers, how many ${symbol} make ${condition} hold?`,
    ({ condition, symbol }) => `The condition ${condition} is met by how many integer ${symbol}?`,
    ({ condition, symbol }) => `How many whole-number solutions ${symbol} does ${condition} admit?`,
    ({ condition, symbol }) => `Determine the number of integers ${symbol} with ${condition}.`,
    ({ condition, symbol }) => `Among the integers, how many values of ${symbol} satisfy ${condition}?`,
    ({ condition, symbol }) => `Suppose ${symbol} must be an integer. How many choices satisfy ${condition}?`,
  ],

  // "What is the greatest solution of <equation>?" — `extreme` is greater,
  // greatest, least, or smallest.
  extremeSolution: [
    ({ equation, extreme }) => `What is the ${extreme} solution of ${equation}?`,
    ({ equation, extreme }) => `Solve ${equation}. Which solution is the ${extreme} one?`,
    ({ equation, extreme }) => `Among the solutions of ${equation}, which is ${extreme}?`,
    ({ equation, extreme }) => `The equation ${equation} has more than one root. Find the ${extreme}.`,
    ({ equation, extreme }) => `Determine the ${extreme} root of ${equation}.`,
    ({ equation, extreme }) => `Which number is the ${extreme} value satisfying ${equation}?`,
    ({ equation, extreme }) => `Taking every root of ${equation}, what is the ${extreme}?`,
    ({ equation, extreme }) => `Suppose x solves ${equation}. What is the ${extreme} such x?`,
  ],

  // "For what value of k does <condition>?" — solving for a parameter.
  parameterFor: [
    ({ condition, parameter }) => `For what value of ${parameter} does ${condition}?`,
    ({ condition, parameter }) => `Which value of ${parameter} makes it true that ${condition}?`,
    ({ condition, parameter }) => `Determine ${parameter} so that ${condition}.`,
    ({ condition, parameter }) => `Suppose ${condition}. What must ${parameter} equal?`,
    ({ condition, parameter }) => `${parameter} is chosen so that ${condition}. Find it.`,
    ({ condition, parameter }) => `Given that ${condition}, which number is ${parameter}?`,
    ({ condition, parameter }) => `There is one ${parameter} for which ${condition}. What is it?`,
    ({ condition, parameter }) => `Solve for ${parameter}, knowing that ${condition}.`,
  ],

  // "What is the least integer x for which <condition>?"
  extremeInteger: [
    ({ condition, symbol, extreme }) => `What is the ${extreme} integer ${symbol} for which ${condition}?`,
    ({ condition, symbol, extreme }) => `Find the ${extreme} integer ${symbol} satisfying ${condition}.`,
    ({ condition, symbol, extreme }) => `Which is the ${extreme} whole number ${symbol} with ${condition}?`,
    ({ condition, symbol, extreme }) => `Among integers ${symbol} making ${condition} true, which is ${extreme}?`,
    ({ condition, symbol, extreme }) => `Determine the ${extreme} integer value of ${symbol} such that ${condition}.`,
    ({ condition, symbol, extreme }) => `Suppose ${symbol} is an integer and ${condition}. What is its ${extreme} value?`,
    ({ condition, symbol, extreme }) => `The ${extreme} integer ${symbol} obeying ${condition} is what?`,
    ({ condition, symbol, extreme }) => `Taking ${symbol} to be an integer, give the ${extreme} one with ${condition}.`,
  ],

  // "What is <description>?" — the description is already a noun phrase naming
  // the quantity wanted ("the remainder when 144 is divided by 5").
  quantityOf: [
    ({ description }) => `What is ${description}?`,
    ({ description }) => `Which number is ${description}?`,
    ({ description }) => `Find ${description}.`,
    ({ description }) => `Determine ${description}.`,
    ({ description }) => `Give ${description}.`,
    ({ description }) => `Identify ${description}.`,
    ({ description }) => `Report ${description}.`,
    ({ description }) => `State ${description}.`,
  ],

  // "<expression> is equivalent to <form>. What is <target>?"
  equivalentForm: [
    ({ expression, form, target }) => `The expression ${expression} is equivalent to ${form}. What is the value of ${target}?`,
    ({ expression, form, target }) => `Rewriting ${expression} in the form ${form} fixes ${target} at which value?`,
    ({ expression, form, target }) => `Suppose ${expression} equals ${form} for all permitted values. Find ${target}.`,
    ({ expression, form, target }) => `${expression} can be written as ${form}. Determine ${target}.`,
    ({ expression, form, target }) => `Given that ${expression} and ${form} agree everywhere they are defined, what is ${target}?`,
    ({ expression, form, target }) => `Put ${expression} into the form ${form}. Which number is ${target}?`,
    ({ expression, form, target }) => `If ${expression} simplifies to ${form}, what must ${target} be?`,
    ({ expression, form, target }) => `Matching ${expression} against ${form} determines ${target}. What is it?`,
  ],
};

// Picks the frame for this reuse. `variant` is how many times the shape has
// already been used in the bank, so consecutive reuses land on different
// frames; a ninth reuse wraps, which is why the pools hold eight and the
// harness simulates exactly eight.
function pose(variant, kind, parts) {
  const frames = FRAMES[kind];
  if (!frames) throw new Error(`Unknown phrasing frame "${kind}"`);
  const size = frames.length;
  return frames[(((variant % size) + size) % size)](parts);
}

module.exports = { pose, FRAMES };
