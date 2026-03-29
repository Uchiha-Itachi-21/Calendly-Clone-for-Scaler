const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM bookings", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { event_id, name, email, date, start_time } = req.body;

  db.query(
    "SELECT * FROM bookings WHERE date=? AND start_time=?",
    [date, start_time],
    (err, result) => {
      if (result.length > 0) return res.status(400).send("Already booked");

      db.query(
        "INSERT INTO bookings (event_id, name, email, date, start_time) VALUES (?, ?, ?, ?, ?)",
        [event_id, name, email, date, start_time],
        () => res.send("Booked")
      );
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM bookings WHERE id=?", [req.params.id], () => {
    res.send("Cancelled");
  });
});

module.exports = router;