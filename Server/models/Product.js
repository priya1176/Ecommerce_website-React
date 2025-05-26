const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT, // Use FLOAT for price to accommodate decimal values
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true, // Color is optional
  },
  image: {
    type: DataTypes.STRING, // URL or path to image
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT, // Use TEXT for larger descriptions
    allowNull: true,
  },
  productID: {
    type: DataTypes.STRING,
    unique: true, // Ensure that productID is unique
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default stock quantity
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0, // Default rating
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default is not featured
  },
}, {
  tableName: 'products',
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

module.exports = Product;
