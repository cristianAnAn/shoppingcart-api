'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartHeader extends Model {
    static associate(models) {
      CartHeader.hasMany(models.CartDetails, {
        foreignKey: 'CartHeaderId',
        as: 'CartDetails'
      });
    }
  }
  CartHeader.init({
    CartHeaderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserId: DataTypes.STRING,
    CouponCode: DataTypes.STRING,
    Discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    CartTotal: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'CartHeader',
    tableName: 'CartHeaders'
  });
  return CartHeader;
};
