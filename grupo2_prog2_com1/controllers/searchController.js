const searchController = {
    resultados: function (req, res) {
        const termino = req.query.search

        const resultados = [
            { nombre: "Producto 1", descripcion: "Descripción del producto 1" },
            { nombre: "Producto 2", descripcion: "Descripción del producto 2" },
            { nombre: "Producto 3", descripcion: "Descripción del producto 3" }
        ];

        res.render('searchResults', { resultados, termino });
    }
}


module.exports = searchController;