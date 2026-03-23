import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/transactions",
});

// 🔐 Attach token automatically to every request
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// APIs
export const getTransactions = () => API.get("/");
export const addTransaction = (data) => API.post("/", data);
export const deleteTransaction = (id) => API.delete(`/${id}`);
export const getSummary = () => API.get("/summary");

export default API;
