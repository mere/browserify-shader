var expect = require('chai').expect
var sut = require("../index.js")

describe('browserify-shader plugin', function(){
  
  describe('substitution processing', function(){
    it('should sanitize new lines', function(){
      expect(sut.sanitize('foo\nbar')).to.equal('"foo \\n" +\n"bar \\n" ')
    })


    it('should parse templates with no dynamic parts', function(){
      var f; eval("f = "+ sut.parameterise('"foo"'))
      expect(f()).to.equal('foo')
    })

    it('should parameterise single instances', function(){
      var f; eval("f = "+ sut.parameterise('"foo = {{bar}}"'))
      expect(f({
        bar: "dog"
      })).to.equal('foo = dog')
    })

    it('should parameterise multiple instances', function(){
      var f; eval("f = "+ sut.parameterise('"foo = {{bar}}{{bar}}"'))
      expect(f({
        bar: "dog"
      })).to.equal('foo = dogdog')
    })
  })

})
