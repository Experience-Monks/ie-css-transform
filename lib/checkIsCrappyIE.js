module.exports = function checkIsCrappyIE(el) {
  return !(
    el.style.transform === '' || 
    el.style.ieTransform === '' ||
    el.style.webkitTransform === '' ||
    el.style.mozTransform === '');
};