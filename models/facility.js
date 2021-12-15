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
    }
  }
  Facility.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      meterNo: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};
