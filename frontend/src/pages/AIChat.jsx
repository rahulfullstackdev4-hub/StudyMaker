import React, { useState, useContext, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIChatBox from "../components/AIChatBox";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { notifyError } from "../utils/notify";
import { MessageSquare, Bot, User } from "lucide-react";

const AIChat = () => {
  const { getClerkToken } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Minimal geometric background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lines = [];
    const lineCount = 15;

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        speed: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.1 + 0.02
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach(line => {
        line.y1 += line.speed;
        line.y2 += line.speed;

        if (line.y1 > canvas.height) line.y1 = 0;
        if (line.y2 > canvas.height) line.y2 = 0;
        if (line.y1 < 0) line.y1 = canvas.height;
        if (line.y2 < 0) line.y2 = canvas.height;

        ctx.strokeStyle = `rgba(158, 207, 212, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (prompt, fileData = null) => {
    if (!prompt.trim() && !fileData) return;

    const userMessage = { type: "user", text: prompt, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const token = await getClerkToken();
      const payload = { prompt };
      if (fileData) {
        payload.fileUrl = fileData.fileUrl;
        payload.extractedText = fileData.extractedText;
        payload.fileType = fileData.fileType;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api"}/ai/chat`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const aiMessage = { type: "ai", text: res.data.response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      notifyError("Failed to get AI response. Please try again.");
      const errorMessage = { type: "ai", text: "Sorry, I encountered an error. Please try again.", timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-black overflow-x-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Subtle gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(158,207,212,0.08) 0%, transparent 60%)`
        }}
      />

      <Sidebar />
      
      <div className="flex-1 p-8 z-20">
        <Navbar />
        
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-16 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-[#9ECFD4]"></div>
              <div>
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Assistant</p>
                <h1 className="text-5xl font-bold text-white tracking-tight">AI Chat</h1>
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-8 max-w-2xl">
              Get instant help with your studies. Ask questions, clarify concepts, and accelerate your learning
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-black border border-white/10 overflow-hidden hover:border-[#9ECFD4] transition-all duration-300">
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center mx-auto mb-6">
                      <Bot className="w-10 h-10 text-[#9ECFD4]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Start a Conversation</h3>
                    <p className="text-gray-400 max-w-md">
                      Ask questions about your studies, get help with concepts, or request explanations
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "ai" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[#9ECFD4]" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-2xl ${
                      msg.type === "user"
                        ? "bg-[#9ECFD4]/10 border border-[#9ECFD4]"
                        : "bg-black border border-white/20"
                    }`}
                  >
                    <div className="p-6">
                      <p className={`leading-relaxed whitespace-pre-wrap ${
                        msg.type === "user" ? "text-white" : "text-gray-300"
                      }`}>
                        {msg.text}
                      </p>
                      <p className="text-xs mt-3 text-gray-500">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {msg.type === "user" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#9ECFD4]" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#9ECFD4]" />
                  </div>
                  <div className="bg-black border border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-[#9ECFD4] animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#9ECFD4] animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#9ECFD4] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-[#9ECFD4]">AI is thinking</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-6 bg-black">
              <AIChatBox onSend={handleSend} disabled={isLoading} />
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-black border border-white/10 p-6 hover:border-[#9ECFD4]/30 transition-all">
              <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-[#9ECFD4]" />
              </div>
              <h4 className="text-white font-semibold mb-2 text-sm">Ask Questions</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Get instant answers to your study questions
              </p>
            </div>
            
            <div className="bg-black border border-white/10 p-6 hover:border-[#9ECFD4]/30 transition-all">
              <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5 text-[#9ECFD4]" />
              </div>
              <h4 className="text-white font-semibold mb-2 text-sm">AI Powered</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Advanced AI understands context and provides accurate help
              </p>
            </div>
            
            <div className="bg-black border border-white/10 p-6 hover:border-[#9ECFD4]/30 transition-all">
              <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 text-[#9ECFD4]" />
              </div>
              <h4 className="text-white font-semibold mb-2 text-sm">24/7 Available</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Study help whenever you need it, day or night
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(158, 207, 212, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(158, 207, 212, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AIChat;