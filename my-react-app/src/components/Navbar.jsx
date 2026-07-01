import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../components/assets/logo.svg';

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="glass flex justify-between items-center px-8 py-4 fixed top-0 left-0 w-full z-50 text-white">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Athire Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-wide">ATHIRE</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li className="hover:text-gray-300 cursor-pointer transition">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer transition">
          <Link to="/outfit-maker">Outfit Builder</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer transition">
          <Link to="/weather-dashboard">Weather Dashboard</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer transition">
          <Link to="/map">Map</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer transition">
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>

      {/* Profile Icon & Log In Button */}
      <div className="flex items-center space-x-4">
        <Link to="/user-profile">
          <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-300" />
        </Link>
        <button
          className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
          onClick={onLoginClick}
        >
          Log In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;