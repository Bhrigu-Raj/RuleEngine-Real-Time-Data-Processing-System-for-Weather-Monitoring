require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  mongoUri: process.env.MONGO_URI,
  alertThresholds: {
    temperature: 35, // example threshold
  },
  weatherUpdateInterval: 5 * 60 * 1000, // every 5 minutes
};
