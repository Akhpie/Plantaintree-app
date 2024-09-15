import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Meta } = Card;

const CardContainer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allow cards to wrap onto the next line */
  gap: 16px; /* Space between cards */
  align-items: flex-start; /* Align cards at the top of the container */
`;

const StyledCard = styled(Card)`
  width: 300px;
  cursor: pointer;
  background: #ffffff; /* White background for a clean look */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s ease, transform 0.5s ease, border-left 0.5s ease;
  border-left: 6px solid #1890ff;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    border-left: 6px solid #1837ff;
  }

  .ant-card-body {
    padding: 24px;
  }
  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    max-width: 400px; /* Set a maximum width for better control */
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/admin/home/companySettings");
  };

  return (
    <CardContainer>
      <StyledCard hoverable onClick={handleCardClick}>
        <Meta
          title="Companies Table"
          description="Manage and view your company's data efficiently."
          style={{ color: "#333" }}
        />
      </StyledCard>
    </CardContainer>
  );
};

export default Dashboard;
