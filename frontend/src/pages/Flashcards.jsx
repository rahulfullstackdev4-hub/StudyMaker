import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Flashcard from "../components/Flashcard";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Flashcards = () => {
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/flashcards", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCards(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchFlashcards();
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) =>
            card.cards.map((c, index) => (
              <Flashcard key={index} question={c.question} answer={c.answer} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
