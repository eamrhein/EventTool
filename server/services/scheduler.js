const schedule = require("node-schedule");
const mongoose = require("mongoose");
const moment = require("moment");
const eventbrite = require("./evenbriteApi");
let Job = mongoose.model("jobs");
let User = mongoose.model("users");

const scheduleEvent = async ({ id, data, key }) => {
  let job = new Job({
    data,
    schedule: new Date(),
    status: "Pending",
    urls: [],
    eventbriteIds: [],
  });
  let user = await User.findById(id);
  if (!user) {
    throw Error("User not in database");
  }
  let form = JSON.parse(data);
  try {
    job.status = "Adding Venues"
    let venues = await eventbrite.updateVenues(form.organization.id, key, form);
    job.status = "Creating Events"
    let events = await eventbrite.createEvent(
      form,
      key,
      form.organization.id,
      venues
    );
    if (events[0].isSeries) {
      job.status = "Creating Event Series'"
      await eventbrite.createSeries(form, key);
    }
    job.status = "Creating Tickets"
    let tickets = await eventbrite.createTicket(form, key);
    job.status = "Adding Event Data"
    job.urls = events.map((event) => event.url);
    job.eventbriteIds = events.map((event) => event.id)
    job.status = "Draft Complete"
    user.jobs.push(job);
    let u = await user.save();
    return u;
  } catch (error) {
    job.status = "failed - " + job.status
    user.jobs.push(job);
    let u = await user.save();
    console.error(error.message);
    return u
  }
};

function publishEvent({eventids, key, dateStr}) {
  let date = new Date(dateStr)
  let job = Job.find(id)
  schedule.scheduleJob(date, function(){
    console.log("test")
  })
}

function eventCleaner() {
  cleanupEvents()
  // schedule.scheduleJob("0 * * * *", function () {
  //   cleanupEvents();
  // });
}

const cleanupEvents = async () => {
  let users = await User.find();
  let date = Date.now();
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.jobs) {
      user.jobs = user.jobs = [];
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
