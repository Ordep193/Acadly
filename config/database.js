// db.js
const { Pool } = require('pg');

const db = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "123456",
  database: "acadly",
});

module.exports = db;