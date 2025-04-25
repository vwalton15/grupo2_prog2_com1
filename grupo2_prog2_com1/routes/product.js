var express = require('express');
var router = express.Router();
const productController= require('../controllers/productController');

router.get('/',productController.index);  // router para la pagina principal,  con el get le digo que me voy a comunacar con el servidor a traves de la url para que me muestre la pagina de productos
router.get('/:id', productController.detalle); // primer parameto string y el segundo es el id del producto, el id es un parametro que se le pasa a la url para que el servidor lo reconozca y me muestre el producto que quiero ver
// router.get('/search-results', searchController.resultados);

module.exports = router;

// las rutas le dicen al servidor que hacer cuando entran a un servidor desde una url, y el controlador es el que se encarga de hacer la logica de la aplicacion, es decir, de procesar los datos y devolver una respuesta al cliente.
// get es un metodo de http que se usa para obtener datos de un servidor, y post es un metodo que se usa para enviar datos a un servidor.

