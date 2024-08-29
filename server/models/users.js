const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoUrl: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  gender: {
    type: String,
    default: "Is not specified",
  },
  address: {
    type: String,
    default: "Is not Provided",
  },
  phone: {
    type: String,
    default: "Is not Provide",
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
