import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Menu, X, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-black/80 border-b border-[#9ECFD4]/20 shadow-2xl shadow-[#9ECFD4]/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-8 py-6 flex justify-between items-center">
        
        <Link
          to="/"
          className="flex items-center gap-4 group transition-all duration-700"
        >
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-[#9ECFD4] to-[#9ECFD4]/50 flex items-center justify-center border border-[#9ECFD4]/30 shadow-[0_0_30px_#9ECFD4]/30 group-hover:shadow-[0_0_50px_#9ECFD4]/50 transition-all duration-700">
              <BookOpen className="w-7 h-7 text-black" strokeWidth={2} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#9ECFD4]/40 group-hover:border-[#9ECFD4] transition-colors duration-700" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#9ECFD4]/40 group-hover:border-[#9ECFD4] transition-colors duration-700" />
          </div>
          <span className="font-black text-3xl tracking-[-0.02em] text-white group-hover:text-[#9ECFD4] transition-all duration-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_30px_rgba(158,207,212,0.3)]">
            STUDYMATE
          </span>
        </Link>

        
        <div className="hidden lg:flex items-center space-x-12">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group relative text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-700 ${
                location.pathname === link.path
                  ? "text-[#9ECFD4] drop-shadow-[0_0_10px_rgba(158,207,212,0.5)]"
                  : "text-white/60 hover:text-[#9ECFD4] hover:drop-shadow-[0_0_15px_rgba(158,207,212,0.3)]"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-2 h-[1px] bg-gradient-to-r from-transparent via-[#9ECFD4] to-transparent transition-all duration-700 ${
                  location.pathname === link.path
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`}
              ></span>
            </Link>
          ))}

          <div className="ml-8">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full ring-2 ring-[#9ECFD4]/30 hover:ring-[#9ECFD4] shadow-[0_0_20px_#9ECFD4]/20 hover:shadow-[0_0_30px_#9ECFD4]/40 transition-all duration-500",
                  userButtonPopoverCard:
                    "bg-black/95 border border-[#9ECFD4]/20 backdrop-blur-xl shadow-2xl shadow-[#9ECFD4]/10",
                  userButtonPopoverText: "text-white font-semibold",
                  userButtonPopoverActionButton:
                    "text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black font-bold transition-all duration-500",
                },
              }}
            />
          </div>
        </div>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#9ECFD4] hover:text-white transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(158,207,212,0.5)]"
        >
          {isOpen ? <X size={32} strokeWidth={2} /> : <Menu size={32} strokeWidth={2} />}
        </button>
      </div>

      
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/98 backdrop-blur-xl transform transition-all duration-700 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{
          background: isOpen ? 'radial-gradient(circle at 50% 50%, rgba(158,207,212,0.05) 0%, transparent 70%)' : 'transparent'
        }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {links.map((link, idx) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-4xl font-black tracking-[-0.02em] transition-all duration-700 ${
                location.pathname === link.path
                  ? "text-[#9ECFD4] drop-shadow-[0_0_30px_rgba(158,207,212,0.5)]"
                  : "text-white hover:text-[#9ECFD4] hover:drop-shadow-[0_0_20px_rgba(158,207,212,0.3)]"
              }`}
              style={{
                animationDelay: isOpen ? `${idx * 100}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease-out'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div
            className="mt-8"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease-out 0.3s'
            }}
          >
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-16 h-16 ring-2 ring-[#9ECFD4]/30 hover:ring-[#9ECFD4] shadow-[0_0_25px_#9ECFD4]/20 hover:shadow-[0_0_40px_#9ECFD4]/40 transition-all duration-500",
                  userButtonPopoverCard:
                    "bg-black/95 border border-[#9ECFD4]/20 backdrop-blur-xl shadow-2xl shadow-[#9ECFD4]/10",
                  userButtonPopoverText: "text-white font-semibold",
                  userButtonPopoverActionButton:
                    "text-[#9ECFD4] hover:bg-[#9ECFD4] hover:text-black font-bold transition-all duration-500",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
