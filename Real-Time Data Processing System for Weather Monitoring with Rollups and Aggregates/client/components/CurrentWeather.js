import React, { useEffect, useState } from "react";

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("/api/weather/current")
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <h1>Current Weather</h1>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
