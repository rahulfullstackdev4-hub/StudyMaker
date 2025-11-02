const express = require("express");
const router = express.Router();
const { aiChat, uploadFile, upload } = require("../controllers/aiController");
const protect = require("../middleware/authMiddleware");

router.post("/chat", protect, aiChat);
router.post("/upload", protect, upload.single('file'), uploadFile);

module.exports = router;
