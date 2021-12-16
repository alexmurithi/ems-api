const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Facility {
    id: ID!
    name: String!
    scopes: [Scope!]!
    auditors: [Auditor!]!
  }
  type Scope {
    id: ID!
    name: String!
    noOfOccupants: Int
    facility: Facility
  }

  type Auditor {
    id: ID!
    email: String!
    password: String!
    fullName: String!
    regNo: String!
    facility: Facility!
  }

  type Query {
    scopes: [Scope!]!
    facilities: [Facility!]!
    auditors: [Auditor!]!
  }
`;

module.exports = typeDefs;
