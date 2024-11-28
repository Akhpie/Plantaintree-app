// import React, { useState, useEffect } from "react";
// import { Form, Button, message } from "antd";
// import { useNavigate } from "react-router-dom";
// import logo from "../pages/images/plantain-icon-main.png";
// import "../styles/AdminLogin.css";
// import { initGoogleAuth } from "./ini/AuthService";
// import googleIcon from "../pages/images/google-icon.png";

// const AdminLogin = ({ setIsAuthenticated }) => {
//   const [loading, setLoading] = useState(false);
//   const [gapiInitialized, setGapiInitialized] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     initGoogleAuth()
//       .then(() => {
//         setGapiInitialized(true);
//       })
//       .catch((error) => {
//         console.error("Error initializing Google API:", error);
//         message.error("Failed to load Google API.");
//       });
//   }, []);

//   const handleGoogleLogin = () => {
//     setLoading(true);
//     initGoogleAuth()
//       .then((authResponse) => {
//         console.log("Access Token:", authResponse.access_token);
//         console.log("ID Token:", authResponse.id_token);
//         setIsAuthenticated(true);
//         navigate("/admin/home/dashboard");
//       })
//       .catch((error) => {
//         console.error("Google Sign-In failed:", error);
//         message.error("Google Sign-In failed!");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <div className="login-header">
//         <img
//           src={logo}
//           alt="Company Logo"
//           className="admin-logo text-center w-50"
//         />
//       </div>
//       <div className="admin-login-container">
//         <h2 className="text-center mb-6 text-2xl text-gray-800 bg-teal-200 p-2 rounded-md shadow-md">
//           Admin Login
//         </h2>
//         <Form
//           name="admin_login"
//           className="login-form"
//           initialValues={{ remember: true }}
//         >
//           {/* //! Google Login Button */}
//           <Button
//             type="default"
//             className="google-login-button"
//             onClick={handleGoogleLogin}
//           >
//             <img src={googleIcon} alt="Google Logo" className="google-logo" />
//             Sign in with Google
//           </Button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default AdminLogin;

// import React, { useState, useEffect } from "react";
// import { Form, Button, message } from "antd";
// import { useNavigate } from "react-router-dom";
// import logo from "../pages/images/plantain-icon-main.png";
// import "../styles/AdminLogin.css";
// import { initGoogleAuth } from "./ini/AuthService";
// import googleIcon from "../pages/images/google-icon.png";
// import { jwtDecode } from "jwt-decode";

// const AdminLogin = ({ setIsAuthenticated }) => {
//   const [loading, setLoading] = useState(false);
//   const [gapiInitialized, setGapiInitialized] = useState(false);
//   const navigate = useNavigate();

//   // List of allowed emails (can be moved to the backend for better security)
//   const allowedUsers = [
//     "akhilpie3@gmail.com",
//     "akhya1819@gmail.com",
//     "akhilpickle19@gmail.com",
//   ];

//   useEffect(() => {
//     initGoogleAuth()
//       .then(() => {
//         setGapiInitialized(true);
//       })
//       .catch((error) => {
//         console.error("Error initializing Google API:", error);
//         message.error("Failed to load Google API.");
//       });
//   }, []);

//   const handleGoogleLogin = () => {
//     setLoading(true);
//     initGoogleAuth()
//       .then((authResponse) => {
//         console.log("Google Auth Response:", authResponse);

//         const decodedToken = jwtDecode(authResponse.id_token);
//         const userEmail = decodedToken?.email;

//         console.log("User Email:", userEmail);

//         if (userEmail && allowedUsers.includes(userEmail.toLowerCase())) {
//           setIsAuthenticated(true);
//           navigate("/admin/home/dashboard");
//         } else {
//           message.error("Unauthorized access. Your account is not allowed.");
//           setIsAuthenticated(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Google Sign-In failed:", error);
//         message.error("Google Sign-In failed!");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <div className="login-header">
//         <img
//           src={logo}
//           alt="Company Logo"
//           className="admin-logo text-center w-50"
//         />
//       </div>
//       <div className="admin-login-container">
//         <h2 className="text-center mb-6 text-2xl text-gray-800 bg-teal-200 p-2 rounded-md shadow-md">
//           Admin Login
//         </h2>
//         <Form
//           name="admin_login"
//           className="login-form"
//           initialValues={{ remember: true }}
//         >
//           {/* //! Google Login Button */}
//           <Button
//             type="default"
//             className="google-login-button"
//             onClick={handleGoogleLogin}
//           >
//             <img src={googleIcon} alt="Google Logo" className="google-logo" />
//             Sign in with Google
//           </Button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default AdminLogin;

import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../pages/images/plantain-icon-main.png";
import "../styles/AdminLogin.css";
import { initGoogleAuth } from "./ini/AuthService";
import googleIcon from "../pages/images/google-icon.png";
import { jwtDecode } from "jwt-decode";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // List of allowed emails (can be moved to the backend for better security)
  const allowedUsers = [
    "akhilpie3@gmail.com",
    "akhya1819@gmail.com",
    "akhilpickle19@gmail.com",
    "gopala.jasti@gmail.com",
    "gopijasti1@gmail.com",
  ];

  useEffect(() => {
    initGoogleAuth().catch((error) => {
      console.error("Error initializing Google API:", error);
      message.error("Failed to load Google API.");
    });
  }, []);

  const handleGoogleLogin = () => {
    setLoading(true);
    initGoogleAuth()
      .then((authResponse) => {
        const decodedToken = jwtDecode(authResponse.id_token);
        const userEmail = decodedToken?.email;

        if (userEmail && allowedUsers.includes(userEmail.toLowerCase())) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          navigate("/admin/dashboard");
        } else {
          message.error("Unauthorized access. Your account is not allowed.");
          setIsAuthenticated(false);
          localStorage.setItem("isAuthenticated", "false");
        }
      })
      .catch((error) => {
        console.error("Google Sign-In failed:", error);
        message.error("Google Sign-In failed!");
      })
      .finally(() => {
        setLoading(false);
      });
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
        >
          {/* Google Login Button */}
          <Button
            type="default"
            className="google-login-button"
            onClick={handleGoogleLogin}
            loading={loading} // Disable button while loading
          >
            <img src={googleIcon} alt="Google Logo" className="google-logo" />
            Sign in with Google
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AdminLogin;
