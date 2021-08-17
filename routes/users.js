const express = require('express');
const router = express.Router();
const alunoController = require('../controller/alunoController')

/* GET users listing. */
router.get('/', alunoController.index);
router.get('/ver/:id', alunoController.findByID);

router.get('/search',alunoController.search);
router.get('/cadastro',alunoController.create);
router.post('/cadastro',alunoController.store);
router.get('/editar/:id',alunoController.edit);
router.put('/editar/:id',alunoController.update);
router.get('/importarLista',alunoController.bulkCreate);
router.delete('/deletar/:id',alunoController.destroy);


module.exports = router;
