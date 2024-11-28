const router = require('express').Router();
const controller = require('../controllers/todoController');
const { validateToken } = require("../middlewares/validateToken"); 

// Todas as rotas requerem autenticação

// Retorna a lista das todos do usuário autenticado
router.get('/list', validateToken, controller.list);

// Criar uma nova todo (requer autenticação)
router.post('/', validateToken, controller.create)

// Editar uma todo de ID específico 
router.put('/:todoId', validateToken, controller.edit)

// Marcar uma todo como completa ou incompleta
router.put('/:todoId/done', validateToken, controller.toggleDone)

// Deletar todo de ID específico
router.delete('/:todoId', validateToken, controller.delete)

module.exports = router;