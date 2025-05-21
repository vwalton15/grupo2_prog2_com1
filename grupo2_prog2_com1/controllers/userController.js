const db = require("../database/models");
let op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");

const userController = {
    index: function (req, res) {
        db.User.findAll({
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
        db.User.findOne({
            where: {
                email: userInfo.email,
            }
        })
        .then(function(user) {
            if (!user) {
                return res.send("Email no registrado");
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
        res.render("register")
    },
}

module.exports = userController;