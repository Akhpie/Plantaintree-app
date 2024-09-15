import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Table } from "antd";
import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledArrow = styled(ArrowRightOutlined)`
  font-size: 18px;
  color: #1890ff;
  transition: color 0.3s ease, transform 0.3s ease;
  transform: rotate(-45deg);
  background-color: rgb(226, 226, 226);
  border-radius: 50%;
  padding: 10px;
  &:hover {
    color: #40a9ff;
    transform: rotate(0deg) scale(1.2);
  }
`;
const LogoImage = styled.img`
  width: ${(props) => (props.isAdmin ? "80px" : "120px")};
  height: ${(props) => (props.isAdmin ? "80px" : "120px")};
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    font-size: 20px;
    background-color: transparent;
    color: #333;
    text-align: center;
  }
  .ant-table-tbody > tr {
    // background-color: #cad6fa !important;
    height: 180px;
    text-align: center;
  }
  .ant-table-cell {
    font-size: 18px;
    font-family: "Moderustic", sans-serif;
    background-color: transparent;
  }
`;

const getUniqueFilters = (data, key) => {
  return [...new Set(data.map((item) => item[key]))]
    .filter((item) => item)
    .map((value) => ({ text: value, value }));
};

const CompanyTable = ({ companies, showAdminColumns = true }) => {
  const columns = [
    showAdminColumns && {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    showAdminColumns && {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <div>{record.name}</div>,
    },
    {
      title: "Company",
      dataIndex: "logoSrc",
      key: "logoSrc",
      render: (text, record) => (
        <LogoImage src={record.logoSrc} isAdmin={showAdminColumns} />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: getUniqueFilters(companies, "category"),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      filters: getUniqueFilters(companies, "country"),
      onFilter: (value, record) => record.country === value,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: getUniqueFilters(companies, "status"),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Website",
      dataIndex: "websiteUrl",
      key: "websiteUrl",
      render: (text, record) => (
        <a href={record.websiteUrl} target="_blank" rel="noreferrer">
          <StyledArrow />
        </a>
      ),
    },
    showAdminColumns && {
      title: "Operations",
      key: "operations",
      render: (text, record) => (
        <div className="flex justify-center gap-x-4">
          <Link to={`/admin/home/showCompanies/${record._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/admin/home/editCompanies/${record._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>
          <Link to={`/admin/home/companyDelete/${record._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600" />
          </Link>
        </div>
      ),
    },
  ].filter(Boolean);

  const dataSource = companies.map((company, index) => ({
    ...company,
    index: index + 1,
  }));

  return (
    <StyledTable
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 10 }}
      responsive
      scroll={{ x: true }}
    />
  );
};

export default CompanyTable;
