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
    console.log(index);
    user.save();
    console.log(user.jobs);
  });
  return user;
};

module.exports = { scheduleEvent };
