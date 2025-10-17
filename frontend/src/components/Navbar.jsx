import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">StudyMate</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/studyplan" className="hover:underline">Study Plan</Link>
        <Link to="/notes" className="hover:underline">Notes</Link>
        <Link to="/flashcards" className="hover:underline">Flashcards</Link>
        <Link to="/aichat" className="hover:underline">AI Chat</Link>
        {user && <button onClick={handleLogout} className="ml-4 bg-red-500 px-2 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
