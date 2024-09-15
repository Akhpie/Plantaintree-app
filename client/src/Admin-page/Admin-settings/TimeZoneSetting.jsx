import React, { useState, useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const TimeZoneSetting = () => {
  const [timeZone, setTimeZone] = useState(
    localStorage.getItem("timeZone") || "UTC"
  );

  const handleTimeZoneChange = (value) => {
    setTimeZone(value);
    localStorage.setItem("timeZone", value);
    console.log(`Time zone changed to: ${value}`);
  };

  useEffect(() => {
    // Load saved time zone on component mount
    const savedTimeZone = localStorage.getItem("timeZone");
    if (savedTimeZone) {
      setTimeZone(savedTimeZone);
    }
  }, []);

  return (
    <div>
      <h3>Time Zone</h3>
      <Select
        value={timeZone}
        onChange={handleTimeZoneChange}
        style={{ width: 200 }}
      >
        <Option value="UTC">UTC</Option>
        <Option value="CST">CST</Option>
        <Option value="EST">EST</Option>
        <Option value="PST">PST</Option>
        <Option value="IST">IST</Option>
      </Select>
    </div>
  );
};

export default TimeZoneSetting;
