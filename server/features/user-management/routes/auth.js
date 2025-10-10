const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../../config/db");

// REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  try {
    // Check if email already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?", 
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, phone || null]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(201).json({ 
      message: "User registered successfully!",
      token,
      user: {
        id: result.insertId,
        name,
        email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Something went wrong during registration", 
      error: error.message 
    });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ 
      message: 'Login successful', 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_worker: user.is_worker,
        profile_image: user.profile_image
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Something went wrong during login", 
      error: error.message 
    });
  }
});

// VERIFY TOKEN (check if user is still authenticated)
router.get('/verify', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user details
    const [users] = await db.query(
      'SELECT id, name, email, is_worker, profile_image FROM users WHERE id = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      valid: true,
      user: users[0]
    });
  } catch (error) {
    return res.status(401).json({ 
      valid: false,
      message: 'Invalid or expired token' 
    });
  }
});

module.exports = router;