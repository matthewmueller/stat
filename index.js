
'use strict';

let debug = require('debug')('mako-stat');
let fs = require('fs');

module.exports = function (extensions) {
  debug('initialize %j', extensions);

  return function (mako) {
    mako.preread(extensions, function stat(file, tree, mako, done) {
      debug('checking stat for %s', file.path);
      fs.stat(file.path, function (err, stat) {
        if (err) {
          debug(err.message);
          done(err);
        } else {
          debug('stat for %s', file.path, stat);
          file.stat = stat;
          done();
        }
      });
    });
  };
};
