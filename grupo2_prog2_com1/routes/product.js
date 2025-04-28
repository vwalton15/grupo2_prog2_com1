var express = require('express');
var router = express.Router();
const productController= require('../controllers/productController');

router.get('/',productController.index);  
router.get('/:id', productController.detalle); 
// router.get('/search-results', searchController.resultados);

module.exports = router;


