// src/components/Temperature.js
import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { fetchWeatherData } from "../../api/weatherData"; // <-- Importing the correct function

const Temperature = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const weatherData = await fetchWeatherData(); // Fetching weather data
      setData(weatherData); // Update state with the fetched data
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
    </LineChart>
  );
};

export default Temperature;
