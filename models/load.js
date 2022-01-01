"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Load extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Load.belongsToMany(models.Scope, { through: "loadScopes" });
    }
  }
  Load.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      powerRatings: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Load",
    }
  );
  return Load;
};
