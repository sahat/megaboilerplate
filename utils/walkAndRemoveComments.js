let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let removeCode = require('./removeCode');
let stat = Promise.promisify(fs.stat);

/**
 * Traverse files and remove placeholder comments
 * @param params
 */
function walkAndRemoveComments(params) {
  let build = path.join(__base, 'build', params.uuid);

  return new Promise((resolve, reject) => {
    fs.walk(build)
      .on('data', (item) => {
        return stat(item.path).then((stats) => {
          if (stats.isFile()) {
            return removeCode(item.path, '//=');
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve();
      })
  });
}

module.exports = walkAndRemoveComments;
