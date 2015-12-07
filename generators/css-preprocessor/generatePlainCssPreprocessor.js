let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);

async function generatePlainCssPreprocessor(params) {
  let build = path.join(__base, 'build', params.uuid);
  let mainCss = path.join(__base, 'modules', 'css-preprocessor', 'main.css');

  switch (params.framework) {
    case 'express':
      await copy(mainCss, path.join(build, 'public', 'stylesheets', 'main.css'));
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
