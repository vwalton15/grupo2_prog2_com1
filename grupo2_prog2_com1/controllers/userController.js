const db = require("../database/models");
let op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");

const userController = {
    index: function (req, res) {
        db.Usuario.findAll({
        include:[
            {association: 'productos'},
            {association: 'comentarios'}
        ]
        })
        .then(function(resultados){
                return res.render("index", {productos: resultados});
            })
            .catch(function(error){
                return res.send(error);
            });
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
        .then(function(user) {
            if (!user) {
                return res.render("register")
            }

            let validarC = bcryptjs.compareSync(userInfo.contrasenia, user.contrasenia);
            if (!validarC) {
                return res.send("Contraseña incorrecta");
            }
            req.session.user = user;

            if (recordarme) {
                res.cookie("user", user, { maxAge: 60000 }); 
            }

            return res.redirect("/profile"); 
        })
        .catch(function(err) {
            return res.send(err);
        });
    },
    register: function (req, res) {
        if (req.session.user) {
            return res.redirect("/profile");
        }
        return res.render("register");
    },
    
    registerProcesamiento: function (req, res) {
        if (req.session.user) {
            return res.redirect("/profile");
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
                return res.redirect("/login");
            })
            .catch(function (err) {
                return res.send(err);
            });
    
        })
        .catch(function (err) {
            return res.send(err);
        });
    },
    
}

module.exports = userController;