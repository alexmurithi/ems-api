module.exports = {
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
  },
  Facility: {
    async scopes(facility) {
      return facility.getScopes();
    },
    async auditors(facility) {
      return facility.getAuditors();
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
};
