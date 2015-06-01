var raf = require('raf');
var map = require('./shims/map');
var forEach = require('./shims/forEach');
var numberParseFloat = require('./shims/parseFloat');
var parseTransformOrigin = require('./parseTransformOrigin');
var mat4Translate = require('gl-mat4/translate');
var mat4Multiply = require('gl-mat4/multiply');

module.exports = function applyMatrix(el, matrix, transformOrigin) {

  if(!el.parentNode) {

    raf(function() {

      applyMatrix(el, matrix, transformOrigin);
    });

    return;
  }

  var size = getSize(el);
  var sizeArray = [size.widthClient, size.heightClient, 0];
  var trans;

  transformOrigin = parseTransformOrigin(transformOrigin);
  transformOrigin = transformOrigin.map( function(value, idx) {
    return getTransformOriginOff(value, sizeArray[ idx ]);
  });

  switch(matrix.length) {
  
    case 16:
      trans = get16(
        el, 
        matrix, 
        size.widthClient,
        size.heightClient,
        transformOrigin[ 0 ],
        transformOrigin[ 1 ]
      );
    break;
  
    default:
      throw new Error('Matrices of length '  + matrix.length + ' are not supported. Lengths of 16 are.');
  }

  // this version of ie does not have transform
  if(!el.style.msTransform) { 

    if(!el.filters['DXImageTransform.Microsoft.Matrix']) {
      el.style.filter = (el.style.filter ? el.style.filter + ' ' : '' ) + 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod="auto expand")';
    }
  
    el.filters['DXImageTransform.Microsoft.Matrix'].M11 = trans.a;
    el.filters['DXImageTransform.Microsoft.Matrix'].M12 = trans.c;
    el.filters['DXImageTransform.Microsoft.Matrix'].M21 = trans.b;
    el.filters['DXImageTransform.Microsoft.Matrix'].M22 = trans.d;
  
    el.style.position = 'absolute';
    el.style.left = el.style.top = '0px';
  
    el.style.marginLeft = trans.oX + 'px';
    el.style.marginTop = trans.oY + 'px';
  } else {

    el.style.msTransform = 'matrix(' + [
      trans.a, trans.b, trans.offX,
      trans.c, trans.d, trans.offY
    ].join(',') + ')';
  }
};

function getSize(el) {

  var widthOff = el.$$offsetWidth || el.offsetWidth;
  var heightOff = el.$$offsetHeight || el.offsetHeight;
  var widthClient = el.$$clientWidth || el.clientWidth;
  var heightClient = el.$$clientHeight || el.clientHeight;

  return {
    widthOff: widthOff,
    heightOff: heightOff,
    widthClient: widthClient,
    heightClient: heightClient
  };
}

function getTransformOriginOff(transformOrigin, clientSize) {

  if(transformOrigin.isPercent) {
    return clientSize * transformOrigin.value;
  } else {
    return transformOrigin.value; 
  }
}

function get4() {

}

function get6() {

}

function get9() {

}

function get16(el, matrix, width, height, transformOriginX, transformOriginY) {

  // matrix = [
  //   0,  1,  2,  3,
  //   4,  5,  6,  7,
  //   8,  9,  10, 11,
  //   12, 13, 14, 15
  // ];
  
  var baseMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  var topLeft = [ 0, 0, 0 ];
  var topRight = [ width, 0, 0 ];
  var botRight = [ width, height, 0 ];
  var botLeft = [ 0, height, 0 ];
  var offX;
  var offY;

  mat4Translate(baseMatrix, baseMatrix, [transformOriginX, transformOriginY, 0]);
  mat4Multiply(baseMatrix, baseMatrix, matrix);
  mat4Translate(baseMatrix, baseMatrix, [-transformOriginX, -transformOriginY, 0]);
  
  applyMatrix(topLeft, baseMatrix);
  applyMatrix(topRight, baseMatrix);
  applyMatrix(botRight, baseMatrix);
  applyMatrix(botLeft, baseMatrix);

  offX = topLeft[ 0 ];
  offY = topLeft[ 1 ];

  offX = Math.min(offX, topRight[ 0 ]);
  offX = Math.min(offX, botRight[ 0 ]);
  offX = Math.min(offX, botLeft[ 0 ]);

  offY = Math.min(offY, topRight[ 1 ]);
  offY = Math.min(offY, botRight[ 1 ]);
  offY = Math.min(offY, botLeft[ 1 ]);

  var perspective = matrix[ 11 ];
  var scale = perspective === 0 ? 1 : 1 - topLeft[ 2 ] * perspective;

  return {
    a: baseMatrix[ 0 ] * scale, // scale rotate
    b: baseMatrix[ 1 ] * scale, // scale rotate
    c: baseMatrix[ 4 ] * scale, // scale rotate
    d: baseMatrix[ 5 ] * scale, // scale rotate
    oX: offX, // offsetY
    oY: offY // offsetX
  };
}

function applyMatrix(point, matrix) {
  var x = point[ 0 ];
  var y = point[ 1 ];
  var z = point[ 2 ];
  var w = (matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] ) || 1.0;
  point[ 0 ] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w;
  point[ 1 ] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w;
  point[ 2 ] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w;
}