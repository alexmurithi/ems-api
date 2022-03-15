const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Facility {
    id: ID!
    name: String!
    meterNo: String!
    createdAt: Date!
    scopes: [Scope!]!
    auditors: [Auditor!]!
    meterReadings: [MeterReading!]!
  }
  type Scope {
    id: ID!
    name: String!
    noOfOccupants: Int
    createdAt: Date!
    facility: Facility!
    loads: [Load!]!
  }

  type Load {
    id: ID!
    name: String!
    powerRatings: Float!
    createdAt: Date!
    updatedAt: Date!
    scopes: [Scope]
  }

  type Auditor {
    id: ID!
    email: String!
    password: String!
    fullName: String!
    regNo: String
    facility: Facility!
  }

  type MeterReading {
    id: ID!
    startDate: Date!
    endDate: Date!
    month: String
    year: Int!
    consumption: Float!
    createdAt: Date!
    facility: Facility!
  }

  type Query {
    scopes: [Scope!]!
    facilities: [Facility!]!
    auditors: [Auditor!]!
    loads: [Load!]!
    meterReadings: [MeterReading!]!
    me(id: Int!): Auditor
  }

  type Mutation {
    addFacility(name: String!, meterNo: Int!): Facility!
    newLoad(name: String!, powerRatings: Float!): Load!
    newScope(facilityId: Int!, name: String!, noOfOccupants: Int): Scope!
    editLoad(id: Int!, name: String, powerRatings: Float): UpdateResponse!
    deleteLoad(id: Int!): DeleteResponse!

    login(email: String!, password: String!): AuthPayload!

    importMeterReadings(
      startDate: [Date!]!
      endDate: [Date!]!
      year: [Int!]!
      month: [String!]!
      consumption: [Float!]!
      facilityId: [Int!]!
    ): [MeterReading!]!

    addMeterReading(
      startDate: Date!
      endDate: Date!
      month: String
      year: Int!
      consumption: Float!
      facilityId: Int!
    ): MeterReading!

    deleteMeterReading(id: Int!): String

    updateFacility(
      id: Int!
      name: String
      meterNo: Int
    ): facilityUpdateResponse!

    deleteFacility(id: Int!): String

    addScope(name: String!, noOfOccupants: Int, facilityId: Int!): Scope

    registerAuditor(
      fullName: String!
      email: String!
      password: String!
      regNo: Int
      facilityId: Int!
    ): registerAuditorResponse
  }

  type facilityUpdateResponse {
    success: Boolean!
    message: String!
    facility: Facility
  }

  type facilityAddResponse {
    success: Boolean!
    message: String!
    facility: Facility
  }

  type registerAuditorResponse {
    success: Boolean!
    message: String!
    auditor: Auditor!
  }

  type AuthPayload {
    token: String!
    user: Auditor!
  }

  type DeleteResponse {
    success: Boolean
    message: String
  }
  type UpdateResponse {
    success: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;
