import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Card, Button, Typography, Space } from "antd";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";

const { Title, Text } = Typography;

//* TO CREATE A NEW COMPANY ( POST Method )
const DeleteCompany = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCompany = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/companies/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company has been Deleted!", { variant: "success" });
        navigate("/admin/home/testCompanies");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while deleting!", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <Title level={2} className="my-4">
        Delete Company
      </Title>
      {loading && <Spinner />}
      <Card
        className="delete-company-card"
        bordered={false}
        style={{ Maxwidth: 800, margin: "0 auto" }}
      >
        <Title level={3} className="text-center">
          Are you sure you want to delete this Company?
        </Title>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Button
            type="primary"
            danger
            size="large"
            onClick={handleDeleteCompany}
            loading={loading}
            style={{ width: "100%" }}
          >
            Yes, Delete
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => navigate("/admin/home/testCompanies")}
            style={{ width: "100%" }}
          >
            Cancel
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default DeleteCompany;
