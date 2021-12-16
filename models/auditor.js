"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auditor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Auditor.belongsTo(models.Facility);
    }
  }
  Auditor.init(
    {
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      regNo: DataTypes.STRING,
      fullName: { type: DataTypes.STRING, allowNull: false },
      facilityId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    {
      sequelize,
      modelName: "Auditor",
    }
  );
  return Auditor;
};
