let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);


async function generateSassPreprocessor(params) {
  let build = path.join(__base, 'build', params.uuid);
  let mainSass = path.join(__base, 'modules', 'css-preprocessor', 'main.scss');

  switch (params.framework) {
    case 'express':
      await copy(mainSass, path.join(build, 'public', 'stylesheets', 'main.scss'));
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
