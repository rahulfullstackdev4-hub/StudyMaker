const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: String },
  cards: [
    {
      question: String,
      answer: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Flashcard", flashcardSchema);
