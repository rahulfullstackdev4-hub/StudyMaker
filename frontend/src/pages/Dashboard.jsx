import React, { useEffect, useState, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { TrendingUp, Target, Clock, BookOpen, FileText, Zap } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ goalsCompleted: 0, studyHours: 0, pendingFlashcards: 0 });
  const [recentNotes, setRecentNotes] = useState([]);
  const [quote, setQuote] = useState("");
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
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "https://studymaker.onrender.com/api"}/dashboard`, {
          headers: { Authorization: `Bearer ${await user.getToken()}` },
        });
        console.log("Dashboard data:", res.data);
        setStats(res.data.stats);
        setRecentNotes(res.data.recentNotes);
        setQuote(res.data.quote || "Keep pushing forward!");
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchDashboard();
  }, [user]);

  return (
    <div className="relative flex min-h-screen bg-black overflow-x-hidden    ">
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
        
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-16 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-[#9ECFD4]"></div>
              <div>
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Overview</p>
                <h1 className="text-5xl font-bold text-white tracking-tight">Dashboard</h1>
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-8 max-w-2xl">
              Monitor your progress and achievements in real-time
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Goals Card */}
            <div className="group relative bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9ECFD4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20">
                    <Target className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#9ECFD4]/50" />
                </div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Goals Completed</p>
                <p className="text-5xl font-bold text-white mb-1">{stats.goalsCompleted}</p>
                <p className="text-[#9ECFD4] text-xs">Keep going</p>
              </div>
            </div>

            {/* Study Hours Card */}
            <div className="group relative bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9ECFD4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20">
                    <Clock className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#9ECFD4]/50" />
                </div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Study Hours</p>
                <p className="text-5xl font-bold text-white mb-1">{stats.studyHours}</p>
                <p className="text-[#9ECFD4] text-xs">Time invested</p>
              </div>
            </div>

            {/* Flashcards Card */}
            <div className="group relative bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9ECFD4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20">
                    <BookOpen className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <Zap className="w-5 h-5 text-[#9ECFD4]/50" />
                </div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Pending Cards</p>
                <p className="text-5xl font-bold text-white mb-1">{stats.pendingFlashcards}</p>
                <p className="text-[#9ECFD4] text-xs">To review</p>
              </div>
            </div>
          </div>

          {/* Recent Notes Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-[#9ECFD4]"></div>
                <h2 className="text-3xl font-bold text-white">Recent Notes</h2>
              </div>
            </div>

            {recentNotes.length > 0 ? (
              <div className="space-y-4">
                {recentNotes.map((note, index) => (
                  <div
                    key={note._id}
                    className="group relative bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9ECFD4] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div className="p-6 flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#9ECFD4]" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-white mb-2">{note.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{note.summary ? note.summary.substring(0, 120) + '...' : 'No summary available'}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="px-4 py-2 bg-[#9ECFD4]/5 border border-[#9ECFD4]/20">
                          <p className="text-[#9ECFD4] text-xs font-medium">0{index + 1}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black border border-white/10 p-20 text-center">
                <FileText className="w-16 h-16 text-[#9ECFD4]/30 mx-auto mb-4" />
                <p className="text-gray-400">No notes yet. Start by adding some notes.</p>
              </div>
            )}
          </div>

          {/* Motivational Quote Section */}
          <div className="relative bg-black border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9ECFD4]/5 blur-3xl"></div>
            <div className="relative p-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-[#9ECFD4]" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#9ECFD4] text-sm font-medium uppercase tracking-widest mb-4">Daily Motivation</p>
                  <p className="text-2xl text-white font-light leading-relaxed mb-6">"{quote || 'Keep pushing forward!'}"</p>
                  <div className="h-px w-24 bg-gradient-to-r from-[#9ECFD4] to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard