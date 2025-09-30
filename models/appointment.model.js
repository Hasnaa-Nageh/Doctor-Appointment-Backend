const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "doctor",
  },
  date: {
    type: Date,
  },
  reason: {
    type: String,
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
