const db = require("../database/models");

const homeController = {        
    index: function (req, res) {
            db.Producto.findAll({
            include:[
                {association: 'comentarios',
                    include: [{association: 'usuario'}]
                }, 
                {association: 'usuario',
                    include: [{association: 'comentarios'}]
                },   
            ]
            })
            .then(function(resultados){
                    return res.render("index", {productos: resultados}, );
                })
                .catch(function(error){
                    return res.send(error);
                });
    }
}


module.exports = homeController; 