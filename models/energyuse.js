'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnergyUse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EnergyUse.init({
    energyId: DataTypes.INTEGER,
    loadId: DataTypes.INTEGER,
    scopeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EnergyUse',
  });
  return EnergyUse;
};