const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Category extends Model {
  static init(sequelize) {
    return super.init({
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Category',
      timestamps: true
    });
  }
}

module.exports = Category;
