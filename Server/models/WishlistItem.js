const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Customer = require('./Customer'); // Import the Customer model


const WishlistItem = sequelize.define('WishlistItem', {
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});
WishlistItem.belongsTo(Customer, { foreignKey: 'userId' });

module.exports = WishlistItem;
