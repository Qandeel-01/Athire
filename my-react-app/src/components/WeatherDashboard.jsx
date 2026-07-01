import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography,
} from '@mui/material';
import axios from 'axios';
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupForecastByDay = (forecastList) => {
    const dailyForecasts = {};
    forecastList.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = forecast;
      }
    });
    return Object.values(dailyForecasts).slice(1, 6);
  };

  const searchLocation = async () => {
    try {
      const geoResponse = await axios.get(
       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );

      let weatherResponse;
      if (geoResponse.data && geoResponse.data.length > 0) {
        const { lat, lon } = geoResponse.data[0];
        weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        setForecast(forecastResponse.data);
      }
    
  // const searchLocation = async () => {
  //   try {
  //     const geoResponse = await axios.get(
  //       https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1
  //     );
  
  //     if (geoResponse.data && geoResponse.data.length > 0) {
  //       const { lat, lon } = geoResponse.data[0];
  //       const weatherResponse = await axios.get(
  //         https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric
  //       );
  //       setWeather(weatherResponse.data);
  
  //       const forecastResponse = await axios.get(
  //         https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric
  //       );
  //       setForecast(forecastResponse.data);
  
        // Prepare data for saving
        const weatherData = {
          temperature: weatherResponse.data.main.temp.toFixed(1),
          feelsLike: weatherResponse.data.main.feels_like.toFixed(1),
          wind: `${weatherResponse.data.wind.speed} m/s`,
          pressure: `${weatherResponse.data.main.pressure} hPa`,
          humidity: `${weatherResponse.data.main.humidity}%`,
          visibility: `${(weatherResponse.data.visibility / 1000).toFixed(1)} km`,
          uvIndex: 'N/A', // Replace with actual UV Index if available
          location: searchQuery,
        };
  
        console.log(weatherData)
        // Save weather data to database
        await axios.post('http://localhost:5000/weather', weatherData);
      }
     catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-dashboard-wrapper">
      <div className="weather-content">
        <Box className="search-section glass">
          <TextField
            fullWidth
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            InputProps={{
              endAdornment: (
                <IconButton onClick={searchLocation}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        {weather && (
          <div className="weather-grid">
            <div className="weather-main">
              <Box className="current-weather glass">
                <Typography variant="h4">{searchQuery}</Typography>
                <Typography variant="subtitle1" className="date">
                  {formatDate(weather.dt)}
                </Typography>
                <Typography variant="h1" className="temp">
                  {Math.round(weather.main.temp)}°C
                </Typography>
                <Typography variant="h6">
                  H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
                </Typography>
                <Typography variant="h6" className="description">
                  {weather.weather[0].description}
                </Typography>
              </Box>

              <div className="weather-details-grid">
                <Box className="detail-card glass">
                  <ThermostatIcon />
                  <Typography variant="h6">Feels Like</Typography>
                  <Typography variant="h4">{Math.round(weather.main.feels_like)}°C</Typography>
                </Box>
                
                <Box className="detail-card glass">
                  <OpacityIcon />
                  <Typography variant="h6">Humidity</Typography>
                  <Typography variant="h4">{weather.main.humidity}%</Typography>
                </Box>
                
                <Box className="detail-card glass">
                  <AirIcon />
                  <Typography variant="h6">Wind</Typography>
                  <Typography variant="h4">{weather.wind.speed} m/s</Typography>
                </Box>
                
                <Box className="detail-card glass">
                  <WbSunnyIcon />
                  <Typography variant="h6">UV Index</Typography>
                  <Typography variant="h4">N/A</Typography>
                </Box>
                
                <Box className="detail-card glass">
                  <CompressIcon />
                  <Typography variant="h6">Pressure</Typography>
                  <Typography variant="h4">{weather.main.pressure} hPa</Typography>
                </Box>
                
                <Box className="detail-card glass">
                  <VisibilityIcon />
                  <Typography variant="h6">Visibility</Typography>
                  <Typography variant="h4">{(weather.visibility / 1000).toFixed(1)} km</Typography>
                </Box>
              </div>
            </div>

            <Box className="forecast-section glass">
              <Typography variant="h6">5-Day Forecast</Typography>
              <div className="forecast-list">
                {forecast && groupForecastByDay(forecast.list).map((day, index) => (
                  <Box key={index} className="forecast-item glass">
                    <Typography variant="subtitle1">
                      {formatDate(day.dt)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                      <Typography variant="h6">{Math.round(day.main.temp)}°C</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <WaterDropIcon sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2">{Math.round(day.pop * 100)}%</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2">{day.weather[0].description}</Typography>
                  </Box>
                ))}
              </div>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;