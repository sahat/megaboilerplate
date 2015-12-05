var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var shortid = require('shortid');

var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);

/**
 *
 * @param srcFile {buffer} - where to replace
 * @param subStr {string} - what to replace
 * @param newSrcFile {string} - replace it with this
 * @param [opts] {object} - options
 * @returns {string}
 */
async function replaceCode(srcFile, subStr, newSrcFile, opts) {
  opts = opts || {};

  let srcData = await readFile(srcFile);
  let newSrcData = await readFile(newSrcFile);

  let array = srcData.toString().split('\n');
  array.forEach((line, index) => {
    if (line.includes(subStr)) {
      if (opts.indentLevel) {
        newSrcData = indentCode(newSrcData, opts.indentLevel);
      }

      newSrcData = newSrcData.toString().split('\n').filter(Boolean).join('\n');

      if (opts.leadingBlankLine) {
        newSrcData = '\n' + newSrcData;
      }

      array[index] = newSrcData;
    }
  });
  srcData = array.join('\n');

  await writeFile(srcFile, srcData);
}

/**
 *
 * @param subStr {string} - what to indent
 * @param indentLevel {number} - how many levels to indent
 * @returns {string}
 */
function indentCode(subStr, indentLevel) {
  let defaultIndentation = 2;
  let indent = ' '.repeat(indentLevel * defaultIndentation);
  let array = subStr.toString().split('\n').filter(Boolean);
  array.forEach((line, index) => {
    array[index] = indent + line;
  });
  return array.join('\n');
}

module.exports = replaceCode;
