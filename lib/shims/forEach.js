if(Array.prototype.forEach === undefined) {
  Array.prototype.forEach = function(func, thisArg) {

    for(var i = 0, len = this.length; i < len; i++) {
      func.call(thisArg, this[ i ], i, this);
    }
  };
}