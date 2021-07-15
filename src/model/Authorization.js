const Sequelize = require('sequelize');
const database = require('../database/db');
const Users = require('./Users');
const Permission = require('./Permissions');
 
//tabela de autorização, para contro de acessos as rotas
const Authorization = database.define('authorization',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});
Users.hasMany(Authorization);   //relacionamento 1 para M(muitos) com sequelize
Authorization.belongsTo(Users); //relacionamento 1 para 1 com sequelize

Permission.hasMany(Authorization);
Authorization.belongsTo(Permission);

Authorization.sync({force:false});

module.exports = Authorization;