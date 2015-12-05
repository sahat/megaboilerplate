let path = require('path');
let shortid = require('shortid');
let fs = require('fs-extra');
let Promise = require('bluebird');
let mkdirs = Promise.promisify(fs.mkdirs);

async function prepare(params) {
  params.uuid = shortid.generate();
  await mkdirs(path.join(__base, 'build', params.uuid));
  return params;
}

module.exports = prepare;
