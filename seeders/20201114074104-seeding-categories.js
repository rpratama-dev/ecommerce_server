'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { name: 'Pakaian Pria', type: 'product', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pakaian Anak', type: 'product', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pakaian Wanita', type: 'product', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Baju Pria', type: 'product', createdAt: new Date(), updatedAt: new Date() },
      { name: 'November Ceria', type: 'banner', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Happy New Year', type: 'banner', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Desember Ceria', type: 'banner', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gajian Happy', type: 'banner', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Payday', type: 'banner', createdAt: new Date(), updatedAt: new Date() },
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
