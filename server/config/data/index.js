const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const config = require("../index");
const contactTypes = require("./contactTypes");
const callTypes = require("./calltypes");
const contractors = require("./contractors");
const areas = require("./areas");
const users = require("./users");

(async () => {
  const { MONGODB_URI, MONGODB_DBNAME } = config.getConfig();
  let client;

  try {
    client = await MongoClient.connect(
      MONGODB_URI,
      { useNewUrlParser: true }
    );

    const db = client.db(MONGODB_DBNAME);

    await db.collection("areas").deleteMany();
    let r = await db.collection("areas").insertMany(areas);
    assert.equal(areas.length, r.insertedCount);

    await db.collection("contacttypes").deleteMany();
    r = await db.collection("contacttypes").insertMany(contactTypes);
    assert.equal(contactTypes.length, r.insertedCount);

    await db.collection("calltypes").deleteMany();
    r = await db.collection("calltypes").insertMany(callTypes);
    assert.equal(callTypes.length, r.insertedCount);

    await db.collection("contractors").deleteMany();
    r = await db.collection("contractors").insertMany(contractors);
    assert.equal(contractors.length, r.insertedCount);

    await db.collection("users").deleteMany();
    r = await db.collection("users").insertMany(users);
    assert.equal(users.length, r.insertedCount);

    await db.collection("calls").deleteMany();
  } catch (err) {
    console.error(err.stack);
  }

  if (client) {
    client.close();
  }
})();
