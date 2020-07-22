const mongoose = require("mongoose");
const graphql = require("graphql");
const UserType = require("./user_type");
const JobType = require("./job_type");
const validateAPIkey = require("../validation/apikey");
const AuthService = require("../services/auth");
const scheduler = require("../services/scheduler");
const eventbrite = require("../services/evenbriteApi")
const { resolve } = require("path");

const User = mongoose.model("users");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return AuthService.register(args);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.login(args);
      },
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      async resolve(_, args) {
        return AuthService.verifyUser(args);
      },
    },
    selectKey: {
      type: UserType,
      args: {
        key: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      async resolve(_, { key, userId }) {
        console.log(userId);
        let user = await User.findById(userId);
        if (!user) {
          throw new Error("user not found");
        }
        console.log(user);
        user.selectedKey = key;
        user.save();
        return user;
      },
    },
    pushAPIkey: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        apikey: { type: GraphQLString },
      },
      async resolve(_, { id, apikey }) {
        const { message, isValid } = await validateAPIkey(apikey);
        if (!isValid) {
          throw new Error(message);
        }
        const user = await User.findById(id);
        if (user.apikeys.includes(apikey)) {
          throw new Error("Eventbrite account is already added");
        }
        user.apikeys.push(apikey);
        user.save();
        return user;
      },
    },
    deleteAPIkey: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        apikey: { type: GraphQLString },
      },
      async resolve(_, { id, apikey }) {
        const user = await User.findById(id);
        const index = user.apikeys.findIndex((el) => el === apikey);
        if (index === -1) {
          return user;
        }
        user.apikeys.splice(index, 1);
        user.save();
        return user;
      },
    },
    scheduleEvent: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        data: { type: GraphQLString },
        key: { type: GraphQLString },
      },
      async resolve(_, { id, date, data, key }) {
        return scheduler.scheduleEvent({
          id,
          key,
          date,
          data,
        });
      },
    },
    deleteEvent: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_, { id }) {
        let user = await User.findOne({ 'jobs._id': id })
        let event = user.jobs.find(job => 
          {
            return(job.id === id) 
          })
        let newjobs = user.jobs.filter((obj) => obj.id !== event.id)
        user.jobs = newjobs;
        await user.save()
        return(user.id)

      },
    },
    publishEvent: {
      type: JobType,
      args: {
        id: { type: GraphQLID },
        eventids: { type: GraphQLList(GraphQLID) },
        key: { type: GraphQLID },
        dateStr: { type: GraphQLString },
        interval: { type: GraphQLInt },
      },
      async resolve(_, { id, eventids, key, dateStr, interval }) {
        return scheduler.publishEvent({
          id,
          eventids,
          key,
          dateStr,
          interval,
        });
      },
    },
  },
});

module.exports = mutation;
