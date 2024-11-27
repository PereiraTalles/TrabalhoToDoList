const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb+srv://Talles:0312@cluster0.jmpbk.mongodb.net/todoapp?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.log('Erro de conexão:', err);
  });

app.use('/api', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
