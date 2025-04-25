
const listaProductos = require("../db/product"); // estas importando una base de datos , con modulo propio 
const homeController = {        
    index: function (req, res) {    // req es la peticion "el usuario rewuiere algo" y res es la respuesta
        let productos= listaProductos.lista;
        res.render("index", {productos: productos })
    }
}


module.exports = homeController; // exportas el controlador para que pueda ser usado en otros archivos