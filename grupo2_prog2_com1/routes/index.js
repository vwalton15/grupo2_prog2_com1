var express = require('express'); // traes al modulo expres que va a traer metoodos para definir rutas
var router = express.Router(); // crea un router para definir rutas
const homeController = require('../controllers/homeController');  // importas el controlador de la carpeta controllers, lo requerimos para poder usar las variables y funciones que tiene



router.get('/', homeController.index); // define la ruta de la pagina principal y le asigna el controlador homeController.index


module.exports = router; // exporta el router para que pueda ser usado en otros archivos

// las rutas le dicen al servidor que hacer cuando entran a un servidor desde una url, y el controlador es el que se encarga de hacer la logica de la aplicacion, es decir, de procesar los datos y devolver una respuesta al cliente.
