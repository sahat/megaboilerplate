let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);

async function generatePlainCssPreprocessor(params) {
  let cssPreprocessorModule = path.join(__base, 'modules', 'css-preprocessor');
  let normalizeCss = path.join(cssPreprocessorModule, 'normalize.css');
  let mainCss = path.join(cssPreprocessorModule, 'main.css');

  switch (params.framework) {
    case 'express':
      let cssDir = path.join(__base, 'build', params.uuid, 'public', 'stylesheets');
      await copy(normalizeCss, path.join(cssDir, 'normalize.css'));
      await copy(mainCss, path.join(cssDir, 'main.css'));
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
