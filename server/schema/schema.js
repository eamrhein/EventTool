const graphql = require("graphql");

const { GraphQLSchema } = graphql;

const RootType = require("./root_type");
const mutations = require("./mutations");

module.exports = new GraphQLSchema({
  query: RootType,
  mutation: mutations
});
