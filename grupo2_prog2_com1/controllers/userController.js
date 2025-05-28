const db = require("../database/models");
let op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");

const userController = {
    index: function (req, res) {
        db.Usuario.findAll({
            include: [
                { association: 'productos' },
                { association: 'comentarios' }
            ]
        })
            .then(function (resultados) {
                return res.render("index", { productos: resultados });
            })
            .catch(function (error) {
                return res.send(error);
            });
    },
    mostrarLogin: function (req, res) {
        if (req.session.user) {
            return res.redirect("/users/profile");
        }
        return res.render("login");
    },

    login: function (req, res) {

        let userInfo = {
            email: req.body.email,
            contrasenia: req.body.contrasenia,
            recordarme: req.body.recordarme,
        }
        db.Usuario.findOne({
            where: {
                email: userInfo.email,
            }
        })

            .then(function (user) {
                if (!user) {
                    return res.render("register")
                }

                console.log('Contraseña enviada:', userInfo.contrasenia);
                console.log('Contraseña guardada (hash):', user.contrasenia);

                let validarC = bcryptjs.compareSync(userInfo.contrasenia, user.contrasenia);

                if (!validarC) {
                    return res.send("Contraseña incorrecta");
                }
                req.session.user = user;
                if (userInfo.recordarme) {
                    res.cookie("userEmail", user.email, { maxAge: 120000 });
                }


                return res.redirect("/users/profile");
            })
            .catch(function (err) {
                return res.send(err);
            });

    },
    profile: function (req, res) {
        if (!req.session.user) {
            return res.redirect('/users/login');
        }
        db.Producto.findAll({
            where: { usuario_id: req.session.user.id } 
        })
    
            .then(function (productos) {
                console.log(productos)
                let totalProductos = productos.length;
                return res.render('profile', {
                    usuario: req.session.user,
                    productos: productos,
                    totalProductos: totalProductos
                });
            })
            .catch(function (error) {
                console.log(error);
                return res.render('profile', { usuario: req.session.user, productos: [] }); // fallback
            });
    },


    register: function (req, res) {
        if (req.session.user) {
            return res.redirect("/users/profile");
        }
        return res.render("register", { usuario: {}, errores: {} });
    },

    registerProcesamiento: function (req, res) {
        if (req.session.user) {
            return res.redirect("/users/profile");
        }

        let userInfo = {
            nombreUsuario: req.body.nombreUsuario,
            email: req.body.email,
            contrasenia: req.body.contrasenia,
            fechaNacimiento: req.body.fechaNacimiento,
            DNI: req.body.DNI,
            foto_perfil: req.body.foto_perfil,
        };

        let errores = {};

        if (!userInfo.email) {
            errores.email = "El email es obligatorio.";
        }

        if (!userInfo.contrasenia || userInfo.contrasenia.length < 3) {
            errores.contrasenia = "La contraseña debe tener al menos 3 caracteres.";
        }

        if (!userInfo.nombreUsuario) {
            errores.nombreUsuario = "El nombre de usuario es obligatorio.";
        }

        if (!userInfo.fechaNacimiento) {
            errores.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
        }
        if (Object.keys(errores).length > 0) {
            return res.render("register", { errores: errores, usuario: userInfo });
        }

        db.Usuario.findOne({
            where: {
                email: userInfo.email,
            }
        })
            .then(function (usuarioExistente) {
                if (usuarioExistente) {
                    return res.send("Este email ya está registrado.");
                }

                let nuevoUsuario = {
                    nombre_usuario: userInfo.nombreUsuario,
                    email: userInfo.email,
                    contrasenia: bcryptjs.hashSync(userInfo.contrasenia, 10),
                    fecha_de_nacimiento: userInfo.fechaNacimiento,
                    DNI: userInfo.DNI || null,
                    foto_perfil: userInfo.foto_perfil || null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                db.Usuario.create(nuevoUsuario)
                    .then(function () {
                        return res.redirect("/users/login");
                    })
                    .catch(function (err) {
                        return res.send(err);
                    });

            })
            .catch(function (err) {
                return res.send(err);
            });

    },

    logout: function (req, res) {
        // Destruir la sesión del usuario
        req.session.destroy(function (err) {

            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.redirect('/'); // Redirige al inicio si hay un error
            }
            // redirigir al usuario a la página de inicio
            res.redirect('/');
        });
    }

}

module.exports = userController;