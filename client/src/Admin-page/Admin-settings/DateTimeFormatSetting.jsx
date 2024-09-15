import React, { useState, useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const DateTimeFormatSetting = () => {
  const [dateTimeFormat, setDateTimeFormat] = useState(
    localStorage.getItem("dateTimeFormat") || "DD/MM/YYYY"
  );

  const handleDateTimeFormatChange = (value) => {
    setDateTimeFormat(value);
    localStorage.setItem("dateTimeFormat", value);
    console.log(`Date/Time format changed to: ${value}`);
  };

  useEffect(() => {
    // Load saved date/time format on component mount
    const savedFormat = localStorage.getItem("dateTimeFormat");
    if (savedFormat) {
      setDateTimeFormat(savedFormat);
    }
  }, []);

  return (
    <div>
      <h3>Date/Time Format</h3>
      <Select
        value={dateTimeFormat}
        onChange={handleDateTimeFormatChange}
        style={{ width: 200 }}
      >
        <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
        <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
        <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
      </Select>
    </div>
  );
};

export default DateTimeFormatSetting;
