import React, { useState } from 'react';
import './SignUpLogin.css';
import axios from 'axios';

const SignupLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    province: '',
    country: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const endpoint = 'http://localhost:5000/athire';
      const dataToSend = {
        ...formData,
        action: isSignUp ? 'signup' : 'login'
      };

      // Remove confirmPassword from data being sent
      if (isSignUp) {
        delete dataToSend.confirmPassword;
      }

      const response = await axios.post(endpoint, dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        if (isSignUp) {
          setMessage('Signup successful! Please log in.');
          setIsSignUp(false);
          // Clear form data
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            gender: '',
            city: '',
            province: '',
            country: '',
          });
        } else {
          setMessage('Login successful!');
          if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);
          }
          onLoginSuccess(response.data.user);
        }
      } else {
        setMessage(response.data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setMessage(error.response.data.message || 'Server error. Please check your details.');
      } else if (error.request) {
        setMessage('Cannot connect to server. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="signup-login-overlay">
      <div className="signup-login-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender (M/F/O)"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <button type="submit" className="submit-button">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="toggle-form">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;