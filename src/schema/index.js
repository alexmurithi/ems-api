const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Facility {
    id: ID!
    name: String!
    scopes: [Scope!]!
  }
  type Scope {
    id: ID!
    name: String!
    no_of_occupants: Int
    facility: Facility
  }

  type Query {
    scopes: [Scope!]!
    facilities: [Facility!]!
  }
`;

module.exports = typeDefs;
