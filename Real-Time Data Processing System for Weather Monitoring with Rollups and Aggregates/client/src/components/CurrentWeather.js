import React, { useEffect, useState } from "react";
import "../styles/Weather.css";

const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/weather-alerts"
        );
        const data = await response.json();
        setCurrentWeather(data);
      } catch (err) {
        console.error("Error fetching current weather data:", err);
        setError(err.message);
      }
    };

    fetchCurrentWeather();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="current-weather">
      <h2>Current Weather Alerts</h2>
      <ul>
        {currentWeather.map((alert, index) => (
          <li key={index}>
            <p>City: {alert.city}</p>
            <p>Alert: {alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentWeather;
