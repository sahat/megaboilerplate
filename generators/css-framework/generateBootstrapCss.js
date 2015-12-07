let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let replaceCode = require('../../utils/replaceCode');

async function generateBootstrapCss(params) {
  let bootstrapDir = path.join(__base, 'modules', 'css-framework', 'bootstrap');
  let jqueryDir = path.join(__base, 'modules', 'css-framework', 'jquery');
  let publicDir = path.join(__base, 'build', params.uuid, 'public');

  // Add CSS import
  switch (params.templateEngine) {
    case 'jade':
      let layout = path.join(__base, 'build', params.uuid, 'views', 'layout.jade');
      let cssImport = path.join(__base, 'modules', 'css-framework', 'bootstrap', 'jade-import.jade');
      await replaceCode(layout, 'CSS_FRAMEWORK_IMPORT', cssImport, { indentLevel: 2 });
      break;
    case 'handlebars':
      // TODO
      break;
    case 'swig':
      // TODO
      break;
    default:
      break;
  }

  // Copy Bootstrap files
  await copy(path.join(bootstrapDir, 'main.css'), path.join(publicDir, 'stylesheets', 'main.css'));
  await copy(path.join(bootstrapDir, 'fonts'), path.join(publicDir, 'fonts'));
  await copy(path.join(bootstrapDir, 'css', 'bootstrap.min.css'), path.join(publicDir, 'stylesheets', 'vendor', 'bootstrap.min.css'));
  await copy(path.join(bootstrapDir, 'js', 'bootstrap.min.js'), path.join(publicDir, 'javascripts', 'vendor', 'bootstrap.min.js'));
  await copy(path.join(jqueryDir, 'jquery.min.js'), path.join(publicDir, 'javascripts', 'vendor', 'jquery.min.js'));
}

module.exports = generateBootstrapCss;
