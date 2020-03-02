const mongoose = require("mongoose");
const graphql = require("graphql");

const User = mongoose.model("users");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = graphql;
const UserType = require("./user_type");

const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      async resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    pushApikey: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        apikey: { type: GraphQLString }
      },
      async resolve(_, { id, apikey }) {
        const user = await User.findById(id);
        user.apikeys.push(apikey);
        user.save();
        return user;
      }
    }
  }
});

module.exports = mutation;
