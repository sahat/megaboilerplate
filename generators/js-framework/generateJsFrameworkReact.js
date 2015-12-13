let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');

async function generateJsFrameworkReact(params) {
  let build = path.join(__base, 'build', params.uuid);
  let mainJs = path.join(__base, 'modules', 'js-framework', 'react', 'main.js');
  let react = path.join(__base, 'modules', 'js-framework', 'react', 'react.js');
  let reactDom = path.join(__base, 'modules', 'js-framework', 'react', 'react-dom.js');

  switch (params.framework) {
    case 'express':
      let layout = path.join(__base, 'build', params.uuid, 'views', 'layout.jade');
      let reactImport = path.join(__base, 'modules', 'js-framework', 'react', 'express-jade-import.jade');

      // Add HTML references
      await addTemplateImport(params, layout, reactImport);

      await copy(mainJs, path.join(build, 'public', 'javascripts', 'main.js'));
      await copy(react, path.join(build, 'public', 'javascripts', 'react.js'));
      await copy(reactDom, path.join(build, 'public', 'javascripts', 'react-dom.js'));
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

module.exports = generateJsFrameworkReact;
