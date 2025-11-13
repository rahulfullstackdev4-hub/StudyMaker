const express = require("express");
const router = express.Router();
const { handleClerkWebhook } = require("../controllers/authController");


router.post("/webhook", express.raw({ type: 'application/json' }), handleClerkWebhook);

module.exports = router;
