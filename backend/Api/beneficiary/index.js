const express = require('express');
const router = express.Router();

const beneficiary = require('./beneficiaryCRUD');
router.get('/', beneficiary.findAll);
router.post('/', beneficiary.create);
router.put('/:id', beneficiary.update);
router.delete('/:id', beneficiary.delete);



module.exports = router;