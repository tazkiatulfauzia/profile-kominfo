import axios from "axios";

// Base URL API Laravel (tanpa trailing slash)
// Di Vite, gunakan import.meta.env, bukan process.env (process tidak tersedia di browser)
const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ||
  "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: tambahkan token jika ada
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("api_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("api_token");
      localStorage.removeItem("adminData");
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
