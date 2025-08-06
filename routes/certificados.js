// routes/certificados.js
const express = require('express');
const router = express.Router();
const EventoController = require('../controller/EventoController');

// Emitir certificado para um usuário
router.get('/emitir/:idEvento/:idUsuario', async (req, res) => {
  const { idEvento, idUsuario } = req.params;
  try {
    const certificado = await EventoController.emitirCertificado(null, idEvento, idUsuario);
    res.render('html/certificado', { certificado });
  } catch (error) {
    res.status(500).send('Erro ao emitir certificado');
  }
});

// Criar certificado manualmente (caso deseje)
router.post('/criar', async (req, res) => {
  const { idEvento, idUsuario } = req.body;
  try {
    await EventoController.criarCertificado(idUsuario, idEvento);
    res.redirect(`/certificados/emitir/${idEvento}/${idUsuario}`);
  } catch (error) {
    res.status(500).send('Erro ao criar certificado');
  }
});

module.exports = router;
