var through = require('through');

/**
 *  Default extensions
 */
middleware.extensions = [
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

/**
 *  create middleware for handling shader files
 */
function middleware(file) {
  var matcher = new RegExp("\\."+ middleware.extensions.join("|")+"$")
  if (!matcher.test(file)) return through();

  var input = '';
  var write = function (buffer) {
    input += buffer;
  }

  var end = function () {
    this.queue(createModule(input));
    this.queue(null);
  }

  return through(write, end);

}
  /**
   *  create commonJS module for the loaded shader
   */
  function createModule(body, file) {
      var text = middleware.sanitize(body)
      var wrap = middleware.parameterise(text)
      var module = 'module.exports = ' + wrap + ';\n';
      return module
    };
  
  /**
   *  create handler function for parameterising the shader
   */
  middleware.parameterise = function(text) {
    function parse(params){
      var template = text
      params = params || {}
      for(var key in params) {
        var matcher = new RegExp("{{"+key+"}}","g")
        template = template.replace(matcher, params[key])
      }
      return template
    }
    return parse.toString().replace("text", text);
  }

  /**
   *  sanitise text input so that it can be inlined in a method
   */
  middleware.sanitize = function(text){
    text = text.replace(/\"/g, '\u005C\u0022')
    text = text.replace(/^(.*)/gm, '"$1')
    text = text.replace(/(.+)$/gm, '$1 \\n" +')
    text = text.replace(/\+$/, '')
    return text
  }

module.exports = middleware
