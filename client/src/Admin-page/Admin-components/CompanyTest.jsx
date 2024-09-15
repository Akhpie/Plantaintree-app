import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlusCircleTwoTone } from "@ant-design/icons";
import CompanyTable from "../company-settings/CompanyTable";
import Spinner from "../../components/Spinner";

// * TO SHOW ALL THE COMPANIES ( GET METHOD )
const CompanyTest = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/companies")
      .then((response) => {
        setCompanies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Companies List</h1>
        <Link to="/admin/home/companyAdd">
          <PlusCircleTwoTone
            style={{ fontSize: "36px", color: "#0369a1" }}
            className="animated-icon"
          />
        </Link>
      </div>
      {loading ? <Spinner /> : <CompanyTable companies={companies} />}
    </div>
  );
};

export default CompanyTest;
