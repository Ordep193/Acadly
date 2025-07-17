const db = require("../config/database");

async function addCertificado(idUsuario, idEvento, descricao, dataCriacao) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      INSERT INTO certificado (idEvento, idUsuario, descricao, dataCriacao)
      VALUES (?, ?, ?, ?)
    `;
    const values = [idEvento, idUsuario, descricao, dataCriacao];

    await conn.query(query, values);
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

async function deleteCertificado(id) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = "DELETE FROM certificado WHERE id = ?";
    await conn.query(query, [id]);

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

async function getCertificado(idUsuario, idEvento) {
  const query = "SELECT * FROM certificado WHERE idUsuario = ? AND idEvento = ?";
  try {
    const [rows] = await db.query(query, [idUsuario, idEvento]);
    if (rows.length === 0) {
      throw new Error("Certificado não encontrado");
    }
    return rows[0];
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getCertificadoAll(idUsuario) {
  const query = "SELECT * FROM certificado WHERE idUsuario = ? ORDER BY id";
  try {
    const [rows] = await db.query(query, [idUsuario]);
    if (rows.length === 0) {
      throw new Error("Nenhum certificado encontrado");
    }
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  addCertificado,
  deleteCertificado,
  getCertificado,
  getCertificadoAll,
};
