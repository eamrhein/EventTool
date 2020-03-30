const schedule = require("node-schedule");
const mongoose = require("mongoose");
const moment = require("moment");
const eventbrite = require("./evenbriteApi");
let Job = mongoose.model("jobs");

const scheduleEvent = ({ date, data }) => {
  let job = new Job({
    data,
    schedule: date,
    status: "Pending"
  });
  job.save();
  console.log(job);
  schedule.scheduleJob(date, function() {
    console.log(job.data);
    job.status = "Resolved";
    console.log(job);
  });
};
I;
module.exports = { scheduleEvent };
