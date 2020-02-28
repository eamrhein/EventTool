const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const OrganizationType = new GraphQLObjectType({
  name: "OrganizationType",
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLID }
  }
});

const AccountType = new GraphQLObjectType({
  name: "AccountType",
  description: "Eventbrite Account Information",
  fields: {
    id: { type: GraphQLID },
    apikey: { type: GraphQLString },
    email: { type: GraphQLString },
    first_name: { type: GraphQLString },
    name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    is_public: { type: GraphQLBoolean },
    image_id: { type: GraphQLID },
    organizations: { type: GraphQLList(OrganizationType) }
  }
});
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    apikeys: { type: GraphQLList(GraphQLString) },
    accounts: { type: GraphQLList(AccountType) },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    userId: { type: GraphQLID }
  }
});

module.exports = UserType;
