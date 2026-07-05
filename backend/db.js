const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "arjaA@1234",

  database: "esports_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;
