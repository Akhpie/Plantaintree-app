import React, { useState, useEffect } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/CustomSidebar.css";
import plantainlogo from "../pages/images/plantain-icon-main.png";
import { NavLink } from "react-router-dom";
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

  @media (max-width: 768px) {
    .header-text {
      font-size: 1em;
    }
    padding-top: 15px;
  }
`;

const AppTitle = styled.div`
  font-size: 1.3em;
  font-weight: 700;
  // font-family: "Macondo", cursive;
  font-family: "Baskervville SC", serif;
  margin-bottom: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.img`
  display: none;
  width: 120px;
  height: auto;

  @media (max-width: 768px) {
    display: block;
    margin-right: 200px;
  }
`;

const LogoTwo = styled.img`
  display: block;
  width: 150px;
  border-radius: 50%;
`;

const HamburgerButton = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #2f4f4f;

  .anticon {
    font-size: 24px;
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  // background-color: cyan;
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

  &.active {
    font-weight: bold;
    &:after {
      width: 100%;
    }
  }

  &:hover {
    color: #004d40;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #004d40;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 30px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
`;

const StyledMenu = styled(Menu)`
  background-color: transparent !important;
  color: #2f4f4f;
  border-right: 0 !important;
  width: 100%;
  text-align: center;
  margin-top: 30px;

  .ant-menu {
    background-color: transparent !important;
    border: none !important;
  }

  .ant-menu-item {
    font-size: 28px !important;
    font-family: "Titillium Web", sans-serif !important;
    background-color: transparent !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 16px;
    padding: 16px 20px !important;
    border-radius: 12px !important;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    border: 2px solid #0f3460 !important;
    height: auto;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(15, 52, 96, 0.15) !important;
    background: linear-gradient(135deg, #0f3460 0%, #1a5490 100%) !important;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
      transition: left 0.4s ease;
      z-index: -1;
    }

    &:hover {
      color: #ffffff !important;
      background: linear-gradient(135deg, #1a5490 0%, #0f3460 100%) !important;
      transform: translateX(12px) scale(1.05) !important;
      border-color: #64b5f6 !important;
      box-shadow: 0 12px 28px rgba(15, 52, 96, 0.3) !important;
    }

    &:focus {
      background-color: transparent !important;
    }
  }

  .ant-menu-item-selected {
    background: linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%) !important;
    color: #ffffff !important;
    border-color: #64b5f6 !important;
    box-shadow: 0 12px 28px rgba(100, 181, 246, 0.4) !important;
    transform: scale(1.08) !important;
  }

  .ant-menu-item-selected a {
    color: #ffffff !important;
  }

  .ant-menu-item a {
    color: #ffffff !important;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 700;

    &:hover {
      color: #ffffff !important;
    }
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
        setLoading(false); // Settings have been fetched
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
            <div className="header-container">
              <StyledImage
                src={plantainlogo}
                alt="PlantainTree Logo"
                className="logo"
              />
            </div>
          </div>
        </StyledLink>
        <HeaderLinks className="nav-items">
          <HeaderLink to="/about">About</HeaderLink>
          <HeaderLink to="/team">Team</HeaderLink>
          <HeaderLink to="/companies">Portfolio</HeaderLink>
          {/* <HeaderLink to="/blogs">Blogs</HeaderLink> */}
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
      <Drawer
        placement="right"
        width={450}
        onClose={onClose}
        open={open}
        destroyOnClose={true}
        drawerStyle={{
          color: "#2f4f4f",
          zIndex: 999,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
        }}
        headerStyle={{
          color: "#2f4f4f",
          zIndex: 1000,
          background: "linear-gradient(135deg, #0f3460 0%, #1a5490 100%)",
          borderBottom: "none",
        }}
        maskStyle={{
          zIndex: 998,
        }}
      >
        <DrawerBody>
          <StyledMenu mode="vertical">
            <Menu.Item key="1" onClick={onClose}>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" onClick={onClose}>
              <NavLink to="/team" activeClassName="active">
                Team
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3" onClick={onClose}>
              <NavLink
                to="/companies"
                activeClassName="active"
              >
                Portfolio
              </NavLink>
            </Menu.Item>
            {blogsVisible && (
              <Menu.Item key="4" onClick={onClose}>
                <NavLink to="/blogs">
                  Blogs
                </NavLink>
              </Menu.Item>
            )}
          </StyledMenu>
        </DrawerBody>
      </Drawer>
    </>
  );
};

export default CustomSidebar;
