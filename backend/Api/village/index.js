const express = require('express');
const router = express.Router();

const village = require('./villageCRUD');
router.get('/', village.findAll);
router.post('/', village.create);
router.put('/:id', village.update);
router.delete('/:id', village.delete);



module.exports = router;