require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");


const pdfParse = require("pdf-parse/lib/pdf-parse");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDFs are allowed"));
    }
  },
});


const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let extractedText = "";

    
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

    const fileUrl = uploadResult.secure_url;

    
    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text;
    }

    res.json({
      fileUrl,
      extractedText,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};


const aiChat = async (req, res) => {
  const { prompt, fileUrl, extractedText, fileType } = req.body;

  try {
    let parts = [{ text: prompt }];

    if (fileUrl) {
      
      if (fileType === "application/pdf" && extractedText) {
        parts[0].text += `\n\nDocument Content:\n${extractedText}`;

    
      } else if (fileType.startsWith("image/")) {
        const axios = require("axios");

        const imageResponse = await axios.get(fileUrl, {
          responseType: "arraybuffer",
        });

        const base64Image = Buffer.from(imageResponse.data).toString("base64");

        parts.push({
          inline_data: {
            mime_type: fileType,
            data: base64Image,
          },
        });
      }
    }

  
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      message: "AI service error",
      error: error.message,
    });
  }
};

module.exports = { aiChat, uploadFile, upload };
