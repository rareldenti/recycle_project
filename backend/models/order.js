const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Order extends Model {
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
      recycling_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'RecyclingInfos',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending'
      }
    }, {
      sequelize,
      modelName: 'Order',
      timestamps: true
    });
  }
}

module.exports = Order;
