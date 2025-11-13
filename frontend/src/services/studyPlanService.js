import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api/plan";


export const getStudyPlan = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};


export const addStudyPlan = async (data, token) => {
  const res = await axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
