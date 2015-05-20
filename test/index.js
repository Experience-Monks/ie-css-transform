var cssTransformToMat4 = require('css-transform-to-mat4');
var raf = require('raf');
var applyTransform = require('../.');

createTest('scale(0.5, 1)');
createTest('rotate(30deg)');
createTest('rotate(-40deg) scale(0.5, 0.75)');
createTest('scale(0.5, 0.5) translate(300px, 200px)');
createTest('skewX(45deg)');
createTest('perspective(1000px) rotateX(80deg)');
createTest('perspective(1000px) rotateY(45deg)');
createTest('perspective(1000px) translate(300px, 200px, -100px)');
createTest('perspective(1000px) translate(300px, 200px, -500px)');
createTest('perspective(1000px) translate(300px, 200px, -1000px)');
createTest('perspective(1000px) translate(300px, 200px, -1500px)');
createTest('rotate(-40deg) scale(0.5, 0.75)', '0% 0%');
createTest('rotate(-40deg) scale(0.5, 0.75)', '50% 50%');
createTest('rotate(-40deg) scale(0.5, 0.75)', '100% 50%');
createTest('rotate(-40deg) scale(0.5, 0.75)', 'left center');
createAnimatedTest( function() {
  this.rotation = this.rotation || 0;
  this.rotation += 0.4;
  return 'rotate(' + this.rotation + 'deg)';
});
createAnimatedTest( function() {
  this.rotation = this.rotation || 0;
  this.rotation += 0.4;
  return 'rotate(' + this.rotation + 'deg)';
}, '0% 0%');
createAnimatedTest( function() {
  this.x = this.x || 0;
  this.x += 0.03;
  return 'translateX(' + ( Math.cos(this.x) * 100 + 100 ) + 'px)';
}, '50% 50%');
createAnimatedTest( function() {
  this.x = this.x || 0;
  this.x += 0.03;
  return 'translateX(' + ( Math.cos(this.x) * 100 + 100 ) + 'px)';
}, '0% 0%');
createAnimatedTest( function() {
  this.x = this.x || 0;
  this.x += 0.03;
  return 'translateX(' + ( Math.cos(this.x) * 100 + 100 ) + 'px)';
}, '100% 100%');
createAnimatedTest( function() {
  this.z = this.z || 0;
  this.z += 0.01;

  return 'perspective(1000px) translateX(30px) translateZ(' + ( Math.cos(this.z) * 500 ) + 'px)';
});
createAnimatedTest( function() {
  this.rotation += 0.4;

  return 'perspective(1000px) rotateX(' + this.rotation + 'deg)';
});
createAnimatedTest( function() {
  this.rotation = this.rotation || 0;
  this.z = this.z || 0;
  this.rotation += 0.4;
  this.z += 0.01;

  return 'perspective(1000px) translateZ(' + ( Math.cos(this.z) * 500 ) + 'px) rotateX(' + this.rotation + 'deg)';
});


function createAnimatedTest(getTransform, transformOrigin) {

  var el = getElement('#CAFE00');
  

  var animate = function() {
      applyTransform(el, getTransform(), transformOrigin);
      rotation += 0.4;
      raf(animate);
  };

  animate();
}

function createTest(transform, transformOrigin) {
  var el = getElement('#00BABE');

  applyTransform(el, cssTransformToMat4(transform), transformOrigin);

  return el;
}

function getElement(colour) {
  var p = document.createElement('div');
  var el = document.createElement('div');

  p.style.position = 'relative';
  p.style.height = '200px';
  p.style.border = '1px solid #000';

  applyBaseCSS(el, colour);

  p.appendChild(el);
  document.body.appendChild(p);

  return el;
}

function applyBaseCSS(el, colour) {
  el.style.background = colour;
  el.style.width = el.style.height = '100px';
}