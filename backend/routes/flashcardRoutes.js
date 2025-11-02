const express = require("express");
const router = express.Router();
const { addFlashcards, getFlashcards, updateFlashcards, deleteFlashcards } = require("../controllers/flashcardController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getFlashcards).post(protect, addFlashcards);
router.route("/:id").put(protect, updateFlashcards).delete(protect, deleteFlashcards);

module.exports = router;
