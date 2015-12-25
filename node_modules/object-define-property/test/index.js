var assert = require('assert');
var defineProperty = require('../index_browser').defineProperty;
var defineProperties = require('../index_browser').defineProperties;

// adapted from https://github.com/es-shims/es5-shim/blob/master/tests/spec/s-object.js#L91-L138
describe("defineProperty", function () {
  var obj;

  beforeEach(function() {
    obj = {};

    defineProperties(obj, {
      name: {
        value : 'Testing',
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  });

  it('should return the initial value', function () {
    assert(obj.hasOwnProperty('name'));
    assert.equal('Testing', obj.name);
  });

  it('should be setable', function () {
    obj.name = 'Other';
    assert.equal('Other', obj.name);
  });

  it('should return the parent initial value', function () {
    var child = Object.create(obj);

    assert.equal('Testing', child.name);
    assert(!child.hasOwnProperty('name'));
  });

  it('should not override the parent value', function () {
    var child = Object.create(obj);

    defineProperty(child, 'name', {
      value : 'Other'
    });

    assert.equal('Testing', obj.name);
    assert.equal('Other', child.name);
  });

  it('should throw error for non object', function () {
    assert.throws(function() {
      defineProperty(42, 'name', {});
    });
  });
});

if (!Object.create) {
  Object.create = (function(){
    function F(){}

    return function(o){
      if (arguments.length != 1) {
        throw new Error('Object.create implementation only accepts one parameter.');
      }
      F.prototype = o;
      return new F();
    };
  })();
}
