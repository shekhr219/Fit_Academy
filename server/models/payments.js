// payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "usd",
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["succeeded", "pending", "failed"],
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  classesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const payments = mongoose.model("payments", paymentSchema);

module.exports = payments;
