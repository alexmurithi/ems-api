"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Energy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Energy.init(
    {
      type: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Energy",
    }
  );
  return Energy;
};
