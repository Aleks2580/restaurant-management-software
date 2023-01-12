'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'MenuCategories',
      [
        {
          name: 'Salads',
          menuSectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Soups',
          menuSectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Main',
          menuSectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pizza',
          menuSectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Desserts',
          menuSectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tea',
          menuSectionId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Coffee',
          menuSectionId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cocktails',
          menuSectionId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Soft drinks',
          menuSectionId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Wine',
          menuSectionId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuCategories', null, {});
  },
};
