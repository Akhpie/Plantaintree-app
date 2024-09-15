import React, { useState, useEffect } from "react";
import { UpOutlined } from "@ant-design/icons";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            ...styles.buttonContainer,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.button}>
            <UpOutlined style={styles.icon} />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  buttonContainer: {
    position: "fixed",
    bottom: "50px",
    right: "30px",
    zIndex: 1000,
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  button: {
    backgroundColor: "#f4a261",
    color: "#fff",
    padding: "15px",
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: "14px",
  },
  buttonHover: {
    transform: "scale(1.1)",
  },
};

export default BackToTop;
