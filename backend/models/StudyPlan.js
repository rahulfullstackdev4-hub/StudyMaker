const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: String, required: true },
  topics: [{ type: String }],
  completed: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
