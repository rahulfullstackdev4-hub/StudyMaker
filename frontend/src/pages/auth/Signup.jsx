import React, { useState, useEffect, useRef } from 'react';
import { SignUp } from "@clerk/clerk-react";
import Navbar from '../../components/Navbar';

const Signup = () => {
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

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      
    
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      
      <div 
        className="fixed inset-0 pointer-events-none z-10 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(158,207,212,0.08) 0%, transparent 60%)`
        }}
      />

    
      <section className="relative min-h-screen flex items-center justify-center px-8 py-32 z-20">
        <div className="relative z-30 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 border border-[#9ECFD4]/30 px-6 py-3 bg-[#9ECFD4]/5">
              <div className="w-2 h-2 bg-[#9ECFD4]"></div>
              <span className="text-[#9ECFD4] text-xs font-medium tracking-widest uppercase">
                Join StudyMate Today
              </span>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-6">
              <span className="block text-white">SIGN</span>
              <span className="block text-[#9ECFD4]">UP</span>
            </h1>
            <div className="w-24 h-px bg-[#9ECFD4] mx-auto"></div>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            Create your account and unlock personalized AI-driven learning tools for academic success.
          </p>

          <div className="bg-black border ml-[9rem] border-white/10 p-12 hover:border-[#9ECFD4] transition-all duration-500 z-20">
            <SignUp
              routing="path"
              path="/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-[#9ECFD4] hover:bg-[#9ECFD4]/80 text-black font-bold py-3 px-6 transition-all duration-300 shadow-lg shadow-[#9ECFD4]/20 hover:shadow-[#9ECFD4]/40',
                  formButtonReset: 'bg-transparent border border-[#9ECFD4]/50 text-[#9ECFD4] hover:bg-[#9ECFD4]/10 hover:border-[#9ECFD4] font-bold py-3 px-6 transition-all duration-300',
                  card: 'bg-transparent border-0 shadow-none',
                  headerTitle: 'text-white text-2xl font-bold mb-4',
                  headerSubtitle: 'text-gray-400 mb-6',
                  formFieldInput: 'bg-black border border-white/20 text-white placeholder-gray-500 focus:border-[#9ECFD4] focus:ring-1 focus:ring-[#9ECFD4] transition-all duration-300',
                  formFieldLabel: 'text-white font-medium mb-2',
                  footerActionText: 'text-gray-400',
                  footerActionLink: 'text-[#9ECFD4] hover:text-white font-medium transition-colors duration-300',
                  dividerLine: 'bg-white/10',
                  dividerText: 'text-gray-400',
                  socialButtonsBlockButton: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300',
                  socialButtonsBlockButtonText: 'font-medium',
                  alert: 'bg-red-900/20 border border-red-500/20 text-red-400',
                  alertText: 'text-red-400',
                },
                layout: {
                  socialButtonsPlacement: 'bottom',
                  socialButtonsVariant: 'blockButton',
                },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
