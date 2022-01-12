const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const models = require("./models");

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return { models, user: getUser(token.replace("Bearer ", "")) };
  },
});

const startUp = async () => {
  await server.start();
  await models.sequelize.authenticate();
  models.sequelize.sync();
  const app = express();
  const corOptions = {
    origin: "*",
    credentials: true,
  };

  app.use(cors(corOptions));
  server.applyMiddleware({ app, path: "/api" });

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startUp();
