
'use strict';

let debug = require('debug')('mako-stat');
let fs = require('fs');

module.exports = function (extensions) {
  debug('initialize %j', extensions);

  return function (mako) {
    mako.preread(extensions, function stat(file, tree, mako, done) {
      debug('checking stat for %s', file.path);
      let previous = file.stat;
      fs.stat(file.path, function (err, stat) {
        if (err) {
          debug(err.message);
          done(err);
        } else {
          debug('stat for %s', file.path, stat);
          file.stat = stat;
          if (modified(previous, stat)) file.dirty();
          done();
        }
      });
    });
  };
};

/**
 * Compare two `fs.Stat` objects to see if the `mtime` has changed.
 *
 * @param {fs.Stat} previous  The last stat object.
 * @param {fs.Stat} current   The new stat object.
 * @return {Boolean}
 */
function modified(previous, current) {
  if (!previous) return true;
  return previous.mtime.getTime() !== current.mtime.getTime();
}
