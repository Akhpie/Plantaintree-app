import React from "react";
import "../styles/footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Modal } from "antd";
import ContactForm from "./ContactForm";
import { useState } from "react";

const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <footer className="footer cta">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} PlantainTree Ventures. All Rights
          Reserved.
        </p>
        <a className="contact-button" onClick={showModal}>
          Contact Us
        </a>
        <Modal
          title="Contact Us"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <ContactForm />
        </Modal>
      </div>
    </footer>
  );
};

export default Footer;
