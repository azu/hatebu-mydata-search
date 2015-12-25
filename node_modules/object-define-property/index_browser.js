/* jshint proto:true */
// ES5 15.2.3.6
// http://es5.github.com/#x15.2.3.6

// Patch for WebKit and IE8 standard mode
// Designed by hax <hax.github.com>
// related issue: https://github.com/es-shims/es5-shim/issues#issue/5
// IE8 Reference:
//     http://msdn.microsoft.com/en-us/library/dd282900.aspx
//     http://msdn.microsoft.com/en-us/library/dd229916.aspx
// WebKit Bugs:
//     https://bugs.webkit.org/show_bug.cgi?id=36423

var has = require('has');
var bind = require('function-bind');

var ERR_NON_OBJECT_DESCRIPTOR = "Property description must be an object: ";
var ERR_NON_OBJECT_TARGET = "Object.defineProperty called on non-object: ";
var ERR_ACCESSORS_NOT_SUPPORTED = "getters & setters can not be defined " +
  "on this javascript engine";

var defProp = Object.defineProperty, defProps = Object.defineProperties;
var call = Function.prototype.call;
var prototypeOfObject = Object.prototype;


// If JS engine supports accessors creating shortcuts.
var defineGetter;
var defineSetter;
var lookupGetter;
var lookupSetter;
var supportsAccessors;
if ((supportsAccessors = has(prototypeOfObject, "__defineGetter__"))) {
  defineGetter = bind.call(call, prototypeOfObject.__defineGetter__);
  defineSetter = bind.call(call, prototypeOfObject.__defineSetter__);
  lookupGetter = bind.call(call, prototypeOfObject.__lookupGetter__);
  lookupSetter = bind.call(call, prototypeOfObject.__lookupSetter__);
}

function doesDefinePropertyWork(object) {
  try {
    defProp.call(Object, object, "sentinel", {});
    return "sentinel" in object;
  } catch (exception) {
    // returns falsy
  }
}

// check whether defineProperty works if it's given. Otherwise,
// shim partially.
if (defProp) {
  var definePropertyWorksOnObject = doesDefinePropertyWork({});
  var definePropertyWorksOnDom = typeof document === "undefined" ||
    doesDefinePropertyWork(document.createElement("div"));
  if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
    var definePropertyFallback = defProp, definePropertiesFallback = defProps;
  }
}


function defineProperty(object, property, descriptor) {
  if ((typeof object !== "object" && typeof object !== "function") || object === null) {
    throw new TypeError(ERR_NON_OBJECT_TARGET + object);
  }
  if ((typeof descriptor !== "object" && typeof descriptor !== "function") || descriptor === null) {
    throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
  }
  // make a valiant attempt to use the real defineProperty
  // for I8's DOM elements.
  if (definePropertyFallback) {
    try {
      return definePropertyFallback.call(Object, object, property, descriptor);
    } catch (exception) {
      // try the shim if the real one doesn't work
    }
  }

  // If it's a data property.
  if (has(descriptor, "value")) {
    // fail silently if "writable", "enumerable", or "configurable"
    // are requested but not supported
    if (supportsAccessors && (lookupGetter(object, property) ||
                              lookupSetter(object, property)))
      {
        // As accessors are supported only on engines implementing
        // `__proto__` we can safely override `__proto__` while defining
        // a property to make sure that we don't hit an inherited
        // accessor.
        var prototype = object.__proto__;
        object.__proto__ = prototypeOfObject;
        // Deleting a property anyway since getter / setter may be
        // defined on object itself.
        delete object[property];
        object[property] = descriptor.value;
        // Setting original `__proto__` back now.
        object.__proto__ = prototype;
      } else {
        object[property] = descriptor.value;
      }
  } else {
    if (!supportsAccessors) {
      throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
    }
    // If we got that far then getters and setters can be defined !!
    if (has(descriptor, "get")) {
      defineGetter(object, property, descriptor.get);
    }
    if (has(descriptor, "set")) {
      defineSetter(object, property, descriptor.set);
    }
  }
  return object;
}


function defineProperties(object, properties) {
  // make a valiant attempt to use the real defineProperties
  if (definePropertiesFallback) {
    try {
      return definePropertiesFallback.call(Object, object, properties);
    } catch (exception) {
      // try the shim if the real one doesn't work
    }
  }
  for (var property in properties) {
    if (has(properties, property) && property !== "__proto__") {
      defineProperty(object, property, properties[property]);
    }
  }
  return object;
}


if (!defProp || definePropertyFallback) {
  module.exports = {
    defineProperty: defineProperty,
    defineProperties: defineProperties
  };
} else {
  module.exports = require('./index');
}
