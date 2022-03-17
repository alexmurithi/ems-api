const dateScalar = require("../../utils/customDate");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const resolvers = {
  Date: dateScalar,

  //QUERIES//
  Query: {
    energies: async (_, __, { models }) => {
      try {
        return models.Energy.findAll();
      } catch (err) {
        throw new Error(err.message);
      }
    },
  //   energyUse: async (_, __, { models }) => {
  //    try {
  //      return models.Energy.findAll();
  //    } catch (err) {
  //      throw new Error(err.message);
  //    }
  //  },
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
    me: async (_, { id }, { models }) => {
      try {
        const user = await models.Auditor.findOne({ where: { id: id } });
        if (!user) {
          throw new Error("Error: Cant find this User!");
        }
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  //MUTATIONS//

  Mutation: {
    async addFacility(_, { name, meterNo }, { models }) {
      try {
        if (name === "" || meterNo === null) {
          throw new Error("All Fields are Required!");
        }
        const facility = await models.Facility.create({
          name,
          meterNo,
        });

        return facility;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    async newLoad(_, { name, powerRatings }, { models }) {
      try {
        const load = await models.Load.create({
          name,
          powerRatings,
        });
        return load;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    //LOGIN USER BY EMAIL AND PASSWORD//
    async login(_, { email, password }, { models }) {
      try {
        if (email === "" || password === "") {
          throw new Error("Email or Password cannot be empty!");
        }
        const user = await models.Auditor.findOne({ where: { email: email } });

        if (!user) {
          throw new Error("No User associated with this Email!");
        }

        const isValid = await bcrypt.compareSync(password, user.password);

        if (!isValid) {
          throw new Error("Incorrect password!");
        }

        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1hr" }
        );

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    //ADD METER READING//
    async addMeterReading(
      _,
      { startDate, endDate, month, year, consumption, facilityId },
      { models }
    ) {
      try {
        const reading = await models.MeterReading.create({
          startDate,
          endDate,
          month,
          year,
          consumption,
          facilityId,
        });
        return reading;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    //ADD SCOPE MUTATION//
    async newScope(_, { name, noOfOccupants, facilityId }, { models }) {
      try {
        const scope = await models.Scope.create({
          facilityId,
          name,
          noOfOccupants,
        });
        if (scope) {
          return scope;
        }
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

    //IMPORT METER READINGS//
    async importMeterReadings(
      _,
      { startDate, endDate, year, month, consumption, facilityId },
      { models }
    ) {
      try {
        const doneData = await models.MeterReading.bulkCreate([]);
        return doneData;
      } catch (err) {
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

    //UPDATE LOAD//
    async editLoad(_, { id, name, powerRatings }, { models }) {
      try {
        const load = await models.Load.update(
          {
            name,
            powerRatings,
          },
          { where: { id: id } }
        );
        if (load) {
          return {
            success: true,
            message: "Item updated Successfully !",
          };
        }
        return {
          success: false,
          message: "Item could not be updated !",
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
    //Delete MeterReading//
    async deleteMeterReading(_, { id }, { models }) {
      try {
        const item = await models.MeterReading.destroy({ where: { id: id } });
        if (item) {
          return "Meter Reading Deleted Successfully!";
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },

    //Delete Load//
    async deleteLoad(_, { id }, { models }) {
      try {
        const load = await models.Load.destroy({ where: { id: id } });
        if (load) {
          return {
            success: true,
            message: "Item deleted Successfully",
          };
        }
        return {
          success: false,
          message: "Item could not be deleted!",
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Energy: {
    async scopes(energy) {
      return energy.getScopes();
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
