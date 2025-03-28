import React from "react";
import "../styles/about.css";
import CustomSidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <CustomSidebar />
      <div className="about-page">
        <div className="hero-section hero">
          <p className="hero-small-text">ABOUT US</p>
          <h1 className="hero-heading">
            Empowering Innovation Through
            <span className="span-text"> Vision and Leadership</span>
          </h1>
          <p className="hero-caption">
            We are an early-stage investment firm dedicated to supporting
            startups at the pre-seed and seed stages of their journey. Our
            primary goal is to identify and back innovative founders and
            ventures that are in their formative stages but have the potential
            for significant growth.
          </p>
        </div>
        <div className="points-section">
          <h2 className="info-heading">
            Our <span className="invest-text">Investment Approach</span>
          </h2>
          <div className="bg-image">
            <div className="info-box">
              <ul className="info-list">
                <li className="info-item">
                  <h3 style={{ fontWeight: 500 }}>Sector-Agnostic</h3>
                  <p className="footer-text-team">
                    Our focus is on identifying and backing startups with strong
                    founding teams that are dedicated to addressing genuine pain
                    points and delivering real value to customers.
                  </p>
                </li>
                <li className="info-item">
                  <div className="dot-container">
                    <span className="dot">•</span>
                    <span className="dot">•</span>
                    <span className="dot">•</span>
                  </div>
                  <h3 style={{ fontWeight: 500 }}>Founding Team</h3>
                  <p className="footer-text-team">
                    We believe that the strength of the founding team is
                    crucial, as it drives the vision, resilience, and execution
                    necessary for a startup’s success.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
