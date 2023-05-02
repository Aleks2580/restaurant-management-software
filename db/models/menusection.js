'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MenuCategory, Item }) {
      this.hasMany(MenuCategory, { foreignKey: 'menuSectionId' });
      this.hasMany(Item, { foreignKey: 'menuSectionId' });
    }
  }
  MenuSection.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MenuSection',
  });
  return MenuSection;
};