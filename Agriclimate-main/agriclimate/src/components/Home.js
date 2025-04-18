import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to AgriClimate Analytics</h1>
          <p>Empowering Agriculture Through Climate Intelligence</p>
          <Link to="/prediction" className="cta-button">
            Start Analysis
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Pioneering climate-smart agricultural solutions through advanced analytics and AI-driven insights.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@agriclimatenexus.com</p>
            <p>Phone: +91 1122334455</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 AgriClimate Analytics. All rights reserved. | Image by Tomasz Filipek</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;