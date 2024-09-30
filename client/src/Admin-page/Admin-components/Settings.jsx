import React, { useEffect, useState } from "react";
import { Card, Switch, Typography, notification, Row, Col } from "antd";
import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SettingsPage = () => {
  const [blogsVisible, setBlogsVisible] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          "https://plantaintree-app-server.vercel.app/settings"
        );
        setBlogsVisible(response.data.blogsVisible);
      } catch (error) {
        console.error("Error fetching settings:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch settings. Please try again.",
        });
      }
    };

    fetchSettings();
  }, []);

  const handleToggle = async (checked) => {
    try {
      await axios.post("https://plantaintree-app-server.vercel.app/settings", {
        blogsVisible: checked,
      });
      setBlogsVisible(checked);

      if (checked) {
        notification.success({
          message: "Success",
          description: "Blogs tab has been successfully enabled.",
        });
      } else {
        notification.error({
          message: "Disabled",
          description: "Blogs tab has been disabled.",
        });
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      notification.error({
        message: "Error",
        description: "Failed to update settings. Please try again.",
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={16}>
          <Card
            bordered={false}
            style={{
              margin: "0 auto",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#001240",
            }}
          >
            <Title
              level={3}
              style={{
                textAlign: "center",
                marginBottom: 60,
                color: "whitesmoke",
              }}
            >
              Toggler
            </Title>
            <Card style={{ backgroundColor: "white" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "#001240",
                  }}
                >
                  Show Blogs Tab:
                </Text>
                <Switch
                  checked={blogsVisible}
                  onChange={handleToggle}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  style={{
                    backgroundColor: blogsVisible ? "#4caf50" : "#f5222d",
                  }}
                />
              </div>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
