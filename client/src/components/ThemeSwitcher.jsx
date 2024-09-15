import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import "../styles/ThemeSwitcher.css"; // Make sure to include any additional styles here

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load the saved theme from local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme; // Apply the theme class to the body
    }
  }, []);

  useEffect(() => {
    // Save the theme to local storage and apply it to the body
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <Button
        icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}
        className="theme-switcher-button"
        shape="circle"
      />
    </Tooltip>
  );
};

export default ThemeSwitcher;
