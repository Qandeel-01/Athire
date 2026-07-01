import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Ensure BrowserRouter is imported
import App from './App';  // Your main App component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>  {/* Wrap the entire app in BrowserRouter */}
    <App />
  </BrowserRouter>
);
