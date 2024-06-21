const sequelize = require('../config/database');
const User = require('./user');
const RecyclingInfo = require('./recycling_info');
const Order = require('./order');
const Category = require('./category');

const models = {
  User,
  RecyclingInfo,
  Order,
  Category
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].init) {
    models[modelName].init(sequelize);
  }
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = sequelize.Sequelize;

module.exports = models;
