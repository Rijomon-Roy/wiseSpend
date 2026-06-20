import axios from "axios";

const API = "https://wisespend-backend.onrender.com";

export const registerUser = (data) =>
  axios.post(`${API}/register`, data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);
