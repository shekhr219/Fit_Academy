const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userMail: { type: String, required: true },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
