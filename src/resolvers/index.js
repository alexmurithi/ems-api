const dateScalar = require("../../utils/customDate");

const resolvers = {
  Date: dateScalar,

  Query: {
    scopes: async (_, __, { models }) => {
      return models.Scope.findAll();
    },
    facilities: async (_, __, { models }) => {
      return models.Facility.findAll();
    },
    auditors: async (_, __, { models }) => {
      return models.Auditor.findAll();
    },
    loads: async (_, __, { models }) => {
      return models.Load.findAll();
    },
    meterReadings: async (_, __, { models }) => {
      return models.MeterReading.findAll();
    },
  },
  Facility: {
    async scopes(facility) {
      return facility.getScopes();
    },
    async auditors(facility) {
      return facility.getAuditors();
    },
    async meterReadings(facility) {
      return facility.getMeterReadings();
    },
  },
  Scope: {
    async facility(scope) {
      return scope.getFacility();
    },
    async loads(scope) {
      return scope.getLoads();
    },
  },
  Auditor: {
    async facility(auditor) {
      return auditor.getFacility();
    },
  },
  Load: {
    async scopes(load) {
      return load.getScopes();
    },
  },
  MeterReading: {
    async facility(meterreading) {
      return meterreading.getFacility();
    },
  },
};

module.exports = resolvers;
