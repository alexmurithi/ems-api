module.exports = {
  Query: {
    scopes: async (_, __, { models }) => {
      return models.Scope.findAll();
    },
    facilities: async (_, __, { models }) => {
      return models.Facility.findAll();
    },
  },
  Facility: {
    async scopes(facility) {
      return facility.getScopes();
    },
  },
  Scope: {
    async facility(scope) {
      return scope.getFacility();
    },
  },
};
