import { join } from 'path';
import { cpy, replaceCode } from '../utils';

async function generateCssFrameworkNone(params) {
  const build = join(__base, 'build', params.uuid);
  const normalizeCss = join(__base, 'modules', 'css-framework', 'none', 'normalize.css');
  const token = 'CSS_FRAMEWORK_IMPORT';

  switch (params.framework) {
    case 'express':
    case 'hapi':
      if (params.templateEngine === 'jade') {
        const layoutJade = join(build, 'views', 'layout.jade');
        const cssImport = join(__base, 'modules', 'css-framework', 'none', 'express-jade-import.jade');
        await replaceCode(layoutJade, token, cssImport, { indentLevel: 2 });
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'nunjucks') {
        // TODO
      }
      // Copy normalize.css
      await cpy([normalizeCss], join(build, 'public', 'css'));
      break;

    case 'meteor':
      // TODO
      break;

    default:
    // TODO
  }
}

export default generateCssFrameworkNone;
