var checkIsCrappyIE = require('./lib/checkIsCrappyIE');
var applyMatrix = require('./lib/applyMatrix');
var applyTransformOrigin = require('./lib/applyTransformOrigin');


module.exports = function ieCSSTransformFromMatrix(el, matrix, transformOrigin) {

    var matrixString;
    var perspective;

    if(checkIsCrappyIE(el)) {
      applyMatrix(el, matrix, transformOrigin);
    } else {
      matrixString = Array.prototype.join.call(matrix, ',');
      
      if(matrix.length === 6) {
        el.style.transform = 'matrix(' + matrixString + ')';  
      } else {

        perspective = matrix[ 11 ];

        // the following is done because it seems like webkit does not render
        // the matrix perspective value correctly
        if(perspective) {
          perspective = -1 / perspective;

          el.style.transform = 'perspective(' + perspective + 'px) matrix3d(' + matrixString + ')';  
        } else {
          el.style.transform = 'matrix3d(' + matrixString + ')';    
        }
      }

      applyTransformOrigin(el, transformOrigin);
    }
};