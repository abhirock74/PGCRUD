const express = require('express');
const router = express.Router();

const login = require('./users/login');
const users= require('./users/userCRUD');
router.post('/login', login);
router.post('/register', users.create);

router.use(require('./users/verifyToken')); // token verify hear


router.use('/users', require('./users'));
router.use('/state', require('./State'));
router.use('/district' , require('./District'));
router.use('/block' , require('./block'));
router.use('/village', require('./village'));
router.use('/beneficiary' , require('./beneficiary'));
router.use('/role', require('./role'));






module.exports = router;