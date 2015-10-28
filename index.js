'use strict'

var extend = require('deep-extend')
var rc = require('rc')
var resolve = require('find-package')

module.exports = function (name, userDefaults, argv, parse) {
  // TODO: allow `name` to be provided as a module instance?

  var meta = resolve(module.parent.filename, true) || {}
  var metaConf = meta.rc || {}
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
