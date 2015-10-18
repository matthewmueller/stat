# mako-stat

> A mako plugin that stats the specified extensions during preread, making it useful in ensuring that files exist on disk.
> Generally, this will be consumed by other plugins rather than used directly.

## Usage

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

The `extensions` argument can be passed as either a single `String` or an `Array` of file extensions. (without the leading dot)

## Side Effects

For each file processed, this will retrieve the [Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object via [fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback) and adds it as `file.stat`.

## Use Cases

This plugin will likely be the base of 95% of other plugins, as having the stat is a quick way to determine if a file exists on disk before attempting to read it later.

The other stat details, such as the `mtime` can also be useful to other plugins working with a cache.
