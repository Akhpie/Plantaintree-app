import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Typography, Spin, Row, Col } from "antd";
import BackButton from "../../components/BackButton";
import "../styles/Adminstyles.css";

const { Title, Text } = Typography;

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

//* TO SHOW INDIVIDUAL COMPANY DETAILS (GET METHOD [ID])
const ShowCompany = () => {
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://plantaintree-app-server.vercel.app/${id}`)
      .then((response) => {
        setCompany(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <BackButton />
      <Title level={2} className="my-4 text-center">
        Show Company
      </Title>
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={16} xl={12}>
          <Card
            title="Company Details"
            bordered={false}
            style={{ width: "100%" }}
            className="card-header-custom"
          >
            <div className="company-details">
              <div className="my-4">
                <Text strong>ID:</Text> <Text>{company._id}</Text>
              </div>
              <div className="my-4">
                <Text strong>Name:</Text> <Text>{company.name}</Text>
              </div>
              <div className="my-4">
                <Text strong>Logo Source:</Text> <Text>{company.logoSrc}</Text>
              </div>
              <div className="my-4">
                <Text strong>Description:</Text>{" "}
                <Text>{company.description}</Text>
              </div>
              <div className="my-4">
                <Text strong>Website URL:</Text>{" "}
                <Text>{company.websiteUrl}</Text>
              </div>
              <div className="my-4">
                <Text strong>Country:</Text> <Text>{company.country}</Text>
              </div>
              <div className="my-4">
                <Text strong>Last Update Time:</Text>{" "}
                <Text>{formatDate(company.updatedAt)}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShowCompany;
