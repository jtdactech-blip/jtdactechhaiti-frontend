import { Navigate } from "react-router-dom";

import { getUserRole, isAuthenticated } from "../utils/auth";

export default function ProtectedRoute({ children, roles = [] }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length) {
    const role = getUserRole();
    if (!role || !roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
