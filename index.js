
'use strict';

let debug = require('debug')('mako-stat');
let fs = require('fs');
let path = require('path');

const pwd = process.cwd();
const relative = abs => path.relative(pwd, abs);


module.exports = function (extensions) {
  debug('initialize %j', extensions);

  return function (mako) {
    mako.preread(extensions, function stat(file, tree, mako, done) {
      debug('checking %s', relative(file.path));
      let previous = file.stat;
      fs.stat(file.path, function (err, stat) {
        if (err) {
          debug(err.message);
          done(err);
        } else {
          file.stat = stat;
          if (modified(previous, stat)) {
            debug('dirty %s', relative(file.path));
            file.dirty();
          }
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
