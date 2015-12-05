let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let remove = Promise.promisify(fs.remove);

async function cleanup(params) {
  await remove(path.join(__base, 'build', params.uuid));
}

module.exports = cleanup;
