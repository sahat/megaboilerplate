let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');

const cssFrameworkWithJquery = ['bootstrapCss', 'bootstrapLess', 'bootstrapSass', 'foundationLess', 'foundationSass'];

async function generateJsFrameworkNone(params) {
  let mainJs = path.join(__base, 'modules', 'js-framework', 'none', 'main.js');
  let mainJsWithJquery = path.join(__base, 'modules', 'js-framework', 'none', 'main-with-jquery.js');

  switch (params.framework) {
    case 'express':
      let layout = path.join(__base, 'build', params.uuid, 'views', 'layout.jade');
      let mainJsImport = path.join(__base, 'modules', 'js-framework', 'none', 'express-jade-import.jade');

      // Add HTML references
      await addTemplateImport(params, layout, mainJsImport);

      // Copy main.js with jQuery support, if jQuery has been added by other dependencies
      // such as Bootstrap or Foundation CSS frameworks
      if (cssFrameworkWithJquery.includes(params.cssFramework)) {
        await copy(mainJsWithJquery, path.join(__base, 'build', params.uuid, 'public', 'javascripts', 'main.js'));
      } else {
        await copy(mainJs, path.join(__base, 'build', params.uuid, 'public', 'javascripts', 'main.js'));
      }
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

async function addTemplateImport(params, layout, templateImport) {
  switch (params.templateEngine) {
    case 'jade':
      await replaceCode(layout, 'JS_FRAMEWORK_IMPORT', templateImport, { indentLevel: 2 });
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

module.exports = generateJsFrameworkNone;
