const dateScalar = require("../../utils/customDate");
const bcrypt = require("bcrypt");

const resolvers = {
  Date: dateScalar,

  //QUERIES//
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

  //MUTATIONS//

  Mutation: {
    async addFacility(_, { name, meterNo }, { models }) {
      try {
        if (name === "" || meterNo === "") {
          throw new Error("All Fields are Required!");
        }
        const facility = await models.Facility.create({
          name,
          meterNo,
        });

        if (facility) {
          return {
            facility,
            success: true,
            message: "Facility Added Successfully!",
          };
        }
        return {
          success: false,
          message: "OOPS! Facility not Added!",
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    //ADD SCOPE MUTATION//
    async addScope(_, { name, noOfOccupants, facilityId }, { models }) {
      try {
        do {
          return models.Scope.create({
            name,
            noOfOccupants,
            facilityId,
          });
        } while (name !== "" || facilityId !== null);
      } catch (err) {
        throw new Error(err.message);
      }
    },

    //REGISTER AUDITOR//
    async registerAuditor(
      _,
      { fullName, email, password, regNo, facilityId },
      { models }
    ) {
      try {
        //STORE AN AUDITOR IN THE DATABASE//
        const auditor = await models.Auditor.create({
          fullName,
          email,
          //encrypt the password by hashing algorithm
          password: await bcrypt.hash(password, 10),
          regNo,
          facilityId,
        });

        if (auditor) {
          return {
            success: true,
            message: "Auditor Registered Successfully!",
          };
        }
        return {
          success: false,
          message: "Auditor Could not be Registered!",
        };
        //LETS CATCH ANY ERRORS & STORE THEM IN err VARIABLE
      } catch (err) {
        //THROW ERROR IS ANY//
        throw new Error(err.message);
      }
    },

    //UPDATE FACILITY//
    async updateFacility(_, { id, name, meterNo }, { models }) {
      try {
        const facility = await models.Facility.update(
          { name, meterNo },
          { where: { id: id } }
        );
        if (facility) {
          return {
            success: true,
            message: "Facility Updated Successfully!",
          };
        }
        return {
          success: false,
          message: "Facility Could not be Updated!",
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    //DELETE FACILITY//
    async deleteFacility(_, { id }, { models }) {
      try {
        const item = await models.Facility.destroy({ where: { id: id } });
        if (item) {
          return "Facility Delete Successfully!";
        }
      } catch (err) {
        throw new Error(err.message);
      }
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
