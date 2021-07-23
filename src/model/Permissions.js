const Sequelize = require('sequelize');
const database = require('../database/db');

const permissions = database.define('permissions',{
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
        allowNull: true,
    }
})
permissions.sync({force: false});


module.exports = permissions;