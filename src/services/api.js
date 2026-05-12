import axios from "axios";

import { logout } from "../utils/auth";
import { API_BASE_URL } from "./config";

const API = axios.create({
  baseURL: API_BASE_URL,
});

let refreshPromise = null;

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
    const originalRequest = error.config ?? {};
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          const refresh_token = localStorage.getItem("refresh_token");

          refreshPromise = axios
            .post(`${API_BASE_URL}/auth/refresh`, { refresh_token })
            .then((res) => {
              const accessToken = res.data?.data?.access_token ?? res.data?.access_token;
              localStorage.setItem("token", accessToken);
              return accessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const accessToken = await refreshPromise;
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return API(originalRequest);
      } catch {
        logout();
      }
    }

    return Promise.reject({
      ...error,
      status,
      message:
        error.response?.data?.message ||
        error.message ||
        "Une erreur API est survenue.",
    });
  },
);

export default API;
