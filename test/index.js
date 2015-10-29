
'use strict';

let chai = require('chai');
let mako = require('mako');
let path = require('path');
let stat = require('..');
let touch = require('touch').sync;

chai.use(require('chai-as-promised'));
let assert = chai.assert;
let fixture = path.resolve.bind(path, __dirname, 'fixtures');

describe('stat plugin', function () {
  it('should add the stat object for the input file', function () {
    let entry = fixture('simple/index.js');

    return mako()
      .use(stat('js'))
      .analyze(entry)
      .then(function (tree) {
        let file = tree.getFile(entry);
        assert(file.stat);
      });
  });

  it('should fail when the file does not exist', function () {
    return assert.isRejected(mako().use(stat('js')).analyze(fixture('does-not-exist.js')));
  });

  it('should analyze the file again if the mtime has changed', function () {
    let entry = fixture('simple/index.js');
    let processed = [];

    let builder = mako().use(stat('js'));

    builder.read('js', function (file) {
      processed.push(file.path);
    });

    return builder.analyze(entry)
      .then(() => touch(entry))
      .then(() => builder.analyze(entry))
      .then(() => assert.deepEqual(processed, [ entry, entry ]));
  });
});
