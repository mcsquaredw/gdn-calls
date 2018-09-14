const bcrypt = require("bcrypt");

const config = require("../");
const { ADMIN_USER, ADMIN_PASSWORD, SALT_ROUNDS } = config.getConfig();
const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

module.exports = [{ username: ADMIN_USER, password: hash }];
