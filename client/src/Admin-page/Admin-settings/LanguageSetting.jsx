import React, { useState, useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const LanguageSetting = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    console.log(`Language changed to: ${value}`);
  };

  useEffect(() => {
    // Load saved language on component mount
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div>
      <h3>Portal Language</h3>
      <Select
        value={language}
        onChange={handleLanguageChange}
        style={{ width: 200 }}
      >
        <Option value="en">English</Option>
        <Option value="es">Spanish</Option>
        <Option value="fr">French</Option>
        <Option value="de">German</Option>
        {/* Add more languages */}
      </Select>
    </div>
  );
};

export default LanguageSetting;
