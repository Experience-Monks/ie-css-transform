var ieVersion = require('ie-version').version;

module.exports = function checkIsCrappyIE(el) {
  return ieVersion !== null && ieVersion < 10;
};