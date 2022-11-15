const express = require('express');
const router = express.Router();

const state= require('./blockCRUD');
router.get('/', state.findAll);
router.post('/', state.create);
router.put('/:id', state.update);
router.delete('/:id', state.delete);



module.exports = router;