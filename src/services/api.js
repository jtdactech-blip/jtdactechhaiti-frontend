import axios from "axios";
import { logout } from "../utils/auth";
import { refreshToken } from "./tokenService";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      }
    }

    logout();
    return Promise.reject(error);
  },
);

export default API;
