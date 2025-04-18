// src/components/TemperatureRainfallGraph.js
import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { fetchWeatherData } from "../../api/weatherData"; // <-- Importing the fetchWeatherData function

const TemperatureRainfallGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const weatherData = await fetchWeatherData();
      setData(weatherData); // Update state with the fetched weather data
    };
    getData();
  }, []);

  return (
    <LineChart width={window.innerWidth - 40} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      <Line type="monotone" dataKey="rainfall" stroke="#82ca9d" />
    </LineChart>
  );
};

export default TemperatureRainfallGraph;
