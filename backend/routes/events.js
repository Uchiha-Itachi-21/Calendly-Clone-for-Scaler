const express = require("express");
const router = express.Router(); // ✅ MUST COME FIRST
const db = require("../db");

/* =========================
   TEST ROUTE
========================= */
router.get("/test", (req, res) => {
  res.send("EVENT ROUTE WORKING");
});

/* =========================
   GET ALL EVENTS
========================= */
router.get("/", (req, res) => {
  db.query("SELECT * FROM event_types", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* =========================
   GET EVENT BY SLUG
========================= */
router.get("/slug/:slug", (req, res) => {
  const { slug } = req.params;

  db.query(
    "SELECT * FROM event_types WHERE slug = ?",
    [slug],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json(result[0]);
    }
  );
});

/* =========================
   CREATE EVENT
========================= */
router.post("/", (req, res) => {
  const { name, duration, slug } = req.body;

  db.query(
    "INSERT INTO event_types (name, duration, slug) VALUES (?, ?, ?)",
    [name, duration, slug],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Event created" });
    }
  );
});

/* =========================
   DELETE EVENT
========================= */
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM event_types WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Event deleted" });
    }
  );
});

module.exports = router;