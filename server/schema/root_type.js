const graphql = require("graphql");
const mongoose = require("mongoose");

const User = mongoose.model("users");

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString
} = graphql;

const UserType = require("./user_type");
const AccountType = require("./account_type");
const EventBriteService = require("../services/evenbriteApi");

const RootQuery = new GraphQLObjectType({
  name: "RootType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, { id }) {
        const user = await User.findById(id);
        return user;
      }
    },
    accounts: {
      type: GraphQLList(AccountType),
      args: { apikeys: { type: new GraphQLList(GraphQLString) } },
      resolve(_, { apikeys }) {
        return EventBriteService.fetchAccounts(apikeys);
      }
    },
    account: {
      type: AccountType,
      args: { apikey: { type: GraphQLString } },
      resolve(_, { apikey }) {
        return EventBriteService.fetchAccount(apikey);
      }
    }
  }
});

module.exports = RootQuery;
