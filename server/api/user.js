const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

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

  passport.use(
    new LocalStrategy((username, password, done) => {
      const hash = bcrypt.hashSync(password, 10);

      User.findOne({ username })
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          console.error(err);
          return done(err);
        });
    })
  );

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.send({ authenticated: true });
  });

  app.get("/api/error", (req, res) => {
    res.send({ authenticated: false });
  });

  app.get("/api/authenticated", (req, res) => {
    if (req.user) {
      res.send({ authenticated: true });
    } else {
      res.send({ authenticated: false });
    }
  });
};
