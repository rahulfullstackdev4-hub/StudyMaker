const express = require("express");
const router = express.Router();
const { addStudyPlan, getStudyPlan, updateStudyPlan, deleteStudyPlan } = require("../controllers/studyPlanController");
const protect = require("../middleware/authMiddleware");

router.route("/").get(protect, getStudyPlan).post(protect, addStudyPlan);
router.route("/:id").put(protect, updateStudyPlan).delete(protect, deleteStudyPlan);

module.exports = router;
