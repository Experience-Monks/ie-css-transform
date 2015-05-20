# ie-css-transform

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

![Example](https://raw.githubusercontent.com/Jam3/ie-css-transform/master/example.gif)

A function which you pass a css transform (2d or 3d) and an optional transform origin value to and it will try to emulate it for ie6 - ie8.

For browsers which support css transforms it will simply just use the css transform property.

Supported transform properties in IE:
ALL 2d and 3d tranformations however 3d rotations (rotateX, rotateY) will not look correct as there are no perspective transformations.


## Usage

[![NPM](https://nodei.co/npm/ie-css-transform.png)](https://www.npmjs.com/package/ie-css-transform)

```javascript
var applyTransform = require('ie-css-transform');

var el = document.createElement('div');

applyTransform(el, 'perspective(1000px) translateZ(-500px)', '0% 0%');

el.style.width = el.style.height = '100px';
el.style.background = '#CAFE00';
```

Optionally a [gl-mat4](http://npmjs.com/gl-mat4) can be passed instead of a transform value. This will be slightly more performant as the string does not need to be parsed. Also for a smaller file size you may want to do the following:
```javascript
var fromMatrix = require('ie-css-transform/fromMatrix');
var glMat4 = require('gl-mat4');

var el = document.createElement('div');
var matrix = glMat4.create();
glMat4.rotateX(matrix, matrix, Math.PI * 0.25);

fromMatrix(el, matrix, '100% 0%');

el.style.width = el.style.height = '100px';
el.style.background = '#CAFE00';
```

## Gotchas

### IE Translation

Translations in IE can only be emulated via the CSS properties `left`, `top`, `marginLeft`, `marginTop`. This module uses `marginLeft` and `marginTop` so it may overwrite any CSS applied for this properties.

### 3D Rotation

There are obviously no 3D transforms in IE but it seems that skews "emulate" 3d rotation "ok". There will be no perspective transformations since we cannot apply 3D transformation matrices but only 2D transformation matrices.

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/ie-css-transform/blob/master/LICENSE.md) for details.
