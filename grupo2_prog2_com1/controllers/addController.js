const usuario = require ("../db/infoUsuarios");

const agregarProducto = {
    agregarProducto: function (req, res) {
        let usuarioLogueado = usuario.usuario;
        res.render("agregarProducto", {usuarioLogueado});
    }
}
module.exports = agregarProducto;