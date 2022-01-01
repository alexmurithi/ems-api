"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Scope.belongsTo(models.Facility);
      Scope.belongsToMany(models.Load, { through: "loadScopes" });
    }
  }
  Scope.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      noOfOccupants: { type: DataTypes.INTEGER },
      facilityId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Scope",
    }
  );
  return Scope;
};
