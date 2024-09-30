import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Modal, Button, Result } from "antd";
import { SendOutlined } from "@ant-design/icons";

const ContactForm = () => {
  const formRef = useRef();
  const nativeFormRef = useRef();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_lohq0i6",
        "template_6spgsog",
        nativeFormRef.current,
        "dwfUUMMXly0EXYLPP"
      )
      .then(
        () => {
          setIsSuccessModalVisible(true);
          formRef.current.reset();
        },
        (error) => {
          setErrorMessage(error.text);
          setIsErrorModalVisible(true);
        }
      );
  };

  const handleFinish = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    nativeFormRef.current.user_name.value = formData.get("user_name");
    nativeFormRef.current.user_email.value = formData.get("user_email");
    nativeFormRef.current.message.value = formData.get("message");
    sendEmail();
  };

  // Handlers to close the modals
  const handleSuccessOk = () => {
    setIsSuccessModalVisible(false);
  };

  const handleErrorOk = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <div className="form-container">
      <form ref={formRef} onSubmit={handleFinish} className="contact-form">
        <div className="form-group">
          <label htmlFor="user_name">Name</label>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Send Message <SendOutlined />
        </button>
      </form>

      {/* Hidden Native Form */}
      <form ref={nativeFormRef} style={{ display: "none" }}>
        <input type="text" name="user_name" />
        <input type="email" name="user_email" />
        <textarea name="message" />
      </form>

      {/* Success Modal with Icon */}
      <Modal
        open={isSuccessModalVisible}
        onOk={handleSuccessOk}
        onCancel={handleSuccessOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleSuccessOk}>
            OK
          </Button>,
        ]}
      >
        <Result
          status="success"
          title="Your message has been sent successfully!"
          subTitle="We will get back to you shortly."
        />
      </Modal>

      {/* Error Modal */}
      <Modal
        title="Error"
        open={isErrorModalVisible}
        onOk={handleErrorOk}
        onCancel={handleErrorOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleErrorOk}>
            OK
          </Button>,
        ]}
      >
        <p>Failed to send: {errorMessage}</p>
      </Modal>
    </div>
  );
};

export default ContactForm;
