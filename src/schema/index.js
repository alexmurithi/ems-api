const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Facility {
    id: ID!
    name: String!
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
`;

module.exports = typeDefs;
