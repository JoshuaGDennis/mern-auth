const isEmpty = require("is-empty");

module.exports = function setStringValue(value) {
  return !isEmpty(value) ? value : "";
};
