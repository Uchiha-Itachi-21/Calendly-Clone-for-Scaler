const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */
const eventsRoutes = require("./routes/events");
const bookingsRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");

// base routes
app.use("/events", eventsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/auth", authRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});