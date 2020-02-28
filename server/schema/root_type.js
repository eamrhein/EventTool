const graphql = require("graphql");
const fetch = require("node-fetch");

const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");

const User = mongoose.model("users");
const UserType = require("./user_type");

const baseurl = "https://www.eventbriteapi.com/v3";
const RootQuery = new GraphQLObjectType({
  name: "RootType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parenValue, { id }) {
        return User.findById(id).then(user => {
          const userObject = user;
          const { apikeys } = userObject;
          if (apikeys) {
            return Promise.all(
              apikeys.map(key => fetch(`${baseurl}/users/me?token=${key}`))
            ).then(promises => {
              return Promise.all(promises.map(res => res.json())).then(data => {
                userObject.accounts = data;
                userObject.accounts = userObject.accounts.map(
                  async (account, idx) => {
                    const orgPromise = await fetch(
                      `${baseurl}/users/${account.id}/organizations/?token=${apikeys[idx]}`
                    );
                    let orgs = await orgPromise.json();
                    orgs = orgs.organizations.map(obj => {
                      return {
                        name: obj.name,
                        id: obj.id
                      };
                    });
                    return {
                      apikey: apikeys[idx],
                      email: account.emails[0].email,
                      id: account.id,
                      organizations: orgs,
                      ...account
                    };
                  }
                );
                return userObject;
              });
            });
          }
          return user;
        });
      }
    }
  }
});

module.exports = RootQuery;
