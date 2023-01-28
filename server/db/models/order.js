'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    waiterName: DataTypes.STRING,
    waiterId: DataTypes.INTEGER,
    tableNumber: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    guests: DataTypes.INTEGER,
    items: DataTypes.TEXT,
    total: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};