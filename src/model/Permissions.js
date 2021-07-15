const Sequelize = require('sequelize');
const database = require('../database/db');

const permission = database.define('permission',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false,
    }
})
permission.sync({force: true});


module.exports = permission;