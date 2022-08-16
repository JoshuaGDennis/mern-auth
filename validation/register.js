const Validator = require("validator");
const isEmpty = require("is-empty");
const setStringValue = require("../helpers/setStringValue");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = setStringValue(data.name);
  data.email = setStringValue(data.email);
  data.password = setStringValue(data.password);
  data.password2 = setStringValue(data.password2);

  //   Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //   Email check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //   Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6-30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
