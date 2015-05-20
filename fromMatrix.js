var checkIsCrappyIE = require('./lib/checkIsCrappyIE');
var applyMatrix = require('./lib/applyMatrix');
var applyTransformOrigin = require('./lib/applyTransformOrigin');

module.exports = function ieCSSTransformFromMatrix(el, matrix, transformOrigin) {

    if(checkIsCrappyIE(el)) {
      applyMatrix(el, matrix, transformOrigin);
    } else {
      if(matrix.length === 6) {
        el.style.transform = 'matrix(' + matrix.join(',') + ')';  
      } else {
        el.style.transform = 'matrix3d(' + matrix.join(',') + ')';  
      }

      applyTransformOrigin(el, transformOrigin);
    }
};