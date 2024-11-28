require('dotenv').config();
require('mongoose')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Todo = require('../models/todo');

const { body } = require('express-validator');

const { validateInputs } = require('../middlewares/validateInputs');
// Middleware para retornar erro se houver algum dado inválido na entrada de usuário

exports.register = [
    // Validar entradas do usuário com express validator
    body('name')
    .isString()
    .withMessage('Nome de usuário precisa ser uma string')
    .trim()
    .custom(async (value) => {
        const user = await User.findOne({name: value})
        if (user) {
            throw new Error('Nome de usuário indisponível, por favor tentar outro.')
        } 
    }),

    body('email')
    .isEmail()
    .withMessage('E-mail inválido')
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('E-mail já cadastrado');
        }
    }),

    body('password')
    .isString()
    .withMessage('Senha precisa ser uma string'),

    validateInputs,

    async(req, res, next) => {
        try {
            const hash = await bcrypt.hash(req.body.password, 10);
            // adiciona criptografia à senha (LGPD)
    
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
    
            await user.save();

            return res.status(200).json({message: `Usuário ${user.name} criado com sucesso`})
        } catch (err) {
            next(err) // envia erros ao gerenciador de erros do app.js
        }
    }
]

exports.login = [
    body('email')
    .isEmail()
    .withMessage('E-mail inválido'),

    body('password')
    .isString()
    .withMessage('Senha precisa ser uma string')
    .custom(async (value, {req}) => {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return false;
        }

        const match = await bcrypt.compare(value, user.password);
        // verifica se senha está correta

        if (!match) { throw new Error('Senha incorreta, por favor tentar novamente')}
    }),

    validateInputs,

    async(req, res, next) => {
        try {
            const user = await User.findOne({email: req.body.email}).select('-password');
            // dados do usuário, omitindo a senha hasheada por segurança

            const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '30d'});
            // json web token utilizado pra gerenciar autenticação/autorização do site, vence em 30 dias
            // ele é usado nas requests http num header 'Authorization' com valor 'Bearer [token]'

            return res.status(200).json({
                msg: `Logado com sucesso! Token vence em 30 dias`,
                token,
                user
            })
        } catch (err) {
            next(err);
        }
    }
]

exports.list = async(req, res, next) => {
    try {
        const users = await User.find().select('-password -todos');
        // Omite ambas as senhas e os todos de usuários (privacidade)

        return res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

exports.edit = [
    body('name')
    .isString()
    .withMessage('Nome de usuário precisa ser uma string')
    .trim()
    .custom(async (value) => {
        const user = await User.findOne({name: value})
        if (user) {
            throw new Error('Nome de usuário indisponível, por favor tentar outro.')
        } 
    }),

    validateInputs,

    async(req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.user.id, {
                name: req.body.name
            }, {new: true}).select('-password')
            
            return res.status(200).json({message: 'Usuário atualizado', user})
        } catch (err) {
            next(err)
        }
    }
]

exports.delete = async(req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id).select('-password')
        await Todo.deleteMany({author: req.user.id})

        return res.status(200).json({message: 'Usuário apagado', user})
    } catch (err) {
        next(err)
    }
}