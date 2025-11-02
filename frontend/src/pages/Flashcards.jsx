import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Flashcard from "../components/Flashcard";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { notifySuccess, notifyError } from "../utils/notify";
import { Plus, X, CreditCard, Trash2 } from "lucide-react";

const Flashcards = () => {
  const { user, getClerkToken } = useContext(AuthContext);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: "", cards: [{ question: "", answer: "" }] });
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
    const fetchFlashcards = async () => {
      try {
        const token = await getClerkToken();
        const res = await axios.get("http://localhost:5000/api/flashcards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlashcardSets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchFlashcards();
  }, [user, getClerkToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getClerkToken();
      const res = await axios.post("http://localhost:5000/api/flashcards", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcardSets([...flashcardSets, res.data]);
      setFormData({ subject: "", cards: [{ question: "", answer: "" }] });
      setShowForm(false);
      notifySuccess("Flashcard set added successfully!");
    } catch (err) {
      notifyError("Failed to add flashcard set");
      console.error(err);
    }
  };

  const addCard = () => {
    setFormData({
      ...formData,
      cards: [...formData.cards, { question: "", answer: "" }]
    });
  };

  const updateCard = (index, field, value) => {
    const newCards = [...formData.cards];
    newCards[index][field] = value;
    setFormData({ ...formData, cards: newCards });
  };

  const removeCard = (index) => {
    if (formData.cards.length > 1) {
      const newCards = formData.cards.filter((_, i) => i !== index);
      setFormData({ ...formData, cards: newCards });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getClerkToken();
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcardSets(flashcardSets.filter(set => set._id !== id));
      notifySuccess("Flashcard set deleted successfully!");
    } catch (err) {
      notifyError("Failed to delete flashcard set");
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
        
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-16 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-[#9ECFD4]"></div>
              <div>
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Memory</p>
                <h1 className="text-5xl font-bold text-white tracking-tight">Flashcards</h1>
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-8 max-w-2xl">
              Create and review flashcards to reinforce your learning and improve retention
            </p>
          </div>

          {/* Create Set Button */}
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
                  Create New Set
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
                    <CreditCard className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Create New Flashcard Set</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Subject Input */}
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all"
                      placeholder="Enter subject name"
                      required
                    />
                  </div>

                  {/* Cards Input */}
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Cards
                    </label>
                    <div className="space-y-3">
                      {formData.cards.map((card, index) => (
                        <div key={index} className="border border-white/10 p-4 hover:border-[#9ECFD4]/30 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[#9ECFD4] text-xs font-medium uppercase tracking-wider">
                              Card {index + 1}
                            </span>
                            {formData.cards.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeCard(index)}
                                className="w-8 h-8 bg-transparent border border-white/20 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Question"
                              value={card.question}
                              onChange={(e) => updateCard(index, "question", e.target.value)}
                              className="w-full px-4 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all text-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Answer"
                              value={card.answer}
                              onChange={(e) => updateCard(index, "answer", e.target.value)}
                              className="w-full px-4 py-3 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all text-sm"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={addCard}
                      className="mt-4 px-6 py-3 bg-transparent border border-[#9ECFD4]/30 text-[#9ECFD4] hover:border-[#9ECFD4] transition-all duration-300 text-sm font-medium tracking-wider uppercase flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Card
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-5 bg-transparent border border-[#9ECFD4] text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 font-medium tracking-wider uppercase flex items-center justify-center gap-3"
                  >
                    <CreditCard className="w-5 h-5" />
                    Create Flashcard Set
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Flashcard Sets List */}
          {flashcardSets.length > 0 ? (
            <div className="space-y-8">
              {flashcardSets.map((set) => (
                <div key={set._id} className="bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-[#9ECFD4]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{set.subject}</h3>
                          <p className="text-gray-400 text-sm">{set.cards.length} cards</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(set._id)}
                        className="w-10 h-10 bg-transparent border border-white/20 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {set.cards.map((card, index) => (
                        <Flashcard key={index} question={card.question} answer={card.answer} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !showForm && (
            <div className="bg-black border border-white/10 p-20 text-center">
              <CreditCard className="w-16 h-16 text-[#9ECFD4]/30 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No flashcard sets yet</p>
              <p className="text-gray-500 text-sm">Create your first flashcard set to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;