'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'Max Smith',
          password: "123456",
          role: "manager",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
    },  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
