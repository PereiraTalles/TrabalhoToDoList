require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function validateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do header

    if (!token) {
        return res.status(401).json({ message: 'Autenticação é requerida' });
    }

    try {
        // Decodifica e verifica o token
        const userData = jwt.verify(token, process.env.SECRET);

        // Busca o usuário no banco de dados
        const usuario = await User.findById(userData.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        req.user = usuario; // Anexa as informações do usuário à requisição
        next(); // Prossegue para o próximo middleware/rota
    } catch (err) {
        console.error('Erro ao validar o token:', err.message);
        return res.status(400).json({ message: 'Token inválido ou expirado' });
    }
}

module.exports = { validateToken };
