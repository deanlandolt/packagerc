'use strict'

var extend = require('deep-extend')
var Module = require('module')
var rc = require('rc')
var resolve = require('find-package')

module.exports = function (name, userDefaults, argv, parse) {
  // allow `name` to be provided as a module instance
  var target = name instanceof Module ? name : module.parent

  // resolve package.json associated with target
  var meta = resolve(target.filename, true)
  var metaConf = meta && meta.rc || {}
  var metaDefaults = metaConf.defaults

  if (typeof name === 'string') {
    // allow package defaults for other rc app names
    metaDefaults = metaConf.named && metaConf.named[name]
  }
  else {
    // shift arguments
    parse = argv
    argv = userDefaults
    userDefaults = name

    // rc app name resolved from package
    name = metaConf.name
  }
  
  if (!name) throw new Error('no rc app name found')

  // TODO: patch rc to allow multiple defaults to be provided?
  var defaults = extend({}, metaDefaults, userDefaults)

  // TODO: add package metadata to returned config?
  return rc(name, defaults, argv, parse)
}
