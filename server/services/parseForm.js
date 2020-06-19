const moment = require("moment");
const e = require("express");
const geoTz = require("geo-tz");

let map = new Map();
geoTz.setCache({ store: map });

function parseForm(form, loc) {
  let start = moment(
    form.start_date + " " + form.start_time,
    "YYYY-MM-DD hh:mm A"
  )
    .utc()
    .format();
  let end = "";
  if (form.end_date) {
    end = moment(form.end_date + " " + form.end_time, "YYYY-MM-DD hh:mm A")
      .tz("america/los_angeles")
      .utc()
      .format();
  } else {
    end = moment(form.start_date + " " + form.end_time, "YYYY-MM-DD hh:mm A")
      .tz("america/los_angeles")
      .utc()
      .format();
  }
  
  let tz = geoTz(loc.latitude, loc.longitude)[0];
  let eventData = {
    event: {
      name: {
        html: form.title + "-" + loc.name,
      },
      venue_id: loc.id,
      online_event: form.venue === "Online Event",
      description: {
        html: form.description,
      },
      start: {
        timezone: tz,
        utc: start,
      },
      end: {
        timezone: tz,
        utc: end,
      },
      is_series: form.series,
      currency: "USD",
    },
  };
  let duration = moment(end).diff(moment(start), "seconds");
  let scheduleData = {
    schedule: {
      occurrence_duration: duration,
      recurrence_rule: `DTSTART:${start.replace(
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
