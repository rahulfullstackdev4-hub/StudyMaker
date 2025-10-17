import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // backend base URL

// Signup user
export const signup = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data; // expected: { token, user }
};

// Login user
export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data; // expected: { token, user }
};
