import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateBootstrapLess(params) {
  let bootstrapDir = join(__base, 'modules', 'css-framework', 'bootstrap');
  let jqueryDir = join(__base, 'modules', 'css-framework', 'jquery');
  let publicDir = join(__base, 'build', params.uuid, 'public');

  // Add CSS import
  switch (params.templateEngine) {
    case 'jade':
      let layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      let cssImport = join(__base, 'modules', 'css-framework', 'bootstrap', 'jade-import.jade');
      await replaceCode(layout, 'CSS_FRAMEWORK_IMPORT', cssImport, { indentLevel: 2 });
      break;
    case 'handlebars':
      break;
    case 'nunjucks':
      break;
    default:
      break;
  }

  // Copy Bootstrap files
  await copy(join(bootstrapDir, 'main.less'), join(publicDir, 'stylesheets', 'main.less'));
  await copy(join(bootstrapDir, 'fonts'), join(publicDir, 'fonts'));
  await copy(join(bootstrapDir, 'less'), join(publicDir, 'stylesheets', 'vendor', 'bootstrap'));
  await copy(join(bootstrapDir, 'js', 'bootstrap.js'), join(publicDir, 'javascripts', 'vendor', 'bootstrap.js'));
  await copy(join(jqueryDir, 'jquery.js'), join(publicDir, 'javascripts', 'vendor', 'jquery.js'));
}

export default generateBootstrapLess;
