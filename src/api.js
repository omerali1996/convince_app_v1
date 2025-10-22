import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
});

export default api;
