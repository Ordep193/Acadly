const db = require("../config/database");

async function addEvento(nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      INSERT INTO evento (nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(query, [nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao]);

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

async function updateEvento(id, nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      UPDATE evento SET
        nome = ?, descricao = ?, dataInicio = ?, dataFim = ?,
        participantes = ?, modalidade = ?, regiao = ?, instituicao = ?
      WHERE id = ?
    `;
    await conn.query(query, [nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao, id]);

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

async function deleteEvento(id) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM evento WHERE id = ?", [id]);

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

async function getEvento(id) {
  try {
    const [rows] = await db.query("SELECT * FROM evento WHERE id = ?", [id]);
    if (rows.length === 0) throw new Error("Evento não encontrado");
    return rows[0];
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getEventoCard(id) {
  try {
    const [rows] = await db.query("SELECT nome, dataInicio, regiao FROM evento WHERE id = ?", [id]);
    if (rows.length === 0) throw new Error("Evento não encontrado");
    return rows[0];
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getEventoAll() {
  try {
    const [rows] = await db.query("SELECT * FROM evento ORDER BY id");
    if (rows.length === 0) throw new Error("Evento não encontrado");
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  addEvento,
  updateEvento,
  deleteEvento,
  getEvento,
  getEventoCard,
  getEventoAll,
};
