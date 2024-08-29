const mongoose = require("mongoose");

const appliedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    exprience: { type: String },
  },
  {
    timestamps: true,
  }
);

const applied = mongoose.model("applied", appliedSchema);
module.exports = applied;
