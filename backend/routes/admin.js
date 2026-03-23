const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/auth");

// Admin login
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
});

// Verify token
router.get("/verify", adminAuth, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
