var STRING_TO_PERCENT = {
  left: 0,
  center: 0.5,
  right: 1,
  top: 0,
  bottom: 1
};

module.exports = function parseTransformOrigin(value) {

  // if the value is a string we'll parse it otherwise return an empty array
  if(typeof value === 'string') {

    return value
    .split(' ')
    .map( function(value) {
      if(STRING_TO_PERCENT[ value ] !== undefined) {
        return {
          isPercent: true,
          value: STRING_TO_PERCENT[ value ]
        };
      } else if(value.charAt(value.length - 1) === '%') {
        return {
          isPercent: true,
          value: parseFloat(value) / 100
        };
      } else {
        return {
          isPercent: false,
          value: parseFloat(value)
        };
      }
    });
  } else {

    return [ 
      { isPercent: true, value: 0.5 },
      { isPercent: true, value: 0.5 },
      { isPercent: false, value: 0 }
    ];
  }
};