const moment = require("moment");
const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:00Z`;
};

function parseForm(form, id) {
  let start_date = form.start_date.split("T")[0];
  let end_date = form.end_date.split("T")[0];
  let start_time = convertTime12to24(form.start_time);
  let end_time = convertTime12to24(form.end_time);
  let start_utc = start_date + "T" + start_time;
  let end_duration = start_date + "T" + end_time;
  let end_utc = end_date + "T" + end_time;
  let eventData = {
    event: {
      name: {
        html: form.title,
      },
      venue_id: id,
      online_event: form.venue === "Online Event",
      description: {
        html: form.description,
      },
      start: {
        timezone: "America/Los_Angeles",
        utc: start_utc,
      },
      end: {
        timezone: "America/Los_Angeles",
        utc: end_utc,
      },
      is_series: form.series,
      currency: "USD",
    },
  };
  let duration = moment(end_duration).diff(moment(start_utc), "seconds");
  let scheduleData = {
    schedule: {
      occurrence_duration: duration,
      recurrence_rule: `DTSTART:${start_utc.replace(
        /:|-/g,
        ""
      )}\nRRULE:FREQ=${form.occurs.toUpperCase()};COUNT=${form.times}`,
    },
  };

  return {
    eventData,
    scheduleData,
  };
}

module.exports = { parseForm };
