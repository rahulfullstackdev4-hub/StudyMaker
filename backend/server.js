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

app.use(cors());
app.use(express.json()); 

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
