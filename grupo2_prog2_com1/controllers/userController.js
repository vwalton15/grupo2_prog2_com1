const usuario = require("../db/product");
const listaProductos = require("../db/product");

const userController = {
    login: function (req, res) {
        res.render("login")
    },
    register: function (req, res) {
        res.render("register")
    },
    perfil: function (req, res) {
        let usuarioLogueado = usuario.usuario;
        let productos= listaProductos.lista;
        res.render("profile", { usuario: usuarioLogueado , productos: productos})
    }
}

module.exports = userController;