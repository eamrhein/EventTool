const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const Category = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    parent: { type: GraphQLString }
  }
});

module.exports = Category;
