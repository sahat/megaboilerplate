let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let removeCode = require('../../utils/removeCode');
let replaceCode = require('../../utils/replaceCode');


async function generatePlainCssPreprocessor(params) {
  let build = path.join(__base, 'build', params.uuid);
  let normalizeCss = path.join(__base, 'modules', 'css-preprocessor', 'normalize.css');
  let mainCss = path.join(__base, 'modules', 'css-preprocessor', 'main.css');

  switch (params.framework) {
    case 'express':
      let layout = path.join(build, 'views', 'layout.jade');
      let cssImport = path.join(__base, 'modules', 'css-preprocessor', 'express-jade-import.jade');

      await addTemplateImport(params, layout, cssImport);
      await copy(normalizeCss, path.join(build, 'public', 'stylesheets', 'normalize.css'));
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

// move to utils

async function addTemplateImport(params, layout, templateImport) {
  switch (params.templateEngine) {
    case 'jade':
      await replaceCode(layout, 'CSS_PREPROCESSOR_IMPORT', templateImport, { indentLevel: 2 });
      break;
    case 'handlebars':
      // TODO
      break;
    case 'swig':
      // TODO
      break;
    default:
      // TODO
  }
}



module.exports = generatePlainCssPreprocessor;
