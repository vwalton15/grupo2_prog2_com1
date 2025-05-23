const productos = require('../db/product');

const productoController = {
    index:function (req, res) { 
        res.render('products', { products , usuario: usuarioInfo  }); 
      },
    detalle: function (req, res) {
        let productoFijo = productos.lista[0]; 
        let usuarioInfo= productos.usuario;
        res.render('product', { producto: productoFijo, usuario: usuarioInfo }); 
    },
    search: function (req, res) {
        const searchTerm = req.query.q; 
        if (!searchTerm) {
            return res.render('searchResults', { products: [], message: "Ingrese un término de búsqueda." });
        }

    
        const resultados = productos.lista.filter(function(producto) {
            return producto.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (resultados.length === 0) {
            return res.render('searchResults', { products: [], message: "No hay resultados para su criterio de búsqueda." });
        }

        res.render('searchResults', { products: resultados, message: null });
    }
};

module.exports = productoController;


