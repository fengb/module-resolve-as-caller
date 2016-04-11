var expect = require('chai').expect
var path = require('path')
var moduleResolveAsCaller = require('..')

var supportResolve = require('./support')

describe('moduleResolveAsCaller', function () {
  it('resolve absolute modules', function () {
    var converted = moduleResolveAsCaller(path.resolve(__dirname, '..'))
    expect(converted).to.eq(path.resolve(__dirname, '../index.js'))
  })

  it('does convert project modules', function () {
    var converted = supportResolve('./support/a')
    expect(path.relative(__dirname, converted)).to.eq(
      'support/a.js'
    )
  })

  it('does convert project sub-modules', function () {
    var converted = supportResolve('chai')
    expect(path.relative(__dirname, converted)).to.eq(
      '../node_modules/chai/index.js'
    )
  })


  it('does convert nested project modules', function () {
    var converted = supportResolve.nested('./support/a')
    expect(path.relative(__dirname, converted)).to.eq(
      'support/a.js'
    )
  })

  it('does convert nested project sub-modules', function () {
    var converted = supportResolve.nested('chai')
    expect(path.relative(__dirname, converted)).to.eq(
      '../node_modules/chai/index.js'
    )
  })

   it('does convert deeply nested project modules', function () {
    var converted = supportResolve.deeply('./support/a')
    expect(path.relative(__dirname, converted)).to.eq(
      'support/a.js'
    )
  })

  it('does convert deeply nested project sub-modules', function () {
    var converted = supportResolve.deeply('chai')
    expect(path.relative(__dirname, converted)).to.eq(
      '../node_modules/chai/index.js'
    )
  })

  context('relative to invoker', function () {
    it('resolves', function () {
      var absPath = path.resolve(__dirname, 'support/index.js')
      expect(supportResolve('./support')).to.eq(absPath)

      absPath = path.resolve(__dirname, '..')
      expect(supportResolve('../test/module-relative-as-caller')).to.eq(__filename)
    })

    it('resolves nested within same file', function () {
      var absPath = path.resolve(__dirname, 'support/index.js')
      expect(supportResolve.nested('./support')).to.eq(absPath)

      absPath = path.resolve(__dirname, '..')
      expect(supportResolve.nested('../test/module-relative-as-caller')).to.eq(__filename)
    })

    it('resolves deeply nested within same file', function () {
      var absPath = path.resolve(__dirname, 'support/index.js')
      expect(supportResolve.deeply('./support')).to.eq(absPath)

      absPath = path.resolve(__dirname, '..')
      expect(supportResolve.deeply('../test/module-relative-as-caller')).to.eq(__filename)
    })
  })

  describe('.require', function () {
    it('uses parent instead of current file', function () {
      expect(function () {
        moduleResolveAsCaller.require('./a')
      }).to.throw(/AssertionError: missing path/)
    })
  })
})
