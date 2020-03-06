const Validator = require("validator");
const fetch = require("node-fetch");
const validText = require("./valid-text");

module.exports = async function valdiateAPIkey(apikey) {
  const key = validText(apikey) ? apikey : "";
  if (
    !Validator.isAlphanumeric(key) ||
    !Validator.isBase64(key) ||
    !Validator.isLength(key, { min: 19 })
  ) {
    return { message: "API key is in incorrect format.", isValid: false };
  }
  if (Validator.isEmpty(key)) {
    return { message: "API key must not be empty.", isValid: false };
  }
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/users/me?token=${apikey}`
  );
  if (!res.ok) {
    return { message: "Not a valid eventbrite api key.", isValid: false };
  }
  return {
    message: "",
    isValid: true
  };
};
