require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.log('Erro de conexão:', err);
  });

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
// usar o valor do process.env, ou 3000 se não for definido

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
