import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";
import styled from "styled-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import "../styles/BlogCards.css";
import CustomSidebar from "../components/Sidebar";

const { Meta } = Card;

const StyledArrow = styled(ArrowRightOutlined)`
  font-size: 18px;
  color: #1890ff;
  transition: color 0.3s ease, transform 0.3s ease;
  transform: rotate(-45deg);
  background-color: rgb(226, 226, 226);
  border-radius: 50%;
  padding: 10px;
  margintop: 10px;
  &:hover {
    color: #40a9ff;
    transform: rotate(0deg) scale(1.2);
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  color: #333;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding-top: 50px;
  }
`;

const HeroTextContainer = styled.div`
  max-width: 600px;
  margin-bottom: 20px;

  h1 {
    font-size: 110px;
    margin: 0;
    font-family: --font-family-stylish-heading;
  }

  p {
    font-size: 1.5rem;
    font-family: "Moderustic", sans-serif;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/blogger/v3/blogs/6762505380898687212/posts?key=AIzaSyCV_KhRs_fJjx5LsjQdWB9c3K6VDyG4pPk"
        );
        setPosts(response.data.items);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const getImageFromContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : "https://via.placeholder.com/300";
  };

  return (
    <>
      <CustomSidebar />
      <HeroSection>
        <HeroTextContainer>
          <p className="hero-small-text">COMPANIES</p>
          <h1 className="hero-title">
            Our <span className="span-text">Blogs</span>
          </h1>
          <p className="hero-caption">
            Latest news and expert advice from our investment ventures.
          </p>
        </HeroTextContainer>
      </HeroSection>
      <div className="ml-5">
        <Row>
          {posts.map((post) => (
            <Col xs={24} sm={12} lg={8} key={post.id}>
              <Card
                hoverable
                onClick={() => window.open(post.url, "_blank")}
                className="blog-card ml-5 mt-2"
                cover={
                  <img
                    alt={post.title}
                    src={getImageFromContent(post.content)}
                  />
                }
              >
                <Meta title={post.title} description={post.published} />
                <br />
                <StyledArrow />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Blogs;
