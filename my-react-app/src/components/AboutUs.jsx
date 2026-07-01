import React, { useEffect } from "react";
import "./AboutUs.css";
import AOS from "aos";
import "aos/dist/aos.css";

import DefaultProfileImage from "./assets/default-profile.png";
import ProfileImage from "./assets/profile.jpg";
import BackgroundImage from "./assets/background1.jpg";
import HijabImage from "./assets/Hijab.jpeg";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      offset: 120,
      once: true,
    });
  }, []);

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <div className="about-us-hero" data-aos="fade-up">
        <h1 className="main-title">ABOUT US</h1>
        <p>We are a team of innovators focused on crafting practical solutions.
           With a blend of creativity and precision, we aim to enhance your daily 
           experiences.</p>
      </div>

      {/* Cards Section */}
      <div className="about-us-content">
        {[
          { name: "Qandeel Fatima", image: ProfileImage },
          { name: "Noor ul Hayya", image: DefaultProfileImage },
          { name: "Hijab Zahra", image: HijabImage },
          { name: "Faatima Aamir", image: BackgroundImage },
        ].map((member, index) => (
          <div
            className="about-us-card"
            key={index}
            data-aos="zoom-in"
            data-aos-delay={`${index * 100}`}
          >
            <div className="about-us-card-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="about-us-card-details">
              <p className="member-name">{member.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;