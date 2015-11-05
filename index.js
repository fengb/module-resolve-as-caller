var path = require('path')
var callsite = require('callsite')

module.exports = function (modulePath) {
  if (modulePath[0] !== '.') {
    return modulePath
  }

  var stack = callsite()
  var invokerFile = stack[1].getFileName()
  for (var i = 2; i < stack.length; i++) {
    var entryFile = stack[i].getFileName()
    if (entryFile !== invokerFile) {
      return path.resolve(path.dirname(entryFile), modulePath)
    }
  }
}
