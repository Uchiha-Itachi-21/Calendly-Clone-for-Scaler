const express = require("express");
const router = express.Router();
const db = require("../db");

// Ensure users table exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// POST /auth/register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).json({ error: "Email already registered" });
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "User registered", userId: result.insertId });
    }
  );
});

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "SELECT id, name, email FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (rows.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });
      res.json({ message: "Login successful", user: rows[0] });
    }
  );
});

module.exports = router;
