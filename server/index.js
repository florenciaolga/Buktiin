const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

const authRoutes = require("./features/user-management/routes/auth");
console.log("✅ Auth routes loaded:", typeof authRoutes === "function");

const profileRoutes = require("./features/user-management/routes/profile");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, rows) => {
    if (err) {
      console.error("❌ Database connection failed:", err);
      return res.status(500).json({ message: "Database not connected!" });
    }
    console.log("✅ Database test successful:", rows);
    res.json({ message: "Database connected successfully!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));