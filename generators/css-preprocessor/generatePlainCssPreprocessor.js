let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));

async function generatePlainCssPreprocessor(params) {
  let src = path.join(__base, 'modules', 'css-preprocessor', 'main.css');
  let dest = path.join(__base, 'build', params.uuid, 'public', 'stylesheets', 'main.css');
  await fs.copy(src, dest);
}

module.exports = generatePlainCssPreprocessor;
