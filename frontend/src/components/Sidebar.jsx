import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
        <li><Link to="/studyplan" className="hover:text-blue-500">Study Plan</Link></li>
        <li><Link to="/notes" className="hover:text-blue-500">Notes</Link></li>
        <li><Link to="/flashcards" className="hover:text-blue-500">Flashcards</Link></li>
        <li><Link to="/aichat" className="hover:text-blue-500">AI Chat</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
