const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // Importa o modelo de usuário
const router = express.Router();

const JWT_SECRET = 'seu-segredo-jwt'; // Use variáveis de ambiente em produção

// Criar um novo usuário
router.post('/users', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaHash });

    await novoUsuario.save();
    res.status(201).send(novoUsuario);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar o usuário' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido.', token });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
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
