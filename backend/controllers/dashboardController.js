const StudyPlan = require("../models/StudyPlan");
const Notes = require("../models/Notes");
const Flashcard = require("../models/Flashcard");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const studyPlans = await StudyPlan.find({ userId });
    const goalsCompleted = studyPlans.reduce((sum, plan) => sum + plan.completed, 0);

    
    let studyHours = 0;
    for (const plan of studyPlans) {
      if (plan.topics && Array.isArray(plan.topics)) {
        for (const topic of plan.topics) {
          if (topic.completed && topic.estimatedTime) {
            studyHours += topic.estimatedTime;
          }
        }
      }
    }

    const recentNotes = await Notes.find({ userId }).sort({ createdAt: -1 }).limit(5);

    
    const pendingFlashcards = await Flashcard.countDocuments({ userId, completed: false });

    const quotes = [
      "Keep pushing forward!",
      "Success is the sum of small efforts repeated day in and day out.",
      "The only way to do great work is to love what you do.",
      "Believe you can and you're halfway there.",
      "The future belongs to those who believe in the beauty of their dreams."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    res.json({
      stats: { goalsCompleted, studyHours, pendingFlashcards },
      recentNotes,
      quote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard error" });
  }
};

module.exports = { getDashboard };
