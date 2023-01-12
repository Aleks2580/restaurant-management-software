'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MenuCategory.init({
    name: DataTypes.STRING,
    menuSectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MenuCategory',
  });
  return MenuCategory;
};