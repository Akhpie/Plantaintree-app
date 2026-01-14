import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import "../styles/ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (themeName) => {
    // Apply theme to multiple DOM elements for proper cascade
    document.documentElement.className = themeName;
    document.body.className = themeName;
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.className = themeName;
    }
  };

  useEffect(() => {
    // Load the saved theme from local storage on mount
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    // Save the theme to local storage and apply it
    if (mounted) {
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Prevent hydration mismatch by returning null until mounted
  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <Button
        icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}
        className="theme-switcher-button"
        shape="circle"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "currentColor",
        }}
      />
    </Tooltip>
  );
};

export default ThemeSwitcher;
