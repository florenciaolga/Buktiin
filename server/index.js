const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import Routes
const authRoutes = require("./features/user-management/routes/auth");
const profileRoutes = require("./features/user-management/routes/profile");
const workerRoutes = require("./features/user-management/routes/workers");
const jobRoutes = require("./features/user-management/routes/jobs");
const reviewRoutes = require("./features/user-management/routes/reviews");
const messageRoutes = require("./features/user-management/routes/messages");
const favoriteRoutes = require("./features/user-management/routes/favorites");

// Health Check
app.get("/", (req, res) => {
  res.json({ 
    message: "Buktiin API is running", 
    version: "1.0.0",
    status: "healthy" 
  });
});

// Database Connection Test
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ Database test successful:", rows);
    res.json({ 
      message: "Database connected successfully!", 
      result: rows[0].result 
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    res.status(500).json({ 
      message: "Database not connected!", 
      error: err.message 
    });
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/favorites", favoriteRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found", 
    path: req.path 
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ 
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`🔍 Health check at http://localhost:${PORT}`);
});