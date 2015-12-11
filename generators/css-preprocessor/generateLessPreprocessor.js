let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);

async function generateSassPreprocessor(params) {
  let build = path.join(__base, 'build', params.uuid);
  let mainLess = path.join(__base, 'modules', 'css-preprocessor', 'main.less');

  switch (params.framework) {
    case 'express':
      await copy(mainLess, path.join(build, 'public', 'stylesheets', 'main.less'));
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

module.exports = generateSassPreprocessor;
