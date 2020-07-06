const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const JobType = new GraphQLObjectType({
  name: "JobType",
  fields: {
    id: { type: GraphQLID },
    data: { type: GraphQLString },
    status: { type: GraphQLString },
    schedule: { type: GraphQLString },
    urls: { type: GraphQLList(GraphQLString) },
    eventbriteIds: { type: GraphQLList(GraphQLString) },
  },
});

module.exports = JobType;
