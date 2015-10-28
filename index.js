'use strict'

var findPackage = require('find-package')
var rc = require('rc')

module.exports = function (name, defaults, argv, parse) {
  var conf = findPackage(module.parent.filename, true).rc || {}
  var confDefaults = conf.defaults

  if (typeof name === 'string') {
    // allow package defaults for other rc app names
    confDefaults = conf.named && conf.named[name]
  }
  else if (conf.name) {
    // shift arguments
    parse = argv
    argv = defaults
    defaults = name

    // rc app name resolved from package
    name = conf.name
  }
  
  if (!name) throw new Error('no rc app name found')

  // TODO: patch rc to allow multiple configs to be provided?
  if (!defaults && confDefaults) defaults = confDefaults

  return rc(name, defaults, argv, parse)
}
