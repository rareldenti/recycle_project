const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');
const User = require('./user');

class Order extends Model {}

Order.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Order',
  timestamps: true
});

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });
Category.hasMany(Order, { foreignKey: 'category_id' });
Order.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Order;
