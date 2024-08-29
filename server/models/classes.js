// class.js
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
  },
  description: {
    type: String,
  },
  instructorName: {
    type: String,
    required: true,
  },
  instructorEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"], // Add more statuses if needed
    required: true,
  },
  submitted: {
    type: Date,
    default: Date.now,
  },
  totalEnrolled: {
    type: Number,
    default: 0,
  },
  reason: {
    type: String,
    default: null,
  },
});

const classes = mongoose.model("classes", classSchema);

module.exports = classes;
