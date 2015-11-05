var moduleResolveParent = require('../..')

module.exports = function () {
  return moduleResolveParent.apply(null, arguments)
}
