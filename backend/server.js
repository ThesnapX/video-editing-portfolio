const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const database = require("./config/database");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://your-frontend-url.vercel.app",
            "https://your-backend-url.onrender.com",
          ]
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Uploads directory created");
}
app.use("/uploads", express.static(uploadDir));

// Connect to database
database.connect();

// Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/work", require("./routes/work"));
app.use("/api/services", require("./routes/service"));
app.use("/api/testimonials", require("./routes/testimonial"));
app.use("/api/leads", require("./routes/lead"));

// Health check route for Render
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    mongodb: database.isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is running!",
    mongodb: database.isConnected ? "Connected" : "Disconnected",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("📁 Uploads folder is being served from /uploads");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Test API: http://localhost:${PORT}/api/test`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
