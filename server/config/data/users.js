const bcrypt = require("bcrypt");

module.exports = [
  { username: "admin", password: bcrypt.hashSync("JBDoors123", 10) }
];
