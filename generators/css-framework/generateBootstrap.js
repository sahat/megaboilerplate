import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateBootstrap(params) {
  const bootstrapDir = join(__base, 'modules', 'css-framework', 'bootstrap');
  const jqueryDir = join(__base, 'modules', 'css-framework', 'jquery');
  const publicDir = join(__base, 'build', params.uuid, 'public');

  // Add CSS import
  switch (params.templateEngine) {
    case 'jade':
      const jadeLayout = join(__base, 'build', params.uuid, 'views', 'layout.jade');
      const jadeBootstrapImport = join(__base, 'modules', 'css-framework', 'bootstrap', 'jade-import.jade');
      await replaceCode(jadeLayout, 'CSS_FRAMEWORK_IMPORT', jadeBootstrapImport, { indentLevel: 2 });
      break;

    case 'handlebars':
      const handlebarsLayout = join(__base, 'build', params.uuid, 'views', 'layout.html');
      const handlebarsBootstrapImport = join(__base, 'modules', 'css-framework', 'bootstrap', 'html-import.html');
      await replaceCode(handlebarsLayout, 'CSS_FRAMEWORK_IMPORT', handlebarsBootstrapImport, { indentLevel: 1 });
      break;

    case 'nunjucks':
      const nunjucksLayout = join(__base, 'build', params.uuid, 'views', 'layout.html');
      const nunjucksBootstrapImport = join(__base, 'modules', 'css-framework', 'bootstrap', 'html-import.html');
      await replaceCode(nunjucksLayout, 'CSS_FRAMEWORK_IMPORT', nunjucksBootstrapImport, { indentLevel: 1 });
      break;

    default:
      break;
  }

  switch (params.cssPreprocessor) {
    case 'css':
      await copy(join(bootstrapDir, 'main.css'), join(publicDir, 'css', 'main.css'));
      await copy(join(bootstrapDir, 'css', 'bootstrap.css'), join(publicDir, 'css', 'vendor', 'bootstrap.css'));
      break;
    case 'less':
      await copy(join(bootstrapDir, 'main.less'), join(publicDir, 'css', 'main.less'));
      await copy(join(bootstrapDir, 'less'), join(publicDir, 'css', 'vendor', 'bootstrap'));
      break;
    case 'sass':
      await copy(join(bootstrapDir, 'main.scss'), join(publicDir, 'css', 'main.scss'));
      await copy(join(bootstrapDir, 'sass'), join(publicDir, 'css', 'vendor', 'bootstrap'));
      break;
    default:
      break;
  }

  // Copy additional Bootstrap files
  await copy(join(bootstrapDir, 'fonts'), join(publicDir, 'fonts'));
  await copy(join(bootstrapDir, 'js', 'bootstrap.js'), join(publicDir, 'js', 'vendor', 'bootstrap.js'));
  await copy(join(jqueryDir, 'jquery.js'), join(publicDir, 'js', 'vendor', 'jquery.js'));
}

export default generateBootstrap;
