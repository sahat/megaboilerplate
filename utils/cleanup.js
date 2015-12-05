let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));

async function cleanup(params) {
  await fs.remove(path.join(__base, 'build', params.uuid));
}

module.exports = cleanup;
