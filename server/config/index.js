module.exports = {
  getConfig() {
    if (process.env.NODE_ENV === "production") {
      return require("./prod");
    } else {
      return require("./dev");
    }
  }
};
