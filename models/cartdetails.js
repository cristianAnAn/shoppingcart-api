'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartDetails extends Model {
    static associate(models) {
      CartDetails.belongsTo(models.CartHeader, {
        foreignKey: 'CartHeaderId',
        as: 'CartHeader'
      });
    }
  }
  CartDetails.init({
    CartDetailsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    CartHeaderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartDetails',
    tableName: 'CartDetails'
  });
  return CartDetails;
};
