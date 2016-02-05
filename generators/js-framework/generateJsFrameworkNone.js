import { join } from 'path';
import { copy, replaceCode, removeCode, addNpmPackage } from '../utils';

const CSS_FRAMEWORK_WITH_JQUERY = ['bootstrap', 'foundation'];

async function addTemplateImport(params, layout, templateImport) {
  switch (params.templateEngine) {
    case 'jade':
      await replaceCode(layout, 'JS_FRAMEWORK_IMPORT', templateImport, { indentLevel: 2 });
      break;
    case 'handlebars':
      break;
    case 'nunjucks':
      break;
    default:
  }
}

async function generateJsFrameworkNone(params) {
  let mainJs = join(__base, 'modules', 'js-framework', 'none', 'main.js');
  let mainJsWithJquery = join(__base, 'modules', 'js-framework', 'none', 'main-with-jquery.js');

  switch (params.framework) {
    case 'express':
      let layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      let mainJsImport = join(__base, 'modules', 'js-framework', 'none', 'express-jade-import.jade');

      // Add HTML references
      await addTemplateImport(params, layout, mainJsImport);

      // Copy main.js with jQuery support, if jQuery has been added by other dependencies
      // such as Bootstrap or Foundation CSS frameworks
      if (CSS_FRAMEWORK_WITH_JQUERY.includes(params.cssFramework)) {
        await copy(mainJsWithJquery, join(__base, 'build', params.uuid, 'public', 'js', 'main.js'));
      } else {
        await copy(mainJs, join(__base, 'build', params.uuid, 'public', 'js', 'main.js'));
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

export default generateJsFrameworkNone;
