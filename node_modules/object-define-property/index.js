var defProp = Object.defineProperty, defProps = Object.defineProperties;


module.exports = {
  defineProperty: function defineProperty(object, property, descriptor) {
    defProp.call(Object, object, property, descriptor);
  },
  defineProperties: function defineProperties(object, properties) {
    defProps.call(Object, object, properties);
  }
};
