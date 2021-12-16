"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillingRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillingRecord.init(
    {
      month: { type: DataTypes.STRING },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDATE: { type: DataTypes.DATE, allowNull: false },
      totalConsumption: { type: DataTypes.FLOAT, allowNull: false },
      amountPaid: { type: DataTypes.FLOAT, allowNull: false },
      facilityId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "BillingRecord",
    }
  );
  return BillingRecord;
};
