const graphql = require("graphql");
const JobType = require("./job_type");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    apikeys: { type: GraphQLList(GraphQLString) },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    jobs: { type: GraphQLList(JobType) },
    selectedKey: { type: GraphQLString},
  },
});

module.exports = UserType;
