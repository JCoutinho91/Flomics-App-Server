const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userResultsSchema = new Schema({
  sampleId: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: String, required: true },
  Beta: { type: Number, required: true, default: 0 },
  Gamma: { type: Number, required: true, default: 0 },
  Kappa: { type: Number, required: true, default: 0 },
  Delta: { type: Number, required: true, default: 0 },
  Alpha: { type: Number, required: true, default: 0 },
  Lambda: { type: Number, required: true, default: 0 },
  Mu: { type: Number, required: true, default: 0 },
  Omicron: { type: Number, required: true, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const UserResult = mongoose.model("UserResult", userResultsSchema);

module.exports = UserResult;
