const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  timestamp: Date,
  message: String,
});

module.exports = mongoose.model("Alert", alertSchema);
