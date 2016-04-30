import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateCssFrameworkFoundation(params) {
  const publicDir = join(__base, 'build', params.uuid, 'public');
  const foundationDir = join(__dirname, 'modules', 'foundation');
  const jqueryDir = join(__dirname, 'modules', 'jquery');

  switch (params.cssPreprocessor) {
    case 'css':
      await copy(join(foundationDir, 'main.css'), join(publicDir, 'css', 'main.css'));
      await copy(join(foundationDir, 'css', 'foundation.css'), join(publicDir, 'css', 'vendor', 'foundation.css'));
      break;
    case 'sass':
      await copy(join(foundationDir, 'main.scss'), join(publicDir, 'css', 'main.scss'));
      await copy(join(foundationDir, '_settings.scss'), join(publicDir, 'css', '_settings.scss'));
      await copy(join(foundationDir, 'scss'), join(publicDir, 'css', 'vendor', 'foundation'));
      break;
    default:
      break;
  }

  // Import Foundation CSS/JS files
  await addCssFrameworkImports(params);

  // Copy additional Foundation files
  await copy(join(foundationDir, 'js', 'foundation.js'), join(publicDir, 'js', 'lib', 'foundation.js'));
  await copy(join(jqueryDir, 'jquery.js'), join(publicDir, 'js', 'lib', 'jquery.js'));
}

export default generateCssFrameworkFoundation;

async function addCssFrameworkImports(params) {
  const build = join(__base, 'build', params.uuid);

  // AngularJS has its "layout" file in a separate directory
  if (params.jsFramework === 'angularjs') {
    const indexHtml = join(build, 'app', 'index.html');
    const cssImport = join(__dirname, 'modules', 'foundation', 'html-css-import.html');
    const jsImport = join(__dirname, 'modules', 'foundation', 'html-js-import.html');

    if (params.cssPreprocessor === 'css') {
      await replaceCode(indexHtml, 'CSS_FRAMEWORK_IMPORT', cssImport, { indentLevel: 1 });
    }

    await replaceCode(indexHtml, 'JS_FRAMEWORK_LIB_IMPORT', jsImport, { indentLevel: 1 });
  } else {
    switch (params.templateEngine) {
      case 'jade':
        const jadeLayout = join(build, 'views', 'layout.jade');
        const jadeFoundationCssImport = join(__dirname, 'modules', 'foundation', 'jade-css-import.jade');
        const jadeFoundationJsImport = join(__dirname, 'modules', 'foundation', 'jade-js-import.jade');
        if (params.cssPreprocessor === 'css') {
          await replaceCode(jadeLayout, 'CSS_FRAMEWORK_IMPORT', jadeFoundationCssImport, { indentLevel: 2 });
        }
        await replaceCode(jadeLayout, 'JS_FRAMEWORK_LIB_IMPORT', jadeFoundationJsImport, { indentLevel: 2 });
        break;

      case 'handlebars':
        const handlebarsLayout = join(build, 'views', 'layouts', 'main.handlebars');
        const handlebarsFoundationCssImport = join(__dirname, 'modules', 'foundation', 'html-css-import.html');
        const handlebarsFoundationJsImport = join(__dirname, 'modules', 'foundation', 'html-js-import.html');
        if (params.cssPreprocessor === 'css') {
          await replaceCode(handlebarsLayout, 'CSS_FRAMEWORK_IMPORT', handlebarsFoundationCssImport);
        }
        await replaceCode(handlebarsLayout, 'JS_FRAMEWORK_LIB_IMPORT', handlebarsFoundationJsImport);
        break;

      case 'nunjucks':
        const nunjucksLayout = join(build, 'views', 'layouts', 'main.handlebars');
        const nunjucksFoundationCssImport = join(__dirname, 'modules', 'foundation', 'html-css-import.html');
        const nunjucksFoundationJsImport = join(__dirname, 'modules', 'foundation', 'html-js-import.html');
        if (params.cssPreprocessor === 'css') {
          await replaceCode(nunjucksLayout, 'CSS_FRAMEWORK_IMPORT', nunjucksFoundationCssImport);
        }
        await replaceCode(nunjucksLayout, 'JS_FRAMEWORK_LIB_IMPORT', nunjucksFoundationJsImport);
        break;

      default:
        break;
    }
  }
}
