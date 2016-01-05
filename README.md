# module-resolve-as-caller

## Installation

```bash
$ npm install module-resolve-as-caller
```

## Example

```javascript
//* node_modules/fancy/index.js

var moduleResolveAsCaller = require('module-resolve-as-caller')
function resolve (path) {
  return moduleResolveAsCaller(path)
}

function require (path) {
  return moduleResolveAsCaller.require(path)
}

//* user.js

var fancy = require('fancy')

// Use node_modules when not relative path
fancy.resolve('dependency')
fancy.require('dependency')

// Relative paths search up the callsite.
// In this example, this is relative to **user.js**, not **fancy.js**.
fancy.resolve('./relative')
fancy.require('./relative')
```

## Why?

Sometimes, we need metaprogramming tricks to get around the standard module
resolution:

* [require-optional](https://github.com/fengb/require-optional)

## License

MIT
