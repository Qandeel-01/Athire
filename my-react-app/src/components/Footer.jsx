import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="flex justify-center gap-6 items-center">
        <a
          href="https://www.instagram.com/aviothicmoa/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link text-white hover:text-[#E4405F]"
        >
          Instagram
        </a>
        <a
          href="https://uk.pinterest.com/QuixoticQan/fitsthetic/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link text-white hover:text-[#E60023]"
        >
          Pinterest
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link text-white hover:text-[#1DA1F2]"
        >
          Twitter
        </a>
      </div>
      <p className="text-sm text-gray-300 mt-4">
        © {new Date().getFullYear()} Athire. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
