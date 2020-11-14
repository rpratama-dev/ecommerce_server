'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { name: 'Baju Pria', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Baju Wanita', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sepatu Pria', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sepatu Wanita', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tas Wanita', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tas Pria', createdAt: new Date(), updatedAt: new Date() },
    ]
    await queryInterface.bulkInsert('Categories', categories, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
