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

module.exports = { addStudyPlan, getStudyPlan };
