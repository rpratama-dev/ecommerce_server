'use strict';

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = [{
      fullname: "Admin CMS",
      email: "admin@mail.com",
      password: hashPassword("admin123"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullname: "Customer",
      email: "customer@mail.com",
      password: hashPassword("customer123"),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert("Users", admin, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
