require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/genai");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const pdfParse = require("pdf-parse");

// ✅ Initialize Gemini client with your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer config for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let fileUrl = "";
    let extractedText = "";

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    fileUrl = uploadResult.secure_url;

    // Extract text from PDF if it's a PDF
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    }

    res.json({
      fileUrl,
      extractedText,
      fileType: req.file.mimetype,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({
      message: "File upload failed",
      error: error.message
    });
  }
};

const aiChat = async (req, res) => {
  const { prompt, fileUrl, extractedText, fileType } = req.body;

  try {
    let parts = [{ text: prompt }];

    // If file is provided, add it to the prompt
    if (fileUrl) {
      if (fileType === 'application/pdf' && extractedText) {
        // For PDFs, include extracted text
        parts[0].text += `\n\nDocument content:\n${extractedText}`;
      } else if (fileType.startsWith('image/')) {
        // For images, fetch from Cloudinary and convert to base64
        const axios = require('axios');
        const imageResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
        parts.push({
          inline_data: {
            mime_type: fileType,
            data: base64Image
          }
        });
      }
    }

    // ✅ Generate response using Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      message: "AI service error",
      error: error.message || "Unknown error",
    });
  }
};

module.exports = { aiChat, uploadFile, upload };
