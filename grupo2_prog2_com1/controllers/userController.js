const usuario = require("../db/infoUsuarios");

const userController= {
    login: function (req,res) {
        res.render("login")
    },
    register: function (req,res) {
        res.render("register")
    },
    perfil: function (req,res) {
        let usuarioLogueado = usuario.usuario;
        res.render("profile", {usuario: usuarioLogueado})
    }
}
module.exports = userController;