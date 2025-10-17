import React, { useState } from "react";

const AIChatBox = ({ onSend }) => {
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (prompt.trim() !== "") {
      onSend(prompt);
      setPrompt("");
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
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
};

export default AIChatBox;
