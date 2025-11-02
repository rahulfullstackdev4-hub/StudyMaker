import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Users,
  Brain,
  BarChart3,
  FileText,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Enhanced Animated Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    // Create particles with varied properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 60 + 160, // Blue to cyan range
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dynamic size based on pulse
        const currentSize = p.size * (1 + Math.sin(p.pulse) * 0.3);

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = `hsl(${p.hue}, 70%, 60%)`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `hsl(${p.hue}, 70%, 70%)`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections to nearby particles
        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.3;
              ctx.save();
              ctx.globalAlpha = alpha;
              ctx.strokeStyle = `hsl(${(p.hue + p2.hue) / 2}, 70%, 60%)`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
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

  const features = [
    { icon: BarChart3, title: "Analytics", desc: "Real-time performance metrics", gradient: "from-[#9ECFD4]/10 to-transparent" },
    { icon: BookOpen, title: "Planning", desc: "Intelligent study scheduling", gradient: "from-transparent to-[#9ECFD4]/10" },
    { icon: FileText, title: "Notes", desc: "Cloud-based organization", gradient: "from-[#9ECFD4]/10 to-transparent" },
    { icon: Brain, title: "AI Learning", desc: "Adaptive algorithms", gradient: "from-transparent to-[#9ECFD4]/10" },
    { icon: MessageSquare, title: "Assistant", desc: "24/7 AI tutoring", gradient: "from-[#9ECFD4]/10 to-transparent" },
    { icon: Users, title: "Community", desc: "Global collaboration", gradient: "from-transparent to-[#9ECFD4]/10" },
  ];

  const benefits = [
    { icon: Sparkles, title: "AI-Powered Intelligence", desc: "Machine learning algorithms continuously analyze your study patterns, predict knowledge gaps, and dynamically adjust content difficulty to optimize learning outcomes and accelerate mastery." },
    { icon: Zap, title: "Maximum Efficiency", desc: "Advanced focus tools and intelligent time management systems eliminate distractions, prioritize high-impact content, and reduce study time by up to 40% while improving retention rates." },
    { icon: Shield, title: "Proven Excellence", desc: "Built on cognitive science research and validated by thousands of successful students. Track every metric, celebrate milestones, and achieve consistent progress with data-driven confidence." },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Canvas */}
      <Navbar/>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Dynamic Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(158,207,212,0.15) 0%, transparent 50%)`,
          opacity: 0.6
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-32 z-20">
        {/* Removed circuit-like grid background */}

        <div className="relative z-30 max-w-8xl mx-auto text-center">
          <div
            className="mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]"
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="inline-flex items-center gap-3 border border-[#9ECFD4]/30 px-10 py-4 backdrop-blur-xl bg-gradient-to-r from-[#9ECFD4]/5 to-transparent shadow-2xl">
              <div className="relative flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9ECFD4] rounded-full animate-pulse shadow-lg shadow-[#9ECFD4]/50" />
                <div className="w-1.5 h-1.5 bg-[#9ECFD4]/80 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="w-1 h-1 bg-[#9ECFD4]/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <span className="text-[#9ECFD4] text-[9px] font-bold tracking-[0.4em] uppercase">
                Next-Generation AI Learning Platform
              </span>
            </div>
          </div>

          <div
            className="mb-16 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]"
            style={{ animationFillMode: 'forwards' }}
          >
            <h1 className="relative inline-block">
              <div className="text-[110px] md:text-[130px] lg:text-[160px] font-black leading-[0.75] tracking-[-0.02em]">
                <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">STUDY</span>
                <span className="block bg-gradient-to-r from-[#9ECFD4] via-[#9ECFD4]/80 to-[#9ECFD4] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(158,207,212,0.4)]">MATE</span>
              </div>
              <div className="absolute -bottom-6 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent shadow-lg shadow-[#9ECFD4]/30" />
            </h1>
          </div>

          <p
            className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-24 leading-relaxed tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]"
            style={{ animationFillMode: 'forwards' }}
          >
            Experience the future of education with our revolutionary AI-powered platform that adapts to your learning style and accelerates your academic success.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]"
            style={{ animationFillMode: 'forwards' }}
          >
            <button className="group relative bg-gradient-to-r from-[#9ECFD4] to-[#9ECFD4]/80 text-black px-32 py-8 text-[10px] font-black tracking-[0.3em] hover:from-white hover:to-[#9ECFD4]/90 transition-all duration-700 overflow-hidden shadow-2xl shadow-[#9ECFD4]/30 hover:shadow-[#9ECFD4]/50">
              <span className="relative z-10 flex items-center gap-4">
                LAUNCH PLATFORM
                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" strokeWidth={3} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="group border-2 border-[#9ECFD4]/40 text-[#9ECFD4] px-32 py-8 text-[10px] font-black tracking-[0.3em] hover:border-[#9ECFD4] hover:bg-[#9ECFD4]/10 hover:text-white transition-all duration-700 backdrop-blur-sm shadow-xl shadow-[#9ECFD4]/20 hover:shadow-[#9ECFD4]/40">
              <span className="flex items-center gap-4">
                WATCH DEMO
                <Star className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
              </span>
            </button>
          </div>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]" style={{ animationFillMode: 'forwards' }}>
            <div className="text-[9px] text-white/30 tracking-[0.3em] font-semibold">SCROLL TO EXPLORE</div>
            <div className="w-[2px] h-16 bg-gradient-to-b from-[#9ECFD4]/60 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-40 px-8 z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-32 text-center">
            <div className="inline-block mb-6">
              <div className="text-[8px] text-[#9ECFD4]/50 tracking-[0.5em] font-bold mb-4">PLATFORM CAPABILITIES</div>
              <h2 className="text-7xl md:text-8xl font-black tracking-[-0.02em] mb-6">
                <span className="bg-gradient-to-r from-white via-white to-[#9ECFD4] bg-clip-text text-transparent">
                  FEATURES
                </span>
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent mx-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-gradient-to-br from-[#9ECFD4]/5 to-transparent p-[2px]">
            {features.map(({ icon: Icon, title, desc, gradient }, idx) => (
              <div
                key={title}
                className="group relative bg-black p-20 hover:bg-gradient-to-br hover:from-[#9ECFD4]/[0.03] hover:to-transparent transition-all duration-1000 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-16">
                    <div className="relative">
                      <div className="w-16 h-16 border border-[#9ECFD4]/20 flex items-center justify-center group-hover:border-[#9ECFD4] group-hover:bg-[#9ECFD4] transition-all duration-700">
                        <Icon className="w-7 h-7 text-[#9ECFD4] group-hover:text-black transition-colors duration-700" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-[#9ECFD4]/20 group-hover:border-[#9ECFD4] transition-colors duration-700" />
                    </div>
                    <div className="text-[100px] font-black text-white/[0.015] group-hover:text-[#9ECFD4]/[0.05] leading-none transition-colors duration-1000">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#9ECFD4] transition-colors duration-700">
                    {title}
                  </h3>
                  <p className="text-white/30 text-xs tracking-wider leading-relaxed mb-6 group-hover:text-white/50 transition-colors duration-700">
                    {desc}
                  </p>

                  <div className="flex items-center gap-2 text-[#9ECFD4]/50 group-hover:text-[#9ECFD4] text-[8px] font-bold tracking-[0.3em] group-hover:gap-4 transition-all duration-700">
                    EXPLORE
                    <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-40 px-8 z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#9ECFD4]/[0.01] to-black" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-32 text-center">
            <div className="text-[8px] text-[#9ECFD4]/50 tracking-[0.5em] font-bold mb-4">WHY CHOOSE US</div>
            <h2 className="text-7xl md:text-8xl font-black tracking-[-0.02em] mb-6">
              <span className="bg-gradient-to-r from-[#9ECFD4] via-white to-white bg-clip-text text-transparent">
                ADVANTAGE
              </span>
            </h2>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent mx-auto" />
          </div>

          <div className="space-y-[2px] bg-gradient-to-b from-[#9ECFD4]/5 to-transparent p-[2px]">
            {benefits.map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="group bg-black p-20 hover:bg-gradient-to-r hover:from-[#9ECFD4]/[0.03] hover:to-transparent transition-all duration-1000">
                <div className="flex flex-col lg:flex-row items-start gap-16">
                  <div className="flex items-center gap-12 flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 bg-[#9ECFD4] flex items-center justify-center group-hover:bg-white transition-colors duration-700">
                        <Icon className="w-11 h-11 text-black" strokeWidth={2} />
                      </div>
                      <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-[#9ECFD4]/30 group-hover:border-[#9ECFD4] transition-colors duration-700" />
                      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-[#9ECFD4]/30 group-hover:border-[#9ECFD4] transition-colors duration-700" />
                    </div>
                    <div className="text-[120px] font-black text-[#9ECFD4]/5 group-hover:text-[#9ECFD4]/10 leading-none transition-colors duration-1000">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight group-hover:text-[#9ECFD4] transition-colors duration-700">
                      {title}
                    </h3>
                    <p className="text-white/40 text-sm leading-loose tracking-wide max-w-3xl group-hover:text-white/60 transition-colors duration-700">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-40 px-8 z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-3 gap-[2px] bg-gradient-to-r from-transparent via-[#9ECFD4]/5 to-transparent p-[2px]">
            {[
              { value: "10K+", label: "ACTIVE USERS", sublabel: "Worldwide" },
              { value: "50K+", label: "STUDY SESSIONS", sublabel: "Completed" },
              { value: "95%", label: "SUCCESS RATE", sublabel: "Verified" }
            ].map(({ value, label, sublabel }) => (
              <div key={label} className="group bg-black p-24 text-center hover:bg-gradient-to-b hover:from-[#9ECFD4]/[0.03] hover:to-transparent transition-all duration-1000 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(158,207,212,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10">
                  <div className="text-[140px] md:text-[160px] font-black leading-none tracking-tighter mb-8">
                    <span className="bg-gradient-to-b from-[#9ECFD4] to-[#9ECFD4]/50 bg-clip-text text-transparent">
                      {value}
                    </span>
                  </div>
                  <div className="text-white/40 tracking-[0.5em] text-[9px] font-bold mb-2 group-hover:text-white/60 transition-colors duration-700">
                    {label}
                  </div>
                  <div className="text-white/20 tracking-[0.3em] text-[7px] font-semibold group-hover:text-white/30 transition-colors duration-700">
                    {sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-48 px-8 z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,207,212,0.08)_0%,transparent_70%)]" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-[-0.03em] leading-[0.85]">
            <span className="block text-white">BEGIN YOUR</span>
            <span className="block bg-gradient-to-r from-[#9ECFD4] to-white bg-clip-text text-transparent">TRANSFORMATION</span>
          </h2>
          
          <p className="text-white/30 text-xs md:text-sm mb-24 tracking-[0.3em] font-semibold">
            JOIN THE FUTURE OF LEARNING TODAY
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button className="group bg-white text-black px-28 py-8 text-[9px] font-black tracking-[0.4em] hover:bg-[#9ECFD4] transition-all duration-700 relative overflow-hidden">
              <span className="relative z-10">START FREE TRIAL</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9ECFD4]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="border-2 border-white/10 text-white px-28 py-8 text-[9px] font-black tracking-[0.4em] hover:border-[#9ECFD4] hover:bg-[#9ECFD4]/5 hover:text-[#9ECFD4] transition-all duration-700">
              VIEW PRICING
            </button>
          </div>

          <div className="flex items-center justify-center gap-12 text-[8px] text-white/20 tracking-[0.4em] font-semibold">
            <div>NO CREDIT CARD</div>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <div>FREE FOREVER</div>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <div>CANCEL ANYTIME</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-8 border-t border-white/[0.02] z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 bg-[#9ECFD4] flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-black" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-[#9ECFD4]/30" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-[#9ECFD4]/30" />
              </div>
              <span className="text-2xl font-black tracking-[-0.02em]">STUDYMATE</span>
            </div>
            
            <div className="text-center">
              <div className="text-white/20 text-[8px] tracking-[0.4em] font-semibold mb-2">
                © 2025 STUDYMATE TECHNOLOGIES
              </div>
              <div className="text-white/10 text-[7px] tracking-[0.3em]">
                ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 1; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;