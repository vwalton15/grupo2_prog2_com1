module.exports = function (sequelize, dataTypes) {

    let alias = 'Usuario';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING(500),
        },
        contrasenia: {
            type: dataTypes.STRING(200),
        },
        fecha_de_nacimiento: {
            type: dataTypes.DATE,
        },
        DNI: {
            type: dataTypes.INTEGER,
        },
        foto_perfil: {
            type: dataTypes.TEXT
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: true,
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'usuario_id'
        });
        Usuario.hasMany(models.Comentario, {
            as: 'comentarios',
            foreignKey: 'usuario_id'
        });
    }
    return Usuario;
}