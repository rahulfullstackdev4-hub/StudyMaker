const express = require("express");
const router = express.Router();
const { addNotes, getNotes } = require("../controllers/notesController");
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/").get(protect, getNotes).post(protect, upload.single("file"), addNotes);

module.exports = router;
