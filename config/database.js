// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "acadly_adm",
  password: "12345678",
  database: "acadly",
});

module.exports = db;
