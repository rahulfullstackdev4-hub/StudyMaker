const express = require("express");
const router = express.Router();
const { handleClerkWebhook } = require("../controllers/authController");

// Webhook endpoint for Clerk events
router.post("/webhook", express.raw({ type: 'application/json' }), handleClerkWebhook);

module.exports = router;
