// frontend/src/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./utils/auth";

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const userRole = getUserRole();

    if (userRole !== role) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;