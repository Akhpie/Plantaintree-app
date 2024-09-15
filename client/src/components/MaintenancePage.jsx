import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const MaintenancePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <Result
        status="warning"
        title="Website Under Maintenance"
        subTitle="We're currently performing maintenance. Please check back later."
        extra={[
          <Link to="/" key="home">
            <Button type="primary">Go to Home</Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default MaintenancePage;
