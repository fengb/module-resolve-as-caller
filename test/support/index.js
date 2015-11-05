var moduleResolveParent = require('../..')

var supportResolve = module.exports = function () {
  return moduleResolveParent.apply(null, arguments)
}

supportResolve.nested = function () {
  return supportResolve.apply(null, arguments)
}

supportResolve.deeply = function () {
  return supportResolve.nested.apply(null, arguments)
}
