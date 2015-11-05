var path = require('path')
var callsite = require('callsite')

module.exports = moduleResolveParent

function moduleResolveParent (modulePath, start) {
  if (modulePath[0] !== '.') {
    return modulePath
  }

  if (start == null) {
    start = 1
  }

  var stack = callsite()
  var invokerFile = stack[start].getFileName()
  for (var i = start + 1; i < stack.length; i++) {
    var entryFile = stack[i].getFileName()
    if (entryFile !== invokerFile) {
      return path.resolve(path.dirname(entryFile), modulePath)
    }
  }
}

moduleResolveParent.require = function (modulePath) {
  var path = moduleResolveParent(modulePath, 2)
  return require(path)
}
