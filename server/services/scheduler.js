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
    job.status = "Adding Venues";
    let venues = await eventbrite.updateVenues(form.organization.id, key, form);
    job.status = "Creating Events";
    let events = await eventbrite.createEvent(
      form,
      key,
      form.organization.id,
      venues
    );
    if (events[0].isSeries) {
      job.status = "Creating Event Series'";
      await eventbrite.createSeries(form, key);
    }
    job.eventbriteIds = events.map((event) => event.id);
    job.status = "Creating Tickets";
    let tickets = await eventbrite.createTicket(
      form.tickets,
      job.eventbriteIds,
      key
    );
    job.status = "Adding Event Data";
    job.urls = events.map((event) => event.url);
    job.status = "Draft Complete";
    user.jobs.push(job);
    let u = await user.save();
    return u;
  } catch (error) {
    job.status = "failed - " + job.status;
    user.jobs.push(job);
    let u = await user.save();
    console.error(error.message);
    return u;
  }
};

function publishEvent({ id, eventids, key, dateStr, interval }) {
  let date = moment(dateStr);
  let job = Job.findById(id);
  console.log(job);
  let count = eventids.length;
  while (count > 0) {
    schedule.scheduleJob(
      date.add(interval * count, "minutes").format(),
      function () {
        try {
          eventbrite.publishEvent(eventids[count-1], key);
          job.status = "Publishing Events";
          job.save();
        } catch (error) {
          job.status = "Publishing Failed" + error.message;
          job.save();
          throw new Error(error.message);
        }
      }
    );
    count = count - 1;
  }
  job.status = "All Events Published";
  job.save();
  return job;
}

async function eventCleaner() {
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
}

module.exports = { scheduleEvent, eventCleaner, publishEvent };
