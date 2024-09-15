import React, { useState, useMemo, useEffect } from "react";
import { Table, Select, Space } from "antd";
import styled from "styled-components";
import companiesData from "../data/companiesData.json";
import { ArrowRightOutlined } from "@ant-design/icons";
import "../styles/CompaniesTable.css";
import CustomSidebar from "../components/Sidebar";
import CompanyTable from "../Admin-page/company-settings/CompanyTable";
import axios from "axios";
import Footer from "../components/Footer";

const { Option } = Select;

const StyledTableContainer = styled.div`
  // padding: 30px;
  font-family: "Roboto", sans-serif;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  color: #333;

  @media (max-width: 768px) {
    // flex-direction: row;
    justify-content: space-between;
    padding-top: 50px;
  }
`;
const HeroTextContainer = styled.div`
  max-width: 600px;
  margin-bottom: 20px;

  h1 {
    font-size: 110px;
    margin: 0;
    font-family: --font-family-stylish-heading;
  }

  p {
    font-size: 1.5rem;
    // margin: 10px 0;
    font-family: "Moderustic", sans-serif;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const HeroImage = styled.div`
  // margin-top: 20px;

  img {
    width: 100%;
    max-width: 900px;
    height: auto;
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    font-size: 18px;
    background-color: transparent;
    color: #333;
  }
  .ant-table-tbody > tr {
    // background-color: #cad6fa !important;
    height: 250px;
  }
  .ant-table-cell {
    font-size: 16px;
    font-family: "Moderustic", sans-serif;
    background-color: transparent;
  }
`;

const TableContainer = styled.div`
  background-color: #cad6fa;
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://plantaintree-app-server.vercel.app/")
      .then((response) => {
        setCompanies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const [filters, setFilters] = useState({
    category: "Finance",
    country: "India",
    year: "2024",
    status: "Active",
  });

  return (
    <>
      <CustomSidebar />
      <StyledTableContainer>
        <HeroSection>
          <HeroTextContainer>
            <p className="hero-small-text">COMPANIES</p>
            <h1 className="hero-title">
              Our <span className="span-text">Portfolio</span>
            </h1>
            <p className="hero-caption">
              We are proud to be the early investors in these startups.
            </p>
          </HeroTextContainer>
        </HeroSection>
        <hr />
        <CompanyTable companies={companies} showAdminColumns={false} />
      </StyledTableContainer>
      <div className="team-footer">
        <p className="footer-text-team">
          Each of these companies represents a unique opportunity and a
          promising venture that aligns with our commitment to supporting strong
          founding teams and innovative solutions. We are excited to see their
          continued growth and impact in their respective industries.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default CompaniesTable;
