const express = require('express');
const router = express.Router();
const db = require("../../../config/db");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, (req, res) => {
  db.query("SELECT id, name, email FROM users WHERE id = ?", [req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(result[0]);
  });
});

router.put("/", verifyToken, (req, res) => {
  const { name } = req.body;
  db.query("UPDATE users SET name = ? WHERE id = ?", [name, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to update" });
    res.json({ message: "Profile updated successfully!" });
  });
});

router.put("/password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  db.query("SELECT password FROM users WHERE id = ?", [req.user.id], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const match = await bcrypt.compare(oldPassword, result[0].password);
    if (!match) return res.status(400).json({ message: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, req.user.id], (err) => {
      if (err) return res.status(500).json({ message: "Failed to update password" });
      res.json({ message: "Password updated successfully!" });
    });
  });
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/avatar", verifyToken, upload.single('avatar'), (req, res) => {
  res.json({ message: "File uploaded!", filename: req.file.filename });
});

module.exports = router;
