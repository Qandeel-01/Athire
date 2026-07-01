import React, { useState, useEffect } from "react";

const IntroSection = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Hide the intro after 5.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro && (
        <div className="intro-screen fixed inset-0 flex flex-col justify-center items-center">
          <h1 className="intro-title text-[100px] lg:text-[150px] font-extrabold text-white leading-none">
            ATHIRE
          </h1>
          <p className="intro-subtitle absolute bottom-20 text-white text-lg lg:text-2xl tracking-wide">
            Your Personal Styling Assistant
          </p>
        </div>
      )}
    </>
  );
};

export default IntroSection;
