// routes/eventos.js
const express = require('express');
const router = express.Router();
const EventoController = require('../controller/EventoController');
const UsuarioController = require('../controller/UsuarioController');

// Listar todos os eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await EventoController.getEventoAll();
    res.render('html/listarEventos', { eventos });
  } catch (error) {
    res.status(500).send('Erro ao listar eventos');
  }
});

// Página de formulário para novo evento
router.get('/novo', (req, res) => {
  res.render('html/novoEvento');
});

// Criar evento
router.post('/criar', async (req, res) => {
  const { nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao } = req.body;
  try {
    dataFimCor = Date(dataFim)
    dataInicioCor = Date(dataInicio)
    await UsuarioController.criarEvento(nome, descricao, dataInicioCor, dataFimCor, participantes, modalidade, regiao, instituicao);
    res.redirect('/eventos');
  } catch (error) {
    res.status(500).send('Erro ao criar evento');
  }
});

// Página de um evento específico
router.get('/:id', async (req, res) => {
  try {
    const evento = await EventoController.getEvento(req.params.id);
    res.render('html/detalheEvento', { evento });
  } catch (error) {
    res.status(500).send('Erro ao buscar evento');
  }
});

// Página de edição de evento
router.get('/:id/editar', async (req, res) => {
  try {
    const evento = await EventoController.getEvento(req.params.id);
    res.render('html/editarEvento', { evento });
  } catch (error) {
    res.status(500).send('Erro ao buscar evento para edição');
  }
});

// Atualizar evento
router.post('/:id/atualizar', async (req, res) => {
  const { nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao } = req.body;
  try {
    await UsuarioController.updateEvento(req.params.id, nome, descricao, dataInicio, dataFim, participantes, modalidade, regiao, instituicao);
    res.redirect('/eventos');
  } catch (error) {
    res.status(500).send('Erro ao atualizar evento');
  }
});

// Excluir evento
router.post('/:id/deletar', async (req, res) => {
  try {
    await UsuarioController.deleteEvento(req.params.id);
    res.redirect('/eventos');
  } catch (error) {
    res.status(500).send('Erro ao deletar evento');
  }
});

module.exports = router;