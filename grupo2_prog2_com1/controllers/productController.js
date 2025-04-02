const productos = require('../db/product');

const productoController = {
    detalle: function (req, res) {
        let productoFijo = productos.lista[0]; // esto mientra sea estatico
        res.render('product', { producto: productoFijo });
    }
};

module.exports = productoController;
