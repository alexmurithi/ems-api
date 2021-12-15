"use strict";

const faker = require("faker");

const scopes = [
  ...Array(
    "Hostel H",
    "Hostel G",
    "LT1",
    "LT2",
    "LT3",
    "Soweto Kitchen",
    "Students Centre"
  ),
].map((scope) => ({
  name: scope,
  noOfOccupants: faker.datatype.number({ max: 10 }),
  facilityId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("scopes", scopes);
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
    await queryInterface.bulkDelete("scopes", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
