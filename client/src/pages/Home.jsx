import React from "react";
import { Row, Col, Button, Card } from "antd";
import "../styles/Home.css";
import companyData from "../data/companyData.json";
import { ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import CustomSidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 576px)" });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <CustomSidebar />
      <div className="home-container">
        <section className="hero">
          <Row justify="left" align="middle" className="hero-row">
            <Col className="hero-text">
              <h1 className="hero-heading" style={{ marginBottom: "30px" }}>
                Welcome to Our <span className="span-class">Venture</span>
              </h1>
              <p className="hero-caption">
                {/* Empowering innovation and success through cutting-edge
                solutions. */}
              </p>
            </Col>
          </Row>
        </section>
        {/* <hr /> */}

        <section className="features">
          <h2 className="hero-heading text-center">Early investors in</h2>
          <Row gutter={[16, 16]} justify="center">
            {companyData.map((company, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card bordered={false} className="feature-card">
                    <div className="logo-container">
                      <img
                        src={company.logoSrc}
                        alt={company.name}
                        className="company-logo"
                      />
                    </div>
                  </Card>
                </a>
              </Col>
            ))}
            {/* //!"All companies" card */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                bordered={false}
                className="feature-card all-companies-card"
              >
                <StyledLink to="/companies">
                  <div className="all-companies-content">
                    <h3 className="all-companies-text">All Companies</h3>
                    <Button
                      type="link"
                      icon={<ArrowRightOutlined />}
                      className="arrow-button"
                    />
                  </div>
                </StyledLink>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
