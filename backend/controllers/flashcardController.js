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

const updateFlashcards = async (req, res) => {
  const { id } = req.params;
  const { subject, cards } = req.body;
  const flashcard = await Flashcard.findByIdAndUpdate(id, { subject, cards }, { new: true });
  res.json(flashcard);
};

const deleteFlashcards = async (req, res) => {
  const { id } = req.params;
  await Flashcard.findByIdAndDelete(id);
  res.json({ message: "Flashcards deleted" });
};

module.exports = { addFlashcards, getFlashcards, updateFlashcards, deleteFlashcards };
