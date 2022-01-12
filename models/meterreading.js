"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MeterReading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MeterReading.belongsTo(models.Facility);
    }
  }
  MeterReading.init(
    {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: true },
      },
      month: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.INTEGER, allowNull: false },
      consumption: { type: DataTypes.FLOAT, allowNull: false },
      facilityId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    {
      sequelize,
      modelName: "MeterReading",
    }
  );
  return MeterReading;
};
