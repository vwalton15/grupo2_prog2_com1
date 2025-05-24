var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.get('/register', userController.register);
router.get('/login', userController.login);
router.get('/profile', userController.perfil);
router.get('/logout', userController.logout);

router.get('/search', productController.search); 


module.exports = router;
