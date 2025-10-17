import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

// Send a prompt to AI assistant
export const sendAIChat = async (prompt, token) => {
  const res = await axios.post(`${API_URL}/chat`, { prompt }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data; // expected: { response: "AI response text" }
};

// Summarize text or uploaded file
export const summarizeContent = async (contentData, token) => {
  const res = await axios.post(`${API_URL}/summarize`, contentData, { headers: { Authorization: `Bearer ${token}` } });
  return res.data; // expected: { summary: "AI generated summary" }
};
