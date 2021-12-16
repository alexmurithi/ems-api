"use strict";

const faker = require("faker");

const details = [
  {
    loadId: Math.floor(Math.random() * 5) + 1,
    scopeId: Math.floor(Math.random() * 7) + 1,
    operationalHours: faker.datatype.number({ max: 24 }),
  },
  {
    loadId: Math.floor(Math.random() * 5) + 1,
    scopeId: Math.floor(Math.random() * 7) + 1,
    operationalHours: faker.datatype.number({ max: 24 }),
  },
  {
    loadId: Math.floor(Math.random() * 5) + 1,
    scopeId: Math.floor(Math.random() * 7) + 1,
    operationalHours: faker.datatype.number({ max: 24 }),
  },
  {
    loadId: Math.floor(Math.random() * 5) + 1,
    scopeId: Math.floor(Math.random() * 7) + 1,
    operationalHours: faker.datatype.number({ max: 24 }),
  },
];

const lScopes = details.map((lScope) => ({
  loadId: lScope.loadId,
  scopeId: lScope.loadId,
  operationalHours: lScope.operationalHours,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("LoadScopes", lScopes);
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
    await queryInterface.bulkDelete("LoadScopes", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
