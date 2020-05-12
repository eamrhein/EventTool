const schedule = require("node-schedule");
const mongoose = require("mongoose");
const moment = require("moment");
const eventbrite = require("./evenbriteApi");
let Job = mongoose.model("jobs");
let User = mongoose.model("users");

const scheduleEvent = async ({ id, date, data }) => {
  let user = await User.findById(id);
  if (!user) {
    throw Error("User not in database");
  }
  let job = new Job({
    data,
    schedule: date,
    status: "Pending",
  });
  // user.jobs = [];
  user.jobs.push(job);
  user.save();

  schedule.scheduleJob(date, function () {
    // let index = user.jobs.findIndex((id) => id === job.id);
    let index = user.jobs.findIndex((obj) => obj._id === job._id);
    user.jobs[index].status = "Resolved";

    user.save();
  });
  console.log(user);
  return user;
};

function eventCleaner() {
  schedule.scheduleJob("0 * * * *", function () {
    cleanupEvents();
  });
}

const cleanupEvents = async () => {
  let users = await User.find();
  let date = Date.now();
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.jobs) {
      user.jobs = user.jobs.filter((job) => moment(job.schedule).isAfter(date));
      try {
        user.save();
      } catch (error) {
        console.log("user failed to save in event cleanup");
      }
    }
  }
  console.log("cleanup succesfull");
};

module.exports = { scheduleEvent, eventCleaner };
