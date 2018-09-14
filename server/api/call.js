module.exports = (app, db) => {
  app.get("/api/area", (req, res) => {
    db.collection("areas")
      .find({})
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
    db.collection("calltypes")
      .find({})
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
    db.collection("contractors")
      .find({})
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
    db.collection("contacttypes")
      .find({})
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

    db.collection("calls").insert({ newCall }, (err, call) => {
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

    db.collection("calls")
      .find({ createdAt: { $gte: start, $lt: end } })
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
