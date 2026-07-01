import React from 'react';

const UVGauge = ({ value }) => {
  const radius = 50;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / 10) * circumference;

  return (
    <div className="uv-gauge">
      <svg viewBox="0 0 120 60">
        {/* Background arc */}
        <path
          d="M10 50 A50 50 0 0 1 110 50"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        {/* Progress arc */}
        <path
          d="M10 50 A50 50 0 0 1 110 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="6"
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset="0"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#F44336" />
          </linearGradient>
        </defs>
      </svg>
      {/* Display UV value */}
      <div className="uv-value">{value}</div>
    </div>
  );
};

export default UVGauge;
