const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa o pacote CORS
const userRoutes = require('./routes/userRoutes.js'); // Importa as rotas do usuário

const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Habilita o CORS para todas as origens (todos os domínios podem acessar)
app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://Talles:0312@cluster0.jmpbk.mongodb.net/todoapp?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.log('Erro de conexão:', err);
  });

// Usando as rotas do usuário
app.use('/api', userRoutes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
