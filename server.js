const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const config = require("./config");

mongoose.connect(
  config.getConfig().MONGODB_URI,
  { useNewUrlParser: true }
);

app.use(bodyParser());

require("./api/call")(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
