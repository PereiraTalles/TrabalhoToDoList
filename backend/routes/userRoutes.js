const express = require('express');
const User = require('../models/user.js');  // Importa o modelo de usuário
const router = express.Router();

// Criar um novo usuário
router.post('/users', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();
    res.status(201).send(novoUsuario);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar o usuário' });
  }
});

// Listar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar os usuários' });
  }
});

module.exports = router;
