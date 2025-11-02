import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
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
      <header className="relative min-h-screen flex items-center justify-center px-8 py-32 z-20">
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 border border-[#9ECFD4]/30 px-6 py-3 bg-[#9ECFD4]/5">
              <div className="w-2 h-2 bg-[#9ECFD4]"></div>
              <span className="text-[#9ECFD4] text-xs font-medium tracking-widest uppercase">
                Get In Touch
              </span>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-6">
              <span className="block text-white">CONTACT</span>
              <span className="block text-[#9ECFD4]">US</span>
            </h1>
            <div className="w-24 h-px bg-[#9ECFD4] mx-auto"></div>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            Ready to transform your learning experience? Reach out to the StudyMate team
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-transparent border border-[#9ECFD4] text-[#9ECFD4] px-12 py-5 text-sm font-medium tracking-wider hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 flex items-center justify-center gap-3 uppercase">
              Send Message
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/20 text-white px-12 py-5 text-sm font-medium tracking-wider hover:border-[#9ECFD4] hover:text-[#9ECFD4] transition-all duration-300 uppercase">
              View Support
            </button>
          </div>
        </div>
      </header>

      {/* Contact Form and Info */}
      <main className="relative py-32 px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-[#9ECFD4]"></div>
              <div>
                <p className="text-[#9ECFD4] text-sm font-medium tracking-widest uppercase mb-1">Contact Form</p>
                <h2 className="text-5xl font-bold text-white tracking-tight">Send Us A Message</h2>
              </div>
            </div>
            <p className="text-gray-400 text-lg ml-8 max-w-2xl">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                    <Send className="w-6 h-6 text-[#9ECFD4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 font-medium mb-3 text-sm tracking-wider uppercase">
                      Message
                    </label>
                    <textarea
                      rows="6"
                      className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#9ECFD4] transition-all resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-transparent border border-[#9ECFD4] text-[#9ECFD4] px-8 py-5 hover:bg-[#9ECFD4] hover:text-black transition-all duration-300 font-medium tracking-wider uppercase text-sm flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#9ECFD4]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Contact Info</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-[#9ECFD4]/5 border border-white/10">
                      <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#9ECFD4]" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Email</p>
                        <p className="text-white">support@studymate.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#9ECFD4]/5 border border-white/10">
                      <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#9ECFD4]" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-white">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#9ECFD4]/5 border border-white/10">
                      <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4]/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#9ECFD4]" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Address</p>
                        <p className="text-white">123 Learning Street<br />Education City, EC 12345</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-white/10 hover:border-[#9ECFD4] transition-all duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Follow Us</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Stay connected with StudyMate on social media for updates, tips, and community discussions
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#" className="px-6 py-3 bg-transparent border border-white/20 text-white hover:border-[#9ECFD4] hover:text-[#9ECFD4] transition-all text-sm font-medium tracking-wider uppercase">
                      Twitter
                    </a>
                    <a href="#" className="px-6 py-3 bg-transparent border border-white/20 text-white hover:border-[#9ECFD4] hover:text-[#9ECFD4] transition-all text-sm font-medium tracking-wider uppercase">
                      LinkedIn
                    </a>
                    <a href="#" className="px-6 py-3 bg-transparent border border-white/20 text-white hover:border-[#9ECFD4] hover:text-[#9ECFD4] transition-all text-sm font-medium tracking-wider uppercase">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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

export default Contact;