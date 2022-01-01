"use strict";

const faker = require("faker");

const details = [
  {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
    month: faker.date.month(),
  },
  {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
    month: faker.date.month(),
  },
  {
    startDate: faker.date.past(),
    endDate: faker.date.recent(),
    month: faker.date.month(),
  },
];

const billings = details.map((billing) => ({
  startDate: billing.startDate,
  endDate: billing.endDate,
  month: billing.month,
  amountPaid: faker.finance.amount(),
  totalConsumption: faker.datatype.float(),
  facilityId: 1,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("BillingRecords", billings);
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
    await queryInterface.bulkDelete("BillingRecords", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
