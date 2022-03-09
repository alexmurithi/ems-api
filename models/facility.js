"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Facility.hasMany(models.Scope);
      Facility.hasMany(models.Auditor, { onUpdate: "CASCADE" });
      Facility.hasMany(models.MeterReading, { onUpdate: "CASCADE" });
    }
  }
  Facility.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      meterNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};
