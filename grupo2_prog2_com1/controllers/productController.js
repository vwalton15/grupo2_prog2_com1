const productos = require('../db/product');

const productoController = {
    index:function (req, res) {
        res.render('products', { products , usuario: usuarioInfo  });
      },
    detalle: function (req, res) {
        let productoFijo = productos.lista[0]; // esto mientra sea estatico
        let usuarioInfo= productos.usuario;
        res.render('product', { producto: productoFijo, usuario: usuarioInfo });
    },
};

module.exports = productoController;
