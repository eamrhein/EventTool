const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  apikeys: [
    {
      type: String
    }
  ],
  jobs: [{ type: Schema.Types.ObjectId, ref: "jobs" }]
});
const User = mongoose.model("users", UserSchema);

module.exports = User;
