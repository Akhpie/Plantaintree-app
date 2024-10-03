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
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  // background-color: #80cbc4;
  color: #2f4f4f;
  border-right: 0;
  width: 100%;
  text-align: center;
  margin-top: -200px;

  .ant-menu-item {
    font-size: 42px;
    font-family: var(--logo--font);
    background-color: transparent;
    font-weight: 700px;
    color: #2f4f4f;
    margin-bottom: 30px;

    &:hover {
      color: #004d40;
    }
  }

  .ant-menu-item a {
    color: #2f4f4f;
    text-decoration: none;

    &:hover {
      color: #004d40;
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
        <HamburgerButton
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="ham-icon"
          size="large"
        />
      </Header>
      <Drawer
        placement="right"
        width={450}
        onClose={onClose}
        open={open}
        drawerStyle={{
          color: "#2f4f4f",
        }}
        headerStyle={{
          color: "#2f4f4f",
        }}
      >
        <DrawerBody>
          <StyledMenu mode="vertical">
            <Menu.Item key="1">
              <NavLink to="/about" onClick={onClose} activeClassName="active">
                About
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/team" onClick={onClose} activeClassName="active">
                Team
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink
                to="/companies"
                onClick={onClose}
                activeClassName="active"
              >
                Portfolio
              </NavLink>
            </Menu.Item>
            {blogsVisible && (
              <Menu.Item key="4">
                <NavLink to="/blogs" onClick={onClose}>
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
