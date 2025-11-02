const StudyPlan = require("../models/StudyPlan");

const addStudyPlan = async (req, res) => {
  const { subject, topics } = req.body;
  const plan = await StudyPlan.create({
    userId: req.user._id,
    subject,
    topics,
    total: topics.length,
  });
  res.status(201).json(plan);
};

const getStudyPlan = async (req, res) => {
  const plans = await StudyPlan.find({ userId: req.user._id });
  res.json(plans);
};

const updateStudyPlan = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const plan = await StudyPlan.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(plan);
};

const deleteStudyPlan = async (req, res) => {
  const { id } = req.params;
  await StudyPlan.findByIdAndDelete(id);
  res.json({ message: "Study plan deleted" });
};

module.exports = { addStudyPlan, getStudyPlan, updateStudyPlan, deleteStudyPlan };
