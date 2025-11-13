require("dotenv").config();
const Notes = require("../models/Notes");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

const addNotes = async (req, res) => {
  try {
    console.log("addNotes called");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file ? "File present" : "No file");
    console.log("req.user:", req.user ? req.user._id : "No user");

    const { title, summary } = req.body;
    let fileUrl;

    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      try {
      
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "studymate_notes", resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary stream error:", error);
                reject(error);
              } else {
                console.log("Cloudinary upload success:", result.secure_url);
                resolve(result);
              }
            }
          );
          stream.end(req.file.buffer);
        });
        fileUrl = uploadResult.secure_url;
        console.log("File uploaded successfully:", fileUrl);
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "File upload failed", error: error.message });
      }
    }

    console.log("Creating note in database...");
    const notes = await Notes.create({
      userId: req.user._id,
      title,
      summary,
      fileUrl,
    });

    console.log("Note created successfully:", notes._id);
    res.status(201).json(notes);
  } catch (error) {
    console.error("Notes creation error:", error);
    res.status(500).json({ message: "Failed to create note", error: error.message });
  }
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

module.exports = { addNotes, getNotes, updateNotes, deleteNotes, upload };
