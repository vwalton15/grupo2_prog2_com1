const { DATE } = require("sequelize");
const db = require("../database/models");
let Op = db.Sequelize.Op;

const productController = {
    index: function (_req, res) {
        res.render('products', { products, usuario: usuarioInfo });
    },
    detalle: function (req, res) {
        db.Producto.findByPk(req.params.id, {
            include: [
                {
                    association: 'comentarios',
                    include: [{ association: 'usuario' }]
                },
                {
                    association: 'usuario',
                    include: [{ association: 'comentarios' }]
                },
            ]
        })
            .then(function (Producto) {
                res.render("product", { producto: Producto, usuario: req.session.usuario, })
            })
            .catch(function (error) {
                return res.send(error);
            });
    },

    search: function (req, res) {
        let busqueda = req.query.search;
        console.log('Término de búsqueda:', busqueda);

        if (!busqueda) {
            return res.render('search-results', { productos: [], busqueda: '', usuario: req.session.usuario, message: "Ingrese un término de búsqueda." });
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
            .then(function (productos) {
                let message = "";
                if (productos.length === 0) {
                    message = "No se encontraron productos que coincidan con tu búsqueda.";
                }
                res.render("search-results", { productos: productos, busqueda: busqueda, usuario: req.session.usuario, message });
            })
            .catch(function (err) {
                console.error(err);
                res.render("search-results", {
                    productos: [],
                    busqueda: busqueda || '',
                    usuario: req.session.usuario,
                    message: "No se encontraron productos que coincidan con tu búsqueda."
                });
            })
    },
    cargar: function (req, res) {
        return res.render("cargarP");
    },
    crear: function (req, res) {
        let nuevoProducto= {
            usuario_id: req.session.user.id,
            imagen_producto: req.body.imagen_producto,
            nombre_producto: req.body.nombre_producto,
            descripcion: req.body.descripcion,
            createdAt: new Date(),
            updateAt: new Date(),
        }
        db.Producto.create(nuevoProducto)
        
        .then(function (productoCreado) {
            return res.redirect("/users/profile");
        })
        .catch(function (error) {
            return res.send(error );
        });
    }
    

};



module.exports = productController;


