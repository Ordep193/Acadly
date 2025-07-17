const db = require("../config/database");

async function addUsuario(nome, senha, email, idade, telefone, cpf, instituicao, cargo) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      INSERT INTO usuario (nome, senha, email, idade, telefone, cpf, instituicao, cargo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [nome, senha, email, idade, telefone, cpf, instituicao, cargo]);

    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    console.error(error);
    return false;
  } finally {
    conn.release();
  }
}

async function updateUsuario(id, nome, senha, email, idade, telefone, cpf, instituicao) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      UPDATE usuario SET
        nome = ?, senha = ?, email = ?, idade = ?, telefone = ?, cpf = ?, instituicao = ?
      WHERE id = ?
    `;
    await conn.query(query, [nome, senha, email, idade, telefone, cpf, instituicao, id]);

    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    console.error(error);
    return false;
  } finally {
    conn.release();
  }
}

async function deleteUsuario(id) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM usuario WHERE id = ?", [id]);

    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    console.error(error);
    return false;
  } finally {
    conn.release();
  }
}

async function getUsuario(id) {
  try {
    const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id]);
    if (rows.length === 0) throw new Error("Usuário não encontrado");
    return rows[0];
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getUsuarioAll() {
  try {
    const [rows] = await db.query("SELECT * FROM usuario ORDER BY id");
    if (rows.length === 0) throw new Error("Nenhum usuário encontrado");
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  addUsuario,
  updateUsuario,
  getUsuario,
  getUsuarioAll,
  deleteUsuario,
};
