var path = require('path')
var callsite = require('callsite')

var moduleResolveAsCaller = module.exports = function (modulePath, upFiles) {
  if (modulePath[0] !== '.') {
    return modulePath
  }

  var callerFile = findCallerFile(upFiles)
  return path.resolve(path.dirname(callerFile), modulePath)
}

moduleResolveAsCaller.require = function (modulePath) {
  var path = moduleResolveAsCaller(modulePath)
  return require(path)
}

function findCallerFile (up) {
  if (up == null) {
    up = 1
  }

  var stack = callsite()
  var prevFile = __filename
  for (var i = 1; i < stack.length; i++) {
    var stackFile = stack[i].getFileName()
    if (stackFile !== prevFile) {
      if (up === 0) {
        return stackFile
      } else {
        prevFile = stackFile
        up--
      }
    }
  }
}
