import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateFoundation(params) {
  const foundationDir = join(__base, 'modules', 'css-framework', 'foundation');
  const jqueryDir = join(__base, 'modules', 'css-framework', 'jquery');
  const publicDir = join(__base, 'build', params.uuid, 'public');

  // Add CSS import
  switch (params.templateEngine) {
    case 'jade':
      const jadeLayout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      const jadeFoundationImport = join(__base, 'modules', 'css-framework', 'foundation', 'jade-import.jade');
      await replaceCode(jadeLayout, 'CSS_FRAMEWORK_IMPORT', jadeFoundationImport, { indentLevel: 2 });
      break;

    case 'handlebars':
      const handlebarsLayout = join(__base, 'build', params.uuid, 'views', 'layout.html');
      const handlebarsFoundationImport = join(__base, 'modules', 'css-framework', 'foundation', 'html-import.html');
      await replaceCode(handlebarsLayout, 'CSS_FRAMEWORK_IMPORT', handlebarsFoundationImport, { indentLevel: 1 });
      break;

    case 'nunjucks':
      const nunjucksLayout = join(__base, 'build', params.uuid, 'views', 'layout.html');
      const nunjucksFoundationImport = join(__base, 'modules', 'css-framework', 'foundation', 'html-import.html');
      await replaceCode(nunjucksLayout, 'CSS_FRAMEWORK_IMPORT', nunjucksFoundationImport, { indentLevel: 1 });
      break;

    default:
      break;
  }

  switch (params.cssPreprocessor) {
    case 'css':
      await copy(join(foundationDir, 'main.css'), join(publicDir, 'css', 'main.css'));
      await copy(join(foundationDir, 'css', 'foundation.css'), join(publicDir, 'css', 'vendor', 'foundation.css'));
      break;
    case 'sass':
      await copy(join(foundationDir, 'main.scss'), join(publicDir, 'css', 'main.scss'));
      await copy(join(foundationDir, 'scss'), join(publicDir, 'css', 'vendor', 'foundation'));
      break;
    default:
      break;
  }

  // Copy additional Foundation files
  await copy(join(foundationDir, 'js', 'foundation.js'), join(publicDir, 'js', 'vendor', 'foundation.js'));
  await copy(join(jqueryDir, 'jquery.js'), join(publicDir, 'js', 'vendor', 'jquery.js'));
}

export default generateFoundation;
