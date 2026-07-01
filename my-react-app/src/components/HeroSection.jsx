import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed
import hoodie from "./assets/hoodie.png";
import sneakers from "./assets/sneakers.png";
import outfits from "./assets/Outfits/outfits";
import activities from "./assets/Activity/activities";
import { Link } from 'react-router-dom';

const getIcon = (collection, label) => {
  if (collection[label]?.icon) {
    return collection[label].icon;
  }

  const normalizedLabel = label.replace(/^Indoor\s+/i, '').trim();
  return collection[normalizedLabel]?.icon || null;
};

const HeroSection = () => {
  const [weatherRecommendations, setWeatherRecommendations] = useState(null);

  // Fetch weather recommendations from the API on component mount
  useEffect(() => {
    const fetchWeatherRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/weather/recommendations'); // Replace with your actual API endpoint
        setWeatherRecommendations(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching weather recommendations:', error);
      }
    };

    fetchWeatherRecommendations();
  }, []);

  return (
    <div className="homepage glass w-full min-h-screen">
      {/* Header Section */}
      <header className="text-center w-full py-10">
        <h1 className="text-[180px] lg:text-[200px] font-extrabold text-white opacity-90 leading-none">
          ATHIRE
        </h1>
        <p className="text-xl lg:text-2xl tracking-widest text-white opacity-80">
          Your Personal Styling Assistant
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 lg:px-16">
        {/* Recommendations Section */}
        <section className="recommendations flex flex-wrap justify-around items-start gap-8 my-12">
          {/* Outfit Card */}
          <div className="glass p-6 rounded-lg shadow-lg transform hover:scale-105 transition bg-white/10 max-w-sm">
            <img
              src={sneakers}
              alt="OOTD"
              className="rounded-md h-48 mx-auto object-contain"
            />
            <h2 className="mt-4 text-lg font-bold text-center text-white">
              LOOKING FOR INSPIRATION?
            </h2>
            <p className="text-sm text-gray-300 text-center">
              Here's Suggested OOTD!
            </p>
          </div>

          {/* Activity Card */}
          <div className="glass p-6 rounded-lg shadow-lg transform hover:scale-105 transition bg-white/10 max-w-sm">
            <img
              src={hoodie}
              alt="Activity"
              className="rounded-md h-48 mx-auto object-contain"
            />
            <h2 className="mt-4 text-lg font-bold text-center text-white">
              ACTIVITY FOR TODAY
            </h2>
            <p className="text-sm text-gray-300 text-center">
              Suggested based on the weather!
            </p>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="map-section my-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white">Plan Your Day</h2>
            <p className="text-lg text-gray-300">
              Discover real-time weather updates and get personalized recommendations based on your location. Stay prepared and make the most of your day!
            </p>
          </div>
          <div className="map-container bg-white/10 p-4 rounded-lg shadow-lg">
            {/* Display weather recommendations */}
            <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
              {weatherRecommendations ? (
                <div className="weather-info text-white">
                  <h3 className="text-xl font-bold">Weather Recommendations</h3>
                  <div className="mt-4">
                    <h4 className="text-lg">Activities:</h4>
                    <ul>
                      {weatherRecommendations.activities.map((activity, index) => (
                        <li key={index} className="mt-2 flex gap-3 items-center">
                          {getIcon(activities, activity) ? (
                            <img src={getIcon(activities, activity)} alt={activity} className="w-8 h-8 object-contain" />
                          ) : null}
                          {activity}
                          </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg">Outfits:</h4>
                    <ul>
                      
                      {weatherRecommendations.outfits.map((outfit, index) => (
                        <li key={index} className="mt-2 flex gap-3 items-center">
                          {outfits[outfit]?.icon ? (
                            <img src={outfits[outfit].icon} alt={outfit} className="w-8 h-8 object-contain" />
                          ) : null}
                          {outfit}
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-white opacity-70">Loading weather recommendations...</p>
              )}
            </div>
            <div>
              <p className="mt-2 flex gap-3">Want to build your outfit?</p>
              <Link to="/outfit-maker">We got you!</Link>
            </div>
          </div> 
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center py-6 mt-12 bg-black/30">
        <p className="text-sm text-gray-400">
          &copy; 2024 Athire. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HeroSection;