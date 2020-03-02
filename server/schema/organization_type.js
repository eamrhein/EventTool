const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = graphql;
const OrganizationType = new GraphQLObjectType({
  name: "OrganizationType",
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLID }
  }
});

module.exports = OrganizationType;