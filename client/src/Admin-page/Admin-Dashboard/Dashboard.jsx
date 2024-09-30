import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FileTextOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;

const CardContainer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allow cards to wrap onto the next line */
  gap: 16px; /* Space between cards */
  align-items: flex-start; /* Align cards at the top of the container */
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  min-width: 280px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s ease, transform 0.5s ease, border-left 0.5s ease;
  border-left: 6px solid ${(props) => props.borderColor || "#1890ff"};

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    border-left: 6px solid ${(props) => props.hoverBorderColor || "#1837ff"};
  }

  .ant-card-body {
    padding: 24px;
  }

  @media (max-width: 1200px) {
    max-width: 500px;
  }

  @media (max-width: 992px) {
    max-width: 450px;
  }

  @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 576px) {
    max-width: 350px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/admin/home/companySettings");
  };
  const handleStorageLink = () => {
    navigate("/admin/home/storage");
  };
  const handleBlogLink = () => {
    navigate("/admin/home/blogmanage");
  };
  const handleNotesLink = () => {
    navigate("/admin/home/notemaker");
  };
  const handleEventsLink = () => {
    navigate("/admin/home/schedule");
  };
  const handleSettingsLink = () => {
    navigate("/admin/home/settings");
  };

  return (
    <CardContainer>
      <StyledCard
        hoverable
        onClick={handleCardClick}
        borderColor="#FF5733"
        hoverBorderColor="#FF2E00"
      >
        <Meta
          title="Companies Table"
          description="for Company management"
          style={{ color: "#333" }}
        />
      </StyledCard>

      <StyledCard
        hoverable
        onClick={handleStorageLink}
        borderColor="#33B5E5"
        hoverBorderColor="#0099CC"
      >
        <Meta
          title="Store Data"
          description="Store your Data in here"
          style={{ color: "#333" }}
        />
      </StyledCard>

      <StyledCard
        hoverable
        onClick={handleBlogLink}
        borderColor="#4CAF50"
        hoverBorderColor="#388E3C"
      >
        <Meta
          title="Blog Manager"
          description="Manage your Blogs here"
          style={{ color: "#333" }}
        />
      </StyledCard>

      <StyledCard
        hoverable
        onClick={handleSettingsLink}
        borderColor="#b5179e"
        hoverBorderColor="#f72585"
      >
        <Meta
          title={
            <span>
              <SettingOutlined style={{ marginRight: 6 }} />
              Settings
            </span>
          }
          description="Manage all your settings in here"
          style={{ color: "#333" }}
        />
      </StyledCard>

      <StyledCard hoverable borderColor="#673AB7" hoverBorderColor="#512DA8">
        <Meta
          title={
            <Title level={4} style={{ margin: 0 }}>
              Schedule Events
            </Title>
          }
          description="Manage your schedule and tasks here"
          style={{ color: "#333" }}
        />
        <ButtonContainer>
          <Button
            type="default"
            icon={<FileTextOutlined />}
            onClick={handleNotesLink}
          >
            Tasks Lister
          </Button>
          <Button
            type="default"
            icon={<CalendarOutlined />}
            onClick={handleEventsLink}
          >
            Schedule Events
          </Button>
        </ButtonContainer>
      </StyledCard>
    </CardContainer>
  );
};

export default Dashboard;
