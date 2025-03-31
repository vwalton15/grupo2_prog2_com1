var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.get('/register', userController.register);
router.get('/login', userController.login);
router.post('/register', userController.processRegister);
router.post('/login', userController.processLogin);

module.exports = router;
