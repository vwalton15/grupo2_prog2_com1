module.exports = function(sequelize, dataTypes) {

    let alias = 'Usuario';

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email:{
            type: dataTypes.STRING(500),
        },
        contrasenia:{
            type: dataTypes.STRING(200),
        },
        fecha_de_nacimiento:{
            type: dataTypes.DATE,
        },
        DNI:{
            type: dataTypes.INTEGER.UNSIGNED,
        },
        foto_perfil:{
            type: dataTypes.TEXT
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: true,
        underscored: true
    }

    const Usuario = sequelize.define(alias,cols,config);

    return Usuario;
}