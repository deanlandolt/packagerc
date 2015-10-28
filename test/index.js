'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var packagerc = require('../')

var packageConf = {
  name: 'some-package',
  version: '0.0.0',
  private: true,
  rc: {
    name: 'somepackage',
    defaults: {
      port: 4444,
      host: '0.0.0.0'
    }
  }
}

// write package.json at __dirname
var packagePath = __dirname + '/package.json'
fs.writeFileSync(packagePath, JSON.stringify(packageConf, null, '  ') + '\n')

var localConf = {
  foo: false
}

// write local rc config relative to cwd
var localPath = path.resolve('.somepackagerc')
fs.writeFileSync(localPath, JSON.stringify(localConf, null, '  ') + '\n')

function cleanup () {
  try {
    fs.unlinkSync(localPath)
  }
  catch (err) {}
}

// wipe local rc config on process exit
process.on('exit', cleanup).on('uncaughtException', cleanup)


test('standard rc signature w/o defaults', function (t) {
  var conf = packagerc('somepackage')

  t.equal(conf.port, undefined, 'no package default')
  t.equal(conf.host, undefined, 'no package default')
  t.equal(conf.foo, false, 'local default')
  t.end()
})

test('standard rc signature w/ defaults', function (t) {
  var conf = packagerc('somepackage', {
    port: 2468,
    foo: true
  })

  t.equal(conf.port, 2468, 'user default')
  t.equal(conf.host, undefined, 'no package default')
  t.equal(conf.foo, false, 'local default')
  t.end()
})

test.skip('module-based target signature w/ defaults', function (t) {
  var conf = packagerc(module, {
    port: 2468,
    foo: true
  })

  t.equal(conf.port, 2468, 'user default')
  t.equal(conf.host, '0.0.0.0', 'package default')
  t.equal(conf.foo, false, 'local default')
  t.end()
})

test('package-provided defaults', function (t) {
  var conf = packagerc()

  t.equal(conf.port, 4444, 'package default')
  t.equal(conf.host, '0.0.0.0', 'package default')
  t.equal(conf.foo, false, 'local default')
  t.end()
})

test('user-provided defaults', function (t) {
  var conf = packagerc({
    port: 2468,
    foo: true
  })

  t.equal(conf.port, 2468)
  t.equal(conf.host, '0.0.0.0')
  t.equal(conf.foo, false, 'local default')
  t.end()
})
