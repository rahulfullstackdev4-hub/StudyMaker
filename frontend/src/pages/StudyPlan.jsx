import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StudyPlanCard from "../components/StudyPlanCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { notifySuccess, notifyError } from "../utils/notify";
import { Plus, X, BookOpen, Target } from "lucide-react";

const StudyPlan = () => {
  const { user } = useContext(AuthContext);
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: "", topics: [""] });
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
    if (user) {
      const fetchPlans = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api"}/plan`, {
            headers: { Authorization: `Bearer ${await user.getToken()}` },
          });
          setPlans(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchPlans();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api"}/plan`, formData, {
        headers: { Authorization: `Bearer ${await user.getToken()}` },
      });
      setPlans([...plans, res.data]);
      setFormData({ subject: "", topics: [""] });
      setShowForm(false);
      notifySuccess("Study plan added successfully!");
    } catch (err) {
      notifyError("Failed to add study plan");
      console.error(err);
    }
  };

  const addTopic = () => {
    setFormData({
      ...formData,
      topics: [...formData.topics, ""]
    });
  };

  const updateTopic = (index, value) => {
    const newTopics = [...formData.topics];
    newTopics[index] = value;
    setFormData({ ...formData, topics: newTopics });
  };

  const removeTopic = (index) => {
    if (formData.topics.length > 1) {
      const newTopics = formData.topics.filter((_, i) => i !== index);
      setFormData({ ...formData, topics: newTopics });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api"}/plan/${id}`, {
        headers: { Authorization: `Bearer ${await user.getToken()}` },
      });
      setPlans(plans.filter(plan => plan._id !== id));
      notifySuccess("Study plan deleted successfully!");
    } catch (err) {
      notifyError("Failed to delete study plan");
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
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Planning</p>
                <h1 className="text-5xl font-bold text-white tracking-tight">Study Plans</h1>
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-8 max-w-2xl">
              Create and manage your personalized study plans to achieve your academic goals
            </p>
          </div>

          {/* Create Plan Button */}
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
                  Create New Plan
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
                    <BookOpen className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Create New Study Plan</h3>
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

                  {/* Topics Input */}
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Topics
                    </label>
                    <div className="space-y-3">
                      {formData.topics.map((topic, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            placeholder={`Topic ${index + 1}`}
                            value={topic}
                            onChange={(e) => updateTopic(index, e.target.value)}
                            className="flex-1 px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all"
                            required
                          />
                          {formData.topics.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTopic(index)}
                              className="w-12 h-12 bg-transparent border border-white/20 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      type="button"
                      onClick={addTopic}
                      className="mt-4 px-6 py-3 bg-transparent border border-[#9ECFD4]/30 text-[#9ECFD4] hover:border-[#9ECFD4] transition-all duration-300 text-sm font-medium tracking-wider uppercase flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Topic
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-5 bg-transparent border border-[#9ECFD4] text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 font-medium tracking-wider uppercase flex items-center justify-center gap-3"
                  >
                    <Target className="w-5 h-5" />
                    Create Study Plan
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Plans List */}
          {plans.length > 0 ? (
            <div className="space-y-6">
              {plans.map((plan) => (
                <StudyPlanCard
                  key={plan._id}
                  subject={plan.subject}
                  topics={plan.topics}
                  completed={plan.completed}
                  total={plan.total}
                  onDelete={() => handleDelete(plan._id)}
                />
              ))}
            </div>
          ) : !showForm && (
            <div className="bg-black border border-white/10 p-20 text-center">
              <BookOpen className="w-16 h-16 text-[#9ECFD4]/30 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No study plans yet</p>
              <p className="text-gray-500 text-sm">Create your first study plan to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;