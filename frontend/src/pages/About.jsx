import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Lightbulb,
  Rocket
} from 'lucide-react';
import Navbar from '../components/Navbar';

const About = () => {
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

  const features = [
    { icon: Lightbulb, title: "AI-Driven Insights", desc: "Understand your weak areas and get tailored improvement plans using intelligent analytics." },
    { icon: Rocket, title: "Boost Productivity", desc: "Manage study time efficiently and keep distractions away with progress-focused tools." },
    { icon: Sparkles, title: "Smart Personalization", desc: "Your experience evolves as you study — adaptive features that grow with you." },
  ];

  const benefits = [
    { icon: Sparkles, title: "AI-Powered Intelligence", desc: "Machine learning algorithms continuously analyze your study patterns, predict knowledge gaps, and dynamically adjust content difficulty to optimize learning outcomes and accelerate mastery." },
    { icon: Zap, title: "Maximum Efficiency", desc: "Advanced focus tools and intelligent time management systems eliminate distractions, prioritize high-impact content, and reduce study time by up to 40% while improving retention rates." },
    { icon: Shield, title: "Proven Excellence", desc: "Built on cognitive science research and validated by thousands of successful students. Track every metric, celebrate milestones, and achieve consistent progress with data-driven confidence." },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
      {/* Animated Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Subtle gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(158,207,212,0.08) 0%, transparent 60%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-32 z-20">
        <div className="relative z-30 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 border border-[#9ECFD4]/30 px-6 py-3 bg-[#9ECFD4]/5">
              <div className="w-2 h-2 bg-[#9ECFD4]"></div>
              <span className="text-[#9ECFD4] text-xs font-medium tracking-widest uppercase">
                AI-Powered Learning Platform
              </span>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-6">
              <span className="block text-white">ABOUT</span>
              <span className="block text-[#9ECFD4]">STUDYMATE</span>
            </h1>
            <div className="w-24 h-px bg-[#9ECFD4] mx-auto"></div>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            Empowering learners with AI-driven tools for smarter studying and academic excellence
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group bg-transparent border border-[#9ECFD4] text-[#9ECFD4] px-12 py-5 text-sm font-medium tracking-wider hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 flex items-center gap-3 uppercase">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/20 text-white px-12 py-5 text-sm font-medium tracking-wider hover:border-[#9ECFD4] hover:text-[#9ECFD4] transition-all duration-300 uppercase">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-[#9ECFD4]"></div>
              <div>
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Our Mission</p>
                <h2 className="text-5xl font-bold text-white tracking-tight">Revolutionizing Learning</h2>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: IconComponent, title, desc }, idx) => (
              <div
                key={title}
                className="group bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center group-hover:bg-[#9ECFD4] group-hover:border-[#9ECFD4] transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-[#9ECFD4] group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div className="text-5xl font-bold text-white/5 group-hover:text-[#9ECFD4]/10 transition-colors">
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9ECFD4] transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {desc}
                  </p>

                  <div className="flex items-center gap-2 text-[#9ECFD4]/50 group-hover:text-[#9ECFD4] text-xs font-medium tracking-wider uppercase transition-all duration-300">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-[#9ECFD4]"></div>
              <div>
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Why Choose Us</p>
                <h2 className="text-5xl font-bold text-white tracking-tight">Our Advantage</h2>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map(({ icon: IconComponent, title, desc }, idx) => (
              <div key={title} className="group bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
                <div className="p-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="flex items-center gap-8 flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-[#9ECFD4]/10 border border-[#9ECFD4] flex items-center justify-center group-hover:bg-[#9ECFD4] transition-colors duration-300">
                          <IconComponent className="w-10 h-10 text-[#9ECFD4] group-hover:text-black transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="text-6xl font-bold text-[#9ECFD4]/10 group-hover:text-[#9ECFD4]/20 transition-colors">
                        0{idx + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#9ECFD4] transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: "10K+", label: "ACTIVE USERS", sublabel: "Worldwide" },
              { value: "50K+", label: "STUDY SESSIONS", sublabel: "Completed" },
              { value: "95%", label: "SUCCESS RATE", sublabel: "Verified" }
            ].map(({ value, label, sublabel }) => (
              <div key={label} className="group bg-black border border-white/10 p-16 text-center hover:border-[#9ECFD4] transition-all duration-300">
                <div className="text-7xl font-bold text-[#9ECFD4] mb-6">
                  {value}
                </div>
                <div className="text-white/60 tracking-widest text-xs font-medium mb-2 group-hover:text-white transition-colors">
                  {label}
                </div>
                <div className="text-white/30 tracking-wider text-xs group-hover:text-white/40 transition-colors">
                  {sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-8 z-20">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            <span className="block text-white">JOIN THE</span>
            <span className="block text-[#9ECFD4]">REVOLUTION</span>
          </h2>

          <p className="text-gray-400 text-sm mb-16 tracking-widest uppercase">
            Start Your Journey Towards Academic Excellence Today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-transparent border border-[#9ECFD4] text-[#9ECFD4] px-16 py-5 text-sm font-medium tracking-wider hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 uppercase">
              Start Learning
            </button>
            <button className="border border-white/20 text-white px-16 py-5 text-sm font-medium tracking-wider hover:border-[#9ECFD4] hover:text-[#9ECFD4] transition-all duration-300 uppercase">
              View Features
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-xs text-white/30 tracking-wider uppercase">
            <div>No Credit Card</div>
            <div className="w-1 h-1 bg-white/30"></div>
            <div>Free Forever</div>
            <div className="w-1 h-1 bg-white/30"></div>
            <div>Cancel Anytime</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-8 border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#9ECFD4]" />
              </div>
              <span className="text-xl font-bold">STUDYMATE</span>
            </div>

            <div className="text-center">
              <div className="text-white/30 text-xs tracking-widest uppercase mb-1">
                © 2025 StudyMate Technologies
              </div>
              <div className="text-white/20 text-xs tracking-wider">
                All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;