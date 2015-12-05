let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);

async function generatePlainCssPreprocessor(params) {
  let src = path.join(__base, 'modules', 'css-preprocessor', 'main.css');
  let dest = path.join(__base, 'build', params.uuid, 'public', 'stylesheets', 'main.css');
  await copy(src, dest);
}

module.exports = generatePlainCssPreprocessor;
