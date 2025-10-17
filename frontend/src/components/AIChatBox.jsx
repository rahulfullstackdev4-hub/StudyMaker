import React, { useState } from "react";
import axios from "axios";

const AIChatBox = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      const token = localStorage.getItem("token"); // ✅ Get JWT token stored at login

      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token
          },
        }
      );

      setResponse(res.data.response || "No response received");
      setPrompt("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error: Unauthorized or AI service issue.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-24 p-2 border rounded mb-2"
        placeholder="Ask your AI Study Assistant..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      {response && (
        <div className="mt-4 bg-white p-3 rounded shadow">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default AIChatBox;
