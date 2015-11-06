var moduleResolveAsCaller = require('../..')

var supportResolve = module.exports = function (path) {
  return moduleResolveAsCaller(path)
}

supportResolve.nested = function (path) {
  return supportResolve(path)
}

supportResolve.deeply = function (path) {
  return supportResolve.nested(path)
}
