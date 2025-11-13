import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Upload, Send, X } from "lucide-react";

const AIChatBox = ({ onSend, disabled = false, getToken }) => {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
    if ((!prompt.trim() && !selectedFile) || disabled) return;

    let fileData = null;

    if (selectedFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const token = getToken ? await getToken() : localStorage.getItem('clerk-token');
        const uploadRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api"}/ai/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          }
        );

        fileData = uploadRes.data;
      } catch (error) {
        console.error("File upload failed:", error);
        alert("File upload failed. Please try again.");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const enhancedPrompt = selectedFile
      ? `${prompt || "Please analyze this file and provide a detailed explanation, short summary, and workflow."} Please provide:\n1. Detailed Explanation\n2. Short Summary\n3. Workflow`
      : prompt;

    onSend(enhancedPrompt, fileData);
    setPrompt("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        alert("Only images and PDFs are allowed");
        return;
      }
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [prompt]);

  return (
    <div className="flex flex-col space-y-4">
      
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-transparent border border-[#9ECFD4]/30 text-[#9ECFD4] px-6 py-3 cursor-pointer hover:border-[#9ECFD4] hover:bg-[#9ECFD4]/5 transition-all duration-300 flex items-center gap-2 text-sm font-medium tracking-wider uppercase"
        >
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </label>
        {selectedFile && (
          <div className="flex items-center gap-3 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 px-4 py-2">
            <span className="text-sm text-white">{selectedFile.name}</span>
            <button
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      
      <div className="flex items-end gap-4">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled || isUploading}
            className="w-full resize-none bg-black border border-white/20 px-6 py-4 pr-16 focus:outline-none focus:border-[#9ECFD4] disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder-gray-500"
            placeholder={selectedFile ? "Add additional instructions (optional)..." : "Ask your AI Study Assistant..."}
            rows="1"
            style={{ minHeight: "60px", maxHeight: "150px" }}
          />
          <button
            onClick={handleSend}
            disabled={(!prompt.trim() && !selectedFile) || disabled || isUploading}
            className="absolute right-3 bottom-3 bg-transparent border border-[#9ECFD4] text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black p-3 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#9ECFD4]"
          >
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-[#9ECFD4] border-t-transparent animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

    
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>Max file size: 10MB</span>
      </div>
    </div>
  );
};

export default AIChatBox;