const mongoose = require("mongoose");

const WeatherDataSchema = new mongoose.Schema({
  city: String,
  date: Date,
  averageTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String,
  alerts: [String],
});

const WeatherData = mongoose.model("WeatherData", WeatherDataSchema);

module.exports = WeatherData;
