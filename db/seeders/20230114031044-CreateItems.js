'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          name: 'Caesar',
          categoryId: 1,
          menuSectionId: 1,
          priceUSD: 16.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Selat solo',
          categoryId: 1,
          menuSectionId: 1,
          priceUSD: 12.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cucumber salad',
          categoryId: 1,
          menuSectionId: 1,
          priceUSD: 9.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ensalada',
          categoryId: 1,
          menuSectionId: 1,
          priceUSD: 17.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tomato Soup',
          categoryId: 2,
          menuSectionId: 1,
          priceUSD: 8.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sancocho',
          categoryId: 2,
          menuSectionId: 1,
          priceUSD: 11.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Chicken Pho',
          categoryId: 2,
          menuSectionId: 1,
          priceUSD: 15.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Rawon',
          categoryId: 2,
          menuSectionId: 1,
          priceUSD: 14.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lasagna',
          categoryId: 3,
          menuSectionId: 1,
          priceUSD: 25.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cross Rib Roast',
          categoryId: 3,
          menuSectionId: 1,
          priceUSD: 39.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pork Lo Mein',
          categoryId: 3,
          menuSectionId: 1,
          priceUSD: 30.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fried Turkey',
          categoryId: 3,
          menuSectionId: 1,
          priceUSD: 31.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Margherita',
          categoryId: 4,
          menuSectionId: 1,
          priceUSD: 28.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Marinara',
          categoryId: 4,
          menuSectionId: 1,
          priceUSD: 31.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Carbonara',
          categoryId: 4,
          menuSectionId: 1,
          priceUSD: 37.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Montanara',
          categoryId: 4,
          menuSectionId: 1,
          priceUSD: 45.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Red Velver',
          categoryId: 5,
          menuSectionId: 1,
          priceUSD: 12.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tiramisu',
          categoryId: 5,
          menuSectionId: 1,
          priceUSD: 9.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Honey Cake',
          categoryId: 5,
          menuSectionId: 1,
          priceUSD: 12.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lava Cake',
          categoryId: 5,
          menuSectionId: 1,
          priceUSD: 15.90,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'English Breakfast',
          categoryId: 6,
          menuSectionId: 2,
          priceUSD: 6.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Oolong',
          categoryId: 6,
          menuSectionId: 2,
          priceUSD: 7.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Red Tea',
          categoryId: 6,
          menuSectionId: 2,
          priceUSD: 5.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jasmine Tea',
          categoryId: 6,
          menuSectionId: 2,
          priceUSD: 4.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Americano',
          categoryId: 7,
          menuSectionId: 2,
          priceUSD: 4.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Latte',
          categoryId: 7,
          menuSectionId: 2,
          priceUSD: 7.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cappuccino',
          categoryId: 7,
          menuSectionId: 2,
          priceUSD: 8.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Espresso',
          categoryId: 7,
          menuSectionId: 2,
          priceUSD: 3.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gin Tonic',
          categoryId: 8,
          menuSectionId: 2,
          priceUSD: 15.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Vodka Soda',
          categoryId: 8,
          menuSectionId: 2,
          priceUSD: 13.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Long Island',
          categoryId: 8,
          menuSectionId: 2,
          priceUSD: 23.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Aperol',
          categoryId: 8,
          menuSectionId: 2,
          priceUSD: 20.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Coke',
          categoryId: 9,
          menuSectionId: 2,
          priceUSD: 5.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '7up',
          categoryId: 9,
          menuSectionId: 2,
          priceUSD: 5.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mirinda',
          categoryId: 9,
          menuSectionId: 2,
          priceUSD: 5.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Coke Zero',
          categoryId: 9,
          menuSectionId: 2,
          priceUSD: 5.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Amarone',
          categoryId: 10,
          menuSectionId: 2,
          priceUSD: 115.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lambrusco',
          categoryId: 10,
          menuSectionId: 2,
          priceUSD: 130.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Chablis',
          categoryId: 10,
          menuSectionId: 2,
          priceUSD: 95.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Marsala',
          categoryId: 10,
          menuSectionId: 2,
          priceUSD: 125.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
