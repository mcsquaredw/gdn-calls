const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const area = Schema({
  name: String
});

const contactType = Schema({
  name: String
});

const contractor = Schema({
  name: String,
  offices: [
    {
      address: String,
      postcode: String,
      number: String,
      bookingRules: String,
      email: String
    }
  ]
});

const callType = Schema({
  name: String
});

const call = Schema(
  {
    callDate: Date,
    contactType: { type: Schema.Types.ObjectId, ref: "ContactType" },
    area: { type: Schema.Types.ObjectId, ref: "Area" },
    contractor: { type: Schema.Types.ObjectId, ref: "Contractor" },
    callType: { type: Schema.Types.ObjectId, ref: "CallType" }
  },
  { timestamps: { createdAt: "createdAt" } }
);

const user = Schema({
  username: String,
  password: String
});

module.exports = {
  Area: mongoose.model("Area", area),
  ContactType: mongoose.model("ContactType", contactType),
  Contractor: mongoose.model("Contractor", contractor),
  CallType: mongoose.model("CallType", callType),
  Call: mongoose.model("Call", call),
  User: mongoose.model("User", user)
};
