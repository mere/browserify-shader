browserify-shader [![Build Status](https://travis-ci.org/mere/browserify-shader.svg)](https://travis-ci.org/mere/browserify-shader)
=================
super simple browserify transform for loading webgl shaders


### Installation:

`npm install browserify-shader --save`
<br />[![NPM](https://nodei.co/npm/browserify-shader.png?mini=true)](https://nodei.co/npm/browserify-shader/)

### Usage:

Simply use `require()` to load your shader files:

```javascript
var vs = require('./vertex.c');
var fs = require('./fragment.c');
```

#### WebGL API example:
```javascript
var vs = require('./vertex.c');
var fs = require('./fragment.c');

var shader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(shader, vs()); 
gl.compileShader(shader);
gl.attachShader(yourWebGLProg, shader);
```

#### THREE.js example:
```javascript
var vs = require('./vertex.c');
var fs = require('./fragment.c');

var myMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: vs(),
        fragmentShader: fs(),
        transparent: true,
        side: THREE.BackSide
    });
```

## Parameterised shaders:
You can add **compile-time** parameters in your shaders.
<br />Simply add `{{foo}}`-style parameters, eg.:
```c
attribute vec3 pos;
void main() {
  gl_Position = vec4(pos, {{zoom}});
}
```
Then in your code:
```javascript
var vs = require('./vertex.c');
...
gl.shaderSource(shader, vs({
    zoom: "2.0"
  })); 
```
For runtime parameters, use `uniform`-s in the shader.

## Extensions
browserify-shader recognises the following extensions by default:
```javascript
[
    "c"
  , "glsl"
  , "vert"
  , "frag"
  , "vs"
  , "fs"
  , "gs"
  , "vsh"
  , "fsh"
  , "gsh"
  , "vshader"
  , "fshader"
  , "gshader"
];
```
You can add/delete/modify this list using:
```javascript
require("browserify-shader").extensions = ["vertexshader", "fragmentshader", "c"]
```

## How to run 
## Options
The following options will work if you want to customize your transform:

- parameterize: Boolean
  - enables parameterised shaders, **Note:** if disabled, modules will be required/imported as strings instead of functions.
- module: String
  - configures module type incase your using an es6 transpiler with browserify, possibilities are "es6"/"es2015" and "common" (default).
  
### CLI:
run browserify with the transform option:
```bash
browserify -t browserify-shader entry-point.js
```
```bash
browserify -t [browserify-shader --parameterize=true] entry-point.js
```

### Node/grunt:
When compiling using Javascript code custom extensions can be set:
```javascript
var browserify = require("browserify");
var browserifyShader = require("browserify-shader")

browserify("./index.js");
  .transform(browserifyShader, {
     module: "es6"
  });
  .bundle()
  .pipe(fs.createWriteStream("./bundle.js"));
```

### Gulp + Watchify
```javascript
var gulp = require('gulp')
var source = require('vinyl-source-stream')

gulp.task('watch', function() {
  var bundler = watchify('./src/index.js');
  bundler.transform('browserify-shader') 

  bundler.on('update', rebundle)

  function rebundle () {
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'))
  }

  return rebundle()
})
```
