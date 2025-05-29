var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/cargar', productController.cargar);
router.post('/cargar', productController.crear);

router.get('/', productController.index);
router.get('/search-results', productController.search);
router.get('/:id', productController.detalle);
router.post("/comentario/:id", productController.comentario)

module.exports = router;


