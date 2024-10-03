import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Input, Button, Typography, Spin, Row, Col } from "antd";
import BackButton from "../../components/BackButton";
import { useSnackbar } from "notistack";
import "../styles/Adminstyles.css";

const { Title } = Typography;

const EditCompanies = () => {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoSrc, setlogoSrc] = useState("");
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`https://plantaintree-app-server.vercel.app/companies/${id}`)
      .then((response) => {
        setCompanyName(response.data.name);
        setCategory(response.data.category);
        setCountry(response.data.country);
        setYear(response.data.year);
        setStatus(response.data.status);
        setWebsiteUrl(response.data.websiteUrl);
        setlogoSrc(response.data.logoSrc);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditCompany = () => {
    const data = {
      name: companyName,
      category,
      country,
      year,
      status,
      websiteUrl,
      logoSrc,
    };
    setLoading(true);
    axios
      .put(`https://plantaintree-app-server.vercel.app/companies/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company has been updated!", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred!", { variant: "error" });
        console.log(error);
      });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="p-4">
      <BackButton />
      <Title level={2} className="my-4" style={{ textAlign: "center" }}>
        Edit Company
      </Title>
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={16} xl={12}>
          <Card
            title="Edit Company Details"
            bordered={false}
            className="card-custom"
            style={{ width: "100%" }}
          >
            <div className="company-form">
              <div className="my-4">
                <span className="form-label">Company Name</span>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="my-4">
                <span className="form-label">Category</span>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="my-4">
                <span className="form-label">Country</span>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="my-4">
                <span className="form-label">Year</span>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="my-4">
                <span className="form-label">Website URL</span>
                <Input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>
              <div className="my-4">
                <span className="form-label">Logo Src</span>
                <Input
                  value={logoSrc}
                  onChange={(e) => setlogoSrc(e.target.value)}
                />
              </div>
              <div className="my-4">
                <span className="form-label">Status</span>
                <Input
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <Button
                type="primary"
                className="submit-button"
                onClick={handleEditCompany}
              >
                Save
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditCompanies;
