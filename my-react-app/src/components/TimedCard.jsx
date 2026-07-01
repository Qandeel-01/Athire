import React from "react";
import "./timedcard.css";

const TimedCard = ({ title, description, bgImage }) => {
  return (
    <div
      className="timed-card"
      style={{ backgroundImage: `url('${bgImage}')` }} // Ensured quotes around the URL
    >
      <div className="card-overlay">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TimedCard;
