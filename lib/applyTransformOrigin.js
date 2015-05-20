module.exports = function applyTransformOrigin(el, transformOrigin) {

  if(transformOrigin) {
    el.style.transformOrigin = transformOrigin;
    el.style.webkitTransformOrigin = transformOrigin;
    el.style.mozTransformOrigin = transformOrigin;
    el.style.ieTransformOrigin = transformOrigin;
  }
};