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

async function publishEvent({ id, eventids, key, dateStr, interval }) {
  let date = moment(dateStr);
  let user = await User.findOne({'jobs._id': id})
  let job = user.jobs.find(job => job.id === id)
  if(!job){
    throw new Error("Job is not in database")
  }
  job.status = "Event awaiting to be published";
  eventids.forEach((currentId) => {
    schedule.scheduleJob(
      date.add(interval, "minutes").format(),
      async function () {
        try {
          console.log(currentId)
          eventbrite.publishEvent(currentId, key);
          job.status = "Publishing Events";
          await user.save()

        } catch (error) {
          job.status = "Publishing Failed" + error.message;
          console.log(error.message)
          await user.save()
          throw new Error(error.message);
        }
      }
    );
  })  
  let b = await user.save()
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
