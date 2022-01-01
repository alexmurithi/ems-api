const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Facility {
    id: ID!
    name: String!
    meterNo: Int!
    scopes: [Scope!]!
    auditors: [Auditor!]!
    meterReadings: [MeterReading!]!
  }
  type Scope {
    id: ID!
    name: String!
    noOfOccupants: Int
    facility: Facility!
    loads: [Load!]!
  }

  type Load {
    id: ID!
    name: String!
    powerRatings: Float!
    scopes: [Scope]
  }

  type Auditor {
    id: ID!
    email: String!
    password: String!
    fullName: String!
    regNo: String!
    facility: Facility!
  }

  type MeterReading {
    id: ID!
    startDate: Date!
    endDate: Date!
    month: String
    consumption: Float!
    facility: Facility!
  }

  type Query {
    scopes: [Scope!]!
    facilities: [Facility!]!
    auditors: [Auditor!]!
    loads: [Load!]!
    meterReadings: [MeterReading!]!
  }

  type Mutation {
    addFacility(name: String!, meterNo: String!): facilityAddResponse!

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
    ): registerAuditorResponse!
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
    auditor: Auditor
  }
`;

module.exports = typeDefs;
