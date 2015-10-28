# packagerc

Extended rc parser which extracts rc app name and defaults from package.json

## USAGE

The API is the same as [`rc`](https://github.com/dominictarr/rc), except the first argument -- the `appname` string -- is also optional. If not provided, it will be extracted from the relevant `package.json`, relative to process.cwd().

```js
// package.json
{
  "name": "some-package",
  // ...
  "rc": {
    "name": "somepackage"
  }
}
```

The `packagerc` lib allows you to invoke `rc` with the `appname` of `"somepackage"` from anywhere within your app, optionally supplying defaults just like for `rc`:

```js
var conf = require('packagerc')({
  // user-specified defaults
  port: 2468
})
// conf.port === 2468
```

Config resolution is exactly the same as `rc`:

```js
// .somepackagerc
{
  "port": 8888
}

var conf = require('packagerc')({
  port: 2468
})
// conf.port === 8888
```

Defaults may also be provided within the `package.json`, which will be overridden by any defaults you provide explicitly as part of the call to `rc`.

NB: NYI -- for now defaults in `package.json` are a *default* set of defaults which are completely superceded if any defaults are provided at runtime.

```js
// package.json
{
  "name": "some-package",
  // ...
  "rc": {
    "name": "somepackage",
    "defaults": {
      // package-specified defaults
      "port": 4444,
      "host": "0.0.0.0"
    }
  }
}

var conf = require('packagerc')()
// conf.port === 4444
// conf.host === '0.0.0.0'

var conf = require('packagerc')({
  port: 2468
})
// conf.port === 2468
// TODO: conf.host === '0.0.0.0'
// for now, conf.host === undefined
```
