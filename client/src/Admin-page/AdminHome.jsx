import React from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/AdminHome.css";
import adminlogo from "../pages/images/admin-logo.png";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsible width={250} theme="dark">
        <div className="logo-admin">
          <Link to="/">
            <img src={adminlogo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "30px" }}
        >
          {/* Dashboard */}
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="dashboard">Dashboard</Link>
          </Menu.Item>

          {/* Company Settings Dropdown */}
          <SubMenu
            key="sub1"
            icon={<SettingOutlined />}
            title="Company Settings"
          >
            <Menu.Item key="2">
              <Link to="companyAdd">Add Company</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="testCompanies">Companies List</Link>
            </Menu.Item>
          </SubMenu>

          {/* Other Menu Items */}
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="users">Users</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <Link to="settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          // style={{
          //   padding: 0,
          //   background: colorBgContainer,
          // }}
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
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
