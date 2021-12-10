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
  file: { data: Buffer, contentType: String },
});

const UserResults = mongoose.model("UserResult", userResultsSchema);

module.exports = UserResults;
