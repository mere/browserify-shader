browserify-shader
=================

super simple browserify transform for loading webgl shaders

###Installation:

`npm install browserify-shaders`

###Usage:

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
You can add **compile-time** parameters in your shaders:
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

## Build

### CLI:
run browserify with the transform option:
```bash
browserify -t browserify-shader entry-point.js
```

### Node/grunt:
When compiling using Javascript code custom extensions can be set:
```javascript
var browserify = require("browserify");
var browserifyShader = require("browserify-shader")
browserifyShader.extensions = ["vs", "fs", "c"]

browserify("./index.js");
  .transform(browserifyShader);
  .bundle()
  .pipe(fs.createWriteStream("./bundle.js"));
```

### Gulp + Watchify
```javascript
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var watchify = require('watchify')

require("browserify-shader").extensions = ["vs", "fs", "c"]

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
