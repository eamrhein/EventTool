const schedule = require("node-schedule");
const mongoose = require("mongoose");
const moment = require("moment");
const eventbrite = require("./evenbriteApi");
let Job = mongoose.model("jobs");
let User = mongoose.model("users");

const scheduleEvent = async ({ id, date, data }) => {
  let dbUser = await User.findById(id);
  if (!dbUser) {
    throw Error("User not in database");
  }
  let job = new Job({
    data,
    schedule: date,
    status: "Pending",
    userId: id,
  });
  job.save();
  dbUser.jobs.push(job);
  dbUser.save();
  let user = await dbUser.populate("jobs");
  console.log(user);
  schedule.scheduleJob(date, function () {
    // #todo Sanitize Data for Eventbrite
    // Write function to submit data.
    job.status = "Resolved";
  });
  return user;
};

module.exports = { scheduleEvent };
