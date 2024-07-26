const weatherService = require("../services/weatherService");

exports.getCurrentWeather = async (req, res) => {
  try {
    const weatherData = await weatherService.fetchCurrentWeather();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
