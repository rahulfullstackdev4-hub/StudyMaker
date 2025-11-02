import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NotesCard from "../components/NotesCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { notifySuccess, notifyError } from "../utils/notify";
import { Plus, X, FileText, Upload } from "lucide-react";

const Notes = () => {
  const { user, getClerkToken } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", summary: "", file: null });
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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = await getClerkToken();
        const res = await axios.get("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchNotes();
  }, [user, getClerkToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getClerkToken();
      const data = new FormData();
      data.append("title", formData.title);
      data.append("summary", formData.summary);
      if (formData.file) data.append("file", formData.file);

      const res = await axios.post("http://localhost:5000/api/notes", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes([...notes, res.data]);
      setFormData({ title: "", summary: "", file: null });
      setShowForm(false);
      notifySuccess("Note added successfully!");
    } catch (err) {
      notifyError("Failed to add note");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getClerkToken();
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(note => note._id !== id));
      notifySuccess("Note deleted successfully!");
    } catch (err) {
      notifyError("Failed to delete note");
      console.error(err);
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
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Documentation</p>
                <h1 className="text-5xl font-bold text-white tracking-tight">Notes</h1>
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-8 max-w-2xl">
              Organize and manage your study notes for better retention and review
            </p>
          </div>

          {/* Add Note Button */}
          <div className="mb-12">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`
                px-8 py-4 border transition-all duration-300 font-medium text-sm tracking-wider uppercase
                flex items-center gap-3
                ${showForm 
                  ? 'bg-transparent border-white/30 text-gray-400 hover:border-white/50' 
                  : 'bg-transparent border-[#9ECFD4] text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black'
                }
              `}
            >
              {showForm ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add New Note
                </>
              )}
            </button>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="bg-black border border-white/10 mb-12 hover:border-[#9ECFD4] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Create New Note</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Title Input */}
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all"
                      placeholder="Enter note title"
                      required
                    />
                  </div>

                  {/* Summary Textarea */}
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Summary
                    </label>
                    <textarea
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all resize-none"
                      rows="6"
                      placeholder="Enter note summary"
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Attachment (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                        className="w-full px-6 py-4 bg-black border border-white/20 text-white focus:outline-none focus:border-[#9ECFD4] transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-[#9ECFD4]/10 file:border file:border-[#9ECFD4]/20 file:text-[#9ECFD4] hover:file:bg-[#9ECFD4]/20"
                      />
                    </div>
                    {formData.file && (
                      <div className="mt-3 flex items-center gap-2 text-[#9ECFD4] text-sm">
                        <Upload className="w-4 h-4" />
                        <span>{formData.file.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-5 bg-transparent border border-[#9ECFD4] text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 font-medium tracking-wider uppercase flex items-center justify-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Notes List */}
          {notes.length > 0 ? (
            <div className="grid gap-6">
              {notes.map((note) => (
                <NotesCard
                  key={note._id}
                  title={note.title}
                  summary={note.summary}
                  fileUrl={note.fileUrl}
                  onDelete={() => handleDelete(note._id)}
                />
              ))}
            </div>
          ) : !showForm && (
            <div className="bg-black border border-white/10 p-20 text-center">
              <FileText className="w-16 h-16 text-[#9ECFD4]/30 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No notes yet</p>
              <p className="text-gray-500 text-sm">Create your first note to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;