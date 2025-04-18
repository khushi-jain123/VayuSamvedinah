import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCalculator, faBell, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../index.css";

const GoogleTranslate = () => {
  useEffect(() => {
    // Check if the Google Translate element is already initialized
    if (window.google && window.google.translate) {
      return;
    }

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en", // Available languages
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element"></div>;
};

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Website Name on the Left */}
      <div className="website-name">
        <span>AgriClimate</span>
      </div>

      {/* Navigation Items */}
      <div className="navbar-items">
        <Link to="/" className="nav-item" data-tooltip="Home - Overview of climate insights">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>
        <Link to="/dashboard" className="nav-item" data-tooltip="Dashboard - Graphs for temperature & rainfall">
          <FontAwesomeIcon icon={faChartBar} />
          <span>Dashboard</span>
        </Link>
        <Link to="/prediction" className="nav-item" data-tooltip="Prediction - Crop growth model analysis">
          <FontAwesomeIcon icon={faCalculator} />
          <span>Prediction</span>
        </Link>
        <Link to="/alerts" className="nav-item" data-tooltip="Alerts - Extreme weather warnings">
          <FontAwesomeIcon icon={faBell} />
          <span>Alerts</span>
        </Link>
        <Link to="/chatbot" className="nav-item" data-tooltip="Chat with AI">
          <FontAwesomeIcon icon={faCommentDots} />
          <span>Chat</span>
        </Link>
      </div>

      {/* Google Translate Dropdown */}
      <div className="nav-translate">
        <GoogleTranslate />
      </div>
    </nav>
  );
};

export default Navbar;
