// frontend/lib/axios.ts
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5005"; // make sure backend is running here

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // for cookies
  timeout: 3000, // 3s timeout - faster failure when backend not running
});

// Response interceptor to handle auth errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (message?.includes("Header malformed") || message?.includes("Unauthorized")) {
      // Return a clean response that can be handled by the caller
      return Promise.resolve({
        data: null,
        status: 401,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; // ✅ Add default export