var expect = require('chai').expect
var path = require('path')
var moduleResolveAsCaller = require('..')

var supportResolve = require('./support')

describe('moduleResolveAsCaller', function () {
  it('does not convert absolute modules', function () {
    var converted = moduleResolveAsCaller('/abs/path')
    expect(converted).to.eq('/abs/path')
  })

  it('does not convert project modules', function () {
    var converted = moduleResolveAsCaller('chai')
    expect(converted).to.eq('chai')
  })

  context('relative to invoker', function () {
    it('resolves', function () {
      var absPath = path.resolve(__dirname, '.')
      expect(supportResolve('.')).to.eq(absPath)

      absPath = path.resolve(__dirname, '..')
      expect(supportResolve('..')).to.eq(absPath)
    })

    it('resolves nested within same file', function () {
      var absPath = path.resolve(__dirname, '.')
      expect(supportResolve.nested('.')).to.eq(absPath)

      absPath = path.resolve(__dirname, '..')
      expect(supportResolve.nested('..')).to.eq(absPath)
    })

    it('resolves deeply nested within same file', function () {
      var absPath = path.resolve(__dirname, '.')
      expect(supportResolve.deeply('.')).to.eq(absPath)

      absPath = path.resolve(__dirname, '..')
      expect(supportResolve.deeply('..')).to.eq(absPath)
    })
  })

  describe('.require', function () {
    it('uses parent instead of current file', function () {
      expect(function () {
        moduleResolveAsCaller.require('./support')
      }).to.throw(/Cannot find module/)
    })
  })
})
