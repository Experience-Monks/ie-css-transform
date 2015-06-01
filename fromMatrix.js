var checkIsCrappyIE = require('./lib/checkIsCrappyIE');
var applyMatrix = require('./lib/applyMatrix');
var applyTransformOrigin = require('./lib/applyTransformOrigin');


module.exports = function ieCSSTransformFromMatrix(el, matrix, transformOrigin) {

    var matrixString;

    if(checkIsCrappyIE(el)) {
      applyMatrix(el, matrix, transformOrigin);
    } else {
      matrixString = Array.prototype.join.call(matrix, ',');
      
      if(matrix.length === 6) {
        el.style.transform = 'matrix(' + matrixString + ')';  
      } else {
        el.style.transform = 'matrix3d(' + matrixString + ')';  
      }

      applyTransformOrigin(el, transformOrigin);
    }
};