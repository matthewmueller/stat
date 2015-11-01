# mako-stat

> A mako analyze plugin for stating files on disk.

[![npm version](https://img.shields.io/npm/v/mako-stat.svg)](https://www.npmjs.com/package/mako-stat)
[![npm dependencies](https://img.shields.io/david/makojs/stat.svg)](https://david-dm.org/makojs/stat)
[![npm dev dependencies](https://img.shields.io/david/dev/makojs/stat.svg)](https://david-dm.org/makojs/stat#info=devDependencies)
[![build status](https://img.shields.io/travis/makojs/stat.svg)](https://travis-ci.org/makojs/stat)

## Usage

This plugin is useful because it will fail quickly when a file does not really exist. Also, when
used in multiple builds, it will mark files as dirty so they are updated whenever they are changed.

```js
var mako = require('mako');
var stat = require('mako-stat');

mako()
  .use(stat('js'))
  .build('./index.js')
  .then(function () {
    // done!
  });
```

## API

### stat(extensions)

The `extensions` argument can be passed as either a single `String` or an `Array` of extensions.
(without the leading dot)

## Side Effects

For each file processed, this will retrieve the [Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object via [fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback) and adds it as `file.stat`.

If a subsequent build is run, this will mark files as dirty when the `mtime` has changed.
