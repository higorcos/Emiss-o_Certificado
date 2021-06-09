const Sequelize = require('sequelize');
const database = require('../database/db')

const users = database.define('users',{
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
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: { 
        type: Sequelize.STRING,
        allowNull: false
    }

})
users.sync({force: false})// Vai criar a tabela quando não existir

module.exports = users