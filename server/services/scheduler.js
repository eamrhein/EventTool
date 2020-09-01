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
    status: 1,
    urls: [],
    eventbriteIds: [],
    locked: false,
  });
  let user = await User.findById(id);
  if (!user) {
    throw Error("User not in database");
  }
  let form = JSON.parse(data);
  try {
    job.status = 2
    let venues = await eventbrite.updateVenues(form.organization.id, key, form);
    job.status = 3;
    let events = await eventbrite.createEvent(
      form,
      key,
      form.organization.id,
      venues
    );
    if (events[0].isSeries) {
      job.status = 4;
      await eventbrite.createSeries(form, key);
    }
    job.eventbriteIds = events.map((event) => event.id);
    job.status = 5;
    let tickets = await eventbrite.createTicket(
      form.tickets,
      job.eventbriteIds,
      key
    );
    job.status = 6;
    job.urls = events.map((event) => event.url);
    job.status = 7;
    user.jobs.push(job);
    let u = await user.save();
    return u;
  } catch (error) {
    job.status = 1;
    user.jobs.push(job);
    let u = await user.save();
    console.error(error.message);
    return u;
  }
};
function chunk(array, size) {
  var result = []
  for (var i=0;i<array.length;i+=size)
    result.push( array.slice(i,i+size) )
  return result
  }

async function publishEvent({ id, eventids, key, dateStr, interval }) {
  let date = moment(dateStr);
  if (date.isBefore(new Date())) {
    date = moment(new Date());
  }
  let user = await User.findOne({ 'jobs._id': id })
  let job = user.jobs.find(job => job.id === id)
  if (!job) {
    throw new Error("Job is not in database")
  }
  job.status = 8;
  let batches = chunk(eventids, 10)
  console.log(batches)
  batches.forEach((batch) => {
    batch.forEach(async (currentId) => {
      schedule.scheduleJob(
        date.format(),
        async function () {
          try {
            let promise = await eventbrite.publishEvent(currentId, key);
            if (promise.error_description) {
              throw new Error(promise.error_description)
            }
            job.status = 10;
            job.locked = true;
          } catch (error) {
            console.error(error.message)
            job.locked = true;
            job.status = 1;
          }
          console.log("Event Published Successfully")
          await user.save()
        }
      );
      date.add(interval, "minutes")
    })
    date.add(24, "hours").format()
  })
  let b = await user.save()
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
