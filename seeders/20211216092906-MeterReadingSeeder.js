"use strict";

const faker = require("faker");

const details = [
  {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
  },
  {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
  },
  {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
  },
];

const readings = details.map((reading) => ({
  startDate: reading.startDate,
  endDate: reading.endDate,
  consumption: faker.datatype.float(),
  month: faker.date.month(),
  facilityId: 1,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("MeterReadings", readings);
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
    await queryInterface.bulkDelete("MeterReadings", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
