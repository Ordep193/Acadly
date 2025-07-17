// db.js
// para que essa conexão com o banco de dados funcione vc precissa criar um usuário com os dados abaixo no MySQL Workbench
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "acadly_adm", // usuário
  password: "12345678", //senha
  database: "acadly",
});

module.exports = db;