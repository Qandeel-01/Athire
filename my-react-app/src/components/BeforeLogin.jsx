import React, { useState } from "react";
import "./BeforeLogin.css";
import background from "./assets/background1.jpg";
import style1 from "./assets/style1.jpg";
import style2 from "./assets/style2.png";
import style3 from "./assets/style3.jpg";
import style4 from "./assets/style4.jpg";

const styles = [
  {
    name: "Casual",
    description: "Relaxed and comfortable attire for everyday wear.",
    image: style1,
  },
  {
    name: "Formal",
    description: "Professional and elegant outfits for formal occasions.",
    image: style2,
  },
  {
    name: "Old Money",
    description: "Classics.",
    image: style3,
  },
  {
    name: "Futuristic",
    description: "Artistic and free-spirited styles for a unique look.",
    image: style4,
  },
];

const BeforeLogin = ({ onSignupClick }) => {
  const [hoveredStyle, setHoveredStyle] = useState(null);

  const handleHover = (style) => {
    setHoveredStyle(style);
  };

  const handleMouseLeave = () => {
    setHoveredStyle(null);
  };

  return (
    <div
      className="before-login-container"
      style={{
        backgroundImage: `url(${hoveredStyle?.image || background})`,
      }}
      data-has-hover={!!hoveredStyle}
    >
      <div className="glassy-overlay"></div>

      <button className="signup-button" onClick={onSignupClick}>
        Sign Up / Login
      </button>

      <div className={`text-container ${hoveredStyle ? 'hidden' : ''}`}>
        <h1>ATHIRE</h1>
        <p>
          Athire is your ultimate weather-based styling assistant. Get tailored outfit recommendations based on the current weather conditions in your area!
        </p>
      </div>

      {hoveredStyle && (
        <div className="description">
          <h1 className="description-title">{hoveredStyle.name}</h1>
          <p className="description-text">{hoveredStyle.description}</p>
        </div>
      )}

      <div className="content-section">
        <div className="card-container">
          {styles.map((style, index) => (
            <div
              key={index}
              className="card"
              onMouseEnter={() => handleHover(style)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={style.image} alt={style.name} />
              <h2 className="card-title">{style.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeforeLogin;