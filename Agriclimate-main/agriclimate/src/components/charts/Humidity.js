// src/components/Humidity.js
import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { fetchWeatherData } from "../../api/weatherData"; // <-- Importing the correct function

const Humidity = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const weatherData = await fetchWeatherData(); // Fetching weather data
      console.log(weatherData); // Log data for debugging
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
      <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Humidity;
