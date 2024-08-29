const mongoose = require("mongoose");

const enrolledSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    classesId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true },
    ],
    transactionId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const enrolled = mongoose.model("enrolled", enrolledSchema);
module.exports = enrolled;
