import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ goalsCompleted: 0, studyHours: 0 });
  const [recentNotes, setRecentNotes] = useState([]);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">Goals Completed: {stats.goalsCompleted}</div>
          <div className="bg-white p-4 rounded shadow">Study Hours: {stats.studyHours}</div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Recent Notes</h3>
          {recentNotes.map((note) => (
            <div key={note._id} className="bg-gray-100 p-2 rounded mb-2">
              {note.title}
            </div>
          ))}
        </div>
        <div className="bg-yellow-100 p-4 rounded">Motivational Quote: {quote}</div>
      </div>
    </div>
  );
};

export default Dashboard;
