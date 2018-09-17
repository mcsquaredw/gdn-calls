const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "DEVELOPMENT";

const config = require("./config").getConfig();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure:true}
}));

if (env === "PRODUCTION") {
  app.use(express.static(__dirname + "./../client/build/"));
}

(async () => {
  let client;

  try {
    client = await MongoClient.connect(
      config.MONGODB_URI,
      { useNewUrlParser: true }
    );

    const db = client.db(config.MONGODB_DBNAME);

    require("./api/user")(app, db);
    require("./api/call")(app, db);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
