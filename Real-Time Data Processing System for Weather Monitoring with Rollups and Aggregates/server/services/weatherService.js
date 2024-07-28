// const fetch = require("node-fetch");
const WeatherData = require("../models/WeatherData");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

const fetchWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch weather data");
  }
  const data = await response.json();
  return data;
};

const calculateDailyAggregates = (weatherData) => {
  const dailySummary = {
    averageTemp: 0,
    maxTemp: -Infinity,
    minTemp: Infinity,
    weatherConditions: {},
  };

  weatherData.forEach((data) => {
    const tempCelsius = convertKelvinToCelsius(data.main.temp);

    dailySummary.averageTemp += tempCelsius;
    dailySummary.maxTemp = Math.max(dailySummary.maxTemp, tempCelsius);
    dailySummary.minTemp = Math.min(dailySummary.minTemp, tempCelsius);

    const condition = data.weather[0].main;
    if (!dailySummary.weatherConditions[condition]) {
      dailySummary.weatherConditions[condition] = 0;
    }
    dailySummary.weatherConditions[condition]++;
  });

  dailySummary.averageTemp = (
    dailySummary.averageTemp / weatherData.length
  ).toFixed(2);

  dailySummary.dominantCondition = Object.keys(
    dailySummary.weatherConditions
  ).reduce((a, b) =>
    dailySummary.weatherConditions[a] > dailySummary.weatherConditions[b]
      ? a
      : b
  );

  return dailySummary;
};

const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

const storeDailySummary = async (city, summary) => {
  const newSummary = new WeatherData({
    city,
    date: new Date(),
    ...summary,
  });
  await newSummary.save();
};

const checkThresholds = (weatherData, thresholds) => {
  const tempCelsius = convertKelvinToCelsius(weatherData.main.temp);
  const alerts = [];

  if (tempCelsius > thresholds.temperature) {
    alerts.push(
      `Temperature in ${weatherData.name} is above ${thresholds.temperature}°C`
    );
  }

  return alerts;
};

module.exports = {
  fetchWeatherData,
  calculateDailyAggregates,
  storeDailySummary,
  checkThresholds,
};
