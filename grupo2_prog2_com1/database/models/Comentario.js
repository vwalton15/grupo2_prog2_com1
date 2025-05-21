module.exports = function (sequelize, dataTypes) {
    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED,
        },
        comentario: {
            type: dataTypes.INTEGER.TEXT,
        },
        created_at: {
            type: dataTypes.DATE,
        },
        updated_at: {
            type: dataTypes.DATE,
        },
    }
    let config = {
        tableName: "comentarios",
        timestamps: false,
    }
    let Comentario = sequelize.define(alias, cols, config)
    Comentario.associate = function (models) {
        Comentario.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "usuario_id"
        });
        Comentario.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "producto_id"
        });
    }
    return Comentario
}