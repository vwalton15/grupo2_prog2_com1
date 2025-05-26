const db = require("../database/models");
let Op = db.Sequelize.Op;

const productController = {
    index:function (req, res) { 
        res.render('products', { products , usuario: usuarioInfo  }); 
      },
    detalle: function (req, res) {
       db.Producto.findByPk(req.params.id)
       .then(function(Producto){
        res.render("product", {producto: Producto})
       })
    },

    search: function (req, res) {
        let busqueda = req.query.search;
        console.log('Término de búsqueda:', busqueda);
    
        if (!busqueda) {
            return res.render('search-results', { producto: [], message: "Ingrese un término de búsqueda." });
        }
    
        db.Producto.findAll({
            where: {
                nombre_producto: {
                    [Op.like]: "%" + busqueda + "%"
                }
            },
            include: [
                { 
                    model: db.Usuario, 
                    as: 'usuario' 
                }
            ]
        })
        .then(function(productos) {
            res.render("search-results", {productos: productos, busqueda:busqueda});
        })
        .catch(function(err) {
            console.error(err);
            res.render("search-results", { productos: []});
        })
    }
        
    };


module.exports = productController;


