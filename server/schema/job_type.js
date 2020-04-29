const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const JobType = new GraphQLObjectType({
  name: "JobType",
  fields: {
    id: { type: GraphQLID },
    data: { type: GraphQLString },
    status: { type: GraphQLString },
    schedule: { type: GraphQLString },
  },
});

module.exports = JobType;
