const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const VenueType = new GraphQLObjectType({
  name: "VenueType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

module.exports = VenueType;
