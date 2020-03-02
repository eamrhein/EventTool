const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    apikeys: { type: GraphQLList(GraphQLString) },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  }
});

module.exports = UserType;
