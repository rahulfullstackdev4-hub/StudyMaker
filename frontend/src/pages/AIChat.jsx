import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIChatBox from "../components/AIChatBox";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const AIChat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const handleSend = async (prompt) => {
    setMessages([...messages, { type: "user", text: prompt }]);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { prompt },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessages((prev) => [...prev, { type: "ai", text: res.data.response }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { type: "ai", text: "Error fetching AI response" }]);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4">AI Study Assistant</h2>
        <div className="mb-4 max-h-[400px] overflow-y-auto border p-2 rounded">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 my-1 rounded ${
                msg.type === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <AIChatBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default AIChat;
