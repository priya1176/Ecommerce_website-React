const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,  
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false,  
  },
}, {
  tableName: 'customers',
  timestamps: true,
});

module.exports = Customer;
