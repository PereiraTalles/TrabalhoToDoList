const router = require('express').Router();
const controller = require('../controllers/userController')

const { validateToken } = require('../middlewares/validateToken')
// Middleware usado pra validar usuário e colocar seus dados na request

// Registra usuário
router.post('/register', controller.register);

// Faz login e retorna um JWT pra autenticação/autorização
router.post('/login', controller.login)

// Lista de usuários existentes
router.get('/list', controller.list)

// Editar usuário (requer autorização, apenas o próprio usuário pode editar seu nome)
router.put('/', validateToken, controller.edit)

// Apaga o usuário autenticado e todas as suas tarefas
router.delete('/', validateToken, controller.delete)

module.exports = router;