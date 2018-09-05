const passport = require("passport");
const bcrypt = require("bcrypt");

const { User } = require("../config/schema");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });

  processLogin = async (username, password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.findOne({ username });

    if (user) {
      const res = await bcrypt.compare(user.password, hash);

      if (res) {
        return true;
      } else {
        return false;
      }
    }
  };

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    processLogin
      .then(result => {
        if (result) {
          res.send({ login: true });
        } else {
          res.send({ login: false });
        }
      })
      .catch(err => {
        console.error(err);
        res.send(500);
      });
  });
};
