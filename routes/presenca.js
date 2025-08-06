// routes/presenca.js
const express = require('express');
const router = express.Router();
const EventoUsuario = require('../models/EventoUsuario');

// Registrar presença
router.post('/registrar', async (req, res) => {
  const { idUsuario, idEvento, comparecer } = req.body;
  try {
    await EventoUsuario.addUsuarioEvento(idUsuario, idEvento, comparecer);
    res.redirect(`/eventos/${idEvento}`);
  } catch (error) {
    res.status(500).send('Erro ao registrar presença');
  }
});

// Atualizar presença
router.post('/atualizar', async (req, res) => {
  const { idUsuario, idEvento, comparecer } = req.body;
  try {
    await EventoUsuario.gerenciarPresenca(idEvento, idUsuario, comparecer);
    res.redirect(`/eventos/${idEvento}`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar presença');
  }
});

module.exports = router;
