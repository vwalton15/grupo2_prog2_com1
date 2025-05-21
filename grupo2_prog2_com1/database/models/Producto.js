module.exports = function (sequelize, dataTypes) {
    let alias = 'Producto'; // Nombre de la tabla en plural

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        imagen_producto: {
            type: DataTypes.TEXT,
        },
        nombre_producto: {
            type: DataTypes.STRING(200),
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        creat_at: {
            type: DataTypes.DATE,
        },
        update_at: {
            type: DataTypes.DATE,
        },
    }

    let config = {
        tableName: 'productos',
        timestamps: false,
    };
    let Producto = sequelize.define('Producto', attributes, config);
    Producto.associate = function (models) {
        
        Producto.belongsTo(models.Usuario, {
            as: 'usuario', 
            foreignKey: 'usuario_id' ,
        });
        Producto.hasMany(models.Comentario, {
            as: 'comentarios', 
            foreignKey: 'producto_id' 
        });
    };
    return Producto;
}
