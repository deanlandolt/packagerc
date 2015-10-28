var test = require('tape')
var packagerc = require('../')

test('package-provided defaults', function (t) {
  var conf = packagerc()

  t.equal(conf.port, 4444)
  t.equal(conf.host, '0.0.0.0')
  t.end()
})

test('user-provided defaults', function (t) {
  var conf = packagerc({
    port: 2468
  })

  t.equal(conf.port, 2468)
  // TODO
  // t.equal(conf.host, '0.0.0.0')
  t.equal(conf.host, undefined)
  t.end()
})
