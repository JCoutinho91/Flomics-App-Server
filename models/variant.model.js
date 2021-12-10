const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const variantSchema = new Schema({
  Country: { type: String, required: true, default: 0 },
  Day: { type: String, required: true },
  Beta: { type: Number, required: true, default: 0 },
  Gamma: { type: Number, required: true, default: 0 },
  Kappa: { type: Number, required: true, default: 0 },
  Delta: { type: Number, required: true, default: 0 },
  Alpha: { type: Number, required: true, default: 0 },
  Lambda: { type: Number, required: true, default: 0 },
  Mu: { type: Number, required: true, default: 0 },
  Omicron: { type: Number, required: true, default: 0 },
});

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;
