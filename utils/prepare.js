var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var shortid = require('shortid');

var mkdirs = Promise.promisify(fs.mkdirs);

async function prepare(params) {
  let root = path.dirname(require.main.filename);
  params.uuid = shortid.generate();
  await mkdirs(path.join(root, 'build', params.uuid));
  return params;
}

module.exports = prepare;
