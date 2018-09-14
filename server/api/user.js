const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const config = require("../config").getConfig();

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((_id, cb) => {
    db.collection("users").findOne({ _id }, (err, user) => {
      cb(err, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      const hash = bcrypt.hashSync(password, 10);

      db.collection("users").findOne({ username }, (err, user) => {
        console.log(hash);
        console.log(user.password);
        if (user && bcrypt.compareSync(user.password, hash)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.send({ authenticated: true });
  });
};
