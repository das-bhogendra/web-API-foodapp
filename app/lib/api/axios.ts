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
  timeout: 10000, // 10s timeout
});

export default axiosInstance;