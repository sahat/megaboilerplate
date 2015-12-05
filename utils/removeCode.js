let path = require('path');
let shortid = require('shortid');
let fs = require('fs-extra');
let Promise = require('bluebird');
let readFile = Promise.promisify(fs.readFile);
let writeFile = Promise.promisify(fs.writeFile);

/**
 *
 * @param srcFile {buffer} - where to remove
 * @param subStr {string} - what to remove
 * @returns {string}
 */
async function removeCode(srcFile, subStr) {
  let srcData = await readFile(srcFile);
  let array = srcData.toString().split('\n');
  array.forEach((line, index) => {
    if (line.includes(subStr)) {
      array.splice(index, 1);
    }
  });
  srcData = array.join('\n');
  await writeFile(srcFile, srcData);
}

module.exports = removeCode;
