(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = "void main() { \n" +" \n" +
"  gl_FragColor = vec4(0.5, 0.6, 0.7, 1.0); \n" +" \n" +
"} \n" ;

},{}],2:[function(require,module,exports){

var vs = require("./vertex.c");
var fs = require("./fragment.c");

var gl = document.getElementById("webgl").getContext("webgl");

gl.clearColor(0.3, 0.4, 0.5, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

var prog = gl.createProgram();

if (typeof vs === "function"){
  vs = vs();
}
if (typeof fs === "function"){
  fs = fs();
}

addShader(gl.createShader(gl.VERTEX_SHADER), vs);
addShader(gl.createShader(gl.FRAGMENT_SHADER), fs);

gl.linkProgram(prog);
gl.useProgram(prog);

attributeSetFloats(gl, prog, "pos", 3, [
  -1, 0, 0,
  0, 1, 0,
  0, -1, 0,
  1, 0, 0
]);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

function attributeSetFloats(gl, prog, attr_name, rsize, arr) {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
  var attr = gl.getAttribLocation(prog, attr_name);
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, rsize, gl.FLOAT, false, 0, 0);
}

function addShader(shader, source) {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  gl.attachShader(prog, shader);
};
  




},{"./fragment.c":1,"./vertex.c":3}],3:[function(require,module,exports){
module.exports = "attribute vec3 pos; \n" +" \n" +
"void main() { \n" +" \n" +
"  gl_Position = vec4(pos, 1.0); \n" +" \n" +
"} \n" ;

},{}]},{},[2]);
