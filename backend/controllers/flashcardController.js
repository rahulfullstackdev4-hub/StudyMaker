const Flashcard = require("../models/Flashcard");


const addFlashcards = async (req, res) => {
  const { subject, cards } = req.body;

  const flashcard = await Flashcard.create({
    userId: req.user._id,
    subject,
    cards,
  });

  res.status(201).json(flashcard);
};


const getFlashcards = async (req, res) => {
  const flashcards = await Flashcard.find({ userId: req.user._id });
  res.json(flashcards);
};

module.exports = { addFlashcards, getFlashcards };
