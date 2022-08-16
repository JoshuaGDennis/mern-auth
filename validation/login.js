const Validator = require("validator");
const isEmpty = require("is-empty");
const setStringValue = require("../helpers/setStringValue");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = setStringValue(data.email);
  data.password = setStringValue(data.password);

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
