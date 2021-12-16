"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoadScope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoadScope.init(
    {
      loadId: { type: DataTypes.INTEGER.UNSIGNED },
      scopeId: { type: DataTypes.INTEGER.UNSIGNED },
      operationalHours: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "LoadScope",
    }
  );
  return LoadScope;
};
