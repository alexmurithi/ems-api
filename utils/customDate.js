const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date",

  //convert outgoing date to Integer//
  serialize(value) {
    return value.getTime();
  },
  //convert incoming date to integer//
  parseValue(value) {
    return new Date(value);
  },
  //convert hard coded AST string to integer and then to date
  parseLiteral(ast) {
    if (ast.Kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

module.exports = dateScalar;
