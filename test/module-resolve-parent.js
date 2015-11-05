var expect = require('chai').expect
var path = require('path')
var moduleResolveParent = require('..')

var supportResolve = require('./support')

describe('moduleResolveParent', function () {
  it('does not convert absolute modules', function () {
    var converted = moduleResolveParent('/abs/path')
    expect(converted).to.eq('/abs/path')
  })

  it('does not convert project modules', function () {
    var converted = moduleResolveParent('chai')
    expect(converted).to.eq('chai')
  })

  it('resolves relative to the directory of the invoker', function () {
    var absPath = path.resolve(__dirname, '.')
    expect(supportResolve('.')).to.eq(absPath)

    absPath = path.resolve(__dirname, '..')
    expect(supportResolve('..')).to.eq(absPath)
  })
})
