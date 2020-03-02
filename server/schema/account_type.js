const graphql = require("graphql");
const OrganizationType = require("./organization_type");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = graphql;

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

module.exports = AccountType;
