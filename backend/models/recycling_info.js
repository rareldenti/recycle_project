const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class RecyclingInfo extends Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      clothing_type: {
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
      modelName: 'RecyclingInfo',
      timestamps: true
    });
  }
}

module.exports = RecyclingInfo;
