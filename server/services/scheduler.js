const schedule = require("node-schedule");
const mongoose = require("mongoose");
const moment = require("moment");
const eventbrite = require("./evenbriteApi");
const { parseForm } = require("./parseForm");
let Job = mongoose.model("jobs");
let User = mongoose.model("users");

const scheduleEvent = async ({ id, date, data, key }) => {
  let user = await User.findById(id);
  if (!user) {
    throw Error("User not in database");
  }
  let job = new Job({
    data,
    schedule: date,
    status: "Pending",
  });
  user.jobs.push(job);
  user.save();
  let form = JSON.parse(data);
  let { eventData, scheduleData } = parseForm(form);
  try {
    let event = await eventbrite.createEvent(
      eventData,
      key,
      form.organization.id
    );
    if (event.is_series) {
      let seriesRes = await eventbrite.createSeries(
        event.id,
        scheduleData,
        key
      );
    }
    let ticketPromises = form.tickets.map(async (ticketData) => {
      return await eventbrite.createTicket(ticketData, event.id, key);
    });
    let ticketRes = await Promise.all(ticketPromises);
    console.log(event);
  } catch (error) {
    console.log(error.message);
  }

  // schedule.scheduleJob(date, function () {
  //   try {
  //     console.log("hello");
  //     let index = user.jobs.findIndex((obj) => obj._id === job._id);
  //     let jobEvent = user.jobs[index];
  //     console.log(jobEvent, "test1");
  //     job.status = "Resolved";
  //     user.save();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // // console.log(user);
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
        console.log(error.message);
      }
    }
  }
  console.log("cleanup succesfull");
};

module.exports = { scheduleEvent, eventCleaner };
