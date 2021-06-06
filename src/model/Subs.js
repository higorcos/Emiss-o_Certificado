const Sequelize = require('sequelize');
const database = require('../database/db');
const users = require('../model/Users');
const event = require('../model/Event'); 


const subs = database.define('subs',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },credencial: { 
        type: Sequelize.STRING,
        allowNull: false
    }

});
//event_id e user_id 
event.hasMany(subs) //relacinamento 1 para M(muitos) com siquelize
subs.belongsTo(event)//relacinamento 1 para 1 com siquelize

users.hasMany(subs)
subs.belongsTo(users)

subs.sync({force: false})// Vai criar a tabela quando não existir

module.exports = subs