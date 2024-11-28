require('dotenv').config();
const express = require('express');
const app = express();
const createError = require('http-errors');
const cors = require("cors");

const mongoose = require('mongoose');
mongoose.set('strictQuery', 'false')

main()
.then(async() => {
    console.log('Conectado ao mongoDB')
})
.catch((err) => console.log('Erro ao conectar ao mongoDB: ', err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(cors())

// Rotas da aplicação
const userRoute = require("./routes/userRoute");
const todoRoute = require('./routes/todoRoute');

app.use('/user', userRoute)
app.use('/todo', todoRoute)

// cria erro 404 quando rota não é encontrada
app.use(function(req, res, next) {
  next(createError(404));
});

// Gerenciador de erros (captura erros da aplicação e retorna eles)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const error = {
    statusCode,
    message,
    ...err
  };

  console.log(err)

  res.status(statusCode).json(error)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Servidor rodando na porta ${port}`)})