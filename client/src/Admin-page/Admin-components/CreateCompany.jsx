import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Spin, Row, Col } from "antd";
import BackButton from "../../components/BackButton";
import { useSnackbar } from "notistack";
import "../styles/Adminstyles.css";

//* TO CREATE A NEW COMPANY ( POST Method )
const CreateCompany = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveCompany = (values) => {
    setLoading(true);
    axios
      .post("https://plantaintree-app-server.vercel.app/companies", values)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company created successfully", { variant: "success" });
        navigate("/admin/home/testCompanies");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred!");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Company</h1>

      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            title="Company Details"
            bordered
            style={{
              margin: "0 auto",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {loading ? <Spin /> : ""}
            <Form layout="vertical" onFinish={handleSaveCompany}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter the company name" },
                ]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>

              <Form.Item
                label="Logo Source"
                name="logoSrc"
                rules={[
                  { required: true, message: "Please enter the logo source" },
                ]}
              >
                <Input placeholder="Enter logo source URL" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter the description" },
                ]}
              >
                <Input.TextArea placeholder="Enter description" rows={4} />
              </Form.Item>

              <Form.Item
                label="Website URL"
                name="websiteUrl"
                rules={[
                  { required: true, message: "Please enter the website URL" },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
              >
                <Input placeholder="Enter website URL" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please enter the category" },
                ]}
              >
                <Input placeholder="Enter category" />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please enter the country" },
                ]}
              >
                <Input placeholder="Enter country" />
              </Form.Item>

              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: "Please enter the year" }]}
              >
                <Input type="number" placeholder="Enter year" />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please enter the status" }]}
              >
                <Input placeholder="Enter status" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={loading}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateCompany;
