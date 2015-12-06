let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateJsFrameworkJquery(params) {
  let jqueryModule = path.join(__base, 'modules', 'js-framework', 'jquery');
  let jqueryMin = path.join(jqueryModule, 'jquery.min.js');
  let mainJs = path.join(jqueryModule, 'main.js');
  let jqueryMinImport = path.join(jqueryModule, 'jquery-jade-import.jade');
  let mainJsImport = path.join(jqueryModule, 'main-jade-import.jade');
  switch (params.framework) {
    case 'express':
      let jsDir = path.join(__base, 'build', params.uuid, 'public', 'javascripts');

      await copy(jqueryMin, path.join(jsDir, 'jquery.min.js'));
      await copy(mainJs, path.join(jsDir, 'main.js'));

      if (params.templateEngine === 'jade') {
        let layout = path.join(__base, 'build', params.uuid, 'views', 'layout.jade');
        await replaceCode(layout, 'JQUERY_IMPORT', jqueryMinImport, { indentLevel: 2 });
        await replaceCode(layout, 'MAINJS_IMPORT', mainJsImport, { indentLevel: 2 });
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'swig') {
        // TODO
      } else {
        // TODO
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

module.exports = generateJsFrameworkJquery;
