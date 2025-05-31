module.exports = function (sequelize, dataTypes) {
    let alias = 'Producto';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: dataTypes.INTEGER,
        },
        imagen_producto: {
            type: dataTypes.TEXT,
        },
        nombre_producto: {
            type: dataTypes.STRING(200),
        },
        descripcion: {
            type: dataTypes.TEXT,
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        },
    }

    let config = {
        tableName: 'productos',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    };
    let Producto = sequelize.define('Producto', cols, config);
    Producto.associate = function (models) {

        Producto.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'usuario_id',
        });
        Producto.hasMany(models.Comentario, {
            as: 'comentarios',
            foreignKey: 'producto_id'
        });
    };
    return Producto;
}
