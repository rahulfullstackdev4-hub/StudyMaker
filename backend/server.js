const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");
const notesRoutes = require("./routes/notesRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Configure CORS to allow requests from the frontend origin
const corsOptions = {
  origin: [
    'https://study-maker-three.vercel.app', // Production frontend
    'http://localhost:3000', // Local development frontend
    'http://localhost:5173', // Vite default port
    'http://localhost:5000' // Local backend port
  ],
  credentials: false, // Disable credentials to avoid preflight issues
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/plan", studyPlanRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/ai", aiRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
