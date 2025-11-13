import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api/notes";


export const getNotes = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const addNote = async (noteData, token) => {
  const res = await axios.post(API_URL, noteData, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};


export const uploadNoteFile = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
