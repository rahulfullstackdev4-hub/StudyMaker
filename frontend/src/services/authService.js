import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api/auth"; // backend base URL


export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data; 
};


export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data; 
};
