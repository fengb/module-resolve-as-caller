var path = require('path')
var callsite = require('callsite')

module.exports = moduleResolveParent

function moduleResolveParent (modulePath, upFiles) {
  if (modulePath[0] !== '.') {
    return modulePath
  }

  if (upFiles == null) {
    upFiles = 1
  }

  var stack = callsite()
  var prevFile = __filename
  for (var i = 1; i < stack.length; i++) {
    var stackFile = stack[i].getFileName()
    if (stackFile !== prevFile) {
      if (upFiles === 0) {
        return path.resolve(path.dirname(stackFile), modulePath)
      } else {
        prevFile = stackFile
        upFiles--
      }
    }
  }
}

moduleResolveParent.require = function (modulePath) {
  var path = moduleResolveParent(modulePath)
  return require(path)
}
