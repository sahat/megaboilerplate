import { join } from 'path';
import { copy, replaceCode, removeCode, addNpmPackage } from '../utils';

// CSS frameworks that depend on jQuery
const CSS_FRAMEWORK_WITH_JQUERY = ['bootstrap', 'foundation'];

// helper function
async function addTemplateImport(params, layout, templateImport) {
  switch (params.templateEngine) {
    case 'jade':
      await replaceCode(layout, 'JS_FRAMEWORK_MAIN_IMPORT', templateImport, { indentLevel: 2 });
      break;
    case 'handlebars':
      break;
    case 'nunjucks':
      break;
    default:
  }
}

async function generateJsFrameworkNone(params) {
  const mainJs = join(__dirname, 'modules', 'none', 'main.js');
  const mainJsWithJquery = join(__dirname, 'modules', 'none', 'main-with-jquery.js');

  switch (params.framework) {
    case 'express':
      const layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      const mainJsImport = join(__dirname, 'modules', 'none', 'express-jade-import.jade');

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

    case 'meteor':
      // TODO
      break;

    default:
    // TODO
  }
}

export default generateJsFrameworkNone;
