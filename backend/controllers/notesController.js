const Notes = require("../models/Notes");
const cloudinary = require("../config/cloudinary");

const addNotes = async (req, res) => {
  const { title, summary } = req.body;
  let fileUrl;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "studymate_notes",
    });
    fileUrl = result.secure_url;
  }

  const notes = await Notes.create({
    userId: req.user._id,
    title,
    summary,
    fileUrl,
  });

  res.status(201).json(notes);
};

const getNotes = async (req, res) => {
  const notes = await Notes.find({ userId: req.user._id });
  res.json(notes);
};

const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { title, summary } = req.body;
  const notes = await Notes.findByIdAndUpdate(id, { title, summary }, { new: true });
  res.json(notes);
};

const deleteNotes = async (req, res) => {
  const { id } = req.params;
  await Notes.findByIdAndDelete(id);
  res.json({ message: "Notes deleted" });
};

module.exports = { addNotes, getNotes, updateNotes, deleteNotes };
