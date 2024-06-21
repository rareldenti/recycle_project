const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init({
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
      }
    }, {
      sequelize,
      modelName: 'User',
      timestamps: true
    });
  }
}

module.exports = User;
