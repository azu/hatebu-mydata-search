var objectCreate = Object.create;


module.exports = function create(prototype, properties) {
  return objectCreate.call(Object, prototype, properties);
};
