const mongoose = require('mongoose');

// Define o schema do usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // O email precisa ser único
  },
  senha: {
    type: String,
    required: true,
  },
});

// Cria o modelo do usuário a partir do schema
const User = mongoose.model('User', userSchema);

module.exports = User;
