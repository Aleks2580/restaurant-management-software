'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MenuSection, MenuCategory }) {
      this.belongsTo(MenuSection, { foreignKey: 'menuSectionId' });
      this.belongsTo(MenuCategory, { foreignKey: 'categoryId' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    menuSectionId: DataTypes.INTEGER,
    priceUSD: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};