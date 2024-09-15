import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component for protecting routes
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
