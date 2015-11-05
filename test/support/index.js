var moduleResolveParent = require('../..')

var supportResolve = module.exports = function (path) {
  return moduleResolveParent(path)
}

supportResolve.nested = function (path) {
  return supportResolve(path)
}

supportResolve.deeply = function (path) {
  return supportResolve.nested(path)
}
