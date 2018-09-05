const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "DEVELOPMENT";

const config = require("./config");

mongoose.connect(
  config.getConfig().MONGODB_URI,
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));

if (env === "PRODUCTION") {
  app.use(express.static(__dirname + "./../client/build/"));
}

require("./api/user")(app);
require("./api/call")(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
