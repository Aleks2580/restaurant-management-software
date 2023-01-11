'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'MenuSections',
      [
        {
          name: 'FOOD',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'DRINKS',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuSections', null, {});
  },
};
