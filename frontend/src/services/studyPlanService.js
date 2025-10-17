import axios from "axios";

const API_URL = "http://localhost:5000/api/plan";

// Get study plan
export const getStudyPlan = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

// Add subject/topic
export const addStudyPlan = async (data, token) => {
  const res = await axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
