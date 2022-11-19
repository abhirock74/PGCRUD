const express = require('express');
const router = express.Router();


const users = require('./userCRUD');

router.post('/', users.create);
router.get('/', users.findAll);
router.put('/:id', users.update);
router.delete('/:id', users.delete);



module.exports = router;