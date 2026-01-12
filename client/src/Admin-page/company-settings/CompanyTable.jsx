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
  background-color: transparent !important;
  padding: 0 !important;
`;
const StyledTable = styled(Table)`
  /* Light Theme - Wrapper styling */
  .ant-table-wrapper {
    border-radius: 2.5rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  /* Light Theme - Table styling */
  .ant-table {
    background-color: transparent;
    border-radius: 2rem;
  }

  /* Light Theme - Head styling */
  .ant-table-thead > tr > th {
    font-size: 14px;
    background: rgba(59, 130, 246, 0.15) !important;
    color: #1f2937 !important;
    text-align: center;
    font-weight: 700;
    padding: 16px 12px;
    box-shadow: none;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
    text-transform: capitalize;
    letter-spacing: 0.3px;
    font-family: "Urbanist", sans-serif;
  }

  /* Light Theme - Body rows */
  .ant-table-tbody > tr {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    height: auto;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .ant-table-tbody > tr:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
  }

  .ant-table-tbody > tr > td {
    color: #374151;
    font-weight: 500;
    font-size: 14px;
    padding: 14px 12px;
    font-family: "Urbanist", sans-serif;
    vertical-align: middle;
  }

  .ant-table-tbody > tr:hover > td {
    color: #1f2937;
    font-weight: 600;
  }

  /* Cell styling */
  .ant-table-cell {
    font-size: 14px;
    font-family: "Urbanist", sans-serif;
    background-color: transparent !important;
    border-color: transparent;
  }

  /* Logo cell styling - remove white background */
  .ant-table-tbody > tr > td img {
    background-color: transparent !important;
  }

  /* Pagination styling */
  .ant-pagination-item-active {
    background: rgba(59, 130, 246, 0.3) !important;
    border-color: rgba(59, 130, 246, 0.5) !important;
  }

  .ant-pagination-item-active a {
    color: #3b82f6 !important;
  }

  /* ==========================================
     FILTER DROPDOWN STYLING
     ========================================== */
  
  /* Filter dropdown wrapper */
  .ant-table-filter-dropdown {
    background: rgba(255, 255, 255, 0.95) !important;
    border-radius: 12px !important;
    padding: 16px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
    border: 1px solid rgba(59, 130, 246, 0.2) !important;
    min-width: 280px !important;
    backdrop-filter: blur(10px);
  }

  /* Filter dropdown items container */
  .ant-table-filter-dropdown > div:first-child {
    max-height: 320px !important;
    overflow-y: auto !important;
    padding-right: 4px !important;
  }

  /* Scrollbar styling */
  .ant-table-filter-dropdown > div:first-child::-webkit-scrollbar {
    width: 10px !important;
  }

  .ant-table-filter-dropdown > div:first-child::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 10px !important;
  }

  .ant-table-filter-dropdown > div:first-child::-webkit-scrollbar-thumb {
    background: rgba(100, 181, 246, 0.3) !important;
    border-radius: 10px !important;
    
    &:hover {
      background: rgba(100, 181, 246, 0.5) !important;
    }
  }

  /* Filter checkbox wrapper - individual boxes */
  .ant-checkbox-wrapper {
    display: flex !important;
    align-items: center !important;
    padding: 12px 10px !important;
    margin: 6px 0 !important;
    border: 1px solid rgba(59, 130, 246, 0.2) !important;
    border-radius: 6px !important;
    background-color: rgba(59, 130, 246, 0.05) !important;
    transition: all 0.3s ease !important;
    width: 100% !important;
    cursor: pointer !important;
    box-sizing: border-box !important;
    
    &:hover {
      background-color: rgba(59, 130, 246, 0.1) !important;
      border-color: rgba(59, 130, 246, 0.4) !important;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1) !important;
    }
  }

  /* Filter checkbox styling - larger size */
  .ant-checkbox {
    width: 16px !important;
    height: 16px !important;
    margin-right: 10px !important;
    flex-shrink: 0 !important;
  }

  .ant-checkbox-inner {
    width: 16px !important;
    height: 16px !important;
    border: 2px solid rgba(59, 130, 246, 0.4) !important;
    background-color: #ffffff !important;
    border-radius: 3px !important;
    transition: all 0.3s ease !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: #3b82f6 !important;
    border-color: #3b82f6 !important;
  }

  .ant-checkbox-inner::after {
    width: 4px !important;
    height: 8px !important;
    top: 2px !important;
    left: 4px !important;
    border-color: #ffffff !important;
  }

  /* Checkbox label text styling */
  .ant-checkbox-wrapper > span:last-child {
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #374151 !important;
    line-height: 1.4 !important;
  }

  /* Filter buttons wrapper */
  .ant-table-filter-dropdown > div:last-child {
    display: flex !important;
    gap: 8px !important;
    margin-top: 12px !important;
    justify-content: flex-end !important;
  }

  /* Filter button styling */
  .ant-btn-primary {
    background: #3b82f6 !important;
    border: none !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    transition: all 0.3s ease !important;
    padding: 6px 16px !important;
    font-size: 13px !important;
    height: 32px !important;
    min-width: 60px !important;
    
    &:hover {
      background: #2563eb !important;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .ant-btn-default {
    border: 1px solid rgba(59, 130, 246, 0.3) !important;
    background-color: transparent !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    color: #6b7280 !important;
    transition: all 0.3s ease !important;
    padding: 6px 16px !important;
    font-size: 13px !important;
    height: 32px !important;
    min-width: 60px !important;
    
    &:hover {
      border-color: rgba(59, 130, 246, 0.6) !important;
      background-color: rgba(59, 130, 246, 0.05) !important;
      color: #374151 !important;
    }
  }

  /* Filter trigger icon */
  .ant-table-filter-trigger {
    transition: all 0.3s ease !important;
    cursor: pointer !important;
    
    &:hover {
      color: #3b82f6 !important;
      transform: scale(1.15);
    }
  }

  /* ==========================================
     DARK THEME SUPPORT
     ========================================== */
  html.dark &,
  body.dark &,
  #root.dark & {
    .ant-table-wrapper {
      border-radius: 2.5rem;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(30px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .ant-table {
      background-color: transparent;
      border-radius: 2rem;
    }

    .ant-table-thead > tr > th {
      font-size: 14px;
      background: rgba(59, 130, 246, 0.2) !important;
      color: #e5e7eb !important;
      text-align: center;
      font-weight: 700;
      padding: 16px 12px;
      box-shadow: none;
      border-bottom: 1px solid rgba(59, 130, 246, 0.3) !important;
      text-transform: capitalize;
      letter-spacing: 0.3px;
      font-family: "Urbanist", sans-serif;
    }

    .ant-table-tbody > tr {
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
      height: auto;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .ant-table-tbody > tr:hover {
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
    }

    .ant-table-tbody > tr > td {
      color: #d1d5db;
      font-weight: 500;
      font-size: 14px;
      padding: 14px 12px;
      font-family: "Urbanist", sans-serif;
      vertical-align: middle;
    }

    .ant-table-tbody > tr:hover > td {
      color: #f3f4f6;
      font-weight: 600;
    }

    .ant-table-cell {
      font-size: 14px;
      font-family: "Urbanist", sans-serif;
      background-color: transparent !important;
      border-color: transparent;
    }

    /* Logo cell styling - remove white background */
    .ant-table-tbody > tr > td img {
      background-color: transparent !important;
    }

    .ant-pagination-item-active {
      background: rgba(59, 130, 246, 0.3) !important;
      border-color: rgba(59, 130, 246, 0.5) !important;
    }

    .ant-pagination-item-active a {
      color: #60a5fa !important;
    }

    /* Dark theme filter dropdown styling */
    .ant-table-filter-dropdown {
      background: rgba(30, 41, 59, 0.95) !important;
      border-radius: 12px !important;
      padding: 16px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
      border: 1px solid rgba(100, 181, 246, 0.2) !important;
      min-width: 280px !important;
      backdrop-filter: blur(10px);
    }

    /* Dark theme scrollbar */
    .ant-table-filter-dropdown > div:first-child {
      max-height: 320px !important;
      overflow-y: auto !important;
      padding-right: 4px !important;
    }

    .ant-table-filter-dropdown > div:first-child::-webkit-scrollbar {
      width: 10px !important;
    }

    .ant-table-filter-dropdown > div:first-child::-webkit-scrollbar-track {
      background: transparent !important;
      border-radius: 10px !important;
    }

    .ant-table-filter-dropdown > div:first-child::-webkit-scrollbar-thumb {
      background: rgba(100, 181, 246, 0.5) !important;
      border-radius: 10px !important;
      
      &:hover {
        background: rgba(100, 181, 246, 0.8) !important;
      }
    }

    .ant-checkbox-wrapper {
      display: flex !important;
      align-items: center !important;
      padding: 12px 10px !important;
      margin: 6px 0 !important;
      border: 1px solid rgba(100, 181, 246, 0.2) !important;
      border-radius: 6px !important;
      background-color: rgba(59, 130, 246, 0.05) !important;
      transition: all 0.3s ease !important;
      width: 100% !important;
      cursor: pointer !important;
      box-sizing: border-box !important;
      color: #e5e7eb !important;
      
      &:hover {
        background-color: rgba(59, 130, 246, 0.1) !important;
        border-color: rgba(100, 181, 246, 0.4) !important;
        box-shadow: 0 2px 8px rgba(100, 181, 246, 0.15) !important;
      }
    }

    .ant-checkbox {
      width: 16px !important;
      height: 16px !important;
      margin-right: 10px !important;
      flex-shrink: 0 !important;
    }

    .ant-checkbox-inner {
      width: 16px !important;
      height: 16px !important;
      border: 2px solid rgba(100, 181, 246, 0.4) !important;
      background-color: transparent !important;
      border-radius: 3px !important;
      transition: all 0.3s ease !important;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background: #3b82f6 !important;
      border-color: #3b82f6 !important;
    }

    .ant-checkbox-inner::after {
      width: 4px !important;
      height: 8px !important;
      top: 2px !important;
      left: 4px !important;
      border-color: #ffffff !important;
    }

    /* Dark theme checkbox label */
    .ant-checkbox-wrapper > span:last-child {
      font-size: 13px !important;
      font-weight: 500 !important;
      color: #d1d5db !important;
      line-height: 1.4 !important;
    }

    /* Dark theme buttons wrapper */
    .ant-table-filter-dropdown > div:last-child {
      display: flex !important;
      gap: 8px !important;
      margin-top: 12px !important;
      justify-content: flex-end !important;
    }

    .ant-btn-primary {
      background: #3b82f6 !important;
      border: none !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
      color: #ffffff !important;
      transition: all 0.3s ease !important;
      padding: 6px 16px !important;
      font-size: 13px !important;
      height: 32px !important;
      min-width: 60px !important;
      
      &:hover {
        background: #2563eb !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .ant-btn-default {
      border: 1px solid rgba(100, 181, 246, 0.3) !important;
      background-color: transparent !important;
      border-radius: 6px !important;
      font-weight: 600 !important;
      color: #9ca3af !important;
      transition: all 0.3s ease !important;
      padding: 6px 16px !important;
      font-size: 13px !important;
      height: 32px !important;
      min-width: 60px !important;
      
      &:hover {
        border-color: rgba(100, 181, 246, 0.6) !important;
        background-color: rgba(59, 130, 246, 0.1) !important;
        color: #e5e7eb !important;
      }
    }

    .ant-table-filter-trigger {
      color: #60a5fa !important;
      transition: all 0.3s ease !important;
      cursor: pointer !important;
      
      &:hover {
        transform: scale(1.15);
        color: #93c5fd !important;
      }
    }

    /* Dark theme filter dropdown text color */
    .ant-table-filter-dropdown > div {
      color: #e5e7eb;
    }

    .ant-table-filter-dropdown .ant-radio {
      color: #e5e7eb;
    }

    .ant-table-filter-dropdown .ant-checkbox {
      color: #e5e7eb;
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .ant-table-wrapper {
      border-radius: 1.5rem;
    }

    .ant-table-thead > tr > th {
      font-size: 12px;
      padding: 12px 8px;
    }

    .ant-table-tbody > tr > td {
      font-size: 12px;
      padding: 10px 8px;
    }

    html.dark &,
    body.dark &,
    #root.dark & {
      .ant-table-wrapper {
        border-radius: 1.5rem;
      }

      .ant-table-thead > tr > th {
        font-size: 12px;
        padding: 12px 8px;
      }

      .ant-table-tbody > tr > td {
        font-size: 12px;
        padding: 10px 8px;
      }
    }
  }
`;

const getUniqueFilters = (data, key) => {
  return [...new Set(data.map((item) => {
    // Trim whitespace and normalize the value
    const value = item[key];
    return value ? String(value).trim() : '';
  }))]
    .filter((item) => item) // Remove empty strings
    .sort() // Sort alphabetically for better organization
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

  const sortedCompanies = [...companies].sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA; // Descending order (latest first)
  });

  const dataSource = sortedCompanies.map((company, index) => ({
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
