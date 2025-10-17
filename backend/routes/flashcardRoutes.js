const express = require("express");
const router = express.Router();
const { addFlashcards, getFlashcards } = require("../controllers/flashcardController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getFlashcards).post(protect, addFlashcards);

module.exports = router;
