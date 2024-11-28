require('dotenv').config();
require('mongoose')

const { validateInputs } = require('../middlewares/validateInputs');
const Todo = require("../models/todo");
const User = require('../models/user')

const { body } = require('express-validator');

exports.list = async(req, res, next) => {
    try {
        const todos = await Todo.find({author: req.user.id})

        return res.status(200).json(todos)
    } catch (err) {
        next(err)
    }
}

exports.create = [
    body('title')
        .isString()
        .withMessage('Título precisa ser uma string'),

    body('description')
        .optional()
        .isString()
        .withMessage('Descrição precisa ser uma string'),

    validateInputs,

    async (req, res, next) => {
        try {
            const todo = await Todo.create({
                title: req.body.title,
                description: req.body.description,
                author: req.user.id
            });

            const user = await User.findById(req.user.id);

            user.todos.push(todo);
            await user.save();

            return res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }
];


exports.edit = [
    body('title')
    .isString()
    .withMessage('Título precisa ser string')
    .trim(),

    body('description')
    .optional()
    .isString()
    .withMessage('Descrição precisa ser string')
    .trim(),

    validateInputs,

    async(req, res, next) => {
        try {
            const todoToBeEdited = await Todo.findById(req.params.todoId)

            if (!todoToBeEdited.author.equals(req.user.id)) {
                return res.status(403).json({message: 'Proibido editar uma todo alheia'})
            }

            const todo = await Todo.findByIdAndUpdate(req.params.todoId, {...req.body}, {new: true})

            return res.status(200).json(todo);
        } catch (err) {
            next(err)
        }
    }
]

exports.delete = async(req, res, next) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.todoId,
            author: req.user.id
        });

        if (!todo) {
            return res.status(403).json({message: 'Proibido deletar uma todo alheia ou todo não encontrada'});
        }

        res.status(200).json({message: 'Todo apagada', todo});
    } catch (err) {
        next(err)
    }
}

exports.toggleDone = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.todoId);

        // Alterna o valor de done para ser o oposto
        todo.done = !todo.done;
        await todo.save();

        return res.status(200).json({ message: `Todo ${todo.done ? 'completa' : 'incompleta'}`, todo });
    } catch (err) {
        next(err);
    }
};

exports.clear = async (req, res, next) => {
    try {
        await Todo.deleteMany({author: req.user.id})

        return res.status(200);
    } catch (err) {
        next(err)
    }
}