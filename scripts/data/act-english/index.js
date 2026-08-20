"use strict";

const fs = require("node:fs");
const path = require("node:path");

// Every NNN-*.js in this directory is a passage. Loading by directory listing
// rather than an explicit list means adding a passage cannot be half-done: the
// file either exists and is loaded, or it does not.
function loadPassages() {
  return fs
    .readdirSync(__dirname)
    .filter((name) => /^\d{3}-.*\.js$/.test(name))
    .sort()
    .map((name) => require(path.join(__dirname, name)));
}

module.exports = { loadPassages };
