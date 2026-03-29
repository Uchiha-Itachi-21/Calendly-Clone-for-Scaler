const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "calendly",
  password: "password123",
  database: "calendly_clone"
});

module.exports = db;