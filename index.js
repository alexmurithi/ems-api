const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const app = express();

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const models = require("./models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { models };
  },
});

const startUp = async () => {
  await server.start();
  await models.sequelize.authenticate();
  models.sequelize.sync();
  const app = express();
  server.applyMiddleware({ app, path: "/api" });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startUp();
