'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tables',
      [
        {
          number: 101,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 102,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 103,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 104,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 105,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 201,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 202,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 203,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 204,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 205,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 301,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 302,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 303,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 304,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          number: 305,
          waiter_id: null,
          available: true,
          billPrinted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tables', null, {});
  }
};
