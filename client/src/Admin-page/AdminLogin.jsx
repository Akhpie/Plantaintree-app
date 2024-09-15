// import React, { useState } from "react";
// import { Form, Input, Button, Checkbox, message } from "antd";
// import {
//   UserOutlined,
//   LockOutlined,
//   EyeInvisibleOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import "../styles/AdminLogin.css";

// const AdminLogin = ({ setIsAuthenticated }) => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onFinish = (values) => {
//     const { username, password } = values;

//     const validUsername = "admin123@gmail.com";
//     const validPassword = "Admin@123";

//     setLoading(true);

//     if (username === validUsername && password === validPassword) {
//       setTimeout(() => {
//         setLoading(false);
//         setIsAuthenticated(true);
//         navigate("/admin/home/dashboard");
//       }, 1000);
//     } else {
//       setLoading(false);
//       message.error("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <Form
//         name="admin_login"
//         className="login-form"
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//       >
//         <h2>Admin Login</h2>
//         <Form.Item
//           name="username"
//           rules={[{ required: true, message: "Please input your Username!" }]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input.Password
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             placeholder="Password"
//             iconRender={(visible) =>
//               visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//             }
//           />
//         </Form.Item>
//         <Form.Item>
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//             loading={loading}
//           >
//             Log in
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";
import logo from "../pages/images/plantain-icon-main.png";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;

    const validUsername = "admin123@gmail.com";
    const validPassword = "Admin@123";

    setLoading(true);

    if (username === validUsername && password === validPassword) {
      setTimeout(() => {
        setLoading(false);
        setIsAuthenticated(true);
        navigate("/admin/home/dashboard");
      }, 1000);
    } else {
      setLoading(false);
      message.error("Invalid username or password!");
    }
  };

  return (
    <>
      <div className="login-header">
        <img
          src={logo}
          alt="Company Logo"
          className="admin-logo text-center w-50"
        />
      </div>
      <div className="admin-login-container">
        <h2 className="text-center mb-6 text-2xl text-gray-800 bg-teal-200 p-2 rounded-md shadow-md">
          Admin Login
        </h2>
        <Form
          name="admin_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AdminLogin;
