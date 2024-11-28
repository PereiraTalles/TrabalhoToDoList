require('dotenv').config()
const jwt = require('jsonwebtoken')

function validateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        const error = new Error('Autenticação é requirida')
        error.statusCode = 401;
        throw error;
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            const error = new Error('Erro ao verificar token')
            error.statusCode = 400;
            throw error;
        }
        
        req.user = user; // attach decoded user info to the request
        next();
    });
}

module.exports = { validateToken }