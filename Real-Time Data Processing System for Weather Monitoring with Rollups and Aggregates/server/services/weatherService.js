// const fetch = require("node-fetch");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

exports.fetchCurrentWeather = async () => {
  const response = await fetch(
    `${BASE_URL}?lat=35&lon=139&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`
  );
  const data = await response.json();
  return data.current;
};
