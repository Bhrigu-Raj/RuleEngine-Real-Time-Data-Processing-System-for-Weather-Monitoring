const Alert = require("../models/alertModel");
const { alertThresholds } = require("../config/config");

const checkAlerts = async () => {
  const latestWeather = await Weather.find().sort({ dt: -1 }).limit(1);

  if (latestWeather.length > 0) {
    const weather = latestWeather[0];

    if (weather.temperature > alertThresholds.temperature) {
      await Alert.create({
        city: weather.city,
        temperature: weather.temperature,
        timestamp: weather.dt,
        message: `Temperature alert for ${weather.city}: ${weather.temperature} °C`,
      });
    }
  }
};

const getAlerts = async () => {
  return await Alert.find().sort({ timestamp: -1 });
};

module.exports = { checkAlerts, getAlerts };
