// routes/usuarios.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/UsuarioController');

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await UsuarioController.getUsuarioAll();
    res.render('html/teste/PrefilUsuario', { usuarios });
  } catch (error) {
    res.status(500).send('Erro ao listar usuários');
  }
});

router.get('/detalhe/', async (req, res) => {
  const id = req.query.id;
  if (!id) return res.send("ID não informado");

  try {
    const usuario = await UsuarioController.getUsuario(id);
    if (!usuario) return res.status(404).send('Usuário não encontrado');
    contexto = {
      usuario
    }
    res.render('html/teste/PerfilUsuario', { usuario });
  } catch (error) {
    res.status(500).send('Erro ao buscar usuário');
  }
});


// Formulário de criação
router.get('/novo', (req, res) => {
  res.render('html/novoUsuario');
});

// Criar usuário
router.post('/criar', async (req, res) => {
  const { nome, senha, email, idade, telefone, cpf, instituicao, cargo } = req.body;
  try {
    await UsuarioController.criarUsuario(nome, senha, email, idade, telefone, cpf, instituicao, cargo);
    res.redirect('/usuarios');
  } catch (error) {
    res.status(500).send('Erro ao criar usuário');
  }
});

// Detalhes do usuário
router.get('/:id', async (req, res) => {
  try {
    const usuario = await UsuarioController.getUsuario(req.params.id);
    res.render('html/teste/PerfilUsuario', { usuario });
  } catch (error) {
    res.status(500).send('Erro ao buscar usuário');
  }
});

// Formulário de edição
router.get('/:id/editar', async (req, res) => {
  try {
    const usuario = await UsuarioController.getUsuario(req.params.id);
    res.render('html/editarUsuario', { usuario });
  } catch (error) {
    res.status(500).send('Erro ao buscar usuário');
  }
});

// Atualizar usuário
router.post('/:id/atualizar', async (req, res) => {
  const { nome, senha, email, idade, telefone, cpf, instituicao } = req.body;
  try {
    await UsuarioController.updateUsuario(req.params.id, nome, senha, email, idade, telefone, cpf, instituicao);
    res.redirect('/usuarios');
  } catch (error) {
    res.status(500).send('Erro ao atualizar usuário');
  }
});

// Excluir usuário
router.post('/:id/deletar', async (req, res) => {
  try {
    await UsuarioController.deleteUsuario(req.params.id);
    res.redirect('/usuarios');
  } catch (error) {
    res.status(500).send('Erro ao deletar usuário');
  }
});

module.exports = router;
