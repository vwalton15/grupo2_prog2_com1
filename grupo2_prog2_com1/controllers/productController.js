const productos = require('../db/product');

const productoController = {
    index:function (req, res) { 
        res.render('products', { products , usuario: usuarioInfo  }); // manda una vuista completa al navegador, usando el motor de plantillas ejs
        // el primer parametro es la vista que quiero renderizar y el segundo es un objeto que contiene los datos que quiero pasar a la vista
      },
    detalle: function (req, res) {
        let productoFijo = productos.lista[0]; // esto mientra sea estatico
        let usuarioInfo= productos.usuario;
        res.render('product', { producto: productoFijo, usuario: usuarioInfo }); // lo uso cuando quiero mostrar una pagina web armada con datos dinamicos 
    },
};

module.exports = productoController;
