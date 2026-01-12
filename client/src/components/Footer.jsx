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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <footer className="footer cta">
      <style jsx>{`
        :global(.contact-modal) {
          position: fixed !important;
        }
        :global(.contact-modal .ant-modal) {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }
        :global(.contact-modal .ant-modal-content) {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
        }
        :global(.dark .contact-modal .ant-modal-content) {
          background: rgba(26, 35, 50, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        :global(.contact-modal .ant-modal-header) {
          background: transparent !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
          padding: 20px 24px 16px !important;
        }
        :global(.dark .contact-modal .ant-modal-header) {
          border-bottom-color: rgba(255, 255, 255, 0.1) !important;
        }
        :global(.contact-modal .ant-modal-title) {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #1a2332 !important;
        }
        :global(.dark .contact-modal .ant-modal-title) {
          color: #e0e8f0 !important;
        }
        :global(.contact-modal .ant-modal-body) {
          padding: 24px !important;
        }
        :global(.contact-modal .ant-modal-close) {
          color: #666 !important;
        }
        :global(.dark .contact-modal .ant-modal-close) {
          color: #999 !important;
        }
      `}</style>
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
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
          centered
          wrapClassName="contact-modal"
          maskStyle={{
            backdropFilter: "blur(5px)",
            background: "rgba(0, 0, 0, 0.45)",
          }}
        >
          <ContactForm />
        </Modal>
      </div>
    </footer>
  );
};

export default Footer;
