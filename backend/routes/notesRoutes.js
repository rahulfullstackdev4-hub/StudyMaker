const express = require("express");
const router = express.Router();
const { addNotes, getNotes, updateNotes, deleteNotes } = require("../controllers/notesController");
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/").get(protect, getNotes).post(protect, upload.single("file"), addNotes);
router.route("/:id").put(protect, updateNotes).delete(protect, deleteNotes);

module.exports = router;
