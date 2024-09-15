// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Spin } from "antd";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Team from "./pages/Team";
// import Contact from "./pages/Contact";
// import Companies from "./pages/Companies";
// import AdminLogin from "./Admin-page/AdminLogin";
// import AdminHome from "./Admin-page/AdminHome";
// import Dashboard from "./Admin-page/Admin-Dashboard/Dashboard";
// import Users from "./Admin-page/Admin-components/Users";
// import Settings from "./Admin-page/Admin-components/Settings";
// import CreateCompany from "./Admin-page/Admin-components/CreateCompany";
// import CompanySettings from "./Admin-page/Admin-Dashboard/CompanySettings";
// import DeleteCompany from "./Admin-page/Admin-components/DeleteCompany";
// import ShowCompany from "./Admin-page/Admin-components/ShowCompany";
// import EditCompanies from "./Admin-page/Admin-components/EditCompanies";
// import CompanyTest from "./Admin-page/Admin-components/CompanyTest";
// import BackToTop from "./components/BackToTop";
// import PrivateRoute from "./Admin-page/Admin-protect/PrivateRoute";

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [isContentLoaded, setIsContentLoaded] = useState(false);

//   // Mocking an authentication state (replace with real authentication later)
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const preloaderTimer = setTimeout(() => {
//       if (!isContentLoaded) {
//         setLoading(true);
//       }
//     }, 1000);

//     const loadContent = setTimeout(() => {
//       setIsContentLoaded(true);
//       setLoading(false);
//       clearTimeout(preloaderTimer);
//     }, 100);

//     const handleNetworkChange = () => {
//       if (!navigator.onLine) {
//         setLoading(true);
//       } else {
//         setLoading(false);
//       }
//     };

//     window.addEventListener("offline", handleNetworkChange);
//     window.addEventListener("online", handleNetworkChange);

//     return () => {
//       clearTimeout(preloaderTimer);
//       clearTimeout(loadContent);
//       window.removeEventListener("offline", handleNetworkChange);
//       window.removeEventListener("online", handleNetworkChange);
//     };
//   }, [isContentLoaded]);

//   return (
//     <>
//       {loading ? (
//         <div className="preloader-container">
//           <Spin size="large" tip="Loading..." />
//         </div>
//       ) : (
//         <>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/team" element={<Team />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/companies" element={<Companies />} />
//             <Route
//               path="/admin"
//               element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
//             />
//             {/* Protect admin routes */}
//             <Route
//               path="/admin/home/*"
//               element={
//                 <PrivateRoute isAuthenticated={isAuthenticated}>
//                   <AdminHome />
//                 </PrivateRoute>
//               }
//             >
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="users" element={<Users />} />
//               <Route path="settings" element={<Settings />} />
//               <Route path="companySettings" element={<CompanySettings />} />
//               <Route path="companyAdd" element={<CreateCompany />} />
//               <Route path="testCompanies" element={<CompanyTest />} />
//               <Route path="companyDelete/:id" element={<DeleteCompany />} />
//               <Route path="showCompanies/:id" element={<ShowCompany />} />
//               <Route path="editCompanies/:id" element={<EditCompanies />} />
//             </Route>
//           </Routes>
//         </>
//       )}
//       <BackToTop />
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Companies from "./pages/Companies";
import AdminLogin from "./Admin-page/AdminLogin";
import AdminHome from "./Admin-page/AdminHome";
import Dashboard from "./Admin-page/Admin-Dashboard/Dashboard";
import Users from "./Admin-page/Admin-components/Users";
import Settings from "./Admin-page/Admin-components/Settings";
import CreateCompany from "./Admin-page/Admin-components/CreateCompany";
import CompanySettings from "./Admin-page/Admin-Dashboard/CompanySettings";
import DeleteCompany from "./Admin-page/Admin-components/DeleteCompany";
import ShowCompany from "./Admin-page/Admin-components/ShowCompany";
import EditCompanies from "./Admin-page/Admin-components/EditCompanies";
import CompanyTest from "./Admin-page/Admin-components/CompanyTest";
import BackToTop from "./components/BackToTop";
import PrivateRoute from "./Admin-page/Admin-protect/PrivateRoute";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for authentication status on load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");

    // Preloader logic
    const preloaderTimer = setTimeout(() => {
      if (!isContentLoaded) {
        setLoading(true);
      }
    }, 1000);

    const loadContent = setTimeout(() => {
      setIsContentLoaded(true);
      setLoading(false);
      clearTimeout(preloaderTimer);
    }, 100);

    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };

    window.addEventListener("offline", handleNetworkChange);
    window.addEventListener("online", handleNetworkChange);

    return () => {
      clearTimeout(preloaderTimer);
      clearTimeout(loadContent);
      window.removeEventListener("offline", handleNetworkChange);
      window.removeEventListener("online", handleNetworkChange);
    };
  }, [isContentLoaded]);

  return (
    <>
      {loading ? (
        <div className="preloader-container">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/companies" element={<Companies />} />
            <Route
              path="/admin"
              element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
            />
            {/* Protect admin routes */}
            <Route
              path="/admin/home/*"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminHome />
                </PrivateRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="companySettings" element={<CompanySettings />} />
              <Route path="companyAdd" element={<CreateCompany />} />
              <Route path="testCompanies" element={<CompanyTest />} />
              <Route path="companyDelete/:id" element={<DeleteCompany />} />
              <Route path="showCompanies/:id" element={<ShowCompany />} />
              <Route path="editCompanies/:id" element={<EditCompanies />} />
            </Route>
          </Routes>
        </>
      )}
      <BackToTop />
    </>
  );
};

export default App;