
'use strict';

let chai = require('chai');
let mako = require('mako');
let path = require('path');
let stat = require('..');

chai.use(require('chai-as-promised'));
let assert = chai.assert;
let fixture = path.resolve.bind(path, __dirname, 'fixtures');

describe('stat plugin', function () {
  it('should add the stat object for the input file', function () {
    return mako()
      .use(stat('js'))
      .use(function (bundl) {
        bundl.preread('js', function (file) {
          assert(file.stat);
        });
      })
      .analyze(fixture('simple/index.js'));
  });

  it('should fail when the file does not exist', function () {
    return assert.isRejected(mako().use(stat('js')).analyze(fixture('does-not-exist.js')));
  });
});
