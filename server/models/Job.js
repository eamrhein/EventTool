const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobSchema = new Schema({
  data: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  urls: [{ type: String }],
  eventbriteIds: [{type: String}]
});
const Jobs = mongoose.model("jobs", JobSchema);

(module.exports = JobSchema), Jobs;
