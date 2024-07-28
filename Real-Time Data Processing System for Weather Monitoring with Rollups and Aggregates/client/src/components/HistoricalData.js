import React, { useEffect, useState } from "react";
import "../styles/Weather.css";

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/weather-summaries"
        );
        const data = await response.json();
        setHistoricalData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message);
      }
    };

    fetchHistoricalData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="historical-data">
      <h2>Daily Weather Summaries</h2>
      <ul>
        {historicalData.map((summary, index) => (
          <li key={index}>
            <p>City: {summary.city}</p>
            <p>Date: {new Date(summary.date).toLocaleDateString()}</p>
            <p>Average Temperature: {summary.averageTemp} °C</p>
            <p>Max Temperature: {summary.maxTemp} °C</p>
            <p>Min Temperature: {summary.minTemp} °C</p>
            <p>Dominant Condition: {summary.dominantCondition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoricalData;
