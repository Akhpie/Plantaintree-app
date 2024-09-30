import React from "react";
import { Card, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CompanySettings = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/admin/companyAdd");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title="Proceed to Company Settings"
        style={{ width: 300 }}
        actions={[
          <Button
            type="primary"
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={handleRedirect}
          />,
        ]}
      >
        <p>Manage your company details and settings here.</p>
      </Card>
    </div>
  );
};

export default CompanySettings;
