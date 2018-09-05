const {
  Area,
  CallType,
  Contractor,
  ContactType,
  Call
} = require("../config/schema");

module.exports = app => {
  app.get("/api/area", (req, res) => {
    Area.find({})
      .sort({ name: 1 })
      .exec((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
  });
  app.get("/api/calltype", (req, res) => {
    CallType.find({})
      .sort({ name: 1 })
      .exec((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
  });
  app.get("/api/contractor", (req, res) => {
    Contractor.find({})
      .sort({ name: 1 })
      .exec((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
  });
  app.get("/api/contacttype", (req, res) => {
    ContactType.find({})
      .sort({ name: 1 })
      .exec((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
  });
  app.post("/api/newcall", (req, res) => {
    const newCall = new Call(req.body);

    newCall.save((err, call) => {
      if (err) {
        console.error(err);
      } else {
        res.send(newCall);
      }
    });
  });
  app.get("/api/calls", (req, res) => {
    const start = new Date();
    const end = new Date();

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    Call.find({ createdAt: { $gte: start, $lt: end } })
      .sort({ createdAt: 1 })
      .exec((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
  });
};
