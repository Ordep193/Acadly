const db = require("../config/database");

async function fazerFeedback(id, idEvento, idUsuario, descricao, nota) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      INSERT INTO feedback (id, idEvento, idUsuario, descricao, nota)
      VALUES (?, ?, ?, ?, ?)
    `;
    await conn.query(query, [id, idEvento, idUsuario, descricao, nota]);

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

async function updateFeedback(id, descricao, nota) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = `
      UPDATE feedback
      SET descricao = ?, nota = ?
      WHERE id = ?
    `;
    await conn.query(query, [descricao, nota, id]);

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

async function deleteFeedback(id) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const query = "DELETE FROM feedback WHERE id = ?";
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

async function getFeedback(id) {
  try {
    const [rows] = await db.query("SELECT * FROM feedback WHERE id = ?", [id]);
    if (rows.length === 0) throw new Error("Feedback não encontrado");
    return rows[0];
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getFeedbackAll(idUsuario) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM feedback WHERE idUsuario = ? ORDER BY id",
      [idUsuario]
    );
    if (rows.length === 0) throw new Error("Feedback não encontrado");
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  fazerFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbackAll,
};
