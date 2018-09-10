const mongoose = require("mongoose");

const config = require("../index.js").getConfig();
const {
  Area,
  Contractor,
  CallType,
  Call,
  ContactType,
  User
} = require("../schema");
const contactTypes = require("./contactTypes");
const callTypes = require("./calltypes");
const contractors = require("./contractors");
const areas = require("./areas");
const users = require("./users");

rebuildData = () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );

  try {
    Contractor.collection.deleteMany(
      {},
      Contractor.collection.insertMany(contractors)
    );
    User.collection.deleteMany({}, User.collection.insertMany(users));
    CallType.collection.deleteMany(
      {},
      CallType.collection.insertMany(callTypes)
    );
    ContactType.collection.deleteMany(
      {},
      ContactType.collection.insertMany(contactTypes)
    );
    Area.collection.deleteMany({}, Area.collection.insertMany(areas));
    Call.collection.deleteMany({}, err => console.log(done));
  } catch (err) {
    console.error(err);
  }
};

rebuildData();
