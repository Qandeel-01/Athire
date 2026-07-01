import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import AboutUs from "./components/AboutUs";
import UserProfile from "./components/UserProfile";
import SignUpLogin from "./components/SignUpLogin";
import OutfitBuilder from "./components/OutfitBuilder";
import WeatherDashboard from "./components/WeatherDashboard";
import MapComponent from "./components/MapComponent";
import BeforeLogin from "./components/BeforeLogin";
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      offset: 120,
      once: true,
    });

    const checkAuth = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/athire/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setIsLoggedIn(true);
          setUserProfile(response.data.user);
        } catch (error) {
          handleLogout();
        }
      }
    };

    checkAuth();
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserProfile(userData);
    localStorage.setItem('userProfile', JSON.stringify(userData));
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userToken');
  };

  if (showIntro) {
    return <IntroSection />;
  }

  return (
    <Router>
      <div className="app">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/background.mov" type="video/quicktime" />
          <source src="/background.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isLoggedIn ? (
          <div className="before-login-wrapper">
            <BeforeLogin onSignupClick={handleLoginClick} />
            <SignUpLogin 
              isOpen={isModalOpen} 
              onClose={handleCloseModal}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        ) : (
          <div className="main-app-container">
            <div className="overlay"></div>
            <div className="content-wrapper">
              <Navbar 
                onLoginClick={handleLoginClick} 
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                userProfile={userProfile}
              />
              
              <main className="flex-1 w-full max-w-screen-lg mx-auto overflow-y-auto">
                <Routes>
                  <Route path="/" element={<HeroSection />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route 
                    path="/user-profile" 
                    element={
                      <UserProfile 
                        userProfile={userProfile}
                        isLoggedIn={isLoggedIn}
                      />
                    } 
                  />
                  <Route 
                    path="/outfit-maker" 
                    element={
                      <OutfitBuilder 
                        isLoggedIn={isLoggedIn}
                        userProfile={userProfile}
                      />
                    } 
                  />
                  <Route 
                    path="/weather-dashboard" 
                    element={
                      <WeatherDashboard 
                        isLoggedIn={isLoggedIn}
                        userProfile={userProfile}
                      />
                    } 
                  />
                  <Route path="/map" element={<MapComponent />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;