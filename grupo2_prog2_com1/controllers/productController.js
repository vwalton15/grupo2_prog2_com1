const { DATE } = require("sequelize");
const db = require("../database/models");
let Op = db.Sequelize.Op;

const productController = {
    index: function (req, res) {
        db.Producto.findAll({
            include: [ {
                association: 'usuario'
              },
              {
                association: 'comentarios',
                include: ['usuario']
              }]
        })
        .then(function(products) {
            res.render('products', {
                products: products,
                usuario: null 
            });
        })
        .catch(function(error) {
            console.error(error);
            res.send(error);
        });
    },
    detalle: function (req, res) {
        db.Producto.findByPk(req.params.id, {
        include: [
            {
                association: 'comentarios',
                include: ['usuario'],
                separate: true,
                order: [['createdAt', 'DESC']],
            },
            {
                association: 'usuario'
            }
        ]
        })
        .then(function (Producto) {
            if (!Producto) {
                return res.send("Producto no encontrado");
            }
    
            res.render("product", {
                producto: Producto,
                cargado: Producto.usuario,     // usuario que lo cargó
                usuario: req.session.user || null // usuario logueado (para el header, si hace falta)
            });
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
    },
    comentario: function (req,res){
        let usuario = req.session.user;
        if (!usuario){
            return res.redirect("/users/login");
        }
        let comentarioNuevo ={
            usuario_id: usuario.id,
            producto_id: req.params.id,
            comentario: req.body.comentario,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        db.Comentario.create(comentarioNuevo)
        .then(function(){
            let productoId = req.params.id;
            return res.redirect("/products/" + productoId);
        })
        .catch(function (error) {
            return res.send(error);
        });
    }    

};



module.exports = productController;


