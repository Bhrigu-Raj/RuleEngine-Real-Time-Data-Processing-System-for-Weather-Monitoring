const mongoose = require("mongoose");

const weatherDataSchema = new mongoose.Schema({
  temperature: Number,
  condition: String,
  timestamp: { type: Date, default: Date.now },
});

const WeatherData = mongoose.model("WeatherData", weatherDataSchema);

module.exports = WeatherData;
