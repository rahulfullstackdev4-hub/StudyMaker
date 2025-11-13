import React, { useState, useEffect, useRef } from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
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

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 60 + 160, 
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      
        const currentSize = p.size * (1 + Math.sin(p.pulse) * 0.3);

      
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = `hsl(${p.hue}, 70%, 60%)`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `hsl(${p.hue}, 70%, 70%)`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        
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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-x-hidden">
      
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(158,207,212,0.15) 0%, transparent 50%)`,
          opacity: 0.6
        }}
      />

      <div className="text-center mb-16 z-20">
        <div className="inline-block mb-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#9ECFD4]"></div>
            <span className="text-[#9ECFD4] text-xs font-bold tracking-[0.3em] uppercase">Welcome Back</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#9ECFD4]"></div>
          </div>
        </div>
        <h1 className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tight">LOGIN</h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Sign in to access your personalized study dashboard and continue your learning journey.
        </p>
      </div>
      <div className="bg-black border border-white/10 p-12 hover:border-[#9ECFD4] transition-all duration-500 z-20">
        <SignIn routing="path" path="/" />
      </div>
    </div>
  );
};

export default Login;
