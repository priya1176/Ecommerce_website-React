const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path according to your project structure

const Users = sequelize.define('Users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE, 
        allowNull: true 
    }

});

module.exports = Users;
