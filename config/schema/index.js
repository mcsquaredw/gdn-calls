const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const area = Schema({
  name: String,
  contractors: [{ type: Schema.Types.ObjectId, ref: "Contractor" }]
});

const contactType = Schema({
  name: String
});

const contractor = Schema({
  name: String,
  areas: [{ type: Schema.Types.ObjectId, ref: "Area" }],
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

module.exports = {
  Area: mongoose.model("Area", area),
  ContactType: mongoose.model("ContactType", contactType),
  Contractor: mongoose.model("Contractor", contractor),
  CallType: mongoose.model("CallType", callType),
  Call: mongoose.model("Call", call)
};
