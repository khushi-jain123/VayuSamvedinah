// src/api/weatherData.js
export const fetchWeatherData = async () => {
  const apiKey = "67c59f4ead3ee3cb95f5cd2c9b4e6c35";
  const city = "Pune";
  const units = "metric";
  const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&cnt=10&appid=${apiKey}`;
  const urlAQI = `https://api.openweathermap.org/data/2.5/air_pollution?lat=18.5204&lon=73.8567&appid=${apiKey}`;

  try {
    // Fetch Weather Data
    const weatherResponse = await fetch(urlWeather);
    if (!weatherResponse.ok) throw new Error(`Weather API Error: ${weatherResponse.status}`);
    const weatherData = await weatherResponse.json();

    // Extract Weather Forecast
    const weatherForecast = weatherData.list.map(item => ({
      date: item.dt_txt,
      temperature: item.main?.temp ?? 0,
      humidity: item.main?.humidity ?? 0,
      rainfall: item.rain?.["3h"] ?? 0, // Rainfall in last 3 hours
      windSpeed: item.wind?.speed ?? 0,
    }));

    // Fetch AQI Data
    let aqiValue = 0;
    try {
      const aqiResponse = await fetch(urlAQI);
      if (!aqiResponse.ok) throw new Error(`AQI API Error: ${aqiResponse.status}`);
      const aqiData = await aqiResponse.json();
      aqiValue = aqiData?.list?.[0]?.main?.aqi ?? 0;
    } catch (aqiError) {
      console.warn("AQI data fetch failed:", aqiError);
    }

    // Combine Weather & AQI Data
    const completeWeatherData = weatherForecast.map(item => ({
      ...item,
      aqi: aqiValue,
    }));

    return completeWeatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return [];
  }
};
