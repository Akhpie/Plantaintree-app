import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Typography,
  message,
  Popover,
  Input,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
  CopyTwoTone,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { initGoogleAuth } from "../ini/AuthService";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const { Title } = Typography;

const BlogSettings = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = await initGoogleAuth();
      setAccessToken(token.access_token);
      const response = await axios.get(
        "https://www.googleapis.com/blogger/v3/blogs/6762505380898687212/posts",
        {
          params: {
            key: "AIzaSyBrRds6ZSLt9nM9rHFR4c1T0EEQfuWN9d4",
          },
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      setPosts(response.data.items);
      setFilteredPosts(response.data.items); // Set filtered posts initially
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `https://www.googleapis.com/blogger/v3/blogs/6762505380898687212/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      message.success("Post deleted");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
      message.error("Failed to delete post");
    }
  };

  const handlePreview = (postUrl) => {
    window.open(postUrl, "_blank");
  };

  const handleEditPreview = (postId) => {
    const previewUrl = `https://www.blogger.com/u/1/blog/post/edit/6762505380898687212/${postId}`;
    window.open(previewUrl, "_blank");
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(
      () => message.success("Link copied to clipboard!"),
      (err) => message.error("Failed to copy link")
    );
  };

  const getShareUrl = (postUrl) => {
    return postUrl;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, post) => (
        <a onClick={() => handlePreview(post.url)}>{text}</a>
      ),
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
      responsive: ["sm"],
      render: (date) => formatDate(date),
    },
    {
      title: "Updated",
      dataIndex: "updated",
      key: "updated",
      responsive: ["sm"],
      render: (date) => formatDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, post) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditPreview(post.id)}
            style={{ marginRight: "10px" }}
          />
          <Popover
            content={
              <div style={{ display: "flex", alignItems: "center" }}>
                <FacebookShareButton url={getShareUrl(post.url)}>
                  <FacebookIcon
                    size={32}
                    round
                    style={{ marginRight: "10px" }}
                  />
                </FacebookShareButton>
                <TwitterShareButton url={getShareUrl(post.url)}>
                  <TwitterIcon
                    size={32}
                    round
                    style={{ marginRight: "10px" }}
                  />
                </TwitterShareButton>
                <WhatsappShareButton url={getShareUrl(post.url)}>
                  <WhatsappIcon
                    size={32}
                    round
                    style={{ marginRight: "10px" }}
                  />
                </WhatsappShareButton>
                <CopyTwoTone
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => copyToClipboard(post.url)}
                />
              </div>
            }
            title="Share Post"
            trigger="click"
          >
            <Button icon={<ShareAltOutlined />} />
          </Popover>
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={() => handleDelete(post.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} style={{ marginLeft: "10px" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Blog Settings</Title>
      <Input
        placeholder="Search posts..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "20px", marginLeft: "10px" }}
        onClick={() =>
          window.open(
            "https://www.blogger.com/u/1/blog/posts/6762505380898687212",
            "_blank"
          )
        }
      >
        Add New Blog
      </Button>
      <Button
        icon={<ReloadOutlined />}
        style={{ marginBottom: "20px", marginLeft: "10px" }}
        onClick={fetchPosts}
      >
        Refresh
      </Button>
      <Table
        columns={columns}
        dataSource={filteredPosts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    </div>
  );
};

export default BlogSettings;
