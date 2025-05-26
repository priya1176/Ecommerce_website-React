const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Customer = require('./Customer'); // Import the Customer model
const Product = require('./Product'); // Import the Product model


const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer, // Reference the Customer model
            key: 'id',       // Key in the Customer model that we're referencing
        },
    },

    productId: { // Updated to use camelCase for consistency
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Reference the Product model
            key: 'id',      // Key in the Product model that we're referencing
        },
    },

    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

CartItem.belongsTo(Customer, { foreignKey: 'userId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });


module.exports = CartItem;
