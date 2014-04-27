browserify-shader
=================

super simple browserify transform for loading webgl shaders

###Installation:

`npm install browserify-handlebars`

###Usage:

Simply use `require()` to load your shader files:
```javascript
var vs = require('./vertex.c');
```
Register your shader:

**native**:
```javascript
var shader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(shader, vs()); 
gl.compileShader(shader);
gl.attachShader(yourWebGLProg, shader);
```

**THREE.js**:
```javascript
```

## Build

### CLI:
run browserify with the transform option:
```bash
browserify -t browserify-shader entry-point.js
```

### Node/grunt/gulp:
When compiling using Javascript code custom extensions can be set:
```javascript
var browserify = require("browserify");
var browserifyShader = require("browserify-shader")
browserifyShader.extensions["vs", "fs", "c"]

browserify("./index.js");
  .transform(browserifyShader);
  .bundle()
  .pipe(fs.createWriteStream("./bundle.js"));
```
