// routes/feedback.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController');

// Formulário de feedback
router.get('/novo/:idEvento/:idUsuario', (req, res) => {
  const { idEvento, idUsuario } = req.params;
  res.render('html/novoFeedback', { idEvento, idUsuario });
});

// Enviar feedback
router.post('/criar', async (req, res) => {
  const { id, idEvento, idUsuario, descricao, nota } = req.body;
  try {
    await UsuarioController.fazerFeedback(id, idEvento, idUsuario, descricao, nota);
    res.redirect(`/eventos/${idEvento}`);
  } catch (error) {
    res.status(500).send('Erro ao enviar feedback');
  }
});

module.exports = router;
