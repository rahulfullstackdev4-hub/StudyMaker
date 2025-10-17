import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NotesCard from "../components/NotesCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Notes = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchNotes();
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        {notes.map((note) => (
          <NotesCard key={note._id} title={note.title} summary={note.summary} fileUrl={note.fileUrl} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
