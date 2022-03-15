"use strict";

const faker = require("faker");

const details = [
  { name: "Alex Gitari", regNo: "TLE/1004/17" },
  { name: "Catherine Karimi", regNo: "TLE/1003/17" },
  { name: "Anthony Chemase", regNo: "EC/1002/17" },
  { name: "Japheth Kipkemei", regNo: "EC/1005/17" },
  { name: "Purity Mukongolo", regNo: "TLE/21/13" },
  { name: "Dennis Kurgat", regNo: "EC/1003/17" },
];
const auditors = details.map((detail) => ({
  fullName: detail.name,
  regNo: detail.regNo,
  email: faker.internet.email(),
  password: faker.internet.password(),
  facilityId: 1,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Auditors", auditors);
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
    await queryInterface.bulkDelete("Auditors", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
