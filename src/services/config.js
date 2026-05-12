const stripTrailingSlash = (value) => value.replace(/\/+$/, "");

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const normalizedApiUrl = stripTrailingSlash(rawApiUrl);

export const API_BASE_URL = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

export const SOCKET_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_SOCKET_URL ||
    API_BASE_URL.replace(/\/api$/, ""),
);
