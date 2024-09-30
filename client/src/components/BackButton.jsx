import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  background-color: #0284c7;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0369a1;
    transform: translateX(-5px);
  }

  &:active {
    transform: translateX(-2px);
  }
`;

const BackButton = ({ destination = "/admin/testCompanies" }) => {
  return (
    <div className="flex">
      <StyledLink to={destination}>
        <BsArrowLeft className="text-2xl" />
      </StyledLink>
    </div>
  );
};

export default BackButton;
