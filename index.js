module.exports = function (extra_extensions) {
  var extensions = [
    , ".glsl"
    , ".vert"
    , ".frag"
    , ".vs"
    , ".fs"
    , ".gs"
    , ".vsh"
    , ".fsh"
    , ".gsh"
    , ".vshader"
    , ".fshader"
    , ".gshader"
  ];

  /**
   *  add custom extensions
   */
  if (extra_extensions && extra_extensions.length){
    extra_extensions.forEach(function(ext){
      ~~extensions.indexOf(ext) && extensions.push(ext)
    })
  }

  /**
   *  register new extensions for browserify
   */
  var middleware = function (bundle) {
    for (var i = 0; i < extensions.length; i++) {
      bundle.register(extensions[i], createModule);
    }
  }
  
  /**
   *  create handler function for parameterising the shader
   */
  function parameterise(text) {
    var result = sanitize(text)
  
    function parse(params){
      var template = result
      params = params || {}
      for(var key in params) {
        var matcher = new RegExp("{{"+key+"}}","g")
        template = template.replace(matcher, params[key])
      }
      return template
    }
    return result.toString().replace("result", "'"+result+"';");
  }

  /**
   *  create commonJS module for the loaded shader
   */
  function createModule(body, file) {
      return 'module.exports = ' + parameterise(body) + ';\n';
    };

  
  /**
   *  sanitise text input so that it can be inlined in a method
   */
  function sanitize(text){
    text = text.replace(/\"/g, '\u005C\u0022')
    text = text.replace(/^(.*)/gm, '"$1')
    text = text.replace(/(.+)$/gm, '$1" +')
    text = text.replace(/\+$/, '')
    return text
  }
  return middleware;
};
