const express = require('express');
const router = express.Router();

const role= require('./roleCrud');
router.get('/', role.findAll);
router.post('/', role.create);
router.put('/:id', role.update);
router.delete('/:id', role.delete);



module.exports = router;