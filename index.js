const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const app = express();

const typeDefs = gql`
  type Query {
    greetings: String
  }
`;

const resolvers = {
  Query: {
    greetings: () => "Hello EMS APP",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startUp = async () => {
  await server.start();
  const app = express();
  server.applyMiddleware({ app, path: "/api" });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startUp();
