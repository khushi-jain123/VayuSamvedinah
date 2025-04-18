import React from "react";
import TemperatureRainfallGraph from "./charts/TemperatureRainfallGraph";
import Temperature from "./charts/Temperature";
import Windspeed from "./charts/Windspeed";
import Humidity from "./charts/Humidity";
import AQI from "./charts/AQIgraph";
import Rainfall from "./charts/Rainfall";

import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">AgriClimate Dashboard</h1>
      <p className="dashboard-description">
        Empowering Agriculture with Climate Intelligence
      </p>

      <div className="charts-container">
        {/* Real-Time Temperature */}
        <div className="chart-box">
          <h3>Real-Time Temperature</h3>
          <Temperature />
        </div>

        {/* Humidity */}
        <div className="chart-box">
          <h3>Humidity</h3>
          <Humidity />
        </div>

        {/* Wind Speed */}
        <div className="chart-box">
          <h3>Windspeed</h3>
          <Windspeed />
        </div>

        {/* Air Quality Index (AQI) */}
        <div className="chart-box">
          <h3>AQI</h3>
          <AQI />
        </div>

        {/* Rainfall */}
        <div className="chart-box">
          <h3>Rainfall</h3>
          <Rainfall />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
