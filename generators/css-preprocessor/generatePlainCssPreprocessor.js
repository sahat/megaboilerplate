let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);

async function generatePlainCssPreprocessor(params) {
  switch (params.framework) {
    case 'express':
      let src = path.join(__base, 'modules', 'css-preprocessor', 'main.css');
      let dest = path.join(__base, 'build', params.uuid, 'public', 'stylesheets', 'main.css');
      await copy(src, dest);
      break;
    case 'hapi':
      // TODO
      break;
    case 'sails':
      // TODO
      break;
    default:
    // TODO
  }
}

module.exports = generatePlainCssPreprocessor;
