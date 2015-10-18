
'use strict';

let fs = require('fs');

module.exports = function (extensions) {
  return function (mako) {
    mako.preread(extensions, function stat(file, tree, mako, done) {
      fs.stat(file.path, function (err, stat) {
        if (err) return done(err);
        file.stat = stat;
        done();
      });
    });
  };
};
