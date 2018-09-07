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
    new LocalStrategy(function(username, password, done) {
      processLogin(username, password)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          return done(err);
        });
    })
  );

  processLogin = async (username, password) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.findOne({ username });

      if (user) {
        const result = await bcrypt.compare(user.password, hash);

        if (result) {
          return user;
        }
      }

      return null;
    } catch (err) {
      console.error(err);
    }
  };

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    passport.authenticate("local", { failureRedirect: "/api/error" }, function(
      req,
      res
    ) {
      res.send({ authenticated: true });
    });
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
