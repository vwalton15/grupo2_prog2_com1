var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');


router.get('/register', userController.register);
router.post('/register', userController.registerProcesamiento);

router.get('/login', userController.mostrarLogin);
router.post('/login', userController.login);

router.get('/logout', userController.logout);
router.get('/search', productController.search); 
router.get('/profile', userController.profile);
router.get("/profile/:id", userController.usuario)


module.exports = router;
