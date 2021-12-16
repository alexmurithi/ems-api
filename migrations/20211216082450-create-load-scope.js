"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("LoadScopes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      loadId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      scopeId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      operationalHours: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("LoadScopes");
  },
};
