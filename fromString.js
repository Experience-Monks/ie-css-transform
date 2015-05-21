var cssTransformToMat4 = require('css-transform-to-mat4');
var checkIsCrappyIE = require('./lib/checkIsCrappyIE');
var applyMatrix = require('./lib/applyMatrix');
var applyTransformOrigin = require('./lib/applyTransformOrigin');

module.exports = function ieCSSTransformFromString(el, transform, transformOrigin) {

    var matrix;
    
    // if its a crappy ie we'll need to convert transform to a matrix and apply it
    if(checkIsCrappyIE(el)) {
      
      matrix = cssTransformToMat4(transform);
      applyMatrix(el, matrix, transformOrigin);
    // since it wasn't crappy ie just apply through the transform prop
    } else {
      el.style.transform = transform;
      el.style.msTransform = transform;

      applyTransformOrigin(el, transformOrigin);
    }
};