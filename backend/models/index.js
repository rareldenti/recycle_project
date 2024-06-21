const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Order = require('./order');

// 初始化模型
User.init({
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});

Order.init({
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Order',
  timestamps: true
});

// 设置模型之间的关系
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

const db = {
  User,
  Order,
  sequelize,
  Sequelize
};

module.exports = db;
