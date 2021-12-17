const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Delivered", "Pending", "Active"],
    default: "Pending",
  },
  variants: { type: String, default: "Pending" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  observations: { type: String, default: "None" },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
