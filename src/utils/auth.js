// src/utils/auth.js

import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    // si token ekspire
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

// 👉 AJOUT (safe upgrade)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("tenantId");
  window.location.href = "/login";
}; 

// 👉 extract role from token
export const getUserRole = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // admin | user
  } catch {
    return null;
  }
};

export const getRefreshToken = () => localStorage.getItem("refresh_token");
