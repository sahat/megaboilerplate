import { join } from 'path';
import { cpy, replaceCode } from '../utils';

async function generateCssFrameworkNone(params) {
  const build = join(__base, 'build', params.uuid);

  switch (params.cssPreprocessor) {
    case 'css':
      await cpy([
        join(__dirname, 'modules', 'none', 'normalize.css'),
        join(__dirname, 'modules', 'none', 'main.css')
      ], join(build, 'public', 'css'));
      break;

    case 'less':
      await cpy([
        join(__dirname, 'modules', 'none', 'normalize.css'),
        join(__dirname, 'modules', 'none', 'main.less')
      ], join(build, 'public', 'css'));
      break;

    case 'sass':
      await cpy([
        join(__dirname, 'modules', 'none', 'normalize.css'),
        join(__dirname, 'modules', 'none', 'main.scss')
      ], join(build, 'public', 'css'));
      break;

    default:
      break;
  }

  // Add CSS imports
  await addCssFrameworkImports(params);
}

export default generateCssFrameworkNone;

async function addCssFrameworkImports(params) {
  const build = join(__base, 'build', params.uuid);

  // AngularJS has its "layout" file in a separate directory
  if (params.jsFramework === 'angularjs' && params.cssPreprocessor === 'css') {
    const indexHtml = join(build, 'app', 'index.html');
    const cssImport = join(__dirname, 'modules', 'none', 'html-css-import.html');
    await replaceCode(indexHtml, 'CSS_FRAMEWORK_IMPORT', cssImport, { indentLevel: 1 });
  } else {
    switch (params.templateEngine) {
      case 'jade':
        const jadeLayout = join(build, 'views', 'layout.jade');
        const jadeCssImport = join(__dirname, 'modules', 'none', 'jade-css-import.jade');
        if (params.cssPreprocessor === 'css') {
          await replaceCode(jadeLayout, 'CSS_FRAMEWORK_IMPORT', jadeCssImport, { indentLevel: 2 });
        }
        break;

      case 'handlebars':
        const handlebarsLayout = join(build, 'views', 'layout.html');
        const handlebarsCssImport = join(__dirname, 'modules', 'none', 'html-css-import.html');
        if (params.cssPreprocessor === 'css') {
          await replaceCode(handlebarsLayout, 'CSS_FRAMEWORK_IMPORT', handlebarsCssImport, { indentLevel: 1 });
        }
        break;

      case 'nunjucks':
        const nunjucksLayout = join(build, 'views', 'layout.html');
        const nunjucksCssImport = join(__dirname, 'modules', 'none', 'html-css-import.html');
        if (params.cssPreprocessor === 'css') {
          await replaceCode(nunjucksLayout, 'CSS_FRAMEWORK_IMPORT', nunjucksCssImport, { indentLevel: 1 });
        }
        break;

      default:
        break;
    }
  }
}
