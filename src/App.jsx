// frontend/src/App.jsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
import { isAuthenticated, logout } from "./utils/auth";

function App() {

  // 🔐 auto session check (bank style)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>

        {/* AUTO LOGIN */}
        <Route
          path="/"
          element={
            isAuthenticated()
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;