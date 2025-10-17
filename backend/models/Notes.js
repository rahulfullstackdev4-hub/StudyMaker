const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  summary: { type: String },
  fileUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Notes", notesSchema);
