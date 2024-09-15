import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Form, Input, Button, Card, notification } from "antd";
import { MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

const ContactForm = () => {
  const formRef = useRef();
  const nativeFormRef = useRef();

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

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
          openNotification(
            "success",
            "Email Sent",
            "Your message has been sent successfully!"
          );
          formRef.current.resetFields();
        },
        (error) => {
          openNotification(
            "error",
            "Failed to Send",
            `Your message could not be sent: ${error.text}`
          );
        }
      );
  };

  const handleFinish = (values) => {
    nativeFormRef.current.user_name.value = values.user_name;
    nativeFormRef.current.user_email.value = values.user_email;
    nativeFormRef.current.message.value = values.message;
    sendEmail();
  };

  return (
    <Card
      // title="Contact Us"
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Form ref={formRef} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="user_name"
          rules={[{ required: true, message: "Please input your name!" }]}
          hasFeedback
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="user_email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
          hasFeedback
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
          hasFeedback
        >
          <Input.TextArea placeholder="Enter your message" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ background: "#1890ff", borderColor: "#1890ff" }}
          >
            Send Message
          </Button>
        </Form.Item>
      </Form>

      {/* Hidden Native Form */}
      <form ref={nativeFormRef} style={{ display: "none" }}>
        <input type="text" name="user_name" />
        <input type="email" name="user_email" />
        <textarea name="message" />
      </form>
    </Card>
  );
};

export default ContactForm;
