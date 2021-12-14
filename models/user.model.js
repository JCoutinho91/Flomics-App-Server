const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  image: { type: String, default: "https://i.imgur.com/yWHfhiG.png" },
  samples: [{ type: Schema.Types.ObjectId, ref: "UserResult" }],
  requests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
  city: { type: String },
  country: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
