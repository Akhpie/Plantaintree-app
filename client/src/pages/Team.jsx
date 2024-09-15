import React from "react";
import teamData from "../data/teamData.json";
import "../styles/Team.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CustomSidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Team = () => {
  return (
    <>
      <CustomSidebar />
      <div className="team-page">
        <div className="hero-section hero">
          <p className="hero-small-text">TEAM</p>
          <h1 className="hero-heading">
            Meet the <span className="span-text">founding</span> team.
          </h1>
          <p className="hero-caption">
            Our founding team is united by a shared vision and passion for
            innovation and the startup ecosystem. We are dedicated to supporting
            founders who are determined to challenge the status quo and make the
            world a better place.
          </p>
        </div>
        <div className="team-row">
          {teamData.map((member, index) => (
            <div key={index} className="team-member">
              <div className="team-card">
                <img
                  alt={member.name}
                  src={member.imgSrc}
                  className="team-image"
                />
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-icon"
                  >
                    <button className="linkedin-button">
                      <i className="fab fa-linkedin"></i> LinkedIn
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="team-footer">
          <p className="footer-text-team">
            Together, we bring a diverse set of skills and experiences, all
            focused on fostering innovation and empowering entrepreneurs.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
