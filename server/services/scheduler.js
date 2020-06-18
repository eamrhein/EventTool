const schedule = require("node-schedule");
const mongoose = require("mongoose");
const moment = require("moment");
const eventbrite = require("./evenbriteApi");
let Job = mongoose.model("jobs");
let User = mongoose.model("users");

const scheduleEvent = async ({ id, data, key }) => {
  let user = await User.findById(id);
  if (!user) {
    throw Error("User not in database");
  }
  let form = JSON.parse(data);
  try {
    let venues = await eventbrite.updateVenues(form.organization.id, key, form);
    console.log(venues);
    let events = await eventbrite.createEvent(form, key, venues);
    // if (events[0].isSeries) {
    //   await eventbrite.createSeries();
    // }
    // let tickets = await eventbrite.createTicket();
    // let job = new Job({
    //   data,
    //   schedule: date,
    //   status: "Pending",
    //   urls: [],
    // });
    // job.urls = events.map((event) => event.url);
    // user.jobs.push(job);
    // let u = await user.save();
    // return u;
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
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
        console.log(error.message);
      }
    }
  }
  console.log("cleanup sucessfull");
};

module.exports = { scheduleEvent, eventCleaner };
