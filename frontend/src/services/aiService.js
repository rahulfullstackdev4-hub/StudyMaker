import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api/ai";


export const sendAIChat = async (prompt, token) => {
  const res = await axios.post(`${API_URL}/chat`, { prompt }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data; 
};


export const summarizeContent = async (contentData, token) => {
  const res = await axios.post(`${API_URL}/summarize`, contentData, { headers: { Authorization: `Bearer ${token}` } });
  return res.data; 
};


export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
