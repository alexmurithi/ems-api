"use strict";
const faker = require("faker");

const loads = [
  ...Array(
    "Lighting Bulb",
    "Study Bulb",
    "Electric Kettle",
    "SmartPhone",
    "Laptop"
  ),
].map((load) => ({
  name: load,
  powerRatings: faker.datatype.float(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Loads", loads);
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
    await queryInterface.bulkDelete("Loads", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
