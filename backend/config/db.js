const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // Change this if your MySQL has a password
  database: "room_rental_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("✅ Connected to MySQL!");
});

module.exports = db;