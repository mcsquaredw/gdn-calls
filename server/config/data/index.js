const mongoose = require("mongoose");

const config = require("../index.js").getConfig();
const { Area, Contractor, CallType, Call, ContactType } = require("../schema");
const contactTypes = require("./contactTypes");
const callTypes = require("./calltypes");
const contractors = require("./contractors");
const areas = require("./areas");

mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true }
);

rebuildData = async () => {
  await CallType.collection.deleteMany();
  await CallType.collection.insertMany(callTypes);
  await Contractor.collection.deleteMany();
  await Contractor.collection.insertMany(contractors);
  await ContactType.collection.deleteMany();
  await ContactType.collection.insertMany(contactTypes);
  await Area.collection.deleteMany();
  await Area.collection.insertMany(areas);
  await Call.collection.deleteMany();
};

rebuildData();
console.log("Done Successfully!");
