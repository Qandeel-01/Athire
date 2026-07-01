// MapComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // Added useMap
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { TextField, IconButton, Typography, Box, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UVGauge from './UVGauge';
import './MapComponent.css';

// Create a component to handle map updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const MapComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState({ lat: 20, lng: 0 });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [zoom, setZoom] = useState(4);
  
  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const searchLocation = async () => {
    if (!searchQuery) return;

    try {
      const geoRes = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${OPENWEATHER_API_KEY}`
      );

      if (geoRes.data.length === 0) {
        alert('Location not found!');
        return;
      }

      const { lat, lon } = geoRes.data[0];
      setLocation({ lat, lng: lon });
      setZoom(12); // Set zoom level when new location is found

      // Fetch weather data
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      setWeather(weatherRes.data);

      // Fetch forecast data
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      setForecast(forecastRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const WeatherMetricCard = ({ title, value, unit, children }) => (
    <Paper className="weather-metric-card">
      <Typography className="card-title">{title}</Typography>
      <div className="card-content">
        {children || (
          <Typography className="metric-value">
            {value}
            <span className="metric-unit">{unit}</span>
          </Typography>
        )}
      </div>
    </Paper>
  );

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="map-component">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Box sx={{ display: 'flex', gap: 2, p: 2, width: '100%' }}>
            <TextField
              fullWidth
              className="search-field"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={searchLocation}>
                    <SearchIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
        </div>

        {weather && (
          <div className="info-panel">
            <Typography variant="h2">{Math.round(weather.main.temp)}°C</Typography>
            <Typography>{weather.weather[0].description}</Typography>
            <Typography variant="body2">{searchQuery}</Typography>
          </div>
        )}

        <div className="forecast-section">
          <Typography variant="h6">7 Days Forecast</Typography>
          {forecast && (
            <div className="forecast-list">
              {forecast.list.slice(0, 7).map((day, index) => (
                <div key={index} className="forecast-item">
                  <span>
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span>{Math.round(day.main.temp)}°C</span>
                  <img 
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                    alt={day.weather[0].description}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="metrics-grid">
          <WeatherMetricCard title="Wind Status" value={weather?.wind.speed || '-'} unit="m/s" />
          <WeatherMetricCard title="UV Index">
            <UVGauge value={5.50} />
          </WeatherMetricCard>
          <WeatherMetricCard title="Sunrise & Sunset">
            {weather && (
              <div className="sun-times">
                <div>🌅 {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
                <div>🌇 {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
              </div>
            )}
          </WeatherMetricCard>
          <WeatherMetricCard title="Humidity" value={weather?.main.humidity || '-'} unit="%" />
          <WeatherMetricCard
            title="Visibility"
            value={weather ? (weather.visibility / 1000).toFixed(1) : '-'}
            unit="km"
          />
          <WeatherMetricCard
            title="Feels Like"
            value={weather ? Math.round(weather.main.feels_like) : '-'}
            unit="°C"
          />
        </div>

        <div className="map-section">
          <div className="map-header">
            <Typography variant="h6">Weather Condition Map</Typography>
            <div className="map-controls">
              <IconButton onClick={handleZoomIn}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleZoomOut}>
                <RemoveIcon />
              </IconButton>
            </div>
          </div>
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={zoom}
            className="leaflet-container"
          >
            <MapUpdater center={[location.lat, location.lng]} zoom={zoom} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {weather && (
              <Marker position={[location.lat, location.lng]}>
                <Popup>
                  <div>
                    <strong>{searchQuery}</strong>
                    <br />
                    Temperature: {Math.round(weather.main.temp)}°C
                    <br />
                    {weather.weather[0].description}
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
