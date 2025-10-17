const express = require("express");
const router = express.Router();
const { addStudyPlan, getStudyPlan } = require("../controllers/studyPlanController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getStudyPlan).post(protect, addStudyPlan);

module.exports = router;
