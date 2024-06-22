const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Order = require('./order');
const Category = require('./category');

const db = {
  User,
  Order,
  Category,
  sequelize,
  Sequelize
};

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

Category.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Category',
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
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Categories',
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
Category.hasMany(Order, { foreignKey: 'category_id' });
Order.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = db;
