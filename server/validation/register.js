const Validator = require("validator");
const validText = require("./valid-text");
const User = require("./../models/User");

module.exports = function validateRegisterInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    return {
      message: "Password must be at least 6 characters",
      isValid: false
    };
  }

  return {
    message: "",
    isValid: true
  };
};
