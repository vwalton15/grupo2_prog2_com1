const productos = require('../db/product');

const productoController = {
    index:function (req, res) {
        res.render('products', { products });
      },
    detalle: function (req, res) {
        let productoFijo = productos.lista[0]; // esto mientra sea estatico
        res.render('product', { producto: productoFijo });
    }
};

module.exports = productoController;
