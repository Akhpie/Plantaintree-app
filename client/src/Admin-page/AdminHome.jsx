import React, { useState } from "react";
import { Layout, Menu, Button, Switch, theme, Spin } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DatabaseOutlined,
  SolutionOutlined,
  FileTextOutlined,
  AreaChartOutlined,
  CalendarOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/AdminHome.css";
import adminLogoDark from "../pages/images/admin-logo.png";
import adminLogoLight from "../pages/images/admin-logo-dark.png";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminHome = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [themeMode, setThemeMode] = useState("dark");
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const navigate = useNavigate();

  // const handleLogout = () => {
  //   const auth2 = window.gapi.auth2.getAuthInstance();
  //   if (auth2) {
  //     auth2.signOut().then(() => {
  //       console.log("User signed out.");
  //       navigate("/admin");
  //     });
  //   }
  // };
  const handleLogout = () => {
    setLoading(true);

    const timeout = setTimeout(() => {
      navigate("/admin");
      setLoading(false);
    }, 2000);

    if (window.gapi && window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2) {
        auth2
          .signOut()
          .then(() => {
            console.log("User signed out.");
            localStorage.removeItem("googleAuth");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
            clearTimeout(timeout);
            setLoading(false);
            navigate("/admin");
          });
      } else {
        console.error("Auth instance is not available.");
        clearTimeout(timeout);
        setLoading(false);
        navigate("/admin");
      }
    } else {
      console.error("Google API is not initialized.");
      clearTimeout(timeout);
      setLoading(false);
      navigate("/admin");
    }
  };

  const handleThemeToggle = (checked) => {
    setThemeMode(checked ? "dark" : "light");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsible width={250} theme={themeMode}>
        <div className="logo-admin">
          <Link to="/">
            <img
              src={themeMode === "dark" ? adminLogoDark : adminLogoLight}
              alt="Logo"
              className="logo-image"
            />
          </Link>
        </div>
        <Menu
          theme={themeMode}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ marginTop: "30px" }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="dashboard">Dashboard</Link>
          </Menu.Item>

          <SubMenu
            key="sub1"
            icon={<SolutionOutlined />}
            title="Company Settings"
          >
            <Menu.Item key="2">
              <Link to="companyAdd">Add Company</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="testCompanies">Companies List</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<DatabaseOutlined />} title="Storage Area">
            <Menu.Item key="4">
              <Link to="storage">Storage Area</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub3"
            icon={<FileTextOutlined />}
            title="Blog Management"
          >
            <Menu.Item key="5">
              <Link to="blogmanage">Blog Settings</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<CalendarOutlined />} title="Scheduler">
            <Menu.Item key="6">
              <Link to="notemaker">Tasks Lister</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="schedule">Event Scheduler</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="8" icon={<AreaChartOutlined />}>
            <Link to="analytics">Analytics</Link>
          </Menu.Item>

          <Menu.Item key="9" icon={<UserOutlined />}>
            <Link to="users">Users</Link>
          </Menu.Item>

          <Menu.Item key="10" icon={<SettingOutlined />}>
            <Link to="settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{ background: themeMode === "dark" ? "#001529" : "#fff" }}
        >
          <div
            className="header-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <Switch
              checked={themeMode === "dark"}
              onChange={handleThemeToggle}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              style={{ marginRight: "16px" }}
            />
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                position: "absolute",
                right: 16,
              }}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            background: colorBgContainer,
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <div className="content-body">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
