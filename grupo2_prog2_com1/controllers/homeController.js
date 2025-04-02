
const listaProductos = require("../db/product");
const homeController = {
    index: function (req, res) {
        let productos= listaProductos.lista;
        res.render("index", {productos: productos })
    }
}


module.exports = homeController;