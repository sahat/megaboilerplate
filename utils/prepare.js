let path = require('path');
let shortid = require('shortid');
let fs = require('fs-extra');
let Promise = require('bluebird');
let mkdirs = Promise.promisify(fs.mkdirs);
let copy = Promise.promisify(fs.copy);

async function prepare(params) {
  let gitignore = path.join(__base, 'modules', 'prepare', '.gitignore');
  params.uuid = shortid.generate();
  await mkdirs(path.join(__base, 'build', params.uuid));
  await copy(gitignore, path.join(__base, 'build', params.uuid, '.gitignore'));
  return params;
}

module.exports = prepare;
