import axios from "axios";
import { logout } from "../utils/auth";
import { API_BASE_URL } from "./config";

export const refreshToken = async () => {
  const refreshTokenValue = localStorage.getItem("refresh_token");

  if (!refreshTokenValue) {
    logout();
    return null;
  }

  try {
    const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refresh_token: refreshTokenValue,
    });

    const newToken = res.data.data.access_token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch {
    logout();
    return null;
  }
};
