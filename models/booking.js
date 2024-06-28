const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Product = require('./product');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

User.hasMany(Booking, { foreignKey: 'userId' });
Product.hasMany(Booking, { foreignKey: 'productId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Booking;
