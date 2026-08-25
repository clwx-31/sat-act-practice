"use strict";

// Shared scenario pools for word problems.
//
// The content validator rejects any two questions in a section whose stem word
// sets overlap by 90% or more, and for the math sections numbers are kept in
// the comparison. That makes wording, not arithmetic, the binding constraint on
// how many times a shape can be reused: a shape that only changes its numbers
// ships one usable question, no matter how many sequences it is driven over.
//
// Each pool below is a set of interchangeable settings for one kind of word
// problem. A shape draws a scene from the pool and phrases itself around it, so
// the same mathematics arrives as a print shop, a ferry timetable, or a kiln.
// Pools hold at least eight entries; a shape is reused a handful of times per
// bank, so eight settings leave the near-duplicate rule a wide margin.
//
// Entries are written to drop into a sentence without further inflection:
//   `A ${s.actor} ${s.verb} ${count} ${s.object} in ${hours} hours.`
// Keep `verb` in the third-person singular and `object` plural.

function scene(index, pool) {
  const size = pool.length;
  return pool[(((index % size) + size) % size)];
}

// Something makes a countable output at a steady rate.
const PRODUCTION = [
  { actor: "press", verb: "prints", object: "flyers", site: "print shop" },
  { actor: "loom", verb: "weaves", object: "scarves", site: "textile mill" },
  { actor: "kiln", verb: "fires", object: "tiles", site: "pottery studio" },
  { actor: "bottling line", verb: "fills", object: "bottles", site: "cannery" },
  { actor: "lathe", verb: "turns", object: "spindles", site: "furniture works" },
  { actor: "sorter", verb: "labels", object: "parcels", site: "depot" },
  { actor: "oven", verb: "bakes", object: "loaves", site: "bakery" },
  { actor: "cutter", verb: "stamps", object: "gaskets", site: "machine shop" },
  { actor: "copier", verb: "collates", object: "booklets", site: "records office" },
  { actor: "packer", verb: "seals", object: "cartons", site: "warehouse" },
];

// An object follows a vertical projectile-height model.
const PROJECTILE = [
  { object: "ball", verb: "thrown" },
  { object: "model rocket", verb: "launched" },
  { object: "signal flare", verb: "fired" },
  { object: "stone", verb: "tossed" },
  { object: "training weight", verb: "propelled" },
  { object: "beanbag", verb: "hurled" },
  { object: "foam dart", verb: "shot" },
  { object: "practice capsule", verb: "ejected" },
];

// Someone covers ground at a speed.
const TRAVEL = [
  { mover: "cyclist", verb: "rides", route: "canal path", unit: "miles", place: "lake" },
  { mover: "ferry", verb: "crosses", route: "channel", unit: "miles", place: "island" },
  { mover: "delivery van", verb: "drives", route: "coast road", unit: "miles", place: "depot" },
  { mover: "hiker", verb: "walks", route: "ridge trail", unit: "miles", place: "summit" },
  { mover: "tram", verb: "runs", route: "valley line", unit: "miles", place: "terminus" },
  { mover: "rower", verb: "rows", route: "river course", unit: "miles", place: "boathouse" },
  { mover: "courier", verb: "cycles", route: "ring road", unit: "miles", place: "sorting office" },
  { mover: "bus", verb: "travels", route: "moorland route", unit: "miles", place: "village" },
  { mover: "runner", verb: "jogs", route: "towpath", unit: "miles", place: "bridge" },
  { mover: "tractor", verb: "hauls", route: "farm track", unit: "miles", place: "barn" },
];

// A watercraft moves while a current supplies a perpendicular velocity.
const WATERCRAFT = [
  { craft: "boat", water: "harbor" },
  { craft: "kayak", water: "inlet" },
  { craft: "ferry", water: "channel" },
  { craft: "raft", water: "river" },
  { craft: "skiff", water: "estuary" },
  { craft: "launch", water: "bay" },
  { craft: "canoe", water: "lake" },
  { craft: "barge", water: "canal" },
];

// A thing is bought and sold.
const RETAIL = [
  { item: "notebook", plural: "notebooks", shop: "stationer" },
  { item: "jacket", plural: "jackets", shop: "outfitter" },
  { item: "lamp", plural: "lamps", shop: "hardware store" },
  { item: "kettle", plural: "kettles", shop: "housewares aisle" },
  { item: "paperback", plural: "paperbacks", shop: "bookshop" },
  { item: "seedling", plural: "seedlings", shop: "garden centre" },
  { item: "poster", plural: "posters", shop: "gallery shop" },
  { item: "umbrella", plural: "umbrellas", shop: "market stall" },
  { item: "cushion", plural: "cushions", shop: "upholsterer" },
  { item: "thermos", plural: "thermoses", shop: "camping supplier" },
];

// A recipe scales one measured ingredient across batches.
const RECIPE = [
  { dish: "soup", ingredient: "stock" },
  { dish: "scone", ingredient: "buttermilk" },
  { dish: "salsa", ingredient: "tomato purée" },
  { dish: "bread", ingredient: "milk" },
  { dish: "sorbet", ingredient: "fruit juice" },
  { dish: "stew", ingredient: "broth" },
  { dish: "pancake", ingredient: "oat drink" },
  { dish: "custard", ingredient: "cream" },
];

// A vessel holds or transfers a fluid.
const VESSEL = [
  { vessel: "tank", filler: "pump", fluid: "water", unit: "liters" },
  { vessel: "cistern", filler: "hose", fluid: "rainwater", unit: "liters" },
  { vessel: "vat", filler: "inlet", fluid: "cider", unit: "liters" },
  { vessel: "reservoir", filler: "channel", fluid: "water", unit: "liters" },
  { vessel: "pool", filler: "hose", fluid: "water", unit: "liters" },
  { vessel: "drum", filler: "valve", fluid: "coolant", unit: "liters" },
  { vessel: "header tank", filler: "inlet", fluid: "oil", unit: "liters" },
  { vessel: "trough", filler: "spout", fluid: "water", unit: "liters" },
];

// A population is counted or sampled.
const SURVEY = [
  { group: "households", topic: "recycle", place: "borough" },
  { group: "commuters", topic: "cycle to work", place: "city" },
  { group: "members", topic: "renewed", place: "club" },
  { group: "respondents", topic: "read the newsletter", place: "district" },
  { group: "residents", topic: "use the library", place: "town" },
  { group: "subscribers", topic: "renewed early", place: "county" },
  { group: "visitors", topic: "returned within a year", place: "museum" },
  { group: "students", topic: "walk to school", place: "school" },
];

// A group answers two yes-or-no survey questions.
const TWO_WAY_SURVEY = [
  { group: "students", first: "cycle to school", second: "own a helmet" },
  { group: "commuters", first: "take the train", second: "buy a monthly pass" },
  { group: "residents", first: "use the library", second: "borrow ebooks" },
  { group: "members", first: "attend classes", second: "use the pool" },
  { group: "visitors", first: "take a tour", second: "visit the gallery" },
  { group: "households", first: "compost food", second: "collect rainwater" },
  { group: "employees", first: "work remotely", second: "use flex hours" },
  { group: "subscribers", first: "read online", second: "receive alerts" },
];

// A flat region gets measured, fenced, or covered.
const GROUND = [
  { region: "patio", edge: "trim", cover: "paving", owner: "café" },
  { region: "garden", edge: "fence", cover: "turf", owner: "cottage" },
  { region: "courtyard", edge: "railing", cover: "gravel", owner: "school" },
  { region: "terrace", edge: "border", cover: "decking", owner: "hotel" },
  { region: "allotment", edge: "hedge", cover: "mulch", owner: "society" },
  { region: "forecourt", edge: "kerb", cover: "tarmac", owner: "garage" },
  { region: "playground", edge: "barrier", cover: "matting", owner: "nursery" },
  { region: "paddock", edge: "rail", cover: "seed", owner: "stables" },
];

// A room or surface gets finished.
const SURFACE = [
  { surface: "wall", finish: "paint", worker: "decorator" },
  { surface: "ceiling", finish: "sealant", worker: "contractor" },
  { surface: "floor", finish: "varnish", worker: "joiner" },
  { surface: "hoarding", finish: "primer", worker: "signwriter" },
  { surface: "fence panel", finish: "stain", worker: "gardener" },
  { surface: "shopfront", finish: "render", worker: "plasterer" },
  { surface: "hull", finish: "lacquer", worker: "boatwright" },
  { surface: "mural", finish: "varnish", worker: "restorer" },
];

// A solution is mixed to a concentration.
const SOLUTION = [
  { solute: "acid", solvent: "solution", agent: "chemist", unit: "liters" },
  { solute: "salt", solvent: "brine", agent: "technician", unit: "liters" },
  { solute: "dye", solvent: "bath", agent: "dyer", unit: "liters" },
  { solute: "antifreeze", solvent: "coolant", agent: "mechanic", unit: "liters" },
  { solute: "syrup", solvent: "cordial", agent: "bottler", unit: "liters" },
  { solute: "fertiliser", solvent: "feed", agent: "grower", unit: "liters" },
  { solute: "alcohol", solvent: "tincture", agent: "pharmacist", unit: "liters" },
  { solute: "sugar", solvent: "glaze", agent: "confectioner", unit: "liters" },
];

// Money is charged, saved, or earned.
const FINANCE = [
  { account: "savings account", payer: "bank", plan: "membership", earner: "salesperson" },
  { account: "deposit account", payer: "credit union", plan: "subscription", earner: "agent" },
  { account: "bond", payer: "society", plan: "class pass", earner: "representative" },
  { account: "certificate", payer: "trust", plan: "studio plan", earner: "consultant" },
  { account: "reserve fund", payer: "cooperative", plan: "locker rental", earner: "broker" },
  { account: "trust account", payer: "mutual", plan: "storage plan", earner: "dealer" },
  { account: "notice account", payer: "building society", plan: "court hire", earner: "adviser" },
  { account: "fixed-term account", payer: "lender", plan: "studio hire", earner: "distributor" },
];

// A count grows by the same multiplicative factor each period.
const EXPONENTIAL_GROWTH = [
  { subject: "bacterial culture", unit: "cells", period: "hour" },
  { subject: "yeast colony", unit: "cells", period: "hour" },
  { subject: "computer archive", unit: "copies", period: "day" },
  { subject: "crystal cluster", unit: "crystals", period: "week" },
  { subject: "insect colony", unit: "insects", period: "month" },
  { subject: "seedling nursery", unit: "plants", period: "season" },
  { subject: "video library", unit: "files", period: "month" },
  { subject: "cell sample", unit: "cells", period: "minute" },
];

// A measured radioactive sample loses half its mass over each half-life.
const DECAY_SAMPLE = [
  "medical isotope sample",
  "archaeological carbon fragment",
  "laboratory phosphorus tracer",
  "sealed radium source",
  "environmental cesium specimen",
  "geological potassium sample",
  "research iodine capsule",
  "calibration cobalt standard",
];

// A membership combines one enrollment charge with a monthly rate.
const MEMBERSHIP = [
  { service: "climbing gym", member: "climber" },
  { service: "maker space", member: "maker" },
  { service: "rowing club", member: "rower" },
  { service: "art studio", member: "artist" },
  { service: "language school", member: "learner" },
  { service: "tennis center", member: "player" },
  { service: "music workshop", member: "musician" },
  { service: "community garden", member: "gardener" },
];

// A service charges once for setup and then by the hour.
const HOURLY_SERVICE = [
  "bike repair shop",
  "kiln rental",
  "darkroom",
  "recording studio",
  "practice room",
  "workbench rental",
  "editing suite",
  "ceramics studio",
];

// Tickets are sold to an event at two prices.
const VENUE = [
  { venue: "planetarium", full: "adult", reduced: "child", token: "tickets" },
  { venue: "ferry", full: "adult", reduced: "child", token: "fares" },
  { venue: "aquarium", full: "adult", reduced: "child", token: "tickets" },
  { venue: "heritage railway", full: "adult", reduced: "child", token: "tickets" },
  { venue: "botanic garden", full: "standard", reduced: "concession", token: "tickets" },
  { venue: "observatory", full: "standard", reduced: "student", token: "passes" },
  { venue: "puppet theatre", full: "adult", reduced: "child", token: "seats" },
  { venue: "cable car", full: "adult", reduced: "child", token: "fares" },
];

// Objects are counted, arranged, or chosen.
const COLLECTION = [
  { item: "book", plural: "books", holder: "shelf", owner: "librarian" },
  { item: "poster", plural: "posters", holder: "wall", owner: "curator" },
  { item: "record", plural: "records", holder: "rack", owner: "collector" },
  { item: "stamp", plural: "stamps", holder: "album", owner: "philatelist" },
  { item: "tile", plural: "tiles", holder: "mosaic", owner: "artist" },
  { item: "seedling", plural: "seedlings", holder: "tray", owner: "grower" },
  { item: "medal", plural: "medals", holder: "case", owner: "club" },
  { item: "flag", plural: "flags", holder: "pole", owner: "steward" },
];

// A group is scored, graded, or timed.
const COHORT = [
  { unit: "test", plural: "tests", member: "student", body: "class" },
  { unit: "round", plural: "rounds", member: "competitor", body: "squad" },
  { unit: "trial", plural: "trials", member: "participant", body: "group" },
  { unit: "assignment", plural: "assignments", member: "pupil", body: "form" },
  { unit: "heat", plural: "heats", member: "swimmer", body: "team" },
  { unit: "inspection", plural: "inspections", member: "site", body: "region" },
  { unit: "recital", plural: "recitals", member: "player", body: "ensemble" },
  { unit: "audit", plural: "audits", member: "branch", body: "network" },
];

module.exports = {
  scene,
  COHORT,
  COLLECTION,
  DECAY_SAMPLE,
  EXPONENTIAL_GROWTH,
  FINANCE,
  GROUND,
  HOURLY_SERVICE,
  MEMBERSHIP,
  PRODUCTION,
  PROJECTILE,
  RECIPE,
  RETAIL,
  SOLUTION,
  SURFACE,
  SURVEY,
  TRAVEL,
  TWO_WAY_SURVEY,
  VENUE,
  VESSEL,
  WATERCRAFT,
};
