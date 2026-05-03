import axios from "axios";
import { logout } from "../utils/auth";

export const refreshToken = async () => {
  const refreshTokenValue = localStorage.getItem("refresh_token");

  if (!refreshTokenValue) {
    logout();
    return null;
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/auth/refresh`,
      {
        refresh_token: refreshTokenValue,
      },
    );

    const newToken = res.data.data.access_token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch {
    logout();
    return null;
  }
};
