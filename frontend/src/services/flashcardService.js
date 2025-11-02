import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api/flashcards";

// Get all flashcards
export const getFlashcards = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

// Generate flashcards from text/content
export const generateFlashcards = async (data, token) => {
  const res = await axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
