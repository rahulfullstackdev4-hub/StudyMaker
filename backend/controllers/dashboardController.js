const StudyPlan = require("../models/StudyPlan");
const Notes = require("../models/Notes");
const Flashcard = require("../models/Flashcard");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    
    const studyPlans = await StudyPlan.find({ userId });
    const goalsCompleted = studyPlans.reduce((sum, plan) => sum + plan.completed, 0);
    const studyHours = 0; 

    
    const recentNotes = await Notes.find({ userId }).sort({ createdAt: -1 }).limit(5);

    
    const quote = "Keep pushing forward!";

    res.json({
      stats: { goalsCompleted, studyHours },
      recentNotes,
      quote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard error" });
  }
};

module.exports = { getDashboard };
