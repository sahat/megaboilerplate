import { join } from 'path';
import { copy, replaceCode, removeCode } from '../utils';

async function generateCssFrameworkNone(params) {
  let build = join(__base, 'build', params.uuid);
  let normalizeCss = join(__base, 'modules', 'css-framework', 'none', 'normalize.css');
  let token = 'CSS_FRAMEWORK_IMPORT';
  let indentOptions = { indentLevel: 2 };

  switch (params.framework) {
    case 'express':
      let layout = join(build, 'views', 'layout.jade');

      if (params.templateEngine === 'jade') {
        let cssImport = join(__base, 'modules', 'css-framework', 'none', 'express-jade-import.jade');
        await replaceCode(layout, token, cssImport, indentOptions);
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'nunjucks') {
        // TODO
      }

      await copy(normalizeCss, join(build, 'public', 'stylesheets', 'normalize.css'));
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

export default generateCssFrameworkNone;
