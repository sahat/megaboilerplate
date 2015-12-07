let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let removeCode = require('../../utils/removeCode');
let replaceCode = require('../../utils/replaceCode');


async function generateCssFrameworkNone(params) {
  let build = path.join(__base, 'build', params.uuid);
  let normalizeCss = path.join(__base, 'modules', 'css-framework', 'none', 'normalize.css');
  let token = 'CSS_FRAMEWORK_IMPORT';
  let indentOptions = { indentLevel: 2 };

  switch (params.framework) {
    case 'express':
      let layout = path.join(build, 'views', 'layout.jade');

      if (params.templateEngine === 'jade') {
        let cssImport = path.join(__base, 'modules', 'css-framework', 'none', 'express-jade-import.jade');
        await replaceCode(layout, token, cssImport, indentOptions);
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'swig') {
        // TODO
      }

      await copy(normalizeCss, path.join(build, 'public', 'stylesheets', 'normalize.css'));
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

module.exports = generateCssFrameworkNone;
