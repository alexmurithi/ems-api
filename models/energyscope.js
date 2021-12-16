"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EnergyScope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EnergyScope.init(
    {
      energyId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      scopeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    {
      sequelize,
      modelName: "EnergyScope",
    }
  );
  return EnergyScope;
};
