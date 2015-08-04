
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
  



