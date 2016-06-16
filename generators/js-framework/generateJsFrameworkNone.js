import { set } from 'lodash';
import { getModule, replaceCodeMemory } from '../utils';

const CSS_FRAMEWORK_JQUERY_DEP = ['bootstrap', 'foundation'];

export default async function generateJsFrameworkNone(params) {
  switch (params.framework) {
    case 'express':
      switch (params.templateEngine) {
        case 'jade':
          await replaceCodeMemory(params, 'views/layout.jade', 'JS_FRAMEWORK_MAIN_IMPORT', await getModule('js-framework/none/express-jade-import.jade'), { indentLevel: 2 });
          break;
        case 'handlebars':
          await replaceCodeMemory(params, 'views/layouts/main.handlebars', 'JS_FRAMEWORK_MAIN_IMPORT', await getModule('js-framework/none/express-html-import.html'));
          break;
        case 'nunjucks':
          await replaceCodeMemory(params, 'views/layout.html', 'JS_FRAMEWORK_MAIN_IMPORT', await getModule('js-framework/none/express-html-import.html'));
          break;
        default:
      }

      // Add main.js w/ jQuery support for Bootstrap or Foundation CSS frameworks
      if (CSS_FRAMEWORK_JQUERY_DEP.includes(params.cssFramework)) {
        set(params.build, ['public', 'js', 'main.js'], await getModule('js-framework/none/main-with-jquery.js'));
      } else {
        set(params.build, ['public', 'js', 'main.js'], await getModule('js-framework/none/main.js'));
      }

      // Initialize Foundation JS components
      if (params.cssFramework === 'foundation') {
        await replaceCodeMemory(params, 'public/js/main.js', 'FOUNDATION_INIT', await getModule('css-framework/foundation/foundation-init.js'));
      }
      break;
    case 'meteor':
      break;
    default:
  }
}
