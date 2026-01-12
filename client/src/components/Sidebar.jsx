import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import "../styles/CustomSidebar.css";
import plantainlogo from "../pages/images/plantain-icon-main.png";
import ThemeSwitcher from "./ThemeSwitcher";
import axios from "axios";

// Styled components
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 20px;
  color: #2f4f4f;
  font-family: "Titillium Web", sans-serif;
  font-size: 34px;
  position: relative;
  gap: 12px;
  z-index: 1001;

  @media (max-width: 768px) {
    .header-text {
      font-size: 1em;
    }
    padding-top: 15px;
  }

  html.dark &,
  body.dark &,
  #root.dark & {
    color: #e0e8f0;
  }
`;

const HamburgerButton = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #2f4f4f;

  html.dark &,
  body.dark &,
  #root.dark & {
    color: #e0e8f0;
    border-color: #e0e8f0;
  }

  .anticon {
    font-size: 24px;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: 50px;
  margin-right: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  margin: 0 15px;
  font-size: 22px;
  position: relative;
  display: inline-block;
  padding-bottom: 3px;
  color: #2f4f4f;
  transition: color 0.3s ease;

  html.dark &,
  body.dark &,
  #root.dark & {
    color: #64b5f6;
  }

  &.active {
    font-weight: bold;
    color: #004d40;
  }

  html.dark &.active,
  body.dark &.active,
  #root.dark &.active {
    color: #64b5f6;
  }

  &:hover {
    color: #004d40;
  }

  html.dark &:hover,
  body.dark &:hover,
  #root.dark &:hover {
    color: #90caf9;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const CustomSidebar = () => {
  const [open, setOpen] = useState(false);
  const [blogsVisible, setBlogsVisible] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          "https://plantaintree-app-server.vercel.app/settings"
        );
        setBlogsVisible(response.data.blogsVisible);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header>
        <StyledLink to="/">
          <div className="header-container">
            <StyledImage
              src={plantainlogo}
              alt="PlantainTree Logo"
              className="logo"
            />
          </div>
        </StyledLink>
        <HeaderLinks className="nav-items">
          <HeaderLink to="/about">About</HeaderLink>
          <HeaderLink to="/team">Team</HeaderLink>
          <HeaderLink to="/companies">Portfolio</HeaderLink>
          {blogsVisible && <HeaderLink to="/blogs">Blogs</HeaderLink>}
        </HeaderLinks>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeSwitcher />
          <HamburgerButton
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="ham-icon"
            size="large"
          />
        </div>
      </Header>

      {/* Drawer Overlay */}
      <div
        className={`drawer-overlay ${open ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`drawer-panel ${open ? "open" : ""}`}>
        {/* Close Button */}
        <div className="drawer-close-section">
          <button
            className="drawer-close-button"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <div className="drawer-menu-container">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `drawer-menu-item ${isActive ? "active" : ""}`
            }
            onClick={onClose}
          >
            About
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `drawer-menu-item ${isActive ? "active" : ""}`
            }
            onClick={onClose}
          >
            Team
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              `drawer-menu-item ${isActive ? "active" : ""}`
            }
            onClick={onClose}
          >
            Portfolio
          </NavLink>
          {blogsVisible && (
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `drawer-menu-item ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              Blogs
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomSidebar;