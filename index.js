var path = require('path')
var callsite = require('callsite')

module.exports = function (modulePath) {
  if (modulePath[0] !== '.') {
    return modulePath
  }

  var invokerParentFile = callsite()[2].getFileName()
  return path.resolve(path.dirname(invokerParentFile), modulePath)
}
