import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const decodeToken = () => {
  const token = getToken();

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  const decoded = decodeToken();

  if (!decoded) {
    localStorage.removeItem("token");
    return false;
  }

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
};

export const getUserRole = () => decodeToken()?.role ?? null;

export const hasRole = (...roles) => {
  const role = getUserRole();
  return Boolean(role && roles.includes(role));
};

export const isAdmin = () => hasRole("admin");

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("tenantId");
  window.location.href = "/login";
};
