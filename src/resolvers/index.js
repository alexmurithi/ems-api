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
  },
  Auditor: {
    async facility(auditor) {
      return auditor.getFacility();
    },
  },
};
