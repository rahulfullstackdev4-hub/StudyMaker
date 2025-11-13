const express = require("express");
const router = express.Router();
const { addNotes, getNotes, updateNotes, deleteNotes, upload } = require("../controllers/notesController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, upload.single("file"), addNotes);
router.route("/:id").put(protect, updateNotes).delete(protect, deleteNotes);

module.exports = router;
