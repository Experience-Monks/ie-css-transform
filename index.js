var fromString = require('./fromString');
var fromMatrix = require('./fromMatrix');

module.exports = function ieCSSTransform(el, transform, transformOrigin) {
  
  if(typeof transform === 'string') {
    fromString(el, transform, transformOrigin);
  } else if(Object.prototype.toString.call(transform).indexOf('Array') > -1) {
    fromMatrix(el, transform, transformOrigin);
  }
};