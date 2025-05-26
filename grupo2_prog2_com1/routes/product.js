var express = require('express');
var router = express.Router();
const productController= require('../controllers/productController');

router.get('/',productController.index); 
router.get('/search-results', productController.search); 
router.get('/:id', productController.detalle); 


module.exports = router;


