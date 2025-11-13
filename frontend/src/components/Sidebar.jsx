import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, FileText, CreditCard, MessageSquare } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/studyplan", label: "Study Plan", icon: BookOpen },
    { path: "/notes", label: "Notes", icon: FileText },
    { path: "/flashcards", label: "Flashcards", icon: CreditCard },
    { path: "/aichat", label: "AI Chat", icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-black border-r border-white/10 flex flex-col mt-[13rem]">
      
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#9ECFD4]/10 border border-[#9ECFD4] flex items-center justify-center">
            <div className="w-5 h-5 bg-[#9ECFD4]"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">STUDYHUB</h2>
            <div className="h-px w-12 bg-[#9ECFD4] mt-1"></div>
          </div>
        </div>
      </div>

      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    group relative block px-4 py-4 transition-all duration-300
                    ${active 
                      ? 'bg-[#9ECFD4]/10 border border-[#9ECFD4] text-[#9ECFD4]' 
                      : 'border border-white/10 text-gray-400 hover:border-[#9ECFD4] hover:text-[#9ECFD4]'
                    }
                  `}
                >
                  
                  {active && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9ECFD4]"></div>
                  )}
                  
                  <div className="flex items-center gap-3 ml-2">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    
      <div className="p-6 border-t border-white/10">
        <div className="bg-[#9ECFD4]/5 border border-[#9ECFD4]/20 p-4">
          <p className="text-[#9ECFD4] text-xs font-medium uppercase tracking-wider mb-2">
            Pro Tip
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Consistency is key to mastering any subject
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;