const Sequelize = require('sequelize');
const database = require('../database/db');
const users = require('../model/Users'); 


const event = database.define('event',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    hours:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    organization:{
        type: Sequelize.STRING,
        allowNull: false
    }

});
//users.hasMany(event) //relacinamento 1 para M(muitos) com siquelize
//event.belongTo(users)//relacinamento 1 para 1 com siquelize

event.sync({force: false})// Vai criar a tabela quando não existir

module.exports = event