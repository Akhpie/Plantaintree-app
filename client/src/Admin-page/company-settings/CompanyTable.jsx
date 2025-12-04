import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Table } from "antd";
import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledArrow = styled(ArrowRightOutlined)`
  font-size: 20px;
  color: #ffffff !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate(-45deg);
  background: linear-gradient(135deg, #0f3460 0%, #1a5490 100%) !important;
  border-radius: 50%;
  padding: 12px !important;
  border: 2px solid #ffffff !important;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  width: 50px !important;
  height: 50px !important;
  box-sizing: border-box;
  min-width: 50px;
  box-shadow: 0 4px 12px rgba(15, 52, 96, 0.2);
  
  &:hover {
    color: #ffffff !important;
    transform: rotate(0deg) scale(1.2);
    background: linear-gradient(135deg, #1a5490 0%, #0f3460 100%) !important;
    box-shadow: 0 8px 24px rgba(15, 52, 96, 0.4) !important;
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
  /* Wrapper styling */
  .ant-table-wrapper {
    border-radius: 16px;
    overflow: hidden;
    border: 2px solid #e8eef7;
    background: linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%);
    box-shadow: 0 12px 32px rgba(15, 52, 96, 0.12);
  }

  /* Table styling */
  .ant-table {
    background-color: transparent;
    border-radius: 12px;
  }

  /* Head styling */
  .ant-table-thead > tr > th {
    font-size: 16px;
    background: linear-gradient(135deg, #0f3460 0%, #1a5490 100%) !important;
    color: #ffffff !important;
    text-align: center;
    font-weight: 700;
    padding: 20px 16px;
    box-shadow: 0 4px 12px rgba(15, 52, 96, 0.15);
    border-bottom: 2px solid #1a5490 !important;
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }

  /* Body rows */
  .ant-table-tbody > tr {
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
    border-bottom: 2px solid #e0ebff;
    text-align: center;
    height: auto;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .ant-table-tbody > tr:hover {
    background: linear-gradient(135deg, #f0f5ff 0%, #e8f0ff 100%);
    box-shadow: 0 4px 16px rgba(100, 181, 246, 0.15);
  }

  .ant-table-tbody > tr > td {
    color: #1a2332;
    font-weight: 500;
    font-size: 15px;
    padding: 18px 16px;
    font-family: "Moderustic", sans-serif;
    vertical-align: middle;
  }

  .ant-table-tbody > tr:hover > td {
    color: #0f3460;
    font-weight: 600;
  }

  /* Cell styling */
  .ant-table-cell {
    font-size: 15px;
    font-family: "Moderustic", sans-serif;
    background-color: transparent;
    border-color: transparent;
  }

  /* Pagination styling */
  .ant-pagination-item-active {
    background: linear-gradient(135deg, #0f3460 0%, #1a5490 100%) !important;
    border-color: #0f3460 !important;
  }

  .ant-pagination-item-active a {
    color: #ffffff !important;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .ant-table-wrapper {
      border-radius: 12px;
    }

    .ant-table-thead > tr > th {
      font-size: 13px;
      padding: 14px 10px;
    }

    .ant-table-tbody > tr > td {
      font-size: 13px;
      padding: 12px 10px;
    }
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
          <Link to={`/admin/showCompanies/${record._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/admin/editCompanies/${record._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600" />
          </Link>
          <Link to={`/admin/companyDelete/${record._id}`}>
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
